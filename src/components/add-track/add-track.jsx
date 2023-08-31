import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import classess from "./style.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { config as URLconfig } from "../../enviorment/enviorment";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setReload } from "../../redux/slice/artist";
import { useDispatch } from "react-redux";
import { getItemToLocalStorage } from "../../services/storage";

export default function AddTracks({ open, handleClose, spotifyId }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const {
      title,
      isrc,
      spotify_streams_total,
      deezer_reach_total,
      tiktok_views_total,
      youtube_video_views_total,
      stream_income_share,
    } = event.target;

    let release_date = date.year() + "-" + date.month() + "-" + date.date();

    const request = {
      spotify_artist_id: spotifyId,
      title: title.value,
      isrc: isrc.value,
      release_date: release_date,
      spotify_streams_total: spotify_streams_total.value,
      deezer_reach_total: deezer_reach_total.value,
      tiktok_views_total: tiktok_views_total.value,
      youtube_video_views_total: youtube_video_views_total.value,
      stream_income_share: stream_income_share.value,
    };

    const token = getItemToLocalStorage("accessToken");
    const authConfig = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${URLconfig.BASE_URL}/artist-tracks`, request, authConfig)
      .then(() => {
        setIsLoading(false);

        title.value = "";
        isrc.value = "";
        spotify_streams_total.value = "";
        deezer_reach_total.value = "";
        tiktok_views_total.value = "";
        youtube_video_views_total.value = "";
        stream_income_share.value = "";

        toast.success("New Track Added Successfully");
        handleClose(true);
        dispatch(setReload(true));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      })
      .finally(() => {
        handleClose(true);
        setIsLoading(false);
        title.value = "";
        isrc.value = "";
        spotify_streams_total.value = "";
        deezer_reach_total.value = "";
        tiktok_views_total.value = "";
        youtube_video_views_total.value = "";
        stream_income_share.value = "";
      });
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
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
                  Add New Track
                </span>
              </Box>
              <form
                autoComplete="off"
                onSubmit={onSubmit}
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
                      maxLength={100}
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
                      maxLength={100}
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
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              svg: { color: "#c2c2c2 !important" },
                              input: { color: "#c2c2c2 !important" },
                            }}
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
                      type="number"
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
                      Deezer Reach Total
                    </label>
                    <input
                      className={
                        classess.page__dialog__form__field_container__field__input
                      }
                      name="deezer_reach_total"
                      placeholder="Deezer Reach Total"
                      type="number"
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
                      type="number"
                      min={0}
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
                      type="number"
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
                      min={1}
                      max={100}
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
                      onClick={() => handleClose(false)}
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
}
