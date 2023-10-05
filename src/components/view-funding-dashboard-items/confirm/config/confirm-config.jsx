import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { muiTableCellUseStyles } from "../../../../custom-mui-style/custom-mui-styles";
import classess from "./style.module.scss";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PlaceHolderImage from "../../../../placeholder.png";
import {
  makeEmptySearchResultTracks,
  setIsLoading,
  setSearchResultTracks,
  setNewMusicTracks,
  setShowSelectedTracksFunding,
} from "../../../../redux/slice/artist";
import TablePagination from "@mui/material/TablePagination";
import { config as URLconfig } from "../../../../enviorment/enviorment";
import axios from "axios";
import NewMusic from "../../../new-music/new-music";
import SearchIcon from "@mui/icons-material/Search";
import { getItemToLocalStorage } from "../../../../services/storage";
import { Tooltip } from "@mui/material";

const ConfirmConfig = ({
  included_music,
  contract_length,
  catelog_income,
  new_music_income,
  calcalute_tracks_estimate,
  set_new_music_income,
  artist_id,
  openNewMusicForm,
  closeNewMusicForm,
  openTrackes,
}) => {
  const cellUseStyles = muiTableCellUseStyles();
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.artist.artist);
  const tracks = useSelector((state) => state.artist.tracks);
  const newMusicTracks = useSelector((state) => state.artist.newMusicTracks);
  const searchTracks = useSelector((state) => state.artist.searchTracks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const showSelectedTracksFunding = useSelector(
    (state) => state.artist.showSelectedTracksFunding
  );
  const [sortedTracks, setSortedTracks] = useState([]);
  // Get the current date:
  const currentDate = new Date();
  // Calculate the maximum allowed date by subtracting 56 days from the current date:
  const end = new Date(currentDate.getTime() - 56 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    dispatch(makeEmptySearchResultTracks());
  }, []);

  useEffect(() => {
    sortAlgo(tracks);
  }, [tracks]); // eslint-disable-next-line

  const sortAlgo = async (tracks) => {
    let items = [...tracks];
    let result = await Promise.all(
      items
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .filter((item) => item.spotify_streams_total >= 10000)
    );

    setSortedTracks(
      result.filter((record) => new Date(record.release_date) < end)
    );
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value.length >= 3) {
      const filteredTracks = sortedTracks.filter(
        (e) =>
          e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) &&
          new Date(e.release_date) < end
      );
      dispatch(setSearchResultTracks(filteredTracks));
    } else {
      dispatch(makeEmptySearchResultTracks());
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const newMusicIncomeArtistKeeps = async (e, v) => {
    set_new_music_income(v);

    dispatch(setIsLoading(true));

    const selected_tracks =
      selected.length > 0
        ? selected.map((e) => getSingleTrack(e))
        : tracks
            .filter((track) => track.is_selected === 1)
            .map((checkedtracks) => checkedtracks);

    const new_music = newMusicTracks.map((e) => getSingleTrack(e));

    let val = {
      included_music,
      contract_length,
      catelog_income,
      new_music_income: v,
      selected_tracks: selected_tracks.length > 0 ? selected_tracks : tracks,
      new_music_tracks: new_music,
    };

    calcalute_tracks_estimate(val);
  };

  const isSelected = (id) => newMusicTracks.includes(id);

  function getSingleTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  const handleSingleSelect = (id) => {
    dispatch(setIsLoading(true));

    const token = getItemToLocalStorage("accessToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    if (isSelected(id)) {
      console.log("unselected: ", id);

      const data = {
        is_selected: 0,
      };

      axios.put(`${URLconfig.BASE_URL}/artist-tracks/${id}`, data, config);

      dispatch(setNewMusicTracks(newMusicTracks.filter((ids) => ids !== id)));
    } else {
      console.log("selected: ", id);

      const data = {
        is_selected: 2,
      };

      axios.put(`${URLconfig.BASE_URL}/artist-tracks/${id}`, data, config);

      dispatch(setNewMusicTracks([...newMusicTracks, id]));
    }
  };

  function getTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  useEffect(() => {
    getArtistFunding();
  }, [newMusicTracks]);

  const getArtistFunding = async () => {
    const selected_tracks =
      selected.length > 0
        ? selected.map((e) => getTrack(e))
        : tracks
            .filter((track) => track.is_selected === 1)
            .map((checkedtracks) => checkedtracks);

    const new_music = newMusicTracks.map((e) => getTrack(e));

    const val = {
      included_music,
      contract_length,
      catelog_income,
      new_music_income,
      selected_tracks: selected_tracks.length > 0 ? selected_tracks : tracks,
      new_music_tracks: new_music,
    };

    calcalute_tracks_estimate(val);
  };
  const [isPaperVisible, setIsPaperVisible] = useState(false);

  const Showtracks = () => {
    setIsPaperVisible(true);
  };
  const Hidetracks = () => {
    setIsPaperVisible(false);
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__header}>
        <Box
          varient="div"
          component="div"
          className={classess.page__header__seachBar}
        >
          <SearchIcon className={classess.searchIcon} />
          <input
            className={classess.page__header__search}
            placeholder="Search"
            type="search"
            onInput={(e) => handleSearch(e)}
            required
          />
        </Box>
      </Box>
      <Box className={classess.searchBarMob}></Box>

      <NewMusic
        newMusicIncomeArtistKeeps={newMusicIncomeArtistKeeps}
        new_music_income={new_music_income}
        artist_id={artist_id}
        set_new_music_income={set_new_music_income}
        getArtistFunding={getArtistFunding}
        openNewMusicForm={openNewMusicForm}
        closeNewMusicForm={closeNewMusicForm}
        Showtracks={Showtracks}
        Hidetracks={Hidetracks}
      />

      {isPaperVisible && (
        <Paper className={classess.paperTable}>
          {artist && Object.keys(artist).length ? (
            <TableContainer className={classess.table}>
              <Table stickyHeader={true} aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      className={classess.table__col}
                    >
                      <Checkbox className={classess.table__col__checkBox} />
                    </TableCell>
                    <TableCell
                      className={classess.table__col}
                      sx={{ maxWidth: 50 }}
                    >
                      {/* # */}
                    </TableCell>
                    <TableCell className={classess.table__col}>
                      Track Title
                    </TableCell>
                    <TableCell className={classess.table__col}>
                      Release Date
                    </TableCell>
                    <TableCell className={classess.table__col}>
                      Track Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* search tracks for look via map */}
                  {searchTracks.map((row, index) => {
                    const isItemSelected = isSelected(row?.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <LazyLoadComponent>
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
                                className={classess.table__col__checkBox}
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                onClick={() => handleSingleSelect(row.id)}
                              />
                            </TableCell>
                            <TableCell
                              className={classess.table__row}
                              sx={{ width: "0px" }}
                            >
                              <LazyLoadImage
                                src={row.image}
                                width={50}
                                height={50}
                                style={{ borderRadius: "100%" }}
                                placeholderSrc={PlaceHolderImage}
                              />
                            </TableCell>

                            <TableCell
                              className={classess.table__row}
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {row.title &&
                                typeof row.title === "string" &&
                                row.title.split(" ").slice(0, 5).join(" ")}
                            </TableCell>

                            <TableCell className={classess.table__row}>
                              {row.release_date}
                            </TableCell>
                            <TableCell
                              className={classess.table__row}
                              sx={{
                                borderTopRightRadius: "12px",
                                borderEndEndRadius: "12px",
                              }}
                            >
                              {row.track_type}
                            </TableCell>
                          </TableRow>
                        </>
                      </LazyLoadComponent>
                    );
                  })}

                  {/* if artist tracks 0 in the search, then loop the all tracks */}
                  {searchTracks.length < 1 &&
                    sortedTracks
                      .filter((record) => new Date(record.release_date) < end)
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row?.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <LazyLoadComponent>
                            <>
                              <Box sx={{ m: "1rem" }}></Box>

                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
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
                                    className={classess.table__col__checkBox}
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    onClick={() => handleSingleSelect(row.id)}
                                  />
                                </TableCell>
                                <TableCell
                                  className={classess.table__row}
                                  sx={{ width: "0px" }}
                                >
                                  <LazyLoadImage
                                    src={row.image}
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: "100%" }}
                                    placeholderSrc={PlaceHolderImage}
                                  />
                                </TableCell>

                                <TableCell
                                  className={classess.table__row}
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  <Tooltip
                                    title={row?.title}
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
                                        width: "100px",
                                      }}
                                    >
                                      {row?.title}
                                    </span>
                                  </Tooltip>
                                  {/* {row.title &&
                                    typeof row.title === "string" &&
                                    row.title.split(" ").slice(0, 4).join(" ")} */}
                                </TableCell>
                                {/* <TableCell className={classess.table__row}>
                                {row.title}
                              </TableCell> */}
                                <TableCell className={classess.table__row}>
                                  {row.release_date}
                                </TableCell>
                                <TableCell
                                  className={classess.table__row}
                                  sx={{
                                    borderTopRightRadius: "12px",
                                    borderEndEndRadius: "12px",
                                  }}
                                >
                                  {row.track_type}
                                </TableCell>
                              </TableRow>
                            </>
                          </LazyLoadComponent>
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
              count={sortedTracks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              classes={{
                actions: "custom-pagination-actions",
                select: "custom-pagination-select",
                // input: "custom-select-style",
                displayedRows: "custom-select-style",
                // menuItem: "custom-select-style",
                // root: "custom-select-style",
                // selectIcon: "custom-select-style",
                selectLabel: "custom-select-style",
                // selectRoot: "custom-select-style",
                // spacer: "custom-select-style",
                // toolbar: "custom-select-style",
              }}
              SelectProps={{
                // Leave the SelectProps empty; styles will be applied via the class
                classes: {
                  select: "custom-select", // Apply the custom-select class to the Select component
                },
              }}
            />
          ) : null}
        </Paper>
      )}
    </Box>
  );
};

export default ConfirmConfig;
