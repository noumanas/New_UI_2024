import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArtist,
  emptySingularArtist,
  getArtist,
} from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { scrollTopObserver, tableSortingAlgo } from "../../utils/helper";
import DeleteConformationDialog from "../../dialogs/delete-conformation-dialog/delete-conformation-dialog";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

const MyArtistCard = ({ selectedView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artist = useSelector((state) => state.artist.artists);
  const artistApiStatus = useSelector((state) => state.artist.status);
  const [artistList, setArtistList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArtistToDelete, setSelectedArtistToDelete] = useState({});
  const [sliceContent, setSliceContent] = useState(6);

  const initUIData = () => {
    dispatch(getArtist());
  };

  const deleteArtistByID = (id) => {
    dispatch(
      deleteArtist({
        id,
      })
    );
    initUIData();
  };

  const loadMoreArtist = () => {
    let checkExceeding = sliceContent + 3;
    if (checkExceeding <= artist.length) {
      setSliceContent(checkExceeding);
    } else {
      let diff = checkExceeding - artist.length;
      checkExceeding -= diff;
      setSliceContent(checkExceeding);
    }
  };

  useEffect(() => {
    initUIData();
  }, []); // eslint-disable-next-line

  useEffect(() => {
    if (artist && artist.length) {
      setArtistList(artist);
    }
  }, [artist]); // eslint-disable-next-line

  useEffect(() => {
    if (selectedView === "list") {
      setSliceContent(6);
    }
  }, [selectedView]); // eslint-disable-next-line

  const getEmail = (email, name) => {
    if (email) {
      return email;
    }
    const newName = name.replace(/\s+/, "");
    return `${newName}@spotify.com`;
  };

  const handleOpenDeleteDialog = (artist) => {
    setSelectedArtistToDelete(artist);
    setOpen(true);
  };
  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      deleteArtistByID(selectedArtistToDelete?._id);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value && value.length >= 3) {
      const target = artist.filter((e) =>
        e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      const newList = tableSortingAlgo(target, "name");
      setArtistList(newList);
    } else {
      setArtistList(artist);
    }
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__statusBar}>
        {/* <Typography
          variant="h5"
          gutterBottom
          component="div"
          className={classess.page__statusBar__title}
        >
          All Artists
        </Typography> */}
        <Box
          varient="div"
          component="div"
          className={classess.page__actionBar}
          sx={{ position: "relative" }}
        >
          <input
            className={classess.page__actionBar__search}
            placeholder="Search..."
            type="search"
            onInput={(e) => handleSearch(e)}
            required
          />
          <SearchIcon
            sx={{
              color: "white",
              position: "absolute",
              top: "20px",
              right: "13px",
            }}
          />
        </Box>
        <Button
          variant="contained"
          className={classess.page__statusBar__action}
          onClick={() => {
            navigate("/blig/add-artist");
            scrollTopObserver();
          }}
        >
          + Add New
        </Button>
      </Box>
      {/* <Box varient="div" component="div" className={classess.page__actionBar}>
        <input
          className={classess.page__actionBar__search}
          placeholder="Search..."
          type="text"
          required
        />
      </Box> */}
      {artistList && artistList.length ? (
        <>
          <Box className={classess.page__card_container}>
            <Box
              varient="div"
              component="div"
              className={classess.page__card_container__card_box}
            >
              {artistList.slice(0, sliceContent).map((artist, idx) => (
                <Box
                  key={idx}
                  varient="div"
                  component="div"
                  className={classess.page__card_container__card_box__card}
                >
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__card_container__card_box__card__main
                    }
                  >
                    <Avatar
                      className={
                        classess.page__card_container__card_box__card__main__avatar
                      }
                      src={artist?.avatar}
                      alt={artist?.name}
                    />
                    <Typography
                      className={
                        classess.page__card_container__card_box__card__main__title
                      }
                      onClick={() => {
                        navigate(`/blig/view-artist/${artist?._id}`);
                        scrollTopObserver();
                      }}
                    >
                      {artist?.name}
                    </Typography>
                    <Typography
                      className={
                        classess.page__card_container__card_box__card__main__subtitle
                      }
                    >
                      {getEmail(artist?.email, artist?.name)}
                    </Typography>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__card_container__card_box__card__action
                    }
                  >
                    <Stack
                      spacing={4}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        style={{ backgroundColor: "#4FFCB7" }}
                        // onClick={() => {
                        //   navigate(`/blig/view-artist/${row?._id}`);
                        //   scrollTopObserver();
                        // }}
                      >
                        <VisibilityIcon
                          style={{ color: "#000" }}
                          className={classess.page__table__row__icon}
                        />
                      </IconButton>

                      <IconButton
                        style={{ backgroundColor: "#4092FC" }}
                        // onClick={() => {
                        //   dispatch(emptySingularArtist());
                        //   navigate(`/blig/edit-artist/${row?._id}`);
                        //   scrollTopObserver();
                        // }}
                      >
                        <EditIcon
                          style={{ color: "#000" }}
                          className={classess.page__table__row__icon}
                        />
                      </IconButton>

                      <IconButton
                        style={{ backgroundColor: "#F95F5F" }}
                        // onClick={() => handleOpenDeleteDialog(row)}
                      >
                        <DeleteIcon
                          style={{ color: "#000" }}
                          className={classess.page__table__row__icon}
                        />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className={classess.page__card_container__action}>
              {sliceContent < artist.length && (
                <button
                  className={classess.page__card_container__action__btn}
                  onClick={loadMoreArtist}
                >
                  Load More
                </button>
              )}
            </Box>
          </Box>
        </>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "loading" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            Waiting for the Response...
          </Typography>
        </Box>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "succeeded" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            No Artist Found.
          </Typography>
        </Box>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "failed" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#d6d6d6" }}
          >
            Error Cannot Load Artist.
          </Typography>
        </Box>
      ) : (
        <></>
      )}
      <DeleteConformationDialog
        onClose={handleCloseDeleteDialog}
        open={open}
        artist={selectedArtistToDelete}
      />
    </Box>
  );
};

export default MyArtistCard;
