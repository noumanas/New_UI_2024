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
      <Box
        varient="div"
        component="div"
        className={classess.page__form_page_container}
      >
        <Box
          varient="div"
          component="div"
          className={classess.page__form_page_container__login}
        >
          <LoginForm />
        </Box>

        <Box
          varient="div"
          component="div"
          className={classess.page__form_page_container__loginContant}
        >
          <CallOutlinedIcon
            sx={{
              height: "16px",
              width: "16px",
              color: "#4FFCB7",
            }}
          />

          <span
            className={classess.page__form_page_container__loginContant__text}

            // variant="caption"
            // display="block"
            // className={classess.page__contact__contactText}
            // gutterBottom
          >
            24/7 Customer Support
          </span>
        </Box>

        <Box className={classess.page__form_page_container__details_container}>
          <span style={{ color: "#fff", cursor: "default" }}>
            Version 1.12.0
          </span>
          <span>Release Notes</span>
          <span>Terms & Agreement</span>
          <span>Privacy Right</span>
        </Box>

        <Box
          variant="caption"
          display="block"
          className={classess.page__form_page_container__ownership_container}
        >
          <span>Powered by BlackLion Inc 2023. All Rights Reserved</span>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginContainer;
