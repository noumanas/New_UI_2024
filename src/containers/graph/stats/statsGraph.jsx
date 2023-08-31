import React, { useEffect, useState } from "react";

import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Chart from "react-google-charts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { config as URLconfig } from "../../../../src/enviorment/enviorment";

const BubbleMaps = ({}) => {
  const artist = useSelector((state) => state.artist.artist);
  const [united_states, set_united_states] = useState(0);
  const [Russia, set_RU] = useState(0);
  const [United_Kingdom, set_united_kingdom] = useState(0);
  const [France, set_France] = useState(0);
  const [Germany, set_Germany] = useState(0);
  const [Australia, set_Australia] = useState(0);
  const [Finland, set_Finland] = useState(0);
  const [Norway, set_Norway] = useState(0);
  const [Ireland, set_Ireland] = useState(0);
  const [Sweden, set_Sweden] = useState(0);
  const [Mexico, set_Mexico] = useState(0);
  const [Brazil, set_Brazil] = useState(0);
  const [Turkey, set_Turkey] = useState(0);
  const [Poland, set_Poland] = useState(0);
  const [Spain, set_Spain] = useState(0);
  const [Canada, set_Canada] = useState(0);
  const [India, set_India] = useState(0);
  const [Pak, set_Pak] = useState(0);

  const data2 = [
    ["Country", "Monthly Listeners"],
    ["United Kingdom", United_Kingdom],
    ["United States", united_states],
    ["Australia", Australia],
    ["Finland", Finland],
    ["Germany", Germany],
    ["France", France],
    ["RU", Russia],
    ["Norway", Norway],
    ["Ireland", Ireland],
    ["Sweden", Sweden],
    ["Mexico", Mexico],
    ["Brazil", Brazil],
    ["Turkey", Turkey],
    ["Poland", Poland],
    ["Spain", Spain],
    ["Canada", Canada],
    ["India", India],
    ["Pakistan", Pak],
  ];
  const geo_options = {
    backgroundColor: "transparent",
    colorAxis: { colors: ["#ffffff", "blue", "#d62976"] },
  };

  async function drawChart() {
    // Create the data table.
    axios
  .get(`${URLconfig.BASE_URL}/audience/${artist?.spotify_id}`)
  .then((country_data_resp) => {
    let total_current_listner_US = 0;
    let total_current_listner_RU = 0;
    let total_current_listner_FR = 0;
    let total_current_listner_DE = 0;
    let total_current_listner_GB = 0;
    let total_current_listner_AU = 0;
    let total_current_listner_FI = 0;
    let total_current_listner_NO = 0;
    let total_current_listner_IE = 0;
    let total_current_listner_SE = 0;
    let total_current_listner_MX = 0;
    let total_current_listner_BR = 0;
    let total_current_listner_TR = 0;
    let total_current_listner_PL = 0;
    let total_current_listner_ES = 0;
    let total_current_listner_CA = 0;
    let total_current_listner_IN = 0;
    let total_current_listner_PK = 0;
    for (
      var i = 0;
      i < country_data_resp.data.data.audience[0].data.monthly_listeners.length;
      i++
    ) {
      let country_code =
        country_data_resp.data.data.audience[0].data.monthly_listeners[i]
          .country_code;
      let current_listenrs =
        country_data_resp.data.data.audience[0].data.monthly_listeners[i]
          .current_listeners;
      if (country_code === "US") {
        total_current_listner_US += current_listenrs;
      } else if (country_code === "RU") {
        total_current_listner_RU += current_listenrs;
      } else if (country_code === "FR") {
        total_current_listner_FR += current_listenrs;
      } else if (country_code === "DE") {
        total_current_listner_DE += current_listenrs;
      } else if (country_code === "GB") {
        total_current_listner_GB += current_listenrs;
      } else if (country_code === "AU") {
        total_current_listner_AU += current_listenrs;
      } else if (country_code === "FI") {
        total_current_listner_FI += current_listenrs;
      } else if (country_code === "NO") {
        total_current_listner_NO += current_listenrs;
      } else if (country_code === "IE") {
        total_current_listner_IE += current_listenrs;
      } else if (country_code === "SE") {
        total_current_listner_SE += current_listenrs;
      } else if (country_code === "MX") {
        total_current_listner_MX += current_listenrs;
      } else if (country_code === "BR") {
        total_current_listner_BR += current_listenrs;
      } else if (country_code === "TR") {
        total_current_listner_TR += current_listenrs;
      } else if (country_code === "PL") {
        total_current_listner_PL += current_listenrs;
      } else if (country_code === "ES") {
        total_current_listner_ES += current_listenrs;
      } else if (country_code === "CA") {
        total_current_listner_CA += current_listenrs;
      } else if (country_code === "IN") {
        total_current_listner_IN += current_listenrs;
      } else if (country_code === "PK") {
        total_current_listner_PK += current_listenrs;
      }
    } 
    set_united_states(total_current_listner_US);
    set_RU(total_current_listner_RU);
    set_united_kingdom(total_current_listner_GB);
    set_France(total_current_listner_FR);
    set_Germany(total_current_listner_DE);
    set_Australia(total_current_listner_AU);
    set_Finland(total_current_listner_FI);
    set_Norway(total_current_listner_NO);
    set_Ireland(total_current_listner_IE);
    set_Sweden(total_current_listner_SE);
    set_Mexico(total_current_listner_MX);
    set_Brazil(total_current_listner_BR);
    set_Turkey(total_current_listner_TR);
    set_Poland(total_current_listner_PL);
    set_Spain(total_current_listner_ES);
    set_Canada(total_current_listner_CA);
    set_India(total_current_listner_IN);
    set_Pak(total_current_listner_PK);
    
  })
  .catch((error) => {
    console.log("artist stats error", error);
    
   // Call another API here
   axios.post(`${URLconfig.BASE_URL}/songstats/stats/audience/${artist?.spotify_id}`)
   .then((res) => {
     // Handle the response from the second API call
     // ...
   })
   .catch((error) => {
     console.log("second API error", error);
   });
   
  });
    

    
  }

  useEffect(() => {
    if (artist) {
      drawChart();
    }
  }, [artist]); // eslint-disable-next-line

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
          <Box component="div" variant="div" sx={{ color: "#fff" }}>
            Artist Most Popular Territories
          </Box>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                },
              },
            ]}
            chartType="GeoChart"
            width={"100%"}
            height={"100%"}
            data={data2}
            options={geo_options}
          />
        </Box>
      </Box>
    </>
  );
};
export default BubbleMaps;
