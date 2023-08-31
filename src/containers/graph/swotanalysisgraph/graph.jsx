import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { config as URLconfig } from "../../../enviorment/enviorment";
import { Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const RevenueGraph = ({ artist }) => {
  const gradientId = "radarGradient";

  const chartOptions = {
    series: [
      {
        name: "Tiktok",
        data: [80, 50, 30, 40, 100],
      },
      {
        name: "Spotify",
        data: [20, 30, 40, 80, 20],
      },
    ],
    chart: {
      height: 390,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      toolbar: {
        show: true,
      },
    },
    title: {
      text: "",
      align: "center",
    },
    stroke: {
      width: 3,
    },
    fill: {
      opacity: 0.7,
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Metric 1", "Metric 2", "Metric 3", "Metric 4", "Metric 5"],
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(0),
      },
    },
  };

  const gradientStyle = {
    background: `linear-gradient(to bottom, #1E58F9, #B21760)`,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  };
  return (
    <Box component="div" variant="div" mt={2} className={classess.page}>
      <Box className={classess.page__banner}>
        <Box
          component="div"
          variant="div"
          className={classess.page__banner__topHeaeding}
        >
          <Typography className={classess.page__banner__topHeaeding__heading}>
            SWOT Analysis
          </Typography>
        </Box>
        <Box
          component="div"
          variant="div"
          className={classess.page__banner__chart_container}
        >
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="radar"
            height={410}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RevenueGraph;
