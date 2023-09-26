import React, { useEffect, useState, useRef } from "react";
import classess from "./style.module.scss";
// import classes from "../../home/style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { countries } from "country-data";
import Grid from "@mui/material/Grid";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Chip from "@mui/material/Chip";
import AddMyArtist from "../../../components/add-my-artist-popup/add-my-artist";
import SimilarArtist from "../../../components/similar-artist/similar-artist";
import ArtistTopTracks from "../../../components/artist-top-tracks/artist-top-tracks";
import axios from "axios";
import useGetSimilarArtist from "../../../hooks/useGetSimilarArtist";
import RevenueGraph from "../../graph/revenuegraph/graph";
import SwotGraph from "../../graph/swotanalysisgraph/graph";
import GenreGraph from "../../graph/streamGraph/graph";
import SocialMediaGraph from "../../graph/socialMediaGraph/graph";
import { useQuery } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { Skeleton, Typography } from "@mui/material";
import { viewArtistUseStyles } from "../../../custom-mui-style/custom-mui-styles";
import RecommendCollaborations from "../../../components/recommend-collaborations/recommend-collaborations";
import { getItemToLocalStorage } from "../../../services/storage";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import moment from "moment";
import TourRecommendations from "../../../containers/graph/tourRecommendations/graph";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import { addCommasToNumber } from "../../../utils/helper";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Tooltip from "@mui/material/Tooltip";

import {
  setTotalTracks,
  getArtist,
  getArtistById,
  getReports,
  setIsLoading,
  setNewMusicTracks,
  setSelectedTrackCount,
  setSelectedTracks,
  setTotalFunding,
  setTracks,
  emptySingularArtist,
} from "../../../redux/slice/artist";

