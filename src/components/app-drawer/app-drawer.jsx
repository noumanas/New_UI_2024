import * as React from "react";
import classess from "./style.module.scss";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerFooter from "../drawer-footer/drawer-footer";
import DrawerItems from "../drawer-items/drawer-items";

const drawerWidth = 200;

const AppDrawer = ({ mobileOpen, handleClose, window }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      variant="div"
      sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
      className={classess.nav}
    >
      {/* // ? Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleClose}
        className={classess.nav__drawer}
        sx={{
          display: { xs: "block", sm: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#393E4F",
            color: "#d0d0d0",
            border: "none",
          },
        }}
      >
        <DrawerItems handleClose={handleClose} />
        <DrawerFooter />
      </Drawer>

      {/* // ? Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            marginTop: "55px",
            background: "transparent",
            color: "#d0d0d0",
            height: "auto",
            border: "none",
          },
        }}
        className={classess.nav__drawer}
        open={true}
      >
        <DrawerItems handleClose={handleClose} />
        <DrawerFooter />
      </Drawer>
    </Box>
  );
};

AppDrawer.propTypes = {
  mobileOpen: PropTypes.any,
  handleClose: PropTypes.func,
  window: PropTypes.func,
};

export default AppDrawer;
