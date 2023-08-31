import React from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import Logo from "../../assets/app_logo/app_l.png";

const DrawerFooter = () => {
  return (
    <Box className={classess.drawer_footer} style={{ display: "flex" }}>
      {/* <img className={classess.drawer_footer__image} src={Logo} alt="logo" /> */}
      {/* <Box className={classess.drawer_footer__content}>
                <span
                    className={classess.drawer_footer__content__small}
                >
                    Powered by
                </span>
                <span
                    className={classess.drawer_footer__content__big}
                >
                    Black Lion
                </span>
            </Box> */}
    </Box>
  );
};

export default DrawerFooter;
