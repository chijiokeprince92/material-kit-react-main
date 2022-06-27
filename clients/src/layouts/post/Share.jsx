import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelIcon from "@mui/icons-material/Cancel";
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
      data.append("upload_preset", "w8aqxx6i");
      try {
        await axios
          .post("https://api.cloudinary.com/v1_1/prestige92/image/upload", data)
          .then((response) => (newPost.img = response.data.url));
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBox sx={{ ml: -2, mr: 1 }}>
      <Card sx={{ ml: -1, mr: -4, borderRadius: "0%" }}>
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <MDInput
              placeholder={`what's on your mind ${user.username} ?`}
              inputRef={desc}
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <MDBox component="form" role="form" onSubmit={submitHandler} sx={{width: "100%"}}>

          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
                <label htmlFor="file">
                <ImageIcon style={{color:"#87CEFA"}} fontSize="medium" />
    
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                </label>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <RoomIcon style={{ color: "#FF69B4" }} fontSize="medium" />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <EmojiEmotionsIcon style={{ color: "#FFFF00" }} fontSize="medium" />
              
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <MDButton type="submit" size="small" circular={true} iconOnly={true} color="success"><SendIcon fontSize="medium"/></MDButton>
              
            </Grid>
          </Grid>
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
          </MDBox>
        </Grid>
      
      </Card>
    </MDBox>
  );
};

export default Share;