import appleMusicIcon from "../../../assets/social/social-icon1.png";
import youtubeIcon from "../../..//assets/social/social-icon2.png";
import spotifyIcon from "../../../assets/social/social-icon3.png";
import deezerIcon from "../../../assets/social/social-icon5.png";
import amazonMusicIcon from "../../../assets/social/social-icon6.png";
import tidalIcon from "../../../assets/social/social-icon7.png";
import tiktokIcon from "../../../assets/social/social-icon8.png";
import instagramIcon from "../../../assets/social/social-icon9.png";
import twitterIcon from "../../../assets/social/social-icon10.png";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import GreenPencil from "../../../assets/buttonsicons/pencil2.png";
const ViewArtist = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const navigate = useNavigate();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const status = useSelector((state) => state.artist.status);
  const totalTracks = useSelector((state) => state.artist.totalTracks);
  // const authUser = useSelector((state) => state.auth.user);
  const similarArtist = useSelector(
    (state) => state.similar_artist.similarArtist
  );
  const [queue, setQueue] = useState(null);
  const [isLoadedQueue, setIsLoadedQueue] = useState(false);
  const [tracks, settracks] = useState([]);
  const [toptrackfunding, settoptrackfunding] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const similarArtistHook = useGetSimilarArtist();
  const [sortedTopTract, setSortedTopTract] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  const [loading, setLoading] = React.useState(false);
  const storedToken = getItemToLocalStorage("accessToken");
  const [socialLinks, setSocialLinks] = useState([]);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (artist?.spotify_id !== undefined) {
      const fetchTracks = async (spotify_id) => {
        axios
          .get(`${URLconfig.BASE_URL}/artist-tracks/${spotify_id}`)
          .then(async (res) => {
            const artistTracks = await res.data;

            let selected_tracks = artistTracks?.data
              .filter((track) => track.is_selected === 1)
              .map((el) => el._id);

            let new_music_selected_tracks = artistTracks?.data
              .filter((track) => track.is_selected === 2)
              .map((el) => el._id);

            dispatchRef.current(setSelectedTrackCount(selected_tracks.length));
            dispatchRef.current(setSelectedTracks(selected_tracks));
            dispatchRef.current(setNewMusicTracks(new_music_selected_tracks));

            dispatchRef.current(
              setTracks([...artistTracks.data.map(mapTracks)])
            );
            dispatchRef.current(setTotalTracks(artistTracks.data.length));
          })
          .catch((error) => {
            console.log("Error Of GetTracks " + error);
          });
      };

      dispatchRef.current(getReports(artist.spotify_id));
      fetchTracks(artist?.spotify_id);
    }
  }, [artist, dispatchRef]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [collaborators, setCollaborator] = useState([]);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((on) => !on);
  };

  const [clicked, setClicked] = React.useState(true);

  const handleClicked = () => {
    setClicked((off) => !off);
  };

  useEffect(() => {
    if (artist) {
      axios
        .get(`${URLconfig.BASE_URL}/artist-stats/${artist?.spotify_id}`)
        .then((res) => {
          let socialLinks = res?.data?.data?.links;
          setSocialLinks(
            socialLinks.filter(
              (item) =>
                item.source === "youtube" ||
                item.source === "deezer" ||
                item.source === "spotify" ||
                item.source === "tidal" ||
                item.source === "amazon" ||
                item.source === "apple_music"
            )
          );
        })
        .catch((error) => {
          console.log("artist stats error", error);
          // Call another API here
          axios
            .post(
              `${URLconfig.BASE_URL}/songstats/stats/sociallinks/${artist?.spotify_id}`
            )
            .then((res) => {
              // Handle the response from the second API call
              // ...
              // console.log('res',res);
            })
            .catch((error) => {
              console.log("second API error", error);
            });
        });
    }
  }, [artist]); // eslint-disable-next-line

  useEffect(() => {
    if (id) {
      dispatch(getArtistById({ id }));
    }
  }, [id]);

  const getSimilarArtistForCurrentArtist = (id) => {
    similarArtistHook.similarArtists(id);
  };

  const mapTracks = (artistTrack) => ({
    id: artistTrack._id,
    name: artistTrack.title,
    image: artistTrack.track_img,
    stream_income_share: artistTrack.stream_income_share,
    spotify_streams_total: artistTrack.spotify_streams_total,
    youtube_video_views_total: artistTrack.youtube_video_views_total,
    tiktok_views_total: artistTrack.tiktok_views_total,
    deezer_reach_total: artistTrack.deezer_reach_total,
    isrc: artistTrack.isrc,
    release_date: artistTrack.release_date,
    track_type: artistTrack.track_type,
    last_streams_growth: artistTrack.last_streams_growth,
    historic: artistTrack.historic,
  });

  const UpdateArtistStatAndChartmetrics = () => {
    setLoading(true);
    const payload = {
      spotify_id: artist?.spotify_id,
      user: user,
    };
    console.log("artist?.spotify_id", artist?.spotify_id);
    axios
      .post(
        `${URLconfig.BASE_URL}/artists/artistupdate/stats-chatmetrics`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        toast.success("Updates Artist Stats");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const artist_add_to_spotlight = () => {
    const payload = {
      spotify_id: artist?.spotify_id,
      name: artist?.name,
      email: artist?.email,
      image: artist?.avatar,
      artist_id: artist._id,
      country: artist?.country,
    };
    axios
      .post(`${URLconfig.BASE_URL}/spotlight`, payload, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        toast.success("Spotlight Added");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  //calculate the top10track Funding for last 60 days
  async function calcalute_tracks_estimate(tracks) {
    axios
      .post(
        `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}/track`,
        tracks
      )
      .then((res) => {
        settoptrackfunding(res.data.data.funding);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const filteredData = tracks.map((item) => {
      const fundingItem = toptrackfunding.find(
        (funding) => funding.TrackID === item.id
      );
      if (fundingItem) {
        return {
          ...item,
          funding: fundingItem.funding,
        };
      } else {
        return item;
      }
    });
    setSortedTopTract(filteredData.sort((a, b) => b.funding - a.funding));
  }, [tracks, toptrackfunding]);

  useEffect(() => {
    if (artist && Object.keys(artist).length) {
      let isApiSubscribed = true;

      axios(
        `${URLconfig.BASE_URL}/artist-tracks/top/tracks/${artist.spotify_id}`
      ).then(async (res) => {
        if (isApiSubscribed) {
          const artistTracks = res.data.data.top10tracks;
          settracks([...artistTracks.map(mapTracks)]);
          calcalute_tracks_estimate(artistTracks.map(mapTracks));
          setLoader(false);
        }
      });

      if (isApiSubscribed) {
        getSimilarArtistForCurrentArtist(artist?.spotify_id);
      }

      return () => {
        isApiSubscribed = false;
      };
    }
  }, [artist]); // eslint-disable-next-line

  useEffect(() => {
    if (artist && queue !== 0) {
      const intervalId = setInterval(() => {
        axios
          .get(`${URLconfig.BASE_URL}/songstats/counter/${artist?.spotify_id}`)
          .then((response) => {
            let result = response.data;
            setQueue(result.data?.count);
            setIsLoadedQueue(true);
          });
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [artist, queue]);

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const styles = viewArtistUseStyles();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const getEmail = (email, name) => {
    if (email) {
      return email;
    }

    const newName = name ? name.replace(/\s+/, "") : "Unknown";
    return `${newName}@blacklionapp.xyz`;
  };
  return (
    <Container maxWidth="xxl" className={styles.root}>
      <Grid
        // spacing={2}
        container
        rowSpacing={0.5}
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
        sm={12}
        lg={12}
        xl={12}
      >
        {/* Top Grid Start From Here */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={3}
          xl={3}
          className={classess.page__artist}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__artist__box}
          >
            <Box className={classess.page__artist__box__topdetails}>
              <Box className={classess.page__artist__box__topdetails__image}>
                <Box>
                  {status === "succeeded" ? (
                    <Box>
                      <Avatar
                        src={artist?.avatar}
                        alt={artist?.name}
                        className={
                          classess.page__artist__box__topdetails__image
                        }
                        sx={{
                          border: "4px solid #4FFCB7",
                        }}
                      />
                      <Box className={classess.onlineInd} />
                    </Box>
                  ) : (
                    <Skeleton
                      variant="circular"
                      width={89}
                      height={89}
                      sx={{ bgcolor: "grey.700" }}
                      className={classess.skeleton}
                    />
                  )}
                </Box>
              </Box>

              <Box
                variant="div"
                component="div"
                className={classess.page__artist__box__topdetails__details}
              >
                <Box
                  variant="div"
                  component="div"
                  className={
                    classess.page__artist__box__topdetails__details__artistname
                  }
                >
                  <Box>
                    <Tooltip
                      title={artist?.name}
                      placement="top"
                      arrow
                      enterDelay={100}
                    >
                      <span
                        className={
                          classess.page__artist__box__topdetails__details__artistname__name
                        }
                      >
                        {artist?.name}
                      </span>
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{ mt: 0.5, cursor: "pointer" }}
                    onClick={() => {
                      dispatch(emptySingularArtist());
                      navigate(`/blig/edit-artist/${id}`);
                    }}
                  >
                    {/* <CreateIcon
                      style={{
                        color: "#4ffcb7",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    /> */}
                    <img src={GreenPencil} alt="pencil icon" />
                  </Box>
                </Box>

                <Box
                  variant="div"
                  component="div"
                  className={
                    classess.page__artist__box__topdetails__details__email
                  }
                >
                  {getEmail(artist?.email, artist?.name)}
                  {/* {artist?.email ? artist.email : "N/A"} */}
                  {/* {artist?.email
                    ? artist.email
                    : artist.name.replace(/\s+/g, "").toLowerCase() +
                      "@spotify.com"} */}
                </Box>
                <Box
                  variant="div"
                  component="div"
                  className={
                    classess.page__artist__box__topdetails__details__country
                  }
                >
                  <span
                    className={
                      classess.page__artist__box__topdetails__details__country__flag
                    }
                  >
                    {artist?.chartmetric?.code2
                      ? countries[artist?.chartmetric?.code2.toUpperCase()]
                          ?.emoji || "N/A"
                      : ""}
                  </span>

                  <span
                    className={
                      classess.page__artist__box__topdetails__details__country__name
                    }
                  >
                    {artist?.chartmetric?.code2
                      ? countries[artist?.chartmetric?.code2.toUpperCase()]
                          ?.name || "N/A"
                      : "N/A"}
                  </span>
                </Box>
                {isLoadedQueue ? (
                  <span style={{ color: "#FFF" }}>
                    {queue === 0 ? (
                      <span></span>
                    ) : (
                      <Chip color="warning" label={`Pending ${queue}`} />
                    )}
                  </span>
                ) : (
                  // <CircularProgress size={40} color="secondary" />
                  <LinearProgress variant="determinate" value={progress} />
                )}
              </Box>
            </Box>

            <Divider className={classess.page__artist__box__horizontalline} />

            <Box
              className={classess.page__artist__box__listnership}
              variant="div"
              component="div"
            >
              <span
                className={classess.page__artist__box__listnership__topheading}
              >
                LISTNERSHIP:
              </span>

              <Box
                className={classess.page__artist__box__listnership__innerlyer}
              >
                <Box
                  variant="div"
                  component="div"
                  className={
                    classess.page__artist__box__listnership__innerlyer__text2
                  }
                >
                  {addCommasToNumber(
                    artist?.chartmetric?.cm_statistics?.sp_monthly_listeners
                  )}
                </Box>
              </Box>
              {/* <Button
                variant="contained"
                onClick={() => artist_add_to_spotlight()}
              >
                Add to Spotlight
              </Button> */}
            </Box>

            <Divider className={classess.page__artist__box__horizontalline} />

            <Box
              variant="div"
              component="div"
              className={classess.page__artist__box__platforms}
              sx={{ height: "102px" }}
            >
              <span className={classess.page__artist__box__platforms__text}>
                PLATFORMS:
              </span>
              <Box className={classess.page__artist__box__platforms__socials}>
                {socialLinks?.map((item) => {
                  return (
                    <>
                      <Tooltip
                        title={item?.source}
                        placement="top"
                        arrow
                        enterDelay={100}
                      >
                        <img
                          style={{ cursor: "pointer" }}
                          key={item.id}
                          src={
                            (item.source === "deezer" && deezerIcon) ||
                            (item.source === "spotify" && spotifyIcon) ||
                            (item.source === "amazon" && amazonMusicIcon) ||
                            (item.source === "tidal" && tidalIcon) ||
                            (item.source === "tiktok" && tiktokIcon) ||
                            (item.source === "apple_music" && appleMusicIcon) ||
                            (item.source === "twitter" && twitterIcon) ||
                            (item.source === "instagram" && instagramIcon) ||
                            (item.source === "youtube" && youtubeIcon)
                          }
                          className={
                            classess.page__artist__box__platforms__socials__icons
                          }
                          alt={`${item.source}`}
                          onClick={() => openInNewTab(`${item.url}`)}
                        />
                      </Tooltip>
                    </>
                  );
                })}
              </Box>
            </Box>

            <Divider className={classess.page__artist__box__horizontalline} />

            <Box className={classess.page__artist__box__genre}>
              <GenreGraph artist={artist} />
            </Box>

            <Divider className={classess.page__artist__box__horizontalline} />

            <Box className={classess.page__artist__box__tracks_info}>
              <Box className={classess.page__artist__box__tracks_info__left}>
                <Box
                  className={
                    classess.page__artist__box__tracks_info__left__text1
                  }
                >
                  Total Tracks:
                </Box>
                <Box
                  className={
                    classess.page__artist__box__tracks_info__left__text2
                  }
                >
                  {totalTracks}
                </Box>
              </Box>
              <Box className={classess.page__artist__box__tracks_info__right}>
                <Box
                  className={
                    classess.page__artist__box__tracks_info__right__top_details
                  }
                >
                  Last updated on{" "}
                  {moment(artist?.updatedAt).format("MMM DD YY")}
                  {" at "}
                  {moment(artist?.updatedAt).format("hh:mm")}
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    autoFocus
                    onClick={UpdateArtistStatAndChartmetrics}
                    className={
                      classess.page__artist__box__tracks_info__right__update_botton
                    }
                    loading={loading}
                    disabled={loading}
                    startIcon={<SyncRoundedIcon />}
                  >
                    Update Stats
                  </Button>
                </Box>
              </Box>
            </Box>

            <Divider className={classess.page__artist__box__horizontalline} />

            <Box className={classess.page__artist__box__buttons_container}>
              <Button
                className={
                  classess.page__artist__box__buttons_container__view_funding_dashbord
                }
                sx={{
                  opacity: isLoadedQueue && queue === 0 ? "1" : "0.3",
                }}
                disabled={isLoadedQueue && queue === 0 ? false : true}
                onClick={() => navigate(`/blig/view-funding-dashboard/${id}`)}
                startIcon={
                  <TrendingUpRoundedIcon
                    className={
                      classess.page__artist__box__buttons_container__view_funding_dashbord__inner_icon
                    }
                  />
                }
              >
                View Funding Dashboard
              </Button>

              <Button
                className={
                  classess.page__artist__box__buttons_container__edit_dashbord_btn
                }
                startIcon={
                  <InventoryRoundedIcon
                    className={
                      classess.page__artist__box__buttons_container__edit_dashbord_btn__inner_icon
                    }
                  />
                }
              >
                Edit Dashboard
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} lg={6} xl={6}>
          <Box varient="div" component="div" className={classess.page__details}>
            <Box
              varient="div"
              component="div"
              className={classess.page__details__box}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__details__box__header}
              >
                <span className={classess.page__details__box__header__title}>
                  top tracks
                </span>
              </Box>
              <ArtistTopTracks
                loader={loader}
                tracks={tracks}
                artist={artist}
                toptrackfunding={toptrackfunding}
                sortedTopTract={sortedTopTract}
                internationalNumberFormat={internationalNumberFormat}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={3} sm={12} lg={3} xl={3}>
          <Box
            varient="div"
            component="div"
            // className={`${classess.page__similar__box} ${classess.tabHide} `}
            className={classess.page__similar__box}
          >
            <SimilarArtist similarArtist={similarArtist} loader={loader} />
          </Box>
        </Grid>
        {/* Top Grid Ends Here */}

        {/* Mid Grid Starts From Here */}

        <Grid item xs={12} sm={12} lg={12} xl={3}>
          <Box component="div" variant="div">
            <RevenueGraph artist={artist} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} lg={6} xl={5}>
          <Box>
            <TourRecommendations />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} lg={6} xl={4}>
          <Box
            varient="div"
            component="div"
            // className={classess.page__similar__box2}
          >
            <SocialMediaGraph artist={artist} />
          </Box>
        </Grid>

        {/* Mid Grid Ends Here */}

        {/* Third Grid Starts From Here */}

        <Grid item xs={12} sm={12} lg={12} xl={4}>
          {/* <Box
            component="div"
            variant="div"
            className={classess.page__artist__box3}
          >
            <SwotGraph artist={artist} />
          </Box> */}
        </Grid>

        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Box>
            {artist && (
              <RecommendCollaborations
                artist_collaborations={artist?.collaborations}
              />
            )}
          </Box>
        </Grid>
        {/* Third Grid Ends  Here */}
      </Grid>
    </Container>
  );
};

export default ViewArtist;
