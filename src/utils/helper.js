const daysInAMonth = {
  1: 31,
  2: 31,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const monthsOptions = [
  {
    key: "Jan",
    value: "January",
  },
  {
    key: "Feb",
    value: "February",
  },
  {
    key: "Mar",
    value: "March",
  },
  {
    key: "Apr",
    value: "April",
  },
  {
    key: "May",
    value: "May",
  },
  {
    key: "Jun",
    value: "June",
  },
  {
    key: "Jul",
    value: "July",
  },
  {
    key: "Aug",
    value: "August",
  },
  {
    key: "Sep",
    value: "September",
  },
  {
    key: "Oct",
    value: "October",
  },
  {
    key: "Nov",
    value: "November",
  },
  {
    key: "Dec",
    value: "December",
  },
];

function handleDatesToDate(date) {
  let calculatedDate = "";

  const today = new Date();
  const target = new Date(date);

  let todayDate = today.getDate();
  let targetDate = target.getDate();

  let monthDiff = today.getMonth() - target.getMonth();

  if (monthDiff === 0) {
    const diff = todayDate - targetDate;
    if (diff === 0) {
      calculatedDate = "Today";
    } else {
      calculatedDate = diff + " days ago";
    }
  }
  if (monthDiff === 1) {
    const getLastMonthDays = daysInAMonth[target.getMonth() + 1];
    todayDate += getLastMonthDays;
    const diff = todayDate - targetDate;

    if (diff === getLastMonthDays) {
      calculatedDate = "1 Month ago";
    } else {
      calculatedDate = diff + " days ago";
    }
  } else {
    calculatedDate = `May ${target.getDate()}, ${target.getFullYear()}`;
  }

  return calculatedDate;
}

function tableSortingAlgo(list, currentSortBy) {
  if (list && list.length) {
    const records = [...list];
    const compareFunction = (i, j) => {
      if (i[currentSortBy] < j[currentSortBy]) {
        return -1;
      } else {
        if (i[currentSortBy] > j[currentSortBy]) {
          return 1;
        } else {
          return 0;
        }
      }
    };
    return records.sort(compareFunction);
  } else {
    return [];
  }
}

const scrollTopObserver = () => window.scrollTo(0, 0);

const getFullYearWithRange = (range) => {
  if (!range) {
    return new Date().getFullYear();
  }

  return new Date().getFullYear() - range;
};

const abbreviateNumber = (value) => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

const getSecondLastMonthGrowthRate = (track_streams_historic) => {
  var spotifymonthOFSep = 0;
  // var tiktokmonthOFSep = 0;
  var youtubemonthOFSep = 0;

  if (track_streams_historic) {
    for (let j = 1; j <= 30; j++) {
      let dates = track_streams_historic.spotify[j]?.date;

      let d1 = new Date();
      d1.setMonth(d1.getMonth() - 2);

      let x = d1.getMonth() + 1;

      let startDate = `${d1.getFullYear()}-${x}-${d1
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      console.log(startDate);

      let d2 = new Date();
      d2.setDate(0);
      d2.setMonth(d2.getMonth() - 1);
      let endDate = `${d2.getFullYear()}-${d2.getMonth() + 1}-${d2.getDate()}`;

      if (dates >= startDate && dates <= endDate) {
        var Sperday = 0;
        var Yperday = 0;
        // var Tperday = 0;
        if (track_streams_historic.spotify[j]?.streams_total !== undefined) {
          Sperday = track_streams_historic.spotify[j]?.streams_total;
          spotifymonthOFSep += Sperday;
          if (
            track_streams_historic.youtube[j]?.video_views_total !== undefined
          ) {
            Yperday = track_streams_historic.youtube[j]?.video_views_total;
            youtubemonthOFSep += Yperday;
          }
        } else {
          console.log("Error From Else");
        }
      }
    }
  }

  var total_SEPT_Streams = spotifymonthOFSep + youtubemonthOFSep;

  return total_SEPT_Streams;
};

const getLastMontStreamGrowthRate = (track_streams_historic) => {
  var spotifymonthOfOCT = 0;
  // var tiktokmonthOfOCT = 0;
  var youtubemonthOfOCT = 0;

  if (track_streams_historic) {
    for (let j = 31; j <= 61; j++) {
      let dates = track_streams_historic.spotify[j]?.date;

      let d1 = new Date();
      d1.setDate(1);
      d1.setMonth(d1.getMonth() - 2);

      let x = d1.getMonth() + 1;

      let startDate = `${d1.getFullYear()}-${x}-${d1
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      let d2 = new Date();
      let endDate = `${d2.getFullYear()}-${d2.getMonth() + 1}-${d2
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      if (dates >= startDate && dates <= endDate) {
        var Sperday = 0;
        var Yperday = 0;
        // var Tperday = 0;
        if (track_streams_historic.spotify[j]?.streams_total !== undefined) {
          Sperday = track_streams_historic.spotify[j]?.streams_total;
          spotifymonthOfOCT += Sperday;
          if (
            track_streams_historic.youtube[j]?.video_views_total !== undefined
          ) {
            Yperday = track_streams_historic.youtube[j]?.video_views_total;
            youtubemonthOfOCT += Yperday;
            // if (track_streams_historic.tiktok[j]?.views_total !== undefined) {
            //   Tperday = track_streams_historic.tiktok[j]?.views_total;
            //   tiktokmonthOfOCT += Tperday;
            // }
          }
        } else {
          console.log("Error From Else");
        }
      }
    }

    var total_OCT_Streams = spotifymonthOfOCT + youtubemonthOfOCT;

    return total_OCT_Streams;
  }
};

const getPercentage = (total_OCT_Streams, total_SEPT_Streams) => {
  if (
    total_SEPT_Streams > total_OCT_Streams ||
    total_SEPT_Streams < total_OCT_Streams
  ) {
    var increased = total_OCT_Streams - total_SEPT_Streams;
    if (increased < 0) {
      var decrease_pt = (increased / total_SEPT_Streams) * 100;
      return decrease_pt.toFixed(1);
    } else if (increased >= 0) {
      var increared_pt = (increased / total_SEPT_Streams) * 100;
      return increared_pt.toFixed(1);
    }
  }
};

const addCommasToNumber = (number) => {
  if (isNaN(number)) {
    return number; // Return the input as-is if it's not a valid number
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export {
  handleDatesToDate,
  tableSortingAlgo,
  scrollTopObserver,
  monthsOptions,
  getFullYearWithRange,
  abbreviateNumber,
  getPercentage,
  getLastMontStreamGrowthRate,
  getSecondLastMonthGrowthRate,
  addCommasToNumber,
};
