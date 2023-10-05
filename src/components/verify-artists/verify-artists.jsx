import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setReload,
  setSearchResultTracks,
  setSelectedTrackCount,
  setSelectedTracks,
  setShowSelectedTracksFunding,
  setTotalTracks,
  setTracks,
} from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { RxCross2 } from "react-icons/rx";

// import DeleteIcon from "@mui/icons-material/Clear";
import axios from "axios";
import Slider from "../view-funding-dashboard-items/verify/slider/slider";
import Grid from "@mui/material/Grid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TablePagination from "@mui/material/TablePagination";
import DeleteTrackDialog from "../../dialogs/delete-track-dialog/delete-track-dialog";
import PlaceHolderImage from "../../placeholder.png";
import { abbreviateNumber } from "../../utils/helper";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";
// import { muiTableCellUseStylesforBorderRedius } from "../../custom-mui-style/custom-mui-styles";
import { config as URLconfig } from "../../enviorment/enviorment";
import { IconButton, Skeleton, Tooltip } from "@mui/material";
import { openModal } from "../../redux/slice/modal";
import { toast } from "react-toastify";
import { getItemToLocalStorage } from "../../services/storage";
import { RiDeleteBin2Fill } from "react-icons/ri";
// import { makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import PencilIcon from "../../assets/buttonsicons/EditIcon.png";
import DeleteIcon from "../../assets/buttonsicons/DeleteIcon.png";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "#192233",
//     width: "100px",
//     border: "none",
//     borderRadius: "10px",
//   },
// }));
export default function BasicTable({
  included_music,
  contract_length,
  catelog_income,
  new_music_income,
  calcalute_tracks_estimate,
  calcalute_Year_income_by_tracks,
  searchTracks,
}) {
  const cellUseStyles = muiTableCellUseStyles();
  // const cellUseStyles2 = muiTableCellUseStylesforBorderRedius();

  const dispatch = useDispatch();
  const dispatchref = useRef(dispatch);
  const artist = useSelector((state) => state.artist.artist);
  const tracks = useSelector((state) => state.artist.tracks);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const newMusicTracks = useSelector((state) => state.artist.newMusicTracks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const showSelectedTracksFunding = useSelector(
    (state) => state.artist.showSelectedTracksFunding
  );
  const [open, setOpen] = useState(false);
  const [selectedTrackToDelete, setSelectedTrackToDelete] = useState({});
  const reload = useSelector((state) => state.artist.reload);
  // const classes = useStyles();
  useEffect(() => {
    dispatchref.current(setSelectedTrackCount(selected.length));
    dispatchref.current(setSelectedTracks(selected));
    getArtistFunding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, dispatchref]);

  useEffect(() => {
    if (tracks.length && reload) {
      getArtistFunding();
      dispatchref.current(setReload(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks, reload, dispatchref]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (id) => selected.includes(id);

  const handleSelectAllClick = (event) => {
    dispatch(setIsLoading(true));

    if (event.target.checked) {
      const newSelected = tracks.map((n) => n.id);
      dispatch(setSelectedTracks(newSelected));
      getArtistFunding();
      return;
    }

    dispatch(setSelectedTracks([]));
  };

  const handleSingleSelect = (id) => {
    dispatch(setIsLoading(true));

    if (isSelected(id)) {
      console.log("unselected: ", id);
      dispatch(setSelectedTracks(selected.filter((ids) => ids !== id)));
    } else {
      console.log("selected: ", id);
      dispatch(setSelectedTracks([...selected, id]));
    }
  };

  const onChangeHandler = async (track_id, stream_income_share) => {
    let update_tracks = tracks.map((elem) => {
      if (elem.id === track_id) {
        return {
          ...elem,
          stream_income_share,
        };
      }
      return elem;
    });
    dispatch(setTracks(update_tracks));

    let update_search_tracks = searchTracks.map((elem) => {
      if (elem.id === track_id) {
        return {
          ...elem,
          stream_income_share,
        };
      }
      return elem;
    });

    dispatch(setSearchResultTracks(update_search_tracks));

    dispatch(setReload(true));

    const payload = {
      stream_income_share,
    };

    let endpoint = `${URLconfig.BASE_URL}/artist-tracks/${track_id}/stream-income-share`;

    const token = getItemToLocalStorage("accessToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios.put(endpoint, payload, config).then(() => {
      console.log("success");
    });
  };

  function getSingleTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  const getArtistFunding = async () => {
    const selected_tracks =
      selected.length > 0
        ? selected.map((e) => getSingleTrack(e))
        : showSelectedTracksFunding
        ? tracks
            .filter((track) => track.is_selected === 1)
            .map((checkedtracks) => checkedtracks)
        : tracks;
    const ids = selected_tracks.map((item) => item.id);

    const new_music = newMusicTracks.map((e) => getSingleTrack(e));

    dispatch(setShowSelectedTracksFunding(false));

    const val = {
      included_music,
      contract_length,
      catelog_income,
      new_music_income,
      selected_tracks: selected_tracks,
      new_music_tracks: new_music,
    };
    const data_for_year = {
      tracksId: ids,
    };
    calcalute_Year_income_by_tracks(data_for_year);

    calcalute_tracks_estimate(val);
  };

  const handleOpenDeleteDialog = (track) => {
    setSelectedTrackToDelete(track);
    setOpen(true);
  };

  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      deleteTrack(selectedTrackToDelete?.id);
    }
  };

  const deleteTrack = async (trackId) => {
    let filter_tracks = tracks.filter((el) => el.id !== trackId);
    dispatch(setTracks(filter_tracks));
    dispatch(setTotalTracks(filter_tracks.length));

    let filter_selected_tracks = selected.filter((ids) => ids !== trackId);
    dispatch(setSelectedTracks(filter_selected_tracks));
    dispatch(setSelectedTrackCount(filter_selected_tracks.length));
    dispatch(setReload(true));

    const token = getItemToLocalStorage("accessToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${URLconfig.BASE_URL}/artist-tracks/${trackId}`, config)
      .then(() => {
        toast.success("Track has been deleted");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [remainingGenres, setRemainingGenres] = useState([]);
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
  };
  const status = useSelector((state) => state.artist.status);

  return (
    <>
      <Paper className={classess.paperTable}>
        {artist && Object.keys(artist).length ? (
          <TableContainer className={classess.table}>
            <Table
              stickyHeader={true}
              aria-label="sticky table"
              // sx={{
              //   backgroundColor: "red",
              // }}
            >
              <TableHead
              // sx={{
              //   backgroundColor: "#222C41",
              // }}
              >
                <TableRow>
                  <TableCell padding="checkbox" className={classess.table__col}>
                    <Checkbox
                      // disabled={isLoading}
                      // sx={{
                      //   svg: {
                      //     color: "#4ffcb7",
                      //   },
                      // }}
                      className={classess.table__col__checkBox}
                      indeterminate={
                        selected.length > 0 && selected.length < tracks.length
                      }
                      checked={
                        tracks.length > 0 && selected.length === tracks.length
                      }
                      onClick={handleSelectAllClick}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    className={classess.table__col}
                    sx={{ maxWidth: 50 }}
                  >
                    {/* # */}
                  </TableCell>
                  <TableCell
                    className={`${classess.table__col} ${classess.table__col__topTracks}`}
                  >
                    title
                  </TableCell>

                  <TableCell className={classess.table__col}>
                    Growth Rate
                  </TableCell>

                  <TableCell className={classess.table__col}>
                    Share of Streaming Income
                  </TableCell>

                  <TableCell className={classess.table__col}>Genres</TableCell>
                  <TableCell
                    className={classess.table__col}
                    style={{ width: "10%" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* search tracks for look via map */}
                {searchTracks.map((row, index) => {
                  const isItemSelected = isSelected(row?.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <>
                      <Box sx={{ m: "1rem" }}></Box>
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        className={`${classess.table__row} ${cellUseStyles.row}`}
                      >
                        <TableCell
                          padding="checkbox"
                          sx={{
                            borderTopLeftRadius: "12px",
                            borderEndStartRadius: "12px",
                          }}
                        >
                          <Checkbox
                            // sx={{
                            //   svg: {
                            //     color: "#4ffcb7",
                            //   },
                            // }}
                            className={classess.table__row__checkBox}
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={() => handleSingleSelect(row.id)}
                          />
                        </TableCell>
                        <TableCell
                          className={classess.table__row}
                          sx={{
                            maxWidth: "40px",
                          }}
                        >
                          <div>
                            {status === "succeeded" ? (
                              <div className={classess}>
                                <Avatar
                                  src={row?.image}
                                  alt={row?.image}
                                  sx={{ width: "40px", height: "40px" }}
                                  className={classess.avatar}
                                />
                                {/* Online status indicator */}
                              </div>
                            ) : (
                              <Skeleton
                                variant="circular"
                                width={40}
                                height={40}
                                sx={{ backgroundColor: "gray" }}
                                // className={classess.skeleton}
                              />
                            )}
                          </div>
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          <Tooltip
                            title={row?.title}
                            key={index}
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "block",
                                width: "200px",
                                marginLeft: "10px",
                              }}
                            >
                              {row?.title}
                            </span>
                            {/* {row.title &&
                                  typeof row.title === "string" &&
                                  row.title.split(" ").slice(0, 5).join(" ")} */}
                          </Tooltip>
                        </TableCell>
                        <TableCell className={classess.table__row}>
                          <div
                            style={{ display: "flex", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                openModal({
                                  name: "track-chart",
                                  data: row,
                                })
                              )
                            }
                          >
                            {row?.last_streams_growth && (
                              <span
                                className={
                                  row?.last_streams_growth?.growth_rate > 0
                                    ? classess.table__row__green
                                    : classess.table__row__red
                                }
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyItems: "center",
                                    gap: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  <span>
                                    {row?.last_streams_growth?.growth_rate >
                                    0 ? (
                                      <TrendingUpIcon fontSize="16" />
                                    ) : (
                                      <TrendingDownIcon fontSize="16" />
                                    )}
                                  </span>
                                  <span
                                    style={{
                                      marginLeft: "2px",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {row?.last_streams_growth?.growth_rate}%
                                  </span>
                                </div>
                              </span>
                            )}
                            <span
                              style={{
                                marginLeft: "5px",
                                fontSize: "16px",
                              }}
                            >
                              {abbreviateNumber(
                                row.last_streams_growth?.last_month
                              )}
                            </span>
                          </div>
                          {/* <div
                            style={{ display: "flex", cursor: "pointer" }}
                            onClick={() =>
                              dispatch(
                                openModal({
                                  name: "track-chart",
                                  data: row,
                                })
                              )
                            }
                          >
                            {row?.last_streams_growth && (
                              <span
                                className={
                                  row?.last_streams_growth?.growth_rate > 0
                                    ? classess.table__row__green
                                    : classess.table__row__red
                                }
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignContent: "center",
                                    justifyItems: "center",
                                    fontSize: "12px",
                                  }}
                                >
                                  <span>
                                    {row?.last_streams_growth?.growth_rate >
                                    0 ? (
                                      <TrendingUpIcon fontSize='12' />
                                    ) : (
                                      <TrendingDownIcon fontSize='12' />
                                    )}
                                  </span>
                                  <span style={{ marginLeft: "2px" }}>
                                    {row?.last_streams_growth?.growth_rate}%
                                  </span>
                                </div>
                              </span>
                            )}
                            <span style={{ marginLeft: "5px" }}>
                              {abbreviateNumber(
                                row.last_streams_growth?.last_month
                              )}
                            </span>
                          </div> */}
                        </TableCell>
                        <TableCell className={classess.table__row}>
                          <Slider onChangeHandler={onChangeHandler} row={row} />
                        </TableCell>
                        <TableCell className={classess.table__row}>
                          <Box className={classess.table__row__genre}>
                            {row.genres
                              ? row.genres
                                  .split(",")
                                  .slice(0, 2)
                                  .map((genre, index) => (
                                    <React.Fragment key={index}>
                                      {index > 0 && "  "}
                                      <Chip
                                        label={genre.trim()}
                                        size="small"
                                        className={
                                          classess.table__row__genre__chip
                                        }
                                      />
                                    </React.Fragment>
                                  ))
                              : ""}
                            {row.genres && row.genres.split(",").length > 2 && (
                              <React.Fragment>
                                <Chip
                                  label={`+${row.genres.split(",").length - 2}`}
                                  size="small"
                                  className={classess.table__row__genre__chip}
                                  onClick={() => {
                                    const remaining = row.genres
                                      .split(",")
                                      .slice(2)
                                      .map((genre) => genre.trim());
                                    setRemainingGenres(remaining);
                                    setModalOpen(true);
                                  }}
                                  style={{ cursor: "pointer" }}
                                />
                              </React.Fragment>
                            )}
                            <Modal
                              open={modalOpen}
                              onClose={() => setModalOpen(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style} className={classess.modalCss}>
                                <Box className={classess.modalCss__heading}>
                                  Genres{" "}
                                </Box>
                                <Box
                                  sx={{
                                    pt: 3,
                                    pl: 3,
                                    pr: 3,
                                    pb: 1,
                                    color: "white",
                                    fontSize: "14px",
                                    textAlign: "center",
                                  }}
                                >
                                  {remainingGenres.map((genre, index) => (
                                    <Chip
                                      key={index}
                                      label={genre}
                                      size="small"
                                      sx={{
                                        backgroundColor: "#5A7380",
                                        color: "white",
                                        fontSize: "12px",
                                      }}
                                      // className={
                                      //   classess.table__row__genre__chip
                                      // }
                                      style={{ marginBottom: "5px" }}
                                    />
                                  ))}
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 6,
                                  }}
                                >
                                  <Button
                                    className={classess.modalCss__button}
                                    onClick={() => setModalOpen(false)}
                                  >
                                    Close
                                  </Button>
                                </Box>
                              </Box>
                            </Modal>
                          </Box>
                        </TableCell>
                        <TableCell
                          className={classess.table__row}
                          sx={{
                            borderTopRightRadius: "12px",
                            borderEndEndRadius: "12px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            <IconButton
                              className={classess.actionEdit}
                              onClick={() =>
                                dispatch(
                                  openModal({
                                    name: "edit-track",
                                    data: row,
                                  })
                                )
                              }
                            >
                              <img
                                src={PencilIcon}
                                alt="Eye"
                                style={{ height: "16px", width: "15.98px" }}
                              />
                              {/* <EditIcon sx={{ fontSize: "20px" }} /> */}
                            </IconButton>
                            <IconButton
                              className={classess.actionDelete}
                              onClick={() => handleOpenDeleteDialog(row)}
                            >
                              <img
                                src={DeleteIcon}
                                alt="Eye"
                                style={{ height: "16px", width: "16px" }}
                              />
                              {/* <RiDeleteBin2Fill sx={{ fontSize: "20px" }} /> */}
                            </IconButton>
                          </Box>
                          {/* <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 1, md: 3 }}
                            >
                              <Grid item xs={6}>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      openModal({
                                        name: "edit-track",
                                        data: row,
                                      })
                                    )
                                  }
                                  style={{
                                    backgroundColor: "#4FFCB7",
                                    color: "#222C41",
                                  }}
                                >
                                  <EditIcon style={{ color: "#2F3443" }} />
                                </IconButton>
                              </Grid>
                              <Grid item xs={6}>
                                <IconButton
                                  onClick={() => handleOpenDeleteDialog(row)}
                                  style={{ backgroundColor: "#F95F5F" }}
                                >
                                  <RiDeleteBin2Fill
                                    style={{ color: "#222C41" }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid> */}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}

                {/* if artist tracks 0 in the search, then loop the all tracks */}
                {searchTracks.length < 1 &&
                  tracks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row?.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <>
                          <Box sx={{ m: "1rem" }}></Box>
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                                maxHeight: "300px",
                              },
                            }}
                            // className={cellUseStyles.row}
                            className={`${classess.table__row} ${cellUseStyles.row}`}
                          >
                            <TableCell
                              padding="checkbox"
                              sx={{
                                borderTopLeftRadius: "12px",
                                borderEndStartRadius: "12px",
                                width: "50px",
                              }}
                            >
                              <Checkbox
                                // sx={{
                                //   svg: {
                                //     color: "#4ffcb7",
                                //   },
                                // }}
                                className={classess.table__row__checkBox}
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                onClick={() => handleSingleSelect(row.id)}
                              />
                            </TableCell>
                            <TableCell
                              className={classess.table__row}
                              sx={{ maxWidth: "50px" }}
                            >
                              <div>
                                {status === "succeeded" ? (
                                  <div className={classess}>
                                    <Avatar
                                      src={row?.image}
                                      alt={row?.image}
                                      sx={{ width: "45px", height: "45px" }}
                                      className={classess.avatar}
                                    />
                                    {/* Online status indicator */}
                                  </div>
                                ) : (
                                  <Skeleton
                                    variant="circular"
                                    width={45}
                                    height={45}
                                    sx={{ backgroundColor: "gray" }}
                                    // className={classess.skeleton}
                                  />
                                )}
                              </div>
                            </TableCell>

                            <TableCell
                              className={classess.table__row}
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              <Tooltip
                                title={row?.title}
                                key={index}
                                placement="top"
                                arrow
                                enterDelay={100}
                              >
                                <span
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "block",
                                    width: "200px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {row?.title}
                                </span>
                              </Tooltip>
                            </TableCell>
                            <TableCell className={classess.table__row}>
                              <div
                                style={{ display: "flex", cursor: "pointer" }}
                                onClick={() =>
                                  dispatch(
                                    openModal({
                                      name: "track-chart",
                                      data: row,
                                    })
                                  )
                                }
                              >
                                {row?.last_streams_growth && (
                                  <span
                                    className={
                                      row?.last_streams_growth?.growth_rate > 0
                                        ? classess.table__row__green
                                        : classess.table__row__red
                                    }
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyItems: "center",
                                        gap: "5px",
                                        fontSize: "16px",
                                      }}
                                    >
                                      <span>
                                        {row?.last_streams_growth?.growth_rate >
                                        0 ? (
                                          <TrendingUpIcon fontSize="16" />
                                        ) : (
                                          <TrendingDownIcon fontSize="16" />
                                        )}
                                      </span>
                                      <span
                                        style={{
                                          marginLeft: "2px",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {row?.last_streams_growth?.growth_rate}%
                                      </span>
                                    </div>
                                  </span>
                                )}
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {abbreviateNumber(
                                    row.last_streams_growth?.last_month
                                  )}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className={classess.table__row}>
                              <Slider
                                onChangeHandler={onChangeHandler}
                                row={row}
                              />
                            </TableCell>
                            <TableCell className={classess.table__row}>
                              <Box className={classess.table__row__genre}>
                                {row.genres
                                  ? row.genres
                                      .split(",")
                                      .slice(0, 2)
                                      .map((genre, index) => (
                                        <React.Fragment key={index}>
                                          {index > 0 && "  "}
                                          <Tooltip
                                            title={genre}
                                            placement="top"
                                            arrow
                                            enterDelay={100}
                                          >
                                            <Chip
                                              label={
                                                genre.length > 12
                                                  ? `${genre.slice(0, 12)}...`
                                                  : genre
                                              }
                                              size="small"
                                              className={
                                                classess.table__row__genre__chip
                                              }
                                            />
                                          </Tooltip>
                                        </React.Fragment>
                                      ))
                                  : ""}
                                {row.genres &&
                                  row.genres.split(",").length > 2 && (
                                    <React.Fragment>
                                      <Tooltip
                                        title="Remaining Genres"
                                        placement="top"
                                        arrow
                                        enterDelay={100}
                                      >
                                        <Chip
                                          label={`+${
                                            row.genres.split(",").length
                                          }`}
                                          size="small"
                                          className={
                                            classess.table__row__genre__chip
                                          }
                                          onClick={() => {
                                            const remaining = row.genres
                                              .split(",")
                                              .map((genre) => genre.trim());
                                            setRemainingGenres(remaining);
                                            setModalOpen(true);
                                          }}
                                          style={{ cursor: "pointer" }}
                                        />
                                      </Tooltip>
                                    </React.Fragment>
                                  )}
                              </Box>
                            </TableCell>
                            <TableCell
                              className={classess.table__row}
                              sx={{
                                borderTopRightRadius: "12px",
                                borderEndEndRadius: "12px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                <Tooltip
                                  title="Edit Track"
                                  placement="top"
                                  arrow
                                  enterDelay={100}
                                >
                                  <IconButton
                                    className={classess.actionEdit}
                                    onClick={() =>
                                      dispatch(
                                        openModal({
                                          name: "edit-track",
                                          data: row,
                                        })
                                      )
                                    }
                                  >
                                    <img
                                      src={PencilIcon}
                                      alt="Eye"
                                      style={{
                                        height: "16px",
                                        width: "15.98px",
                                      }}
                                    />
                                    {/* <EditIcon
                                      sx={{ fontSize: "20px" }}
                                      className={classess.pencilIcon}
                                    /> */}
                                  </IconButton>
                                </Tooltip>

                                <Tooltip
                                  title="Delete Track"
                                  placement="top"
                                  arrow
                                  enterDelay={100}
                                >
                                  <IconButton
                                    className={classess.actionDelete}
                                    onClick={() => handleOpenDeleteDialog(row)}
                                  >
                                    <img
                                      src={DeleteIcon}
                                      alt="Eye"
                                      style={{ height: "16px", width: "16px" }}
                                    />
                                    {/* <RiDeleteBin2Fill
                                      sx={{ fontSize: "20px" }}
                                    /> */}
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              {/* <Grid
                                  container
                                  rowSpacing={1}
                                  columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                                >
                                  <Grid item xs={6}>
                                    <IconButton
                                      onClick={() =>
                                        dispatch(
                                          openModal({
                                            name: "edit-track",
                                            data: row,
                                          })
                                        )
                                      }
                                      className={
                                        classess.table__row__editbutton
                                      }
                                      style={{
                                        backgroundColor: "#4FFCB7",
                                        color: "#222C41",
                                      }}
                                    >
                                      <EditIcon
                                        style={{
                                          color: "#2F3443",
                                        }}
                                      />
                                    </IconButton>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <IconButton
                                      onClick={() =>
                                        handleOpenDeleteDialog(row)
                                      }
                                      className={
                                        classess.table__row__editbutton
                                      }
                                      style={{ backgroundColor: "#F95F5F" }}
                                    >
                                      <RiDeleteBin2Line
                                        style={{
                                          color: "#222C41",
                                        }}
                                      />
                                    </IconButton>
                                  </Grid>
                                </Grid> */}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
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
        )}

        {/* Show only, all tracks */}
        {searchTracks.length < 1 ? (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            sx={{ color: "#d6d6d6" }}
            count={tracks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              actions: "custom-pagination-actions",
              select: "custom-pagination-select",
              displayedRows: "custom-select-style",
              selectLabel: "custom-select-style",
            }}
            SelectProps={{
              classes: {
                select: "custom-select", // Apply the custom-select class to the Select component
              },
            }}
          />
        ) : null}

        <DeleteTrackDialog
          onClose={handleCloseDeleteDialog}
          open={open}
          track={selectedTrackToDelete}
        />
      </Paper>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classess.modalCss}>
          <Box className={classess.modalCss__heading}>
            Genres
            <Box className={classess.modalCss__heading__icon}>
              <IconButton
                className={classess.modalCss__heading__icon__inner}
                onClick={() => setModalOpen(false)}
              >
                <RxCross2 />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              backgroundColor: "#222C41",
              borderRadius: "12px",
            }}
          >
            {remainingGenres.map((genre, index) => (
              <>
                <Chip
                  key={index}
                  label={genre}
                  sx={{
                    backgroundColor: "#5A7380",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                  style={{ marginBottom: "5px" }}
                />
              </>
            ))}
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Button
              className={classess.modalCss__button}
              onClick={() => setModalOpen(false)}
            >
              Close
            </Button>
          </Box> */}
        </Box>
      </Modal>
    </>
  );
}
