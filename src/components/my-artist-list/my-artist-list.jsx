import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArtist,
  emptySingularArtist,
  getArtist,
  removeArtist,
} from "../../redux/slice/artist";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { getItemToLocalStorage } from "../../services/storage";
import { toast } from "react-toastify";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { TiStarOutline } from "react-icons/ti";

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
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
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
import AuthEnum from "../../enums/auth.enum";
import Skeleton from "@mui/material/Skeleton";
import { me } from "../../redux/slice/auth";
import EyeIcon from "../../assets/buttonsicons/EyeIcon.png";
import PencilIcon from "../../assets/buttonsicons/EditIcon.png";
import DeleteIcon from "../../assets/buttonsicons/DeleteIcon.png";

const MyArtistList = () => {
  const storedToken = getItemToLocalStorage("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchRef = useRef(dispatch);
  const user = useSelector((state) => state.auth.user);
  const artist = useSelector((state) => state.artist.artists);
  const artistApiStatus = useSelector((state) => state.artist.status);
  const [artistList, setArtistList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArtistToDelete, setSelectedArtistToDelete] = useState({});
  const cellUseStyles = muiTableCellUseStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const [loadlingText, setloadlingText] = useState("");
  const [sort, setSort] = useState({
    column: "oneYearEarnings",
    direction: "asc",
  });
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const startIndex = page * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  // const paginatedArtistList = artistList.slice(startIndex, endIndex);
  const handleSortClick = (column) => {
    if (sort.column === column) {
      // Toggle the sorting direction if the same column is clicked again
      setSort((prevSort) => ({
        column: column,
        direction: prevSort.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      // Default to ascending order when a new column is clicked
      setSort({ column: column, direction: "asc" });
    }
  };
  // const sortedArtistList = useMemo(() => {
  //   const comparator = (a, b) => {
  //     const aValue = a[sort.column];
  //     const bValue = b[sort.column];

  //     if (sort.direction === "asc") {
  //       return aValue - bValue;
  //     } else {
  //       return bValue - aValue;
  //     }
  //   };
  //   console.log(
  //     "artistList.slice().sort(comparator);",
  //     artistList.slice().sort(comparator)
  //   );
  //   return artistList.slice().sort(comparator);
  // }, [artistList, sort]);
  useEffect(() => {
    console.log("user", user);
    dispatch(getArtist());
  }, [dispatch]);
  useEffect(() => {
    if (Array.isArray(artist)) {
      setArtistList(artist);
    }
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
  const removespotlightartist = (_id, uid) => {
    const body = {
      _id: uid,
    };
    axios
      .put(`${URLconfig.BASE_URL}/spotlight/myartistlist/${_id}`, body)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error fetching spotlight data:", error);
      });
  };
  const deleteArtistByID = (id) => {
    const uid = user.id;
    if (user.role === "user") {
      dispatch(
        removeArtist({
          id,
          uid,
        })
      ).then(() => {
        removespotlightartist(id, uid);
        initUIData();
      });
    } else {
      dispatch(
        deleteArtist({
          id,
        })
      ).then(() => {
        removespotlightartist(id, uid);
        initUIData();
      });
    }
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
    return `${newName}@blacklionapp.xyz`;
  };

  const handleSearch = async (event) => {
    const { value } = event.target;
    if (value && value.length >= 3) {
      let configAuth = {
        headers: {
          authorization: `Bearer ${getItemToLocalStorage(AuthEnum["TOKEN"])}`,
        },
      };
      axios
        .get(`${URLconfig.BASE_URL}/artists/search/${value}`, configAuth)
        .then((response) => {
          let newList = response.data.data;
          setArtistList(newList);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(getArtist());
    }
  };
  const artist_add_to_spotlight = (artist) => {
    const payload = {
      spotify_id: artist?.spotify_id,
      name: artist?.name,
      email: artist?.email,
      image: artist?.avatar,
      artist_id: artist._id,
      country: artist?.country,
    };
    axios
      .post(`${URLconfig.BASE_URL}/spotlight`, payload, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        toast.success("Spotlight Added");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  // useEffect(() => {
  //   if (pageNumber >= 1) {
  //     loadArtists(pageNumber);
  //   }
  // }, [pageNumber]);
  // const loadArtists = (x) => {
  //   try {
  //     let configAuth = {
  //       headers: {
  //         authorization: `Bearer ${getItemToLocalStorage(AuthEnum["TOKEN"])}`,
  //       },
  //     };
  //     axios
  //       .get(`${URLconfig.BASE_URL}/artists?page=${x}`, configAuth)
  //       .then((res) => {
  //         const response = res.data.data;
  //         setArtistList(artistList.concat(response));
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleInfiniteScroll = async () => {
  //   try {
  //     let innerHeight = window.innerHeight;
  //     let pageHeight = document.documentElement.scrollHeight;
  //     let scrollHeight = document.documentElement.scrollTop;
  //     console.log("innerHeight", innerHeight);
  //     console.log("pageHeight", pageHeight);
  //     console.log("scrollHeight", scrollHeight);
  //     if (innerHeight + scrollHeight >= pageHeight) {
  //       setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //       console.log(pageNumber + 1);
  //       console.log("load more...");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const onclickloadmore = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleInfiniteScroll);
  // }, []);
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
        <Box>
          <span className={classess.page__statusBar__title}>My Artists</span>
        </Box>

        <Box
          varient="div"
          component="div"
          className={classess.page__statusBar__actionBar}
        >
          <SearchIcon className={classess.page__statusBar__actionBar__icon} />
          <input
            className={classess.page__statusBar__actionBar__search}
            placeholder="Search"
            type="search"
            onInput={(e) => handleSearch(e)}
            required
          />
        </Box>
      </Box>

      {/* Display a loader while artistApiStatus is "loading" */}
      {artistApiStatus === "loading" ? (
        //Skeleton Loader
        <TableContainer
        // sx={{ height: "67rem" }}
        >
          <Table
            className={classess.page__table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell className={classess.page__table__head}></TableCell>
                <TableCell className={classess.page__table__head}></TableCell>
                <TableCell className={classess.page__table__head}></TableCell>
                <TableCell className={classess.page__table__head}></TableCell>
                <TableCell
                  className={classess.page__table__head}
                  onClick={() => handleSortClick("oneYearEarnings")}
                ></TableCell>
                <TableCell className={classess.page__table__head}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <>
                  <Box sx={{ m: "1rem" }}></Box>

                  <TableRow
                    key={index}
                    // className={classess.page__table__row}
                    className={`${classess.table__row} ${cellUseStyles.row}`}
                  >
                    <TableCell className={classess.table__row}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell className={classess.page__table__row}>
                      <Skeleton variant="text" fontSize="1rem" />
                    </TableCell>

                    <TableCell className={classess.page__table__row}>
                      <Skeleton variant="text" fontSize="1rem" />
                    </TableCell>

                    <TableCell className={classess.page__table__row}>
                      <Skeleton variant="text" fontSize="1rem" />
                    </TableCell>

                    <TableCell className={classess.page__table__row}>
                      <Skeleton variant="text" fontSize="1rem" />
                    </TableCell>

                    <TableCell className={classess.page__table__row}>
                      <Skeleton variant="text" fontSize="1rem" />
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        // Display artistList when available
        <>
          <TableContainer
          // sx={{ height: "67rem" }}
          >
            <Table
              className={classess.page__table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead className={classess.page__table__head}>
                <TableRow>
                  <TableCell className={classess.page__table__col}></TableCell>
                  <TableCell className={classess.page__table__col}>
                    <span className={classess.page__table__col__heading}>
                      ARTIST NAME
                    </span>
                  </TableCell>
                  <TableCell className={classess.page__table__col}>
                    <span className={classess.page__table__col__heading}>
                      COUNTRY
                    </span>
                  </TableCell>
                  <TableCell className={classess.page__table__col}>
                    <span className={classess.page__table__col__heading}>
                      EMAIL
                    </span>
                  </TableCell>
                  <TableCell
                    className={classess.page__table__col}
                    onClick={() => handleSortClick("oneYearEarnings")}
                  >
                    <span className={classess.page__table__col__heading}>
                      Earnings(Yearly)
                      {/* {sort.column === "oneYearEarnings" && (
                        <span>{sort.direction === "asc" ? " ▲" : " ▼"}</span>
                      )} */}
                    </span>
                  </TableCell>
                  <TableCell className={classess.page__table__col}>
                    <span className={classess.page__table__col__heading}>
                      ACTION
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artistList !== null ? (
                  artistList.map((row, index) => (
                    <>
                      <Box sx={{ m: "1rem" }} />
                      {console.log("Artist Available", row?.name)}

                      <TableRow
                        key={index}
                        className={`${classess.table__row} ${cellUseStyles.row}`}
                      >
                        <TableCell
                          className={classess.page__table__row}
                          sx={{
                            borderBottomLeftRadius: "12px",
                            borderTopLeftRadius: "12px",
                          }}
                        >
                          <Box className={classess.wrapper}>
                            <Box className={classess.controls}>
                              <Box
                                className={classess.add}
                                onClick={() => artist_add_to_spotlight(row)}
                              >
                                <TiStarOutline />
                              </Box>
                            </Box>
                            <Avatar
                              src={row?.avatar}
                              alt={row?.name}
                              className={
                                classess.page__table__row__placement__artist_image
                              }
                            />
                          </Box>
                        </TableCell>

                        <TableCell className={classess.page__table__row}>
                          <Box className={classess.page__table__row__placement}>
                            <Tooltip
                              title={row?.name}
                              placement="top"
                              arrow
                              enterDelay={100}
                            >
                              <span
                                onClick={() => {
                                  navigate(`/blig/view-artist/${row?._id}`);
                                  scrollTopObserver();
                                }}
                              >
                                {row?.name}
                              </span>
                            </Tooltip>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box className={classess.page__table__row__country}>
                            {row?.chartmetric?.code2
                              ? countries[row?.chartmetric?.code2.toUpperCase()]
                                  ?.emoji || ""
                              : ""}{" "}
                            {row?.chartmetric?.code2
                              ? countries[row?.chartmetric?.code2.toUpperCase()]
                                  ?.name || "N/A"
                              : "N/A"}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box className={classess.page__table__row__email}>
                            {getEmail(row?.email, row?.name)}
                          </Box>
                        </TableCell>

                        <TableCell>
                          <span
                            className={
                              classess.page__table__row__yearly_earning
                            }
                          >
                            {addCommasToNumber(
                              row?.oneyearIncome ? row?.oneyearIncome : "N/A"
                            )}
                          </span>
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
                                <img
                                  src={EyeIcon}
                                  alt="Eye"
                                  style={{ height: "12px", width: "16px" }}
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
                                <img
                                  src={PencilIcon}
                                  alt="Eye"
                                  style={{ height: "16px", width: "15.98px" }}
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
                                <img
                                  src={DeleteIcon}
                                  alt="Eye"
                                  style={{ height: "16px", width: "16px" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  // Loading indicator or placeholder element
                  <span>Loading...</span>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
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
