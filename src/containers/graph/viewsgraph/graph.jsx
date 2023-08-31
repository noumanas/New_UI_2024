import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chart from "react-google-charts";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "../../../utils/helper";
import { config as URLconfig } from "../../../enviorment/enviorment";

const ViewGraph = ({ artist }) => {
  const [youtube_data, set_youtube_data] = useState(0);
  const [titok_data, set_titok_data] = useState(0);
  const [spotify_data, set_spotify_data] = useState(0);
  const [deezer_data, set_deezer_data] = useState(0);

  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const data = [
    ["Task ", "Hours per Day"],
    ["Tiktok " + abbreviateNumber(titok_data), titok_data],
    ["Youtube " + abbreviateNumber(youtube_data), youtube_data],
    ["Spotify " + abbreviateNumber(spotify_data), spotify_data],
    ["Deezer " + abbreviateNumber(deezer_data), deezer_data],
  ];
  const options = {
    backgroundColor: "transparent",
    is3D: false,
    titleTextStyle: { color: "#FFFFFF" },

    slices: {
      0: { color: "#3b5998" },
      1: { color: "#d62976" },
      2: { color: "#00acee" },
      3: { color: "orange" },
    },
    pieSliceBorderColor: "none",
    bar: { groupWidth: "95%" },
    pieSliceTextStyle: {
      color: "white",
      fontSize: "14",
    },
    animation: {
      startup: true,
      easing: "linear",
      duration: 2000,
    },
    legend: {
      textStyle: { color: "white", fontSize: "12" },

      alignment: "left",
    },
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
  };

  useEffect(() => {
    if (artist) {
      async function drawChart() {
        var lables = [];
        var spotify_data = 0;
        var youtube_data = 0;
        var titok_data = 0;
        var deezer = 0;
        // Create the data table.
        const response = await fetch(
          `${URLconfig.BASE_URL}/artist-tracks/${artist?.spotify_id}`
        );
        const datalocal = await response.json();

        for (let i = 0; i < datalocal.data.length; i++) {
          lables.push(datalocal.data[i].title);
          spotify_data = spotify_data + datalocal.data[i].spotify_streams_total;
          youtube_data =
            youtube_data + datalocal.data[i].youtube_video_views_total;
          titok_data = titok_data + datalocal.data[i].tiktok_views_total;
          deezer = deezer + datalocal.data[i].deezer_reach_total;
        }
        set_youtube_data(youtube_data);
        set_spotify_data(spotify_data);
        set_titok_data(titok_data);
        set_deezer_data(deezer);
      }

      drawChart();
    }
  }, [artist]);

  return (
    <div>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <Box
          variant="div"
          component="div"
          className={classess.page__banner__conatiner}
          sx={{ alignItems: "flex-start" }}
        >
          <Box component="div" variant="div" sx={{ color: "#fff" }}>
            Artist Total Streams/Platform
          </Box>

          <Grid sx={{ width: "100%", padding: "20px" }}>
            <LinearProgressWithLabel variant="determinate" value={progress} />
            {/* <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"200px"}
            /> */}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ViewGraph;
