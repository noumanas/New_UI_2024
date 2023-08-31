import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

const CustomizedContainer = ({ downloadPDF, isPending }) => {
  const isLoading = useSelector((state) => state.artist.isLoading);
  return (
    <Box varient="div" component="div" className={classess.page}>
      <Typography varient="h3" className={classess.page__heading}>
        Customize Funding
      </Typography>
      <Typography varient="p" className={classess.page__sub_heading}>
        Adjust the sliders to choose your funding options.
      </Typography>
      <Stack direction="row" gap={2} className={classess.page__btn_container}>
        <button
          className={classess.page__btn_container__btn}
          onClick={downloadPDF}
          disabled={isLoading}
        >
          {isPending && isPending ? (
            <div>Processing..</div>
          ) : (
            <div>Download PDF</div>
          )}
        </button>
        <Button
          type="button"
          className={classess.page__btn_container__btn_pink}
        >
          Confirm
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomizedContainer;
