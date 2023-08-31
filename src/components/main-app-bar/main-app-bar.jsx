import React, { useState } from "react";
import classess from "./style.module.scss";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LOGO from "./../../assets/logo/logo-trans.png";

const MainAppBar = ({ children }) => {
  return (
    <Box varient="div" component="div" className={classess.page}>
      {/* <AppBar
        position="static"
        component="nav"
        className={classess.page__app_bar}
      >
        <Container component="div">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={LOGO}
                alt="blacklion logo"
                className={classess.page__app_bar__logo}
              />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar> */}

      <Box varient="div" component="div" sx={{ width: "100%" }}>
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};

AppBar.propTypes = {
  children: PropTypes.any,
};

export default MainAppBar;
