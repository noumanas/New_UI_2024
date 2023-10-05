import { Box, Grid, Button, ButtonGroup } from "@mui/material";
import classess from "./style.module.scss";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import TourRecommendations from "../../containers/graph/tourRecommendations/graph";
import { searchArtist, getArtist } from "../../api/spotify.api";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../redux/slice/artist";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";

const RecommendCollaborations = () => {
  const artist = useSelector((state) => state.artist.artist);
  const [collaboration, setCollaboration] = useState(true);
  const [financial, setFinancial] = useState(false);
  const [recommendations, setRecommendations] = useState(false);
  const [loader, setloader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    if (artist?.collaborations && artist?.collaborations.length > 0) {
      let NotFoundImage = "https://via.placeholder.com/600x400?text=Not+Found";
      let newCollaborations = []; // Temporary array to store new collaboration data

      const promises = artist?.collaborations.map((e, i) => {
        return searchArtist(e["title"])
          .then((res) => {
            const item = res.artists.items[0];
            let obj = {};
            obj["title"] = e["title"];
            obj["whyis"] = e["description"];
            obj["avatar"] = item?.images[0]?.url || NotFoundImage;
            newCollaborations.push(obj); // Push the new object into the temporary array
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      });

      Promise.all(promises).finally(() => {
        // Wait for all promises to resolve or reject
        setCollaborations(newCollaborations); // Update the state with new collaboration data
        setloader(false);
      });
    }
  }, [artist]);

  let fetcher = (x) => {
    // setCollaboration(collaborations.concat(arr));
  };
  // let SpofityFetch = (data) => {
  //   console.log("SpofityFetch");
  //   setData([]);
  //   setCollaborations(data);
  //   let arr = [];
  //   Promise.all(
  //     data.map((e) => {
  //       searchArtist(e["title"])
  //         .then((res) => {
  //           const artist = res.artists.items[0];

  //           artist["title"] = e["title"];
  //           artist["whyis"] = e["description"];
  //           console.log(artist?.images[0]);
  //           arr.push(artist?.images[0]?.url);
  //         })
  //         .catch((err) => {
  //           console.log("Err: ", err);
  //         });
  //     })
  //   );
  //   setImage(arr);
  // };

  // useEffect(() => {
  //   console.log("artistID", artist?.spotify_id);
  //   const socketServerUrl = process.env.REACT_APP_BACKEND_API;
  //   const socket = socketIOClient(socketServerUrl);
  //   socket.on(artist?.spotify_id, (data) => {
  //     console.log("CompleteGTP", data);
  //     if (data.length === 0 || !data) {
  //       toast.success("Smart Insight Not Available");
  //     } else {
  //       toast.success("Smart Insight Completed");
  //       SpofityFetch(data);
  //     }
  //   });

  //   // Clean up the socket connection
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [artist]);

  const handleCollaboration = () => {
    setCollaboration(true);
    setFinancial(false);
    setRecommendations(false);
  };

  const handleRecommendation = () => {
    setRecommendations(true);
    setCollaboration(false);
    setFinancial(false);
  };

  const refresh = () => {
    setIsLoading(true);
    const payload = {
      spotify_id: `${artist?.spotify_id}`,
    };
    axios
      .put(`${URLconfig.BASE_URL}/artists/action/chatgpt-thread`, payload)
      .then((res) => {
        // setData([]);
        // setCollaborations(res.data.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box component="div" variant="div" className={classess.page}>
      <Box component="div" variant="div" className={classess.page__banner}>
        <Box
          component="div"
          variant="div"
          className={classess.page__banner__header}
        >
          <span className={classess.page__banner__header__insights_title}>
            Smart Insights
          </span>

          {collaboration && (
            <Button
              className={classess.page__banner__header__refresh_btn}
              disabled={isLoading}
              onClick={() => refresh()}
              startIcon={<CachedIcon />}
            >
              {isLoading ? "Please wait" : "Refresh"}
            </Button>
          )}
        </Box>

        <Box
          variant="div"
          component="div"
          className={classess.page__banner__main_container}
        >
          {collaboration && (
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 3 }}
              className={classess.page__banner__main_container__stack_container}
            >
              {collaborations?.length > 0 ? (
                collaborations.map((artist, index) => {
                  let isHovered = false;
                  return (
                    <Card
                      className={
                        classess.page__banner__main_container__stack_container__card_container
                      }
                      key={artist?.title}
                      onMouseEnter={() => (isHovered = true)}
                      onMouseLeave={() => (isHovered = false)}
                    >
                      <CardActionArea>
                        {/* {console.log("Artist in Reccopment", artist)} */}

                        <CardMedia
                          component="img"
                          height="123"
                          image={
                            artist["avatar"]
                              ? artist["avatar"]
                              : "https://via.placeholder.com/600x400?text=Not+Found"
                          }
                          alt="artist"
                        />
                        <CardContent
                          className={
                            classess.page__banner__main_container__stack_container__card_container__card_content
                          }
                        >
                          <Box>
                            <span
                              component="div"
                              className={
                                classess.page__banner__main_container__stack_container__card_container__card_content__title
                              }
                            >
                              {artist?.title}
                            </span>
                          </Box>
                          <Box>
                            <span
                              className={
                                classess.page__banner__main_container__stack_container__card_container__card_content__description
                              }
                            >
                              {artist?.whyis}

                              <Box
                                className={
                                  classess.page__banner__button_container
                                }
                              >
                                <Button
                                  className={
                                    classess.page__banner__button_container__btn
                                  }
                                  onClick={() =>
                                    window.open(
                                      `https://open.spotify.com/search/${artist?.title}`
                                    )
                                  }
                                  variant="contained"
                                  type="button"
                                >
                                  View
                                </Button>
                              </Box>
                            </span>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    color: "#fff",
                    flexFlow: "column",
                    alignItems: "center",
                  }}
                >
                  {loader ? (
                    <CircularProgress size={40} color="secondary" />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        color: "#fff",
                        flexFlow: "column",
                        alignItems: "center",
                      }}
                    >
                      <span sx={{ color: "#fff" }}>
                        Smart Insight Not Available
                      </span>
                    </Box>
                  )}
                </Box>
              )}
            </Stack>
          )}

          {/* {collaboration && data && (
              <Button
                className={classess.page__banner__refresh_btn}
                disabled={isLoading}
                onClick={() => refresh()}
              >
                {isLoading ? "Please wait" : "Refresh"}
              </Button>
            )} */}

          {/* {financial && <h2>Financial component</h2>} */}

          {/* {recommendations && <TourRecommendations />} */}
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendCollaborations;
