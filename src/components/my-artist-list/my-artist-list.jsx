import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArtist,
  emptySingularArtist,
  getArtist,
} from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from "react-router-dom";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";
import { scrollTopObserver, tableSortingAlgo } from "../../utils/helper";
import DeleteConformationDialog from "../../dialogs/delete-conformation-dialog/delete-conformation-dialog";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import { countries } from "country-data";
import { addCommasToNumber } from "../../utils/helper";
import { TablePagination } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const MyArtistList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchRef = useRef(dispatch);
  const artist = useSelector((state) => state.artist.artists);
  const artistApiStatus = useSelector((state) => state.artist.status);
  const [artistList, setArtistList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArtistToDelete, setSelectedArtistToDelete] = useState({});
  const cellUseStyles = muiTableCellUseStyles();

  const [page, setPage] = useState(0);

  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const startIndex = page * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  // const paginatedArtistList = artistList.slice(startIndex, endIndex);

  useEffect(() => {
    if (Array.isArray(artist)) {
      setArtistList(artist);
    }
    console.log("Artist Dot Artist", artist);
  }, [artist]);

  useEffect(() => {
    if (artist) {
      setArtistList(artist);
    }
  }, [artist]);

  useEffect(() => {
    dispatch(getArtist()).then((data) => {
      if (Array.isArray(data)) {
        setArtistList(data);
      }
    });
  }, [dispatch]);

  const initUIData = () => {
    dispatch(getArtist());
  };

  const deleteArtistByID = (id) => {
    dispatch(
      deleteArtist({
        id,
      })
    ).then(() => {
      initUIData();
    });
  };

  useEffect(() => {
    dispatchRef.current(getArtist());
  }, [dispatchRef]);

  useEffect(() => {
    setArtistList(artist);
  }, [artist]);

  const getEmail = (email, name) => {
    if (email) {
      return email;
    }
    const newName = name.replace(/\s+/, "");
    return `${newName}@spotify.com`;
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value && value.length >= 3) {
      setPage(0); // Reset page when searching
      const target = artist.filter((e) =>
        e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      const newList = tableSortingAlgo(target, "name");
      setArtistList(newList);
    } else {
      setArtistList(artist);
    }
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

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box
        varient="div"
        component="div"
        className={classess.page__statusBar}
        // sx={{ position: "relative" }}
      >
        <span className={classess.page__statusBar__title}>My Artists</span>
        <Box varient="div" component="div" className={classess.page__actionBar}>
          <SearchIcon
            sx={{
              color: "#4FFCB7",
              top: "8px",
            }}
          />
          <input
            className={classess.page__actionBar__search}
            placeholder="Search"
            type="search"
            onInput={(e) => handleSearch(e)}
            required
          />
        </Box>
      </Box>

      {artistList && artistList.length ? (
        <>
          <TableContainer sx={{ height: "67rem" }}>
            <Table
              className={classess.page__table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classess.page__table__head}></TableCell>
                  <TableCell className={classess.page__table__head}>
                    <span className={classess.page__table__head__text_styles}>
                      ARTIST NAME
                    </span>
                  </TableCell>

                  <TableCell className={classess.page__table__head}>
                    <span className={classess.page__table__head__text_styles}>
                      COUNTRY
                    </span>
                  </TableCell>

                  <TableCell className={classess.page__table__head}>
                    <span className={classess.page__table__head__text_styles}>
                      EMAIL
                    </span>
                  </TableCell>

                  <TableCell className={classess.page__table__head}>
                    <span className={classess.page__table__head__text_styles}>
                      TOTAL LISTNERSHIP
                    </span>
                  </TableCell>

                  <TableCell className={classess.page__table__head}>
                    <span className={classess.page__table__head__text_styles}>
                      ACTION
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {artistList.map((row, index) => (
                  <>
                    <Box sx={{ m: "1rem" }}></Box>

                    <TableRow
                      key={row._id}
                      className={cellUseStyles.row}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        className={classess.page__table__row}
                        sx={{
                          borderBottomLeftRadius: "12px",
                          borderTopLeftRadius: "12px",
                        }}
                      >
                        <Avatar
                          src={row?.avatar}
                          alt={row?.name}
                          className={
                            classess.page__table__row__placement__artist_image
                          }
                        />
                      </TableCell>

                      <TableCell className={classess.page__table__row}>
                        <Box className={classess.page__table__row__placement}>
                          <Tooltip
                            title="View Artist"
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <div
                              onClick={() => {
                                navigate(`/blig/view-artist/${row?._id}`);
                                scrollTopObserver();
                              }}
                            >
                              {row?.name}
                            </div>
                          </Tooltip>
                        </Box>
                      </TableCell>

                      <TableCell
                        className={classess.page__table__row__child__country}
                      >
                        {row?.chartmetric?.code2
                          ? countries[row?.chartmetric?.code2.toUpperCase()]
                              ?.emoji || ""
                          : ""}{" "}
                        {row?.chartmetric?.code2
                          ? countries[row?.chartmetric?.code2.toUpperCase()]
                              ?.name || "N/A"
                          : "N/A"}
                      </TableCell>

                      <TableCell
                        className={classess.page__table__row__child__email}
                      >
                        {getEmail(row?.email, row?.name)}
                      </TableCell>

                      <TableCell
                        className={classess.page__table__row__childbiggertext}
                      >
                        {addCommasToNumber(
                          row?.chartmetric?.cm_statistics?.sp_monthly_listeners
                            ? row?.chartmetric?.cm_statistics
                                ?.sp_monthly_listeners
                            : "N/A"
                        )}
                      </TableCell>

                      <TableCell
                        className={classess.page__table__row}
                        sx={{
                          borderBottomRightRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      >
                        <Stack spacing={1} direction="row">
                          <Tooltip
                            title="View Artist"
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <IconButton
                              style={{
                                backgroundColor: "#4FFCB7",
                                height: "30px",
                                width: "30px",
                              }}
                              onClick={() => {
                                navigate(`/blig/view-artist/${row?._id}`);
                                scrollTopObserver();
                              }}
                            >
                              <VisibilityIcon
                                style={{
                                  color: "#000",
                                  height: "15px",
                                  width: "15px",
                                }}
                                className={classess.page__table__row__icon}
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title="Edit Artist"
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <IconButton
                              style={{
                                backgroundColor: "#4092FC",
                                height: "30px",
                                width: "30px",
                              }}
                              onClick={() => {
                                dispatch(emptySingularArtist());
                                navigate(`/blig/edit-artist/${row?._id}`);
                                scrollTopObserver();
                              }}
                            >
                              <EditIcon
                                style={{
                                  color: "#000",
                                  height: "15px",
                                  width: "15px",
                                }}
                                className={classess.page__table__row__icon}
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title="Delete Artist"
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <IconButton
                              style={{
                                backgroundColor: "#F95F5F",
                                height: "30px",
                                width: "30px",
                              }}
                              onClick={() => handleOpenDeleteDialog(row)}
                            >
                              <DeleteIcon
                                style={{
                                  color: "#000",
                                  height: "15px",
                                  width: "15px",
                                }}
                                className={classess.page__table__row__icon}
                              />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={artistList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{ color: "#d6d6d6" }}
            classes={{
              actions: "custom-pagination-actions",
              select: "custom-pagination-select",
            }}
            SelectProps={{
              style: {
                backgroundColor: "#4FFCB7",
                color: "#222C41",
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          /> */}
        </>
      ) : artistList &&
        artistList.length === 0 &&
        artistApiStatus === "loading" ? (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#000" }}
          >
            <CircularProgress size={40} color="secondary" />
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

export default MyArtistList;
