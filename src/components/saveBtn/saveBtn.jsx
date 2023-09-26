import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LiaSaveSolid } from "react-icons/lia";
import classess from "./style.module.scss";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { config as URLconfig } from "../../enviorment/enviorment";
import axios from "axios";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { toast } from "react-toastify";
import Chart from "react-google-charts";
import Grid from "@mui/material/Grid";
import AuthEnum from "../../enums/auth.enum";
import { getItemToLocalStorage } from "../../services/storage";
const SaveBtn = ({ headerCss, saveBtnCss, artist }) => {
  const [isLoading, setIsLoading] = useState(false);
  const tracks = useSelector((state) => state.artist.tracks);
  const selected_tracks = useSelector((state) => state.artist.selectedTracks);

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
    toast.success("Saved Successfully");
  };
  return (
    <Box className={headerCss}>
      <Box className={saveBtnCss}>
        <Button
          variant="contained"
          onClick={handlesave}
          startIcon={<LiaSaveSolid />}
        >
          {isLoading ? "Processing" : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default SaveBtn;
