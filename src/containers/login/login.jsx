import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import MainAppBar from "../../components/main-app-bar/main-app-bar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import LoginForm from "../../components/login-form/login-form";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

const LoginContainer = () => {
  return (
    <Box
      varient="div"
      component="div"
      sx={{ display: "flex", pb: { xs: 10, lg: 0 } }}
      className={classess.page}
    >
      <MainAppBar>
        <Box varient="div" component="div" className={classess.page__login}>
          <LoginForm />
        </Box>
        <Box className={classess.loginContant}>
          <Box
            varient="div"
            component="div"
            className={classess.page__contact}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box>
              <CallOutlinedIcon
                sx={{
                  color: "#4FFCB7",
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="caption"
                display="block"
                className={classess.page__contact__contactText}
                gutterBottom
              >
                24/7 Customer Support
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            marginTop: "40px",
          }}
        >
          <span>Version 1.12.0</span>
          <span style={{ color: "#4FFCB7", cursor: "pointer" }}>
            Release Notes
          </span>
          <span style={{ color: "#4FFCB7", cursor: "pointer" }}>
            Terms & Agreement
          </span>
          <span style={{ color: "#4FFCB7", cursor: "pointer" }}>
            Privacy Right
          </span>
        </Box>
        <Typography
          variant="caption"
          display="block"
          className={classess.page__login__form__coptrights}
          // gutterBottom
          sx={{ textAlign: "center", paddingTop: "30px" }}
        >
          Powered by BlackLion Inc 2023. All Rights Reserved
        </Typography>
        {/* </Box> */}
      </MainAppBar>
    </Box>
  );
};

export default LoginContainer;
