import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { config as URLconfig } from "../../../../enviorment/enviorment";
import axios from "axios";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { toast } from "react-toastify";
import Chart from "react-google-charts";
import Grid from "@mui/material/Grid";
import AuthEnum from "../../../../enums/auth.enum";
import { getItemToLocalStorage } from "../../../../services/storage";

const VerifyContainer = ({ artist }) => {
  const tracks = useSelector((state) => state.artist.tracks);
  const selected_tracks = useSelector((state) => state.artist.selectedTracks);
  const [isLoading, setIsLoading] = useState(false);
  const [youtube_data, set_youtube_data] = useState(0);
  const [titok_data, set_titok_data] = useState(0);
  const [spotify_data, set_spotify_data] = useState(0);
  const [deezer_data, set_deezer_data] = useState(0);
  const addStreaming = titok_data + youtube_data + spotify_data + deezer_data;
  const totalStreaming = addStreaming.toLocaleString("en-Us");
  const data2 = [
    ["", "Tiktok Views", "Youtube Views", "Spotify Streams", "Deezer Streams"],
    [` `, titok_data, youtube_data, spotify_data, deezer_data],
  ];
  const options2 = {
    chart: {
      style: {
        background: {
          fillColor: "transparent",
        },
      },
    },
    colors: ["#006DCC", "#FF0000", "#4FFCB7", "#00C7F2"],
    legend: { position: "none" },
    hAxis: {
      textPosition: "none",
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
    const response = await fetch();
    // `${URLconfig.BASE_URL}/artist-tracks/${artist?.spotify_id}`
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
  }

  const handlesave = async () => {
    setIsLoading(true);

    const config = {
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    };

    const payload1 = {
      is_selected: 1,
    };

    await Promise.all(
      selected_tracks.map(async (e, i) => {
        axios.put(
          `${URLconfig.BASE_URL}/artist-tracks/${selected_tracks[i]}`,
          payload1,
          config
        );
      })
    );
    if (tracks.length) {
      console.log("unselected tracks");
      let unselected_tracks = tracks.filter(
        (track) => selected_tracks.includes(track.id) === false
      );

      const payload0 = {
        is_selected: 0,
      };

      await Promise.all(
        unselected_tracks.map(async (track, i) => {
          axios.put(
            `${URLconfig.BASE_URL}/artist-tracks/${track.id}`,
            payload0,
            config
          );
        })
      );
    }
    setIsLoading(false);
    toast.success("Saved SSuccessfully");
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <>
      <Box varient="div" component="div" className={classess.page}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <Box component="span">
            <center>
              <CircularProgress color="inherit" />
            </center>
          </Box>
        </Backdrop>
        <Box varient="div" component="div" className={classess.page__details}>
          <Typography varient="h2" className={classess.page__details__heading}>
            Verify Streaming Data
          </Typography>
          <Typography varient="p" className={classess.page__details__para}>
            How much you own of your tracks directly impacts your funding level.
            Use the sliders to adjust your share of master ownership for your
            top tracks. Note: it may take 3-6 weeks for recent releases to
            register.
          </Typography>
          <Stack
            position="sticky"
            direction="row"
            gap={2}
            className={classess.page__details__button_container}
          >
            <button
              type="button"
              className={classess.page__details__button_container__button}
            >
              Cancel
            </button>
            <button
              type="button"
              className={classess.page__details__button_container__button_pink}
              onClick={handlesave}
            >
              Save
            </button>
          </Stack>
        </Box>
        <Box>
          <Box varient="div" component="div" sx={{ width: "100%" }}>
            <Typography
              variant="h2"
              gutterBottom
              className={classess.page__details__heading}
            >
              Artist Total Streams and Views
            </Typography>
            <Typography
              variant="p"
              gutterBottom
              paragraph
              className={classess.page__details__total}
            >
              {totalStreaming}
            </Typography>

            <Grid sx={{ width: "100%" }}>
              <Chart
                chartType="Bar"
                width={"100%"}
                height={"400px"}
                data={data2}
                options={options2}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default VerifyContainer;
