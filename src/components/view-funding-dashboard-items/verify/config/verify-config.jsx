import React, { useEffect, useRef } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LiaSaveSolid } from "react-icons/lia";
import SaveBtn from "../../../saveBtn/saveBtn";
import VerifyArtistList from "../../../verify-artists/verify-artists";
import { useDispatch, useSelector } from "react-redux";
import {
  makeEmptySearchResultTracks,
  setSearchResultTracks,
} from "../../../../redux/slice/artist";
import SearchIcon from "@mui/icons-material/Search";

const VerifyConfig = ({
  included_music,
  contract_length,
  catelog_income,
  new_music_income,
  calcalute_tracks_estimate,
  calcalute_Year_income_by_tracks,
  artist,
}) => {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  const tracks = useSelector((state) => state.artist.tracks);
  const searchTracks = useSelector((state) => state.artist.searchTracks);

  useEffect(() => {
    dispatchRef.current(makeEmptySearchResultTracks());
  }, [dispatchRef]);

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value.length >= 3) {
      const filteredTracks = tracks.filter((e) =>
        e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      dispatch(setSearchResultTracks(filteredTracks));
    } else {
      dispatch(makeEmptySearchResultTracks());
    }
  };

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__header}>
        <SaveBtn
          headerCss={classess.header}
          saveBtnCss={classess.saveBtn}
          artist={artist}
        />
        <Box
          varient="div"
          component="div"
          className={classess.page__header__seachBar}
        >
          <SearchIcon className={classess.searchIcon} />
          <input
            className={classess.page__header__search}
            placeholder="Search"
            type="search"
            onInput={(e) => handleSearch(e)}
            required
          />
        </Box>
      </Box>
      <Box className={classess.searchBarMob}></Box>

      <VerifyArtistList
        searchTracks={searchTracks}
        included_music={included_music}
        contract_length={contract_length}
        catelog_income={catelog_income}
        new_music_income={new_music_income}
        calcalute_tracks_estimate={calcalute_tracks_estimate}
        calcalute_Year_income_by_tracks={calcalute_Year_income_by_tracks}
      />
    </Box>
  );
};

export default VerifyConfig;
