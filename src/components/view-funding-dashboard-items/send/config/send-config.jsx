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
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

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
  const [uploadBtn, setUploadBtn] = useState(false);
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

      <Box varient="div" component="div" className={classess.page}>
        <Box varient="div" component="div" className={classess.page__caption}>
          <span>SELECT DISTRIBUTOR</span>
        </Box>

        <Box
          varient="div"
          mb={2}
          component="div"
          className={classess.page__header}
        >
          <FormControl variant="standard" sx={{ minWidth: 250 }} size="small">
            {/* <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native"
              sx={{
                color: "#4ffcb7",
              }}
            >
              SELECT DISTRIBUTOR
            </InputLabel> */}
            <NativeSelect
              value={distributor}
              onChange={(e) => setDistributor(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={10}
              sx={{
                borderBottom: "1px solid #FFFFFF",
                // color: "black !important",
                fontWeight: 700,
                // fill: "#FFFFFF !important",
                // backgroundColor: "#222C41 !important",
                borderRadius: "0px",
                fontSize: "25px",
              }}
              className={classess.selectDropDown}
            >
              <option value="10" style={{ color: "#000" }}>
                Please Select
              </option>
              <option value="OneRPM" style={{ color: "#000" }}>
                OneRPM - Details
              </option>

              <option value="TuneCore" style={{ color: "#000" }}>
                TuneCore - Details
              </option>

              <option style={{ color: "#000" }} value="Distrokid">
                Distrokid - Details
              </option>

              <option value="CreateMusic - Details" style={{ color: "#000" }}>
                CreateMusic - Details
              </option>

              <option value="Empire - Details" style={{ color: "#000" }}>
                Empire - Details
              </option>

              <option value="Ascap Writer - Details" style={{ color: "#000" }}>
                Ascap Writer - Details
              </option>

              <option
                disabled
                value="CreateMusic - Summary"
                style={{ color: "#999999" }}
              >
                CreateMusic - Summary
              </option>

              <option
                disabled
                value="Empire - Summary"
                style={{ color: "#999999" }}
              >
                Empire - Summary
              </option>

              <option
                disabled
                value="Ascap Writer - Summary"
                style={{ color: "#999999" }}
              >
                Ascap Writer - Summary
              </option>
            </NativeSelect>
          </FormControl>

          {!selectedFile && (
            <Stack
              direction="row"
              gap={2}
              className={classess.page__header__btn_container}
            >
              {distributor === "" || distributor === "10" ? (
                <Button
                  variant="contained"
                  component="label"
                  className={classess.page__header__upload_btn_disable}
                  disabled
                  startIcon={<AiOutlineFilePdf />}
                >
                  Upload
                  <input
                    hidden
                    accept=".csv, .tsv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    type="file"
                  />
                </Button>
              ) : (
                <Button
                  onChange={onFileSelection}
                  variant="contained"
                  component="label"
                  className={classess.page__header__upload_btn}
                  onClick={() => setSelectedFile(null)}
                  startIcon={<AiOutlineFilePdf />}
                >
                  Upload
                  <input
                    hidden
                    accept=".csv, .tsv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    type="file"
                  />
                </Button>
              )}
            </Stack>
          )}

          <span>Microsoft Excel (.CSV, .TSV)</span>
        </Box>

        {selectedFile && (
          <Box
            sx={{
              width: "100%",
              border: "1px solid #4FFCB7",
              padding: "10px",
              borderRadius: "12px",
              backgroundColor: "#192233",
            }}
          >
            <Box mb={3} mt={2}>
              {selectedFile.name}
            </Box>

            <Stack
              direction="row"
              gap={2}
              marginBottom={1}
              className={classess.page__header__btn_container}
            >
              {!uploading && (
                <Button
                  size="small"
                  onClick={() => setSelectedFile(null)}
                  className={classess.page__header__btn_pink}
                >
                  Delete
                </Button>
              )}

              {!uploading && (
                <Button
                  onClick={(e) => onSubmit(e)}
                  size="small"
                  variant="contained"
                  color="success"
                  className={classess.page__header__btn_normal}
                >
                  Upload
                </Button>
              )}
            </Stack>

            {uploading && (
              <Stack
                direction="row"
                gap={2}
                marginBottom={1}
                className={classess.page__header__btn_container}
              >
                <CircularProgress />
              </Stack>
            )}
          </Box>
        )}

        <Box varient="div" component="div" className={classess.page__content}>
          <span varient="p" className={classess.page__content__heading}>
            Upload History
          </span>
        </Box>

        {reports.map((report) => (
          <Accordion
            sx={{
              width: "100%",
              color: "#FFF",
              backgroundColor: "#192233",
              marginBottom: "10px",
              borderRadius: "12px !important",
              // border: "1px solid #4FFCB7",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={report._id}
              sx={{
                backgroundColor: "#192233",
                borderRadius: "12px",
                color: "#fff",
                // border: "1px solid #4FFCB7",
                overflow: "hidden",
              }}
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
                    style={{ color: "#4FFCB7", textDecoration: "none" }}
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
                  color="error"
                  sx={{ border: "1px solid #ff0000" }}
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
