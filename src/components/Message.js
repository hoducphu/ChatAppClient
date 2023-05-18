import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  FormControl,
  Input,
  Button,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  TextField,
  Modal,
  Paper,
  ListItemAvatar,
  ListItemText,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Checkbox,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import KeyIcon from "@mui/icons-material/Key";
import LogoutIcon from "@mui/icons-material/Logout";
import { ChatState } from "../context/ChatProvider";
import {
  getWithToken,
  putWithToken,
  postWithToken,
  postMessageFile,
  downloadMessageFile,
} from "../apiCaller";
import {
  isSameSender,
  isLastMessage,
  isUser,
  marginMessage,
  isSameUser,
} from "../config/chatLogics";

import io from "socket.io-client";
import fileDownload from "js-file-download";
var socket;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Message = ({ fetchAgain, setFetchAgain }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [openRenameGroup, setOpenRenameGroup] = useState(false);
  const [openAddToGroup, setOpenAddToGroup] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [newRoomName, setNewRoomName] = useState();
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openLeaveGroup, setOpenLeaveGroup] = useState(false);
  const [userToDelete, setUserToDelete] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openDeleteSnackBar, setOpenDeleteSnackBar] = useState(false);
  const [addedUser, setAddedUser] = useState([]);
  const [deletedUser, setDeletedUser] = useState([]);
  const server = process.env.REACT_APP_API_ENDPOINT;

  const messageEl = useRef(null);
  const uploadFileMessage = useRef(null);

  const { user, selectedRoom, setRoomSelectedIndex, setSelectedRoom } =
    ChatState();

  // rename
  const handleOpenRenameGroup = () => setOpenRenameGroup(true);
  const handleCloseRenameGroup = () => setOpenRenameGroup(false);
  const handleRenameRoom = (e) => {
    e.preventDefault();
    newRoomName &&
      putWithToken(
        `api/room/rename`,
        {
          roomId: selectedRoom._id,
          roomName: newRoomName,
        },
        user.token
      )
        .then((res) => setSelectedRoom(res.data))
        .catch((err) => {
          console.log(err);
        });
    setOpenRenameGroup(false);
    setRoomSelectedIndex(0);
  };

  // delete user handler
  const handleOpenDeleteUser = () => setOpenDeleteUser(true);
  const handleCloseDeleteUser = () => setOpenDeleteUser(false);
  const handleOpenDeleteConfirm = () => setOpenDeleteConfirm(true);
  const handleCloseDeleteConfirm = () => setOpenDeleteConfirm(false);
  const handleOpenLeaveGroup = () => setOpenLeaveGroup(true);
  const handleCloseLeaveGroup = () => setOpenLeaveGroup(false);

  const handleOpenDeleteSnackBar = () => {
    setOpenDeleteSnackBar(true);
  };

  const handleCloseDeleteSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteSnackBar(false);
  };

  const handleUserToDelete = (e, user) => {
    setUserToDelete(user);
    handleOpenDeleteConfirm();
  };

  const onCloseDelete = () => {
    setUserToDelete();
    handleCloseDeleteConfirm();
  };

  const handleDeleteUser = async () => {
    await putWithToken(
      `api/room/removeUser`,
      {
        roomId: selectedRoom._id,
        userId: userToDelete._id,
      },
      user.token
    )
      .then((res) => {
        setDeletedUser(userToDelete.fullname);
        userToDelete._id === user._id
          ? setSelectedRoom()
          : setSelectedRoom(res.data);
        setFetchAgain(!fetchAgain);
        getMessages();
        onCloseDelete();
        handleCloseDeleteUser();
        handleOpenDeleteSnackBar();
        handleCloseLeaveGroup();
        setRoomSelectedIndex(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add user
  const handleOpenAddToGroup = () => setOpenAddToGroup(true);
  const handleCloseAddToGroup = () => setOpenAddToGroup(false);

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleCheckUser = (searchUser) => () => {
    const currentIndex = selectedUser.indexOf(searchUser);
    const newChecked = [...selectedUser];

    if (currentIndex === -1) {
      newChecked.push(searchUser);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedUser(newChecked);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = async (query) => {
    if (!query) return;
    const userInRoomId = selectedRoom.users.map((user) => user._id);

    await getWithToken(`api/user?search=${query}`, user.token).then((res) => {
      const newData = res.data.filter((value) => {
        return !userInRoomId.includes(value._id);
      });
      setSearchResult(newData);
    });
  };

  const handleAddToGroup = async () => {
    const userToAdd = [...selectedUser];

    await putWithToken(
      `api/room/addUser`,
      {
        roomId: selectedRoom._id,
        users: JSON.stringify(userToAdd.map((user) => user._id)),
      },
      user.token
    )
      .then((res) => {
        setAddedUser(res.data.users[res.data.users.length - 1].fullname);
        setSelectedRoom(res.data);
        setFetchAgain(!fetchAgain);
        handleOpenSnackBar();
        setSearchResult([]);
        setSelectedUser([]);
        setRoomSelectedIndex(0);
        handleCloseAddToGroup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // messages handler
  const getMessages = async () => {
    if (!selectedRoom) return;

    const { data } = await getWithToken(
      `api/chat/${selectedRoom._id}`,
      user.token
    );
    setFetchAgain(!fetchAgain);
    setMessages(data);
    socket.emit("Join Room", selectedRoom._id);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage || newMessage === "") return;

    if (user && selectedRoom && newMessage !== "") {
      const { data } = await postWithToken(
        `api/chat`,
        {
          message: newMessage,
          roomId: selectedRoom._id,
          type: "Text",
        },
        user.token
      );
      socket.emit("Received Message", data);
      await setFetchAgain(!fetchAgain);
      setMessages([...messages, data]);
      setRoomSelectedIndex(0);
      setNewMessage("");
    }
  };

  const openUploadFileMessage = () => {
    uploadFileMessage.current.click();
  };

  const onSendFileMessage = async (e) => {
    let formdata = new FormData();
    formdata.append("uploadMessageFile", e.target.files[0]);
    const { data } = await postMessageFile(
      `api/chat/fileMessage`,
      formdata,
      user.token
    );
    if (data.success) {
      await postWithToken(
        `api/chat`,
        {
          message: data.url,
          roomId: selectedRoom._id,
          type: "File",
        },
        user.token
      ).then((result) => {
        socket.emit("Received Message", result.data);
        setFetchAgain(!fetchAgain);
        setMessages([...messages, result.data]);
        setRoomSelectedIndex(0);
      });
    }
  };

  const downloadFile = async (fileSource) => {
    console.log(fileSource);
    downloadMessageFile(fileSource, user.token).then((res) => {
      fileDownload(res.data, fileSource.substring(22));
    });
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_ENDPOINT);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [selectedRoom]);

  useEffect(() => {
    socket.on("New Message", (newMessageReceived) => {
      setFetchAgain(!fetchAgain);
      setMessages([...messages, newMessageReceived]);
    });
  });

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "95%",
          height: "10%",
          margin: "0px auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {selectedRoom && (
            <Typography sx={{ fontFamily: "Lexend" }}>
              {selectedRoom.roomName}
            </Typography>
          )}
        </Box>

        {selectedRoom && (
          <Box>
            <Tooltip title="Open settings">
              <IconButton
                sx={{ p: 0, ml: "auto" }}
                onClick={handleOpenUserMenu}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOpenRenameGroup}>
                <Typography
                  textAlign="center"
                  sx={{
                    fontFamily: "Lexend",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <EditIcon sx={{ mr: 1 }} />
                  Change Name
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleOpenAddToGroup}>
                <Typography
                  textAlign="center"
                  sx={{
                    fontFamily: "Lexend",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <GroupAddIcon sx={{ mr: 1 }} />
                  Add New User
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleOpenDeleteUser}>
                <Typography
                  textAlign="center"
                  sx={{
                    fontFamily: "Lexend",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <GroupIcon sx={{ mr: 1 }} />
                  Members
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setUserToDelete(user);
                  handleOpenLeaveGroup();
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    fontFamily: "Lexend",
                    display: "flex",
                    justifyContent: "center",
                    color: "red",
                  }}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  Leave Group
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
      <Divider />
      <Box sx={{ height: "76%", overflowY: "auto" }} ref={messageEl}>
        {messages && selectedRoom ? (
          messages.map((msg, index) =>
            msg.type === "Text" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: isSameUser(messages, msg, index, user._id)
                    ? 2
                    : 12,
                }}
                key={msg._id}
              >
                {(isSameSender(messages, msg, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && (
                  <Avatar
                    alt={msg.sender.fullname}
                    src={server + msg.sender.image}
                    sx={{ ml: "3px", width: "30px", height: "30px" }}
                  />
                )}
                <Typography
                  sx={{
                    borderRadius: "20px",
                    bgcolor: isUser(msg.sender._id, user._id)
                      ? "#cf420d"
                      : "#dfdfdf",
                    color: isUser(msg.sender._id, user._id) ? "#fff" : "#000",
                    fontSize: "15px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    width: "fit-content",
                    fontFamily: "Lexend",
                    textAlign: "left",
                    ml: marginMessage(messages, msg, index, user._id),
                  }}
                >
                  {msg.sender._id !== user._id && (
                    <div style={{ fontSize: "12px", color: "#7c7f83" }}>
                      {msg.sender.fullname}
                    </div>
                  )}
                  {msg.message}
                </Typography>
              </div>
            ) : msg.type === "File" &&
              (msg.message.endsWith(".jpg") || msg.message.endsWith(".png")) ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: isSameUser(messages, msg, index, user._id)
                    ? 2
                    : 12,
                }}
                key={msg._id}
              >
                <img
                  src={server + msg.message}
                  alt=""
                  style={{
                    borderRadius: "20px",
                    maxWidth: "300px",
                    marginLeft: marginMessage(messages, msg, index, user._id),
                  }}
                />
              </div>
            ) : msg.type === "File" && msg.message.endsWith(".mp4") ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: isSameUser(messages, msg, index, user._id)
                    ? 2
                    : 12,
                }}
                key={msg._id}
              >
                <video
                  src={server + msg.message}
                  alt=""
                  style={{
                    borderRadius: "20px",
                    maxWidth: "450px",
                    marginLeft: marginMessage(messages, msg, index, user._id),
                  }}
                  type="video/mp4"
                  controls
                />
              </div>
            ) : (
              msg.type === "File" &&
              msg.message.endsWith(".docx") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: isSameUser(messages, msg, index, user._id)
                      ? 2
                      : 12,
                  }}
                  key={msg._id}
                >
                  <Box
                    sx={{
                      borderRadius: "20px",
                      bgcolor: isUser(msg.sender._id, user._id)
                        ? "#243427"
                        : "#dfdfdf",
                      color: isUser(msg.sender._id, user._id) ? "#fff" : "#000",
                      fontSize: "15px",
                      padding: "15px 15px",
                      maxWidth: "75%",
                      width: "fit-content",
                      fontFamily: "Lexend",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      flexDirection: "row",
                      ml: marginMessage(messages, msg, index, user._id),
                    }}
                    onClick={() => downloadFile(msg.message)}
                  >
                    <Avatar
                      alt="File"
                      src="File"
                      sx={{ mr: "15px", width: "30px", height: "30px" }}
                    />
                    {msg.message.substring(22)}
                  </Box>
                </div>
              )
            )
          )
        ) : (
          <Box
            sx={{
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "#fff",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ color: "#CF420D", fontFamily: "Lexend", fontWeight: 700 }}
              align="center"
            >
              Chào mừng bạn đến với Loa Phường
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontFamily: "Lexend", fontWeight: 400 }}
              align="center"
            >
              Hãy cùng nhau có những trải nghiệm thú vị nhé
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 4, fontFamily: "Lexend", fontWeight: 400 }}
              align="center"
            >
              Quạc quạc, quạc quạc...
            </Typography>
          </Box>
        )}
      </Box>
      {selectedRoom && (
        <>
          <Divider />
          <Box sx={{ height: "4%", display: "flex", alignItems: "flex-start" }}>
            <FileUploadIcon
              sx={{ padding: "0px 5px", color: "#808080", cursor: "pointer" }}
              onClick={openUploadFileMessage}
            />
            <input
              type="file"
              ref={uploadFileMessage}
              style={{ display: "none" }}
              onChange={onSendFileMessage}
              name="uploadMessageFile"
            />
            <Divider orientation="vertical" />
          </Box>
        </>
      )}
      {selectedRoom && (
        <>
          <Divider />
          <FormControl
            component="form"
            sx={{
              color: "#000",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "9.6%",
            }}
            onSubmit={handleSendMessage}
          >
            <Input
              sx={{
                width: "90%",
                ml: 3,
              }}
              value={newMessage}
              onChange={handleTyping}
              placeholder="Gửi tin nhắn"
              autoComplete="off"
            />
            <Button
              sx={{
                width: "10%",
                height: "100%",
                margin: "auto",
                borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "0px ",
              }}
              onClick={handleSendMessage}
            >
              <SendIcon />
            </Button>
          </FormControl>
        </>
      )}
      {selectedRoom && (
        <Modal
          open={openRenameGroup}
          onClose={handleCloseRenameGroup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              height: 200,
              bgcolor: "#ffeeeb",
              boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "23px",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ color: "#cf420d", fontFamily: "Lexend", fontWeight: 700 }}
              align="center"
            >
              Thay đổi tên nhóm
            </Typography>
            <FormControl
              component="form"
              sx={{
                width: "100%",
                position: "relative",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onSubmit={handleRenameRoom}
            >
              <Typography
                sx={{
                  mr: "auto",
                  mt: 2,
                  mb: 1,
                  fontSize: "14px",
                  color: "#7f868d",
                  fontFamily: "Lexend",
                }}
              >
                New name:
              </Typography>
              <TextField
                label={selectedRoom.roomName}
                autoComplete="off"
                onChange={(e) => setNewRoomName(e.target.value)}
              />
            </FormControl>
            <Box
              sx={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#cf420d",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",

                  backgroundColor: "#fff",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleCloseRenameGroup}
              >
                Hủy
              </Button>
              <Button
                variant="outlined"
                // color="light"
                sx={{
                  ml: 3,
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",
                  backgroundColor: "#cf420d",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#cf420d",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleRenameRoom}
              >
                Thay đổi
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {selectedRoom && (
        <Modal
          open={openAddToGroup}
          onClose={handleCloseAddToGroup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              height: 500,
              bgcolor: "#ffeeeb",
              boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "23px",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ color: "#cf420d", fontFamily: "Lexend", fontWeight: 700 }}
              align="center"
            >
              Thêm thành viên
            </Typography>
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
                placeholder="Search User"
                inputProps={{ "aria-label": "search User" }}
                onChange={(e) => {
                  e.target.value === "" && setSearchResult([]);
                  handleSearch(e.target.value);
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
              sx={{ width: "100%", overflowY: "auto", maxHeight: 300 }}
            >
              {searchResult &&
                searchResult.map((searchUser, index) => {
                  const labelId = `checkbox-list-secondary-label-${index}`;
                  return (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleCheckUser(searchUser)}>
                          <ListItemAvatar>
                            <Avatar
                              src={server + searchUser.image}
                              alt={searchUser.fullname}
                              sx={{ bgcolor: "#000" }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={searchUser.email}
                            secondary={
                              searchUser.fullname +
                              " | " +
                              searchUser.phonenumber
                            }
                          />
                          <Checkbox
                            edge="end"
                            checked={selectedUser.indexOf(searchUser) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
            </List>
            {selectedUser && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {selectedUser.map((user) => (
                  <Avatar
                    src={server + user.image}
                    alt={user.fullname}
                    sx={{ bgcolor: "#000", width: 30, height: 30 }}
                  />
                ))}
              </Box>
            )}
            <Box
              sx={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#cf420d",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",

                  backgroundColor: "#fff",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleCloseAddToGroup}
              >
                Hủy
              </Button>
              <Button
                variant="outlined"
                // color="light"
                sx={{
                  ml: 3,
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",
                  backgroundColor: "#cf420d",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#cf420d",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleAddToGroup}
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {selectedRoom && (
        <Modal
          open={openDeleteUser}
          onClose={handleCloseDeleteUser}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              height: 500,
              bgcolor: "#ffeeeb",
              boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "23px",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ color: "#cf420d", fontFamily: "Lexend", fontWeight: 700 }}
              align="center"
            >
              Danh sách thành viên
            </Typography>
            <List
              aria-label="main mailbox folders"
              sx={{ width: "100%", overflowY: "auto", maxHeight: 530 }}
            >
              {selectedRoom.users.map((member) => (
                <>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        src={server + member.image}
                        alt={member.fullname}
                        sx={{ bgcolor: "#000" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.email}
                      secondary={member.fullname + " | " + member.phonenumber}
                    />
                    {selectedRoom.admin._id === member._id && (
                      <KeyIcon sx={{ color: "#b3d500" }} />
                    )}
                    {selectedRoom.admin._id !== member._id &&
                      selectedRoom.admin._id === user._id && (
                        <IconButton edge="end" aria-label="delete">
                          <PersonRemoveIcon
                            sx={{ color: "#000" }}
                            onClick={(e) => handleUserToDelete(e, member)}
                          />
                        </IconButton>
                      )}
                  </ListItemButton>
                  <Divider />
                </>
              ))}
            </List>
            <Box
              sx={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#cf420d",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",

                  backgroundColor: "#fff",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleCloseDeleteUser}
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {selectedRoom && (
        <Modal
          open={openDeleteConfirm}
          onClose={handleCloseDeleteConfirm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              height: 130,
              bgcolor: "#ffeeeb",
              boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "23px",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ color: "#cf420d", fontFamily: "Lexend", fontWeight: 700 }}
              align="center"
            >
              Xác nhận xóa {userToDelete && userToDelete.fullname}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#cf420d",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",

                  backgroundColor: "#fff",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={onCloseDelete}
              >
                Hủy
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ml: 3,
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",
                  backgroundColor: "#cf420d",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#cf420d",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleDeleteUser}
              >
                Xóa
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      {selectedRoom && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thêm thành công {addedUser && addedUser}
          </Alert>
        </Snackbar>
      )}
      {selectedRoom && (
        <Snackbar
          open={openDeleteSnackBar}
          onClose={handleCloseDeleteSnackBar}
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleCloseDeleteSnackBar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Xóa thành công {deletedUser && deletedUser}
          </Alert>
        </Snackbar>
      )}
      {selectedRoom && (
        <Modal
          open={openLeaveGroup}
          onClose={handleCloseLeaveGroup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              height: 130,
              bgcolor: "#ffeeeb",
              boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "23px",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ color: "#cf420d", fontFamily: "Lexend", fontWeight: 700 }}
              align="center"
            >
              Bạn muốn rời nhóm ?
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#cf420d",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",

                  backgroundColor: "#fff",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#fff",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleCloseLeaveGroup}
              >
                Hủy
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ml: 3,
                  width: "120px",
                  fontFamily: "Lexend",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "10px",
                  textTransform: "none",
                  backgroundColor: "#cf420d",
                  border: "2px solid #cf420d",
                  "&:hover": {
                    backgroundColor: "#cf420d",
                    border: "2px solid #cf420d",
                  },
                }}
                onClick={handleDeleteUser}
              >
                Rời nhóm
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Message;
