import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getArtistById } from "../../redux/slice/artist";
import { config as URLconfig } from "../../enviorment/enviorment";
import { BiArrowBack } from "react-icons/bi";
import { GiLoveSong } from "react-icons/gi";
import LinearProgressWithLabel from "../linear-progress-bar/linear-progress-bar";
import CircularProgress from "@mui/material/CircularProgress";

const ArtistAllTracks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const [tracks, settracks] = useState([]);
  const BASE_URL = URLconfig.BASE_URL;

  useEffect(() => {
    if (id && !artist) {
      initUIData();
    }
  }, [id, artist]);

  const initUIData = () => {
    dispatch(
      getArtistById({
        id,
      })
    );
  };

  useEffect(() => {
    if (artist && Object.keys(artist).length) {
      getTopTracks(artist?.spotify_id);
      console.log(artist);
    }
  }, [artist]);

  const getTopTracks = (spoid) => {
    fetch(`${BASE_URL}/artist-tracks/${spoid}`)
      .then(async (res) => {
        const artistTacks = await res.json();
        settracks(artistTacks.data);
        console.log("tarcaks => ", artistTacks);
      })
      .catch((error) => {
        console.log("Error Of GetTracks " + error);
      });
  };

  return (
    <Container maxWidth="xxl">
      <Box varient="div" component="div" className={classess.page}>
        <Box varient="div" component="div" className={classess.page__box}>
          <Box
            varient="div"
            component="div"
            className={classess.page__box__header}
          >
            <BiArrowBack
              size={26}
              color="#d0d0d0"
              className={classess.page__box__header__icon}
              onClick={() => navigate(`/blig/view-artist/${id}`)}
            />
            <span className={classess.page__box__header__title}>
              Artist Tracks
            </span>
          </Box>
          <Box
            varient="div"
            component="div"
            className={classess.page__box__details}
          >
            <Avatar
              className={classess.page__box__details__avatar}
              src={artist?.avatar}
              alt={artist?.name}
            />
            <Box
              varient="div"
              component="div"
              className={classess.page__box__details__contain}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__box__details__contain__box}
              >
                <span
                  className={classess.page__box__details__contain__box__key}
                >
                  Name:
                </span>
                <span
                  className={classess.page__box__details__contain__box__value}
                >
                  {artist?.name}
                </span>
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__details__contain__box}
              >
                <span
                  className={classess.page__box__details__contain__box__key}
                >
                  Tracks:
                </span>
                <span
                  className={classess.page__box__details__contain__box__value}
                >
                  {tracks && tracks.length ? tracks.length : 0}
                  <GiLoveSong size={14} color="white" title="Songs" />
                </span>
              </Box>
            </Box>
          </Box>
          <Box
            varient="div"
            component="div"
            className={classess.page__box__tracks}
          >
            <Box
              component="div"
              varient="div"
              className={classess.page__box__tracks__list}
            >
              {tracks && tracks.length ? (
                <ul className={classess.page__box__tracks__list__ul}>
                  {tracks.map((track, idx) => (
                    <li
                      key={idx}
                      className={classess.page__box__tracks__list__ul__li}
                    >
                      <Avatar
                        src={track?.track_img}
                        alt={track?.title}
                        sx={{ height: 60, width: 60 }}
                      />
                      <Box varient="div" component="div" sx={{ width: "80%" }}>
                        <span
                          className={
                            classess.page__box__tracks__list__ul__li__name
                          }
                          title={track?.title}
                        >
                          {track?.title}
                        </span>
                      </Box>
                      <LinearProgressWithLabel
                        value={track?.stream_income_share}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <Box
                  component="div"
                  varient="div"
                  className={classess.page__box__tracks__list__loader}
                >
                  <CircularProgress size={40} color="secondary" />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ArtistAllTracks;
