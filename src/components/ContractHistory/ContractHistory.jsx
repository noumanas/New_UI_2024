import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Toolbar, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import docicon from "../../assets/msword.png";
import { getItemToLocalStorage } from "../../services/storage";
import AuthEnum from "../../enums/auth.enum";
import { config as URLconfig } from "../../enviorment/enviorment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";
import moment from "moment";
import Collapse from "@mui/material/Collapse";
import closebutton from "../../assets/closeBtn.png";
import EditIcon from "@mui/icons-material/EditRounded";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import deleteicon from "../../assets/delete.png";
import foldericon from "../../assets/folder.png";
import Grid from "@mui/material/Grid";
import Moment from "react-moment";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import Tooltip from "@mui/material/Tooltip";

const ContractHistory = ({ props, open, onvaluechange }) => {
  const { id } = useParams();
  const [contact, setContract] = useState([]);
  const [note, setNote] = useState("");
  const [toggleTab, setToggleTab] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [notes, setNotes] = useState([]);
  const [close, setClose] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentData, SetdocumentData] = useState([]);

  useEffect(() => {
    let isApiSubscribed = true;
    axios.get(`${URLconfig.BASE_URL}/contracts/${id}`).then((res) => {
      if (isApiSubscribed) {
        setContract(res.data.data);
        setNotes(
          res.data.data.notes.sort((a, b) =>
            new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
          )
        );
      }
    });

    return () => {
      isApiSubscribed = false;
    };
  }, [id]);

  const handleClose = () => {
    onvaluechange(false);
    setNote("");
  };
  const downloadFile = (contractFile) => {
    const link = document.createElement("a");
    link.href = contractFile;
    link.download = contractFile;
    link.click();
  };

  const handleToggle = (id) => {
    setToggleTab(toggleTab === id ? null : id);
  };

  function convertHtmlToDoc(contract_info) {
    const data = {
      name: contract_info?.artist_name,
      email: contract_info?.artist_email,
      legal_name: contract_info.legel_name,
      address: contract_info.recipient_address,
      city: contract_info.city,
      country: contract_info.country,
      zip_code: contract_info.zip_code,
      contract_length: contract_info.contract_length,
      selected_tracks: contract_info?.Selected_tracks,
      document: contract_info.document || documentData,
    };
    axios({
      url: `${URLconfig.BASE_URL}/contract-gen/convert`,
      data,
      method: "POST",
      responseType: "blob",
    })
      .then((response) => {
        // FileDownload(response.data, "Contract_agreement.docx");
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(",")[1];
          // setbase64(base64String) ;
          const data2 = {
            name: contract_info?.artist_name,
            email: contract_info?.artist_email,
            sender_name: contract_info?.artist_representative_name,
            sender_email: contract_info?.artist_representative_email,
            file: base64String,
          };
          // Send the base64 string to the backend API
          sendContract(data2);
        };
        reader.readAsDataURL(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function download_first_contract(contract_info) {
    const data = {
      name: contract_info?.artist_name,
      email: contract_info?.artist_email,
      legal_name: contract_info.legel_name,
      address: contract_info.recipient_address,
      city: contract_info.city,
      country: contract_info.country,
      zip_code: contract_info.zip_code,
      contract_length: contract_info.contract_length,
      selected_tracks: contract_info?.Selected_tracks,
      createdAt: contract_info?.createdAt,
      document: contract_info?.document,
    };
    axios({
      url: `${URLconfig.BASE_URL}/contract-gen/convert`,
      data,
      method: "POST",
      responseType: "blob",
    })
      .then((response) => {
        FileDownload(
          response.data,
          `Contract_agreement_${contract_info?.artist_name}.docx`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const sendContract = async (data) => {
    const { name, email, file, sender_name, sender_email } = data;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}` + "/docu-sign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            name,
            email,
            file,
            sender_name,
            sender_email,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.message}`);
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const eventHandler = (id) => {
    const data = {
      status: "Approved",
    };
    axios({
      url: `${URLconfig.BASE_URL}/contracts/${id}`,
      method: "PUT",
      data: data,
    })
      .then((response) => {
        convertHtmlToDoc(response.data.data);
        toast.success(`${response.data.message}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const noteHandler = (id) => {
    const formData = new FormData();
    formData.append("note", note);
    formData.append("file", selectedFile);
    if (!selectedFile) {
      toast.warning("Please upload your Contract file.");
    } else {
      let config = {
        headers: {
          authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
        },
      };

      axios
        .post(`${URLconfig.BASE_URL}/contracts/${id}/notes`, formData, config)
        .then((res) => {
          setNote("");
          setSelectedFile(null);
          onvaluechange(false);
          toast.success("Success");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box container spacing={2} className={classess.page}>
      <Box component="div" varient="div" className={classess.page__list}>
        <TableContainer className={classess.table}>
          <Table stickyHeader={true} aria-label="sticky table">
            <TableHead className={classess.table__head}>
              <TableRow>
                <TableCell className={classess.table__col}></TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>TITLE</span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>DATE</span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>
                    UPLOADED BY
                  </span>
                </TableCell>
                <TableCell className={classess.table__col}>
                  <span className={classess.table__col__heading}>VERSION</span>
                </TableCell>
                <TableCell className={classess.table__col}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody className={classess.table__brow}>
              <TableRow>
                <TableCell
                  className={classess.table__row}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                  }}
                >
                  <span className={classess.table__row__artistname}>
                    <img src={docicon} alt="doc" width="30" />
                  </span>
                </TableCell>

                <TableCell className={classess.table__row}>
                  <Box className={classess.table__row__filename}>
                    {"Contract_agreement " + contact?.artist_name}
                  </Box>
                </TableCell>

                <TableCell className={classess.table__row}>
                  <span className={classess.table__row__date}>
                    {moment(contact.createdAt).format("MMM-DD-YYYY")}
                  </span>
                </TableCell>

                <TableCell className={classess.table__row}>
                  <span className={classess.table__row__status}>
                    {contact?.artist_representative_name}
                  </span>
                </TableCell>

                <TableCell className={classess.table__row}>
                  <span className={classess.table__row__action}>{"1.0"}</span>
                </TableCell>

                <TableCell
                  className={classess.table__row}
                  sx={{
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                  }}
                >
                  <span className={classess.table__row__action2}>
                    <Stack direction="row">
                      <Tooltip
                        title="Download Contract File"
                        placement="top"
                        arrow
                        enterDelay={100}
                      >
                        <Button
                          className={classess.table__row__action2__btn}
                          variant=""
                        >
                          <CloudDownloadOutlinedIcon
                            fontSize="small"
                            onClick={() => download_first_contract(contact)}
                            style={{ color: "#000" }}
                          />
                        </Button>
                      </Tooltip>

                      <Tooltip
                        title="Add Revisions First"
                        placement="top"
                        arrow
                        enterDelay={100}
                      >
                        <Button
                          className={classess.table__row__action2__btn1}
                          variant=""
                          onClick={() => setOpenPanel(!openPanel)}
                        >
                          <InsertDriveFileOutlinedIcon
                            fontSize="small"
                            style={{ color: "#000" }}
                          />
                        </Button>
                      </Tooltip>

                      <Tooltip
                        title="Contract Approve"
                        placement="top"
                        arrow
                        enterDelay={100}
                      >
                        <Button
                          className={classess.table__row__action2__btn2}
                          variant=""
                          onClick={() => eventHandler(id)}
                        >
                          <CheckOutlinedIcon
                            fontSize="small"
                            style={{ color: "#000" }}
                          />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>

            {notes.map((data, key) => {
              return (
                <>
                  <>
                    <Box sx={{ m: "1rem" }}></Box>
                  </>
                  <TableBody className={classess.table__brow}>
                    <TableRow>
                      <TableCell
                        className={classess.table__row}
                        sx={{
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius: "12px",
                        }}
                      >
                        <span className={classess.table__row__artistname}>
                          <img src={docicon} alt="doc" width="30" />
                        </span>
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <Box className={classess.table__row__filename}>
                          {data.fileKey}
                        </Box>
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <span className={classess.table__row__date}>
                          {moment(data.createdAt).format("MMM-DD-YYYY")}
                        </span>
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <span className={classess.table__row__status}>
                          {data.user?.firstName + " " + data.user?.lastName}
                        </span>
                      </TableCell>

                      <TableCell className={classess.table__row}>
                        <span className={classess.table__row__action}>
                          {"1." + (key + 1)}
                        </span>
                      </TableCell>

                      <TableCell
                        className={classess.table__row}
                        sx={{
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius: "12px",
                        }}
                      >
                        <span className={classess.table__row__action2}>
                          <Stack direction="row">
                            <Tooltip
                              title="Download Contract File"
                              placement="top"
                              arrow
                              enterDelay={100}
                            >
                              <Button
                                className={classess.table__row__action2__btn}
                                variant=""
                              >
                                <CloudDownloadOutlinedIcon
                                  fontSize="small"
                                  onClick={() =>
                                    download_first_contract(contact)
                                  }
                                  style={{ color: "#000" }}
                                />
                              </Button>
                            </Tooltip>

                            <Tooltip
                              title="Open Comment Panel"
                              placement="top"
                              arrow
                              enterDelay={100}
                            >
                              <Button
                                className={classess.table__row__action2__btn}
                                variant=""
                                onClick={() => handleToggle(key)}
                              >
                                <InsertDriveFileOutlinedIcon
                                  fontSize="small"
                                  style={{ color: "#000" }}
                                />
                              </Button>
                            </Tooltip>

                            <Tooltip
                              title="Contract Approve"
                              placement="top"
                              arrow
                              enterDelay={100}
                            >
                              <Button
                                className={classess.table__row__action2__btn2}
                                variant=""
                                onClick={() => eventHandler(id)}
                              >
                                <CheckOutlinedIcon
                                  fontSize="small"
                                  style={{ color: "#000" }}
                                />
                              </Button>
                            </Tooltip>
                          </Stack>
                        </span>
                      </TableCell>
                    </TableRow>

                    {toggleTab === key && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className={classess.table__notes_row}
                        >
                          <Grid
                            container
                            mb={2}
                            key={data._id}
                            sx={{
                              position: "relative",
                            }}
                          >
                            <Grid
                              sm
                              className={`${classess.page__notes__notebox} ${classess.note}`}
                              sx={{
                                borderTop: "1px solid #222c41",
                                overflow: "visible",
                              }}
                            >
                              <Box
                                className={classess.page__notes__notebox__chips}
                              >
                                <span>
                                  <Chip
                                    label="Note"
                                    variant="filled"
                                    sx={{
                                      backgroundColor: "#4FFCB7",
                                      width: "120px",
                                    }}
                                  />
                                </span>
                                <span>
                                  <Chip
                                    sx={{
                                      background: "#fff",
                                      backgroundColor: "#4FFCB7",
                                    }}
                                    label={
                                      <Moment fromNow ago>
                                        {data.createdAt}
                                      </Moment>
                                    }
                                    variant="filled"
                                  />
                                </span>
                              </Box>
                              <Box
                                className={
                                  classess.page__notes__notebox__notetext
                                }
                              >
                                <p>{data.note}</p>
                              </Box>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </>
              );
            })}
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          keepMounted
        >
          <Box className={classess.modalbox}>
            <Grid container>
              <Grid item sm={11}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Please add your notes:{" "}
                  {selectedFile && (
                    <span>Selected file: {selectedFile.name}</span>
                  )}
                </Typography>
              </Grid>
              <Grid item sm={1}>
                <Box
                  varient="div"
                  component="div"
                  className={classess.modalbox__closebutton}
                >
                  <img src={closebutton} alt="close" onClick={handleClose} />
                </Box>
              </Grid>
            </Grid>

            <TextField
              multiline="true"
              rows="5"
              className={classess.modalbox__textfield}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Box className={classess.modalbox__button}>
              <Button
                variant="contained"
                className={classess.modalbox__button__urev}
                style={{
                  backgroundColor: "#4FFCB7",
                  color: "#000",
                  height: "32px",
                }}
                component="label"
              >
                {" "}
                <FileUploadOutlinedIcon />
                Upload File
                <input
                  type="file"
                  accept=".doc,.docx"
                  hidden
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </Button>

              <Button
                className={classess.modalbox__button__cmnt}
                variant="contained"
                onClick={() => noteHandler(id)}
                style={{
                  backgroundColor: "#4FFCB7",
                  color: "#000",
                  height: "32px",
                }}
              >
                Add Comments
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ContractHistory;
