import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox"

const Edit = () => {
    const { user } = useContext(AuthContext);
  const username = useRef();
  const email = useRef();
  const desc = useRef();
  const city = useRef();
  const course = useRef();
  const nationality = useRef();
  const facebook = useRef();
  const twitter = useRef();
  const instagram = useRef();
  const mobile = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const edited = {
      username: username.current.value,
      email: email.current.value,
      desc: desc.current.value,
      city: city.current.value,
      course: course.current.value,
      nationality: nationality.current.value,
      facebook: facebook.current.value,
      twitter: twitter.current.value,
      instagram: instagram.current.value,
      mobile: mobile.current.value,
      _id: user._id,
    };

    try {
      await axios.post("/auth/profile/edit", edited);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="error"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Edit your profile
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={handleClick}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Username"
              variant="standard"
              inputRef={username}
              value={user?.username}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              variant="standard"
              inputRef={email}
              value={user?.email}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Bio"
              variant="standard"
              inputRef={desc}
              value={user?.desc}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Location"
              variant="standard"
              inputRef={city}
              value={user?.city}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Course"
              variant="standard"
              inputRef={course}
              value={user?.course}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="number"
              label="Mobile"
              variant="standard"
              inputRef={mobile}
              value={user?.mobile}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Facebook Link"
              variant="standard"
              inputRef={facebook}
              value={user?.facebook}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Twitter Link"
              variant="standard"
              inputRef={twitter}
              value={user?.twitter}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Instagram Link"
              variant="standard"
              inputRef={instagram}
              value={user?.instagram}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Nationality"
              variant="standard"
              inputRef={nationality}
              value={user?.nationality}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Checkbox />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              type="submit"
              color="success"
              fullWidth
            >
              save
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default Edit;
