import React from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";



const Maps = () => {
  return (
    <DashboardLayout>
    <DashboardNavbar/>
    <MDBox>
      <MDTypography>Maps</MDTypography>
    </MDBox>
    </DashboardLayout>
  )
}

export default Maps