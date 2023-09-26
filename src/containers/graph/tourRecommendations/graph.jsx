import React, { useEffect, useState } from "react";

import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import axios from "axios";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import { countries } from "country-data";
import SpotifyIcon from "../../../assets/social/social-icon3.png";
import YoutubeIcon from "../../../assets/social/social-icon2.png";
import TiktokIcon from "../../../assets/social/social-icon8.png";
import DeezeerIcon from "../../../assets/social/social-icon4.png";
import { addCommasToNumber } from "../../../utils/helper";
import Skeleton from "@mui/material/Skeleton";
const Graph = () => {
  const [data, setData] = useState(null);
  const [allsourcesdata, setallsourcesdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const artist = useSelector((state) => state.artist.artist);

  async function drawChart() {
    // Create the data table.
    const country_data_resp = await axios.get(
      `${URLconfig.BASE_URL}/audience/${artist?.spotify_id}`
    );
    // const dataset = [
    //   { source: "spotify", country_code: "US", monthly_listeners: 100 },
    //   { source: "spotify", country_code: "UK", monthly_listeners: 150 },
    //   { source: "youtube", country_code: "US", current_views: 500 },
    //   { source: "youtube", country_code: "UK", current_views: 800 },
    //   // ... more data entries
    // ];
    const dataset = country_data_resp.data.data.audience;

    const combinedData = {};
    const totalsp_listeners = {};
    const totalyt_views = {};
    const totaltk_followers = {};
    const soundcloud_followers = {};
    for (const entry of dataset) {
      const source = entry.source;
      // const sp_country = entry.data.monthly_listeners.country_code;
      // const yt_country = entry.data.monthly_listeners.country_code;

      // const current_listeners =

      if (!combinedData.hasOwnProperty(source)) {
        combinedData[source] = [];
      }

      if (source === "spotify") {
        for (const item of entry.data.monthly_listeners) {
          const country = item.country_code;
          const current_listeners = item.current_listeners;

          // If the country code is not in the object, add it
          if (!totalsp_listeners.hasOwnProperty(country)) {
            totalsp_listeners[country] = 0;
          }
          totalsp_listeners[country] += current_listeners;
        }
        for (const country in totalsp_listeners) {
          if (totalsp_listeners.hasOwnProperty(country)) {
            const totalListeners = totalsp_listeners[country];
            combinedData[source].push({
              country_code: country,
              total_listeners: totalListeners,
            });
          }
        }
      } else if (source === "tiktok") {
        for (const item of entry.data.followers) {
          const country = item.country_code;
          const followers_total = item.followers_total;

          // If the country code is not in the object, add it
          if (!totaltk_followers.hasOwnProperty(country)) {
            totaltk_followers[country] = 0;
          }
          totaltk_followers[country] += followers_total;
        }
        for (const country in totaltk_followers) {
          if (totaltk_followers.hasOwnProperty(country)) {
            const followers_total = totaltk_followers[country];
            combinedData[source].push({
              country_code: country,
              followers_total: followers_total,
            });
          }
        }
      } else if (source === "youtube") {
        for (const item of entry.data.views) {
          const country = item.country_code;
          const current_views = item.current_views;

          // If the country code is not in the object, add it
          if (!totalyt_views.hasOwnProperty(country)) {
            totalyt_views[country] = 0;
          }
          totalyt_views[country] += current_views;
        }
        for (const country in totalyt_views) {
          if (totalyt_views.hasOwnProperty(country)) {
            const totalListeners = totalyt_views[country];
            combinedData[source].push({
              country_code: country,
              total_views: totalListeners,
            });
          }
        }
      } else if (source === "soundcloud") {
        for (const item of entry.data.followers) {
          const country = item.country_code;
          const total_followers = item.followers_total;

          // If the country code is not in the object, add it
          if (!soundcloud_followers.hasOwnProperty(country)) {
            soundcloud_followers[country] = 0;
          }
          soundcloud_followers[country] += total_followers;
        }
        for (const country in soundcloud_followers) {
          if (soundcloud_followers.hasOwnProperty(country)) {
            const total_followers = soundcloud_followers[country];
            combinedData[source].push({
              country_code: country,
              total_followers: total_followers,
            });
          }
        }
      }
    }
    console.log("combinedData", combinedData);
    const spotifyData = combinedData?.spotify || [];
    const youtubeData = combinedData?.youtube || [];
    const tiktokData = combinedData?.tiktok || [];
    const soundcloudData = combinedData?.soundcloud || [];

    const combinedArray = [];

    for (let i = 0; i < spotifyData.length; i++) {
      const countryData = {
        country_code: spotifyData[i].country_code,
        total_listeners: spotifyData[i]?.total_listeners || 0,
        total_views: youtubeData[i]?.total_views || 0,
        followers_total: tiktokData[i]?.followers_total || 0,
        soundcloud_followers: soundcloudData[i]?.total_followers || 0,
      };
      combinedArray.push(countryData);
    }
    setallsourcesdata(combinedArray);
    setIsLoading(false);
    let total_current_listner_US = 0;
    let total_current_listner_RU = 0;
    let total_current_listner_FR = 0;
    let total_current_listner_DE = 0;
    let total_current_listner_GB = 0;
    let total_current_listner_AU = 0;
    let total_current_listner_FI = 0;
    let total_current_listner_NO = 0;
    let total_current_listner_IE = 0;
    let total_current_listner_SE = 0;
    let total_current_listner_MX = 0;
    let total_current_listner_BR = 0;
    let total_current_listner_TR = 0;
    let total_current_listner_PL = 0;
    let total_current_listner_ES = 0;
    let total_current_listner_CA = 0;
    let total_current_listner_IN = 0;
    let total_current_listner_PK = 0;
    let total_current_listner_NG = 0;
    let total_current_listner_CB = 0;
    let total_current_listner_CN = 0;

    for (
      var i = 0;
      i < country_data_resp.data.data.audience[0].data.monthly_listeners.length;
      i++
    ) {
      let country_code =
        country_data_resp.data.data.audience[0].data.monthly_listeners[i]
          .country_code;
      let current_listenrs =
        country_data_resp.data.data.audience[0].data.monthly_listeners[i]
          .current_listeners;
      if (country_code === "US") {
        total_current_listner_US += current_listenrs;
      } else if (country_code === "RU") {
        total_current_listner_RU += current_listenrs;
      } else if (country_code === "FR") {
        total_current_listner_FR += current_listenrs;
      } else if (country_code === "DE") {
        total_current_listner_DE += current_listenrs;
      } else if (country_code === "GB") {
        total_current_listner_GB += current_listenrs;
      } else if (country_code === "AU") {
        total_current_listner_AU += current_listenrs;
      } else if (country_code === "FI") {
        total_current_listner_FI += current_listenrs;
      } else if (country_code === "NO") {
        total_current_listner_NO += current_listenrs;
      } else if (country_code === "IE") {
        total_current_listner_IE += current_listenrs;
      } else if (country_code === "SE") {
        total_current_listner_SE += current_listenrs;
      } else if (country_code === "MX") {
        total_current_listner_MX += current_listenrs;
      } else if (country_code === "BR") {
        total_current_listner_BR += current_listenrs;
      } else if (country_code === "TR") {
        total_current_listner_TR += current_listenrs;
      } else if (country_code === "PL") {
        total_current_listner_PL += current_listenrs;
      } else if (country_code === "ES") {
        total_current_listner_ES += current_listenrs;
      } else if (country_code === "CA") {
        total_current_listner_CA += current_listenrs;
      } else if (country_code === "IN") {
        total_current_listner_IN += current_listenrs;
      } else if (country_code === "PK") {
        total_current_listner_PK += current_listenrs;
      } else if (country_code === "CB") {
        total_current_listner_CB += current_listenrs;
      } else if (country_code === "NG") {
        total_current_listner_NG += current_listenrs;
      } else if (country_code === "FR") {
        total_current_listner_FR += current_listenrs;
      } else if (country_code === "CN") {
        total_current_listner_CN += current_listenrs;
      }

      const payload = [
        {
          country_code: "US",
          listners: total_current_listner_US,
        },
        {
          country_code: "UK",
          listners: total_current_listner_GB,
        },
        {
          country_code: "CA",
          listners: total_current_listner_CA,
        },
        {
          country_code: "AU",
          listners: total_current_listner_AU,
        },
        {
          country_code: "PK",
          listners: total_current_listner_PK,
        },
        {
          country_code: "IN",
          listners: total_current_listner_IN,
        },
        {
          country_code: "NG",
          listners: total_current_listner_NG,
        },
        {
          country_code: "CB",
          listners: total_current_listner_CB,
        },
        {
          country_code: "FR",
          listners: total_current_listner_FR,
        },
        {
          country_code: "CN",
          listners: total_current_listner_CN,
        },
        {
          country_code: "ES",
          listners: total_current_listner_ES,
        },
        {
          country_code: "DE",
          listners: total_current_listner_DE,
        },
      ];

      setData(payload);
    }
  }

  useEffect(() => {
    if (artist) {
      drawChart();
    }
  }, [artist]); // eslint-disable-next-line

  return (
    <Box component="div" variant="div" className={classess.page}>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <span className={classess.page__banner__topheading}>Top Countries</span>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Box className={classess.page__main_content}>
              <Box className={classess.page__main_content__rounded_image}>
                <Skeleton variant="circular" width={40} height={40} />
              </Box>

              <Box
                className={
                  classess.page__main_content__platform_content_container
                }
              >
                <Box
                  className={
                    classess.page__main_content__platform_content_container__platform_streaming_container
                  }
                >
                  <Box
                    className={
                      classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                    }
                  >
                    <Skeleton variant="text" fontSize="1rem" />
                  </Box>

                  <Box
                    className={
                      classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                    }
                  >
                    <Skeleton variant="text" fontSize="1rem" />
                  </Box>

                  <Box
                    className={
                      classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                    }
                  >
                    <Skeleton variant="text" fontSize="1rem" />
                  </Box>
                  <Box
                    className={
                      classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                    }
                  >
                    <Skeleton variant="text" fontSize="1rem" />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box className={classess.page__container}>
            {allsourcesdata &&
              allsourcesdata.length &&
              allsourcesdata
                .sort((a, b) => b.total_listeners - a.total_listeners)
                .map((el) => (
                  <Box className={classess.page__main_content}>
                    <Box className={classess.page__main_content__rounded_image}>
                      <Box sx={{ fontSize: 40 }}>
                        {countries[el.country_code].emoji}
                      </Box>
                    </Box>

                    <Box
                      className={
                        classess.page__main_content__platform_content_container
                      }
                    >
                      <span
                        className={
                          classess.page__main_content__platform_content_container__top_heading
                        }
                      >
                        {countries[el.country_code].name}
                      </span>

                      <Box
                        className={
                          classess.page__main_content__platform_content_container__platform_streaming_container
                        }
                      >
                        {el.total_listeners > 0 ? (
                          <Box
                            className={
                              classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                            }
                          >
                            <Avatar
                              src={SpotifyIcon}
                              sx={{
                                height: "20px",
                                width: "20px",
                                marginRight: "10px",
                              }}
                            />
                            <span
                              className={
                                classess.page__main_content__platform_content_container__platform_streaming_container__text
                              }
                            >
                              {addCommasToNumber(el.total_listeners)}
                            </span>
                          </Box>
                        ) : null}

                        {el.total_views > 0 ? (
                          <Box
                            className={
                              classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                            }
                          >
                            <Avatar
                              src={YoutubeIcon}
                              sx={{
                                height: "20px",
                                width: "20px",
                                marginRight: "10px",
                              }}
                            ></Avatar>
                            <span
                              className={
                                classess.page__main_content__platform_content_container__platform_streaming_container__text
                              }
                            >
                              {addCommasToNumber(el.total_views)}
                            </span>
                          </Box>
                        ) : null}

                        {el.followers_total > 0 ? (
                          <Box
                            className={
                              classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                            }
                          >
                            <Avatar
                              src={TiktokIcon}
                              sx={{
                                height: "20px",
                                width: "20px",
                                marginRight: "10px",
                              }}
                            ></Avatar>
                            <span
                              className={
                                classess.page__main_content__platform_content_container__platform_streaming_container__text
                              }
                            >
                              {addCommasToNumber(el.followers_total)}
                            </span>
                          </Box>
                        ) : null}

                        {el.soundcloud_followers > 0 ? (
                          <Box
                            className={
                              classess.page__main_content__platform_content_container__platform_streaming_container__logo_stream
                            }
                          >
                            <Avatar
                              src={DeezeerIcon}
                              sx={{
                                height: "20px",
                                width: "20px",
                                marginRight: "10px",
                              }}
                            ></Avatar>
                            <span
                              className={
                                classess.page__main_content__platform_content_container__platform_streaming_container__text
                              }
                            >
                              {addCommasToNumber(el.soundcloud_followers)}
                            </span>
                          </Box>
                        ) : null}
                      </Box>
                    </Box>
                  </Box>
                ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Graph;
