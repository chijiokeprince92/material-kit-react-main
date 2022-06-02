import React, { useEffect,useContext, useState } from 'react';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import {AuthContext} from "../../context/AuthContext";



// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

const Posts = ({username}) => {
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
    <DashboardNavbar/>
    <MDBox>
      {posts.map((post)=> (
        <MDTypography>{post?.desc}</MDTypography>
      ))}
      
    </MDBox>
    </DashboardLayout>
    
  )
}

export default Posts;