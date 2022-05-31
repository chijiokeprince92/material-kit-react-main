import React, { useEffect } from 'react';
import axios from 'axios';
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// useEffect(() => {
//   const fetchPosts = async () => {
//     const res = username
//       ? await axios.get("/posts/profile/" + username)
//       : await axios.get("posts/timeline/" + user._id);
//     setPosts(
//       res.data.sort((p1, p2) => {
//         return new Date(p2.createdAt) - new Date(p1.createdAt);
//       })
//     );
//   };
//   fetchPosts();
// }, [username, user._id]);


const Posts = () => {
  return (
    <MDBox sx={{height: "100%"}}>
      <Card sx={{ml: 5}}>
        <MDTypography>
          Posts from this users!!
        </MDTypography>
    </Card>
    </MDBox>
    
  )
}

export default Posts;