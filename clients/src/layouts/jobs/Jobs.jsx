import React from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";


const Jobs = () => {
  return (
    <DashboardLayout>
    <DashboardNavbar/>
    <MDBox>
      <MDTypography>Jobs</MDTypography>
    </MDBox>
    </DashboardLayout>
  )
}

export default Jobs;