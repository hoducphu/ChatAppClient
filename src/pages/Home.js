import React from "react";
import HomeMenu from "../components/HomeMenu";
import { Box, Button, Tooltip } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Banner from "../assets/Banner-1.jpg";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: " 20px 20px",
    boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.1)",
    fontFamily: "Lexend",
    fontSize: "20px",
    color: "#CF420D",
    textAlign: "center",
  },
});

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <HomeMenu />
      <Box>
        <img src={Banner} alt="" style={{ width: "100%", height: "585px" }} />
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Lexend",
            fontWeight: 700,
            fontSize: "80px",
            width: "850px",
            color: "#fff",
          }}
        >
          Để bạn biết thêm về cái Xóm Vịt này
        </div>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            ontFamily: "Lexend",
            fontSize: "20px",
            color: "#fff",
          }}
        >
          Không có bà Vịt chắc cái Xóm này chẳng ai biết đến ai đâu
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
            width: "40%",
            padding: "90px 0px 0px 120px",
            fontFamily: "Lexend",
            fontWeight: 700,
            fontSize: "50px",
            textAlign: "left",
            color: "#CF420D",
          }}
        >
          Câu chuyện của Loa Phường
        </div>
        <div style={{ width: "60%", padding: "110px 50px 40px 0px" }}>
          <div
            style={{
              fontFamily: "Lexend",
              fontSize: "20px",
              textAlign: "justify",
              color: "#CF420D",
            }}
          >
            “Loa phường là gì? Sao lại là loa phường mà không phải thứ gì khác.
            Thật kì lạ khi đặt tên một loại dịch vụ gì đó là ‘Loa phường’. Nó có
            đáng tin cậy không? Thật chẳng thể biết được.” - anh Cò phóng viên
            tường thuật trực tiếp tại Xóm Vịt vào một ngày đầy nắng.
          </div>
          <div
            style={{
              fontFamily: "Lexend",
              fontWeight: 700,
              fontSize: "40px",
              textAlign: "justify",
              color: "#CF420D",
              paddingTop: "50px",
            }}
          >
            ‘Loa Phường’ và ‘Vịt’
          </div>
          <div
            style={{
              fontFamily: "Lexend",
              fontSize: "20px",
              textAlign: "justify",
              color: "#CF420D",
              paddingTop: "50px",
            }}
          >
            Bà Vịt luôn là ‘mối đe dọa’ của xóm, ắt cũng vì vậy mà người ta cũng
            gọi cái Xóm ‘khỉ ho cò gáy này là Xóm Vịt. Bởi đi đến đâu bà cũng
            đều oang oác rao tin hay đôi lúc còn thấy bà lấp ló đâu đó trong bụi
            cây nghe ngóng người ta nói chuyện. Thật sự phiền nhiễu hết sức.
            Nhưng nghĩ lại, chắc cũng chẳng ai trong cái xóm này cập nhật tin
            tức nhanh bằng ‘bả’, đến độ bác trưởng xóm cũng vẫn hay sang nhà đàm
            đạo chuyện đời với bà từ sáng đến chẩm tối chưa thấy về.
          </div>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "300px",
          bgcolor: "#CF420D",
        }}
      >
        <div>
          <CustomWidthTooltip
            title=" Cái Xóm Vịt có nhiều sự đến mấy cũng không mất cái tình. Ở đây
                người ta yêu quý và hay giúp đỡ nhau lắm. Nhất là bà Vịt, ngoài
                cái tính hay bon chen vào chuyên người khác, nhưng mà ở bà luôn
                có một cái tính hay ho, ấy là ‘nhiều chuyện’"
          >
            <Button
              sx={{
                m: 1,
                width: "400px",
                backgroundColor: "#fff",
                padding: " 40px 0",
                boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                fontFamily: "Lexend",
                fontWeight: 600,
                fontSize: "30px",
                color: "#CF420D",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              ĐÁNG TIN CẬY
            </Button>
          </CustomWidthTooltip>
        </div>
        <div>
          <CustomWidthTooltip title=" Chẳng ai trong cái Xóm Vịt này ‘thân thiện’ hơn bà Vịt cả. Đi đến đâu bà cũng làm thân được, thậm chí cả anh Cò bay đi đâu cả ngày bà còn biết.">
            <Button
              sx={{
                m: 1,
                width: "400px",
                backgroundColor: "#fff",
                padding: " 40px 0",
                boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                fontFamily: "Lexend",
                fontWeight: 600,
                fontSize: "30px",
                color: "#CF420D",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              THÂN THIỆN
            </Button>
          </CustomWidthTooltip>
        </div>
        <div>
          <CustomWidthTooltip title="Dù cho có ‘buôn dưa lê’ cách mấy, bà Vịt vẫn chưa bao giờ để lộ bất kì một bí mật của bất cứ ai trong xóm ra ngoài cả. Chắc cũng vì vậy mà người ta lại gọi cái xóm này là Xóm Vịt.">
            <Button
              sx={{
                m: 1,
                width: "400px",
                backgroundColor: "#fff",
                padding: " 40px 0",
                boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                fontFamily: "Lexend",
                fontWeight: 600,
                fontSize: "30px",
                color: "#CF420D",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              AN TOÀN
            </Button>
          </CustomWidthTooltip>
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

export default Home;
