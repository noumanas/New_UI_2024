import React, { useState } from "react";
import classess from "./style.module.scss";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

const ContractSuccess = ({ content }) => {
  return (
    <Box sx={{ width: "100%" }} className={classess.page} mt={5}>
      <Typography>{content}</Typography>
      {/* <div>{content}</div> */}
    </Box>
  );
};

export default ContractSuccess;
