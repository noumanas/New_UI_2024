import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../linear-progress-bar/linear-progress-bar";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Skeleton, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ArtistTopTracks = ({
  tracks,
  loader,
  toptrackfunding,
  sortedTopTract,
  internationalNumberFormat,
}) => {
  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box component="div" varient="div" className={classess.page__list}>
        {sortedTopTract && sortedTopTract.length > 0 && (
          <TableContainer className={classess.table}>
            <Table stickyHeader={true} aria-label="sticky table">
              <TableHead className={classess.table__head}>
                <TableRow>
                  <TableCell className={classess.table__col}>
                    {/* <span className={classess.table__col__heading}></span> */}
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>TITLE</span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>TYPE</span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>EST</span>

                    <span className={classess.table__col__lastdays}>
                      {" "}
                      LAST 60 DAYS
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      % OF OWN
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span></span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTopTract.map((track, idx) => (
                  <>
                    <Box sx={{ m: "1rem" }}></Box>
                    <TableRow
                      key={idx}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                          maxWidth: 50,
                        },
                      }}
                    >
                      <TableCell
                        className={classess.table__row}
                        sx={{
                          maxWidth: 50,
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius: "12px",
                        }}
                      >
                        <Avatar
                          src={track?.image}
                          alt={track?.name}
                          sx={{
                            height: 50,
                            width: 50,
                            transform: "translateX(-12px)",
                          }}
                        />
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <span
                          className={classess.page__list__ul__li__name}
                          title={track?.name}
                        >
                          {track?.name}
                        </span>
                      </TableCell>

                      <TableCell
                        className={classess.table__row}
                        sx={{ maxWidth: 50 }}
                      >
                        <span
                          className={classess.page__list__ul__li__tracktype}
                          title={track?.track_type}
                        >
                          {track?.track_type}
                        </span>
                      </TableCell>

                      <TableCell
                        className={classess.table__row}
                        sx={{ maxWidth: 50 }}
                      >
                        <span
                          className={classess.page__list__ul__li__tracktype}
                        >
                          <span style={{ color: "white" }}>$</span>{" "}
                          {internationalNumberFormat.format(track?.funding)}
                        </span>
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <Typography>
                          {track?.stream_income_share}
                          {"%"}
                        </Typography>
                        {/* <LinearProgressWithLabel
                        value={track?.stream_income_share}
                      /> */}
                      </TableCell>

                      <TableCell
                        className={classess.table__row}
                        sx={{
                          borderBottomRightRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      >
                        <IconButton
                          style={{
                            backgroundColor: "#4FFCB7",
                            height: "30px",
                            width: "30px",
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
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {loader === false && sortedTopTract && sortedTopTract.length < 1 && (
          <Box component="div" varient="div">
            <p
              style={{
                color: "#ccc",
                fontSize: "12px",
                textAlign: "center",
                marginTop: 150,
              }}
            >
              There is no tracks
            </p>
          </Box>
        )}

        {loader && (
          <Box
            component="div"
            varient="div"
            className={classess.page__list__loader}
          >
            <CircularProgress size={40} color="secondary" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ArtistTopTracks;
