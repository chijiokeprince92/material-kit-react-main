import { useState, useEffect } from "react";
// react-routers components
import { Link } from "react-router-dom";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

const Convo = ({ conversation, currentUser }) => {
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
    <MDBox
      key={user?.username}
      component="li"
      display="flex"
      alignItems="center"
      py={1}
      mb={1}
    >
      <MDBox mr={2}>
        <MDAvatar
          src={user?.profilePicture.url || user?.img}
          alt={user?.username}
          shadow="md"
        />
      </MDBox>
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <MDTypography variant="button" fontWeight="medium">
          {user?.username}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          This new unibuddy app is awesome...
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        <MDButton component={Link} to="#" variant="text" color="info">
          reply
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default Convo;
