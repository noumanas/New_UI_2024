import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/slice/auth";
import { scrollTopObserver } from "../../utils/helper";
import logo from "./../../assets/logo/logo-trans.png";
import { sideBarUseStyles } from "../../custom-mui-style/custom-mui-styles";
import classess from "./style.module.scss";
import HeaderMenu from "../header-menu/header-menu";
import DashboardIcon from "../../assets/drawer/DashboardIcon.png";
import ArtistIcon from "../../assets/drawer/ArtistIcon.png";
import ContractIcon from "../../assets/drawer/ContractIcon.png";
import PaymentsIcon from "../../assets/drawer/PaymentIcon.png";
import NortificationIcon from "../../assets/drawer/NortificationIcon.png";
import KycIcon from "../../assets/drawer/KycIcon.png";

import DashboardIcons from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { FaFileContract } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { TbSettingsPlus } from "react-icons/tb";

const DrawerItems = ({ handleClose }) => {
  // Redux state and dispatch
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();

  // Handle navigation to a route
  const handleNavigate = (route) => {
    navigation(route);
    handleClose();
    scrollTopObserver();
  };

  // Configuration for the primary menu items
  const config = {
    primaryMenu: [
      {
        name: "Dashboard",
        path: "/blig/home",
        icon: <RxDashboard className={classess.page__icon_colors} />,
        // (
        //   <img
        //     src={DashboardIcon}
        //     alt="Dashboard Icon"
        //     className={classess.drawer_icon}
        //   />
        // ),
      },
      {
        name: "Artists",
        path: "/blig/my-artist",
        path2: "/blig/view-artist/:id",
        path3: "/blig/view-funding-dashboard/:id",
        icon: <FaUsers className={classess.page__icon_colors} />,

        // icon: (
        //   <img
        //     src={ArtistIcon}
        //     alt="Artist Icon"
        //     className={classess.drawer_icon}
        //   />
        // ),
      },
      {
        name: "Contracts",
        path: "/blig/contracts",
        path2: "/blig/contracts/:id",
        icon: <TbNotes className={classess.page__icon_colors} />,

        // icon: (
        //   <img
        //     src={ContractIcon}
        //     alt="Contract Icon"
        //     className={classess.drawer_icon}
        //     style={{ width: "14px" }}
        //   />
        // ),
      },
      {
        name: "Payments",
        path: "/blig/payments",
        path2: "/blig/payment/:id",
        icon: <FaFileContract className={classess.page__icon_colors} />,

        // icon: (
        //   <img
        //     src={PaymentsIcon}
        //     alt="Payment Icon"
        //     className={classess.drawer_icon}
        //     style={{ width: "14px" }}
        //   />
        // ),
      },
      {
        name: "Notification",
        path: "/blig/docu-sign",
        icon: <FaBell className={classess.page__icon_colors} />,

        // icon: (
        //   <img
        //     src={NortificationIcon}
        //     alt="Nortification Icon"
        //     className={classess.drawer_icon}
        //   />
        // ),
      },
      // {
      //   name: "Verification",
      //   path: "/blig/kyc",
      //   icon: (
      //     <img
      //       src={KycIcon}
      //       alt="Dashboard Icon"
      //       className={classess.drawer_icon}
      //     />
      //   ),
      // },
    ],
  };

  const styles = sideBarUseStyles();

  return (
    user && (
      <Box variant="div" component="div" className={classess.page}>
        <Box variant="div" component="div" className={classess.topHead}>
          <img src={logo} height="69" alt="logo" />
          {/* <img src={LoginTopLogoBlack} height="69" alt="logo" /> */}
        </Box>

        <List className={classess.mainMenu}>
          {user.role !== "artist" && (
            <>
              {config.primaryMenu.map((menu, index) => {
                // Check if the current route is active
                const isPathActive =
                  location.pathname === menu.path ||
                  (menu.path2 &&
                    location.pathname.startsWith(
                      menu.path2.replace(":id", "")
                    )) ||
                  (menu.path3 &&
                    location.pathname.startsWith(
                      menu.path3.replace(":id", "")
                    ));

                return (
                  <ListItem key={menu.name} className={classess.mainMenu__list}>
                    <ListItemButton
                      component={Link}
                      to={menu.path}
                      className={classess.mainMenu__button}
                      // Handle navigation and other actions
                      onClick={() => {
                        handleClose();
                        scrollTopObserver();
                      }}
                    >
                      <ListItemIcon className={classess.mainMenu__button__icon}>
                        {/* Render the active or inactive icon */}
                        {isPathActive ? (
                          menu.icon
                        ) : (
                          <div className={classess.inactive_icon}>
                            {menu.icon}
                          </div>
                        )}
                      </ListItemIcon>

                      {/* Render the menu item text */}
                      <ListItemText
                        primary={menu.name}
                        className={classess.mainMenu__button__text}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: "500",
                          fontFamily: "DM Sans",
                        }}
                        sx={{
                          borderRight: isPathActive ? "5px solid " : null,
                          opacity: isPathActive ? "1" : "0.3",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          )}
        </List>

        <Box
          variant="div"
          component="div"
          className={classess.bottom_container}
        >
          <HeaderMenu />

          <Box
            className={classess.bottom_container__logOutbtn}
            onClick={() => {
              dispatch(logout());
              navigation("/login");
            }}
          >
            <LogoutIcon />
            <span className={classess.bottom_container__logOutbtn__button_text}>
              Logout
            </span>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default DrawerItems;
