import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import MainAppBar from "../../../components/main-app-bar/main-app-bar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import ArtistSignupForm from "../../../components/artist-signup-form/signup-form";

const ArtistSignupContainer = () => {
  return (
    <Box
      varient="div"
      component="div"
      sx={{ display: "flex", pb: { xs: 10, lg: 0 } }}
      className={classess.page}
    >
      <MainAppBar>
        <Box varient="div" component="div" className={classess.page__login}>
          <Box
            varient="div"
            component="div"
            className={classess.page__login__info}
          >
            <span className={classess.page__login__info__text}>
              Get Your Music on Social Platforms and{" "}
              <span className={classess.page__login__info__text__highlighted}>
                150+ Digital Stores
              </span>{" "}
              like Spotify, Apple Music, Tidal, YouTube, Instagram, TikTok and
              more
            </span>
            <ul className={classess.page__login__info__list}>
              <li className={classess.page__login__info__list__item}>
                <ArrowForwardIcon
                  sx={{ fontSize: 18, fontWeight: 900, color: "#4FFCB7" }}
                />
                <span className={classess.page__login__info__list__item__text}>
                  Unlimited Worldwide Music Distribution
                </span>
              </li>
              <li className={classess.page__login__info__list__item}>
                <ArrowForwardIcon
                  sx={{ fontSize: 18, fontWeight: 900, color: "#4FFCB7" }}
                />
                <span className={classess.page__login__info__list__item__text}>
                  Unlimited Releases to Social Platforms
                </span>
              </li>
              <li className={classess.page__login__info__list__item}>
                <ArrowForwardIcon
                  sx={{ fontSize: 18, fontWeight: 900, color: "#4FFCB7" }}
                />
                <span className={classess.page__login__info__list__item__text}>
                  Comprehensive Sales Data
                </span>
              </li>
            </ul>
          </Box>
          <Box
            varient="div"
            component="div"
            className={classess.page__login__form}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__login__form__box}
            >
              <ArtistSignupForm />
            </Box>
            <Typography
              variant="caption"
              display="block"
              className={classess.page__login__form__coptrights}
              gutterBottom
            >
              © {new Date().getFullYear()}. Black Lion. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </MainAppBar>
    </Box>
  );
};
export default ArtistSignupContainer;
