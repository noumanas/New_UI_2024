import React, { useEffect, useRef, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import homeBannerIcon from "../../assets/avatar/avatar2.avif";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArtistViewConatiner from "../../views/artist-view-conatiner/artist-view-conatiner";
// import MesImg from "../../assets/messImg.png";
// import ArtisitImg from "../../assets/artistImg.png";
// import ArtisitImg2 from "../../assets/artistImg2.png";
// import ArtisitImg3 from "../../assets/artistImg3.png";
// import Flag from "../../assets/flag.png";
import { IconButton } from "@mui/material";
// import CreateIcon from "@mui/icons-material/Create";
import { MdClose } from "react-icons/md";
import { messages, artits } from "./data";
import Chartapexline from "./dashLineGraph";
import {
  setSelectedTrackCount,
  setSelectedTracks,
  setTracks,
} from "../../redux/slice/artist";
import BG from "../../assets/bashboard.png";
import { Button } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { config as URLconfig } from "../../enviorment/enviorment";
import { getItemToLocalStorage } from "../../services/storage";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const user = useSelector((state) => state.auth.user);
  const storedToken = getItemToLocalStorage("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    dispatchRef.current(setSelectedTrackCount(0));
    dispatchRef.current(setSelectedTracks([]));
    dispatchRef.current(setTracks([]));
  }, [dispatchRef]);
  // const [hovered, setHovered] = useState(false);
  // const handleMouseEnter = () => {
  //   setHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setHovered(false);
  // };

  const [spotlightartist, setSpotlightartist] = useState([]);
  const [hoveredStates, setHoveredStates] = useState([]);
  const [artist_name, setArtistName] = useState("");
  const handleMouseEnter = (index) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = true;
    setHoveredStates(newHoveredStates);
  };
  useEffect(() => {
    fetchSpotlightartist();
  }, []);
  const handleMouseLeave = (index) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = false;
    setHoveredStates(newHoveredStates);
  };
  const [yAxisMaximum, setyAxisMaximum] = useState();
  const [artistincomedata, setArtistincomedata] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [
      "2022-08-31",
      "2022-09-01",
      "2022-09-02",
      "2022-09-03",
      "2022-09-04",
      "2022-09-05",
      "2022-09-06",
      "2022-09-07",
      "2022-09-08",
      "2022-09-09",
      "2022-09-10",
      "2022-09-11",
      "2022-09-12",
      "2022-09-13",
      "2022-09-14",
      "2022-09-15",
      "2022-09-16",
      "2022-09-17",
      "2022-09-18",
      "2022-09-19",
      "2022-09-20",
      "2022-09-21",
      "2022-09-22",
      "2022-09-23",
      "2022-09-24",
      "2022-09-25",
      "2022-09-26",
      "2022-09-27",
      "2022-09-28",
      "2022-09-29",
      "2022-09-30",
      "2022-10-01",
      "2022-10-02",
      "2022-10-03",
      "2022-10-04",
      "2022-10-05",
      "2022-10-06",
      "2022-10-07",
      "2022-10-08",
      "2022-10-09",
      "2022-10-10",
      "2022-10-11",
      "2022-10-12",
      "2022-10-13",
      "2022-10-14",
      "2022-10-15",
      "2022-10-16",
      "2022-10-17",
      "2022-10-18",
      "2022-10-19",
      "2022-10-20",
      "2022-10-21",
      "2022-10-22",
      "2022-10-23",
      "2022-10-24",
      "2022-10-25",
      "2022-10-26",
      "2022-10-27",
      "2022-10-28",
      "2022-10-29",
      "2022-10-30",
    ],
    // datasets: [
    //   {
    //     label: "Spotify",
    //     data: [
    //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //     ],
    //     backgroundColor: "rgb(60, 179, 113)",
    //     borderColor: "rgb(60, 179, 113)",
    //     borderWidth: 2,
    //     hoverBackgroundColor: "rgba(255,99,132,0.4)",
    //     hoverBorderColor: "rgba(255,99,132,1)",
    //   },
    // ],
  });

  const options = {
    series: artistincomedata,
    option: {
      chart: {
        height: 550,
        type: "line",
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: true,
        },
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        type: "Monthly",
        categories: chartData,
        tickAmount: 10,
      },
      title: {
        // text: "",
        // align: "left",
        style: {
          fontSize: "16px",
          color: "white",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#1BAFFB", "#1BFB5E", "#FBEC1B"],
          type: "horizontal",
          stops: [0, 0, 0, 0],
        },
      },
      yaxis: {
        min: 0,
        max: yAxisMaximum,
        showAlways: false,
        labels: {
          formatter: function (value) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + "K";
            } else {
              return value.toFixed(0);
            }
          },
        },
      },
    },
  };

  const fetchSpotlightartist = () => {
    axios
      .get(`${URLconfig.BASE_URL}/spotlight`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        // Handle the response data
        fetchSpotlightartistData(
          response.data.data[0].spotify_id,
          response.data.data[0].name
        );
        setSpotlightartist(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching spotlight data:", error);
      });
  };
  const fetchSpotlightartistData = (spotify_id, name) => {
    axios
      .get(`${URLconfig.BASE_URL}/income/monthly/${spotify_id}`)
      .then((response) => {
        // Handle the response data
        setArtistName(name);
        const transformedSeriesData = {
          date: [],
          income: [],
          spotify_total: [],
          youtube_total: [],
        };

        // Iterate through the daily data and populate the transformedSeriesData object
        response.data.data.forEach((dailyItem) => {
          transformedSeriesData.date.push(dailyItem.date);
          transformedSeriesData.income.push(dailyItem.income);
          transformedSeriesData.spotify_total.push(dailyItem.streams_total);
          transformedSeriesData.youtube_total.push(dailyItem.video_views_total);
        });

        // Create the final series data array
        const seriesData = [
          {
            name: "date",
            data: transformedSeriesData.date.reverse(),
          },
          {
            name: "Earning",
            data: transformedSeriesData.income.reverse(),
          },
          {
            name: "spotify_total",
            data: transformedSeriesData.spotify_total.reverse(),
          },
          {
            name: "youtube_total",
            data: transformedSeriesData.youtube_total.reverse(),
          },
        ];
        const newseriesData = [
          {
            name: "Earning",
            data: transformedSeriesData.income,
          },
          {
            name: "Streams",
            data: transformedSeriesData.spotify_total,
          },
          {
            name: "Views",
            data: transformedSeriesData.youtube_total,
          },
        ];
        const dataformax = seriesData[2].data;
        const ytdataformax = seriesData[3].data;
        const maxValue = Math.max(...dataformax);
        const ytmaxValue = Math.max(...ytdataformax);
        const maxfinalvaule = Math.max(maxValue, ytmaxValue);
        setyAxisMaximum(maxfinalvaule);
        const formattedLabels = seriesData[0].data.map((dateStr) => {
          const date = new Date(dateStr);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          return formattedDate;
        });
        setChartData(formattedLabels);
        setArtistincomedata(newseriesData);
      })
      .catch((error) => {
        console.error("Error fetching spotlight data:", error);
      });
  };
  const removespotlightartist = (_id) => {
    const body = {
      _id: user.id,
    };
    axios
      .put(`${URLconfig.BASE_URL}/spotlight/${_id}`, body)
      .then((response) => {
        // Handle the response data
        toast.success("Remove Succuss fully");
        fetchSpotlightartist();
      })
      .catch((error) => {
        console.error("Error fetching spotlight data:", error);
      });
  };
  return (
    // <Container maxWidth="xxl">
    <Grid container spacing={2} className={classess.page}>
      <Grid item xs={12} md={12} lg={9}>
        {/* <Box component="div" variant="div" className={classess.page__banner}>
            <Box
              variant="div"
              component="div"
              className={classess.page__banner__conatiner}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__banner__conatiner__bg}
              ></Box>
              <Box
                variant="div"
                component="div"
                className={classess.page__banner__conatiner__image}
              >
                <Box
                  variant="div"
                  component="div"
                  className={
                    classess.page__banner__conatiner__image__outer_layer
                  }
                >
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__image__outer_layer__inner_layer
                    }
                  >
                    <Avatar
                      src={
                        user?.profilePicture
                          ? user?.profilePicture
                          : homeBannerIcon
                      }
                      alt={user?.firstName ? user?.firstName : "User Image"}
                      sx={{ height: 100, width: 100 }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                variant="div"
                component="div"
                className={classess.page__banner__conatiner__content}
              >
                <Box
                  variant="div"
                  component="div"
                  className={classess.page__banner__conatiner__content__details}
                >
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__name
                      }
                    >
                      {user?.firstName || "N/A"} {user?.lastName || "N/A"}
                    </Box>
                  </Box>

                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__username
                      }
                    >
                      {user?.username || "N/A"}
                    </Box>
                  </Box>
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__company
                      }
                    >
                      {user?.company || "Blacklion"}
                    </Box>
                  </Box>

                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__banner__conatiner__content__details__box
                    }
                  >
                    <Box
                      variant="div"
                      component="div"
                      className={
                        classess.page__banner__conatiner__content__details__box__value__country
                      }
                    >
                      {user?.country || "United Kingdom"}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box> */}
        <Grid>
          <Box component="div" variant="div" className={classess.bg}>
            {/* <img src={BG} alt="bg img" /> */}
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {`  Recoupment by ${artist_name}`}
              </Typography>
            </Box>
            <Box
              sx={{
                pt: 2,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Chartapexline
                options={options.option}
                series={options.series}
                height={520}
                type={"line"}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid item sm={12} md={12} lg={3}>
        <Grid>
          <Box className={classess.message}>
            <Box className={classess.topHeading}>Messages</Box>
            <Box className={classess.mesContainer}>
              {messages.map((item, index) => (
                <Box
                  className={`${classess.mesBox} ${item.onlinStatus}`}
                  // ? onlinStatus class in app.scss
                  key={index}
                >
                  <Box className={classess.imgAndName}>
                    <Box>
                      <img src={item.img} alt="message img" />
                    </Box>
                    <Box>
                      <Typography className={classess.name}>
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={classess.mes}>{item.message}</Box>
                  <Box className={classess.time}>{item.time}</Box>
                </Box>
              ))}
            </Box>
            <Box className={classess.viewBtn}>
              <Button>View All Messages</Button>
            </Box>
          </Box>

          {/* <ArtistViewConatiner selectedView="list" /> */}
        </Grid>
      </Grid>
      <Grid item s={12} md={12} lg={12}>
        <Box className={classess.artistList}>
          <Typography className={classess.heading}>Artist Spotlight</Typography>
          <Box className={classess.allArtist}>
            {spotlightartist.map((item, index) => (
              <Box
                key={index}
                className={classess.artist}
                onClick={() =>
                  fetchSpotlightartistData(item.spotify_id, item.name)
                }
              >
                <Box className={classess.details}>
                  <Box className={classess.artistImg}>
                    <img src={item.image} alt="artist img" />
                    <Box className={classess.onLine} />
                  </Box>
                  <Box>
                    <Typography
                      className={classess.name}
                      onClick={() =>
                        navigate(`/blig/view-artist/${item.artist_id}`)
                      }
                    >
                      {item.name.split(" ", 2).join(" ")}
                    </Typography>
                    <Typography className={classess.email}>
                      {item.email ? item.email : `${item.name}@spotify.com`}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        paddingTop: "5px",
                      }}
                    >
                      <Box>
                        {/* <img
                          src={item.flag}
                          alt="flag "
                          style={{
                            width: "16px",
                            height: "11px",
                          }}
                        /> */}
                      </Box>
                      <Box sx={{ fontSize: "14px" }}>{item?.country}</Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={classess.icon}>
                  <Box
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <Box>
                      <IconButton
                        size="small"
                        style={{
                          backgroundColor: hoveredStates[index]
                            ? "#4FFCB7"
                            : "#4FFCB7",
                          width: hoveredStates[index] ? "100px" : "30px",
                          height: hoveredStates[index] ? "30" : "30px",
                          borderRadius: hoveredStates[index] ? "12px" : "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => removespotlightartist(item._id)}
                      >
                        <MdClose
                          style={{
                            color: hoveredStates[index] ? "#000" : "#000",
                            width: hoveredStates[index] ? "15px" : "15px",
                            height: "15px",
                          }}
                        />
                        {hoveredStates[index] && (
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              color: "#222c41",
                            }}
                          >
                            Remove
                          </span>
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </Container>
  );
};

export default Home;
