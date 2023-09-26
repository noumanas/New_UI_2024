import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import classess from "./style.module.scss";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modal";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { config as URLconfig } from "../../enviorment/enviorment";
import Container from "@mui/material/Container";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

//Syling of Range Button
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: "#00cd98",
    border: "1px solid #00cd98",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function TrackChartPopup() {
  const track = useSelector((state) => state.modal.data);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [select, setSelect] = useState(13);
  const [title, set_title] = useState();
  const dispatch = useDispatch();

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

  const handleChange = (event) => {
    setSelect(event.target.value);
    getData(track?.id, event.target.value);
  };
  useEffect(() => {
    set_title(track?.title);
    getData(track?.id, 13);
  }, [track]);

  //get data for create chart Analytic for single track
  async function getData(id, selector) {
    var dates = [];
    var newdates;
    var spotify_data = [];
    var youtube_data = [];
    var titok_data = [];
    var data;
    var sts;
    try {
      const datalocal = await axios.get(
        `${URLconfig.BASE_URL}/artist-tracks/${id}/track`
      );
      const s_Date = datalocal.data.data.historic.spotify;
      const y_Date = datalocal.data.data.historic.youtube;
      const t_Date = datalocal.data.data.historic.tiktok;
      const dataByMonth = {};
      const dataByMonth_youtube = {};
      const dataByMonth_tiktok = {};

      //one year data convert into monthly streaming spotify
      for (const item of s_Date) {
        const date = new Date(item.date);
        const month = date.getMonth() + 1; // January is 0, so add 1 to get 1-based month number
        const year = date.getFullYear();
        const key = `${year}-${month}`;
        if (!dataByMonth[key]) {
          dataByMonth[key] = {
            streams_total: 0,
            date: 0,
            count: 0,
          };
        }
        dataByMonth[key].streams_total += item.streams_total;
        dataByMonth[key].count++;
        dataByMonth[key].date = `${year}-${month}`;
      }
      //one year data convert into monthly Youtube views
      for (const item of y_Date) {
        const date = new Date(item.date);
        const month = date.getMonth() + 1; // January is 0, so add 1 to get 1-based month number
        const year = date.getFullYear();
        const key = `${year}-${month}`;
        if (!dataByMonth_youtube[key]) {
          dataByMonth_youtube[key] = {
            video_views_total: 0,
            count: 0,
            date: 0,
          };
        }
        dataByMonth_youtube[key].video_views_total += item.video_views_total;
        dataByMonth_youtube[key].count++;
        dataByMonth_youtube[key].date = `${year}-${month}`;
      }
      //one year data convert into monthly Tiktok views
      // for (const item of t_Date) {
      //   const date = new Date(item.date);
      //   const month = date.getMonth() + 1; // January is 0, so add 1 to get 1-based month number
      //   const year = date.getFullYear();
      //   const key = `${year}-${month}`;
      //   if (!dataByMonth_tiktok[key]) {
      //     dataByMonth_tiktok[key] = {
      //       views_total: 0,
      //       comments_total: 0,
      //       count: 0,
      //       date: 0,
      //     };
      //   }
      //   dataByMonth_tiktok[key].views_total += item.views_total;
      //   dataByMonth_tiktok[key].comments_total += item.comments_total;
      //   dataByMonth_tiktok[key].count++;
      //   dataByMonth_tiktok[key].date = `${year}-${month}`;
      // }
      //object convert to array for Spotify
      const dataByMonthArray = Object.entries(dataByMonth).map(
        ([key, value]) => ({
          month: key,
          streams_total: value.streams_total,
          count: value.count,
        })
      );
      const monthsArray = dataByMonthArray.map((data) => data.month);
      const streamsTotalArray = dataByMonthArray.map(
        (data) => data.streams_total
      );
      //object convert to for youtube
      const dataByMonthYoutube = Object.entries(dataByMonth_youtube).map(
        ([key, value]) => ({
          month: key,
          video_views_total: value.video_views_total,
          count: value.count,
        })
      );

      const youtubeDates = dataByMonthYoutube.map((data) => data.month);
      // Find the months missing in dataByMonthYoutube
      const monthsToAdd = Object.keys(dataByMonth).filter((month) => {
        return !dataByMonthYoutube.some((data) => data.month === month);
      });
      monthsToAdd.forEach((month) => {
        if (!youtubeDates.includes(month)) {
          const dataFromDataByMonth = dataByMonth[month];
          if (dataFromDataByMonth) {
            dataByMonthYoutube.unshift(dataFromDataByMonth);
          }
        }
      });
      // if(monthsArray <youtubeDates){
      //   dataByMonthYoutube.splice(0, 0, test);
      // }
      const totalYoutubeViews = dataByMonthYoutube.map(
        (data) => data.video_views_total
      );

      //object convert to for tiktok
      //   const dataByMonthTiktok = Object.entries(dataByMonth_tiktok).map(([key, value]) => ({
      //     month: key,
      //     views_total: value.views_total,
      //     comments_total: value.comments_total,
      //     count: value.count,
      // }));
      // const totalTiktokViews = dataByMonthTiktok.map((data) => data.views_total);
      for (let i = 0; i < s_Date.length; i++) {
        dates.push(s_Date[i].date);
        spotify_data.push(s_Date[i].streams_total || 0);
      }
      // for (let i = 0; i < t_Date.length; i++) {
      //   titok_data.push(t_Date[i].views_total || 0);
      // }
      for (let i = 0; i < y_Date.length; i++) {
        youtube_data.push(y_Date[i].video_views_total || 0);
      }

      data = {
        labels: monthsArray.slice(0, selector),
        datasets: [
          {
            label: "Spotify",
            backgroundColor: "rgb(60, 179, 113)",
            borderColor: "rgb(60, 179, 113)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: streamsTotalArray.slice(0, selector),
          },
          {
            label: "Youtube",
            backgroundColor: "Red",
            borderColor: "Red",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: totalYoutubeViews.slice(0, selector),
          },
          // {
          //   label: "Tiktok",
          //   backgroundColor: "rgb(0, 98, 136)",
          //   borderColor: "rgb(0, 98, 136)",
          //   borderWidth: 2,
          //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
          //   hoverBorderColor: "rgba(255,99,132,1)",
          //   data: totalTiktokViews.slice(0, selector),
          // },
        ],
      };
      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  }
  //   getData();
  return (
    <div>
      <Modal
        keepMounted
        open={isOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box varient="div" component="div" className={classess.page}>
          <Container>
            <Box
              varient="div"
              component="div"
              className={classess.page__dialog}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__dialog__header}
              >
                <span className={classess.page__dialog__header__title}>
                  Track Analytics :{title}
                </span>
              </Box>
              <Box
                className={classess.page__dialog__form__field_container__select}
              >
                <Select
                  value={select}
                  onChange={handleChange}
                  sx={{ color: "#000", marginTop: "20px" }}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={13}>Monthly</MenuItem>
                  {/* <MenuItem value={28}>Last 28 days</MenuItem>
                  <MenuItem value={60}>Last 60 days</MenuItem> */}
                </Select>
              </Box>

              <Line
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
              />
              <Box
                varient="div"
                component="div"
                className={classess.page__dialog__form__actions}
              >
                <Stack
                  direction="row"
                  gap={5}
                  sx={{
                    marginTop: "20px",
                    width: { xs: "auto", sm: "auto", lg: "auto" },
                  }}
                >
                  <Button
                    variant="contained"
                    type="button"
                    className={classess.page__dialog__form__actions__cancel_btn}
                    onClick={() => dispatch(closeModal())}
                  >
                    Close
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
