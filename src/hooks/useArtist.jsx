import axios from "axios";
import axiosRetry from "axios-retry";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addArtist } from "../redux/slice/artist";
import { config as URLconfig } from "../enviorment/enviorment";

const useArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const post = ({ name, spotify_id, avatar, genres }) => {
    setIsLoading(true);

    axiosRetry(axios, { retries: 3 });

    // 1. refresh token from chartmetric
    axios
      .get(URLconfig.BASE_URL + "/chartmetric/token")
      .then((tokenResult) => {
        const json = tokenResult.data;
        return json.data.token;
      })
      .then((chartmetricToken) => {
        let configAuth = {
          token: chartmetricToken,
        };
        // 2. get chartmetic social artist ids
        axios
          .post(
            URLconfig.BASE_URL + `/chartmetric/ids/${spotify_id}`,
            configAuth
          )
          .then((idsResult) => {
            const json = idsResult.data;
            const ids = json.data;
            return ids["chartmetric_id"];
          })
          .then((cm_id) => {
            // 3. get artist from chartmetic
            setTimeout(() => {
              axios
                .post(
                  URLconfig.BASE_URL + `/chartmetric/artist/${cm_id}`,
                  configAuth
                )
                .then((artistReponse) => {
                  const json = artistReponse.data;
                  let artist = json.data;
                  return artist;
                })
                .then((cm_artist) => {
                  // 4. get total track Counter from charmetric
                  setTimeout(() => {
                    axios
                      .post(
                        URLconfig.BASE_URL +
                          `/chartmetric/tracks/${cm_id}?offset=0`,
                        configAuth
                      )
                      .then((trackResponse) => {
                        const json = trackResponse.data;
                        const total_tracks = json.data.total;
                        return total_tracks;
                      })
                      .then(async (total_tracks) => {
                        // 5. get the tracks with offset tracks functionality
                        let offset = 0;
                        let limit = 200;
                        let count = total_tracks / limit;
                        let arr = [];

                        for (let i = 0; i <= count; i++) {
                          try {
                            // await delay(500);
                            // console.log("Waited 3s");

                            let trackResponse = await axios.post(
                              URLconfig.BASE_URL +
                                `/chartmetric/tracks/${cm_id}?offset=${offset}`,
                              configAuth
                            );
                            const json = trackResponse.data;
                            const tracks = json.data.obj;
                            offset += 200;
                            await tracks.map((track) => arr.push(track));

                            // await delay(500);
                            // console.log("Waited an additional 3s");
                          } catch (error) {
                            console.log(error);
                          }
                        }

                        const payload = {
                          chartmetric: {
                            tracks: arr,
                          },
                          artist: {
                            name: name,
                            spotify_id: spotify_id,
                            avatar: avatar,
                            genres,
                            chartmetric: cm_artist,
                          },
                        };

                        let response = dispatch(
                          addArtist({
                            data: payload,
                          })
                        );

                        response
                          .then(() => {})
                          .catch((error) => {
                            toast.error(error);
                          })
                          .finally(async () => {
                            await delay(3000);

                            axios
                              .get(
                                `${URLconfig.BASE_URL}/artists/filter/get-artist-by-spotify/${spotify_id}`
                              )
                              .then(async (artist) => {
                                if (artist.data.data) {
                                  navigate(
                                    `/blig/view-artist/${artist.data.data._id}`
                                  );
                                } else {
                                  alert("Please try again");
                                }
                              })
                              .finally(() => {
                                setIsLoading(false);
                              });
                          });
                      })
                      .catch(() => {
                        console.log(`failed to get response from tracks`);
                      });
                  }, 1000);
                })
                .catch(() => {
                  console.log(`failed to get response from artist`);
                });
            }, 1000);
          })
          .catch(() => {
            console.log("failed to get ids from chartmetric");
          });
      })
      .catch(() => {
        console.log("failed to token from chartmetric");
      });
  };

  return {
    isLoading,
    post,
  };
};

export default useArtist;
