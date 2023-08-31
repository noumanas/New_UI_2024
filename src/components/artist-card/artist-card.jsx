import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptySingularArtist, getArtist } from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { scrollTopObserver, tableSortingAlgo } from "../../utils/helper";
// import { getUsers } from "../../redux/slice/user";
import { CircularProgress } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { FabStyles } from "../../custom-mui-style/custom-mui-styles";
import { getUsers } from "../../redux/slice/user";

const ArtistCard = ({ selectedView }) => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
  const authUser = useSelector((state) => state.auth.user);
  const artist = useSelector((state) => state.artist.artists);
  const artistApiStatus = useSelector((state) => state.artist.status);
  const [artistList, setArtistList] = useState([]);
  const [sliceContent, setSliceContent] = useState(6);
  const FabButton = FabStyles();

  useEffect(() => {
    dispatchRef.current(getUsers());
  }, [dispatchRef]);

  const loadMoreArtist = () => {
    let checkExceeding = sliceContent + 3;
    if (checkExceeding <= artist.length) {
      setSliceContent(checkExceeding);
    } else {
      let diff = checkExceeding - artist.length;
      checkExceeding -= diff;
      setSliceContent(checkExceeding);
    }
  };

  useEffect(() => {
    dispatchRef.current(getArtist());
  }, [dispatchRef]);

  useEffect(() => {
    if (artist) {
      setArtistList(artist);
    }
  }, [artist]);

  useEffect(() => {
    if (selectedView === "list") {
      setSliceContent(6);
    }
  }, [selectedView]);

  const getEmail = (email, name) => {
    if (email) {
      return email;
    }
    const newName = name.replace(/\s+/, "");
    return `${newName}@spotify.com`;
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value && value.length >= 3) {
      const target = artist.filter((e) =>
        e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      const newList = tableSortingAlgo(target, "name");
      setArtistList(newList);
    } else {
      setArtistList(artist);
    }
  };

  const handleARFilter = (email) => {
    if (email) {
      setArtistList(
        users.filter((el) => el.email === email).map((usr) => usr.artists)[0]
      );
    } else {
      setArtistList(artist);
    }
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__statusBar}>
        <Typography
          variant=""
          gutterBottom
          component="div"
          className={classess.page__statusBar__title}
          sx={{ fontSize: "22px", fontWeight: "400", paddingLeft: "15px" }}
        >
          All Artists
        </Typography>

        <span className={classess.page__actionBar}>
          <Stack direction="row" spacing={2}>
            <Box
              varient="div"
              component="div"
              className={classess.page__actionBar}
              sx={{ position: "relative" }}
            >
              <input
                className={classess.page__actionBar__search}
                placeholder="Search..."
                type="text"
                onInput={(e) => handleSearch(e)}
                required
              />
              <SearchIcon
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "15px",
                  right: "20px",
                }}
              />
            </Box>

            <Fab
              size="medium"
              className={FabButton.addButton}
              color="primary"
              aria-label="add"
              onClick={() => {
                navigate("/blig/add-artist");
                scrollTopObserver();
              }}
            >
              <AddIcon />
            </Fab>
          </Stack>
          {authUser.role === "admin" && users && users.length && (
            <Box
              varient="div"
              component="div"
              className={classess.page__actionBar}
            >
              <select
                onChange={(e) => handleARFilter(e.target.value)}
                className={classess.page__actionBar__selectfield}
              >
                <option value="">Users</option>
                {users &&
                  users.length &&
                  users
                    .filter((user) => user.role !== "admin")
                    .map((user) => (
                      <option key={user._id} value={`${user.email}`}>
                        {user.email}
                      </option>
                    ))}
              </select>
            </Box>
          )}
        </span>
      </Box>

      {artistList && artistList.length ? (
        <>
          <Box className={classess.page__card_container}>
            <Box
              varient="div"
              component="div"
              className={classess.page__card_container__card_box}
            >
              {artistList.slice(0, sliceContent).map((artist, idx) => (
                <Box
                  key={idx}
                  varient="div"
                  component="div"
                  className={classess.page__card_container__card_box__card}
                >
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__card_container__card_box__card__main
                    }
                  >
                    <Avatar
                      className={
                        classess.page__card_container__card_box__card__main__avatar
                      }
                      src={artist?.avatar}
                      alt={artist?.name}
                    />
                    <Typography
                      className={
                        classess.page__card_container__card_box__card__main__title
                      }
                    >
                      {artist?.name}
                    </Typography>
                    <Typography
                      className={
                        classess.page__card_container__card_box__card__main__subtitle
                      }
                    >
                      {getEmail(artist?.email, artist?.name)}
                    </Typography>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__card_container__card_box__card__action
                    }
                  >
                    <Stack
                      spacing={4}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <VisibilityIcon
                        className={
                          classess.page__card_container__card_box__card__action__icon
                        }
                        onClick={() => {
                          dispatch(emptySingularArtist());
                          navigate(`/blig/view-artist/${artist?._id}`);
                          scrollTopObserver();
                        }}
                      />
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className={classess.page__card_container__action}>
              {sliceContent < artist.length && (
                <button
                  className={classess.page__card_container__action__btn}
                  onClick={loadMoreArtist}
                >
                  Load More
                </button>
              )}
            </Box>
          </Box>
        </>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "loading" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <CircularProgress size={40} color="secondary" />
        </Box>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "succeeded" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            No Artist Found.
          </Typography>
        </Box>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "failed" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            Error Cannot Load Artist.
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ArtistCard;
