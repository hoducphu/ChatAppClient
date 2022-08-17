import React from "react";
import { useLocation } from "react-router";
import {
  Box,
  Grid,
  Button,
  Stack,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import Logo from "../assets/Logo_Icon-22 1.svg";
import { Link } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

function HomeMenu() {
  let location = new useLocation();

  const { user } = ChatState();
  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        backgroundColor: "#cf420d",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "#cf420d", height: "80px" }}>
        <Grid container sx={{ alignItems: "center", height: "80px" }}>
          <Grid item xs={5}>
            <ListItem>
              <ListItemAvatar sx={{ paddingLeft: "82px" }}>
                <Avatar
                  src={Logo}
                  sx={{ width: "36px", height: "36px" }}
                  alt=""
                />
              </ListItemAvatar>
              <ListItemText>
                <div
                  style={{
                    fontFamily: "Lexend",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#fff",
                    letterSpacing: "2px",
                  }}
                >
                  LOA PHƯỜNG
                </div>
              </ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={3}>
            <Stack
              direction="row"
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                color: "#fff",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "110px",
                    fontFamily: "Lexend",
                    color: "#fff",
                    backgroundColor: "transparent",
                    fontWeight: "500",
                    border: "0px",
                    fontSize: "1rem",
                    textTransform: "none",
                    marginLeft: "40px",
                    "&:hover": {
                      border: "0px",
                      backgroundColor: "#cf420d",
                    },
                  }}
                >
                  Giới thiệu
                </Button>
              </Link>
              <Link
                to="/news"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  sx={{
                    width: "110px",
                    fontFamily: "Lexend",
                    color: "#fff",
                    backgroundColor: "transparent",
                    fontWeight: "500",
                    border: "0px",
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": {
                      border: "0px",
                      backgroundColor: "#cf420d",
                    },
                  }}
                >
                  Tin tức
                </Button>
              </Link>
              <Link
                to="/contact"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  sx={{
                    width: "110px",
                    paddingRight: "30px",
                    fontFamily: "Lexend",
                    color: "#fff",
                    backgroundColor: "transparent",
                    fontWeight: "500",
                    border: "0px",
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": {
                      border: "0px",
                      backgroundColor: "#cf420d",
                    },
                  }}
                >
                  Liên hệ
                </Button>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              spacing={3}
              direction="row"
              sx={{ width: "70%", justifyContent: "flex-end", height: "40px" }}
            >
              {location.pathname === "/login" ? (
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    variant="outlined"
                    // color="light"
                    sx={{
                      width: "120px",
                      fontFamily: "Lexend",
                      color: "#fff",
                      backgroundColor: "#cf420d",
                      fontWeight: "600",
                      fontSize: "14px",
                      border: "2px solid #fff",
                      borderRadius: "10px",
                      textTransform: "none",
                      "&:hover": {
                        border: "2px solid #fff",
                        backgroundColor: "#cf420d",
                      },
                    }}
                  >
                    Đăng Ký
                  </Button>
                </Link>
              ) : location.pathname === "/register" ? (
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    sx={{
                      width: "120px",
                      fontFamily: "Lexend",
                      color: "#cf420d",
                      backgroundColor: "#fff",
                      fontWeight: "600",
                      fontSize: "14px",
                      borderRadius: "10px",
                      textTransform: "none",
                      border: "1px solid #fff",
                      "&:hover": {
                        border: "1px solid #fff",
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    Đăng Nhập
                  </Button>
                </Link>
              ) : user ? (
                <Link
                  to="/chat"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    sx={{
                      fontFamily: "Lexend",
                      color: "#cf420d",
                      backgroundColor: "#fff",
                      fontWeight: "600",
                      fontSize: "14px",
                      borderRadius: "10px",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#fff" },
                    }}
                  >
                    Di chuyển đến trang chat
                  </Button>
                </Link>
              ) : (
                <Stack
                  spacing={3}
                  direction="row"
                  sx={{
                    width: "70%",
                    justifyContent: "flex-end",
                    height: "40px",
                  }}
                >
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="outlined"
                      // color="light"
                      sx={{
                        width: "120px",
                        fontFamily: "Lexend",
                        color: "#fff",
                        backgroundColor: "#cf420d",
                        fontWeight: "600",
                        fontSize: "14px",
                        border: "2px solid #fff",
                        borderRadius: "10px",
                        textTransform: "none",
                        "&:hover": {
                          border: "2px solid #fff",
                          backgroundColor: "#cf420d",
                        },
                      }}
                    >
                      Đăng Ký
                    </Button>
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      sx={{
                        width: "120px",
                        fontFamily: "Lexend",
                        color: "#cf420d",
                        backgroundColor: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        borderRadius: "10px",
                        textTransform: "none",
                        border: "1px solid #fff",
                        "&:hover": {
                          border: "1px solid #fff",
                          backgroundColor: "#fff",
                        },
                      }}
                    >
                      Đăng Nhập
                    </Button>
                  </Link>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeMenu;
