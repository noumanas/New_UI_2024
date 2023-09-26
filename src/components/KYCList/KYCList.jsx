/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Circle from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import AuthEnum from "../../enums/auth.enum";
import { getItemToLocalStorage } from "../../services/storage";
import { Avatar, Container, Grid, IconButton } from "@mui/material";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
// import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PdfImage from "../../assets/pdf-image.png";
import Modal from "@mui/material/Modal";
import CustomModal from "../custom-modal/CustomModal";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";

import EyeIcon from "../../assets/buttonsicons/EyeIcon.png";
import DownloadIcon from "../../assets/buttonsicons/DownloadIcon.png";
import EditIcon from "../../assets/buttonsicons/EditIcon.png";
import CheckIcon from "../../assets/buttonsicons/CheckIcon.png";
import CancelIcon from "../../assets/buttonsicons/CancelIcon.png";
import AddNotesIcon from "../../assets/buttonsicons/AddNotesIcon.png";

const KYCList = () => {
  const [list, setList] = useState([]);
  const [visibility, setVisibility] = useState(null);
  const [openFront, setOpenFront] = useState(false);
  const [openBack, setOpenBack] = useState(false);
  const [selectedReq, setSelectedReq] = useState({});

  const handleOpenFront = () => {
    setOpenFront(true);
  };

  const handleCloseFront = () => {
    setOpenFront(false);
  };

  const handleOpenBack = () => {
    setOpenBack(true);
  };

  const handleCloseBack = () => {
    setOpenBack(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    let isSubscribed = true;
    axios({
      url: `${URLconfig.SMART_PHONE_BASE_URL}/app-kyc`,
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

  const handleToggle = (id) => {
    setVisibility(visibility === id ? null : id);
  };

  const rejectHandler = (id) => {
    setVisibility(null);

    let configAuth = {
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    };

    setList(
      list.map((item) =>
        item._id === id
          ? {
              ...item,
              status: "rejected",
            }
          : item
      )
    );
    axios
      .put(
        `${URLconfig.SMART_PHONE_BASE_URL}/app-kyc/${id}/rejected`,
        null,
        configAuth
      )
      .then((e) => {})
      .catch((error) => {});
  };

  const approveHandler = (id) => {
    setVisibility(null);
    setList(
      list.map((item) =>
        item._id === id
          ? {
              ...item,
              status: "approved",
            }
          : item
      )
    );

    let configAuth = {
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    };

    axios
      .put(
        `${URLconfig.SMART_PHONE_BASE_URL}/app-kyc/${id}/approved`,
        null,
        configAuth
      )
      .then((e) => {})
      .catch((error) => {});
  };

  const [open, setOpen] = useState(false);
  const [approve, setApprove] = useState(false);

  const handleOpenCustomModal = () => {
    setSelectedReq();
    setOpen(true);
  };
  const handleCloseCustomModal = () => {
    setOpen(false);
  };

  // ? Approve
  const handleApproveCustomModal = () => {
    setApprove(true);
  };
  const handleDeclineCustomModal = () => {
    setApprove(false);
  };

  return (
    <>
      <Box varient="div" component="div" className={classess.page}>
        <Box component="div" varient="div" className={classess.page__list}>
          <TableContainer className={classess.table}>
            <Table stickyHeader={true} aria-label="sticky table">
              <TableHead className={classess.table__head}>
                <TableRow>
                  <TableCell
                    className={classess.table__col}
                    sx={{ width: 40, maxWidth: 40 }}
                  ></TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      ARTIST NAME
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      SUBMITTED ON
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>STATUS</span>
                  </TableCell>

                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>
                      APPROVED BY
                    </span>
                  </TableCell>
                  <TableCell className={classess.table__col}>
                    <span className={classess.table__col__heading}>Action</span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={classess.table__brow}>
                {list.map((row, index) => (
                  <React.Fragment>
                    <>
                      <Box sx={{ m: "10px" }}></Box>

                      <TableRow key={index}>
                        <TableCell
                          className={`${classess.table__row}`}
                          sx={{
                            width: 40,
                            maxWidth: 40,
                            borderTopLeftRadius: 12,
                            borderBottomLeftRadius: 12,
                          }}
                        >
                          <Avatar src={row?.avatar} alt="Artist Image" />
                        </TableCell>

                        <TableCell
                          className={`${classess.table__row} ${classess.table__row__artist_name_container}`}
                        >
                          <span className={classess.table__row__artist_name}>
                            {row?.name}
                          </span>
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span
                            className={classess.table__row__submitOnText}
                            style={{ textDecoration: "underline" }}
                          >
                            {moment(row?.createdAt).format("MMM DD YYYY")}
                          </span>
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span>
                            <Chip
                              variant="outlined"
                              icon={
                                <Circle
                                  className={classess.table__row__submitOnText}
                                  sx={{
                                    fill:
                                      row?.status === "approved"
                                        ? "green"
                                        : row?.status === "pending"
                                        ? "orange"
                                        : "red",
                                    fontSize: "14px",
                                  }}
                                />
                              }
                              label={row?.status}
                              className={classess.table__row__submitOnText}
                            />
                          </span>
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span className={classess.table__row__submitOnText}>
                            {/* {row.user?.username} */}
                            {"Approve By"}
                          </span>
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{
                            borderTopRightRadius: 12,
                            borderBottomRightRadius: 12,
                          }}
                        >
                          {row?.status === "pending" && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Tooltip
                                title="View Documents"
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
                                  onClick={() => handleToggle(index)}
                                >
                                  <img
                                    src={EyeIcon}
                                    alt="Eye"
                                    style={{ height: "12px", width: "15.96px" }}
                                  />
                                  {/* <VisibilityIcon
                                    style={{
                                      color: "#000",
                                      height: "15px",
                                      width: "15px",
                                    }}
                                  /> */}
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title="Download Documents"
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
                                >
                                  <img
                                    src={DownloadIcon}
                                    alt="Eye"
                                    style={{ height: "13.91px", width: "16px" }}
                                  />
                                  {/* <CloudDownloadOutlinedIcon
                                    style={{
                                      color: "#000",
                                      height: "15px",
                                      width: "15px",
                                    }}
                                  /> */}
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title="Add Comments"
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
                                >
                                  <img
                                    src={AddNotesIcon}
                                    alt="Eye"
                                    style={{
                                      height: "15.99px",
                                      width: "15.91px",
                                    }}
                                  />
                                  {/* <CreateIcon
                                    style={{
                                      color: "#000000",
                                      height: "15px",
                                      width: "15px",
                                    }}
                                  /> */}
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title="Approve Request"
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
                                  onClick={() => handleApproveCustomModal()}
                                  // onClick={() => approveHandler(row?._id)}
                                >
                                  <img
                                    src={CheckIcon}
                                    alt="Eye"
                                    style={{
                                      height: "13.89px",
                                      width: "15.8px",
                                    }}
                                  />
                                  {/* <CheckIcon
                                    style={{
                                      color: "#000000",
                                      height: "15px",
                                      width: "15px",
                                    }}
                                  /> */}
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title="Decline Request"
                                placement="top"
                                arrow
                                enterDelay={100}
                              >
                                <IconButton
                                  style={{
                                    backgroundColor: "#ec0303",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                  // onClick={() => rejectHandler(row?._id)}
                                  // onClick={handleShowModal}
                                  onClick={() => handleOpenCustomModal()}
                                >
                                  <img
                                    src={CancelIcon}
                                    alt="Eye"
                                    style={{
                                      height: "9.92px",
                                      width: "9.84px",
                                    }}
                                  />
                                  {/* <CancelOutlinedIcon
                                    style={{
                                      color: "#000000",
                                      height: "15px",
                                      width: "15px",
                                    }}
                                  /> */}
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                    {visibility === index && (
                      <>
                        <TableRow>
                          <TableCell colSpan={4}>
                            <Grid
                              container
                              spacing={1}
                              sx={{ borderBottom: "0px", borderStyle: "none" }}
                            >
                              <Grid item xs>
                                <label
                                  className={
                                    classess.table__bank_info_wrapper__name
                                  }
                                >
                                  WE8/W9 Form
                                </label>
                                <div
                                  className={classess.table__bank_info_wrapper}
                                >
                                  <div
                                    className={
                                      classess.table__bank_info_wrapper__box
                                    }
                                  >
                                    <img
                                      src={PdfImage}
                                      className={
                                        classess.table__bank_info_wrapper__image
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <Button
                                  variant="contained"
                                  className={
                                    classess.table__bank_info_wrapper__image__downloadbtn
                                  }
                                >
                                  Preview
                                </Button>
                              </Grid>

                              <Grid item xs>
                                <label
                                  className={
                                    classess.table__bank_info_wrapper__name
                                  }
                                >
                                  ID Front
                                </label>
                                <div
                                  className={classess.table__bank_info_wrapper}
                                >
                                  <div
                                    className={
                                      classess.table__bank_info_wrapper__box
                                    }
                                  >
                                    <img
                                      src={row?.file1_url}
                                      className={
                                        classess.table__bank_info_wrapper__image
                                      }
                                      style={{ width: "90%" }}
                                      alt=""
                                    />
                                  </div>
                                </div>

                                <Button
                                  variant="contained"
                                  onClick={handleOpenFront}
                                  className={
                                    classess.table__bank_info_wrapper__image__downloadbtn
                                  }
                                >
                                  Preview
                                </Button>

                                <Modal
                                  open={openFront}
                                  onClose={handleCloseFront}
                                  sx={{}}
                                >
                                  <Box
                                    style={style}
                                    component="img"
                                    alt="The house from the offer."
                                    src={row?.file1_url}
                                  />
                                </Modal>
                              </Grid>

                              <Grid item xs>
                                <label
                                  className={
                                    classess.table__bank_info_wrapper__name
                                  }
                                >
                                  ID Back
                                </label>
                                <div
                                  className={classess.table__bank_info_wrapper}
                                >
                                  <div
                                    className={
                                      classess.table__bank_info_wrapper__box
                                    }
                                  >
                                    <img
                                      src={row?.file2_url}
                                      className={
                                        classess.table__bank_info_wrapper__image
                                      }
                                      style={{ width: "90%" }}
                                      alt=""
                                    />
                                  </div>
                                </div>

                                <Button
                                  variant="contained"
                                  onClick={handleOpenBack}
                                  className={
                                    classess.table__bank_info_wrapper__image__downloadbtn
                                  }
                                >
                                  Preview
                                </Button>
                                <Modal
                                  open={openBack}
                                  onClose={handleCloseBack}
                                  sx={{}}
                                >
                                  <Box
                                    style={style}
                                    component="img"
                                    alt="The house from the offer."
                                    src={row?.file2_url}
                                  />
                                </Modal>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Delete */}
      <CustomModal
        showModal={open}
        closeModal={handleCloseCustomModal}
        heading={"Are you sure?"}
        text={"Do you want to delete this contract ?"}
        DeleteTask={rejectHandler}
      />
      {/* Approve */}
      <CustomModal
        showModal={approve}
        closeModal={handleDeclineCustomModal}
        heading={"Are you sure?"}
        text={"Do you want Approve ?"}
      />
    </>
  );
};

export default KYCList;
