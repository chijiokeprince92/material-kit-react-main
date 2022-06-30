import { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import axios from "axios";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
// import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";


function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const {user} = useContext(AuthContext);
  const [file, setFile] = useState(null);


  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newImg = {
      id: user._id,
      profilePicture: {
        url: "",
        public_id: "",
      }
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "w8aqxx6i");
      try {
        await axios
          .post("https://api.cloudinary.com/v1_1/prestige92/image/upload", data)
          .then((response) => (newImg.profilePicture.url = response.data.secure_url, newImg.profilePicture.public_id = response.data.public_id ));
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/auth/profileimage/edit", newImg);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="0%"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.2),
              rgba(gradients.info.state, 0.2)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
          mx: -3
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: -2,
          py: 2,
          px: 1,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={user?.profilePicture?.url} alt="profile-image" size="xl" shadow="sm" />
            <form onSubmit={submitHandler}>
              <label htmlFor="file">
            <Tooltip placement="top">
              <Icon>edit</Icon>
            </Tooltip>
            <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
            </label>
            <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <MDButton
                  type="submit"
                  size="small"
                  circular={true}
                  iconOnly={true}
                  color="success"
                >
                  <SendIcon fontSize="medium" />
                </MDButton>
              </Grid>
            </form>
            <Grid item xs={12}>
              {file && (
                <>
                  <img
                    style={{ height: "300px" }}
                    src={URL.createObjectURL(file)}
                    alt="select post"
                  />
                  <CancelIcon onClick={() => setFile(null)} />
                </>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {user?.username} <CheckCircleRoundedIcon color="info" />
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {user?.course}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="Message"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      email
                    </Icon>
                  }
                />
                <Tab
                  label="Settings"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
