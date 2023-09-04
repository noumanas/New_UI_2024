import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import classess from "./style.module.scss";
import { getArtistById } from "../../redux/slice/artist";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import successImage from "../../assets/avatar/loader.svg";
import { myArtistAddBackdropUseStyles } from "../../custom-mui-style/custom-mui-styles";
import Close from "@mui/icons-material/Close";

export default function AddMyArtist({ open, handleClose }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const [submmited, setSubmmited] = useState(false);

  useEffect(() => {
    if (id) {
      initUIData();
    }
  }, [id]);

  const initUIData = () => {
    dispatch(
      getArtistById({
        id,
      })
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!submmited ? (
          <Box className={classess.page}>
            <Close
              sx={{ float: "right", cursor: "pointer" }}
              onClick={handleClose}
            ></Close>
            <Box
              varient="div"
              component="div"
              className={classess.page__toptext}
            >
              <Typography variant="p" sx={{ color: "white", fontSize: "30px" }}>
                Add Artist to
              </Typography>
              <Typography
                variant="p"
                sx={{ color: "#FF64B7", fontSize: "30px", marginLeft: 1 }}
              >
                My Artist List
              </Typography>
            </Box>

            <Box
              variant="div"
              component="div"
              className={classess.page__artistImage}
            >
              <Box
                variant="div"
                component="div"
                className={classess.page__artistImage__innerdetails}
              >
                <Box
                  variant="div"
                  component="div"
                  className={classess.page__artistImage_imagleCircle}
                >
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__artistImage__imagleCircle__inner_cirlcle
                    }
                  >
                    <Avatar
                      src={artist?.avatar}
                      alt=""
                      sx={{ height: 160, width: 160 }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                variant="div"
                component="div"
                className={classess.page__artistImage__artistText}
              >
                <Typography
                  variant="h5"
                  sx={{ fontSize: 28, color: "#4FFCB7", marginBottom: "20px" }}
                >
                  {artist?.name}
                </Typography>

                <Typography
                  variant="p"
                  sx={{ fontSize: "14px", width: 781, marginTop: "10px" }}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo.Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed diam nonumy eirmod tempor incident.
                </Typography>
              </Box>
            </Box>
            <Box
              variant="div"
              component="div"
              className={classess.page__artistImage__btns}
            >
              <Button
                sx={{
                  borderRadius: "8px",
                  background: "#4FFCB7",
                  padding: "23px",
                  color: "white",
                  fontSize: "12px",
                  marginRight: "40px",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  borderRadius: "8px",
                  background: "#EC1086",
                  padding: "23px",
                  color: "white",
                  fontSize: "12px",
                }}
                onClick={() => setSubmmited(true)}
              >
                Add Artist
              </Button>
            </Box>
          </Box>
        ) : (
          <Box className={classess.page}>
            <Close
              sx={{ float: "right", cursor: "pointer" }}
              onClick={handleClose}
            ></Close>
            <Box
              varient="div"
              component="div"
              className={classess.page__loadertext}
            >
              <Typography variant="p" sx={{ color: "white", fontSize: "30px" }}>
                Artist Added Successfully
              </Typography>
            </Box>
            <Box
              variant="div"
              component="div"
              className={classess.page__artistImage}
            >
              <Box
                variant="div"
                component="div"
                className={classess.page__artistImage__innerdetails2}
              >
                <Box
                  variant="div"
                  component="div"
                  className={classess.page__artistImage_imagleCircle}
                >
                  <Box
                    variant="div"
                    component="div"
                    className={
                      classess.page__artistImage__imagleCircle__inner_cirlcle
                    }
                  >
                    <Avatar
                      src={successImage}
                      alt=""
                      sx={{ height: "90%", width: "90%" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  );
}
