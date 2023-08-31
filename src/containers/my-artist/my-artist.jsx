import React, { useEffect, useState, useSelector } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MyArtistViewContainer from "../../views/my-artist-view-container/my-artist-view-conatiner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@mui/material";
import { scrollTopObserver, tableSortingAlgo } from "../../utils/helper";
// import SearchAutcomplete from "../../components/search-autcomplete/search-autcomplete";
import AddArtist from "../artist/add-artist/add-artist";
import Modal from "@mui/material/Modal";

const MyArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xxl">
      <Grid container spacing={2} className={classess.page}>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={9}
          className={classess.page__banner}
        >
          <AddArtist />
        </Grid>

        <Grid item sm={12} md={12} lg={12} xl={9}>
          <Box className={classess.page__main_content}>
            <MyArtistViewContainer selectedView="list" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyArtist;
