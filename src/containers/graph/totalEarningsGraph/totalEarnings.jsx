import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import Grid from "@mui/material/Grid";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@mui/material";

const TotalEarnings = ({ data }) => {
  const [month, setMonth] = useState(true);
  const [year, setYear] = useState(false);
  const [monthlyEstimate, setMonthlyEstimate] = useState([]);
  const [yearlyEstimate, setYearlyEstimate] = useState([]);

  useEffect(() => {
    if (data) {
      setMonthlyEstimate([
        ...data.monthly.filter((e) => e.amount !== 0).map(mapMonths),
      ]);
      setYearlyEstimate([
        ...data.yearly.filter((e) => e.amount !== 0).map(mapYears),
      ]);
    }
  }, [data]);

  const mapMonths = (item) => ({
    Month: item.date,
    Amount: Math.round(item.amount, 2),
  });

  const mapYears = (item) => ({
    name: item.year,
    Yearly: Math.round(item.amount, 2),
  });

  const handleMonth = () => {
    setMonth(true);
    setYear(false);
  };

  const handleYear = () => {
    setYear(true);
    setMonth(false);
  };

  return (
    <>
      <Box
        component="div"
        variant="div"
        className={classess.page__banner}
        mt={2}
        p={3}
      >
        <Box
          variant="div"
          component="div"
          className={classess.page__banner__conatiner}
          sx={{ alignItems: "flex-start" }}
        >
          {/* <Box component="div" variant="div" sx={{ color: "#fff" }}>
            Artist Total Earning
          </Box> */}
          <Box
            variant="div"
            component="div"
            pb={1}
            className={classess.page__banner__conatiner__button_wrapper}
          >
            {/* <Button onClick={handleWeek} className={classess.page__banner__conatiner__button_wrapper__button}>
                Weekly
              </Button> */}
            <Button
              onClick={handleMonth}
              className={
                classess.page__banner__conatiner__button_wrapper__button
              }
            >
              Monthly
            </Button>
            <Button
              onClick={handleYear}
              className={
                classess.page__banner__conatiner__button_wrapper__button
              }
            >
              Yearly
            </Button>
          </Box>

          {month && (
            <Grid sx={{ width: "100%" }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  width={500}
                  height={300}
                  data={monthlyEstimate}
                  syncId="Monthly Earnings"
                  margin={{
                    top: 10,
                    right: 5,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="Monthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FFCB7" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#4FFCB775"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0 1" />
                  <XAxis
                    dataKey="Month"
                    tick={{ fill: "white", fontSize: 14 }}
                  />
                  <YAxis
                    tick={{ fill: "white", fontSize: 14 }}
                    label={{
                      fill: "white",
                      fontSize: 14,
                      value: "USD ($)",
                      angle: -90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    stroke="#2F3443"
                    fill="#2F3443"
                    dataKey="Month"
                    fillOpacity={1}
                    isAnimationActive={true}
                  />
                  <Area
                    type="monotone"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    dataKey="Amount"
                    fillOpacity={1}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
          )}

          {year && (
            <Grid sx={{ width: "100%" }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  width={500}
                  height={300}
                  data={yearlyEstimate}
                  syncId="Yearly Earnings"
                  margin={{
                    top: 10,
                    right: 5,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="Yearly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FFCB7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4FFCB7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0 1" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "white", fontSize: 14 }}
                  />
                  <YAxis
                    tick={{ fill: "white", fontSize: 14 }}
                    label={{
                      fill: "white",
                      fontSize: 14,
                      value: "USD ($)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Yearly"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#Yearly)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TotalEarnings;
