import React, { useEffect, useRef, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { countries } from "country-data";
import axios from "axios";
import useGetSimilarArtist from "../../../hooks/useGetSimilarArtist";
import GenreGraph from "../../../containers/graph/streamGraph/graph";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtistById,
  emptySingularArtist,
} from "../../../redux/slice/artist";
import { config as URLconfig } from "../../../enviorment/enviorment";
import {
  Chip,
  CircularProgress,
  Hidden,
  Skeleton,
  Typography,
} from "@mui/material";
import { viewArtistUseStyles } from "../../../custom-mui-style/custom-mui-styles";
import { getItemToLocalStorage } from "../../../services/storage";
import CreateIcon from "@mui/icons-material/Create";
import GreenPencil from "../../../assets/buttonsicons/pencil2.png";

import { IconButton } from "@mui/material";
import moment from "moment";
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
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { addCommasToNumber } from "../../../utils/helper";
import { FiFileText } from "react-icons/fi";
import CloseDashIcon from "../../../assets/closhDashboard.png";
import CheckIcon from "../../../assets/buttonsicons/CheckIcon.png";
const FundingDetails = ({
  contract_length,
  artist,
  // internationalNumberFormat,
  totalFunding,
  totalTracks,
  new_music_estimiate,
  setValue,
  openPanel,
  openPanel2,
  borderColor,
  borderRadius,
  isContentVisible,
  contractPanel,
  marketing_budget,
  artist_advance,
  showTextValues,
  RECOUPMENTPERIOD,
  RECOUPMENTPERIOD_IN_ENG,
  SingleCount,
  EpCount,
  AlbumCount,
  EstimatedYearlyEarnings,
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

  // const artist = useSelector((state) => state.artist.artist);
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
  const UpdatesTrackInfo = () => {
    setLoading(true);
    const payload = {
      spotify_id: artist?.spotify_id,
    };
    axios
      .post(`${URLconfig.BASE_URL}/artists/artistupdate/`, payload, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        setQueue(null);
      })
      .catch((error) => {
        console.log(error);
      });
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

  // useEffect(() => {
  //   if (artist && Object.keys(artist).length) {
  //     let isApiSubscribed = true;

  //     axios(
  //       `${URLconfig.BASE_URL}/artist-tracks/top/tracks/${artist.spotify_id}`
  //     ).then(async (res) => {
  //       if (isApiSubscribed) {
  //         const artistTracks = res.data.data.top10tracks;
  //         settracks([...artistTracks.map(mapTracks)]);
  //         calcalute_tracks_estimate(artistTracks.map(mapTracks));
  //         setLoader(false);
  //       }
  //     });

  //     if (isApiSubscribed) {
  //       getSimilarArtistForCurrentArtist(artist?.spotify_id);
  //     }

  //     return () => {
  //       isApiSubscribed = false;
  //     };
  //   }
  // }, [artist]); // eslint-disable-next-line

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

  const [containerHeight, setContainerHeight] = useState(42.125); // Default height

  const toggleHeight = () => {
    if (containerHeight === 42.125) {
      setContainerHeight(8.5);
    } else {
      setContainerHeight(42.125);
    }
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setContractType(false);
      }
    };

    if (contractType) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contractType]);
  const getEmail = (email, name) => {
    if (email) {
      return email;
    }

    const newName = name ? name.replace(/\s+/, "") : "Unknown";
    return `${newName}@blacklionapp.xyz`;
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
          <Grid
            sm={12}
            lg={3.5}
            xl={3.5}
            md={12}
            className={classess.page__artist}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__artist__box}
            >
              <Box>
                <Box className={classess.page__artist__box__topdetails}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className={classess.page__artist__box__topdetails__image}
                    >
                      <div>
                        {status === "succeeded" ? (
                          <div className={classess.onlineStatus}>
                            <Avatar
                              src={artist?.avatar}
                              alt={artist?.name}
                              className={classess.avatar}
                            />
                            {/* Online status indicator */}
                            <div className={classess.onlineCircle} />
                          </div>
                        ) : (
                          <Skeleton
                            variant="circular"
                            width={85}
                            height={85}
                            sx={{ bgcolor: "grey.700" }}
                            className={classess.skeleton}
                          />
                        )}
                      </div>
                    </Box>

                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__artist__box__topdetails__details
                      }
                    >
                      <Box
                        variant="div"
                        component="div"
                        className={
                          classess.page__artist__box__topdetails__details__artistname
                        }
                      >
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
                        <Tooltip
                          title={"Edit Artist"}
                          placement="top"
                          arrow
                          enterDelay={100}
                        >
                          <Box
                            sx={{ mt: 0.5, cursor: "pointer" }}
                            onClick={() => {
                              dispatch(emptySingularArtist());
                              navigate(`/blig/edit-artist/${id}`);
                            }}
                          >
                            <img src={GreenPencil} alt="pencil icon" />
                          </Box>
                        </Tooltip>
                      </Box>
                      <Box
                        variant="div"
                        component="div"
                        className={
                          classess.page__artist__box__topdetails__details__email
                        }
                      >
                        {getEmail(artist?.email, artist?.name)}

                        {/* {artist?.email ? artist?.email : "N/A"} */}
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
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />
              <Box
                className={classess.page__artist__box__listnership}
                variant="div"
                component="div"
                // sx={{ height: "102px" }}
              >
                <Typography
                  className={classess.page__artist__box__smallHeading}
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
                    <Box className={classess.page__artist__box__fontSize}>
                      {addCommasToNumber(
                        artist?.chartmetric?.cm_statistics?.sp_monthly_listeners
                      )}
                    </Box>
                  </Box>
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
                  className={classess.page__artist__box__smallHeading}
                >
                  PLATFORMS:
                </Typography>
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
                              (item.source === "apple_music" &&
                                appleMusicIcon) ||
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
                <Box
                  className={classess.page__artist__box__tracks_info__container}
                >
                  <Typography
                    className={classess.page__artist__box__smallHeading}
                  >
                    TOTAL TRACKS:
                  </Typography>

                  <Typography
                    className={
                      classess.page__artist__box__tracks_info__container__text2
                    }
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
                    sx={{}}
                  >
                    Last updated on{" "}
                    {moment(artist?.updatedAt).format("MMM DD YY")}
                    {" at "}
                    {moment(artist?.updatedAt).format("hh:mm")}
                  </Typography>
                  <Button
                    className={classess.updateArtist}
                    variant="outlined"
                    onClick={UpdatesTrackInfo}
                    style={{}}
                    startIcon={<SyncRoundedIcon />}
                  >
                    Update Stats
                  </Button>
                </Box>
              </Box>

              <Divider className={classess.page__artist__box__horizontalline} />

              <Box className={classess.page__artist__box__buttons_containers}>
                <Button
                  onClick={() => navigate(`/blig/view-artist/${id}`)}
                  className={
                    classess.page__artist__box__buttons_containers__fundingBtn
                  }
                >
                  <img src={CloseDashIcon} alt="CloseDashIcon" /> Close Funding
                  Dashboard
                </Button>

                <Button
                  className={
                    classess.page__artist__box__buttons_containers__editDash
                  }
                  startIcon={<InventoryRoundedIcon />}
                  onClick={() => navigate(`/blig/edit-dashboard/${id}`)}
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
                  // height: containerHeight + "rem",
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
                >
                  <Typography
                    className={classess.page__artist__box__smallHeading}
                  >
                    ESTIMATED YEARLY EARNINGS:
                    {/* Estimated Yearly Earnings: */}
                  </Typography>

                  <Box
                    className={
                      classess.page__artist__box__listnership__innerlyer
                    }
                  >
                    <Box variant="div" component="div">
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Box varient="div" component="div">
                          <Box className={classess.page__artist__box__fontSize}>
                            $
                            {internationalNumberFormat.format(
                              EstimatedYearlyEarnings
                            )}
                            {/* {new_music_estimiate < 0
                              ? internationalNumberFormat.format(totalFunding)
                              : internationalNumberFormat.format(
                                  new_music_estimiate + totalFunding
                                )} */}
                            {/* <br /> */}
                          </Box>
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
                >
                  <Typography
                    className={classess.page__artist__box__smallHeading}
                  >
                    STATEMENT EARNINGS:
                    {/* ACTUAL EARNINGS: */}
                  </Typography>
                  <Box
                    className={classess.page__artist__box__platforms__verify}
                  >
                    <Box className={classess.page__artist__box__fontSize}>
                      {reports.length > 0 ? (
                        <>
                          $
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
                        <span>$0</span>
                      )}
                    </Box>

                    {reports.length > 0 ? (
                      <Box>
                        <Tooltip
                          title="Verified"
                          placement="top"
                          arrow
                          enterDelay={100}
                        >
                          <IconButton
                            sx={{
                              backgroundColor: "#4FFCB7",
                              ":hover": { backgroundColor: "#4FFCB7" },
                            }}
                          >
                            <img
                              src={CheckIcon}
                              alt="check icon"
                              width={"10px"}
                              height={"10px"}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      " "
                    )}
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
                  >
                    <Typography
                      className={classess.page__artist__box__smallHeading}
                    >
                      New Music Estimated Earnings:
                    </Typography>
                    <Box
                      className={classess.page__artist__box__platforms__socials}
                    >
                      <Box className={classess.page__artist__box__fontSize}>
                        <span>
                          $
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

                <Box className={classess.page__artist__box__albumList}>
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        className={classess.page__artist__box__smallHeading}
                      >
                        SINGLES
                      </Typography>
                      <Typography
                        className={classess.page__artist__box__fontSize}
                      >
                        {SingleCount}
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
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        className={classess.page__artist__box__smallHeading}
                      >
                        ALBUMS
                      </Typography>
                      <Typography
                        className={classess.page__artist__box__fontSize}
                      >
                        {AlbumCount}
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
                        className={classess.page__artist__box__smallHeading}
                      >
                        EPs
                      </Typography>
                      <Typography
                        className={classess.page__artist__box__fontSize}
                      >
                        {EpCount}
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
                      position: "absolute",
                      top: "-8px",
                      width: "100%",
                      padding: "0px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleButtonClick}
                      startIcon={<PiMusicNotesPlusBold />}
                    >
                      Add New Music
                    </Button>

                    <Typography className={classess.newTracksText}>
                      *New tracks will improve artist gross earnings.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* // ? right grid */}
          <Grid
            sm={12}
            lg={5.5}
            xl={5.5}
            md={12}
            className={classess.page__artist}
          >
            <Box
              varient="div"
              component="div"
              className={`${classess.page__artist__box} ${classess.page__artist__box__endBox}`}
            >
              <Box className={classess.blankHeight}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "30px 40px 0px 0px",
                  }}
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
              <Box
                className={classess.page__artist__box__endBox__last}
                style={borderStyle}
              >
                <Box sx={{ padding: "15px 20px 0px 20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "80px",
                    }}
                    className={classess.page__artist__box__rightBoxCss}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <Box>
                        <Box
                          className={classess.page__artist__box__smallHeading}
                        >
                          Catalogue Estimated Earnings:
                        </Box>
                        <Box className={classess.page__artist__box__fontSize}>
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
                          className={classess.page__artist__box__smallHeading}
                        >
                          Catalogue ADVANCE:
                        </Box>
                        <Box className={classess.page__artist__box__fontSize}>
                          $
                          {internationalNumberFormat.format(artist_advance)
                            ? internationalNumberFormat.format(artist_advance)
                            : "0"}
                          {/* {showTextValues && artAdvance ? artAdvance : "0"} */}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "-5px",
                        }}
                      >
                        <Box
                          className={classess.page__artist__box__smallHeading}
                        >
                          LENGTH OF CONTRACT:
                        </Box>
                        <Box className={classess.page__artist__box__fontSize}>
                          {contract_length} yrs
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classess.EditDataBox}>
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
                          className={classess.page__artist__box__smallHeading}
                        >
                          MARKETING BUDGET:
                        </Box>
                        <Box
                          sx={{
                            textTransform: "uppercase",
                          }}
                          className={classess.page__artist__box__fontSize}
                        >
                          $
                          {internationalNumberFormat.format(marketing_budget)
                            ? internationalNumberFormat.format(marketing_budget)
                            : "0"}
                          {/* {showTextValues
                            ? showTextValues && marketBudget
                            : "0"} */}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "-10px",
                        }}
                      >
                        <Box
                          className={classess.page__artist__box__smallHeading}
                        >
                          TOTAL TRACKS:
                        </Box>
                        <Box className={classess.page__artist__box__fontSize}>
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
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ padding: "20px 0px 10px 20px" }}>
                  <Box className={classess.page__artist__box__smallHeading}>
                    RECOUPMENT PERIOD:
                  </Box>
                  <Box className={classess.page__artist__box__fontSize}>
                    {RECOUPMENTPERIOD + " Months ~ " + RECOUPMENTPERIOD_IN_ENG}
                  </Box>
                </Box>
                <Box sx={{ padding: "10px 20px" }}>
                  <Box
                    sx={{
                      marginTop: "-10px",
                    }}
                    className={classess.page__artist__box__smallHeading}
                  >
                    ROI:
                  </Box>
                  <Box className={classess.page__artist__box__fontSize}>
                    $
                    {artist_advance === 0 || marketing_budget === 0
                      ? 0
                      : internationalNumberFormat.format(
                          totalFunding -
                            (parseInt(artist_advance) +
                              parseInt(marketing_budget))
                        )}
                  </Box>
                </Box>
                {isContentVisible && (
                  <Box className={classess.contract} ref={dropdownRef}>
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
