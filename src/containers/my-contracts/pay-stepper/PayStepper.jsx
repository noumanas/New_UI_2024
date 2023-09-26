import React, { useState, useEffect, useRef } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import classess from "./style.module.scss";
import { Box, Button } from "@mui/material";
import PaymentDetails from "../../../components/payment-details/paymentDetails";
import PaymentPreview from "../../../components/payment-preview/PaymentPreview";
import PaymentSubmit from "../../../components/payment-submit/PaymentSubmit";
import ContractSuccess from "../../../components/contract-success/ContractSuccess";
import { useNavigate } from "react-router-dom";
import { config as URLConfig } from "../../../enviorment/enviorment";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const steps = ["Bank Details", "Preview", "Submit for Review"];

const PayStepper = ({ artist_advance, marketing_budget }) => {
  const navigate = useNavigate();
  const childRef = useRef(null);
  const [getNumber, setGetNumber] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [routing, setRouting] = useState(0);
  const [loader, setLoader] = useState(false);
  const [payment_detail, setPaymentDetail] = useState([]);
  const [formData, setFormData] = useState({});
  const [skipped, setSkipped] = useState(new Set());
  const [backDataSending, setBackDataSending] = useState({});
  const [list, setList] = useState([]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      childRef.current.onSubmit();
      setActiveStep((prevActiveStep) => prevActiveStep + getNumber);
    }
    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + getNumber);
    }
    console.log("activeStep", activeStep);
    if (activeStep === 2) {
      console.log("Please Select Email");
    }
    if (list.length > 0) {
      childRef.current.onSubmit();
      saveinfo(formData);
      setActiveStep((prevActiveStep) => prevActiveStep + getNumber);
      setSkipped(newSkipped);
    }
    // if(list.length===0){
    //   setActiveStep(2);
    // }
  };

  const handleBack = () => {
    setBackDataSending(formData);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };
  const saveinfo = async (info) => {
    const formdata = new FormData();
    formdata.append("bank_name", info?.bank_name);
    formdata.append("artist_id", info?.artist_id);
    formdata.append("bank_holder_name", info?.bank_holder_name);
    formdata.append("bank_account_number", info?.bank_account_number);
    formdata.append("routing_number", info?.routing_number);
    formdata.append("swift_or_BIC_code", info?.swift_or_BIC_code);
    formdata.append("bank_address", info?.bank_address);
    formdata.append("city", info?.city);
    formdata.append("zip", info?.zip);
    formdata.append("country", info?.country);
    formdata.append("iban", info?.iban);

    formdata.append("w8_ben_file", info?.w8_ben_file);
    formdata.append("artist_photo_id_front", info?.artist_photo_id_front);
    formdata.append("artist_photo_id_back", info?.artist_photo_id_back);
    formdata.append("valuation", info?.valuation);
    formdata.append("artist_advance", artist_advance);
    formdata.append("artist_marketing_budget", marketing_budget);
    formdata.append("created_by", info?.created_by);
    formdata.append("artist_name", info?.artist_name);
    formdata.append("last_payment_paid", 0);

    const res = await fetch(`${URLConfig.BASE_URL}/payments`, {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    if (res.status == 200) {
      setLoader(true);
      toast.success(`${data.message}`);
      console.log("payment_detail", payment_detail);
    } else {
      toast.error(`${data.message}`);
    }
  };
  useEffect(() => {
    console.log("advanced", artist_advance);
    console.log("marketing", marketing_budget);

    setActiveStep((prevActiveStep) => prevActiveStep + getNumber);
  }, [getNumber]);

  return (
    <Box sx={{ width: "100%" }} className={classess.page}>
      <Stepper
        activeStep={activeStep}
        className={classess.page__stepper_btn_wrapper}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={label}
              {...stepProps}
              className={classess.page__stepper_btn_wrapper__steps}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#000", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "white", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#fff", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "black", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {loader ? (
            <ContractSuccess content="Payment Information Submitted for review successfully!" />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <CircularProgress size={40} color="secondary" />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              pt: 2,
            }}
          >
            <Box>
              <Button
                className={classess.page__review_contract}
                onClick={() => navigate("/blig/contracts")}
                variant="contained"
              >
                Review Contract
              </Button>
              {/* <Button
                variant="contained"
                className={classess.page__download_copy}
              >
                Download a copy
              </Button> */}
            </Box>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 0 ? (
            <PaymentDetails
              setPaymentDetail={setPaymentDetail}
              ref={childRef}
              setFormData={setFormData}
              setGetNumber={setGetNumber}
              backDataSending={backDataSending}
            />
          ) : null}
          {activeStep === 1 ? <PaymentPreview formData={formData} /> : null}
          {activeStep === 2 ? (
            <PaymentSubmit
              ref={childRef}
              formData={formData}
              setList={setList}
              list={list}
              setGetNumber={setGetNumber}
            />
          ) : null}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                pt: 2,
                mb: 2,
                pl: 2,
                pr: 2,
                width: "25%",
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classess.page__backBtn}
                sx={{
                  mr: 1,
                }}
              >
                Back
              </Button>

              {/* {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )} */}
              <Button
                onClick={handleNext}
                // variant="contained"
                className={classess.page__saveBtn}
              >
                {activeStep === steps.length - 3 ? "Save" : null}
                {activeStep === steps.length - 1 ? "Save" : null}
                {activeStep === steps.length - 2 ? "Save" : null}
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
export default PayStepper;
