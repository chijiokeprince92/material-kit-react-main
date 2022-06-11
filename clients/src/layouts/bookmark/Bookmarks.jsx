import React from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NewNavbar from "examples/Navbars/NewNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";


const Bookmarks = () => {
  return (
    <DashboardLayout>
    <NewNavbar/>
    <MDBox>
      <MDTypography>Bookmark</MDTypography>
    </MDBox>
    </DashboardLayout>

  )
}

export default Bookmarks;