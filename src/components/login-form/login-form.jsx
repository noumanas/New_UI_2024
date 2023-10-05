import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import { _fetchToken } from "../../utils/spotifyApiServiceHandler";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import { createNewSession } from "../../services/session";
import BlacklionLogo from "../../assets/logo/logo-trans.png";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState("password");
  const [remeber, setRemember] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: event.target.email.value.toLocaleLowerCase(),
      password: event.target.password.value,
    };
    fetchSpotifyToken();
    try {
      const response = dispatch(
        login({
          data: payload,
        })
      );
      response.then((res) => {
        createNewSession(res.payload.data.accessToken);
        if (remeber) {
          localStorage.setItem("rememberMe", JSON.stringify(payload));
        }
      });
    } catch (err) {
      toast.error(err);
    }
    event.target.email.value = "";
    event.target.password.value = "";
  };

  const fetchSpotifyToken = async () => await _fetchToken();
  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box className={classess.customForm}>
        <Box varient="div" component="div" className={classess.page__logo}>
          <img
            src={BlacklionLogo}
            alt="logo"
            className={classess.page__logo__img}
          />
          {/* <span className={classess.page__logo__text}>blacklion</span> */}
        </Box>

        <div className={classess.page__horizontalLine}></div>

        <Box varient="div" component="div" className={classess.page__form}>
          <form
            action=""
            className={classess.page__form__main}
            onSubmit={onSubmit}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__field_container}
            >
              <span
                className={classess.page__form__main__field_container__label}
              >
                USERNAME
              </span>
              <FormControl variant="filled" color="info" fullWidth>
                <input
                  id="component-filled"
                  defaultValue={rememberMe ? rememberMe.email : ""}
                  name="email"
                  type="text"
                  className={classess.page__form__main__field_container__input}
                  required
                  // sx={{
                  //   padding: "8px 15px",
                  //   "&:after": {
                  //     borderBottom: "none",
                  //   },
                  // }}
                />
              </FormControl>
            </Box>

            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__field_container}
            >
              <span
                className={classess.page__form__main__field_container__label}
              >
                PASSWORD
              </span>
              <FormControl
                variant="filled"
                color="info"
                fullWidth
                sx={{ position: "relative" }}
              >
                {/* <input
                  id="component-filled"
                  defaultValue={rememberMe ? rememberMe.password : ""}
                  name="password"
                  type={passwordIcon}
                  className={classess.page__form__main__field_container__input}
                  required
                /> */}
                <input
                  // id="component-filled"
                  defaultValue={rememberMe ? rememberMe.password : ""}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={classess.page__form__main__field_container__input}
                  required
                />
                <Box
                  varient="div"
                  component="div"
                  sx={{
                    position: "absolute",
                    right: "15px",
                    top: "0px",
                    color: "#62666c",
                  }}
                >
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </Box>
              </FormControl>
            </Box>

            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__form_action}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => setRemember(event.target.checked)}
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "#4FFCB7",
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{
                  color: "white",
                  fontWeight: "500",
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
              />

              <Button
                onClick={() => navigate("/forgot-password")}
                variant="text"
                sx={{
                  color: "#4FFCB7",
                  fontSize: "14px",
                }}
              >
                <u>Reset Password?</u>
              </Button>
            </Box>

            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__action}
            >
              <Button
                type="submit"
                className={classess.page__form__main__action__btn}
                variant="contained"
              >
                Sign In
              </Button>
            </Box>

            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__dnthaveaccount}
              sx={{
                fontSize: "14px",
                mt: 2,
              }}
            >
              <span>
                Don’t have an account yet?
                <span
                  className={classess.page__form__main__dnthaveaccount__spantwo}
                >
                  <span>Click here to request access</span>
                </span>
              </span>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
