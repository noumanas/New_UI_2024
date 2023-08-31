import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartApexLine = ({ options, series, type, height }) => {
  // const [series, setSeries] = useState([
  //   {
  //     name: "Sales",
  //     data: [
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //     ],
  //   },
  // ]);

  // const options = {
  //   chart: {
  //     height: 350,

  //     type: "line",
  //   },
  //   forecastDataPoints: {
  //     count: 7,
  //   },
  //   stroke: {
  //     width: 5,
  //     curve: "smooth",
  //   },
  //   xaxis: {
  //     type: "datetime",
  //     categories: [
  //       "2022-08-31",
  //       "2022-09-01",
  //       "2022-09-02",
  //       "2022-09-03",
  //       "2022-09-04",
  //       "2022-09-05",
  //       "2022-09-06",
  //       "2022-09-07",
  //       "2022-09-08",
  //       "2022-09-09",
  //       "2022-09-10",
  //       "2022-09-11",
  //       "2022-09-12",
  //       "2022-09-13",
  //       "2022-09-14",
  //       "2022-09-15",
  //       "2022-09-16",
  //       "2022-09-17",
  //       "2022-09-18",
  //       "2022-09-19",
  //       "2022-09-20",
  //       "2022-09-21",
  //       "2022-09-22",
  //       "2022-09-23",
  //       "2022-09-24",
  //       "2022-09-25",
  //       "2022-09-26",
  //       "2022-09-27",
  //       "2022-09-28",
  //       "2022-09-29",
  //       "2022-09-30",
  //       "2022-10-01",
  //       "2022-10-02",
  //       "2022-10-03",
  //       "2022-10-04",
  //       "2022-10-05",
  //       "2022-10-06",
  //       "2022-10-07",
  //       "2022-10-08",
  //       "2022-10-09",
  //       "2022-10-10",
  //       "2022-10-11",
  //       "2022-10-12",
  //       "2022-10-13",
  //       "2022-10-14",
  //       "2022-10-15",
  //       "2022-10-16",
  //       "2022-10-17",
  //       "2022-10-18",
  //       "2022-10-19",
  //       "2022-10-20",
  //       "2022-10-21",
  //       "2022-10-22",
  //       "2022-10-23",
  //       "2022-10-24",
  //       "2022-10-25",
  //       "2022-10-26",
  //       "2022-10-27",
  //       "2022-10-28",
  //       "2022-10-29",
  //       "2022-10-30",
  //     ],
  //     tickAmount: 10,
  //     labels: {
  //       formatter: function (value, timestamp, opts) {
  //         return opts.dateFormatter(new Date(timestamp), "dd MMM");
  //       },
  //     },
  //   },
  //   title: {
  //     text: "Spotify",
  //     align: "left",
  //     style: {
  //       fontSize: "16px",
  //       color: "#666",
  //     },
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shade: "dark",
  //       gradientToColors: ["#FDD835"],
  //       shadeIntensity: 1,
  //       type: "horizontal",
  //       opacityFrom: 1,
  //       opacityTo: 1,
  //       stops: [0, 100, 100, 100],
  //     },
  //   },
  //   yaxis: {
  //     min: -10,
  //     max: 40,
  //   },
  // };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "#192233",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            transform: "rotate(270deg)",
            whiteSpace: "nowrap",
            width: "20px",
            // paddingLeft: "50px",
          }}
        >
          Revenue (100K)
        </div>
        <div id="chart" style={{ width: "100%" }}>
          <ReactApexChart
            options={options}
            series={series}
            type={type}
            height={height}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <span>Duration (Monthly)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartApexLine;
