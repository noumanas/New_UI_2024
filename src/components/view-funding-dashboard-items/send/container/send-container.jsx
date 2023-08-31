import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SendContainer = () => {
  return (
    <>
      <Box varient="div" component="div" className={classess.page}>
        <Typography varient="h2" className={classess.page__heading}>
          Send Reports
        </Typography>
        <Typography varient="p" className={classess.page__sub_heading}>
          Upload the last six months of detailed reports covering all tracks you
          want included in your advance offer.
        </Typography>
        <Button type="button" className={classess.page__submit_btn}>
          Submit for review
        </Button>
      </Box>
    </>
  );
};

export default SendContainer;
