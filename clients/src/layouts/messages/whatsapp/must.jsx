import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import MDTypography from "../../../components/MDTypography";
import MDBox from "../../../components/MDBox";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex",
      justifyContent: "flex-start"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#A8DDFD",
      width: "70%",
      textAlign: "left",
      overflowWrap: "break-word",
      wordWrap: "break-word",
      hyphens: "auto",
      // font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #97C6E3",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #A8DDFD",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #97C6E3",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
      }
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#f8e896",
      width: "60%",
      textAlign: "left",
      // font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #f8e896",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #dfd087",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px"
      }
    },

    messageContent: {
      padding: 0,
      margin: 0
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".50em",
      fontWeight: "300",
      marginTop: "10px",
      bottom: "-3px",
      right: "5px"
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "20px"
    }
  })
);

export const MessageLeft = ({message, time, photo, name}) => {
 
  const classes = useStyles();

  return (
      <div className={classes.messageRow}>
        {/* <Avatar alt={name} className={classes.orange} src={photo} /> */}
        <div>
          {/* <MDTypography className={classes.displayName}>{name}</MDTypography> */}
          <div className={classes.messageBlue}>
            <div>
              <MDTypography variant="body2" className={classes.messageContent}>{message}</MDTypography>
            </div>
            <div className={classes.messageTimeStampRight}>{time}</div>
          </div>
        </div>
      </div>
  );
};


export const MessageRight = ({message, time,name}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <MDTypography variant="body2" className={classes.messageContent}>{message}</MDTypography>
        <div className={classes.messageTimeStampRight}>{time}</div>
      </div>
    </div>
  );
};
