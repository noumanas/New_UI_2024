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
import Tooltip from "@mui/material/Tooltip";
import EyeIcon from "../../assets/buttonsicons/EyeIcon.png";

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
        {/* Display a loader while loader prop is true */}
        {loader && (
          //Skeleton Loader
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
                      Last Month
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      % OF OWNERSHIP
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span></span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 7 }).map((_, index) => (
                  <>
                    <Box sx={{ m: "1rem" }}></Box>
                    <TableRow key={index}>
                      <TableCell
                        className={classess.table__row}
                        sx={{ width: 35, maxWidth: 35 }}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                      </TableCell>
                      <TableCell
                        className={classess.table__row}
                        sx={{ maxWidth: 150 }}
                      >
                        <Skeleton variant="text" fontSize="1rem" />
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <Skeleton variant="text" fontSize="1rem" />
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <Skeleton variant="text" fontSize="1rem" />
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <Skeleton variant="text" fontSize="1rem" />
                      </TableCell>
                      <TableCell className={classess.table__row}>
                        <Skeleton variant="text" fontSize="1rem" />
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Check if sortedTopTract exists and has items */}
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
                      Last Month
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      % OF OWNERSHIP
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
                        <Tooltip
                          title={track?.name}
                          placement="top"
                          arrow
                          enterDelay={100}
                        >
                          <span className={classess.page__list__ul__li__name}>
                            {track?.name}
                          </span>
                        </Tooltip>
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
                          <span>$</span>{" "}
                          {internationalNumberFormat.format(track?.funding)}
                        </span>
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <span
                          className={classess.page__list__ul__li__tracktype}
                        >
                          {track?.stream_income_share}
                          {"%"}
                        </span>
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
                            backgroundColor: "#4ffcb7",
                            height: "30px",
                            width: "30px",
                          }}
                        >
                          <img
                            src={EyeIcon}
                            alt="Eye"
                            style={{ height: "12px", width: "16px" }}
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

        {/* Display a message when loader is false and no tracks are available */}
        {!loader && sortedTopTract && sortedTopTract.length < 1 && (
          <Box component="div" varient="div">
            <p
              style={{
                color: "#ccc",
                fontSize: "12px",
                textAlign: "center",
                marginTop: 150,
              }}
            >
              There are no tracks
            </p>
          </Box>
        )}
      </Box>
    </Box>
  );
  // return (
  //   <Box varient="div" component="div" className={classess.page}>
  //     <Box component="div" varient="div" className={classess.page__list}>
  //       {sortedTopTract && sortedTopTract.length > 0 && (

  //       )}

  //       {loader === false && sortedTopTract && sortedTopTract.length < 1 && (
  //         <Box component="div" varient="div">
  //           <p
  //             style={{
  //               color: "#ccc",
  //               fontSize: "12px",
  //               textAlign: "center",
  //               marginTop: 150,
  //             }}
  //           >
  //             There is no tracks
  //           </p>
  //         </Box>
  //       )}

  //       {loader && (
  //         <Box
  //           component="div"
  //           varient="div"
  //           className={classess.page__list__loader}
  //         >
  //           <CircularProgress size={40} color="secondary" />
  //         </Box>
  //       )}
  //     </Box>
  //   </Box>
  // );
};

export default ArtistTopTracks;
