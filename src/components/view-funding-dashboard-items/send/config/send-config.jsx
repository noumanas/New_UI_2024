import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import SyncIcon from "@mui/icons-material/Sync";
import axios from "axios";
import { config as URLconfig } from "../../../../enviorment/enviorment";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TotalEarnings from "../../../../containers/graph/totalEarningsGraph/totalEarnings";
import { deleteReport, getReports } from "../../../../redux/slice/artist";
import FileDownload from "js-file-download";
import SendContractDialog from "../../../../dialogs/send-contract/send-contract";
import AuthEnum from "../../../../enums/auth.enum";
import { AiOutlineFilePdf } from "react-icons/ai";
const SendConfig = ({ customize_funding }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [distributor, setDistributor] = useState("");
  const current_year = new Date().getFullYear();
  const reports = useSelector((state) => state.artist.reports);
  const artist = useSelector((state) => state.artist.artist);
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [IsEmail, setIsEmail] = useState("");
  const authUser = useSelector((state) => state.auth.user);
  const [base64, setbase64] = useState("");
  const dispatch = useDispatch();
  const handleReportDelete = (id) => {
    dispatch(deleteReport(id));
  };

  const onFileSelection = (e) => {
    if (distributor === "") {
      toast.warning("Please select a distributor");
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };
  const sendContract = async (data) => {
    const { name, email, file, sender_name, sender_email } = data;
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}` + "/docu-sign",
        {
          method: "POST",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem(AuthEnum.TOKEN)}`,
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
      if (res.status == 200) {
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.message}`);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };
  function convertHtmlToDoc() {
    const data = {
      name: artist?.name,
      email: IsEmail ? IsEmail : artist?.email,
      customize_funding: customize_funding?.totalFunding,
    };
    if (artist?.email || IsEmail) {
      axios({
        url: `${URLconfig.BASE_URL}/contract-gen/convert`,
        data,
        method: "POST",
        responseType: "blob",
      })
        .then((response) => {
          // FileDownload(response.data , 'Contract_agreement.docx');
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            console.log(base64String); // Log the base64 string to the console
            // setbase64(base64String) ;
            const data2 = {
              name: artist?.name,
              email: IsEmail ? IsEmail : artist?.email,
              sender_name: authUser?.firstName + " " + authUser?.lastName,
              sender_email: authUser?.email,
              file: base64String,
            };
            sendContract(data2);

            // Send the base64 string to the backend API
          };
          reader.readAsDataURL(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setOpen(true);
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("distributor", distributor);
    formData.append("artist_spotify_id", artist?.spotify_id);

    axios
      .post(`${URLconfig.BASE_URL}/upload`, formData, {})
      .then(() => {
        toast.success("Success");
        dispatch(getReports(artist.spotify_id));
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Please check your file format and selected distributor, or Contact administrator."
        );
      })
      .finally(() => {
        setUploading(false);
        setDistributor("");
        setSelectedFile(null);
      });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <SendContractDialog
        onClose={handleClose}
        open={open}
        setIsEmail={setIsEmail}
        IsEmail={IsEmail}
        convertHtmlToDoc={convertHtmlToDoc}
      />

      <Box varient='div' component='div' className={classess.page}>
        <Box varient='div' component='div' className={classess.page__caption}>
          <Typography varient='p'>
            Provide your distributor name and upload their reports.
          </Typography>
          <Typography varient='p' sx={{ marginTop: "25px" }}>
            Acceptable File Formats:
          </Typography>
          <Typography varient='p'>Microsoft Excel (.CSV, .TSV)</Typography>
        </Box>

        <Box
          varient='div'
          mb={2}
          component='div'
          className={classess.page__header}
        >
          <FormControl sx={{ minWidth: 250 }} size='small'>
            <Select
              value={distributor}
              onChange={(e) => setDistributor(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                border: "1px solid #00CD98",
                color: "#858997 !important",
                fill: "#858997 !important",
              }}
            >
              <MenuItem
                value=''
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>Select a Distributor</em>
              </MenuItem>

              <MenuItem
                value='OneRPM'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>OneRPM - Details</em>
              </MenuItem>

              <MenuItem
                value='TuneCore'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>TuneCore - Details</em>
              </MenuItem>

              <MenuItem
                value='Distrokid'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>Distrokid - Details</em>
              </MenuItem>

              <MenuItem
                value='CreateMusic - Details'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>CreateMusic - Details</em>
              </MenuItem>

              <MenuItem
                value='Empire - Details'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>Empire - Details</em>
              </MenuItem>

              <MenuItem
                value='Ascap Writer - Details'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>Ascap Writer - Details</em>
              </MenuItem>

              <MenuItem
                disabled
                value='CreateMusic - Summary'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>CreateMusic - Summary</em>
              </MenuItem>

              <MenuItem
                disabled
                value='Empire - Summary'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>Empire - Summary</em>
              </MenuItem>

              <MenuItem
                disabled
                value='Ascap Writer - Summary'
                style={{
                  backgroundColor: "#2F3443",
                  color: "#fff",
                }}
              >
                <em>Ascap Writer - Summary</em>
              </MenuItem>
            </Select>
          </FormControl>

          {!selectedFile && (
            <Stack
              direction='row'
              gap={2}
              className={classess.page__header__btn_container}
            >
              <Button
                onChange={onFileSelection}
                variant='contained'
                component='label'
                className={classess.page__header__upload_btn}
                onClick={() => setSelectedFile(null)}
                startIcon={<AiOutlineFilePdf />}
              >
                Upload file
                <input
                  hidden
                  accept='.csv, .tsv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                  type='file'
                />
              </Button>
            </Stack>
          )}
        </Box>

        {selectedFile && (
          <Box
            sx={{
              width: "100%",
              border: "1px solid #00cd98",
              padding: "10px",
            }}
          >
            <Box mb={3} mt={2}>
              {selectedFile.name}
            </Box>

            <Stack
              direction='row'
              gap={2}
              marginBottom={1}
              className={classess.page__header__btn_container}
            >
              {!uploading && (
                <Button
                  size='small'
                  onClick={() => setSelectedFile(null)}
                  className={classess.page__header__btn_pink}
                >
                  Delete
                </Button>
              )}

              {!uploading && (
                <Button
                  onClick={(e) => onSubmit(e)}
                  size='small'
                  variant='contained'
                  color='success'
                  className={classess.page__header__btn_normal}
                >
                  Upload
                </Button>
              )}
            </Stack>

            {uploading && (
              <Stack
                direction='row'
                gap={2}
                marginBottom={1}
                className={classess.page__header__btn_container}
              >
                <CircularProgress />
              </Stack>
            )}
          </Box>
        )}

        <Box varient='div' component='div' className={classess.page__content}>
          <Typography varient='p' className={classess.page__content__heading}>
            Upload History
          </Typography>
          <Typography
            varient='p'
            className={classess.page__content__sub_heading}
          ></Typography>
        </Box>

        {reports.map((report) => (
          <Accordion
            sx={{
              width: "100%",
              color: "#FFF",
              backgroundColor: "inherit",
              border: "1px solid #00cd98",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              key={report._id}
            >
              <Typography>#{report._id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TotalEarnings
                data={{
                  monthly: report.monthly_estimate,
                  yearly: report.income_report,
                }}
              />

              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span>Distributor Name:</span>
                <span>{report.distributor}</span>
              </p>

              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span>File Link:</span>
                <br />
                <span>
                  <a
                    style={{ color: "#01a177", textDecoration: "none" }}
                    href={report.file_url}
                  >
                    Download
                  </a>
                </span>
              </p>

              {report.income_report?.map((data) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      {data?.year === current_year
                        ? "Current Year"
                        : "Last Yearly Income:"}{" "}
                      {data?.year}
                    </div>
                    <div>
                      {data?.amount === 0
                        ? "-"
                        : "$" +
                          internationalNumberFormat.format(
                            data?.amount.toFixed(0)
                          )}
                    </div>
                  </div>
                </div>
              ))}

              <Box mt={2}>
                <Button
                  onClick={() => handleReportDelete(report._id)}
                  color='error'
                >
                  Delete
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default SendConfig;
