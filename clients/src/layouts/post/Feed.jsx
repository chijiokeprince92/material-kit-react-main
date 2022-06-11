import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Posts from "./Posts";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NewNavbar from "examples/Navbars/NewNavbar";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <DashboardLayout>
      <NewNavbar/>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={9} lg={7}>
          <Grid
            container
            spacing={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {posts.map((p) => (
              <Grid item xs={12} sm={9} md={8} lg={7} key={p._id}>
                <Posts post={p} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MDTypography
            // ml={-10}
            display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
          >
            Prince is my name, and i am a react web developer, with over 4 years
            experience...i also write python programming language and a little
            bit of machine learning{" "}
          </MDTypography>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
export default Feed;
