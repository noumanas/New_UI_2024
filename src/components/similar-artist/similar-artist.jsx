import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { addArtist } from "../../redux/slice/artist";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SimilarArtist = ({ similarArtist }) => {
  const [selected, setSelected] = useState(null);
  const [AConfirm, setAConfirm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = (artist) => {
    setSelected(artist);
    setOpen(true);
  };

  const BeforeHandler = () => {
    setIsLoading(true);

    const payload = {
      artist: {
        name: selected?.name,
        spotify_id: selected?.similar_artist_id,
        avatar: selected?.image,
        genres: selected?.genres,
      },
    };
    let response = dispatch(
      addArtist({
        data: payload,
      })
    );

    response
      .then(async (res) => {
        if (res.payload.message === "artist created") {
          toast.message("New Artist Adding");
        }
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/blig/my-artist");
      });
  };

  const AfterHandler = () => {
    setAConfirm(true);
    navigate("/blig/my-artist");
  };

  const handleClose = () => {
    setOpen(false);
    setAConfirm(true);
    setSelected(null);
  };

  return (
    <>
      <Box component="div" varient="div" className={classess.page}>
        <Box component="div" varient="div" className={classess.page__header}>
          <Box
            component="div"
            varient="div"
            className={classess.page__header__title}
          >
            Similar Artists
          </Box>
        </Box>
        <Box component="div" varient="div" className={classess.page__list}>
          {similarArtist && similarArtist.length ? (
            <ImageList className={classess.abc}>
              {similarArtist.slice(0, 19).map((artist, idx) => (
                <ImageListItem
                  key={idx}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px",
                    margin: "0px 20px",
                    backgroundColor: "#192233",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Box
                    component="div"
                    varient="div"
                    className={classess.page__list__wrapper}
                  >
                    <Box className={classess.page__list__wrapper__controls}>
                      {artist.status === true ? (
                        <Link
                          to={`/blig/view-artist/${artist?.ref_artist_id}`}
                          style={{ color: "#FFF", textDecoration: "none" }}
                        >
                          <Box
                            className={
                              classess.page__list__wrapper__controls__view
                            }
                          >
                            <RemoveRedEyeOutlinedIcon sx={{ fontSize: 15 }} />
                            &nbsp;View
                          </Box>
                        </Link>
                      ) : (
                        <Box
                          className={
                            classess.page__list__wrapper__controls__add
                          }
                          onClick={() => handleOpen(artist)}
                        >
                          <PersonAddAltIcon sx={{ fontSize: 15 }} />
                          &nbsp;Add
                        </Box>
                      )}
                    </Box>

                    <Avatar
                      className={classess.page__list__ul__li__image}
                      src={artist?.image}
                      alt={artist?.name}
                      sx={{ width: "80px", height: "80px" }}
                    />
                  </Box>

                  <Box
                    component="div"
                    varient="div"
                    className={classess.page__list__ul__li__content}
                  >
                    <span
                      className={classess.page__list__ul__li__content__name}
                    >
                      {artist?.name}
                    </span>

                    <span
                      className={classess.page__list__ul__li__content__listners}
                    >
                      {artist?.followers} <span>listeners</span>
                    </span>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Box
              component="div"
              varient="div"
              className={classess.page__list__loader}
            >
              <CircularProgress size={40} color="secondary" />
            </Box>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            keepMounted
          >
            {AConfirm && AConfirm ? (
              <Box className={classess.modalbox}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add selected artist to list?
                </Typography>

                <Grid
                  container
                  className={classess.modalbox__artistbox}
                  mt={2}
                  mb={2}
                >
                  <Grid className={classess.modalbox__artistbox__image}>
                    <Avatar
                      className={classess.page__list__ul__li__image}
                      sx={{ width: "80px", height: "80px" }}
                      src={selected?.image}
                    />
                  </Grid>
                  <Grid className={classess.modalbox__artistbox__title}>
                    <span>{selected?.name}</span>
                  </Grid>
                </Grid>
                {isLoading ? (
                  <Stack direction="row" justifyContent="center" spacing={2}>
                    <CircularProgress size={40} color="secondary" />
                  </Stack>
                ) : (
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button
                      variant="contained"
                      type="button"
                      size="large"
                      onClick={BeforeHandler}
                      sx={{
                        backgroundColor: "#00CD98",
                        color: "#000",
                        borderRadius: "12px",
                        "&:hover": { backgroundColor: "#00CD98" },
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="error"
                      size="large"
                      sx={{
                        backgroundColor: "transparent",
                        borderWidth: "1px",
                        borderColor: "#FF0000",
                        borderStyle: "solid",
                        color: "#FF0000",
                        borderRadius: "12px",
                        "&:hover": { color: "#000" },
                      }}
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </Button>
                  </Stack>
                )}
              </Box>
            ) : (
              <Box className={classess.modalbox}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon
                    sx={{ fontSize: 30, marginRight: "5px", color: "#00CD98" }}
                  />
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="span"
                  >
                    Artist successfully added!
                  </Typography>
                </Box>

                <Grid
                  container
                  className={classess.modalbox__artistboxx}
                  mt={2}
                  mb={2}
                >
                  <Grid className={classess.modalbox__artistboxx__image}>
                    <Avatar
                      className={classess.page__list__ul__li__image}
                      sx={{ width: "80px", height: "80px" }}
                      src={selected?.image}
                    />
                  </Grid>
                  <Grid className={classess.modalbox__artistboxx__title}>
                    <Typography variant="h5" component="h2">
                      {selected?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button
                    variant="contained"
                    type="button"
                    size="large"
                    sx={{ width: "100%", backgroundColor: "#1976d2" }}
                    onClick={() => AfterHandler()}
                  >
                    Take me to my Artist Page{" "}
                    <ArrowForwardIcon
                      sx={{ fontSize: 20, marginLeft: "6px" }}
                    />
                  </Button>
                </Stack>
              </Box>
            )}
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default SimilarArtist;
