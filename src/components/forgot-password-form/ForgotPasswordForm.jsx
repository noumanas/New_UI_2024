import React from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../../redux/slice/auth";
import { config } from "../../enviorment/enviorment";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      email: event.target.email.value.toLocaleLowerCase(),
      host: config.CURRENT_HOST,
    };

    dispatch(
      forgotpassword({
        data: payload,
      })
    );
    event.target.email.value = "";
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__logo}>
        <img src={logo} alt="logo" className={classess.page__logo__img} />
        <h1 className={classess.page__logo__text}>Forget Password</h1>
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
              E-mail ID
            </label>
            <FormControl variant="filled" color="info" fullWidth>
              <input
                id="component-filled"
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
            className={classess.page__form__main__action}
          >
            <Button
              type="submit"
              className={classess.page__form__main__action__btn}
              variant="contained"
            >
              Reset Password
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
