import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import MainAppBar from "../../components/main-app-bar/main-app-bar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GradientButton from "../../components/button/gradient-button/gradient-button";
import Typography from "@mui/material/Typography";
import ForgotPasswordForm from "../../components/forgot-password-form/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Box
      varient="div"
      component="div"
      sx={{ display: "flex", pb: { xs: 10, lg: 0 } }}
      className={classess.page}
    >
      <MainAppBar>
        <Box varient="div" component="div" className={classess.page__login}>
          <ForgotPasswordForm />
        </Box>
      </MainAppBar>
    </Box>
  );
};

export default ForgotPassword;
