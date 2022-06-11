import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Conversations from "./Conversations";
import Chat from "./Chat";
// import Cheat from "./Cheat";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NewNavbar from "examples/Navbars/NewNavbar";
// import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  console.log("Current chat:", currentChat);
  console.log("Messages:", messages);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <DashboardLayout>
      <NewNavbar />
      <ArrowBackIcon
        size="large"
        onClick={() => setCurrentChat(null)}
        sx={{ position: "fixed", right: 15 }}
      />
      <Grid container sx={{ ml: -1, mr: 10, mt: 12 }}>
        {currentChat ? null : (
          <Grid item xs={12} md={6}>
            {conversations?.map((c) => (
              <Grid
                sx={{ mx: -1 }}
                item
                xs={12}
                key={c._id}
                onClick={() => setCurrentChat(c)}
              >
                <Conversations conversation={c} currentUser={user} />
              </Grid>
            ))}
          </Grid>
        )}

        {currentChat ? (
          <Grid item xs={12} lg={6}>
            {/* <Card sx={{ width: "100%", height: "100vh", }}> */}
              {messages?.map((m) => (
                <div key={m._id} ref={scrollRef}>
                  <Chat message={m} own={m.sender === user._id} />
                </div>
              ))}

              <TextareaAutosize
                aria-label="Type a message"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                minRows={2.2}
                placeholder="Type a message..."
                style={{
                  width: "85%",
                  display: "inline",
                  position: "fixed",
                  bottom: 10,
                  borderRadius: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 5,
                }}
              />
              <MDButton
                iconOnly="true"
                circular="true"
                sx={{
                  bgcolor: "success.main",
                  display: "inline",
                  position: "fixed",
                  bottom: 10,
                  right: 5,
                  size: "large",
                }}
                onClick={handleSubmit}
              >
                <SendIcon color="white" />
              </MDButton>
            {/* </Card> */}
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            md={6}
            xl={4}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            {/* <Card sx={{ width: "100%", height: "100vh" }}> */}
              <MDTypography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Open a conversation to start a chat.
              </MDTypography>
            {/* </Card> */}
          </Grid>
        )}
      </Grid>
    </DashboardLayout>
  );
};

export default Messages;
