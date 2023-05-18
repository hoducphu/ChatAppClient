import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { getWithToken } from "../apiCaller";
import { ChatState } from "../context/ChatProvider";

const RoomList = ({ fetchAgain }) => {
  const {
    user,
    chats,
    setChats,
    setSelectedRoom,
    roomSelectedIndex,
    setRoomSelectedIndex,
  } = ChatState();

  const handleListItemClick = (event, index, chat) => {
    setRoomSelectedIndex(index);
    setSelectedRoom(chat);
  };

  const getGroup = async () => {
    const { data } = await getWithToken("api/room", user.token);
    setChats(data);
  };

  const handleSearchRoom = (roomName) => {
    if (roomName === "") {
      getGroup();
    } else {
      let newChat = [];
      chats.filter((chat) => {
        return chat.roomName.includes(roomName) && newChat.push(chat);
      });
      setChats(newChat);
    }
  };

  useEffect(() => {
    getGroup();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "90%",
          height: "30px",
          m: "10px auto",
          borderRadius: "30px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Room"
          inputProps={{ "aria-label": "search room" }}
          onChange={(e) => {
            handleSearchRoom(e.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          title="Create New Group"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Divider sx={{ mt: 1 }} />
      <List
        aria-label="main mailbox folders"
        sx={{ mt: 1, width: "100%", overflowY: "auto", maxHeight: 530 }}
      >
        {chats &&
          chats.map((chat, index) => (
            <div key={chat._id}>
              <ListItemButton
                selected={roomSelectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, index, chat);
                }}
              >
                <ListItemText
                  primary={chat.roomName}
                  secondary={`${
                    chat.lastMessage !== undefined
                      ? chat.lastMessage.sender.fullname +
                        ": " +
                        (chat.lastMessage.type === "File"
                          ? "Đã gửi 1 tệp tin"
                          : chat.lastMessage.message.length > 30
                          ? chat.lastMessage.message.substring(0, 31) + "..."
                          : chat.lastMessage.message)
                      : ""
                  }`}
                />
              </ListItemButton>
              <Divider />
            </div>
          ))}
      </List>
    </>
  );
};

export default RoomList;
