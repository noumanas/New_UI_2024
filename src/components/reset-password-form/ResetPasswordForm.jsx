import React, { useState } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { resetpassword } from "../../redux/slice/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState("password");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("password");

  const onSubmit = (event) => {
    event.preventDefault();

    if (event.target.password.value === event.target.repassword.value) {
      const payload = {
        password: event.target.password.value,
        token,
      };
      dispatch(
        resetpassword({
          data: payload,
        })
      );
      event.target.password.value = "";
      event.target.repassword.value = "";
      setTimeout(() => {
        navigate("/login");
      }, 750);
    } else {
      toast.error("Password must be matched");
    }
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__logo}>
        <img src={logo} alt="logo" className={classess.page__logo__img} />
        <h1 className={classess.page__logo__text}>Reset Password</h1>
      </Box>
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
              Password
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <InputLabel htmlFor="component-filled">Password</InputLabel>
              <FilledInput
                id="component-filled"
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
                {passwordIcon === "password" ? (
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
                )}
              </Box>
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
              Confirm Password
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <InputLabel htmlFor="component-filled">
                Confirm Password
              </InputLabel>
              <FilledInput
                id="component-filled"
                name="repassword"
                type={confirmPasswordIcon}
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
                {confirmPasswordIcon === "password" ? (
                  <FiEyeOff
                    fontSize={22}
                    cursor="pointer"
                    onClick={() => setConfirmPasswordIcon("text")}
                  />
                ) : (
                  <FiEye
                    fontSize={22}
                    cursor="pointer"
                    onClick={() => setConfirmPasswordIcon("password")}
                  />
                )}
              </Box>
            </FormControl>
          </Box>
          <Divider
            sx={{ background: "#4FFCB7", mt: 4, mb: 2, width: "100%" }}
          />
          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__action}
          >
            <Button
              type="submit"
              className={classess.page__form__main__action__btn}
              variant="contained"
              sx={{ width: { xs: "100%", sm: "100%", lg: "45%" } }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
