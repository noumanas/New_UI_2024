import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";
import { config as URLconfig } from "../../enviorment/enviorment";
import axios from "axios";
import { getItemToLocalStorage } from "../../services/storage";
import AuthEnum from "../../enums/auth.enum";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContractHistory from "../../components/ContractHistory/ContractHistory";
import PostAddIcon from "@mui/icons-material/PostAdd";

const PreviewContract = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(value);
    setNote("");
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
          setOpen(false);
          toast.success("Success");
          setNotes([res.data.data, ...notes]);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container maxWidth="xxl">
      <Grid container spacing={2} className={classess.page}>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={9}
          className={classess.page__details}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__details__box}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__details__box__tracks}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__details__box__tracks__header}
              >
                <span
                  className={
                    classess.page__details__box__adetails__header__title
                  }
                >
                  {contract?.artist_name}
                </span>
                <Button
                  sx={{ color: "#000" }}
                  variant="outlined"
                  startIcon={<PostAddIcon />}
                  className={
                    classess.page__details__box__adetails__header__amendbtn
                  }
                  onClick={handleOpen}
                >
                  Add Revisions
                </Button>
              </Box>
              {/* <ContractPreview contract={contract} /> */}
              <ContractHistory open={open} onvaluechange={handleClose} />
            </Box>
          </Box>
        </Grid>

        {/* <Grid item sm={12} lg={5} xl={4} className={classess.page__notes}>
          <Box
            varient="div"
            component="div"
            className={classess.page__notes__box}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__notes__box__tracks}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__notes__box__adetails__header}
              >
                <span
                  className={classess.page__notes__box__adetails__header__title}
                >
                  Notes
                </span>
                <span>
                  <Button
                    variant="contained"
                    className={
                      classess.page__notes__box__adetails__header__Editbtn
                    }
                    onClick={() => setOpenPanel(!openPanel)}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </span>
              </Box>
              {notes.map((data) => {
                return (
                  <Grid container mb={2} key={data._id}>
                    <Grid sm className={classess.page__notes__notebox}>
                      <Box
                        className={classess.page__notes__notebox__chips}
                      >
                        <span>
                          <Chip
                            avatar={
                              <Avatar
                                alt="avatar"
                                src={data.user?.profilePicture}
                              />
                            }
                            label={
                              data.user?.firstName + " " + data.user?.lastName
                            }
                            variant="filled"
                          />
                        </span>
                        <span>
                          <Chip
                            sx={{ background: "#fff" }}
                            label={
                              'Date'
                              // <Moment fromNow ago>
                              //   {data.createdAt}
                              // </Moment>
                            }
                            variant="filled"
                          />
                        </span>
                      </Box>
                      <Box className={classess.page__notes__notebox__notetext}>
                        <p>{data.note}</p>
                      </Box>
                    </Grid>
                    {openPanel && (
                      <Grid
                        sm={2}
                        className={classess.page__notes__noteboxControls}
                      >
                        <img src={foldericon} alt="folder" />
                        <img src={deleteicon} alt="delete" />
                      </Grid>
                    )}
                  </Grid>
                );
              })}
            </Box>
          </Box>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default PreviewContract;
