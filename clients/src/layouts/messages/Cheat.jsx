import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Conversations from "./Conversations";
import Convo from "./Convo";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NewNavbar from "examples/Navbars/NewNavbar";
import MDTypography from "../../components/MDTypography";
import MDBox from "components/MDBox";

import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// import Chat from "./Chat";
import Whatsapp from "./whatsapp/whatsapp";

import { TextInput } from "./whatsapp/TextInput";

import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

const Cheat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [value, setValue] = useState(0);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <MDBox
        // sx={{ ml: -2, mr: -2 }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
      </MDBox>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <MDBox sx={{ width: "100%", mr: -3, ml: -3 }}>
        <MDBox sx={{width: "100%" }}>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            sx={{ width: "100%", mr: -5, borderRadius: "0%"}}
          >
            <Tab label="Conversation" {...a11yProps(0)} sx={{px:0}} />
            <Tab label="Chat" {...a11yProps(1)} sx={{p: 0}} />
            <Tab label="Groups" {...a11yProps(2)} sx={{px:0}} />
          </Tabs>
        </MDBox>
        <TabPanel value={value} index={0}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", boxShadow: "none"}}>
              <MDBox p={2}>
                <MDBox
                  component="ul"
                  display="flex"
                  flexDirection="column"
                  p={0}
                  m={0}
                >
                  {conversations?.map((c) => (
                    <Grid
                      sx={{ mx: -1 }}
                      item
                      xs={12}
                      key={c._id}
                      onClick={() => setCurrentChat(c)}
                    >
                      <Convo conversation={c} currentUser={user} />
                      <Divider variant="inset" component="li" />
                    </Grid>
                  ))}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {currentChat ? (
            <Grid item xs={12} lg={6}>
              {messages?.map((m) => (
                <div key={m._id} ref={scrollRef}>
                  {/* <Chat message={m} own={m.sender === user._id} /> */}
                  <Whatsapp message={m} own={m.sender === user._id} />
                </div>
              ))}
              <TextInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSubmit={handleSubmit}
              />
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              md={6}
              xl={4}
              //   sx={{ display: { xs: "none", md: "block" } }}
            >
              <MDTypography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Click a conversation to start a chat.
              </MDTypography>
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          UWE GROUPS!!!
        </TabPanel>
      </MDBox>
    </DashboardLayout>
  );
};

export default Cheat;
