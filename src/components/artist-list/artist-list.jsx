import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptySingularArtist, getArtist } from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";
import { scrollTopObserver, tableSortingAlgo } from "../../utils/helper";
import { getUsers } from "../../redux/slice/user";
import { CircularProgress } from "@mui/material";
import { IconButton } from "@mui/material";
import { FabStyles } from "../../custom-mui-style/custom-mui-styles";

const ArtistList = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const navigate = useNavigate();
  const artist = useSelector((state) => state.artist.artists);
  const users = useSelector((state) => state.user.users);
  const artistApiStatus = useSelector((state) => state.artist.status);
  const authUser = useSelector((state) => state.auth.user);
  const [artistList, setArtistList] = useState([]);
  const cellUseStyles = muiTableCellUseStyles();
  const FabButton = FabStyles();

  useEffect(() => {
    dispatchRef.current(getArtist());
    dispatchRef.current(getUsers());
  }, [dispatchRef]);

  useEffect(() => {
    if (artist && artist.length) {
      setArtistList(artist);
    }
  }, [artist]);

  const getEmail = (email, name) => {
    if (email) {
      return email;
    }
    const newName = name?.replace(/\s+/, "");
    return `${newName}@spotify.com`;
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

  const handleARFilter = (email) => {
    if (email) {
      setArtistList(
        users.filter((el) => el.email === email).map((usr) => usr.artists)[0]
      );
    } else {
      setArtistList(artist);
    }
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__statusBar}>
        <Typography
          variant=""
          gutterBottom
          component="div"
          className={classess.page__statusBar__title}
          sx={{ fontSize: "18px", fontWeight: "400", paddingLeft: "15px" }}
        >
          All Artists
        </Typography>

        <span className={classess.page__actionBar}>
          <Stack direction="row" spacing={2}>
            <Box
              varient="div"
              component="div"
              className={classess.page__actionBar}
              sx={{ position: "relative" }}
            >
              <input
                className={classess.page__actionBar__search}
                placeholder="Search..."
                type="text"
                onInput={(e) => handleSearch(e)}
                required
              />
              <SearchIcon
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "15px",
                  right: "20px",
                }}
              />
            </Box>

            <Fab
              size="medium"
              className={FabButton.addButton}
              color="primary"
              aria-label="add"
              onClick={() => {
                navigate("/blig/add-artist");
                scrollTopObserver();
              }}
            >
              <AddIcon />
            </Fab>

            {authUser.role === "admin" && users && users.length && (
              <Stack direction="row" spacing={2}>
                {/* <Box varient="div" component="div" className={classess.page__actionBar}>
              <select className={classess.page__actionBar__selectfield}>
                <option value="">Artist State</option>
                <option value="accepted">Offer Accepted</option>
                <option value="rejected">Offer Rejected</option>
              </select>
            </Box> */}

                <Box
                  varient="div"
                  component="div"
                  className={classess.page__actionBar}
                >
                  <select
                    onChange={(e) => handleARFilter(e.target.value)}
                    className={classess.page__actionBar__selectfield}
                  >
                    <option value="">Users</option>
                    {users &&
                      users.length &&
                      users
                        .filter((user) => user.role !== "admin")
                        .map((user) => (
                          <option key={user._id} value={`${user.email}`}>
                            {user.email}
                          </option>
                        ))}
                  </select>
                </Box>
              </Stack>
            )}
          </Stack>
        </span>
      </Box>

      {artistList && artistList.length ? (
        <>
          <Paper
            className="container"
            sx={{ paddingBottom: "23px", background: "#2f3443" }}
          >
            <TableContainer sx={{ height: "690px" }}>
              <Table
                className={classess.page__table}
                stickyHeader={true}
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classess.page__table__head}>
                      Name
                    </TableCell>
                    <TableCell className={classess.page__table__head}>
                      Email
                    </TableCell>
                    {/* <TableCell className={classess.page__table__head}>Funding Estimate</TableCell> */}
                    <TableCell className={classess.page__table__head}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {artistList.map((row, index) => (
                    <TableRow
                      key={index}
                      className={cellUseStyles.row}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* <TableCell className={classess.page__table__row} component="th" scope="row">
                        {row?._id}
                      </TableCell> */}
                      <TableCell className={classess.page__table__row}>
                        <div className={classess.page__table__row__placement}>
                          <Avatar
                            src={row?.avatar}
                            alt={row?.name}
                            sx={{ width: 60, height: 60 }}
                          />
                          <Box
                            sx={{ textAlign: "left", cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/blig/view-artist/${row?._id}`);
                              scrollTopObserver();
                            }}
                          >
                            {row?.name}
                          </Box>
                        </div>
                      </TableCell>
                      <TableCell className={classess.page__table__row}>
                        {getEmail(row?.email, row?.name)}
                      </TableCell>
                      {/* <TableCell className={classess.page__table__row}>${internationalNumberFormat.format(Math.round(row?.totalFunding))}</TableCell> */}
                      <TableCell className={classess.page__table__row}>
                        <Stack spacing={1} direction="row">
                          <IconButton
                            onClick={() => {
                              dispatch(emptySingularArtist());
                              navigate(`/blig/view-artist/${row?._id}`);
                              scrollTopObserver();
                            }}
                            style={{ backgroundColor: "#ffffff20" }}
                          >
                            <VisibilityIcon
                              className={classess.page__table__row__icon}
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
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
    </Box>
  );
};

export default ArtistList;
