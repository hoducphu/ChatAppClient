import React, { useState } from "react";
import HomeMenu from "../HomeMenu";
import Duck from "../../assets/duck2.svg";
import {
  Grid,
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { post } from "../../apiCaller";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    spring: {
      main: "#EEBEB5",
      contrastText: "#000",
    },
    buttonTheme: {
      main: "#cf420d",
      contrastText: "#fff",
    },
  },
});

const Register = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    password: "",
    email: "",
    phonenumber: "",
  });

  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setRegisterForm({ ...registerForm, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    post("api/user/", {
      email: registerForm.email,
      password: registerForm.password,
      fullname: registerForm.fullname,
      phonenumber: registerForm.phonenumber,
    })
      .then(async (res) => {
        if (res.status === 201) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          setSuccess(true);
          setOpen(true);
        }
      })
      .then(() => {
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.err);
        setOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <HomeMenu />
      <Grid container sx={{ background: "#FFEEEB" }}>
        <Grid item xs={6}>
          <img
            src={Duck}
            alt=""
            style={{
              backgroundColor: "#cf420d",
              width: "600px",
              height: "583px",
              display: "block",
            }}
          />
        </Grid>
        <Grid
          item
          xs={4.1}
          sx={{
            margin: "20px 50px",
            width: "450px",
            boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1) !important",
            borderRadius: "23px",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "700",
              lineHeight: "70px",
              fontFamily: "Lexend",
              color: "#CF420D",
            }}
            align="center"
          >
            Gia nhập xóm Vịt
          </Typography>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Lexend",
                color: "#000",
              }}
              align="center"
            >
              Đã có tài khoản?
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Lexend",
                color: "#CF420D",
                marginLeft: "5px",
              }}
              align="center"
            >
              Đăng nhập
            </Typography>
          </Link>

          <Box
            sx={{
              "& > :not(style)": {
                m: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl
              component="form"
              sx={{ m: 1 }}
              variant="outlined"
              encType="multipart/form-data"
            >
              <TextField
                label="Họ và tên"
                color="spring"
                sx={{
                  m: 1.5,
                  width: "400px",
                  height: "47px",
                  "& label.Mui-focused": {
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "17px",
                  },
                  borderRadius: "10px",
                }}
                onChange={handleChange("fullname")}
                focused
                required
              />
              <TextField
                label="Email"
                color="spring"
                sx={{
                  m: 1.5,
                  width: "400px",
                  height: "47px",
                  "& label.Mui-focused": {
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "17px",
                  },
                  borderRadius: "10px",
                }}
                onChange={handleChange("email")}
                focused
                required
              />
              <TextField
                label="Mật khẩu"
                color="spring"
                type="password"
                autoComplete="current-password"
                sx={{
                  m: 1.5,
                  width: "400px",
                  height: "47px",
                  "& label.Mui-focused": {
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "17px",
                  },
                  borderRadius: "10px",
                }}
                onChange={handleChange("password")}
                focused
                required
              />
              <TextField
                label="Số điện thoại"
                color="spring"
                sx={{
                  m: 1.5,
                  width: "400px",
                  height: "47px",
                  "& label.Mui-focused": {
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "17px",
                  },
                }}
                onChange={handleChange("phonenumber")}
                focused
                required
              />
              <Button
                color="buttonTheme"
                variant="contained"
                sx={{
                  width: "140px",
                  height: "50px",
                  fontFamily: "Lexend",
                  fontWeight: "600",
                  fontSize: "16px",
                  borderRadius: "10px",
                  textTransform: "none",
                  margin: "35px auto !important",
                }}
                onClick={handleSubmit}
              >
                Đăng ký
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      {!success ? (
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
              height: errorMessage.length > 1 ? 250 : 150,
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
              Đăng ký không thành công
            </Typography>
            {errorMessage &&
              errorMessage?.map((err) => (
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 4, fontFamily: "Lexend", fontWeight: 400 }}
                  align="center"
                >
                  {err}
                </Typography>
              ))}
          </Box>
        </Modal>
      ) : (
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
              Đăng ký thành công
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
      )}
    </ThemeProvider>
  );
};

export default Register;
