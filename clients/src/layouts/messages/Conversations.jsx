import { useEffect, useState } from "react";
import axios from "axios";

import MDTypography from "../../components/MDTypography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import Badge from '@mui/material/Badge';
import team3 from "assets/images/team-3.jpg";


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
    <List sx={{ width: "100%", mx: 0,  borderRadius: 1, mt: -1 }}>
    <ListItem alignItems="flex-start" sx={{px: -3}}>
      <ListItemAvatar>
        <Avatar alt="User" src={team3} sx={{ width: 56, height: 56 }} />
      </ListItemAvatar>
      <ListItemText primary={<MDTypography
          sx={{fontWeight: "bold", ml: 1.5}}
          component="span"
          variant="body2"
        >
          {user?.username}
          {/* <Badge alignItems="flex-end" anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }} color="success" overlap="circular" badgeContent="2">
      </Badge> */}
        </MDTypography>}
         secondary={<MDTypography
        sx={{ ml: 1.5}}
        component="block"
        variant="caption"
        >
          I'll be in your neighborhood...expect me in the next 2 weeks, but i might not come directly...
        </MDTypography>} />
        
    </ListItem>
    <Divider variant="inset" component="li" />
  </List>
  )
}

export default Conversations;