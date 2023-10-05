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
import Chartapexline from "./dash-line-gragh/dashLineGraph";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { config as URLconfig } from "../../enviorment/enviorment";
import { getItemToLocalStorage } from "../../services/storage";
import axios from "axios";
import { toast } from "react-toastify";
import { TiStarOutline } from "react-icons/ti";
import { countries } from "country-data";
import Tooltip from "@mui/material/Tooltip";
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
    console.log("spotlightartist", spotlightartist);
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
        height: 455,
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
        height: 455,
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
        height: 455,
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
        toast.success("Spotlight Removed");
        fetchSpotlightartist();
      })
      .catch((error) => {
        console.error("Error fetching spotlight data:", error);
      });
  };

  return (
    // <Container maxWidth="xxl">
    <Grid container spacing={2} className={classess.page}>
      <Grid item sm={12} md={12} lg={9} xl={9}>
        <Grid>
          <Box
            component="div"
            variant="div"
            className={classess.chartMainContainer}
          >
            <span className={classess.topHeading}>Recoupment by Artists</span>

            <Box className={classess.tabContainer}>
              <TabContext value={value}>
                <Box className={classess.tabInnerContainer}>
                  <TabList
                    onChange={handleChange}
                    TabIndicatorProps={
                      classess.page__tabindicatorcolorline

                      //   {
                      //   style: {
                      //     backgroundColor: "#4FFCB7",
                      //   },
                      // }
                    }
                  >
                    <Tab
                      label="Earnings"
                      value="1"
                      className={classess.page__tabindicatorcolor}
                      sx={{
                        opacity: value === "1" ? "1" : "0.5",
                        // color: value === "1" ? "#4FFCB7 !important" : "#ffffff",
                      }}
                    />
                    <Tab
                      label="Spotify"
                      value="2"
                      className={classess.page__tabindicatorcolor}
                      sx={{
                        opacity: value === "2" ? "1" : "0.5",

                        // color: value === "2" ? "#4FFCB7 !important" : "#ffffff",
                      }}
                    />
                    <Tab
                      label="Youtube"
                      value="3"
                      className={classess.page__tabindicatorcolor}
                      sx={{
                        opacity: value === "3" ? "1" : "0.5",

                        // color: value === "3" ? "#4FFCB7 !important" : "#ffffff",
                      }}
                    />
                  </TabList>
                </Box>

                <TabPanel value="1" sx={{ padding: 0, color: "#fff" }}>
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
                      height={455}
                      type={"line"}
                      Revenue={"Revenue"}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="2" sx={{ padding: 0, color: "#fff" }}>
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
                      height={455}
                      type={"line"}
                      Revenue={"Streams"}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="3" sx={{ padding: 0, color: "#fff" }}>
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
                      height={455}
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

      <Grid item spacing={2} sm={12} md={12} lg={9} xl={9}>
        <Box className={classess.artistList}>
          <Box className={classess.headAndBtn}>
            <span className={classess.heading}>Artist Spotlight</span>
            <Button
              className={classess.spotBtn}
              onClick={() => navigate("/blig/my-artist")}
              startIcon={<TiStarOutline />}
            >
              Add to Spotlight
            </Button>
          </Box>

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
                    <Avatar
                      src={item.image}
                      alt="artist img"
                      className={classess.avatar}
                    />
                    {console.log(item.image)}
                    <Box className={classess.onLine} />
                  </Box>
                  <Box>
                    <Tooltip title={item?.name} placement="top">
                      <span
                        className={classess.name}
                        onClick={() =>
                          navigate(`/blig/view-artist/${item.artist_id}`)
                        }
                      >
                        {item?.name ? item.name.split(" ", 2).join(" ") : ""}
                        {/* {item?.name} */}
                      </span>
                    </Tooltip>
                    <Typography className={classess.email}>
                      {item.email
                        ? item.email
                        : item.name.replace(/\s+/g, "").toLowerCase() +
                          "@blacklionapp.xyz"}
                    </Typography>
                    <Box className={classess.coutry_continer}>
                      <Box className={classess.coutry_flag}>
                        {item?.country ? countries[item?.country].emoji : "N/A"}
                      </Box>
                      <Box className={classess.coutry_name}>
                        {item?.country ? countries[item?.country].name : null}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className={classess.icon_container}>
                  <Box
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <Box>
                      <IconButton
                        size="small"
                        className={classess.icon}
                        onClick={() => removespotlightartist(item._id)}
                      >
                        <MdClose className={classess.innerIcon} />
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
