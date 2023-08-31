import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import classess from "./style.module.scss";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { config as URLconfig } from "../../../enviorment/enviorment";
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1224,
  bgcolor: '#2F3443',
  border: '2px solid #286397',
  boxShadow: 24,
  p: 4,
  color: '#ffffff'
};

export default function AddTracks({ open, handleClose, spotifyId }) {

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const {
      title,
      isrc,
      release_date,
      spotify_streams_total,
      deezer_reach_total,
      tiktok_views_total,
      youtube_video_views_total,
      stream_income_share
    } = event.target;

    const request = {
      spotify_artist_id: spotifyId,
      title: title.value,
      isrc: isrc.value,
      release_date: release_date.value,
      spotify_streams_total: spotify_streams_total.value,
      deezer_reach_total: deezer_reach_total.value,
      tiktok_views_total: tiktok_views_total.value,
      youtube_video_views_total: youtube_video_views_total.value,
      stream_income_share: stream_income_share.value
    }

    axios.post(`${URLconfig.BASE_URL}/artist-tracks`, request)
      .then(() => {
        setIsLoading(false);
        title.value = "";
        isrc.value = "";
        release_date.value = "";
        spotify_streams_total.value = "";
        deezer_reach_total.value = "";
        tiktok_views_total.value = "";
        youtube_video_views_total.value = "";
        stream_income_share.value = "";
        toast.success("New Track Added Successfully");
        handleClose(true);
      }).catch((error) => {
        setIsLoading(false);
        title.value = "";
        isrc.value = "";
        release_date.value = "";
        spotify_streams_total.value = "";
        deezer_reach_total.value = "";
        tiktok_views_total.value = "";
        youtube_video_views_total.value = "";
        stream_income_share.value = "";
        console.log(`Error: ${error}`);
        handleClose(true);
        toast.error(error);
      })

  }

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box varient="div" component="div" sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add New Track
          </Typography>
          <Box
            varient="div"
            component="div"
            className={classess.page__fieldsContainer}
          >
            <form
              action=""
              className={classess.page__fieldsContainer__form}
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Track Title *
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="title"
                    placeholder="Track Title"
                    type="text"
                    required
                  />
                </Box>
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    ISRC
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="isrc"
                    placeholder="ISRC"
                    type="text"
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Release Date *
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="release_date"
                    type="date"
                    required
                  />
                </Box>
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Spotify Streams Total
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="spotify_streams_total"
                    placeholder="Spotify Streams Total"
                    type="text"                    
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Deezer Reach Total
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="deezer_reach_total"
                    placeholder="Deezer Reach Total"                    
                  />
                </Box>
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    TikTok Views Total
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="tiktok_views_total"
                    placeholder="TikTok Views Total"
                    type="text"                    
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  gap: { xs: 3, sm: 8, lg: 15 },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Youtube Views Total *
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="youtube_video_views_total"
                    placeholder="Youtube Views Total"                    
                  />
                </Box>
                <Box
                  varient="div" component="div"
                  className={classess.page__fieldsContainer__form__formfield}
                  sx={{ width: "100%" }}
                >
                  <label
                    className={
                      classess.page__fieldsContainer__form__formfield__label
                    }
                  >
                    Income Share(%)
                  </label>
                  <input
                    className={
                      classess.page__fieldsContainer__form__formfield__input
                    }
                    name="stream_income_share"
                    placeholder="Income Share(%)"
                    type="number"
                    min={0}
                    max={100}
                    required
                  />
                </Box>
              </Stack>
              <Box className={classess.page__fieldsContainer__form__action}>
                <Button
                  variant="contained"
                  type="button"
                  sx={{ width: { xs: "100%", sm: "100%", lg: "20%" } }}
                  className={classess.page__fieldsContainer__form__action__cancel}
                  onClick={() => handleClose(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: { xs: "100%", sm: "100%", lg: "20%" } }}
                  className={classess.page__fieldsContainer__form__action__submit}
                  disabled={isLoading}
                >
                  {isLoading && (<CircularProgress size={25} color="inherit" />)}
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
