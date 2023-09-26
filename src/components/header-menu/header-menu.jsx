import React from "react";
import classess from "./style.module.scss";
import HeaderProfileDropDown from "../header-profile-dropdown/header-profile-dropdown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

const HeaderMenu = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box varient="div" component="div" className={classess.page}>
      {/* <Box varient="div" component="div" className={classess.page__message}>
                <div className={classess.page__message__bubble}></div>
                <img className={classess.page__message__icon} src={messagesIcon} alt="message Icon" />
            </Box> */}
      <Box
        varient="div"
        component="div"
        className={classess.page__profile_notification}
      >
        <HeaderProfileDropDown />
        {/* <div className={classess.page__profile_notification__bell}>
                    <div className={classess.page__profile_notification__bell__bubble}>2</div>
                    <img className={classess.page__profile_notification__bell__icon} src={bellIcon} alt="Bell Icon" />
                </div> */}
      </Box>
      <Box varient="div" component="div" className={classess.page__user}>
        <Typography
          className={classess.page__user__name}
          sx={{ fontFamily: "DM Sans", fontSize: 18 }}
        >
          {user.role === "artist" ? (
            user.meta_data.name
          ) : (
            <>
              <Tooltip
                title={user?.firstName}
                placement="top"
                arrow
                enterDelay={100}
              >
                <span>{user?.firstName || "N/A"}</span>
              </Tooltip>

              {/* {user?.lastName || "N/A"} */}
            </>
          )}
        </Typography>
        <span className={classess.page__user__role}>
          {user?.role === "admin"
            ? "Administrator"
            : user?.role === "user"
            ? "A&R"
            : user?.role === "legal"
            ? "Legal"
            : user?.role === "finance"
            ? "finance"
            : "Artist"}
        </span>
      </Box>
    </Box>
  );
};

export default HeaderMenu;
