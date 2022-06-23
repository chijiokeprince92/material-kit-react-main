import { useContext, useRef, useState } from "react";
// import {
//   PermMedia,
//   Label,
//   Room,
//   EmojiEmotions,
//   Cancel,
// } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import RoomIcon from "@mui/icons-material/Room";
import AddReactionIcon from "@mui/icons-material/AddReaction";
// import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";


const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset","w8aqxx6i");
      try {
        await axios.post("https://api.cloudinary.com/v1_1/prestige92/image/upload", data)
        .then((response) => newPost.img = response.data.url)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
   
    <MDBox sx={{ml:-2, mr: 1}}>
        <Card sx={{ml: -1, mr: -4, borderRadius:"0%"}}>
            <Grid container spacing={0.5}>
                <Grid item xs={11}>
                    <MDInput success={true} sx={{mb:2}} fullWidth/>
                </Grid>
                <Grid item xs={1}>
                    <MDButton circular={true} iconOnly={true} color="success"><SendIcon/></MDButton>
                </Grid>
                <Grid container spacing={2 }>
                    <Grid item xs={4} sx={{display:"flex", justifyContent: "center"}}><ImageIcon color="success" fontSize="medium"/></Grid>
                    <Grid item xs={4} sx={{display:"flex", justifyContent: "center"}}><RoomIcon style={{color:"#FF69B4"}} fontSize="medium"/></Grid>
                    <Grid item xs={4} sx={{display:"flex", justifyContent: "center"}}><AddReactionIcon style={{color:"#BDB76B"}} fontSize="medium"/></Grid>
                </Grid>
            </Grid>
        </Card>
    </MDBox>
  );
}

export default Share;