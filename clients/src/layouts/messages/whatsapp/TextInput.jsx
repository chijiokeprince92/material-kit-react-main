import React from "react";
import TextField from "@mui/material/TextField";
import { createStyles, makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import MDButton from "../../../components/MDButton";


const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

export const TextInput = ({ newMessage, setNewMessage, handleSubmit }) => {
  const classes = useStyles();
  return (
    <form className={classes.wrapForm} noValidate autoComplete="off" sx={{position:"relative"}}>
      <TextField autoFocus
        id="standard-text"
        label="Type a message..."
        className={classes.wrapText}
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        //margin="normal"
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        // className={classes.button}
      >
        <SendIcon />
      </Button>
    </form>
  );
};
