import React, { useEffect, useState } from "react";
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
import SearchAutcomplete from "../search-autcomplete/search-autcomplete";
import { _fetchToken } from "../../utils/spotifyApiServiceHandler";
import { searchArtist } from "../../api/spotify.api";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";
import useArtist from "../../hooks/useArtist";

const ArtistSignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");
  const [spotify_id, setSpotify_id] = useState("");
  const [searchedArtistList, setSearchedArtistList] = useState([]);
  const [passwordIcon, setPasswordIcon] = useState("password");
  const [bool, setBool] = useState(false);
  const [genres, setgenres] = useState([]);

  const fetchSpotifyToken = async () => await _fetchToken();

  useEffect(() => {
    fetchSpotifyToken();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (bool) {
      const payload = {
        firstName: "",
        lastName: "",
        username: event.target.username.value,
        email: event.target.email.value.toLocaleLowerCase(),
        password: event.target.password.value,
        role: "artist",
        meta_data: {
          name: event.target.name.value,
          spotify_id,
          avatar: image,
          genres: genres,
        },
      };

      dispatch(
        addUser({
          data: payload,
        })
      );

      event.target.name.value = "";
      event.target.username.value = "";
      event.target.email.value = "";
      event.target.password.value = "";
      emptyFields();
    } else {
      toast.warning("Kindly select yourself on searchbox");
    }
  };

  const handleSearch = (event) => {
    const toSearch = event.target.value;
    setSearch(toSearch);

    if (toSearch.length >= 3) {
      searchArtist(toSearch)
        .then((res) => {
          const artist = res.artists.items;
          setSearchedArtistList([...artist.map(mapSearchArtist)]);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    } else {
      setSearchedArtistList([]);
    }
  };

  const handleSearchItem = (artist) => {
    setSearch("");
    emptyFields();
    setName(artist.name);
    setImage(artist.image);
    setgenres(artist.genres);
    setSpotify_id(artist.id);
    setBool(true);
  };

  const emptyFields = () => {
    setSearchedArtistList([]);
    setName("");
    setImage("");
    setSpotify_id("");
    setBool(false);
  };

  const mapSearchArtist = (item) => {
    let obj = {};

    obj.id = item?.id;
    obj.name = item?.name;
    obj.genres = item?.genres;

    if (item?.images && item?.images.length) {
      obj.image = item?.images[0].url;
    } else {
      obj.image = "";
    }

    return obj;
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__logo}>
        <img src={logo} alt="logo" className={classess.page__logo__img} />
        <h1 className={classess.page__logo__text}>Signup to Black Lion</h1>
      </Box>

      <SearchAutcomplete
        onInput={handleSearch}
        search={search}
        list={searchedArtistList}
        handleSearchItem={handleSearchItem}
      />

      {bool && (
        <Box mb={4} variant="div" component="div">
          <Avatar sx={{ height: "120px", width: "120px" }} src={image} />
        </Box>
      )}

      <Box varient="div" component="div" className={classess.page__form}>
        <form
          action=""
          className={classess.page__form__main}
          onSubmit={onSubmit}
        >
          {bool && (
            <Stack direction="row" gap={2} width="100%">
              <Box
                varient="div"
                component="div"
                className={classess.page__form__main__field_container}
              >
                <label
                  className={classess.page__form__main__field_container__label}
                >
                  Artist Name
                </label>
                <FormControl variant="filled" color="info" fullWidth>
                  <input
                    id="component-filled"
                    name="name"
                    type="text"
                    className={
                      classess.page__form__main__field_container__input
                    }
                    value={name}
                    disabled
                  />
                </FormControl>
              </Box>
            </Stack>
          )}
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
                  autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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

export default ArtistSignupForm;
