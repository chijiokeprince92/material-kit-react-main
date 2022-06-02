import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
// import Grid from "@mui/material/Grid";


//conversation list box
// import ProfilesList from "examples/Lists/ProfilesList";
// conversation Data 
// import profilesListData from "layouts/profile/data/profilesListData";




const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <DashboardLayout>
      <DashboardNavbar/>
        <MDBox>
          <MDTypography>{user?.username}</MDTypography>
        </MDBox>
    </DashboardLayout>
  )
}

export default Conversations;