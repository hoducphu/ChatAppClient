import React, { useState } from "react";
import HomeMenu from "../HomeMenu";
import {
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { post } from "../../apiCaller";
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

const Login = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setLogin({ ...login, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post("api/user/login", {
      email: login.email,
      password: login.password,
    })
      .then(async (res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setSuccess(true);
        setOpen(true);
      })
      .then(() => {
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      })
      .catch(async (err) => {
        console.log(err.response);

        setOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <HomeMenu />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#cf420d",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl
          component="form"
          sx={{
            width: 610,
            height: 534,
            bgcolor: "#fff",
            borderRadius: "23px",
            boxShadow: "2px 2px 12px 5px rgba(0, 0, 0, 0.1)",
            m: 3.07,
          }}
          onSubmit={handleSubmit}
          variant="outlined"
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "700",
              lineHeight: "70px",
              fontFamily: "Lexend",
              color: "#CF420D",
              mt: 7,
            }}
            align="center"
          >
            Chào mừng quay trở lại!
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Lexend",
              color: "#000",
            }}
            align="center"
          >
            Thật tốt khi thấy bạn còn nhớ mật khẩu của mình!
          </Typography>

          <TextField
            label="Username"
            color="spring"
            sx={{
              width: "400px",
              height: "47px",
              margin: "50px auto 10px",
              "& label.Mui-focused": {
                color: "#000",
                fontWeight: "600",
                fontSize: "17px",
              },
              borderRadius: "10px",
            }}
            onChange={handleChange("email")}
            focused
          />
          <TextField
            label="Mật khẩu"
            color="spring"
            type="password"
            autoComplete="current-password"
            sx={{
              width: "400px",
              margin: "30px auto 10px",
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
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Lexend",
              color: "#CF420D",
              ml: 13,
              mt: 1,
            }}
            align="left"
          >
            Quên mật khẩu?
          </Typography>
          <Button
            color="buttonTheme"
            variant="contained"
            sx={{
              width: "400px",
              height: "50px",
              fontFamily: "Lexend",
              fontWeight: "600",
              fontSize: "16px",
              borderRadius: "10px",
              textTransform: "none",
              margin: "35px auto 0 !important",
            }}
            onClick={handleSubmit}
          >
            Đăng Nhập
          </Button>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Lexend",
                color: "#000",
                ml: 13,
                mt: 2,
              }}
              align="center"
            >
              Chưa có tài khoản?
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Lexend",
                color: "#CF420D",
                marginLeft: "5px",
                mt: 2,
              }}
              align="center"
            >
              Đăng ký ngay
            </Typography>
          </Link>
        </FormControl>
      </Box>

      {success ? (
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
              Đăng nhập thành công
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
              Đăng nhập thất bại!
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 4, fontFamily: "Lexend", fontWeight: 400 }}
              align="center"
            >
              Email hoặc mật khẩu không đúng!
            </Typography>
          </Box>
        </Modal>
      )}
    </ThemeProvider>
  );
};

export default Login;
