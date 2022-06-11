import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { useMaterialUIController } from "../../context";

import moment from "moment";

const Posts = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };


  return (
      <MDBox mx={-2}>
        <Card>
          <CardHeader
              avatar={
                <Avatar src={user?.img} sx={{ bgcolor: "primary" }} aria-label="profile picture"></Avatar>
            }
            action={
              <IconButton aria-label="Edit button">
                <MoreVertIcon />
              </IconButton>
            }
            title={<MDTypography variant="body1">{user.username}</MDTypography>}
            subheader={<MDTypography variant="caption">{moment(post?.createdAt).fromNow()}</MDTypography>}
          />
          {post?.img && (
          <CardMedia
            sx={{
              mx: 0,
              borderRadius: "0%"
            }}
            component="img"
            height="250"
            image={post?.img}
            alt="post"
          />)}
          <CardContent>
            <MDTypography variant="body2" sx={{ mx: -2}}>{post?.desc.slice(0,140)}...</MDTypography>
          </CardContent>
          <CardActions>
          <IconButton aria-label="Like Post">
          <FavoriteIcon />
        </IconButton>
          </CardActions>
        </Card>
      </MDBox>
  );
};

export default Posts;
