import React from "react";
import classess from "./style.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sideBarUseStyles } from "../../custom-mui-style/custom-mui-styles";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteIcon from "@mui/icons-material/NotificationsNone";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { scrollTopObserver } from "../../utils/helper";
import logo from "./../../assets/logo/logo-trans.png";
import Box from "@mui/material/Box";
import HeaderMenu from "../header-menu/header-menu";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReceiptLongIcon from "@mui/icons-material/ContactPageOutlined";
import PaymentIcon from "@mui/icons-material/CreditCardOutlined";
import { Typography } from "@mui/material";

const DrawerItems = ({ handleClose }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const handleNavigate = (route) => {
    navigation(route);
    handleClose();
    scrollTopObserver();
  };

  const config = {
    primaryMenu: [
      {
        name: "Dashboard",
        path: "/blig/home",
        icon: <HomeIcon sx={{ color: "#4FFCB7", fontSize: 24 }} />,
      },
      {
        name: "Artists",
        path: "/blig/my-artist",
        path2: "/blig/view-artist/:id",
        path3: "/blig/view-funding-dashboard/:id",
        icon: <PersonIcon sx={{ color: "#4FFCB7", fontSize: 24 }} />,
      },
      ,
      {
        name: "Contracts",
        path: "/blig/contracts",
        path2: "/blig/contracts/:id",
        icon: <ReceiptLongIcon sx={{ color: "#4FFCB7", fontSize: 24 }} />,
      },
      {
        name: "Payments",
        path: "/blig/payments",
        path2: "/blig/payment/:id",
        icon: <PaymentIcon sx={{ color: "#4FFCB7", fontSize: 24 }} />,
      },
      {
        name: "Notification",
        path: "/blig/docu-sign",
        icon: <NoteIcon sx={{ color: "#4FFCB7", fontSize: 24 }} />,
      },
      {
        name: "Verification",
        path: "/blig/kyc",
        icon: (
          <DomainVerificationIcon sx={{ color: "#4FFCB7", fontSize: 24 }} />
        ),
      },
    ],
  };

  const styles = sideBarUseStyles();

  return (
    user && (
      <>
        {/* // ? top logo */}
        <Box
          variant="div"
          component="div"
          className={styles.root}
          sx={{
            background: "#222C41",
            // padding: "25px 20px",
            borderTopRightRadius: "12px",
            borderBottom: "1px solid #5A7380",
            height: "139px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} height="50" width="150" alt="logo" />
        </Box>

        {/* // ? Menu list */}
        <List className={classess.mainMenu}>
          {user.role !== "artist" && (
            <>
              {config.primaryMenu.map((menu, index) => {
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
                      className={classess.mainMenu__button}
                      onClick={() => {
                        handleNavigate(menu.path);
                      }}
                    >
                      <ListItemIcon sx={{ mr: "-20px" }}>
                        {menu.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={menu.name}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: "500",
                          fontFamily: "DM Sans",
                        }}
                        sx={{
                          borderRight: isPathActive && "5px solid #4FFCB7",
                          color: isPathActive ? "white" : "",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}

              {/* {config.primaryMenu.map((menu, index) => (
                <ListItem key={menu.name} className={classess.mainMenu__list}>
                  <ListItemButton
                    className={classess.mainMenu__button}
                    onClick={() => {
                      handleNavigate(menu.path);
                    }}
                  >
                    <ListItemIcon sx={{ mr: "-20px" }}>
                      {menu.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={menu.name}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: "500",
                        fontFamily: "DM Sans",
                      }}
                      sx={{
                        borderRight:
                          location.pathname === menu.path &&
                          "5px solid #4FFCB7",
                        color: location.pathname === menu.path && "white",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))} */}
            </>
          )}
        </List>

        {/* // ? bottom - name and logout */}
        <Box
          variant="div"
          component="div"
          sx={{
            textAlign: "center",
            background: "#222C41",
            padding: "20px",
            borderBottomRightRadius: "12px",
            borderTop: "1px solid #5e5e5e",
          }}
        >
          <HeaderMenu />

          <Box
            className={classess.logOutbtn}
            onClick={() => {
              dispatch(logout());
              navigation("/login");
            }}
          >
            <button>
              <div>
                <LogoutIcon />
              </div>
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: "DM Sans",
                  fontWeight: "700",
                }}
              >
                Logout
              </Typography>
            </button>
          </Box>
        </Box>
      </>
    )
  );
};

export default DrawerItems;
