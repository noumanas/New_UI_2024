import React, { useState, useEffect } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import { CustomSliderWithStyles } from "../../../../custom-mui-style/custom-mui-styles";
import { setIsLoading } from "../../../../redux/slice/artist";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import WalletImg from "../../../../assets/wallet.png";
import { LiaSaveSolid } from "react-icons/lia";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { Line } from "react-chartjs-2";
import Chartapexline from "./chartapexline";

const CustomizedConfig = ({
  set_contract_length,
  set_catelog_income,
  included_music,
  contract_length,
  catelog_income,
  new_music_income,
  funding_metadata,
  set_funding_metadata,
  updateArtistFunding,
  calcalute_tracks_estimate,
  new_music_estimiate,
  monthlyIncome,
  totalFunding,
  artist_advance,
  marketing_budget,
  set_artist_advance,
  set_marketing_budget,
  internationalNumberFormat,
  onClick,
  isBorderChanged,
}) => {
  const [multiple, setMultiple] = useState(30);
  const [licenceType, setLicenceType] = useState("license");
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.artist.tracks);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const newMusicTracks = useSelector((state) => state.artist.newMusicTracks);
  const authUser = useSelector((state) => state.auth.user);
  const [change_new_music_estimiate, set_change_new_music_estimiate] =
    useState(0);
  const [change_marketing_budget, set_change_marketing_budget] = useState(0);
  const [change_artist_advance, set_change_artist_advance] = useState(0);
  const [
    total_of_Advance_and_Marketing_budget,
    setTotal_of_Advance_and_Marketing_budget,
  ] = useState(0);
  const [Recoupment_Period_months, setRecoupment_Period_months] = useState(0);
  const [
    Recoupment_Period_months_in_English,
    setRecoupment_Period_months_in_English,
  ] = useState(0);

  function getSingleTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  const handleRadioChange = (event) => {
    setLicenceType(event.target.value);
  };
  //artist Advanced
  const new_music_estimiate_given_market_budget = (value) => {
    if (value === 0) {
      set_artist_advance(0);
      calculate_Recoupment_income_And_period(0);
    } else {
      const artist_advance_payment = value;
      set_artist_advance(artist_advance_payment);

      const Marketing_budget_payment = change_marketing_budget;
      setTotal_of_Advance_and_Marketing_budget(
        Math.round(artist_advance_payment + Marketing_budget_payment)
      );

      const dataByMonthArray = Object.entries(monthlyIncome).map(
        ([key, value]) => ({
          date: key,
          income: value.income,
        })
      );
      const sortedData = dataByMonthArray.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const monthsArray = sortedData.map((data) => data?.date);
      const Monthlyincome = sortedData?.map((data) => data?.income);
      const lastsixmonthincome = Monthlyincome.slice(-7, -1);
      const sum_of_last_six_month_income = lastsixmonthincome.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      console.log("sum_of_last_six_month_income", lastsixmonthincome);
      calculate_Recoupment_income_And_period(sum_of_last_six_month_income);
    }
  };

  // const new_music_estimiate_given_market_budget = (value) => {
  //   if (value === 0) {
  //     set_artist_advance(0);
  //     calculate_Recoupment_income_And_period(0);
  //   } else {
  //     const artist_advance_payment =
  //       ((new_music_estimiate + totalFunding) * value) / 100;
  //     set_artist_advance(artist_advance_payment);
  //     const Marketing_budget_payment =
  //       ((new_music_estimiate + totalFunding) * change_marketing_budget) / 100;
  //     setTotal_of_Advance_and_Marketing_budget(
  //       Math.round(artist_advance_payment + Marketing_budget_payment)
  //     );
  //     const dataByMonthArray = Object.entries(monthlyIncome).map(
  //       ([key, value]) => ({
  //         date: key,
  //         income: value.income,
  //       })
  //     );
  //     const sortedData = dataByMonthArray.sort(
  //       (a, b) => new Date(a.date) - new Date(b.date)
  //     );
  //     const monthsArray = sortedData.map((data) => data?.date);
  //     const Monthlyincome = sortedData?.map((data) => data?.income);
  //     const lastsixmonthincome = Monthlyincome.slice(-7, -1);
  //     const sum_of_last_six_month_income = lastsixmonthincome.reduce(
  //       (accumulator, currentValue) => accumulator + currentValue,
  //       0
  //     );
  //     console.log("sum_of_last_six_month_income", lastsixmonthincome);
  //     calculate_Recoupment_income_And_period(sum_of_last_six_month_income);
  //   }
  // };

  //Marketing Budget
  const calculate_marketing_budget = (value) => {
    if (value === 0) {
      set_marketing_budget(0);
    } else {
      const cal_marketing_budget =
        ((new_music_estimiate + totalFunding) * value) / 100;
      set_marketing_budget(cal_marketing_budget);
      setTotal_of_Advance_and_Marketing_budget(
        Math.round(cal_marketing_budget + artist_advance)
      );
      const dataByMonthArray = Object.entries(monthlyIncome).map(
        ([key, value]) => ({
          date: key,
          income: value.income,
        })
      );
      const sortedData = dataByMonthArray.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const monthsArray = sortedData.map((data) => data?.date);
      const Monthlyincome = sortedData?.map((data) => data?.income);
      const lastsixmonthincome = Monthlyincome.slice(-7, -1);
      const sum_of_last_six_month_income = lastsixmonthincome.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      console.log("sum_of_last_six_month_income", lastsixmonthincome);
      calculate_Recoupment_income_And_period(sum_of_last_six_month_income);
    }
  };
  const [chartData, setChartData] = useState({
    labels: [
      "2022-08-31",
      "2022-09-01",
      "2022-09-02",
      "2022-09-03",
      "2022-09-04",
      "2022-09-05",
      "2022-09-06",
      "2022-09-07",
      "2022-09-08",
      "2022-09-09",
      "2022-09-10",
      "2022-09-11",
      "2022-09-12",
      "2022-09-13",
      "2022-09-14",
      "2022-09-15",
      "2022-09-16",
      "2022-09-17",
      "2022-09-18",
      "2022-09-19",
      "2022-09-20",
      "2022-09-21",
      "2022-09-22",
      "2022-09-23",
      "2022-09-24",
      "2022-09-25",
      "2022-09-26",
      "2022-09-27",
      "2022-09-28",
      "2022-09-29",
      "2022-09-30",
      "2022-10-01",
      "2022-10-02",
      "2022-10-03",
      "2022-10-04",
      "2022-10-05",
      "2022-10-06",
      "2022-10-07",
      "2022-10-08",
      "2022-10-09",
      "2022-10-10",
      "2022-10-11",
      "2022-10-12",
      "2022-10-13",
      "2022-10-14",
      "2022-10-15",
      "2022-10-16",
      "2022-10-17",
      "2022-10-18",
      "2022-10-19",
      "2022-10-20",
      "2022-10-21",
      "2022-10-22",
      "2022-10-23",
      "2022-10-24",
      "2022-10-25",
      "2022-10-26",
      "2022-10-27",
      "2022-10-28",
      "2022-10-29",
      "2022-10-30",
    ],
    datasets: [
      {
        label: "Spotify",
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        backgroundColor: "rgb(60, 179, 113)",
        borderColor: "rgb(60, 179, 113)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
      },
    ],
  });
  const calculate_Recoupment_income_And_period = (Value) => {
    const avgSixMonthRevenue = Value / 6;
    const no_of_month =
      total_of_Advance_and_Marketing_budget / avgSixMonthRevenue;
    console.log("Value", Value);
    console.log("(AVG Monthly Revenue)", avgSixMonthRevenue);
    console.log("No of months to compleste:", no_of_month);
    const decimalNumber = no_of_month + 6;
    const referenceYear = 2023; // Provide your reference year here
    let RecoupmentIncome = [];
    const year = Math.floor(decimalNumber / 12) + referenceYear;
    const month = decimalNumber % 12;
    setRecoupment_Period_months(Math.round(no_of_month));
    console.log(Recoupment_Period_months);

    console.log(year, Math.round(month));
    const date = new Date(`${year}-${Math.round(month)}-01`);
    const monthName = date.toLocaleString("en-US", { month: "short" });
    setRecoupment_Period_months_in_English(`${year}-${monthName}`);
    console.log("monthName", `${year}-${monthName}`);
  };
  useEffect(() => {
    const dataByMonthArray = Object.entries(monthlyIncome).map(
      ([key, value]) => ({
        date: key,
        income: value.income,
      })
    );
    const sortedData = dataByMonthArray.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const monthsArray = sortedData.map((data) => data?.date);
    const Monthlyincome = sortedData?.map((data) => data?.income);
    const lastsixmonthincome = Monthlyincome.slice(-7, -1);
    const sum_of_last_six_month_income = lastsixmonthincome.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log("sum_of_last_six_month_income", lastsixmonthincome);
    calculate_Recoupment_income_And_period(sum_of_last_six_month_income);
    const monthNames = monthsArray.map((monthNumber) => {
      const [year, month] = monthNumber.split("-");
      const date = new Date(`${year}-${month}-01`);
      const monthName = date.toLocaleString("en-US", { month: "short" });
      return `${year}-${monthName}`;
    });
    // monthNames.push(`${year}-${monthName}`)
    // RecoupmentIncome[12]=(Monthlyincome[12]);
    // RecoupmentIncome[13]=total_of_Advance_and_Marketing_budget;
    let data = {
      labels: monthNames,
      datasets: [
        {
          label: "Monthly Income $",
          backgroundColor: "rgb(60, 179, 113)",
          borderColor: "rgb(60, 179, 113)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: Monthlyincome,
        },
        // {
        //   label: "Recoupment Income $",
        //   backgroundColor: " rgb(255,0,0)",
        //   borderColor: "rgb(255,0,0)",
        //   borderWidth: 2,
        //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //   hoverBorderColor: "rgba(255,99,132,1)",
        //   data: RecoupmentIncome,
        // },
      ],
    };
    setChartData(data);
  }, [monthlyIncome]);
  const ariaLabel = { "aria-label": "description" };

  const [contractLength, setContractLength] = useState(contract_length); // Initialize with the value from the backend
  const [recoupmentRate, setRecoupmentRate] = useState(catelog_income); // Initialize with the value from the backend

  const handleContractLengthChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 12) {
      setContractLength(value);
    } else if (event.target.value === "") {
      setContractLength(""); // Allow clearing the input field
    }
  };

  const handleRecoupmentRate = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setRecoupmentRate(value);
    } else if (event.target.value === "") {
      setRecoupmentRate("");
    }
  };
  // console.log("Chart Dataset", chartData.datasets[0].data);
  const dataValues = chartData.datasets[0].data;
  const maxDataValue = Math.max(...dataValues);
  const yAxisMax = maxDataValue + maxDataValue * 0.1;
  // const [data, setSeries] = useState([chartData.datasets[0].data]);
  console.log("y = ", yAxisMax);
  const options = {
    series: [
      {
        name: "Income",
        data: dataValues,
      },
    ],
    option: {
      chart: {
        height: 550,
        type: "line",
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        type: "Monthly",
        categories: chartData.labels,
        tickAmount: 10,
      },
      // title: {
      //   text: "Recoupment Period",
      //   align: "left",
      //   style: {
      //     fontSize: "16px",
      //     color: "white",
      //   },
      // },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#1BFB5E"],
          type: "horizontal",
          stops: [0, 0, 0, 0],
        },
      },
      yaxis: {
        min: 0,
        max: yAxisMax,
      },
    },
  };
  return (
    <>
      <Box className={classess.header}>
        <Box className={classess.saveBtn}>
          <Button
            variant="contained"
            startIcon={<LiaSaveSolid />}
            onClick={onClick}
          >
            Save
          </Button>
        </Box>
      </Box>
      <Box varient="div" component="div" className={classess.page}>
        <Box
          varient="div"
          component="div"
          className={classess.page__slider_container}
          mt={4}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__slider_container__slider_box}
          >
            <span
              className={classess.page__slider_container__slider_box__title}
            >
              License Type
            </span>
            <Stack direction="row" gap={3}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={licenceType}
                  defaultValue={licenceType}
                  name="radio-buttons-group"
                  onChange={handleRadioChange}
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <FormControlLabel
                    value="license"
                    control={
                      <Radio
                        sx={{
                          color: "#4ffcb7",
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                      />
                    }
                    onChange={(e) => setLicenceType(e.target.value)}
                    label="License"
                  />
                  <FormControlLabel
                    value="buyout"
                    control={
                      <Radio
                        sx={{
                          color: "#4ffcb7",
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                      />
                    }
                    label="Buyout"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Box>
        </Box>

        {licenceType === "license" && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    flexWrap: "wrap",
                    gap: "30px",
                    mt: 5,
                  }}
                >
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__slider_container}
                    mt={2}
                  >
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__slider_container__slider_box}
                    >
                      <span
                        className={
                          classess.page__slider_container__slider_box__title
                        }
                      >
                        Length of Contract
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        className={classess.mainInputField}
                      >
                        <Input
                          value={contractLength}
                          onChange={handleContractLengthChange}
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={classess.inputFileds}
                        />
                        <span className={classess.yrs}>yrs</span>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          ml: 1,
                        }}
                      >
                        Input Should be 1 to 12
                      </Typography>
                      {/* <Box
                varient='div'
                component='div'
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={3}
                  value={contract_length}
                  min={1}
                  max={12}
                  step={1}
                  marks
                  aria-label='Default'
                  valueLabelDisplay='auto'
                  name='contract_length'
                  onChange={(e) => {
                    set_contract_length(e.target.value);
                  }}
                  onChangeCommitted={async (e, v) => {
                    setMultiple(v);

                    dispatch(setIsLoading(true));

                    let selected_tracks =
                      selected.length > 0
                        ? selected.map((e) => getSingleTrack(e))
                        : tracks;

                    const new_music = newMusicTracks.map((e) =>
                      getSingleTrack(e)
                    );

                    let val = {
                      included_music,
                      contract_length: v,
                      catelog_income,
                      new_music_income,
                      selected_tracks,
                      new_music_tracks: new_music,
                    };

                    calcalute_tracks_estimate(val);
                  }}
                />
                <span
                  component='div'
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  {contract_length} Years
                </span>
              </Box> */}
                    </Box>
                  </Box>

                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__slider_container}
                    mt={2}
                  >
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__slider_container__slider_box}
                    >
                      <span
                        className={
                          classess.page__slider_container__slider_box__title
                        }
                      >
                        RECOUPMENT RATE
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        className={classess.mainInputField}
                      >
                        <Input
                          value={recoupmentRate}
                          onChange={handleRecoupmentRate}
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={classess.inputFileds}
                        />
                        <span className={classess.yrs}>&nbsp; %</span>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          ml: 1,
                        }}
                      >
                        Input Should be 1 to 100
                      </Typography>
                      {/* <Box
                varient='div'
                component='div'
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={10}
                  value={catelog_income}
                  aria-label='Default'
                  valueLabelDisplay='auto'
                  onChange={(e) => {
                    set_catelog_income(e.target.value);
                  }}
                  onChangeCommitted={async (e, v) => {
                    set_catelog_income(v);

                    dispatch(setIsLoading(true));

                    let selected_tracks =
                      selected.length > 0
                        ? selected.map((e) => getSingleTrack(e))
                        : tracks;

                    const new_music = newMusicTracks.map((e) =>
                      getSingleTrack(e)
                    );

                    let val = {
                      included_music,
                      contract_length,
                      catelog_income: v,
                      new_music_income,
                      selected_tracks,
                      new_music_tracks: new_music,
                    };

                    calcalute_tracks_estimate(val);
                  }}
                />
                <span
                  component='div'
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  {catelog_income} %
                </span>
              </Box> */}
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    // justifyContent: "center",
                    alignContent: "center",
                    flexWrap: "wrap",
                    gap: "30px",
                    mt: 5,
                  }}
                >
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__slider_container}
                    mt={2}
                  >
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__slider_container__slider_box}
                    >
                      <span
                        className={
                          classess.page__slider_container__slider_box__title
                        }
                      >
                        Artist's Advance
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        className={classess.mainInputField}
                      >
                        <span className={classess.dollar}>$</span>

                        <Input
                          type="number"
                          className={`${classess.inputFileds} ${classess.dollarField}`}
                          sx={{ pl: 2 }}
                          defaultValue={0}
                          value={change_new_music_estimiate}
                          aria-label="Default"
                          valueLabelDisplay="auto"
                          onChange={(e) => {
                            set_change_new_music_estimiate(e.target.value);
                            new_music_estimiate_given_market_budget(
                              e.target.value
                            );
                          }}
                          onChangeCommitted={async (e, v) => {
                            new_music_estimiate_given_market_budget(v);
                          }}
                        />
                        {/* <span className={classess.yrs}>$</span> */}
                      </Box>
                      {/* <Box
                varient='div'
                component='div'
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={0}
                  value={change_new_music_estimiate}
                  aria-label='Default'
                  valueLabelDisplay='auto'
                  onChange={(e) => {
                    set_change_new_music_estimiate(e.target.value);
                    new_music_estimiate_given_market_budget(e.target.value);
                  }}
                  onChangeCommitted={async (e, v) => {
                    console.log("v", v);
                    new_music_estimiate_given_market_budget(v);
                  }}
                />
                <span
                  component='div'
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  ${" "}
                  {internationalNumberFormat.format(Math.round(artist_advance))}
                </span>
              </Box> */}
                    </Box>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__slider_container}
                    mt={2}
                  >
                    <Box
                      varient="div"
                      component="div"
                      className={classess.page__slider_container__slider_box}
                    >
                      <span
                        className={
                          classess.page__slider_container__slider_box__title
                        }
                      >
                        Marketing Budget
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                        className={classess.mainInputField}
                      >
                        <span className={classess.dollar}>$</span>
                        <Input
                          defaultValue={internationalNumberFormat.format(
                            Math.round(marketing_budget)
                          )}
                          inputProps={ariaLabel}
                          className={`${classess.inputFileds} ${classess.dollarField}`}
                          sx={{ pl: 2 }}
                        />
                      </Box>
                      {/* <Box
                varient='div'
                component='div'
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={0}
                  value={change_marketing_budget}
                  aria-label='Default'
                  valueLabelDisplay='auto'
                  onChange={(e) => {
                    set_change_marketing_budget(e.target.value);
                    calculate_marketing_budget(e.target.value);
                  }}
                  onChangeCommitted={async (e, v) => {
                    calculate_marketing_budget(v);
                  }}
                />
                <span
                  component='div'
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  {/* {marketing_budget} */}
                      {/* ${" "} */}
                      {/* {internationalNumberFormat.format(Math.round(marketing_budget))} */}
                      {/* </span> */}
                      {/* </Box> */}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                className={classess.page__totalSpend}
                sx={
                  {
                    // border: "1px solid #4FFCB7",
                    // width: "40%",
                    // padding: "20px",
                    // height: "280px",
                    // borderRadius: "12px",
                    // display: "flex",
                    // flexDirection: "column",
                    // justifyContent: "space-between",
                    // // gap: "20px",
                  }
                }
              >
                <Box className={classess.walletImg}>
                  <img src={WalletImg} alt="" />
                  <Box className={classess.walletContent}>
                    <Box>
                      <span
                        className={
                          classess.page__slider_container__slider_box__title
                        }
                      >
                        TOTAL SPEND
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "38px", fontWeight: "bold" }}
                          className={classess.fontSize}
                        >
                          ${" "}
                          {internationalNumberFormat
                            .format(total_of_Advance_and_Marketing_budget)
                            .slice(0, -1)
                            .replace(/,/g, "").length > 0
                            ? internationalNumberFormat
                                .format(total_of_Advance_and_Marketing_budget)
                                .slice(0, -1)
                                .replace(/,/g, "")
                            : "0"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <span
                        className={
                          classess.page__slider_container__slider_box__title
                        }
                      >
                        RECOUPMENT PERIOD
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1 },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "38px", fontWeight: "bold" }}
                          className={classess.fontSize}
                        >
                          {Recoupment_Period_months +
                            " Months ~ " +
                            Recoupment_Period_months_in_English}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {/* <Box>
                <span
                  className={classess.page__slider_container__slider_box__title}
                >
                  TOTAL SPEND
                </span>
                <Box
                  sx={{
                    "& > :not(style)": { m: 1 },
                  }}
                >
                  <Typography sx={{ fontSize: "38px", fontWeight: "bold" }}>
                    ${" "}
                    {internationalNumberFormat
                      .format(total_of_Advance_and_Marketing_budget)
                      .slice(0, -1)
                      .replace(/,/g, "").length > 0
                      ? internationalNumberFormat
                          .format(total_of_Advance_and_Marketing_budget)
                          .slice(0, -1)
                          .replace(/,/g, "")
                      : "0"}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <span
                  className={classess.page__slider_container__slider_box__title}
                >
                  RECOUPMENT PERIOD
                </span>
                <Box
                  sx={{
                    "& > :not(style)": { m: 1 },
                  }}
                >
                  <Typography sx={{ fontSize: "38px", fontWeight: "bold" }}>
                    {Recoupment_Period_months +
                      " Months ~ " +
                      Recoupment_Period_months_in_English}
                  </Typography>
                </Box>
              </Box> */}
              </Box>
            </Box>

            {/* <Box varient='div' component='div' className={classess.page__main}>
            <Box varient='div' component='div' className={classess.page__field}>
              <span className={classess.page__field__title}>Total Cost</span>
              <input
                className={classess.page__field__input}
                value={
                  "$ " +
                  internationalNumberFormat.format(
                    total_of_Advance_and_Marketing_budget
                  )
                }
              />
            </Box>
            <Box varient='div' component='div' className={classess.page__field}>
              <span className={classess.page__field__title}>
                Recoupment Period
              </span>
              <input
                className={classess.page__field__input}
                value={
                  Recoupment_Period_months +
                  " Months ~ " +
                  Recoupment_Period_months_in_English
                }
              />
            </Box>
            <Box
              varient='div'
              component='div'
              className={classess.page__field}
            ></Box>
          </Box> */}

            {authUser.role === "admin" && (
              <Box
                varient="div"
                component="div"
                className={classess.page__main}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__field}
                >
                  <span className={classess.page__field__title}>
                    Blended DSP Rate
                  </span>
                  <input
                    className={classess.page__field__input}
                    defaultValue={funding_metadata?.dsp_rate}
                    value={funding_metadata?.dsp_rate}
                    min={0}
                    max={0.005}
                    maxLength={6}
                    minLength={3}
                    onChange={(e) => {
                      if (e.target.value <= 0.005) {
                        set_funding_metadata((prevState) => ({
                          ...prevState,
                          dsp_rate: e.target.value,
                        }));
                      } else {
                        toast.warning("DPS Rate invalid");
                      }
                    }}
                  />
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__field}
                >
                  <span className={classess.page__field__title}>
                    Missing Report Compensation Rate
                  </span>
                  <input
                    className={classess.page__field__input}
                    defaultValue={
                      funding_metadata?.missing_reports_compensation
                    }
                    value={funding_metadata?.missing_reports_compensation}
                    max={3.5}
                    maxLength={4}
                    minLength={1}
                    onChange={(e) => {
                      if (e.target.value <= 3.5) {
                        set_funding_metadata((prevState) => ({
                          ...prevState,
                          missing_reports_compensation: e.target.value,
                        }));
                      } else {
                        toast.warning(
                          "Missing Reports Compensation value invalid"
                        );
                      }
                    }}
                  />
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__field}
                >
                  <button
                    onClick={() => updateArtistFunding()}
                    className={classess.page__button}
                  >
                    Save
                  </button>
                </Box>
              </Box>
            )}
          </>
        )}

        {licenceType === "buyout" && (
          <Box
            varient="div"
            component="div"
            className={classess.page__slider_container}
            mt={2}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__slider_container__slider_box}
            >
              <span
                className={classess.page__slider_container__slider_box__title}
              >
                Multiple
              </span>
              <Box
                varient="div"
                component="div"
                className={classess.page__slider_container__slider_box__slider}
              >
                <CustomSliderWithStyles
                  defaultValue={30}
                  min={1}
                  max={30}
                  value={multiple}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e) => setMultiple(e.target.value)}
                  onChangeCommitted={async (e, v) => {
                    setMultiple(v);

                    dispatch(setIsLoading(true));

                    let selected_tracks =
                      selected.length > 0
                        ? selected.map((e) => getSingleTrack(e))
                        : tracks;

                    // await Promise.all(
                    //   selected.map((y) => {
                    //     tracks
                    //       .filter((track) => track.id === y)
                    //       .map((e) => {
                    //         selected_tracks.push(e);
                    //       });
                    //   })
                    // );

                    const new_music = newMusicTracks.map((e) =>
                      getSingleTrack(e)
                    );

                    let val = {
                      included_music,
                      contract_length: 1,
                      catelog_income,
                      new_music_income: 100,
                      selected_tracks,
                      multiple: v,
                      new_music_tracks: new_music,
                    };
                    set_contract_length(1);
                    calcalute_tracks_estimate(val);
                  }}
                />
                <span
                  component="div"
                  className={
                    classess.page__slider_container__slider_box__slider__text
                  }
                >
                  {multiple}x
                </span>
              </Box>
            </Box>
          </Box>
        )}
        {/* <Line
        data={chartData}
        options={{
          maintainAspectRatio: true,
          scales: {
            y: {
              stacked: false,
              grid: {
                display: true,
                color: "rgba(255,99,132,0.2)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          legend: { display: true, position: "bottom" },
        }}
      /> */}
        {/* <Chartapexline chartdata={chartData.datasets[0].data} /> */}

        <Box sx={{ mt: 3 }}>
          <Box>
            <Typography
              sx={{
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                paddingBottom: "10px",
              }}
            >
              Recoupment Period
            </Typography>
          </Box>
          <Chartapexline
            options={options.option}
            series={options.series}
            height={500}
            type={"line"}
          />
        </Box>
      </Box>
    </>
  );
};

export default CustomizedConfig;
