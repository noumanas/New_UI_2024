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
import LoginTopLogo from "../../assets/LoginTopLogo.png.png";
const LoginForm = () => {
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
      <Box varient="div" component="div" className={classess.page__logo}>
        <img
          src={LoginTopLogo}
          alt="logo"
          className={classess.page__logo__img}
          height={90}
          width={232}
        />
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
            <label
              className={classess.page__form__main__field_container__label}
            >
              USERNAME
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <input
                id="component-filled"
                defaultValue={rememberMe ? rememberMe.email : ""}
                name="email"
                type="text"
                className={classess.page__form__main__field_container__input}
                required
              />
            </FormControl>
          </Box>

          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__field_container}
          >
            <label
              className={classess.page__form__main__field_container__label}
            >
              PASSWORD
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <input
                id="component-filled"
                defaultValue={rememberMe ? rememberMe.password : ""}
                name="password"
                type={passwordIcon}
                className={classess.page__form__main__field_container__input}
                required
              />
              <Box
                varient="div"
                component="div"
                sx={{
                  position: "absolute",
                  right: "18px",
                  top: "18px",
                  color: "#62666c",
                }}
              >
                {/* {passwordIcon === "password" ? (
                  <FiEyeOff
                    fontSize={22}
                    cursor="pointer"
                    onClick={() => setPasswordIcon("text")}
                  />
                ) : (
                  <FiEye
                    fontSize={22}
                    cursor="pointer"
                    onClick={() => setPasswordIcon("password")}
                  />
                )} */}
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
                      fontSize: 14,
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{ color: "white" }}
            />

            <Button
              onClick={() => navigate("/forgot-password")}
              variant="text"
              sx={{
                color: "#4FFCB7",
                // backgroundColor: "orange",
                // borderColor: "green",
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
                <u>Click here to request access</u>
              </span>
            </span>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
