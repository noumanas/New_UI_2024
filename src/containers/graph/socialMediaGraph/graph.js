import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import Grid from "@mui/material/Grid";
import { Chart } from "react-google-charts";
import axios from "axios";
import { config as URLconfig } from "../../../../src/enviorment/enviorment";
import { Button, Typography } from "@mui/material";
import { abbreviateNumber, addCommasToNumber } from "../../../utils/helper";

import SpotifyIcon from "../../../assets/social/social-icon3.png";
import YoutubeIcon from "../../../assets/social/social-icon2.png";
import TiktokIcon from "../../../assets/social/social-icon8.png";
import InstagramIcon from "../../../assets/social/social-icon9.png";

const SocialMediaGraph = (artist) => {
  const [spotify_followrs, setSpotify_followers] = useState(0);
  const [
    spotify_monthly_listeners_current,
    set_spotify_monthly_listeners_current,
  ] = useState(0);
  const [spotify_popularity_current, set_spotify_popularity_current] =
    useState(0);
  const [daily_listeners_current, set_spotify_daily_listeners_current] =
    useState(0);
  const [instagram_followrs, setInstagram_followers] = useState(0);
  const [Instagram_views_total, setInstagram_views_total] = useState(0);
  const [Instagram_likes_total, setInstagram_likes_total] = useState(0);
  const [Instagram_comments_total, setInstagram_comments_total] = useState(0);
  const [Instagram_video_reach_total, setInstagram_video_reach_total] =
    useState(0);
  const [Instagram_video_videos_total, setInstagram_videos_total] = useState(0);
  const [youtube_subscribers_total, setyoutube_subscribers_total] = useState(0);
  const [youtube_video_views_total, setyoutube_video_views_total] = useState(0);
  const [youtube_video_likes_total, setyoutube_video_likes_total] = useState(0);
  const [youtube_video_comments_total, setyoutube_video_comments_total] =
    useState(0);
  const [youtube_shorts_total, setyoutube_shorts_total] = useState(0);
  const [youtube_video_reach_total, setyoutube_video_reach_total] = useState(0);
  const [youtube, setYoutube] = useState(false);
  const [spotify, setSpotify] = useState(true);
  const [tiktok, setTiktok] = useState(false);
  // const [tiktok_comments_total,settiktok_comments_total]=useState(0);
  const [tiktok_followers_total, settiktok_followers_total] = useState(0);
  const [tiktok_likes_total, settiktok_likes_total] = useState(0);
  // const [tiktok_profile_likes_total ,settiktok_profile_likes_total]=useState(0);
  // const [tiktok_profile_videos_total ,settiktok_profile_videos_total]=useState(0);
  const [tiktok_shares_total, settiktok_shares_total] = useState(0);
  // const [tiktok_video_reach_total,settiktok_video_reach_total]=useState(0);
  const [tiktok_videos_total, settiktok_videos_total] = useState(0);
  const [tiktok_views_total, settiktok_views_total] = useState(0);
  // spotify_data
  const [Instagram, setInstagram] = useState(false);
  const social_media_followers = [
    ["Platforms", "Growth"],
    [
      "Spotify Followers " + abbreviateNumber(spotify_followrs),
      spotify_followrs,
    ],
    [
      "Youtube Followers " + abbreviateNumber(youtube_subscribers_total),
      youtube_subscribers_total,
    ],
    [
      "Instagram Followers " + abbreviateNumber(instagram_followrs),
      instagram_followrs,
    ],
    [
      "TikTok Followers " + abbreviateNumber(tiktok_followers_total),
      tiktok_followers_total,
    ],
  ];

  const options = {
    backgroundColor: "transparent",

    is3D: false,
    pieHole: 0.4,
    titleTextStyle: { color: "#FFFFFF" },
    slices: {
      0: { color: "#3AB182" },
      1: { color: "#7BC4A7" },
      2: { color: "#4FFCB7" },
      3: { color: "#B9FFE3" },
    },
    pieSliceBorderColor: "none",

    pieSliceTextStyle: {
      color: "black",
      fontSize: "14",
    },
    animation: {
      duration: 1000,
      easing: "in",
      startup: true,
    },
    legend: "none",
    // {
    //   textStyle: { color: "white", fontSize: "14" },
    //   alignment: "left",
    // }
    chartArea: { left: 10, top: 20, width: "90%", height: "90%" },
  };

  async function getdrawdata(spotify_id) {
    const repsonse = await axios.get(
      `${URLconfig.BASE_URL}/artist-stats/${spotify_id}`
    );
    if (repsonse.status === 200) {
      // if(repsonse.data?.data?.stats.length ==0){
      //   const repsonse = await axios.post(
      //     `${URLconfig.BASE_URL}/songstats/stats/${spotify_id}`
      //   );
      // }
      // else{
      setSpotify_followers(
        repsonse?.data?.data?.stats[0]?.data?.followers_total
      );
      setInstagram_followers(
        repsonse?.data?.data?.stats[4]?.data?.followers_total
      );
      setInstagram_views_total(
        repsonse?.data?.data?.stats[4]?.data?.views_total
      );
      setInstagram_likes_total(
        repsonse?.data?.data?.stats[4]?.data?.likes_total
      );
      setInstagram_comments_total(
        repsonse?.data?.data?.stats[4]?.data?.comments_total
      );
      setInstagram_video_reach_total(
        repsonse?.data?.data?.stats[4]?.data?.video_reach_total
      );
      setInstagram_videos_total(
        repsonse?.data?.data?.stats[4]?.data?.videos_total
      );
      setyoutube_video_comments_total(
        repsonse?.data?.data?.stats[6]?.data?.video_comments_total
      );
      setyoutube_subscribers_total(
        repsonse?.data?.data?.stats[6]?.data?.subscribers_total
      );
      setyoutube_video_views_total(
        repsonse?.data?.data?.stats[6]?.data?.video_views_total
      );
      setyoutube_video_likes_total(
        repsonse?.data?.data?.stats[6]?.data?.video_likes_total
      );
      setyoutube_shorts_total(
        repsonse?.data?.data?.stats[6]?.data?.shorts_total
      );
      setyoutube_video_reach_total(
        repsonse?.data?.data?.stats[6]?.data?.video_reach_total
      );
      set_spotify_monthly_listeners_current(
        repsonse?.data?.data?.stats[0]?.data?.monthly_listeners_current
      );
      set_spotify_popularity_current(
        repsonse?.data?.data?.stats[0]?.data?.popularity_current
      );
      set_spotify_daily_listeners_current(
        repsonse?.data?.data?.stats[0]?.data?.daily_listeners_current
      );
      // settiktok_comments_total(repsonse?.data?.data?.stats[5]?.data?.comments_total);
      settiktok_followers_total(
        repsonse?.data?.data?.stats[5]?.data?.followers_total
      );
      settiktok_likes_total(repsonse?.data?.data?.stats[5]?.data?.likes_total);
      // settiktok_profile_likes_total(repsonse?.data?.data?.stats[5]?.data?.profile_likes_total);
      // settiktok_profile_videos_total(repsonse?.data?.data?.stats[5]?.data?.profile_videos_total);
      settiktok_shares_total(
        repsonse?.data?.data?.stats[5]?.data?.shares_total
      );
      // settiktok_video_reach_total(repsonse?.data?.data?.stats[5]?.data?.video_reach_total);
      settiktok_videos_total(
        repsonse?.data?.data?.stats[5]?.data?.videos_total
      );
      settiktok_views_total(repsonse?.data?.data?.stats[5]?.data?.views_total);
    } else {
      const repsonse = await axios.post(
        `${URLconfig.BASE_URL}/songstats/stats/${spotify_id}`
      );
    }
  }

  useEffect(() => {
    if (artist) {
      let isSubscribed = true;
      if (isSubscribed) {
        getdrawdata(artist.artist?.spotify_id);
      }

      return () => {
        return isSubscribed;
      };
    }
  }, [artist.artist]);

  const handleSpotify = () => {
    setSpotify(true);
    setInstagram(false);
    setYoutube(false);
    setTiktok(false);
  };

  const handleInstagram = () => {
    setInstagram(true);
    setSpotify(false);
    setYoutube(false);
    setTiktok(false);
  };
  const handleYoutube = () => {
    setInstagram(false);
    setSpotify(false);
    setYoutube(true);
    setTiktok(false);
  };
  const handleTiktok = () => {
    setInstagram(false);
    setSpotify(false);
    setYoutube(false);
    setTiktok(true);
  };

  return (
    <>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <Box sx={{ marginBottom: "20px" }}>
          <span className={classess.page__banner__topHeading}>
            Social Media Insights
          </span>
        </Box>

        <Box className={classess.page__banner__inner_container}>
          <Box className={classess.page__banner__inner_container__chart}>
            {spotify && (
              <Grid sx={{ width: "90%" }}>
                <Chart
                  chartType="PieChart"
                  data={social_media_followers}
                  options={options}
                  className={classess.chartResp}
                />
              </Grid>
            )}
          </Box>

          <Box className={classess.page__banner__inner_container__details}>
            <Box
              className={classess.page__banner__inner_container__details__box}
            >
              <Box
                className={
                  classess.page__banner__inner_container__details__box__tophead
                }
              >
                <img
                  src={SpotifyIcon}
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon
                  }
                />
                <Typography
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon_text
                  }
                >
                  Spotify
                </Typography>
              </Box>
              <Typography
                className={
                  classess.page__banner__inner_container__details__box__mid_heading
                }
              >
                {addCommasToNumber(spotify_followrs ? spotify_followrs : "NA")}
              </Typography>

              <Typography
                className={
                  classess.page__banner__inner_container__details__box__last_heading
                }
              >
                Followers
              </Typography>
            </Box>

            <Box
              className={classess.page__banner__inner_container__details__box}
            >
              <Box
                className={
                  classess.page__banner__inner_container__details__box__tophead
                }
              >
                <img
                  src={YoutubeIcon}
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon
                  }
                />

                <Typography
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon_text
                  }
                >
                  Youtube
                </Typography>
              </Box>
              <Typography
                className={
                  classess.page__banner__inner_container__details__box__mid_heading
                }
              >
                {addCommasToNumber(
                  youtube_subscribers_total ? youtube_subscribers_total : "NA"
                )}
              </Typography>

              <Typography
                className={
                  classess.page__banner__inner_container__details__box__last_heading
                }
              >
                Followers
              </Typography>
            </Box>

            <Box
              className={classess.page__banner__inner_container__details__box}
            >
              <Box
                className={
                  classess.page__banner__inner_container__details__box__tophead
                }
              >
                <img
                  src={TiktokIcon}
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon
                  }
                />
                <Typography
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon_text
                  }
                >
                  TikTok
                </Typography>
              </Box>
              <Typography
                className={
                  classess.page__banner__inner_container__details__box__mid_heading
                }
              >
                {addCommasToNumber(
                  tiktok_followers_total ? tiktok_followers_total : "NA"
                )}
              </Typography>

              <Typography
                className={
                  classess.page__banner__inner_container__details__box__last_heading
                }
              >
                Followers
              </Typography>
            </Box>

            <Box
              className={classess.page__banner__inner_container__details__box}
            >
              <Box
                className={
                  classess.page__banner__inner_container__details__box__tophead
                }
              >
                <img
                  src={InstagramIcon}
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon
                  }
                />
                <Typography
                  className={
                    classess.page__banner__inner_container__details__box__tophead__icon_text
                  }
                >
                  Instagram
                </Typography>
              </Box>
              <Typography
                className={
                  classess.page__banner__inner_container__details__box__mid_heading
                }
              >
                {addCommasToNumber(
                  instagram_followrs ? instagram_followrs : "NA"
                )}
              </Typography>

              <Typography
                className={
                  classess.page__banner__inner_container__details__box__last_heading
                }
              >
                Followers
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SocialMediaGraph;
