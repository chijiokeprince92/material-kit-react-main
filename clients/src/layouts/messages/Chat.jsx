import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { red, teal } from '@mui/material/colors';


import MDTypography from "../../components/MDTypography";

const Chat = ({ message, own }) => {
  const color = red[500];
  const colorTeal = teal[200];

  return (
    <Grid xs={6}>
      {own ? (
        <Card sx={{bgcolor: color,  mb: 3,flexWrap: 'wrap', borderRadius: 1, display: 'flex',  flexDirection: 'row', justifyContent: "flex-end" }}>
          <MDTypography>
            {message.text}
          </MDTypography>
        </Card>
      ) : (
        <Card sx={{bgcolor: colorTeal, flexWrap: 'wrap', borderRadius: 1, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: "flex-start" }}>
          <MDTypography>
            {message.text}
          </MDTypography>
        </Card>
      )}
    </Grid>
  );
};

export default Chat;
