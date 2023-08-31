import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import classess from "./style.module.scss";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modal";
import { toast } from "react-toastify";
import { config as URLconfig } from "../../enviorment/enviorment";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  setReload,
  setSearchResultTracks,
  setTracks,
} from "../../redux/slice/artist";
import { getItemToLocalStorage } from "../../services/storage";

export default function EditTrackPopup() {
  const track = useSelector((state) => state.modal.data);
  const [title, set_title] = useState();
  const [isrc, set_isrc] = useState();
  const [release_date, set_release_date] = useState();
  const [spotify_streams_total, set_spotify_streams_total] = useState(0);
  const [deezer_reach_total, set_deezer_reach_total] = useState();
  const [genres, set_genres] = useState();

  const [tiktok_views_total, set_tiktok_views_total] = useState();
  const [tiktok_shares_total, set_tiktok_shares_total] = useState();

  const [youtube_video_views_total, set_youtube_video_views_total] = useState();
  const [stream_income_share, set_stream_income_share] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const tracks = useSelector((state) => state.artist.tracks);
  const searchTracks = useSelector((state) => state.artist.searchTracks);
  const isOpen = useSelector((state) => state.modal.isOpen);

  const dispatch = useDispatch();
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const updateTrack = (e, id) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      title: title,
      stream_income_share: stream_income_share,
      youtube_video_views_total: removeNonNumeric(youtube_video_views_total),
      spotify_streams_total: removeNonNumeric(spotify_streams_total),
      tiktok_views_total: removeNonNumeric(tiktok_views_total),
      tiktok_shares_total:removeNonNumeric(tiktok_shares_total),
      deezer_reach_total: removeNonNumeric(deezer_reach_total),
      isrc: isrc,
      release_date,
      genres: genres,
    };

    const token = getItemToLocalStorage("accessToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${URLconfig.BASE_URL}/artist-tracks/${id}`, data, config)
      .then(() => {
        toast.success("Track updated Successfully.");
        setIsLoading(false);
        emptyFields();

        let update_tracks = tracks.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              title,
              stream_income_share,
              youtube_video_views_total: parseInt(
                removeNonNumeric(youtube_video_views_total)
              ),
              spotify_streams_total: parseInt(
                removeNonNumeric(spotify_streams_total)
              ),
              tiktok_views_total: parseInt(
                removeNonNumeric(tiktok_views_total)
              ),
              deezer_reach_total: parseInt(
                removeNonNumeric(deezer_reach_total)
              ),
              tiktok_shares_total: parseInt(removeNonNumeric(tiktok_shares_total)),
              isrc,
              release_date,
              genres,
            };
          }
          return elem;
        });

        dispatch(setTracks(update_tracks));

        let update_search_tracks = searchTracks.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              title,
              stream_income_share,
              youtube_video_views_total: parseInt(
                removeNonNumeric(youtube_video_views_total)
              ),
              spotify_streams_total: parseInt(
                removeNonNumeric(spotify_streams_total)
              ),
              tiktok_views_total: parseInt(
                removeNonNumeric(tiktok_views_total)
              ),
              deezer_reach_total: parseInt(
                removeNonNumeric(deezer_reach_total)
              ),
              tiktok_shares_total:parseInt(removeNonNumeric(tiktok_shares_total)),
              isrc,
              release_date,
              genres,
            };
          }
          return elem;
        });

        dispatch(setSearchResultTracks(update_search_tracks));

        dispatch(setReload(true));
        dispatch(closeModal());
      })
      .catch((error) => {
        setIsLoading(false);
        emptyFields();
        dispatch(closeModal());
        console.log(`Error: ${error}`);
      });
  };

  const emptyFields = () => {
    set_title("");
    set_isrc("");
    set_genres("");
    set_release_date("");
    set_spotify_streams_total("");
    set_deezer_reach_total("");
    set_tiktok_views_total("");
    set_tiktok_shares_total("");
    set_youtube_video_views_total("");
    set_stream_income_share("");
  };

  useEffect(() => {
    if (track && Object.keys(track).length) {
      set_title(track?.title);
      set_isrc(track?.isrc);
      set_genres(track?.genres);
      let today = new Date();
      let arr = track?.release_date.split("-");
      let year = arr[0];
      let month = arr[1];
      let day = arr[2];
      today.setFullYear(year);
      today.setMonth(month);
      today.setDate(day);
      set_release_date(track?.release_date);
      set_spotify_streams_total(addCommas(track?.spotify_streams_total));
      // set_spotify_streams_total(track?.spotify_streams_total);
      set_deezer_reach_total(addCommas(track?.deezer_reach_total));

      set_tiktok_views_total(addCommas(track?.tiktok_views_total));
      set_tiktok_shares_total(addCommas(track?.tiktok_shares_total));
      set_youtube_video_views_total(
        addCommas(track?.youtube_video_views_total)
      );
      set_stream_income_share(track?.stream_income_share);
    }
  }, [track]);

  // const mapTracks = (artistTrack) => ({
  //   id: artistTrack._id,
  //   title: artistTrack.title,
  //   image: artistTrack.track_img,
  //   stream_income_share: artistTrack.stream_income_share,
  //   spotify_streams_total: artistTrack.spotify_streams_total,
  //   youtube_video_views_total: artistTrack.youtube_video_views_total,
  //   tiktok_views_total: artistTrack.tiktok_views_total,
  //   deezer_reach_total: artistTrack.deezer_reach_total,
  //   isrc: artistTrack.isrc,
  //   release_date: artistTrack.release_date,
  //   is_selected: artistTrack.is_selected,
  //   songstats_track_id: artistTrack.songstats_track_id,
  //   historic: artistTrack.historic,
  //   last_streams_growth: artistTrack.last_streams_growth
  // });

  return (
    <div>
      <Modal
        keepMounted
        open={isOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box varient="div" component="div" className={classess.page}>
          <Container>
            <Box
              varient="div"
              component="div"
              className={classess.page__dialog}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__dialog__header}
              >
                <span className={classess.page__dialog__header__title}>
                  Edit Track
                </span>
              </Box>
              <form
                autoComplete="off"
                onSubmit={(e) => updateTrack(e, track.id)}
                className={classess.page__dialog__form}
              >
                <Box className={classess.page__dialog__form__field_container}>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Track Title *
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="title"
                      placeholder="Track Title"
                      type="text"
                      value={title}
                      onChange={(e) => set_title(e.target.value)}
                      maxLength={150}
                      required
                    />
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      ISRC
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="isrc"
                      placeholder="ISRC"
                      value={isrc}
                      onChange={(e) => set_isrc(e.target.value)}
                      maxLength={150}
                      type="text"
                    />
                  </Box>
                </Box>
                <Box className={classess.page__dialog__form__field_container}>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Release Date *
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        inputFormat="MM/DD/YYYY"
                        value={release_date}
                        disabled
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              svg: { color: "#c2c2c2 !important" },
                              input: { color: "#c2c2c2 !important" },
                            }}
                            disabled
                            className={
                              classess.page__dialog__form__field_container__field__input_date
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Spotify Streams Total *
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="spotify_streams_total"
                      placeholder="Spotify Streams Total"
                      type="text"
                      value={spotify_streams_total}
                      onChange={(e) =>
                        set_spotify_streams_total(
                          addCommas(removeNonNumeric(e.target.value))
                        )
                      }
                      min={0}
                      required
                    />
                  </Box>
                </Box>
                <Box className={classess.page__dialog__form__field_container}>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Genres
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="genres"
                      placeholder="genres"
                      type="text"
                      value={genres}
                      onChange={(e) => set_genres(e.target.value)}
                      min={0}
                    />
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      TikTok Views Total *
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="tiktok_views_total"
                      placeholder="TikTok Views Total"
                      type="text"
                      value={tiktok_views_total}
                      onChange={(e) =>
                        set_tiktok_views_total(
                          addCommas(removeNonNumeric(e.target.value))
                        )
                      }
                      min={0}
                      required

                    />
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      TikTok Share Total *
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="tiktok_shares_total"
                      placeholder="TikTok Views Total"
                      type="text"
                      value={tiktok_shares_total}
                      onChange={(e) =>
                        set_tiktok_shares_total(
                          addCommas(removeNonNumeric(e.target.value))
                        )
                      }
                      min={0}
                      required
                    />
                  </Box>
                </Box>
                <Box className={classess.page__dialog__form__field_container}>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Youtube Views Total *
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="youtube_video_views_total"
                      placeholder="Youtube Views Total"
                      type="text"
                      value={youtube_video_views_total}
                      onChange={(e) =>
                        set_youtube_video_views_total(
                          addCommas(removeNonNumeric(e.target.value))
                        )
                      }
                      min={0}
                      required
                    />
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Income Share (%)
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="stream_income_share"
                      placeholder="Income Share (percent)"
                      type="number"
                      value={stream_income_share}
                      onChange={(e) => set_stream_income_share(e.target.value)}
                      min={1}
                      max={100}
                      required
                    />
                  </Box>
                </Box>

                <Box
                  varient="div"
                  component="div"
                  className={classess.page__dialog__form__actions}
                >
                  <Stack
                    direction="row"
                    gap={5}
                    sx={{ width: { xs: "100%", sm: "100%", lg: "49%" } }}
                  >
                    <Button
                      variant="contained"
                      type="button"
                      className={
                        classess.page__dialog__form__actions__cancel_btn
                      }
                      disabled={isLoading}
                      onClick={() => dispatch(closeModal())}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      className={
                        classess.page__dialog__form__actions__submit_btn
                      }
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <CircularProgress size={25} color="inherit" />
                      )}
                      Submit
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );

  // return (
  //   <div>
  //     <Modal
  //       keepMounted
  //       open={isOpen}
  //       onClose={() => dispatch(closeModal())}
  //       aria-labelledby="keep-mounted-modal-title"
  //       aria-describedby="keep-mounted-modal-description"
  //     >
  //       <Box varient="div" component="div" sx={style}>
  //         <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
  //           Edit Track
  //         </Typography>
  //         <Box
  //           varient="div"
  //           component="div"
  //           className={classess.page__fieldsContainer}
  //         >
  //           <form
  //             className={classess.page__fieldsContainer__form}
  //             onSubmit={(e) => updateTrack(e, track.id)}
  //             autoComplete="off"
  //           >
  //             <Stack
  //               direction="row"
  //               sx={{
  //                 gap: { xs: 3, sm: 8, lg: 15 },
  //                 flexWrap: { xs: "wrap", sm: "nowrap" },
  //               }}
  //             >
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   Track Title *
  //                 </label>
  //                 <input
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="Track_Title"
  //                   placeholder="Track Title"
  //                   type="text"
  //                   value={title}
  //                   onChange={(e) => set_title(e.target.value)}
  //                   required
  //                 />
  //               </Box>
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   ISRC *
  //                 </label>
  //                 <input
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="ISRC"
  //                   placeholder="ISRC"
  //                   type="text"
  //                   value={isrc}
  //                   onChange={(e) => set_isrc(e.target.value)}
  //                 />
  //               </Box>
  //             </Stack>
  //             <Stack
  //               direction="row"
  //               sx={{
  //                 gap: { xs: 3, sm: 8, lg: 15 },
  //                 flexWrap: { xs: "wrap", sm: "nowrap" },
  //               }}
  //             >
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   Release Date *
  //                 </label>
  //                 <input
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="Release_date"
  //                   type="date"
  //                   value={release_date}
  //                   onChange={(e) => set_release_date(e.target.value)}
  //                   required
  //                 />
  //               </Box>
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   Spotify Streams Total
  //                 </label>
  //                 <input
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="Spotify_Streams_Total"
  //                   placeholder="Spotify Streams Total"
  //                   type="text"
  //                   value={spotify_streams_total}
  //                   onChange={(e) => set_spotify_streams_total(e.target.value)}
  //                 />
  //               </Box>
  //             </Stack>
  //             <Stack
  //               direction="row"
  //               sx={{
  //                 gap: { xs: 3, sm: 8, lg: 15 },
  //                 flexWrap: { xs: "wrap", sm: "nowrap" },
  //               }}
  //             >
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   Deezer Reach Total
  //                 </label>
  //                 <input
  //                   type="number"
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="Deezer_Reach_Total"
  //                   value={deezer_reach_total}
  //                   onChange={(e) => set_deezer_reach_total(e.target.value)}
  //                   placeholder="Deezer Reach Total"
  //                 />
  //               </Box>
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   TikTok Views Total
  //                 </label>
  //                 <input
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="TikTok-Views-Total"
  //                   placeholder="TikTok Views Total"
  //                   type="text"
  //                   value={tiktok_views_total}
  //                   onChange={(e) => set_tiktok_views_total(e.target.value)}
  //                 />
  //               </Box>
  //             </Stack>
  //             <Stack
  //               direction="row"
  //               sx={{
  //                 gap: { xs: 3, sm: 8, lg: 15 },
  //                 flexWrap: { xs: "wrap", sm: "nowrap" },
  //               }}
  //             >
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   Youtube Views Total *
  //                 </label>
  //                 <input
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   name="Youtube_Views_Total"
  //                   placeholder="Youtube Views Total"
  //                   value={youtube_video_views_total}
  //                   onChange={(e) =>
  //                     set_youtube_video_views_total(e.target.value)
  //                   }
  //                   required
  //                 />
  //               </Box>
  //               <Box
  //                 varient="div"
  //                 component="div"
  //                 className={classess.page__fieldsContainer__form__formfield}
  //                 sx={{ width: "100%" }}
  //               >
  //                 <label
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__label
  //                   }
  //                 >
  //                   Income Share(%)
  //                 </label>

  //                 <input
  //                   type="number"
  //                   value={stream_income_share}
  //                   className={
  //                     classess.page__fieldsContainer__form__formfield__input
  //                   }
  //                   aria-label="Default"
  //                   valueLabelDisplay="auto"
  //                   name="Income_Share_"
  //                   min={0}
  //                   max={100}
  //                   onChange={(e) =>
  //                     set_stream_income_share(e.target.value)
  //                   }
  //                   required
  //                 />
  //               </Box>
  //             </Stack>

  //             <Stack
  //               direction="row"
  //               sx={{
  //                 gap: { xs: 3, sm: 4, lg: 5 },
  //                 flexWrap: { xs: "wrap", sm: "nowrap" },
  //               }}
  //               justifyContent="flex-end"
  //             >

  //               <Button
  //                 sx={{
  //                   background: "#003666",
  //                   color: "white",
  //                   float: "right",
  //                   width: "203px",
  //                   height: "50px",
  //                 }}
  //                 onClick={() => dispatch(closeModal())}
  //               >
  //                 Cancel
  //               </Button>

  //               <Button
  //                 type="submit"
  //                 sx={{
  //                   background: "#EC1086",
  //                   color: "white",
  //                   float: "right",
  //                   width: "203px",
  //                   height: "50px",
  //                 }}
  //               >
  //                 Save
  //               </Button>
  //             </Stack>
  //           </form>

  //         </Box>
  //       </Box>
  //     </Modal>
  //   </div>
  // );
}
