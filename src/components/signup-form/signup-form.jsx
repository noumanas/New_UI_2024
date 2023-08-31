import React, { useState } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// icons
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/auth";
import { useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState("password");

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      username: event.target.username.value,
      phone: event.target.phone.value,
      email: event.target.email.value.toLocaleLowerCase(),
      password: event.target.password.value,
    };
    dispatch(
      addUser({
        data: payload,
      })
    );
    event.target.firstname.value = "";
    event.target.lastname.value = "";
    event.target.username.value = "";
    event.target.phone.value = "";
    event.target.email.value = "";
    event.target.password.value = "";

    navigate("/login");
  };
  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__logo}>
        <img src={logo} alt="logo" className={classess.page__logo__img} />
        <h1 className={classess.page__logo__text}>Signup to Black Lion</h1>
      </Box>
      <Box varient="div" component="div" className={classess.page__form}>
        <form
          action=""
          className={classess.page__form__main}
          onSubmit={onSubmit}
        >
          <Stack direction="row" gap={2} mt={4} width="100%">
            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__field_container}
            >
              <label
                className={classess.page__form__main__field_container__label}
              >
                First Name
              </label>
              <FormControl variant="filled" color="info">
                <input
                  
                  id="component-filled"
                  name="firstname"
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
                Last Name
              </label>
              <FormControl variant="filled" color="info">
                <input
                  id="component-filled"
                  name="lastname"
                  type="text"
                  className={classess.page__form__main__field_container__input}
                  required
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" gap={2} width="100%">
            <Box
              varient="div"
              component="div"
              className={classess.page__form__main__field_container}
            >
              <label
                className={classess.page__form__main__field_container__label}
              >
                Username
              </label>
              <FormControl variant="filled" color="info" fullWidth>
                <input
                  id="component-filled"
                  name="username"
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
                Phone Number
              </label>
              <FormControl variant="filled" color="info" fullWidth>
                <input
                  id="component-filled"
                  name="phone"
                  type="text"
                  className={classess.page__form__main__field_container__input}
                  required
                />
              </FormControl>
            </Box>
          </Stack>
          <Box
            varient="div"
            component="div"
            className={classess.page__form__main__field_container}
          >
            <label
              className={classess.page__form__main__field_container__label}
            >
              E-mail ID
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <input
                id="component-filled"
                name="email"
                type="email"
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
              Password
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <input
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
            className={classess.page__form__main__action}
          >
            <Button
              type="submit"
              className={classess.page__form__main__action__btn}
              variant="contained"
            >
               Register Now
            </Button>
            <Button
              type="button"
              variant="contained"
              className={classess.page__form__main__action__login_back_btn}
              onClick={() => navigate("/login")}
              disabled={false}
            >
              Back to Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignupForm;
