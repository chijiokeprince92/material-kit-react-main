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
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { AuthContext } from "../../context/AuthContext";
// import { useMaterialUIController } from "../../context";

import moment from "moment";

const Posts = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  // const [controller] = useMaterialUIController();
  // const { darkMode } = controller;

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
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <MDBox mx={-3}>
      <Card sx={{ borderRadius: "0%" }}>
        <CardHeader
          avatar={
            <Avatar
              src={user?.img}
              sx={{ bgcolor: "primary" }}
              aria-label="profile picture"
            ></Avatar>
          }
          action={
            <IconButton aria-label="Edit button">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <MDTypography variant="body2">
              {user.username} <CheckCircleRoundedIcon color="info" />
            </MDTypography>
          }
          subheader={
            <MDTypography variant="caption">
              {moment(post?.createdAt).fromNow()}
            </MDTypography>
          }
        />
        {post?.img && (
          <CardMedia
            sx={{
              mx: 0,
              borderRadius: "0%",
            }}
            component="img"
            height="250"
            image={post?.img}
            alt="post"
          />
        )}
        <CardContent>
          <MDTypography variant="body2" sx={{ mx: -2 }}>
            {post?.desc.slice(0, 140)}...
          </MDTypography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="Like Post">
            {isLiked ? <> <FavoriteIcon color="error" onClick={likeHandler} />&nbsp;
            <MDTypography variant="caption">
              {like > 1 ? `You and ${like - 1} other`: `You liked ${user.username}'s post` }
              </MDTypography></> : 
             <> <FavoriteBorderIcon onClick={likeHandler} /> &nbsp;
              <MDTypography variant="caption">
                {like === 0 ? `Be the first to like ${user.username}'s post` : like === 1 ? `1 person liked this post` : like > 1 ? `${like} people liked this post`: `You and ${like} people` }
                </MDTypography> 
              </>  }
          </IconButton>
          <IconButton aria-label="Like Post">
            <CommentIcon style={{color:"#87CEFA"}} />
            <MDTypography variant="caption">{post?.comment} &nbsp; comments</MDTypography>
          </IconButton>
        </CardActions>
      </Card>
    </MDBox>
  );
};

export default Posts;
