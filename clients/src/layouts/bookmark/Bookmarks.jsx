import React from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";


const Bookmarks = () => {
  return (
    <DashboardLayout>
    <DashboardNavbar/>
    <MDBox>
      <MDTypography>Bookmark</MDTypography>
    </MDBox>
    </DashboardLayout>

  )
}

export default Bookmarks;