import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal"; // Import Modal
import { Button, Tooltip, Typography } from "@mui/material";

const MAX_DISPLAY_GENRES = 2; // Maximum number of genres to display

const GenreGraph = ({ artist }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "199px",
    bgcolor: "#222C41",
    borderRadius: "12px",
    boxShadow: 24,

    // p: 4,
  };
  const [showRemaining, setShowRemaining] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal

  const genres = artist?.genres || [];
  const displayedGenres = showRemaining
    ? genres
    : genres.slice(0, MAX_DISPLAY_GENRES);
  const remainingGenres = genres.slice(MAX_DISPLAY_GENRES); // Remaining genres

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        p={3}
      >
        <Box
          variant="div"
          component="div"
          className={classess.page__banner__conatiner}
        >
          <span
            component="div"
            variant="div"
            className={classess.page__banner__conatiner__fontSize}
          >
            GENRES:
          </span>
          <Grid container>
            <Grid>
              <Box>
                <Stack direction="row" gap={1}>
                  {displayedGenres.map((genre, index) => (
                    <Chip
                      key={index}
                      className={classess.page__banner__conatiner__chip}
                      label={genre}
                      sx={{
                        backgroundColor: "#5A7380",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                    />
                  ))}
                  {remainingGenres.length > 0 && (
                    <Tooltip
                      title="Remaining Genres"
                      placement="top"
                      arrow
                      enterDelay={100}
                    >
                      <Chip
                        className={classess.page__banner__conatiner__chip}
                        label={`+${remainingGenres.length}`}
                        onClick={handleShowModal} // Open modal on click
                        sx={{
                          backgroundColor: "#5A7380",
                          color: "#fff",
                          fontSize: "11px",
                        }}
                      />
                    </Tooltip>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classess.modalCss}>
          <Box className={classess.modalCss__heading}>Genres: </Box>
          <Box sx={{ pt: 3, pl: 3, pr: 3, pb: 1 }}>
            {remainingGenres.map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                sx={{
                  backgroundColor: "#5A7380",
                  color: "#fff",
                  marginBottom: "8px",
                  marginLeft: "5px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              className={classess.modalCss__button}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default GenreGraph;
