import React from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NewNavbar from "examples/Navbars/NewNavbar";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";



const Maps = () => {
  return (
    <DashboardLayout>
    <NewNavbar/>
    <MDBox>
      <MDTypography>Maps</MDTypography>
    </MDBox>
    </DashboardLayout>
  )
}

export default Maps