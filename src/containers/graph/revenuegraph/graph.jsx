import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { abbreviateNumber } from "../../../utils/helper";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { Typography } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import SpotifyIcon from "../../../assets/social/social-icon3.png";
import YoutubeIcon from "../../../assets/social/social-icon2.png";
import TiktokIcon from "../../../assets/social/social-icon8.png";
import DeezerIcon from "../../../assets/social/social-icon5.png";

const RevenueGraph = ({ artist }) => {
  const [youtube_data, set_youtube_data] = useState(0);
  const [titok_data, set_titok_data] = useState(0);
  const [spotify_data, set_spotify_data] = useState(0);
  const [deezer_data, set_deezer_data] = useState(0);
  const [total_data, set_total_data] = useState(0);

  const data = [
    [
      "Views",
      "Stream",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["Tiktok", titok_data, "#3b5998", abbreviateNumber(titok_data)],
    ["Youtube", youtube_data, "#d62976", abbreviateNumber(youtube_data)],
    ["Spotify", spotify_data, "#00acee", abbreviateNumber(spotify_data)],
    ["Deezer", deezer_data, "orange", abbreviateNumber(deezer_data)],
  ];

  const options = {
    backgroundColor: "transparent",

    legend: { position: "none" },
    hAxis: {
      textStyle: { color: "white" },
    },
    vAxis: {
      textStyle: { color: "white" },
    },
  };

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
      youtube_data = youtube_data + datalocal.data[i].youtube_video_views_total;
      titok_data = titok_data + datalocal.data[i].tiktok_views_total;
      deezer = deezer + datalocal.data[i].deezer_reach_total;
    }
    set_youtube_data(youtube_data);
    set_spotify_data(spotify_data);
    set_titok_data(titok_data);
    set_deezer_data(deezer);
    set_total_data(youtube_data + spotify_data + titok_data + deezer);
  }

  useEffect(() => {
    if (artist) {
      drawChart();
    }
  }, [artist]);

  const totalViews = titok_data + youtube_data + spotify_data + deezer_data;
  const formattedViews = totalViews.toLocaleString("en-US");

  const ProgressBarComponent = ({
    icon,
    name,
    activeColor,
    deActiveColor,
    streams,
    totalStreams,
  }) => {
    return (
      <Box
        className={
          classess.page__banner__conatiner__innercontainer__bar_head_container
        }
      >
        <Box
          className={
            classess.page__banner__conatiner__innercontainer__bar_head_container__head
          }
        >
          <Box
            className={
              classess.page__banner__conatiner__innercontainer__bar_head_container__head__icon_title
            }
          >
            <img
              src={icon}
              className={classess.page__banner__conatiner__icon}
            />
            <span className={classess.page__banner__conatiner__label}>
              {name}
            </span>
          </Box>

          <span className={classess.page__banner__conatiner__label}>
            {abbreviateNumber(streams)}
          </span>
        </Box>
        <Box>
          <ProgressBar
            completed={streams}
            bgColor={activeColor}
            height="8px"
            isLabelVisible={false}
            baseBgColor={deActiveColor}
            labelColor="#1DB954"
            maxCompleted={totalStreams}
          />
        </Box>
      </Box>
    );
  };

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
          <Box sx={{ marginBottom: "20px" }}>
            <span className={classess.page__banner__conatiner__top_heading}>
              Artist Total Stream/Platform
            </span>
          </Box>

          <Grid className={classess.page__banner__conatiner__innercontainer}>
            <ProgressBarComponent
              icon={SpotifyIcon}
              name={"Spotify"}
              activeColor={"#1DB954"}
              deActiveColor={"#9FEBB9"}
              streams={spotify_data}
              totalStreams={total_data}
            />

            <ProgressBarComponent
              icon={YoutubeIcon}
              name={"Youtube"}
              activeColor={"#FF0000"}
              deActiveColor={"#FBBCBC"}
              streams={youtube_data}
              totalStreams={total_data}
            />

            <ProgressBarComponent
              icon={TiktokIcon}
              name={"Tiktok"}
              activeColor={"#00F7EF"}
              deActiveColor={"#CCF8FE"}
              streams={titok_data}
              totalStreams={total_data}
            />
            <ProgressBarComponent
              icon={DeezerIcon}
              name={"Deezer"}
              activeColor={"#FFBB0A"}
              deActiveColor={"#FFE5D3"}
              streams={deezer_data}
              totalStreams={total_data}
            />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default RevenueGraph;
