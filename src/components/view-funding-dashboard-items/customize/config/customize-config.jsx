import React, { useState, useEffect } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import { CustomSliderWithStyles } from "../../../../custom-mui-style/custom-mui-styles";
import {
  setIsLoading,
  setLicenceType,
  setMultiple,
} from "../../../../redux/slice/artist";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import WalletImg from "../../../../assets/wallet.png";
// import WalletImg from "../../../../assets/walletPng.png";
import { LiaSaveSolid } from "react-icons/lia";
import { AiOutlineCloudDownload } from "react-icons/ai";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
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
  artAdvance,
  setArtAdvance,
  marketBudget,
  setMarketBudget,
  downloadPDF,
  isPending,
  setRECOUPMENTPERIOD,
  setRECOUPMENTPERIOD_IN_ENG,
}) => {
  const multiple = useSelector((state) => state.artist.multiple);
  const licenceType = useSelector((state) => state.artist.licenseType);
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
    dispatch(setLicenceType(event.target.value));
  };

  //artist Advanced
  const new_music_estimiate_given_market_budget = (value) => {
    if (value === 0) {
      set_artist_advance(0);
      calculate_Recoupment_income_And_period(0);
    } else {
      const artist_advance_payment = value;
      set_artist_advance(artist_advance_payment);

      const Marketing_budget_payment = marketing_budget;
      setTotal_of_Advance_and_Marketing_budget(
        Math.round(
          parseInt(artist_advance_payment) +
            parseInt(Marketing_budget_payment) || 0
        )
      );

      // console.log("sum_of_last_six_month_income", lastsixmonthincome);
      // calculate_Recoupment_income_And_period(sum_of_last_six_month_income);
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
      calculate_Recoupment_income_And_period(0);
    } else {
      // const Percentage = (value/ (new_music_estimiate + totalFunding)) * 100
      const cal_marketing_budget = value;
      // ((new_music_estimiate + totalFunding) * value) / 100;
      set_marketing_budget(cal_marketing_budget);
      setTotal_of_Advance_and_Marketing_budget(
        Math.round(parseInt(cal_marketing_budget) + parseInt(artist_advance)) ||
          0
      );
      // const dataByMonthArray = Object.entries(monthlyIncome).map(
      //   ([key, value]) => ({
      //     date: key,
      //     income: value.income,
      //   })
      // );
      // const sortedData = dataByMonthArray.sort(
      //   (a, b) => new Date(a.date) - new Date(b.date)
      // );
      // const monthsArray = sortedData.map((data) => data?.date);
      // const Monthlyincome = sortedData?.map((data) => data?.income);
      // const lastsixmonthincome = Monthlyincome.slice(-7, -1);
      // const sum_of_last_six_month_income = lastsixmonthincome.reduce(
      //   (accumulator, currentValue) => accumulator + currentValue,
      //   0
      // );
      // console.log("sum_of_last_six_month_income", lastsixmonthincome);
      // calculate_Recoupment_income_And_period(sum_of_last_six_month_income);
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
  useEffect(() => {
    if (total_of_Advance_and_Marketing_budget > 0) {
      calculate_Recoupment_income_And_period();
    } else {
      console.log("error..");
    }
  }, [total_of_Advance_and_Marketing_budget]);
  const calculate_Recoupment_income_And_period = (Value) => {
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
    const avgSixMonthRevenue = sum_of_last_six_month_income / 6;
    const no_of_month =
      total_of_Advance_and_Marketing_budget / avgSixMonthRevenue;
    console.log("Value", Value);
    console.log("(AVG Monthly Revenue)", avgSixMonthRevenue);
    console.log("No of months to compleste:", no_of_month);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const decimalNumber = no_of_month + currentMonth;
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
    setRECOUPMENTPERIOD(Math.round(no_of_month));
    setRECOUPMENTPERIOD_IN_ENG(`${year}-${monthName}`);
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

  const handleContractLengthChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 12) {
      set_contract_length(value);
      dispatch(setMultiple(value));
      dispatch(setIsLoading(true));
      let selected_tracks =
        selected.length > 0 ? selected.map((e) => getSingleTrack(e)) : tracks;
      const new_music = newMusicTracks.map((e) => getSingleTrack(e));

      let val = {
        included_music,
        contract_length: value,
        catelog_income,
        new_music_income,
        selected_tracks,
        new_music_tracks: new_music,
      };

      calcalute_tracks_estimate(val);
    } else if (event.target.value === "") {
      set_contract_length(1);
    }
  };

  const handleRecoupmentRate = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      set_catelog_income(value);

      dispatch(setIsLoading(true));

      let selected_tracks =
        selected.length > 0 ? selected.map((e) => getSingleTrack(e)) : tracks;

      const new_music = newMusicTracks.map((e) => getSingleTrack(e));

      let val = {
        included_music,
        contract_length,
        catelog_income: value,
        new_music_income,
        selected_tracks,
        new_music_tracks: new_music,
      };

      calcalute_tracks_estimate(val);
    } else if (event.target.value === "") {
      set_catelog_income("");
      setChangeButton("");
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
      // forecastDataPoints: {
      //   count: 7,
      // },
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
        showAlways: false,
        labels: {
          formatter: function (value) {
            if (typeof value !== "undefined" && !isNaN(value)) {
              if (value >= 1000000) {
                return "$" + (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return "$" + (value / 1000).toFixed(1) + "K";
              } else {
                return "$" + value.toFixed(0);
              }
            } else {
              return "";
            }
          },
        },
      },
    },
  };
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputFocused2, setIsInputFocused2] = useState(false);

  const [changeButton, setChangeButton] = useState("");
  const [initialButton, setInitialValues] = useState("");
  const isInputChanged = changeButton !== initialButton;
  const buttonStyle = {
    backgroundColor: isInputChanged ? "#4ffcb7" : "#498E72",
  };
  const isLoading = useSelector((state) => state.artist.isLoading);

  return (
    <>
      <Box className={classess.header}>
        <Box className={classess.btnsPos}>
          <Box className={classess.downloadBtn}>
            <Button
              variant="contained"
              startIcon={<AiOutlineCloudDownload />}
              onClick={downloadPDF}
              disabled={isLoading}
            >
              {isPending && isPending ? (
                <div>Processing...</div>
              ) : (
                <div>Download PDF</div>
              )}
            </Button>
          </Box>
          <Box className={classess.saveBtn}>
            <Button
              variant="contained"
              startIcon={<LiaSaveSolid />}
              onClick={onClick}
              disabled={!isInputChanged}
              style={buttonStyle}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Box className={classess.searchBarMob}></Box>
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
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                        className={classess.radioBtn}
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
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                        className={classess.radioBtn}
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
                          "& > :not(style)": { m: 1, ml: 0 },
                        }}
                        className={classess.mainInputField}
                      >
                        <Input
                          value={contract_length}
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
                          // ml: 1,
                        }}
                      >
                        Input should be 1 to 12
                      </Typography>
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
                          "& > :not(style)": { m: 1, ml: 0 },
                        }}
                        className={classess.mainInputField}
                      >
                        <Input
                          value={catelog_income}
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
                          // ml: 1,
                        }}
                      >
                        Input should be 1 to 100
                      </Typography>
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
                          "& > :not(style)": { m: 1, ml: 0 },
                        }}
                        className={classess.mainInputField}
                      >
                        <span
                          className={`${classess.dollar} 
                        `}
                          style={{
                            color: isInputFocused ? "white" : "#6d7480",
                          }}
                        >
                          $
                        </span>

                        <Input
                          type="number"
                          className={`${classess.inputFileds} ${classess.dollarField}`}
                          sx={{ pl: 2 }}
                          min={0}
                          max={totalFunding}
                          value={artist_advance}
                          placeholder={"0"}
                          aria-label="Default"
                          valueLabelDisplay="auto"
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue < 0) {
                              newValue = 0;
                            } else if (newValue > totalFunding) {
                              newValue = totalFunding;
                            }
                            setChangeButton(newValue);
                            new_music_estimiate_given_market_budget(
                              e.target.value
                            );
                            set_artist_advance(newValue);
                          }}
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                        />
                        {/* onChange={(e) => {
                            set_change_new_music_estimiate(e.target.value);
                            new_music_estimiate_given_market_budget(
                              e.target.value
                            );
                          }}
                          onChangeCommitted={async (e, v) => {
                            new_music_estimiate_given_market_budget(v);
                          }} */}
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
                          "& > :not(style)": { m: 1, ml: 0 },
                        }}
                        className={classess.mainInputField}
                      >
                        <span
                          className={classess.dollar}
                          style={{
                            color: isInputFocused2 ? "white" : "#6d7480",
                          }}
                        >
                          $
                        </span>
                        <Input
                          value={marketing_budget}
                          type="number"
                          placeholder={"0"}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue < 0) {
                              newValue = 0;
                            } else if (newValue > totalFunding) {
                              newValue = totalFunding;
                            }
                            setChangeButton(newValue);
                            set_marketing_budget(newValue);
                            calculate_marketing_budget(e.target.value);
                          }}
                          inputProps={ariaLabel}
                          className={`${classess.inputFileds} ${classess.dollarField}`}
                          sx={{ pl: 2 }}
                          onFocus={() => setIsInputFocused2(true)}
                          onBlur={() => setIsInputFocused2(false)}
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
                          "& > :not(style)": { m: 1, ml: 0 },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "38px", fontWeight: "bold" }}
                          className={classess.fontSize}
                        >
                          ${" "}
                          {internationalNumberFormat.format(
                            total_of_Advance_and_Marketing_budget
                          )}
                          {/* {internationalNumberFormat
                            .format(
                              parseInt(artAdvance) + parseInt(marketBudget)
                            )
                            .slice(0, -1)
                            .replace(/,/g, "").length > 0
                            ? internationalNumberFormat
                                .format(
                                  parseInt(artAdvance) + parseInt(marketBudget)
                                )
                                .slice(0, -1)
                                .replace(/,/g, "")
                            : "0"} */}
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
                          "& > :not(style)": { m: 1, ml: 0 },
                        }}
                      >
                        <Typography
                          className={`${classess.page__slider_container__slider_box__title__recoup} ${classess.fontSize}`}
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
                    "& > :not(style)": { m:1,ml:0  },
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
                    "& > :not(style)": { m:1,ml:0  },
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
                // className={classess.page__main}
              >
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
                        Blended DSP Rate
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { mt: 2, ml: 0 },
                        }}
                        className={classess.mainInputField}
                      >
                        {/* <span className={classess.dollar}>$</span> */}

                        <Input
                          type="number"
                          className={classess.inputFileds}
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
                          sx={{ fontSize: "30px !important" }}
                        />
                      </Box>
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
                        Missing Report Compensation Rate
                      </span>
                      <Box
                        sx={{
                          "& > :not(style)": { mt: 2, ml: 0 },
                        }}
                        className={classess.mainInputField}
                      >
                        {/* <span className={classess.dollar}>$</span> */}
                        <Input
                          className={`${classess.inputFileds}`}
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
                          sx={{ fontSize: "30px !important" }}
                        />
                      </Box>
                    </Box>
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
                  </Box>{" "}
                </Box>
                {/* <Box
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
                </Box> */}
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
                  onChange={(e) => dispatch(setMultiple(e.target.value))}
                  onChangeCommitted={async (e, v) => {
                    dispatch(setMultiple(v));
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
                    // set_contract_length(1);
                    calcalute_tracks_estimate(val);
                  }}
                  sx={{
                    "& .MuiSlider-rail": {
                      backgroundImage:
                        " linear-gradient(90deg, #4C5465, #4C5465)", // Background color
                    },

                    "& .MuiSlider-thumb": {
                      backgroundColor: "#ffff", // Thumb color
                      width: "12px",
                      height: "12px",
                    },
                    "& .MuiSlider-track": {
                      borderColor: "#4ffcb7",
                      height: "2px",
                    },
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

        <Box sx={{ mt: 3 }}>
          <Box>
            <Typography className={classess.recoupHeading}>
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
