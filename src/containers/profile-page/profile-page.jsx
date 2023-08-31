import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import editIcon from "../../assets/icons/edit.svg";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { scrollTopObserver } from "../../utils/helper";
import { updateUser, updateUserWithProfile, me } from "../../redux/slice/auth";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-number-input";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState();
  const [country, setCountry] = useState();
  const [website, setWebsite] = useState();
  const user = useSelector((state) => state.auth.user);
  const allCountries = useSelector((state) => state.country.countries);
  const [isLoading, setIsLoading] = useState(false);
  const goBack = () => {
    navigate("/blig/home");
    scrollTopObserver();
  };

  const handleProfileChange = (event) => {
    setAvatar(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setProfileImage(URL.createObjectURL(event.target.files[0]));
    setIsProfileChanged(true);
    event.target.files = null;
  };

  const resetUser = () => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
    setUsername(user?.username);
    setPhone(user?.phone);
    setCompany(user?.company);
    setCountry(user?.country);
    setWebsite(user?.website);
    setImage(user?.profilePicture);
  };

  useEffect(() => {
    if (user) {
      resetUser();
    }
  }, [user]); // eslint-disable-next-line

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!isProfileChanged) {
      try {
        const payload = {
          firstName,
          lastName,
          email,
          username,
          phone,
          company,
          country,
          website,
        };
        const response = dispatch(
          updateUser({
            id: user?.id,
            data: payload,
          })
        );

        response.then(() => {
          responsoSuccess();
        });
      } catch (err) {}
    } else {
      try {
        let payload = new FormData();
        payload.append("file", avatar);
        payload.append("firstName", firstName);
        payload.append("lastName", lastName);
        payload.append("email", email);
        payload.append("username", username);
        payload.append("phone", phone);
        payload.append("company", company);
        payload.append("country", country);
        payload.append("website", website);

        const responseImg = dispatch(
          updateUserWithProfile({
            id: user?.id,
            data: payload,
          })
        );

        responseImg.then(() => {
          responsoSuccess();
        });
      } catch (err) {
        resetUser();
      }
    }
  };

  const responsoSuccess = () => {
    dispatch(me());
    setIsLoading(false);
    resetUser();
    goBack();
  };

  return (
    <Container maxWidth="xl">
      <Box varient="div" component="div" className={classess.page}>
        <span className={classess.page__heading}>User Profile</span>
        <Box varient="div" component="div" className={classess.page__box}>
          <Box
            varient="div"
            component="div"
            className={classess.page__box__image}
          >
            <Avatar
              src={profileImage ? image : image}
              alt={firstName ? firstName : "User Image"}
              sx={{ height: 150, width: 150 }}
            />
            <IconButton
              className={classess.page__box__image__btn}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleProfileChange}
              />
              <img src={editIcon} alt="edit Icon" />
            </IconButton>
          </Box>
          <form
            autoComplete="off"
            onSubmit={onSubmit}
            className={classess.page__box__form}
          >
            <Box className={classess.page__box__form__field_container}>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  First Name *
                </label>
                <input
                  className={
                    classess.page__box__form__field_container__field__input
                  }
                  value={firstName}
                  type="text"
                  required
                  onInput={(event) => setFirstName(event.target.value)}
                  maxLength={16}
                />
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Last Name *
                </label>
                <input
                  className={
                    classess.page__box__form__field_container__field__input
                  }
                  value={lastName}
                  type="text"
                  required
                  onInput={(event) => setLastName(event.target.value)}
                  maxLength={16}
                />
              </Box>
            </Box>
            <Box className={classess.page__box__form__field_container}>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Email *
                </label>
                <input
                  className={
                    classess.page__box__form__field_container__field__input
                  }
                  value={email}
                  type="text"
                  required
                  onInput={(event) => setEmail(event.target.value)}
                  disabled
                />
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Username *
                </label>
                <input
                  className={
                    classess.page__box__form__field_container__field__input
                  }
                  value={username}
                  type="text"
                  required
                  onInput={(event) => setUsername(event.target.value)}
                  disabled
                />
              </Box>
            </Box>
            <Box className={classess.page__box__form__field_container}>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Phone *
                </label>

                <PhoneInput
                  international
                  className={
                    classess.page__box__form__field_container__field__phoneinput
                  }
                  defaultCountry={country}
                  placeholder="Enter phone number"
                  value={phone}
                  name="phone"
                  onChange={setPhone}
                  required
                  autoComplete="off"
                  countryCallingCodeEditable={false}
                />
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Company
                </label>
                <input
                  className={
                    classess.page__box__form__field_container__field__input
                  }
                  value={company}
                  type="text"
                  // required
                  onInput={(event) => setCompany(event.target.value)}
                  maxLength={30}
                />
              </Box>
            </Box>
            <Box className={classess.page__box__form__field_container}>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Country
                </label>
                <select
                  value={country}
                  className={
                    classess.page__box__form__field_container__field__select
                  }
                  onChange={(event) => setCountry(event.target.value)}
                >
                  {allCountries && allCountries.length ? (
                    <>
                      <option value="">Select Country</option>
                      {allCountries.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">Select Country</option>
                  )}
                </select>
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__form__field_container__field}
              >
                <label
                  className={
                    classess.page__box__form__field_container__field__label
                  }
                >
                  Website
                </label>
                <input
                  className={
                    classess.page__box__form__field_container__field__input
                  }
                  value={website}
                  type="text"
                  onInput={(event) => setWebsite(event.target.value)}
                />
              </Box>
            </Box>
            <Box
              varient="div"
              component="div"
              className={classess.page__box__form__actions}
            >
              <Stack
                direction="row"
                gap={5}
                sx={{ width: { xs: "100%", sm: "100%", lg: "49%" } }}
              >
                <Button
                  variant="contained"
                  type="button"
                  className={classess.page__box__form__actions__cancel_btn}
                  disabled={isLoading}
                  onClick={goBack}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  className={classess.page__box__form__actions__submit_btn}
                  disabled={isLoading}
                >
                  {isLoading && <CircularProgress size={25} color="inherit" />}
                  Submit
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
