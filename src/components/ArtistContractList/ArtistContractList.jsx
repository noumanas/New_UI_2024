/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Stack from "@mui/material/Stack";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Circle from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useNavigate } from "react-router-dom";
import AuthEnum from "../../enums/auth.enum";
import { getItemToLocalStorage } from "../../services/storage";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import EyeIcon from "../../assets/buttonsicons/EyeIcon.png";

const ArtistContractList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [archiveState, setArchiveState] = useState("No");
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const handleRadioChange = (event) => {
    setArchiveState(event.target.value);
  };
  useEffect(() => {
    let isSubscribed = true;
    if (!dataFetched) {
      axios({
        url: `${URLconfig.BASE_URL}/contracts`,
        method: "GET",
        headers: {
          authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
        },
      })
        .then((response) => {
          if (isSubscribed) {
            setIsLoading(false);
            setList(response.data.data);
            setDataFetched(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [dataFetched]);

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box component="div" varient="div" className={classess.page__list}>
        {isLoading ? (
          //Skeleton Loader
          <TableContainer className={classess.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className={classess.table__head}>
                <TableRow className={classess.table__myTableCss}>
                  <TableCell
                    className={classess.table__col}
                    sx={{ width: 35, maxWidth: 35 }}
                  />

                  <TableCell
                    className={classess.table__col}
                    sx={{
                      maxWidth: 150,
                    }}
                  >
                    <span className={classess.table__col__heading}>
                      ARTIST NAME
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      CREATED ON
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      SUBMITTED BY
                    </span>
                  </TableCell>
                  <TableCell
                    className={classess.table__col}
                    sx={{ maxWidth: 150 }}
                  >
                    <span className={classess.table__col__heading}>STATUS</span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>ACTION</span>
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
        ) : (
          // Skeleton loader end
          <TableContainer className={classess.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className={classess.table__head}>
                <TableRow className={classess.table__myTableCss}>
                  <TableCell
                    className={classess.table__col}
                    sx={{ width: 55, maxWidth: 55 }}
                  />

                  <TableCell
                    className={classess.table__col}
                    sx={{
                      maxWidth: 150,
                    }}
                  >
                    <span className={classess.table__col__heading}>
                      ARTIST NAME
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      CREATED ON
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      SUBMITTED BY
                    </span>
                  </TableCell>
                  <TableCell
                    className={classess.table__col}
                    sx={{ maxWidth: 150 }}
                  >
                    <span className={classess.table__col__heading}>STATUS</span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>ACTION</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              {list[0] === undefined ? (
                <span className={classess.table__no_contracts}>
                  No Contract
                </span>
              ) : (
                <TableBody>
                  {list.map((row, index) => (
                    <>
                      <Box sx={{ m: "1rem" }}></Box>
                      <TableRow>
                        <TableCell
                          className={classess.table__row}
                          sx={{
                            width: 40,
                            maxWidth: 40,
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          }}
                        >
                          <Avatar
                            src={row?.artist.avatar}
                            alt={row?.name}
                            className={classess.table__row__artist_image}
                          />
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{
                            maxWidth: 150,
                          }}
                        >
                          <Tooltip
                            title={row?.artist_name}
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <span className={classess.table__row__artistname}>
                              <a
                                className={
                                  classess.table__row__artistname__href
                                }
                                href={"/blig/view-artist/" + row?.artist_id}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {row?.artist_name}
                              </a>
                            </span>
                          </Tooltip>
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span className={classess.table__row__date}>
                            {new Date(row?.createdAt).toLocaleDateString({
                              weekday: "short",
                              year: "numeric",
                              month: "2-digit",
                              day: "numeric",
                            })}
                          </span>
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span className={classess.table__row__rep_name}>
                            {row.artist_representative_name}
                          </span>
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{ maxWidth: 100 }}
                        >
                          <span className={classess.table__row__status}>
                            <Chip
                              className={classess.table__row__status__cip}
                              variant="outlined"
                              icon={
                                <Circle
                                  sx={{
                                    fill:
                                      row?.status === "PENDING" ||
                                      row?.status === "Approved"
                                        ? "green"
                                        : "Orange",
                                    fontSize: "9px",
                                  }}
                                />
                              }
                              label={row?.status}
                              // label={row?.status}
                            />
                          </span>
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{
                            maxWidth: "50px",
                            borderBottomRightRadius: "12px",
                            borderTopRightRadius: "12px",
                          }}
                        >
                          <Tooltip
                            title={`View ${row?.artist_name} Contracts`}
                            placement="top"
                            arrow
                            enterDelay={150}
                          >
                            <IconButton
                              style={{
                                backgroundColor: "#4FFCB7",
                                height: "30px",
                                width: "30px",
                              }}
                              onClick={() =>
                                navigate(`/blig/contracts/${row._id}`)
                              }
                            >
                              <img
                                src={EyeIcon}
                                alt="Eye"
                                style={{ height: "12px", width: "16px" }}
                              />
                              {/* <VisibilityIcon
                              style={{
                                color: "#000",
                                height: "15px",
                                width: "15px",
                              }}
                              className={classess.page__table__row__icon}
                            /> */}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ArtistContractList;
