import React from "react";
import HomeMenu from "../components/HomeMenu";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Banner from "../assets/Banner.jpg";
import BanDo from "../assets/Ban Do-01 1.jpg";

const Contact = () => {
  return (
    <div style={{ position: "relative" }}>
      <HomeMenu />
      <Box>
        <img src={Banner} alt="" style={{ width: "100%", height: "585px" }} />
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Lexend",
            fontWeight: 700,
            fontSize: "80px",
            width: "600px",
            color: "#fff",
            textAlign: "left",
            lineHeight: "90px",
          }}
        >
          Bà Vịt đi vắng rồi!
        </div>
        <div
          style={{
            position: "absolute",
            width: "600px",
            top: "25%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Lexend",
            fontSize: "20px",
            textAlign: "left",
            color: "#fff",
          }}
        >
          Nhưng mà bạn có thể lời nhắn hay ho gì đó cho bà Vịt, bà bận rộn lắm
          nên tốt nhất hãy là những tin tức chất lượng.
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "50%",
            fontFamily: "Lexend",
            fontWeight: 700,
            textAlign: "left",
            color: "#CF420D",
          }}
        >
          <img src={BanDo} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{ width: "50%" }}>
          <div
            style={{
              fontFamily: "Lexend",
              fontWeight: 700,
              fontSize: "40px",
              textAlign: "left",
              color: "#CF420D",
              margin: "150px auto 30px",
              width: "400px",
            }}
          >
            Xóm Vịt trên bản đồ
          </div>
          <div
            style={{
              fontFamily: "Lexend",
              fontSize: "20px",
              textAlign: "justify",
              color: "#CF420D",
              marginLeft: 140,
              width: "500px",
            }}
          >
            Cái Xóm này rốt cuộc có thực hay chỉ là tin đồn, bởi vì chưa có ai
            ngoài anh Cò tìm được đến Xóm cả.
          </div>
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "450px",
          background: "#FFEEEB",
        }}
      >
        <div
          style={{
            width: "520px",
            fontFamily: "Lexend",
            fontWeight: 700,
            fontSize: "50px",
            color: "#CF420D",
          }}
        >
          Bạn đã sẵn sàng gia nhập Xóm Vịt?
        </div>
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
              fontFamily: "Lexend",
              color: "#fff",
              backgroundColor: "#cf420d",
              fontWeight: "600",
              fontSize: "20px",
              border: "2px solid #fff",
              borderRadius: "10px",
              textTransform: "none",
              padding: "20px",
              "&:hover": {
                border: "2px solid #fff",
                backgroundColor: "#cf420d",
              },
            }}
          >
            Đăng Ký Ngay
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Contact;
