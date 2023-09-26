import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slice/auth";
import artistReducer from "../slice/artist";
import modalReducer from "../slice/modal";
import countryReducer from "../slice/country";
import trackReducer from "../slice/track";
import userReducer from "../slice/user";
import newMusicReducer from "../slice/new-music";
import similarArtistReducer from "../slice/similar-artist";
import yearlyincomeArtistReducer from "../slice/income";
import artistYoutubeStreamingReducer from "../slice/artist-youtube-streaming";

const rootReducer = combineReducers({
  auth: authReducer,
  artist: artistReducer,
  modal: modalReducer,
  country: countryReducer,
  track: trackReducer,
  user: userReducer,
  new_music: newMusicReducer,
  similar_artist: similarArtistReducer,
  artist_youtube_streaming: artistYoutubeStreamingReducer,
  yearlyincome : yearlyincomeArtistReducer,
});

export default rootReducer;