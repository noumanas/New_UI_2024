import React, { useEffect, useRef, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getArtist,
  getArtistById,
  getReports,
  setIsLoading,
  setLicenceType,
  setMultiple,
  setNewMusicTracks,
  setSelectedTrackCount,
  setSelectedTracks,
  setTotalFunding,
  setTotalTracks,
  setTracks,
} from "../../redux/slice/artist";
import { closeModal } from "../../redux/slice/modal";
import { IconButton } from "@mui/material";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import AddTracks from "../../components/add-track/add-track";
import EditTrackModel from "../../components/edit-track-popup/edit-track-popup";
import TrackChart from "../../components/track-chart/track-chart";

import { viewFundingDashboardSelectUseStyles } from "../../custom-mui-style/custom-mui-styles";
import VerifyContainer from "../../components/view-funding-dashboard-items/verify/container/verify-container";
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import VerifyConfig from "../../components/view-funding-dashboard-items/verify/config/verify-config";
import SendConfig from "../../components/view-funding-dashboard-items/send/config/send-config";
import ConfirmConfig from "../../components/view-funding-dashboard-items/confirm/config/confirm-config";

import FundingDetails from "../../components/view-funding-dashboard-items/funding-details/funding-details";
import CustomizedContainer from "../../components/view-funding-dashboard-items/customize/container/customize-container";
import CustomizedConfig from "../../components/view-funding-dashboard-items/customize/config/customize-config";
import InitiateContract from "../../components/view-funding-dashboard-items/initiate_contract/initiate-contract";

