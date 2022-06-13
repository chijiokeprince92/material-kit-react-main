import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
// import { TextInput } from "./TextInput";
import { MessageLeft, MessageRight } from "./must";
import team3 from "assets/images/team-3.jpg";


const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

export default function Whatsapp({ message, own}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {own ? (
            <MessageRight
            message={message.text}
            timestamp="02/10 10:05"
            photoURL={team3}
            displayName="Kingsley"
            avatarDisp={false}
          />
          ) : (
            <MessageLeft
            message={message.text}
            timestamp="06/21 10:00"
            photoURL={team3}
            displayName="Celestina"
            avatarDisp={true}
          />
          )}
          {/* <TextInput /> */}
        </Paper>
      </Paper>
    </div>
  );
}
