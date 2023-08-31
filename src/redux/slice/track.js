import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "../../services/api";

const initialState = {
  status: "idle",
  tracks: [],
};

export const getTracks = createAsyncThunk(
  "artist/tracks",
  (spotify_id, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: `/artist-tracks/${spotify_id}`,
      }),
      thunkAPI
    );
    return response;
  }
);

export const trackSlice = createSlice({
  name: "artist-tracks",
  initialState,
  reducers: {
    makeEmptyTrackArtist: (state, action) => {
      state.tracks = [];
    },
  },
  extraReducers: {
    [getTracks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTracks.fulfilled]: (state, action) => {
      state.tracks = action.payload?.data;
      state.status = "succeeded";
    },
    [getTracks.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { makeEmptyTrackArtist } = trackSlice.actions;

export default trackSlice.reducer;
