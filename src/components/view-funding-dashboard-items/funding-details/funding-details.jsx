import React, {
  useEffect,
  // useRef,
  useState,
} from "react";
import classess from "./style.module.scss";
// import classes from "../../../containers/home/style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
// import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
// import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";
import { countries } from "country-data";

// import AddMyArtist from "../../../components/add-my-artist-popup/add-my-artist";
// import SimilarArtist from "../../../components/similar-artist/similar-artist";
// import ArtistTopTracks from "../../../components/artist-top-tracks/artist-top-tracks";
import axios from "axios";
import useGetSimilarArtist from "../../../hooks/useGetSimilarArtist";
// import ViewGraph from "../../../containers/graph/viewsgraph/graph";
// import RevenueGraph from "../../../containers/graph/revenuegraph/graph";
// import Switch from "@mui/material/Switch";
// import Collapse from "@mui/material/Collapse";
// import FormControlLabel from "@mui/material/FormControlLabel";
import GenreGraph from "../../../containers/graph/streamGraph/graph";
// import BubbleMaps from "../../../containers/graph/stats/statsGraph";
// import SocialMediaGraph from "../../../containers/graph/socialMediaGraph/graph";
// import { useQuery } from "@tanstack/react-query";
// import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../../redux/slice/artist";
import { config as URLconfig } from "../../../enviorment/enviorment";
import {
  Chip,
  CircularProgress,
  Hidden,
  Skeleton,
  Typography,
} from "@mui/material";
import { viewArtistUseStyles } from "../../../custom-mui-style/custom-mui-styles";
// import RecommendCollaborations from "../../../components/recommend-collaborations/recommend-collaborations";
import { getItemToLocalStorage } from "../../../services/storage";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import moment from "moment";
// import TourRecommendations from "../../../containers/graph/tourRecommendations/graph";
import Tooltip from "@mui/material/Tooltip";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import appleMusicIcon from "../../../assets/social/social-icon1.png";
import youtubeIcon from "../../..//assets/social/social-icon2.png";
import spotifyIcon from "../../../assets/social/social-icon3.png";
import deezerIcon from "../../../assets/social/social-icon5.png";
import amazonMusicIcon from "../../../assets/social/social-icon6.png";
import tidalIcon from "../../../assets/social/social-icon7.png";
import tiktokIcon from "../../../assets/social/social-icon8.png";
import instagramIcon from "../../../assets/social/social-icon9.png";
import twitterIcon from "../../../assets/social/social-icon10.png";

import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

