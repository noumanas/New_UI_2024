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
import { searchArtist } from "../../api/spotify.api";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../redux/slice/artist";
import CircularProgress from "@mui/material/CircularProgress";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

const RecommendCollaborations = ({ artist_collaborations }) => {
  const artist = useSelector((state) => state.artist.artist);
  const [collaborations, setCollaborations] = useState([]);
  const [collaboration, setCollaboration] = useState(true);
  const [financial, setFinancial] = useState(false);
  const [recommendations, setRecommendations] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Inside your component
  const [image, setImage] = useState([]);

  let fetcher = () => {
    let arr = [];
    Promise.all(
      collaborations.map((e) => {
        searchArtist(e["title"])
          .then((res) => {
            const artist = res.artists.items[0];

            artist["title"] = e["title"];
            artist["whyis"] = e["description"];
            arr.push(artist?.images[0]?.url);
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      })
    );
    setImage(arr);
  };
  let SpofityFetch = (data) => {
    console.log("SpofityFetch");
    setData([]);
    setCollaborations(data);
    let arr = [];
    Promise.all(
      data.map((e) => {
        searchArtist(e["title"])
          .then((res) => {
            const artist = res.artists.items[0];

            artist["title"] = e["title"];
            artist["whyis"] = e["description"];
            arr.push(artist?.images[0]?.url);
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      })
    );
    setImage(arr);
  };

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 5000);
    if (artist?.collaborations && artist?.collaborations.length > 0) {
      setCollaborations(artist?.collaborations);
      console.log("calling useE in artist Coll from redux");
    } else {
      console.log("claling Else from");
    }
    let isSubscribed = true;
    if (collaborations && Object.keys(collaborations).length > 0) {
      if (isSubscribed === true) {
        fetcher();
        return () => {
          isSubscribed = false;
        };
      }
    }
  }, [collaborations, artist]);
  useEffect(() => {
    console.log("artistID", artist?.spotify_id);
    const socketServerUrl =
      process.env.REACT_APP_BACKEND_API || "http://localhost:9000";
    const socket = socketIOClient(
      "https://blacklion-restapi-prod-5rwmk.ondigitalocean.app"
    );
    socket.on(artist?.spotify_id, (data) => {
      console.log("CompleteGTP", data);
      if (data.length === 0 || !data) {
        toast.success("Smart Insight Not Available");
      } else {
        toast.success("Smart Insight Completed");
        SpofityFetch(data);
      }
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, [artist]);

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
      .put(
        `${URLconfig.BASE_URL}/artists/action/refresh-colloboration`,
        payload
      )
      .then((res) => {
        setData([]);
        setCollaborations(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <Box variant="div" component="div" sx={{ alignItems: "flex-start" }}>
          {/* <Box component="div" variant="div" sx={{ color: "#fff" }}>
            Smart Insights
          </Box> */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            // columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={12} md={4} lg={12} xl={4}>
              <Box component="div" variant="div" sx={{ color: "#fff" }}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classess.page__banner__insights_title}
                >
                  Smart Insights
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={12}
              xl={8}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              {/* <ButtonGroup
                aria-label=""
                className={classess.page__banner__btn_group}
                sx={{ gap: "9px" }}
              >
                <Button
                  className={classess.page__banner__btn_group__btn}
                  sx={
                    collaboration && { backgroundColor: "#1976d2 !important" }
                  }
                  onClick={handleCollaboration}
                >
                  Collaboration
                </Button>
                <Button
                  className={classess.page__banner__btn_group__btn}
                  sx={
                    recommendations && { backgroundColor: "#1976d2 !important" }
                  }
                  onClick={handleRecommendation}
                >
                  Tour Recommendations
                </Button>
              </ButtonGroup> */}
            </Grid>
          </Grid>

          <Box variant="div" component="div" mt={5}>
            {collaboration && (
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ overflowX: "scroll" }}
              >
                {collaborations?.length > 0 ? (
                  collaborations.map((artist, index) => {
                    return (
                      <Card
                        sx={{
                          maxWidth: 204,
                          backgroundColor: "#192233",
                          color: "#fff",
                          flexBasis: "40%",
                          flexShrink: 0,
                          borderRadius: "12px",
                        }}
                        className={classess.page__banner_mb}
                        key={artist?.title}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={
                              image[index]
                                ? image[index]
                                : "https://via.placeholder.com/600x400?text=Not+Found"
                            }
                            alt="artist"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className={classess.page__banner__Title}
                            >
                              {artist?.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="#fff"
                              className={classess.page__banner__hoveradd}
                            >
                              {artist?.description}
                              <Box className={classess.page__banner__button}>
                                <Button
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
                            </Typography>
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
                        <Button
                          disabled={isLoading}
                          className={classess.page__banner__btn_group__btn}
                          sx={{
                            backgroundColor: "#1976d2 !important",
                            marginTop: "10px",
                          }}
                          onClick={() => refresh()}
                        >
                          {isLoading ? "Please wait" : "Refresh"}
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </Stack>
            )}
            {collaboration && data && (
              <Button disabled={isLoading} onClick={() => refresh()}>
                {isLoading ? "Please wait" : "Refresh"}
              </Button>
            )}

            {financial && <h2>Financial component</h2>}

            {recommendations && <TourRecommendations />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecommendCollaborations;
