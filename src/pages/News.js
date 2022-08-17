import React from "react";
import HomeMenu from "../components/HomeMenu";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Banner from "../assets/Banner.jpg";
import CoNgong from "../assets/Group 7.jpg";
import AnhMeo from "../assets/Group 8.jpg";
import BacTruongXom from "../assets/Group 9.jpg";

const News = () => {
  return (
    <div style={{ position: "relative" }}>
      <HomeMenu />
      <Box>
        <img src={Banner} alt="" style={{ width: "100%", height: "585px" }} />
        <div
          style={{
            position: "absolute",
            top: "10%",
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
          Chào mừng đến Xóm Vịt!
        </div>
        <div
          style={{
            position: "absolute",
            top: "16%",
            left: "23%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Lexend",
            fontSize: "20px",
            textAlign: "left",
            color: "#fff",
          }}
        >
          Nơi chia sẻ tin tức nóng hôi hổi trong xóm.
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
          <img src={CoNgong} alt="" style={{ width: "100%", height: "100%" }} />
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
            Ai lấy cái chảo của cô Ngỗng rồi?
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
            Thật kì lạ! Làm sao một con ngỗng lại cần dùng chảo? Ai đã lấy mất
            cái chảo của cô? Chúng tôi vẫn đang tim hiểu lí do.
          </div>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
          <div
            style={{
              fontFamily: "Lexend",
              fontWeight: 700,
              fontSize: "40px",
              textAlign: "left",
              color: "#CF420D",
              margin: "150px 0px 30px 100px",
              width: "400px",
            }}
          >
            Anh Mèo nhà vẫn nằm dài cả ngày.
          </div>
          <div
            style={{
              fontFamily: "Lexend",
              fontSize: "20px",
              textAlign: "justify",
              color: "#CF420D",
              marginLeft: 100,
              width: "500px",
            }}
          >
            Chẳng điều gì có thể lay chuyển được anh Mèo, thậm chí có là tận thế
            hay cả trái đất này diệt vong, có lẽ chẳng điều gì có thể khiến anh
            thức khỏi cơn mộng mị buổi trưa này.
          </div>
        </div>
        <div
          style={{
            width: "50%",
            fontFamily: "Lexend",
            fontWeight: 700,
            fontSize: "50px",
            textAlign: "left",
            color: "#CF420D",
          }}
        >
          <img src={AnhMeo} alt="" style={{ width: "100%", height: "100%" }} />
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
            fontSize: "50px",
            textAlign: "left",
            color: "#CF420D",
          }}
        >
          <img
            src={BacTruongXom}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <div
            style={{
              fontFamily: "Lexend",
              fontWeight: 700,
              fontSize: "40px",
              textAlign: "left",
              color: "#CF420D",
              paddingTop: "50px",
              margin: "100px auto 30px",
              width: "400px",
            }}
          >
            Bác Trưởng Xóm vẫn chưa thấy về
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
            Có khi nào bác lại sang nhà bà Vịt đàm đạo về cuộc đời? Mỗi khi hai
            người bọn họ ‘sáp’ vào nhau là y như rằng chẳng bao giờ xong trước
            12 giờ đêm cả.
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

export default News;