import { PiMusicNotesPlusBold } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { addCommasToNumber } from "../../../utils/helper";
import { FiFileText } from "react-icons/fi";
const FundingDetails = ({
  contract_length,
  //   artist,
  //   internationalNumberFormat,
  totalFunding,
  totalTracks,
  new_music_estimiate,
  //   setValue,
  openPanel,
  openPanel2,
  borderColor,
  borderRadius,
  isContentVisible,
  contractPanel,
}) => {
  const initialBorderStyle = {
    borderLeft: "1px solid #5a7380",
    borderTop: "1px solid #5a7380",
    borderRadius: "0",
  };

  const changedBorderStyle = {
    border: `2px solid ${borderColor}`,
    borderBottomRightRadius: borderRadius,
  };

  const borderStyle =
    borderColor === "black" ? initialBorderStyle : changedBorderStyle;

  // const borderStyle = {
  //   borderLeft: `1px solid ${borderColor}`,
  //   borderTop: `1px solid ${borderColor}`,
  //   // padding: "10px",
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const status = useSelector((state) => state.artist.status);
  // const authUser = useSelector((state) => state.auth.user);
  // const similarArtist = useSelector(
  //   (state) => state.similar_artist.similarArtist
  // );
  const selectedTracksCount = useSelector(
    (state) => state.artist.selectedTracksCount
  );
  const reports = useSelector((state) => state.artist.reports);

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
  const isLoading = useSelector((state) => state.artist.isLoading);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleButtonClick = () => {
    openPanel();
  };
  const handleButtonClick2 = () => {
    openPanel2();
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
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

  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((on) => !on);
  };

  const [clicked, setClicked] = React.useState(true);

  const handleClicked = () => {
    setClicked((off) => !off);
  };

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
    console.log("view ", queue);
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
  // const styles = viewArtistUseStyles();

  const [contractType, setContractType] = useState(false);
  const [selectedContract, setSelectedContract] = useState("Initiate Contract"); // Store the selected contract type

  const contractTypeList = [
    "contract type one",
    "contract type two",
    "contract type three",
    "contract type four",
  ];
  const showContractTypeList = () => {
    setContractType(!contractType);
  };

  const selectContractType = (contract) => {
    setSelectedContract(contract);
    setContractType(false);
  };
  const openContractPanel = () => {
    contractPanel();
  };

  const [containerHeight, setContainerHeight] = useState(45.1); // Default height

  const toggleHeight = () => {
    if (containerHeight === 45.1) {
      setContainerHeight(8.5);
    } else {
      setContainerHeight(45.1);
    }
  };

  return (
    <Container maxWidth="xxl">
      <Grid
        className={classess.page}
        style={{
          height: containerHeight + "rem",
          overflow: containerHeight === 8.5 ? "hidden" : "unset",
          transition: "height 0.3s ease",
        }}
      >
        <Grid container sm={12} lg={12} xl={12}>
          {/* // ? left grid */}
          <Grid sm={12} lg={4} xl={4} md={12} className={classess.page__artist}>
            <Box
              varient="div"
              component="div"
              className={classess.page__artist__box}
            >
              <Box
                sx={{
                  paddingBottom: "10px",
                }}
              >
                <Box
                  className={`${classess.page__artist__box__editbtn} ${
                    hovered ? classess.hovered : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Box className={classess.page__artist__box__editbtn__icon}>
                    <IconButton
                      size="small"
                      className={
                        classess.page__artist__box__editbtn__icon__btnICon
                      }
                      style={{
                        backgroundColor: hovered ? "#4FFCB7" : "#4FFCB7",
                        width: hovered ? "100px" : "30px", // Adjust the width as needed
                        height: hovered ? "30" : "30px",
                        borderRadius: hovered ? "12px" : "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <CreateIcon
                        style={{
                          color: hovered ? "#000" : "#000",
                          width: hovered ? "15px" : "15px",
                          height: "15px",
                        }}
                      />
                      {hovered && <span>Edit</span>}
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  className={classess.page__artist__box__topdetails}
                  sx={{
                    marginTop: "-20px",
                    // height: "105px",
                  }}
                >
                  <Box
                    className={classess.page__artist__box__topdetails__image}
                  >
                    <div>
                      {status === "succeeded" ? (
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Avatar
                            src={artist?.avatar}
                            alt={artist?.name}
                            sx={{
                              height: 85,
                              width: 85,
                              borderWidth: "4px",
                              borderColor: "#4FFCB7",
                              borderStyle: "solid",
                              objectFit: "cover",
                            }}
                          />
                          {/* Online status indicator */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: 15,
                              right: 0,
                              width: 16,
                              height: 16,
                              backgroundColor: "#4FFCB7",
                              borderRadius: "50%",
                              // border: "2px solid white",
                            }}
                          />
                        </div>
                      ) : (
                        <Skeleton
                          variant="circular"
                          width={85}
                          height={85}
                          sx={{ bgcolor: "grey.700" }}
                        />
                      )}
                    </div>
                    {/* {status === "succeeded" ? (
                      <Avatar
                        src={artist?.avatar}
                        alt={artist?.name}
                        sx={{
                          height: 85,
                          width: 85,
                          borderWidth: "5px",
                          borderColor: "#4FFCB7",
                          borderStyle: "solid",

                        }}
                      />
                    ) : (
                      <Skeleton
                        variant='circular'
                        width={85}
                        height={85}
                        sx={{ bgcolor: "grey.700" }}
                      />
                    )} */}
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
                      {artist?.name}
                    </Box>
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__artist__box__topdetails__details__email
                      }
                    >
                      {artist?.email}
                    </Box>
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__artist__box__topdetails__details__country
                      }
                    >
                      {artist?.chartmetric?.code2
                        ? countries[artist?.chartmetric?.code2.toUpperCase()]
                            ?.emoji || ""
                        : ""}
                      {"   "}
                      {artist?.chartmetric?.code2
                        ? countries[artist?.chartmetric?.code2.toUpperCase()]
                            ?.name || "N/A"
                        : "N/A"}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />
              <Box
                className={classess.page__artist__box__listnership}
                variant="div"
                component="div"
                // sx={{ height: "102px" }}
              >
                <Typography
                  className={
                    classess.page__artist__box__listnership__topheading
                  }
                >
                  LISTNERSHIP:
                </Typography>

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

                  {/* <Box
                    className={
                      classess.page__artist__box__listnership__innerlyer__trending
                    }
                  >
                    <Box>
                      <IconButton
                        size='small'
                        style={{
                          backgroundColor: "#222C41",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <TimelineIcon
                          size='small'
                          style={{
                            color: "red",
                            width: "30px",
                            height: "30px",
                          }}
                        ></TimelineIcon>
                      </IconButton>
                    </Box>

                    <Typography
                      className={
                        classess.page__artist__box__listnership__innerlyer__text3
                      }
                    >
                      TRENDING
                    </Typography>
                  </Box> */}
                </Box>
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />

              <Box
                variant="div"
                component="div"
                className={classess.page__artist__box__platforms}
                // sx={{ height: "102px" }}
              >
                <Typography
                  className={classess.page__artist__box__platforms__text}
                >
                  PLATFORMS:
                </Typography>
                <Box className={classess.page__artist__box__platforms__socials}>
                  {socialLinks?.map((item) => {
                    return (
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
                    );
                  })}
                </Box>
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />

              <Box
                className={classess.page__artist__box__genre}
                sx={
                  {
                    // overflowX: "scroll",
                    // height: "102px",
                  }
                }
              >
                <GenreGraph artist={artist} />
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />

              <Box
                className={classess.page__artist__box__tracks_info}
                sx={
                  {
                    // height: "102px",
                  }
                }
              >
                <Box
                  className={classess.page__artist__box__tracks_info__container}
                >
                  <Typography
                    className={
                      classess.page__artist__box__tracks_info__container__text
                    }
                    sx={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      paddingLeft: "10px",
                    }}
                  >
                    TOTAL TRACKS:
                  </Typography>

                  <Typography
                    className={
                      classess.page__artist__box__tracks_info__container__text2
                    }
                    sx={{
                      paddingLeft: "10px",
                    }}
                  >
                    <Tooltip title="Total tracks of the artist">
                      <span
                        className={
                          classess.page__funding__artist__details__pointer
                        }
                      >
                        {totalTracks}
                      </span>
                    </Tooltip>
                  </Typography>
                </Box>

                <Box
                  className={
                    classess.page__artist__box__tracks_info__containerright
                  }
                >
                  <Typography
                    className={
                      classess.page__artist__box__tracks_info__containerright__text
                    }
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Last updated on{" "}
                    {moment(artist?.updatedAt).format("MMMM DD YYYY h:mm:ss A")}
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                      color: "#4FFCB7",
                      borderColor: "#4FFCB7",
                      borderRadius: "12px",
                    }}
                    startIcon={
                      <SyncRoundedIcon
                        sx={{
                          bgcolor: "#222C41",
                          color: "#4FFCB7",
                        }}
                      />
                    }
                  >
                    Update Artists Stats
                  </Button>
                </Box>
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />

              <Box className={classess.page__artist__box__buttons_container}>
                <Button
                  style={
                    {
                      // width: "100%",
                      // color: "#222C41",
                      // borderRadius: "12px",
                      // backgroundColor: "#498E72",
                      // marginBottom: "6px",
                    }
                  }
                  onClick={() => navigate(`/blig/view-artist/${id}`)}
                  className={
                    classess.page__artist__box__buttons_container__fundingBtn
                  }
                >
                  Close Funding Dashboard
                </Button>

                <Button
                  style={
                    {
                      // width: "100%",
                      // color: "#fff",
                      // borderRadius: "12px",
                      // backgroundColor: "#5A7380",
                    }
                  }
                  className={
                    classess.page__artist__box__buttons_container__editDash
                  }
                  startIcon={
                    <InventoryRoundedIcon
                      sx={{
                        bgcolor: "#5A7380",
                        color: "#fff",
                      }}
                    />
                  }
                >
                  Edit Dashboard
                </Button>
              </Box>
            </Box>
          </Grid>
          {/* // ? center grid */}
          <Grid sm={12} lg={3} xl={3} md={12} className={classess.page__artist}>
            <Box
              varient="div"
              component="div"
              className={classess.page__artist__box__rightBox}
              sx={{
                borderLeft:
                  containerHeight === 8.5 ? "none" : "1px solid #5a7380",
              }}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__artist__box}
                style={{
                  height: containerHeight + "rem",
                  transition: "height 0.3s ease",
                }}
              >
                <Box
                  className={`${classess.page__artist__box__topdetails} ${classess.fundingDash}`}
                >
                  <Box>Funding Dashboard</Box>
                </Box>

                <Divider
                  className={classess.page__artist__box__horizontalline}
                />

                <Box
                  className={classess.page__artist__box__listnership}
                  variant="div"
                  component="div"
                  // sx={{
                  //   height: "102px",
                  // }}
                >
                  <Typography
                    className={
                      classess.page__artist__box__listnership__topheading
                    }
                  >
                    FUNDING ESTIMATE:
                  </Typography>

                  <Box
                    className={
                      classess.page__artist__box__listnership__innerlyer
                    }
                    // sx={{ justifyContent: "flex-start" }}
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__artist__box__listnership__innerlyer__text2
                      }
                    >
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Box
                          varient="div"
                          component="div"
                          className={
                            classess.page__funding__estimate__amount__value
                          }
                        >
                          $
                          {new_music_estimiate < 0
                            ? internationalNumberFormat.format(totalFunding)
                            : internationalNumberFormat.format(
                                new_music_estimiate + totalFunding
                              )}
                          {/* <br /> */}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Divider
                  className={classess.page__artist__box__horizontalline}
                />

                <Box
                  variant="div"
                  component="div"
                  className={classess.page__artist__box__platforms}
                  sx={{
                    lineHeight: "22px",
                    // height: "102px",
                  }}
                >
                  <Typography
                    className={classess.page__artist__box__platforms__text}
                  >
                    ACTUAL EARNINGS:
                  </Typography>
                  <Box
                  // className={classess.page__artist__box__platforms__socials}
                  >
                    <Box
                      sx={{
                        fontSize: "38px",
                        fontWeight: "700",
                        color: "white",
                      }}
                      className={classess.page__artist__box__fontSize}
                    >
                      {reports.length > 0 ? (
                        <>
                          {internationalNumberFormat.format(
                            Math.round(
                              reports[reports.length - 1]["income_report"][0]
                                .amount +
                                reports[reports.length - 1]["income_report"][1]
                                  .amount +
                                reports[reports.length - 1]["income_report"][2]
                                  .amount +
                                reports[reports.length - 1]["income_report"][3]
                                  .amount
                            )
                          )}
                        </>
                      ) : (
                        <span>$ 0</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Divider
                  className={classess.page__artist__box__horizontalline}
                />

                <Box className={classess.page__artist__box__genre}>
                  <Box
                    variant="div"
                    component="div"
                    className={classess.page__artist__box__platforms}
                    sx={{
                      // display: "flex",
                      // flexDirection: "column",
                      lineHeight: "26px",
                      // height: "102px",
                    }}
                  >
                    <Typography
                      className={classess.page__artist__box__platforms__text}
                      sx={{ textTransform: "uppercase" }}
                    >
                      New Music Estimated Earnings:
                    </Typography>
                    <Box
                      className={classess.page__artist__box__platforms__socials}
                    >
                      <Box
                        sx={{
                          fontSize: "38px",
                          fontWeight: "700",
                          color: "white",
                        }}
                        className={classess.page__artist__box__fontSize}
                      >
                        <span>
                          $ {""}
                          {new_music_estimiate < 0
                            ? 0
                            : internationalNumberFormat.format(
                                new_music_estimiate
                              )}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "30px",
                  }}
                  className={classess.page__artist__box__albumList}
                >
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#4FFCB7",
                          fontSize: "12px",
                        }}
                        className={classess.fontSize}
                      >
                        SINGLES
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "38px",
                          fontWeight: "bold",
                        }}
                        className={classess.page__artist__box__fontSize}
                      >
                        05
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    style={{ backgroundColor: "#5a7380", height: "70px" }}
                  />

                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#4FFCB7",
                          fontSize: "12px",
                        }}
                        className={classess.fontSize}
                      >
                        ALBUMS
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "38px",
                          fontWeight: "bold",
                        }}
                        className={classess.page__artist__box__fontSize}
                      >
                        05
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    style={{ backgroundColor: "#5a7380", height: "70px" }}
                  />
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#4FFCB7",
                          fontSize: "12px",
                        }}
                        className={`${classess.fontSize}`}
                      >
                        EPs
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "38px",
                          fontWeight: "bold",
                        }}
                        className={classess.page__artist__box__fontSize}
                      >
                        -
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Box
                    className={classess.page__artist__box__buttons_container}
                    style={{
                      // paddingTop: "20px",
                      position: "absolute",
                      top: "20px",
                      width: "100%",
                      padding: "0px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{
                        width: "100%",
                        color: "#222C41",
                        borderColor: "#4FFCB7",
                        borderRadius: "12px",
                        backgroundColor: "#4FFCB7",
                        fontSize: "14px",
                        fontWeight: "bold",
                        // marginBottom: "10px",
                      }}
                      onClick={handleButtonClick}
                      startIcon={<PiMusicNotesPlusBold />}
                    >
                      Add New Music
                    </Button>

                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "white",
                        paddingTop: "10px",
                      }}
                    >
                      *New tracks will improve artist funding estimates
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* // ? right grid */}
          <Grid sm={12} lg={5} xl={5} md={12} className={classess.page__artist}>
            <Box
              varient="div"
              component="div"
              className={`${classess.page__artist__box} ${classess.page__artist__box__endBox}`}
              // style={{
              //   height: containerHeight + "rem",
              //   transition: "height 0.3s ease",
              // }}
            >
              <Box className={classess.blankHeight}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "20px 40px 0px 0px",
                  }}
                  // style={{ height: containerHeight + "px" }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: "#4ffcb7",
                      color: "#000000",
                      width: "30px",
                      height: "30px",
                      transition: "color 3s ease",
                      ":hover": {
                        backgroundColor: "#4ffcb7",
                        color: "#000000",
                      },
                    }}
                    onClick={toggleHeight}
                  >
                    {containerHeight === 8.5 ? (
                      <IoIosArrowForward />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </IconButton>
                </Box>
              </Box>
              {/* <Divider className={classess.page__artist__box__horizontalline} /> */}
              <Box
                sx={
                  {
                    // width: "100%",
                    // height: "calc(100% - 155px);",
                    // borderLeft: "1px solid #5a7380",
                    // borderTop: "1px solid #5a7380",
                  }
                }
                className={classess.page__artist__box__endBox__last}
                style={borderStyle}
              >
                <Box sx={{ padding: "15px 20px 0px 20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "60px",
                    }}
                    className={classess.page__artist__box__rightBoxCss}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "45px",
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            color: " #4ffcb7",
                            textTransform: "uppercase",
                          }}
                          className={classess.fontSize}
                        >
                          Catalogue Estimated Earnings:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          <span>$</span>
                          {internationalNumberFormat.format(totalFunding)}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "-13px",
                        }}
                      >
                        <Box
                          sx={{
                            color: " #4ffcb7",
                            textTransform: "uppercase",
                          }}
                          className={classess.fontSize}
                        >
                          Catalogue ADVANCE:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          $378,857
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "-15px",
                        }}
                      >
                        <Box
                          sx={{
                            color: " #4ffcb7",
                            textTransform: "uppercase",
                          }}
                          className={classess.fontSize}
                        >
                          LENGTH OF CONTRACT:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          {contract_length} yrs
                        </Box>
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            color: " #4ffcb7",
                            textTransform: "uppercase",
                          }}
                          className={classess.fontSize}
                        >
                          RECOUPMENT PERIOD:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          3 yrs 5 mts
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classess.rightBox}>
                      <Box>
                        <Button
                          startIcon={<MdOutlineEdit />}
                          onClick={handleButtonClick2}
                        >
                          Edit Data
                        </Button>
                      </Box>

                      <Box className={classess.adjustElements}>
                        <Box
                          sx={{
                            color: " #4ffcb7",
                            textTransform: "uppercase",
                            // marginTop: "-5px",
                          }}
                          className={classess.fontSize}
                        >
                          MARKETING BUDGET:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          $378,857
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          color: " #4ffcb7",
                          textTransform: "uppercase",
                          marginTop: "-55px",
                        }}
                      >
                        <Box
                          sx={{
                            color: "#4ffcb7",
                            textTransform: "uppercase",
                          }}
                          className={classess.fontSize}
                        >
                          TOTAL TRACKS:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          <Tooltip title="Total tracks of the artist">
                            <span
                              className={
                                classess.page__funding__artist__details__pointer
                              }
                            >
                              {totalTracks}
                            </span>
                          </Tooltip>
                          <span
                            className={
                              classess.page__funding__artist__details__pointer
                            }
                          >
                            {" "}
                            ~
                          </span>
                          <Tooltip title="Number of selected tracks">
                            <span
                              className={
                                classess.page__funding__artist__details__pointer
                              }
                            >
                              {" "}
                              {selectedTracksCount}
                            </span>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            color: " #4ffcb7",
                            textTransform: "uppercase",
                            marginTop: "-43px",
                          }}
                          className={classess.fontSize}
                        >
                          ROI:
                        </Box>
                        <Box
                          sx={{
                            fontSize: "38px",
                            color: "white",
                            fontWeight: "700",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          $378,857
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {isContentVisible && (
                  <Box className={classess.contract}>
                    <Box className={classess.initiate}>
                      <Button
                        disableRipple
                        className={`${classess.btn1} ${
                          contractType ? classess.transparentBtn : ""
                        }`}
                        startIcon={
                          selectedContract === "Initiate Contract" ? (
                            <FiFileText />
                          ) : null
                        }
                        onClick={showContractTypeList}
                      >
                        {selectedContract}
                      </Button>
                      <span
                        className={`${classess.btn2} ${
                          contractType ? classess.transparentBtn2 : ""
                        }`}
                        onClick={showContractTypeList}
                      >
                        <IoIosArrowDown />
                      </span>
                    </Box>
                    {contractType && (
                      <Box className={classess.contractDetails}>
                        <Box className={classess.mainContainer}>
                          <Typography
                            sx={{
                              pb: 2,
                              color: "#4ffcb7",
                              fontSize: "12px",
                              textTransform: "uppercase",
                            }}
                          >
                            please select a contract
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              width: "100%",
                            }}
                          >
                            {contractTypeList.map((item) => (
                              <Box
                                className={classess.chipStyle}
                                onClick={() => {
                                  selectContractType(item);
                                  openContractPanel();
                                }}
                              >
                                {item}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FundingDetails;
