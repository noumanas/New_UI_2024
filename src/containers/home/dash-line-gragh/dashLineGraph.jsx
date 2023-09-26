import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import classess from "./style.module.scss";
import { Box } from "@mui/material";

const ChartApexLine = ({ options, series, type, height, Revenue }) => {
  return (
    <Box className={classess.page}>
      <Box className={classess.page__chart_main_container}>
        <span className={classess.page__chart_main_container__side_text}>
          {"Revenue(100K)"}
        </span>
        <Box id="chart" className={classess.page__chart_main_container__chart}>
          <ReactApexChart
            options={options}
            series={series}
            type={type}
            height={height}
          />
          <Box
            className={
              classess.page__chart_main_container__chart__buttom_text_container
            }
          >
            <span
              className={
                classess.page__chart_main_container__chart__buttom_text_container__text
              }
            >
              {"Duration(Monthly)"}
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartApexLine;
