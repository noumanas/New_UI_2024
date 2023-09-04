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
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { IconButton } from "@mui/material";
// import CreateIcon from "@mui/icons-material/Create";
import { MdClose } from "react-icons/md";
import { messages, artits } from "./data";
import Chartapexline from "./dashLineGraph";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { config as URLconfig } from "../../enviorment/enviorment";
import { getItemToLocalStorage } from "../../services/storage";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const storedToken = getItemToLocalStorage("accessToken");
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatchRef.current(setSelectedTrackCount(0));
  //   dispatchRef.current(setSelectedTracks([]));
  //   dispatchRef.current(setTracks([]));
  // }, [dispatchRef]);
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
  const [value, setValue] = React.useState("1");
  const handleMouseEnter = (index) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = true;
    setHoveredStates(newHoveredStates);
  };
  useEffect(() => {
    fetchSpotlightartist();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMouseLeave = (index) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = false;
    setHoveredStates(newHoveredStates);
  };

  const [yAxisMaximum, setyAxisMaximum] = useState();
  const [artistincomedata, setArtistincomedata] = useState([]);
  const [artistspotifydata, setartistspotifydata] = useState([]);
  const [artistyoutubeydata, setartistyoutubeydata] = useState([]);

  const [chartData, setChartData] = useState([]);

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
      legend: {
        show: true,
        labels: {
          colors: "#FFF",
        },
        position: "top",
        itemMargin: {
          horizontal: 10,
        },
      },

      // forecastDataPoints: {
      //   count: 7,
      // },
      stroke: {
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
            if (typeof value !== "undefined" && !isNaN(value)) {
              if (value >= 1000000) {
                return "$" + (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return "$" + (value / 1000).toFixed(1) + "K";
              } else {
                return "$" + value.toFixed(0);
              }
            } else {
              return "";
            }
          },
        },
      },
    },
  };
  const optionsspotify = {
    series: artistspotifydata,
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
      legend: {
        show: true,
        labels: {
          colors: "#FFF",
        },
        position: "top",
        itemMargin: {
          horizontal: 10,
        },
      },

      // forecastDataPoints: {
      //   count: 7,
      // },
      stroke: {
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
            if (typeof value !== "undefined" && !isNaN(value)) {
              if (value >= 1000000) {
                return "" + (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return "" + (value / 1000).toFixed(1) + "K";
              } else {
                return "" + value.toFixed(0);
              }
            } else {
              return "";
            }
          },
        },
      },
    },
  };
  const optionsyoutube = {
    series: artistyoutubeydata,
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
      legend: {
        show: true,
        labels: {
          colors: "#FFF",
        },
        position: "top",
        itemMargin: {
          horizontal: 10,
        },
      },

      // forecastDataPoints: {
      //   count: 7,
      // },
      stroke: {
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
            if (typeof value !== "undefined" && !isNaN(value)) {
              if (value >= 1000000) {
                return "" + (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return "" + (value / 1000).toFixed(1) + "K";
              } else {
                return "" + value.toFixed(0);
              }
            } else {
              return "";
            }
          },
        },
      },
    },
  };
  // function getIconUrlForSeries(artistData) {
  //   if (artistData && artistData.image) {
  //     return artistData.image;
  //   } else {
  //     return "default-image-url";
  //   }
  // }
  const fetchSpotlightartist = () => {
    axios
      .get(`${URLconfig.BASE_URL}/spotlight`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        fetchSpotlightartistData(
          response.data.data.artistIncome,
          response.data.data.data
        );
        fetchSpotlightartistDataspotify(
          response.data.data.artistIncome,
          response.data.data.data
        );
        fetchSpotlightartistDatayoutube(
          response.data.data.artistIncome,
          response.data.data.data
        );
        setSpotlightartist(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error fetching spotlight data:", error);
      });
  };
  function findMax(data) {
    let max = Number.MIN_SAFE_INTEGER;
    data.forEach((item) => {
      const itemMax = Math.max(...item.data);
      if (itemMax > max) {
        max = itemMax;
      }
    });
    return max;
  }
  const fetchSpotlightartistData = (artistIncome, data) => {
    const series = [];
    data.forEach((artist, index) => {
      const artistName = artist.name;
      const artistdate = artistIncome[0].map((item) => item.date);
      const reversedartistdate = artistdate.reverse();
      setChartData(reversedartistdate);
      const artistIncomeData = artistIncome[index].map((item) => item.income);
      const reversedIncomeData = artistIncomeData.reverse();
      const artistSeries = {
        name: artistName,
        data: reversedIncomeData,
      };
      series.push(artistSeries);
    });
    setArtistincomedata(series);
    const mxnum = findMax(series);
  };
  const fetchSpotlightartistDataspotify = (artistIncome, data) => {
    const series = [];
    data.forEach((artist, index) => {
      const artistName = artist.name;
      const artistdate = artistIncome[0].map((item) => item.date);
      const reversedartistdate = artistdate.reverse();
      setChartData(reversedartistdate);
      const artiststreams_totalData = artistIncome[index].map(
        (item) => item.streams_total
      );
      const reversedstreams_totalData = artiststreams_totalData.reverse();
      const artistSeries = {
        name: artistName,
        data: reversedstreams_totalData,
      };
      series.push(artistSeries);
    });
    setartistspotifydata(series);
    const mxnum = findMax(series);
  };
  const fetchSpotlightartistDatayoutube = (artistIncome, data) => {
    const series = [];
    data.forEach((artist, index) => {
      const artistName = artist.name;
      const artistdate = artistIncome[0].map((item) => item.date);
      const reversedartistdate = artistdate.reverse();
      setChartData(reversedartistdate);
      const artistvideo_views_totalData = artistIncome[index].map(
        (item) => item.video_views_total
      );
      const reversedvideo_views_totalData =
        artistvideo_views_totalData.reverse();
      const artistSeries = {
        name: artistName,
        data: reversedvideo_views_totalData,
      };
      series.push(artistSeries);
    });
    setartistyoutubeydata(series);
    const mxnum = findMax(series);
  };

  const removespotlightartist = (_id) => {
    const body = {
      _id: user.id,
    };
    axios
      .put(`${URLconfig.BASE_URL}/spotlight/${_id}`, body)
      .then((response) => {
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
        <Grid>
          <Box component="div" variant="div" className={classess.bg}>
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {`  Recoupment by Artists`}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TabList onChange={handleChange}>
                    <Tab label="Earnings" value="1" sx={{ color: "white" }} />
                    <Tab label="Spotify" value="2" sx={{ color: "white" }} />
                    <Tab label="Youtube" value="3" sx={{ color: "white" }} />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ padding: 0, color: "white" }}>
                  <Box
                    component="div"
                    variant="div"
                    className={classess.bg__chart_container}
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
                      height={548}
                      type={"line"}
                      Revenue={"Revenue"}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="2" sx={{ padding: 0, color: "white" }}>
                  <Box
                    component="div"
                    variant="div"
                    className={classess.bg__chart_container}
                    sx={{
                      pt: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Chartapexline
                      options={optionsspotify.option}
                      series={optionsspotify.series}
                      height={548}
                      type={"line"}
                      Revenue={"Streams"}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3" sx={{ padding: 0, color: "white" }}>
                  <Box
                    component="div"
                    variant="div"
                    className={classess.bg__chart_container}
                    sx={{
                      pt: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Chartapexline
                      options={optionsyoutube.option}
                      series={optionsyoutube.series}
                      height={548}
                      type={"line"}
                      Revenue={"Youtube Views"}
                    />
                  </Box>
                </TabPanel>
              </TabContext>
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
                      <span className={classess.name}>{item.name}</span>
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
          <span className={classess.heading}>Artist Spotlight</span>
          <Box className={classess.allArtist}>
            {spotlightartist.map((item, index) => (
              <Box
                key={index}
                className={classess.artist}
                // onClick={() =>
                //   fetchSpotlightartistData(item.spotify_id, item.name)
                // }
              >
                <Box className={classess.details}>
                  <Box className={classess.artistImg}>
                    <img src={item.image} alt="artist img" />
                    <Box className={classess.onLine} />
                  </Box>
                  <Box>
                    <span
                      className={classess.name}
                      onClick={() =>
                        navigate(`/blig/view-artist/${item.artist_id}`)
                      }
                    >
                      {item.name.split(" ", 2).join(" ")}
                    </span>
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
