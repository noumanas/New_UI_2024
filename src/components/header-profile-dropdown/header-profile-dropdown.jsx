import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/auth";
import homeBannerIcon from "../../assets/avatar/avatar2.avif";

const HeaderProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    user && (
      <Box
        varient="div"
        component="div"
        sx={{ flexGrow: 0 }}
        className={classess.pageContainer}
      >
        <Tooltip title={`${user?.firstName} ${user?.lastName} Profile`}>
          <IconButton
            onClick={() => {
              navigate("/blig/profile");
              handleCloseUserMenu();
            }}
            sx={{ p: 0, gap: 2 }}
          >
            {user?.profilePicture ? (
              <Avatar
                sx={{
                  border: "1px solid white",
                  width: "40px",
                  height: "40px",
                }}
                alt={`${user?.firstName} ${user?.lastName}`}
                src={user?.profilePicture}
              />
            ) : (
              <Avatar
                sx={{
                  border: "1px solid white",
                  width: "40px",
                  height: "40px",
                }}
                alt={`${user?.firstName} ${user?.lastName}`}
                src={homeBannerIcon}
              />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            key={1}
            onClick={() => {
              navigate("/blig/profile");
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem
            key={2}
            onClick={() => {
              dispatch(logout());
              handleCloseUserMenu();
              window.location.replace("/login");
            }}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  );
};

export default HeaderProfileDropDown;
