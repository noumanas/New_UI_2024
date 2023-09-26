import React, { useState, useEffect } from "react";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import AuthEnum from "../../enums/auth.enum";
import { getItemToLocalStorage } from "../../services/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pdfImage from "../../../src/assets/pdf-image.png";
import frontId from "../../../src/assets/frontId.png";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import EyeIcon from "../../assets/buttonsicons/EyeIcon.png";
import DownloadIcon from "../../assets/buttonsicons/DownloadIcon.png";
import EditIcon from "../../assets/buttonsicons/EditIcon.png";
import { useDispatch, useSelector } from "react-redux";

const ArtistPaymentList = ({ props, handleNotes, setNotesComments }) => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [comments, setComments] = useState(false);
  const [valuation, setValuation] = useState("");
  const [artistAdvance, setArtistAdvance] = useState("");
  const [marketingBudget, setMarketingBudget] = useState("");
  const [songsNumber, setSongsNumber] = useState("");
  const [list, setList] = useState([]);
  const [note, setNote] = useState("");
  const [newComment, setNewComment] = useState([]);
  const [note_id, setNoteId] = useState();
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const handleToggle = (id) => {
    setVisibility(visibility === id ? null : id);
  };
  const handleToggleForComment = (id) => {
    setComments(comments === id ? null : id);
    handleNotes(comments === id ? null : id);
    setNotesComments(list[id]?.notes);
    setNoteId(id);
  };
  const noteHandler = (id) => {
    const payload = {
      note,
    };
    let config = {
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    };

    axios
      .post(`${URLconfig.BASE_URL}/payments/${id}/notes`, payload, config)
      .then((res) => {
        // setNote("");
        // setSelectedFile(null);
        // onvaluechange(false);
        toast.success("Success");
        setNote("");
        newComment.push([
          res.data.data,
          ...newComment.sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
          ),
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getContract = (id) => {
    console.log("id", id);
    let isApiSubscribed = true;
    axios.get(`${URLconfig.BASE_URL}/contracts/artist/${id}`).then((res) => {
      if (isApiSubscribed) {
        // console.log("API Response:", res.data);
        if (res.data.data.length > 0) {
          // console.log("res.data.data", res);
          navigate(`/blig/contracts/${res.data.data[0]._id}`);
        } else {
          // alert("No contracts found for this artist.");
          setModalOpen(true);
        }
      }
    });

    return () => {
      isApiSubscribed = false;
    };
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleDownload = (contractFile) => {
    const link = document.createElement("a");
    link.href = contractFile;
    link.download = contractFile;
    link.click();
  };
  useEffect(() => {
    let isSubscribed = true;
    axios({
      url: `${URLconfig.BASE_URL}/payments`,
      method: "GET",
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    })
      .then((response) => {
        if (isSubscribed) {
          setIsLoading(false);
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
    // p: 4,
  };

  return (
    <>
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
                      <span className={classess.table__col__heading}>
                        STATUS
                      </span>
                    </TableCell>
                    <TableCell className={classess.table__col}>
                      <span className={classess.table__col__heading}>
                        ACTION
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
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
            <TableContainer className={classess.table}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={classess.table__head}>
                  <TableRow className={classess.table__myTableCss}>
                    <TableCell
                      className={classess.table__col}
                      sx={{ width: 50, maxWidth: 50 }}
                    ></TableCell>

                    <TableCell className={classess.table__col}>
                      <span className={classess.table__col__heading}>
                        ARTIST NAME
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__col}>
                      <span className={classess.table__col__heading}>
                        LAST PAYMENT
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__col}>
                      <span className={classess.table__col__heading}>
                        CREATED ON
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__col}>
                      <span className={classess.table__col__heading}>
                        CREATED BY
                      </span>
                    </TableCell>

                    <TableCell className={classess.table__col}>
                      <span className={classess.table__col__heading}>
                        ACTION
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {list.map((items, index) => {
                  return (
                    <TableBody className={classess.table__brow}>
                      <>
                        <Box sx={{ m: "1rem" }}></Box>
                      </>
                      <TableRow>
                        <TableCell
                          className={classess.table__row}
                          sx={{
                            width: 50,
                            maxWidth: 50,
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          }}
                        >
                          <Avatar
                            src={items?.artist.avatar}
                            alt={items?.name}
                            className={classess.table__row__artist_image}
                          />
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <Tooltip
                            title="View Artist"
                            placement="top"
                            arrow
                            enterDelay={100}
                          >
                            <span className={classess.table__row__name}>
                              <a
                                className={classess.table__row__name__href}
                                rel="noopener noreferrer"
                                href={"/blig/view-artist/" + items?.artist_id}
                                target="_blank"
                              >
                                {items?.artist_name}
                              </a>
                            </span>
                          </Tooltip>
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{
                            color: "#ffffff",
                          }}
                        >
                          $
                          {internationalNumberFormat.format(
                            items?.last_payment_paid
                          )}
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span className={classess.table__row__created}>
                            {new Date(items?.createdAt).toLocaleDateString({
                              weekday: "short",
                              year: "numeric",
                              month: "2-digit",
                              day: "numeric",
                            })}
                          </span>
                        </TableCell>

                        <TableCell className={classess.table__row}>
                          <span className={classess.table__row__created_by}>
                            {items?.created_by}
                          </span>
                        </TableCell>

                        <TableCell
                          className={classess.table__row}
                          sx={{
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                          }}
                        >
                          <span className={classess.table__row__action}>
                            <Stack spacing={1} direction="row">
                              <Tooltip
                                title="View Payments"
                                placement="top"
                                arrow
                                enterDelay={100}
                              >
                                <IconButton
                                  style={{
                                    backgroundColor: "#4ffcb7",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                  onClick={() =>
                                    navigate(`/blig/payment/${items?._id}`)
                                  }
                                  // onClick={() => getContract(items?.artist_id)}
                                >
                                  <img
                                    src={EyeIcon}
                                    alt="Eye"
                                    style={{ height: "12px", width: "15.96px" }}
                                  />
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
                                    backgroundColor: "#4ffcb7",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                  onClick={() => handleToggle(index)}
                                >
                                  <img
                                    src={DownloadIcon}
                                    alt="Download Icon"
                                    style={{ height: "13.91px", width: "16px" }}
                                  />
                                  {/* <CloudDownloadOutlinedIcon
                                    className={
                                      classess.table__row__action__icons
                                    }
                                    sx={{
                                      backgroundColor: "#4ffcb7",
                                      color: "#000000",
                                      cursor: "pointer",
                                      height: "15px",
                                      width: "15px",
                                    }}
                                  /> */}
                                </IconButton>
                              </Tooltip>
                              {user.role === "admin" ? (
                                <Tooltip
                                  title="Add Notes"
                                  placement="top"
                                  arrow
                                  enterDelay={100}
                                >
                                  <IconButton
                                    style={{
                                      backgroundColor: "#4ffcb7",
                                      height: "30px",
                                      width: "30px",
                                    }}
                                    onClick={() => {
                                      if (index === 0) {
                                        handleToggleForComment(index + 1);
                                      } else {
                                        handleToggleForComment(index);
                                      }
                                    }}
                                  >
                                    <img
                                      src={EditIcon}
                                      alt="Edit"
                                      style={{
                                        height: "12.02px",
                                        width: "12.02px",
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <IconButton
                                  style={{
                                    backgroundColor: "#dddddd",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                  desibled={true}
                                >
                                  <img
                                    src={EditIcon}
                                    alt="Edit"
                                    style={{
                                      height: "12.02px",
                                      width: "12.02px",
                                    }}
                                  />
                                </IconButton>
                              )}

                              {/* <Tooltip
                                title="Approve Payment "
                                placement="top"
                                arrow
                                enterDelay={100}
                              >
                                <IconButton
                                  style={{
                                    backgroundColor: "#4ffcb7",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                  onClick={() =>
                                    navigate(`/blig/payment/${items?._id}`)
                                  }
                                >
                                  <CheckIcon
                                    fontSize="medium"
                                    className={
                                      classess.table__row__action__icons
                                    }
                                    sx={{
                                      backgroundColor: "#4ffcb7",
                                      color: "#000",
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                  />
                                </IconButton>
                              </Tooltip> */}
                            </Stack>
                          </span>
                        </TableCell>
                      </TableRow>

                      {visibility === index && (
                        <>
                          <TableRow>
                            <TableCell colSpan={6}>
                              <form>
                                <Grid container spacing={3}>
                                  <Grid item xs>
                                    <label className={classess.table__label}>
                                      Valuation
                                    </label>
                                    <input
                                      className={classess.table__input}
                                      value={`$${items?.valuation}`}
                                      name="name"
                                      onChange={(e) =>
                                        setValuation(e.target.value)
                                      }
                                      type="text"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <label className={classess.table__label}>
                                      Artist Advance
                                    </label>
                                    <input
                                      className={classess.table__input}
                                      value={`$${items?.artist_advance}`}
                                      name="name"
                                      onChange={(e) =>
                                        setArtistAdvance(e.target.value)
                                      }
                                      type="text"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <label className={classess.table__label}>
                                      Marketing Budget
                                    </label>
                                    <input
                                      className={classess.table__input}
                                      value={`$${items?.artist_marketing_budget}`}
                                      name="name"
                                      onChange={(e) =>
                                        setMarketingBudget(e.target.value)
                                      }
                                      type="text"
                                      required
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <label className={classess.table__label}>
                                      No. of Songs
                                    </label>

                                    <input
                                      className={classess.table__input}
                                      value={items?.Selected_tracks.length}
                                      name="name"
                                      onChange={(e) =>
                                        setSongsNumber(e.target.value)
                                      }
                                      type="text"
                                      required
                                    />
                                  </Grid>
                                </Grid>
                              </form>

                              <Grid
                                container
                                spacing={3}
                                sx={{ marginTop: "5px" }}
                              >
                                <Grid item xs>
                                  <label
                                    className={
                                      classess.table__bank_info_wrapper__name
                                    }
                                  >
                                    Bank Information
                                  </label>
                                  <div
                                    className={
                                      classess.table__bank_info_wrapper
                                    }
                                  >
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      Bank Name
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.bank_name}`}
                                      disabled="true"
                                    />
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      Account Holder's Name
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.bank_holder_name}`}
                                      disabled="true"
                                    />
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      Bank Account Number
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.bank_account_number}`}
                                      disabled="true"
                                    />
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      SWIFT/BIC Code
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.swift_or_BIC_code}`}
                                      disabled="true"
                                    />
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      IBAN
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.iban}`}
                                      disabled="true"
                                    />
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      Routing Number
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.routing_number}`}
                                      disabled="true"
                                    />
                                    <label
                                      className={
                                        classess.table__bank_info_wrapper__label
                                      }
                                    >
                                      Bank Address
                                    </label>
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.bank_address}`}
                                      disabled="true"
                                    />
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.city}`}
                                      disabled="true"
                                    />
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.zip}`}
                                      disabled="true"
                                    />
                                    <input
                                      className={
                                        classess.table__bank_info_wrapper__input
                                      }
                                      value={`${items?.country}`}
                                      disabled="true"
                                    />
                                    {/* <p className={classess.table__bank_info_wrapper__input}>
                              123 Blacklion Avenue Atlanta, GA 12345 United States
                            </p> */}
                                  </div>
                                </Grid>
                                <Grid item xs>
                                  <label
                                    className={
                                      classess.table__bank_info_wrapper__name
                                    }
                                  >
                                    WE8/W9 Form
                                  </label>
                                  <div
                                    className={
                                      classess.table__bank_info_wrapper
                                    }
                                  >
                                    <div
                                      className={
                                        classess.table__bank_info_wrapper__box
                                      }
                                    >
                                      <img
                                        src={pdfImage}
                                        className={
                                          classess.table__bank_info_wrapper__image
                                        }
                                        alt=""
                                      />
                                      <Button
                                        variant="contained"
                                        className={
                                          classess.table__bank_info_wrapper__image__downloadbtn
                                        }
                                        onClick={() =>
                                          handleDownload(items?.w8_ben_file)
                                        }
                                      >
                                        Download
                                      </Button>
                                    </div>
                                  </div>
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
                                    className={
                                      classess.table__bank_info_wrapper
                                    }
                                  >
                                    <div
                                      className={
                                        classess.table__bank_info_wrapper__box
                                      }
                                    >
                                      <img
                                        src={items?.artist_photo_id_front}
                                        className={
                                          classess.table__bank_info_wrapper__image
                                        }
                                        style={{ width: "60%" }}
                                        alt=""
                                      />
                                      {console.log("ImagesLink", items)}

                                      <Button
                                        variant="contained"
                                        className={
                                          classess.table__bank_info_wrapper__image__downloadbtn
                                        }
                                        onClick={() =>
                                          handleDownload(
                                            items?.artist_photo_id_front
                                          )
                                        }
                                      >
                                        Download
                                      </Button>
                                    </div>
                                  </div>
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
                                    className={
                                      classess.table__bank_info_wrapper
                                    }
                                  >
                                    <div
                                      className={
                                        classess.table__bank_info_wrapper__box
                                      }
                                    >
                                      <img
                                        src={items?.artist_photo_id_back}
                                        className={
                                          classess.table__bank_info_wrapper__image
                                        }
                                        style={{ width: "60%" }}
                                        alt=""
                                      />

                                      <Button
                                        variant="contained"
                                        className={
                                          classess.table__bank_info_wrapper__image__downloadbtn
                                        }
                                        onClick={() =>
                                          handleDownload(
                                            items?.artist_photo_id_back
                                          )
                                        }
                                      >
                                        Download
                                      </Button>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                      {comments === index && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Grid container spacing={2}>
                              <Grid item xs={6} md={10}>
                                <FormControl
                                  className={
                                    classess.table__brow__comment_row_container
                                  }
                                >
                                  <Input
                                    className={
                                      classess.table__brow__comment_row_container__input
                                    }
                                    rows={6}
                                    multiline="true"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={6} md={2}>
                                <Button
                                  variant="contained"
                                  className={
                                    classess.table__brow__comment_row_container__button
                                  }
                                  onClick={() => noteHandler(items?._id)}
                                >
                                  Add Comments
                                </Button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
      <div>
        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={classess.modalCss}>
            <Box className={classess.modalCss__heading}>Action </Box>
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
              ARTIST ID NOT FOUND
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
                onClick={closeModal}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ArtistPaymentList;
