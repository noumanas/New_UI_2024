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

const ArtistContractList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [archiveState, setArchiveState] = useState("No");

  const handleRadioChange = (event) => {
    setArchiveState(event.target.value);
  };

  useEffect(() => {
    let isSubscribed = true;
    axios({
      url: `${URLconfig.BASE_URL}/contracts`,
      method: "GET",
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    })
      .then((response) => {
        if (isSubscribed) {
          setList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box component="div" varient="div" className={classess.page__list}>
        <TableContainer className={classess.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classess.table__head}>
              <TableRow className={classess.table__myTableCss}>
                <TableCell className={classess.table__col}>
                  ARTIST NAME
                </TableCell>
                <TableCell className={classess.table__col}>
                  CREATED ON
                </TableCell>
                <TableCell className={classess.table__col}>
                  SUBMITTED BY
                </TableCell>
                <TableCell className={classess.table__col}>STATUS</TableCell>
                <TableCell className={classess.table__col}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, index) => (
                <>
                  <Box sx={{ m: "1rem" }}></Box>
                  <TableRow>
                    <TableCell
                      className={classess.table__row}
                      sx={{
                        maxWidth: 50,
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                      }}
                    >
                      <Tooltip
                        title="Artist Profile"
                        placement="top"
                        arrow
                        enterDelay={100}
                      >
                        <span className={classess.table__row__artistname}>
                          <a
                            className={classess.table__row__href}
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
                      <span className={classess.table__row__Date}>
                        {new Date(row?.createdAt).toLocaleDateString({
                          weekday: "short",
                          year: "numeric",
                          month: "2-digit",
                          day: "numeric",
                        })}
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__row}>
                      {"Troy Carter"}
                    </TableCell>

                    <TableCell
                      className={classess.table__row}
                      sx={{ maxWidth: 50 }}
                    >
                      <span className={classess.table__row__status}>
                        <Chip
                          variant="outlined"
                          icon={
                            <Circle
                              sx={{
                                fill:
                                  row?.status === "PENDING" ||
                                  row?.status === "Approved"
                                    ? "green"
                                    : "Orange",
                                fontSize: "14px",
                              }}
                            />
                          }
                          label={row?.status}
                          sx={{ color: "#fff", borderColor: "transparent" }}
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
                        enterDelay={100}
                      >
                        <IconButton
                          style={{
                            backgroundColor: "#4FFCB7",
                            height: "30px",
                            width: "30px",
                          }}
                          onClick={() => navigate(`/blig/contracts/${row._id}`)}
                        >
                          <VisibilityIcon
                            style={{
                              color: "#000",
                              fontSize: "20px",
                            }}
                            className={classess.page__table__row__icon}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ArtistContractList;
