import React, { useEffect, useRef, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AppDrawer from "../app-drawer/app-drawer";
import { getCountries } from "../../redux/slice/country";
import { useDispatch } from "react-redux";

const BaseComponent = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatchRef.current(getCountries());
  }, [dispatchRef]);

  return (
    <Box varient="div" component="div" className={classess.page}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={true}
        className={classess.page__navbar}
        sx={{ boxShadow: "none" }}
      >
        <Toolbar sx={{ padding: { xs: "0 20px", sm: "0 20px", lg: "0 60px" } }}>
          <Typography
            variant="h6"
            component="div"
            className={classess.page__navbar__container}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__navbar__container__main}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleClose}
                sx={{ display: { lg: "none" } }}
              >
                <MenuIcon sx={{ fontSize: "36px" }} />
              </IconButton>
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <AppDrawer mobileOpen={open} handleClose={handleClose} />
      <Box
        component="main"
        sx={{ mt: 7, width: "100%", height: "100%" }}
        className={classess.page__box}
      >
        <Box variant="div" component="div" sx={{ pb: 10, width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default BaseComponent;