import Grid from "@mui/material/Grid";
import { Button, Stack, Typography } from "@mui/material";
import usePDF from "../../hooks/usePdf";
import {
  getLastMontStreamGrowthRate,
  getPercentage,
  getSecondLastMonthGrowthRate,
  monthsOptions,
} from "../../utils/helper";
import { toast } from "react-toastify";
import SignStepper from "../../containers/my-contracts/sign-stepper/SignStepper";
import PayStepper from "../../containers/my-contracts/pay-stepper/PayStepper";
import { SignalWifiStatusbarConnectedNoInternet4Sharp } from "@mui/icons-material";
import { getNewMusicByID } from "../../redux/slice/new-music";
import { getYearlyIncomeArtistByID } from "../../redux/slice/income";
const ViewFundingDashboard = () => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const { id } = useParams();
  const pdf = usePDF();
  const selected_tracks_ids = useSelector(
    (state) => state.artist.selectedTracks
  );
  const artist = useSelector((state) => state.artist.artist);
  const totalFunding = useSelector((state) => state.artist.totalFunding);
  const newMusicData = useSelector((state) => state.new_music.newMusic);

  const [masterEst, setMasterEst] = useState([]);
  const isLoading = useSelector((state) => state.artist.isLoading);
  const selected = useSelector((state) => state.artist.selectedTracks);
  const totalTracks = useSelector((state) => state.artist.totalTracks);
  const modalName = useSelector((state) => state.modal.name);
  const [included_music, set_included_music] = useState(null);
  const [contract_length, set_contract_length] = useState(null);
  const [catelog_income, set_catelog_income] = useState(null);
  const [new_music_income, set_new_music_income] = useState(null);
  const [artist_advance, set_artist_advance] = useState(null);
  const [marketing_budget, set_marketing_budget] = useState(null);
  const newMusicTracks = useSelector((state) => state.artist.newMusicTracks);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [customize_funding, set_customize_funding] = useState(0);
  const [new_music_estimiate, setNewMusicEst] = useState(0);
  const [funding_metadata, set_funding_metadata] = useState(null);
  const [updating, setUpdating] = useState(false);
  const tracks = useSelector((state) => state.artist.tracks);
  const monthNames = monthsOptions.map((month) => month.value);
  const user = useSelector((state) => state.auth.user);
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [historicTracks, sethistoricTracks] = useState([]);
  const licenseType = useSelector((state) => state.artist.licenseType);
  const multiple = useSelector((state) => state.artist.multiple);
  const [RECOUPMENTPERIOD, setRECOUPMENTPERIOD] = useState(0);
  const [RECOUPMENTPERIOD_IN_ENG, setRECOUPMENTPERIOD_IN_ENG] = useState("");
  const [SingleCount, setSingleCount] = useState(0);
  const [EpCount, setEpCount] = useState(0);
  const [AlbumCount, setAlbumCount] = useState(0);
  const [EstimatedYearlyEarnings, setEstimatedYearlyEarnings] = useState(0);

  const d = new Date();
  d.setDate(d.getDate() - 1);

  const handleCloseModal = () => {
    dispatch(closeModal({ name: "track-chart", data: "" }));
  };

  window.addEventListener("popstate", () => {
    handleCloseModal();
  });

  useEffect(() => {
    if (id) {
      dispatch(
        getArtistById({
          id,
        })
      );
    }
  }, [id]);

  useEffect(() => {
    // dispatch(getArtist());
    dispatch(setLicenceType("license"));
    dispatch(setMultiple(30));
    dispatch(setTotalFunding(0));
    dispatch(setTotalTracks(0));
    dispatch(setTracks([]));
  }, []);

  useEffect(() => {
    dispatchRef.current(setTotalFunding(0));
    dispatchRef.current(setTotalTracks(0));
    dispatchRef.current(setTracks([]));
  }, [dispatchRef]);

  const historicTrackData = async (spotify_id) => {
    axios
      .get(`${URLconfig.BASE_URL}/artist-tracks/historic/${spotify_id}`)
      .then(async (res) => {
        const artistTracks = await res.data.data;
        sethistoricTracks(artistTracks);
        // calcalute_Monthly_estimate(artistTracks);
      });
  };

  let fetchNewMusic = (artist_id) => {
    dispatch(
      getNewMusicByID({
        id: artist_id,
      })
    );
  };

  useEffect(() => {
    if (newMusicData) {
      const epCount = newMusicData.filter((item) => item.music === "ep").length;
      const singleCount = newMusicData.filter(
        (item) => item.music === "single"
      ).length;
      const albumeCount = newMusicData.filter(
        (item) => item.music === "album"
      ).length;
      setSingleCount(singleCount);
      setEpCount(epCount);
      setAlbumCount(albumeCount);
    }
  }, [newMusicData]);

  useEffect(() => {
    if (artist?.spotify_id !== undefined) {
      // calcalute_Monthly_estimate();
      fetchNewMusic(artist.spotify_id);

      const fetchTracks = async (spotify_id) => {
        axios
          .get(`${URLconfig.BASE_URL}/artist-tracks/${spotify_id}`)
          .then(async (res) => {
            const artistTracks = await res.data;
            if (artistTracks?.data.length === 0) {
              dispatch(setIsLoading(false));
            } else {
              let selected_tracks = artistTracks?.data
                .filter((track) => track.is_selected === 1)
                .map((el) => el._id);

              let new_music_selected_tracks = artistTracks?.data
                .filter((track) => track.is_selected === 2)
                .map((el) => el._id);

              dispatch(setSelectedTrackCount(selected_tracks.length));
              dispatch(setSelectedTracks(selected_tracks));
              dispatch(setNewMusicTracks(new_music_selected_tracks));

              dispatch(setTracks([...artistTracks.data.map(mapTracks)]));
              dispatch(setTotalTracks(artistTracks.data.length));
            }
          })
          .catch((error) => {
            console.log("Error Of GetTracks " + error);
          });
      };

      dispatch(getReports(artist.spotify_id));
      fetchTracks(artist?.spotify_id);
    }
  }, [artist]);

  //calculate the Monthly Income
  // async function calcalute_Monthly_estimate() {
  //   axios
  //     .post(
  //       `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}/MonthlyCalculation`
  //     )
  //     .then((res) => {
  //       console.log("mon:", res.data.data);
  //       setMonthlyIncome(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  useEffect(() => {
    if (artist?.spotify_id !== undefined) {
      const getArtistFundingMetaData = async () => {
        if (artist?.spotify_id !== undefined) {
          let endpoint = `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}`;
          const artist_funding_response = await axios.get(endpoint);
          const artist_funding_data = artist_funding_response.data["data"];
          set_funding_metadata(artist_funding_data);
          set_contract_length(artist_funding_data.contract_length);
          set_new_music_income(artist_funding_data.new_music_income);
          set_catelog_income(artist_funding_data.catelog_income);
          set_artist_advance(artist_funding_data?.artist_advance);
          set_marketing_budget(artist_funding_data?.marketing_budget);
          const id = artist?.spotify_id;
          const data = await dispatch(getYearlyIncomeArtistByID({ id }));
          const totalIncome = data.payload.data.reduce(
            (acc, current) => acc + current.income,
            0
          );
          setEstimatedYearlyEarnings(totalIncome);
        }
      };
      dispatchRef.current(setIsLoading(true));
      getArtistFundingMetaData();
    }
  }, [artist, dispatchRef]);

  const handleOpen = () => setOpen(true);

  const handleClose = (res) => {
    setOpen(false);
    if (res) {
      dispatch(
        getArtistById({
          id,
        })
      );
    }
  };

  const onChangeHandler = () => {
    dispatch(setIsLoading(true));
    const selected_tracks =
      selected.length > 0
        ? selected.map((e) => getSingleTrack(e))
        : tracks
            .filter((track) => track.is_selected === 1)
            .map((checkedtracks) => checkedtracks);

    // setFirstTime(false);

    const new_music = newMusicTracks.map((e) => getSingleTrack(e));

    const val = {
      included_music,
      contract_length,
      catelog_income,
      new_music_income,
      selected_tracks: selected_tracks.length > 0 ? selected_tracks : tracks,
      new_music_tracks: new_music,
    };

    calcalute_tracks_estimate(val);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getSingleTrack(id) {
    return tracks.filter((track) => track.id === id)[0];
  }

  const calcalute_tracks_estimate = async (data) => {
    if (funding_metadata) {
      try {
        const controller = new AbortController();

        // data["selected_tracks"] = data.selected_tracks || [];
        // data["new_music_tracks"] = data.new_music_tracks || [];

        let options = {
          signal: controller.signal,
        };

        const response = await axios.post(
          `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}/customize`,
          data,
          options
        );

        let x =
          isNaN(parseInt(multiple)) === true ? multiple : parseInt(multiple);

        let funding =
          licenseType === "license"
            ? response.data?.data?.funding
            : parseInt(response.data?.data?.funding) * x;

        dispatch(setTotalFunding(funding));

        let new_music_income =
          licenseType === "license" ? response.data.data?.new_music_income : 0;

        setNewMusicEst(new_music_income);

        setMasterEst(response.data.data?.master_estimated_revenue);

        dispatch(setIsLoading(false));
        controller.abort();
      } catch (error) {
        console.log("Error Of Customize Funding " + error);
      }
    }
  };
  const calcalute_Year_income_by_tracks = async (data) => {
    try {
      const controller = new AbortController();

      // data["selected_tracks"] = data.selected_tracks || [];
      // data["new_music_tracks"] = data.new_music_tracks || [];

      let options = {
        signal: controller.signal,
      };

      const response = await axios.post(
        `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}/MonthlyCalculation`,
        data
      );
      const startDate = "2022-9";
      const endDate = "2023-8";

      const totalIncomeInRange = sumIncomeWithinRange(
        response.data.data,
        startDate,
        endDate
      );
      setMonthlyIncome(response.data.data);
      // setEstimatedYearlyEarnings(totalIncomeInRange);

      controller.abort();
    } catch (error) {
      console.log("Error Of Customize Funding " + error);
    }
  };
  function sumIncomeWithinRange(data, startDate, endDate) {
    let totalIncome = 0;

    for (const key in data) {
      if (key >= startDate && key <= endDate) {
        totalIncome += data[key].income;
      }
    }

    return totalIncome;
  }
  const calcalute_customize_funding_estimate = null;

  const downloadPDF = async () => {
    const year = contract_length === 1 ? "Year" : "Years";
    const length_of_contract = `${contract_length} ${year}`;
    const artist_name = artist.name;
    const catalog_income_artist_keep = `${catelog_income}%`;

    const prefix = "$";

    let total_master_est = 0;

    for (var i = 0; i < masterEst.length; i++) {
      total_master_est += Math.round(parseFloat(masterEst[i]).toFixed(2));
    }

    const masters_estimiate_revenue =
      prefix + internationalNumberFormat.format(total_master_est);

    let newmusic_estimiate_revenue =
      new_music_estimiate < 0
        ? prefix + "0"
        : prefix + internationalNumberFormat.format(new_music_estimiate);

    const funding_estimiate_revenue =
      prefix +
      internationalNumberFormat.format(totalFunding + new_music_estimiate);

    const shares_purchases = "30%";

    let selected_tracks =
      selected_tracks_ids.length > 0
        ? selected_tracks_ids.map((e) => getSingleTrack(e))
        : tracks;

    let trows = [];
    let total_tracks = selected_tracks.length;

    for (var t = 0; t < total_tracks; t++) {
      let masterEstBySingle =
        prefix + internationalNumberFormat.format(Math.round(masterEst[t]));

      let publishESTbySingle = prefix + "0";

      trows[t] = {
        title: selected_tracks[t].title,
        masters_estimiate_revenue: masterEstBySingle,
        publishing_estimiate_revenue: publishESTbySingle,
        ownership: `${selected_tracks[t].stream_income_share}%`,
      };
    }

    const payload = {
      artist_name,
      shares_purchases,
      funding_estimiate_revenue,
      newmusic_estimiate_revenue,
      masters_estimiate_revenue,
      tracks: trows,
      total_tracks,
      length_of_contract,
      catalog_income_artist_keep,
      deal_type: "Existing Catalogue Only",
      created_at: new Date().toLocaleDateString(),
    };

    pdf.downloadPDF(payload);
  };

  async function updateArtistFunding() {
    if (artist?.spotify_id !== undefined) {
      const data = {
        missing_reports_compensation:
          funding_metadata?.missing_reports_compensation,
        catelog_income: funding_metadata?.catelog_income,
        dsp_rate: funding_metadata?.dsp_rate,
      };

      const response = await axios.put(
        `${URLconfig.BASE_URL}/artist-funding/${artist?.spotify_id}`,
        data
      );

      if (response.status === 200) {
        onChangeHandler();
        // calcalute_Monthly_estimate();
      }

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      toast.success("Saved Successfully");
    }
  }

  function createAlbum(id) {
    let album = tracks.filter((track) => track.release_date === id);
    let tracktype;
    if (album.length > 1) {
      tracktype = "album";
    } else {
      tracktype = "single";
    }

    return tracktype;
  }

  const updateTrack = async (
    spotify_artist_id,
    songstats_track_id,
    track_id
  ) => {
    try {
      const response = await axios.get(
        `${URLconfig.BASE_URL}/songstats/spotify/tracks/${songstats_track_id}/${spotify_artist_id}`
      );
      const json = response.data;
      const data = json.data;

      const response2 = await axios.get(
        `${URLconfig.BASE_URL}/songstats/spotify/tracks/historic_stats/${songstats_track_id}/${spotify_artist_id}`
      );
      const historic = response2.data?.data;

      //this is for Monthly Streaming

      let spotify = [];
      let tiktok = [];
      let youtube = [];

      for (let i = 1; i < historic.stats[0].data.history.length; i++) {
        let SportifyEndDate = historic.stats[0].data.history[i].streams_total;
        let SportifyStartDate =
          historic.stats[0].data.history[i - 1].streams_total;
        let date = historic.stats[0].data.history[i].date;
        let popularity_current =
          historic.stats[0].data.history[i].popularity_current;
        let streams_total = SportifyEndDate - SportifyStartDate;
        spotify.push({ date, streams_total, popularity_current });
      }

      for (let i = 1; i < historic.stats[2].data.history.length; i++) {
        let TiktokEndDate = historic.stats[2].data.history[i].views_total;
        let TiktokStartDate = historic.stats[2].data.history[i - 1].views_total;
        let comments_total = historic.stats[2].data.history[i].comments_total;
        let likes_total = historic.stats[2].data.history[i].likes_total;
        let shares_total = historic.stats[2].data.history[i].shares_total;
        let videos_total = historic.stats[2].data.history[i].videos_total;
        let date = historic.stats[2].data.history[i].date;
        let views_total = TiktokEndDate - TiktokStartDate;
        tiktok.push({
          date,
          views_total,
          comments_total,
          likes_total,
          shares_total,
          videos_total,
        });
      }

      for (let i = 1; i < historic.stats[3].data.history.length; i++) {
        let YoutubeEndDate =
          historic.stats[3].data.history[i].video_views_total;
        let YoutubeStartDate =
          historic.stats[3].data.history[i - 1].video_views_total;
        let date = historic.stats[3].data.history[i].date;
        let video_comments_total =
          historic.stats[3].data.history[i].video_comments_total;
        let video_likes_total =
          historic.stats[3].data.history[i].video_likes_total;
        let video_views_total = YoutubeEndDate - YoutubeStartDate;
        youtube.push({
          date,
          video_views_total,
          video_comments_total,
          video_likes_total,
        });
      }
      // createAlbum(data.track_info["release_date"]);

      let historicObj = {
        spotify,
        tiktok,
        youtube,
      };

      let last_month = await getLastMontStreamGrowthRate(historicObj);
      let second_last_month = await getSecondLastMonthGrowthRate(historicObj);
      let growth_rate = await getPercentage(last_month, second_last_month);

      const track = {
        spotify_artist_id: spotify_artist_id,
        songstats_track_id: data.track_info["songstats_track_id"],
        isrc: "",
        track_type: await createAlbum(data.track_info["release_date"]),
        title: data.track_info["title"],
        track_img: data.track_info["avatar"],
        release_date: data.track_info["release_date"] || "2022-01-05",
        spotify_streams_total: data.stats[0].data["streams_total"] || 0,
        spotify_playlist_reach_total:
          data.stats[0].data["playlist_reach_total"] || 0,
        deezer_reach_total: data.stats[1].data["playlist_reach_total"] || 0,
        tiktok_views_total: data.stats[2].data["views_total"] || 0,
        tiktok_reach_total: data.stats[2].data["likes_total"] || 0,
        youtube_likes_total: data.stats[3].data["video_likes_total"] || 0,
        youtube_video_views_total: data.stats[3].data["video_views_total"] || 0,
        stream_income_share: 100,
        is_selected: 0,
        historic: {
          spotify,
          tiktok,
          youtube,
        },
        last_streams_growth: {
          last_month: last_month,
          second_last_month: second_last_month,
          growth_rate: growth_rate,
        },
      };

      await axios.put(`${URLconfig.BASE_URL}/artist-tracks/${track_id}`, track);
    } catch (error) {
      console.log("Error Occured" + error);
    }
  };

  const updateTrackBulk = async () => {
    setUpdating(true);

    for (var i = 0; i < tracks.length; i++) {
      await updateTrack(
        artist?.spotify_id,
        tracks[i].songstats_track_id,
        tracks[i].id
      );
    }

    axios
      .put(`${URLconfig.BASE_URL}/artists/${artist._id}`, artist)
      .then(() => {
        setUpdating(false);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  const mapTracks = (track) => ({
    id: track._id,
    title: track.title,
    image: track.track_img,
    stream_income_share: track.stream_income_share,
    spotify_streams_total: track.spotify_streams_total,
    youtube_video_views_total: track.youtube_video_views_total,
    tiktok_views_total: track.tiktok_views_total,
    deezer_reach_total: track.deezer_reach_total,
    tiktok_shares_total: track.tiktok_shares_total,
    isrc: track.isrc,
    genres: track.genres,
    release_date: track.release_date,
    track_type: track.track_type,
    is_selected: track.is_selected,
    songstats_track_id: track.songstats_track_id,
    historic: track.historic,
    last_streams_growth: track.last_streams_growth,
  });

  const styles = viewFundingDashboardSelectUseStyles();
  const [openNewMusicForm, setOpenNewMusicForm] = useState(false);
  const openConfirmConfigTab = () => {
    setValue("4");
    setOpenNewMusicForm(true);
  };
  const closeNewMusicForm = () => {
    setOpenNewMusicForm(false);
  };
  const openConfirmConfigTab2 = () => {
    setValue("2");
    setBorderColor("black");
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  // const [activeTab, setActiveTab] = useState(1);
  const [contractOpen, setContractOpen] = useState(false);
  // const [openTab, setOpenTab] = useState(false);
  const openConfirmConfigTab3 = () => {
    setValue("10");
    setContractOpen(true);
    // setOpenTab(true);
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  const [borderColor, setBorderColor] = useState("black");
  const [borderRadius, setBorderRadius] = useState("0");
  const [isContentVisible, setContentVisibility] = useState(false);
  const [showTextValues, setShowTextValues] = useState(false);
  const [artAdvance, setArtAdvance] = useState("");
  const [marketBudget, setMarketBudget] = useState("");
  // let saveBorder = localStorage.getItem("borderColor") || "black";
  // let saveRadius = localStorage.getItem("saveRadius") || "12px";
  // let saveContract = localStorage.getItem("saveContract") || false;
  // console.log(saveBorder);
  const handleButtonClick = () => {
    setBorderColor(borderColor === "black" ? "#4FFCB7" : "black");
    setBorderRadius("12px");
    setShowTextValues(true);
    setContentVisibility(true);
    // saveBorder = saveBorder === "black" ? "#4FFCB7" : "black";
    // saveRadius = borderRadius ? "12px" : "0";
    // saveContract = isContentVisible ? false : true;
    // localStorage.setItem("borderColor", saveBorder);
    // localStorage.setItem("saveRadius", saveRadius);
    // localStorage.setItem("saveContract", saveContract);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // localStorage.setItem("artistadvance", artAdvance);
    // localStorage.setItem("setMarketBudget", marketBudget);
    // localStorage.setItem("setShowTextValues", showTextValues);
    // localStorage.setItem("BorderColor", borderColor);
  };
  // useEffect(() => {
  //   const savedValue = localStorage.getItem("artistadvance");
  //   const setMarket = localStorage.getItem("setMarketBudget");

  //   if (savedValue !== null) {
  //     setArtAdvance(savedValue);
  //   }
  //   if (setMarket !== null) {
  //     setMarketBudget(setMarket);
  //   }
  // }, []);
  const artAdvInter = internationalNumberFormat.format(artAdvance);
  const markBudInter = internationalNumberFormat.format(marketBudget);

  return (
    // <Container maxWidth="xxl" className={styles.root}>
    <Container maxWidth="xxl" className={`${styles.root} custom-root`}>
      <Grid container item className={classess.page}>
        <Grid
          item
          md={12}
          lg={12}
          xl={10}
          sm={12}
          className={classess.page__config}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__config__box}
          >
            {/* <Stack
              spacing={5}
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              style={{ width: "100%" }}
            >
              <Box>
                <p style={{ color: "#ccc" }}>
                  <small>
                    <i>
                      Latest Updated: {new Date(artist?.updatedAt).getUTCDate()}
                      /{monthNames[new Date(artist?.updatedAt).getUTCMonth()]}/
                      {new Date(artist?.updatedAt).getUTCFullYear()}
                    </i>
                  </small>
                </p>
              </Box>
              {new Date(artist?.updatedAt) < d && (
                <Box>
                  {updating === false ? (
                    <Button size='small' onClick={() => updateTrackBulk()}>
                      Update
                    </Button>
                  ) : (
                    <p style={{ color: "#ccc" }}>
                      <small>
                        <i>Please wait, Processing</i>
                      </small>
                    </p>
                  )}
                </Box>
              )}
            </Stack> */}

            <FundingDetails
              contract_length={contract_length}
              currentTab={value}
              artist={artist}
              internationalNumberFormat={internationalNumberFormat}
              totalFunding={totalFunding}
              customize_funding={customize_funding}
              totalTracks={totalTracks}
              new_music_estimiate={new_music_estimiate}
              setValue={setValue}
              openPanel={openConfirmConfigTab}
              openPanel2={openConfirmConfigTab2}
              borderColor={borderColor}
              borderRadius={borderRadius}
              isContentVisible={isContentVisible}
              contractPanel={openConfirmConfigTab3}
              artist_advance={artist_advance}
              marketing_budget={marketing_budget}
              showTextValues={showTextValues}
              RECOUPMENTPERIOD={RECOUPMENTPERIOD}
              RECOUPMENTPERIOD_IN_ENG={RECOUPMENTPERIOD_IN_ENG}
              SingleCount={SingleCount}
              EpCount={EpCount}
              AlbumCount={AlbumCount}
              EstimatedYearlyEarnings={EstimatedYearlyEarnings}
            />

            <Container maxWidth="xxl">
              <TabContext value={value}>
                <Box
                  varient="div"
                  component="div"
                  className={`${classess.page__config__box__tabs} ${
                    value === "10" && contractOpen
                      ? classess.page__config__box__tabs__border
                      : ""
                  }`}
                  sx={{ overflow: "hidden" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    className={classess.tabList}
                  >
                    <Tab
                      className={classess.page__config__box__tabs__tab}
                      label="Historical Music"
                      value="1"
                      disabled={isLoading}
                      sx={{
                        "& .Mui-selected": {},
                      }}
                    />
                    <Tab
                      className={classess.page__config__box__tabs__tab}
                      label="New Music"
                      value="4"
                      disabled={isLoading}
                      sx={{
                        "& .Mui-selected": {},
                      }}
                      onClick={() => setOpenNewMusicForm(false)}
                    />
                    <Tab
                      className={classess.page__config__box__tabs__tab}
                      label="Customize"
                      value="2"
                      disabled={isLoading}
                      sx={{
                        "& .Mui-selected": {},
                      }}
                    />
                    <Tab
                      className={classess.page__config__box__tabs__tab}
                      label="Upload"
                      value="3"
                      disabled={isLoading}
                      sx={{
                        "&.Mui-selected": {},
                      }}
                    />
                    {/* <Tab
                      className={classess.page__config__box__tabs__tab}
                      label="Sign"
                      value="5"
                      disabled={isLoading}
                      sx={{
                        "&.Mui-selected": {},
                      }}
                    /> */}
                    {/* <Tab
                      className={classess.page__config__box__tabs__tab}
                      label="pay"
                      value="6"
                      disabled={isLoading}
                      sx={{
                        "&.Mui-selected": {},
                      }}
                    /> */}
                  </TabList>
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__config__box__panel}
                >
                  <TabPanel
                    // sx={{
                    //   color: "#FFFFFF",
                    //   padding: "12px",
                    //   backgroundColor: "#222C41",
                    //   borderRadius: "0px 0px 12px 12px",
                    // }}
                    value="1"
                  >
                    <VerifyConfig
                      handleOpen={handleOpen}
                      included_music={included_music}
                      contract_length={contract_length}
                      catelog_income={catelog_income}
                      new_music_income={new_music_income}
                      calcalute_tracks_estimate={calcalute_tracks_estimate}
                      calcalute_Year_income_by_tracks={
                        calcalute_Year_income_by_tracks
                      }
                      artist={artist}
                    />
                  </TabPanel>
                  <TabPanel
                    // sx={{ color: "#FFFFFF", padding: "12px" }}
                    value="2"
                  >
                    <CustomizedConfig
                      set_included_music={set_included_music}
                      set_contract_length={set_contract_length}
                      set_catelog_income={set_catelog_income}
                      set_new_music_income={set_new_music_income}
                      included_music={included_music}
                      contract_length={contract_length}
                      catelog_income={catelog_income}
                      new_music_income={new_music_income}
                      funding_metadata={funding_metadata}
                      calcalute_customize_funding_estimate={
                        calcalute_customize_funding_estimate
                      }
                      totalFunding={totalFunding}
                      calcalute_tracks_estimate={calcalute_tracks_estimate}
                      set_funding_metadata={set_funding_metadata}
                      updateArtistFunding={updateArtistFunding}
                      set_customize_funding={set_customize_funding}
                      artist_id={artist?.spotify_id}
                      new_music_estimiate={new_music_estimiate}
                      monthlyIncome={monthlyIncome}
                      set_artist_advance={set_artist_advance}
                      artist_advance={artist_advance}
                      set_marketing_budget={set_marketing_budget}
                      marketing_budget={marketing_budget}
                      internationalNumberFormat={internationalNumberFormat}
                      onClick={handleButtonClick}
                      artAdvance={artAdvance}
                      setArtAdvance={setArtAdvance}
                      marketBudget={marketBudget}
                      setMarketBudget={setMarketBudget}
                      downloadPDF={downloadPDF}
                      isPending={pdf.isPending}
                      setRECOUPMENTPERIOD={setRECOUPMENTPERIOD}
                      setRECOUPMENTPERIOD_IN_ENG={setRECOUPMENTPERIOD_IN_ENG}
                    />
                  </TabPanel>
                  <TabPanel
                    // sx={{ color: "#FFFFFF", padding: "12px" }}
                    value="3"
                  >
                    <SendConfig
                      totalFunding={totalFunding}
                      contract_length={contract_length}
                      catelog_income={catelog_income}
                    />
                  </TabPanel>
                  <TabPanel
                    // sx={{ color: "#FFFFFF", padding: "12px" }}
                    value="4"
                  >
                    <ConfirmConfig
                      calcalute_tracks_estimate={calcalute_tracks_estimate}
                      included_music={included_music}
                      contract_length={contract_length}
                      catelog_income={catelog_income}
                      new_music_income={new_music_income}
                      set_new_music_income={set_new_music_income}
                      artist_id={artist?.spotify_id}
                      openNewMusicForm={openNewMusicForm}
                      closeNewMusicForm={closeNewMusicForm}
                    />
                  </TabPanel>

                  {/* <TabPanel
                    sx={{ color: "#FFFFFF", padding: "12px" }}
                    value="5"
                  >
                    <SignStepper
                      contract_length={contract_length}
                    ></SignStepper>
                  </TabPanel> */}
                  {/* <TabPanel
                    sx={{ color: "#FFFFFF", padding: "12px" }}
                    value="6"
                  >
                    <PayStepper
                      artist_advance={artist_advance}
                      marketing_budget={marketing_budget}
                    ></PayStepper>
                  </TabPanel> */}
                </Box>
                <TabPanel
                  sx={{
                    // color: "#FFFFFF",
                    mt: 2,
                    // borderRadius: "12px",
                    "&.MuiTabPanel-root": {
                      padding: "0px",
                    },
                  }}
                  value="10"
                >
                  <InitiateContract
                    contract_length={contract_length}
                    artist_advance={artist_advance}
                    marketing_budget={marketing_budget}
                  />
                  {/* <Box className={classess.page__config__box__customPanel}>
                    <Box className={classess.contractContainer}>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#4FFCB7",
                          textTransform: "uppercase",
                        }}
                      >
                        lets get started
                      </Typography>
                      <Box className={classess.contractList}>
                        <Box
                          className={classess.list}
                          style={{
                            height: containerHeight1 + "px",
                            overflow:
                              containerHeight1 === 300 ? "hidden" : "unset",
                            transition: "height 0.3s ease",
                          }}
                        >
                          <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>
                            Contract Details
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <IconButton
                              sx={{
                                backgroundColor: "#4ffcb7",
                                color: "#000000",
                                width: "30px",
                                height: "30px",
                                transition: "color 3s ease",
                                ":hover": {
                                  backgroundColor: "#4ffcb7",
                                  color: "#000000",
                                },
                              }}
                              onClick={toggleHeight1}
                            >
                              {containerHeight1 === 300 ? (
                                <IoIosArrowForward />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                        <Box
                          className={classess.list}
                          style={{
                            height: containerHeight2 + "px",
                            overflow:
                              containerHeight2 === 300 ? "hidden" : "unset",
                            transition: "height 0.3s ease",
                          }}
                        >
                          <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>
                            Payment Details
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <IconButton
                              sx={{
                                backgroundColor: "#4ffcb7",
                                color: "#000000",
                                width: "30px",
                                height: "30px",
                                transition: "color 3s ease",
                                ":hover": {
                                  backgroundColor: "#4ffcb7",
                                  color: "#000000",
                                },
                              }}
                              onClick={toggleHeight2}
                            >
                              {containerHeight2 === 300 ? (
                                <IoIosArrowForward />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                        <Box
                          className={classess.list}
                          style={{
                            height: containerHeight3 + "px",
                            overflow:
                              containerHeight3 === 300 ? "hidden" : "unset",
                            transition: "height 0.3s ease",
                          }}
                        >
                          <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>
                            Review Details
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <IconButton
                              sx={{
                                backgroundColor: "#4ffcb7",
                                color: "#000000",
                                width: "30px",
                                height: "30px",
                                transition: "color 3s ease",
                                ":hover": {
                                  backgroundColor: "#4ffcb7",
                                  color: "#000000",
                                },
                              }}
                              onClick={toggleHeight3}
                            >
                              {containerHeight3 === 300 ? (
                                <IoIosArrowForward />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box> */}
                </TabPanel>
              </TabContext>
            </Container>
          </Box>
        </Grid>
        {/* <Grid item md={12} lg={10} xl={10} className={classess.page__container}>
          {value === "1" && (
            <Box
              varient="div"
              component="div"
              className={classess.page__container__box}
            >
              <VerifyContainer
                artist={artist}
                included_music={included_music}
                contract_length={contract_length}
                catelog_income={catelog_income}
                new_music_income={new_music_income}
                updateArtistFunding={updateArtistFunding}
              />
            </Box>
          )}

          {value === "2" && (
            <Box
              varient="div"
              component="div"
              className={classess.page__container__box}
            >
              <CustomizedContainer
                isPending={pdf.isPending}
                downloadPDF={downloadPDF}
              />
            </Box>
          )}
        </Grid> */}
      </Grid>
      <AddTracks
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        spotifyId={artist?.spotify_id}
      />
      {modalName === "edit-track" && <EditTrackModel />}
      {modalName === "track-chart" && <TrackChart />}
    </Container>
  );
};

export default ViewFundingDashboard;
