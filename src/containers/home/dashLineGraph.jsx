import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartApexLine = ({ options, series, type, height }) => {
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
            width: "40px",
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
