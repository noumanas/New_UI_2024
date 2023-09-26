import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistById,
  updateArtist,
  updateArtistWithProfile,
} from "../../../redux/slice/artist";
import { Avatar, Grid } from "@mui/material";
import editIcon from "../../../assets/icons/edit.svg";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { scrollTopObserver } from "../../../utils/helper";
import PhoneInput from "react-phone-number-input";
import SpotifySvg from "../../../assets/spotify.svg";

const EditArtist = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const artist = useSelector((state) => state.artist.artist);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [cityState, setCityState] = useState();
  const [country, setCountry] = useState();
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const allCountries = useSelector((state) => state.country.countries);

  useEffect(() => {
    if (id) {
      initUIData();
    }
  }, [id]);

  useEffect(() => {
    if (artist) {
      setName(artist?.name);
      setEmail(artist?.email || `${artist?.name}@spotify.com`);
      setTelephone(artist?.telephone);
      setCityState(handleCombineCityState(artist?.city, artist?.state));
      setCountry(artist?.country);
      setAvatar(artist?.avatar);
      setImage(artist?.avatar);
    }
  }, [artist]); // eslint-disable-next-line

  const initUIData = () => {
    dispatch(
      getArtistById({
        id,
      })
    );
  };

  const handleProfileChange = (event) => {
    setAvatar(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setIsProfileChanged(true);
    event.target.files = null;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { city, state } = handleSeperateCityState(cityState);

    try {
      if (!isProfileChanged) {
        const payload = {
          name,
          telephone,
          email,
          city,
          state,
          country,
          spotify_id: artist?.spotify_id,
          avatar,
        };

        const response = dispatch(
          updateArtist({
            id: artist?._id,
            data: payload,
          })
        );

        response.then(() => {
          setIsLoading(false);
          // navigate("/blig/home");
          navigate(-1);
        });
      } else {
        let payload = new FormData();

        payload.append("file", avatar);
        payload.append("name", name);
        payload.append("email", email);
        payload.append("telephone", telephone);
        payload.append("city", city);
        payload.append("state", state);
        payload.append("country", country);
        payload.append("spotify_id", artist?.spotify_id);

        const respImage = dispatch(
          updateArtistWithProfile({
            id: artist?._id,
            data: payload,
          })
        );

        respImage.then(() => {
          setIsLoading(false);
          // navigate("/blig/home");
          navigate(-1);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeperateCityState = () => {
    const splitted = cityState.split(",");
    let city, state;
    if (splitted[0]) {
      city = splitted[0].trim();
    }
    if (splitted[1]) {
      state = splitted[1].trim();
    }
    return { city, state };
  };

  const handleCombineCityState = (artistCity, artistState) => {
    if (artistCity && artistState) {
      return `${artistCity}, ${artistState}`;
    } else if (artistCity && !artistState) {
      return artistCity;
    } else if (!artistCity && artistState) {
      return artistState;
    } else {
      return "";
    }
  };

  return (
    <Grid container pl={2.5}>
      <Grid item sm={12} lg={9} xl={9}>
        <Box varient="div" component="div" className={classess.page}>
          <Box
            varient="div"
            component="div"
            className={classess.page__title_bar}
          >
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              className={classess.page__title_bar__title}
            >
              Edit Artist Details
            </Typography>
          </Box>
          <Box
            varient="div"
            component="div"
            sx={{ p: { xs: 2, sm: 3, lg: 5 }, mt: 3 }}
            className={classess.page__fieldsContainer}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__fieldsContainer__image_container}
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
              <Box
                varient="div"
                component="div"
                className={
                  classess.page__fieldsContainer__image_container__avatar_container
                }
              >
                <Avatar
                  src={image}
                  alt={name}
                  sx={{ height: 89, width: 89, border: "5px solid #4FFCB7" }}
                />
                <div
                  className={
                    classess.page__fieldsContainer__image_container__avatar_container__icon
                  }
                >
                  <IconButton
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
                    <img src={editIcon} alt="edit button" />
                  </IconButton>
                </div>
              </Box>
              <span className={classess.page__fieldsContainer__title}>
                {artist?.name}
              </span>
            </Box>

            <form
              action=""
              className={classess.page__fieldsContainer__form}
              autoComplete="off"
              onSubmit={handleOnSubmit}
            >
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Artist Name *
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    value={name || ""}
                    name="name"
                    placeholder="Enter Artist Name"
                    onInput={(event) => setName(event.target.value)}
                    type="text"
                    minLength={3}
                    maxLength={25}
                    required
                  />
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Phone
                  </label>

                  <PhoneInput
                    international
                    className={
                      classess.page__fieldsContainer__form__formfield__phoneinput
                    }
                    defaultCountry={country}
                    placeholder="Enter phone number"
                    value={telephone}
                    name="telephone"
                    onChange={setTelephone}
                    limitMaxLength={16}
                    autoComplete="off"
                    countryCallingCodeEditable={false}
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    E-mail Address
                  </label>
                  <input
                    type="email"
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    value={email}
                    name="email"
                    maxLength={80}
                    placeholder="Enter Email Address"
                    onInput={(event) => setEmail(event.target.value)}
                    required
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Country
                  </label>
                  <select
                    value={country}
                    className={
                      classess.page__fieldsContainer__form__formfield__input
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
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    <img
                      className={
                        classess.page__fieldsContainer__form__formfield__label__image
                      }
                      alt="spotify"
                      src={SpotifySvg}
                    />
                    <>Spotify ID *</>
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    value={artist?.spotify_id || "N/A"}
                    name="spotify_id"
                    placeholder="Enter Spotify Id"
                    readOnly
                    disabled
                  />
                </Box>
              </Stack>
              <Box
                varient="div"
                component="div"
                className={classess.page__fieldsContainer__form__action}
              >
                <Button
                  variant="contained"
                  className={
                    classess.page__fieldsContainer__form__action__cancel_btn
                  }
                  sx={{ width: { xs: "100%", sm: "100%", lg: "20%" } }}
                  onClick={() => {
                    // navigate(`/blig/view-artist/${id}`);
                    navigate(-1);
                    scrollTopObserver();
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  className={
                    classess.page__fieldsContainer__form__action__submit_btn
                  }
                  variant="contained"
                  loading={isLoading}
                  sx={{ width: { xs: "100%", sm: "100%", lg: "20%" } }}
                >
                  Update Artist
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditArtist;
