import { Box, CircularProgress } from "@mui/material";
import React from "react";
import classess from "./style.module.scss";

const ArtistPreLoader = () => {
  return (
    <div className={classess.page}>
      <Box component="span">
        <center>
          <CircularProgress color="inherit" />
        </center>
        <p>Please wait, While We Are Fetching Your Tracks Information</p>
      </Box>
    </div>
  );
};

export default ArtistPreLoader;
