import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Typography,
  Modal,
  Divider,
  Button,
  Avatar,
  Stack,
  TextField,
  FormControl,
  Paper,
  InputBase,
  IconButton,
  ListItemButton,
  ListItemText,
  List,
  ListItemAvatar,
  Tooltip,
  MenuItem,
  Menu,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Icon from "../assets/Logo_Icon-22 1.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import RoomList from "./RoomList";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import { Link } from "react-router-dom";
import {
  putAvatar,
  putWithToken,
  getWithToken,
  postWithToken,
} from "../apiCaller";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const theme = createTheme({
  palette: {
    primaryTheme: {
      main: "#000",
    },
  },
});

const ChatMenu = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [avatar, setAvatar] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [editForm, setEditForm] = useState({
    fullname: "",
    phonenumber: "",
    password: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [newRoomName, setNewRoomName] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const { user, setUser, setSelectedRoom } = ChatState();
  const navigate = useNavigate();
  const uploadAvatar = useRef(null);

  const server = "https://loaphuongchatapp.herokuapp.com/";

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUpdateSuccess = () => {
    setOpenUpdateSuccess(true);
  };

  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setSelectedRoom();
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditChange = (prop) => (event) => {
    setEditForm({ ...editForm, [prop]: event.target.value });
  };

  const handleSubmitEdit = async () => {
    editForm.fullname === "" && delete editForm.fullname;
    editForm.phonenumber === "" && delete editForm.phonenumber;
    editForm.password === "" && delete editForm.password;
    editForm.password !== "" &&
      editForm.password !== passwordConfirm &&
      handleOpenSnackBar();

    putWithToken(`api/user/${user._id}`, editForm, user.token)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setEditForm({
          fullname: "",
          phonenumber: "",
          password: "",
        });
        handleOpenUpdateSuccess();
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    postWithToken(
      `api/room`,
      {
        roomName: newRoomName,
        users: JSON.stringify(selectedUser._id),
      },
      user.token
    )
      .then((res) => {
        setSelectedRoom(res.data);
        setSelectedUser([]);
        handleCloseCreateGroup();
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenCreateGroup = () => setOpenCreateGroup(true);
  const handleCloseCreateGroup = () => setOpenCreateGroup(false);

  const handleSearch = async (query) => {
    if (!query) return;

    await getWithToken(`api/user?search=${query}`, user.token).then((res) => {
      const newData = res.data.filter((value) => {
        return value._id !== user._id;
      });
      setSearchResult(newData);
    });
  };

  const selectUser = (e, searchUser) => {
    setSelectedUser(searchUser);
    handleOpenCreateGroup();
  };

  const handleUploadAvatar = () => {
    uploadAvatar.current.click();
  };

  const onChangeAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handleSubmitAvatar = async () => {
    let formdata = new FormData();
    if (avatar !== null) {
      formdata.append("uploadAvatar", avatar);
      putAvatar(`api/user/uploadAvatar/${user._id}`, formdata)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          setUser(res.data);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={0.5}
          sm={0.5}
          md={0.8}
          sx={{ bgcolor: "#cf420d", height: "100%" }}
        >
          <Link to="/">
            <img src={Icon} alt="" style={{ margin: 3 }} />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: 224,
            }}
          >
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: "#cf420d",
                bgcolor: "#cf420d",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#fff",
                },
                width: "100%",
              }}
              textColor="inherit"
            >
              <Tab
                label={<ModeCommentOutlinedIcon sx={{ fontSize: "30px" }} />}
                {...a11yProps(0)}
                sx={{ mt: 2, color: "#fff" }}
              />
              <Tab
                label={<AccountCircleOutlinedIcon sx={{ fontSize: "30px" }} />}
                {...a11yProps(1)}
                sx={{ color: "#fff" }}
              />
              <Tab
                label={<GroupAddIcon sx={{ fontSize: "30px" }} />}
                sx={{ color: "#fff" }}
              />
            </Tabs>
          </Box>
          <Box sx={{ mt: 35 }}>
            <Tooltip title="Open settings">
              <IconButton
                sx={{ p: 0, ml: "auto", bgcolor: "black" }}
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  alt={user && user.fullname}
                  src={user && server + user.image}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mb: "25px", ml: "50px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center" sx={{ fontFamily: "Lexend" }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          item
          xs={3}
          sx={{
            bgcolor: "#FFEEEB",
            height: "100%",
            width: "100%",
            "& .css-19kzrtu": { width: "100%", padding: 0 },
          }}
        >
          <TabPanel value={value} index={0}>
            {user && <RoomList fetchAgain={fetchAgain} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Stack direction="column" spacing={3} alignItems="center">
              <Avatar
                alt={user && user.fullname}
                src={user && server + user.image}
                sx={{
                  width: 56,
                  height: 56,
                  cursor: "pointer",
                  bgcolor: "#000",
                  mt: 2,
                }}
                onClick={handleOpen}
              />
              <FormControl
                component="form"
                sx={{ width: "90%" }}
                onSubmit={handleSubmitEdit}
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
                  Họ và Tên:
                </Typography>
                <TextField
                  value={editForm.fullname}
                  label={user && user.fullname}
                  autoComplete="off"
                  onChange={handleEditChange("fullname")}
                />
                <Typography
                  value={editForm.phonenumber}
                  sx={{
                    mr: "auto",
                    mt: 2,
                    mb: 1,
                    fontSize: "14px",
                    color: "#7f868d",
                    fontFamily: "Lexend",
                  }}
                >
                  Số điện thoại:
                </Typography>
                <TextField
                  value={editForm.password}
                  label={user && user.phonenumber}
                  autoComplete="off"
                  onChange={handleEditChange("phonenumber")}
                />
                <Typography
                  sx={{
                    mr: "auto",
                    mt: 2,
                    fontSize: "14px",
                    color: "#7f868d",
                    fontFamily: "Lexend",
                  }}
                >
                  Mật khẩu:
                </Typography>
                <TextField
                  type="password"
                  autoComplete="off"
                  onChange={handleEditChange("password")}
                />
                <Typography
                  value={passwordConfirm}
                  sx={{
                    mr: "auto",
                    mt: 2,
                    fontSize: "14px",
                    color: "#7f868d",
                    fontFamily: "Lexend",
                  }}
                >
                  Xác nhận mật khẩu:
                </Typography>
                <TextField
                  type="password"
                  autoComplete="off"
                  onChange={handleChangePasswordConfirm}
                />

                <Button
                  sx={{
                    mt: 14,
                    fontFamily: "Lexend",
                    color: "#fff",
                    backgroundColor: "#cf420d",
                    fontWeight: "600",
                    fontSize: "14px",
                    borderRadius: "10px",
                    textTransform: "none",
                    border: "1px solid #fff",
                    "&:hover": {
                      border: "2px solid #fff",
                      backgroundColor: "#cf420d",
                    },
                  }}
                  onClick={handleSubmitEdit}
                >
                  Thay đổi
                </Button>
              </FormControl>
            </Stack>
          </TabPanel>
          <TabPanel value={value} index={2}>
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
                placeholder="Search By Username | Email | Phonenumber"
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
              sx={{ mt: 1, width: "100%", overflowY: "auto", maxHeight: 530 }}
            >
              {searchResult &&
                searchResult.map((searchUser) => (
                  <>
                    <ListItemButton
                      onClick={(event) => selectUser(event, searchUser)}
                    >
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
                          searchUser.fullname + " | " + searchUser.phonenumber
                        }
                      />
                    </ListItemButton>
                    <Divider />
                  </>
                ))}
            </List>
          </TabPanel>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={8.18} sx={{ height: "100%" }}>
          {user && (
            <Message fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
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
            height: 400,
            bgcolor: "#cf420d",
            boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "23px",
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ color: "#fff", fontFamily: "Lexend", fontWeight: 700 }}
            align="center"
          >
            Cập nhật ảnh đại diện
          </Typography>
          {avatar ? (
            <Avatar
              alt={user && user.fullname}
              src={avatar.preview}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 250,
                height: 250,
                cursor: "pointer",
              }}
              onClick={handleUploadAvatar}
            />
          ) : (
            <Avatar
              alt={user && user.fullname}
              src={user && server + user.image}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 250,
                height: 250,
                cursor: "pointer",
              }}
              onClick={handleUploadAvatar}
            />
          )}

          <input
            type="file"
            ref={uploadAvatar}
            style={{ display: "none" }}
            onChange={onChangeAvatar}
            name="uploadAvatar"
          />

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
                color: "#fff",
                backgroundColor: "#cf420d",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "10px",
                textTransform: "none",
                border: "1px solid #fff",
                "&:hover": {
                  border: "2px solid #fff",
                  backgroundColor: "#cf420d",
                },
              }}
              onClick={handleClose}
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
                color: "#cf420d",
                backgroundColor: "#fff",
                fontWeight: "600",
                fontSize: "14px",
                border: "2px solid #fff",
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#fff",
                  border: "1px solid #fff",
                },
              }}
              onClick={handleSubmitAvatar}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openCreateGroup}
        onClose={handleCloseCreateGroup}
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
            Tạo nhóm với {selectedUser && selectedUser.fullname}
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
            onSubmit={handleCreateGroup}
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
              Group name:
            </Typography>
            <TextField
              label="Add Name"
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
              onClick={handleCloseCreateGroup}
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
              onClick={handleCreateGroup}
            >
              Tạo nhóm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openUpdateSuccess}
        onClose={handleCloseUpdateSuccess}
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
            height: 100,
            bgcolor: "#fff",
            boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "23px",
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ color: "#CF420D", fontFamily: "Lexend", fontWeight: 700 }}
            align="center"
          >
            Cập nhật thành công
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 4, fontFamily: "Lexend", fontWeight: 400 }}
            align="center"
          >
            Quạc quạc, quạc quạc...
          </Typography>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%", fontFamily: "Lexend" }}
        >
          Mật khẩu không khớp với nhau
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ChatMenu;
