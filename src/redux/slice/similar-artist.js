import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  similarArtist: null,
};

export const getSimilarArtistByID = createAsyncThunk(
  "similarArtist/getSimilarArtistByID",
  ({ id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: `/similar-artist/${id}`,
      }),
      thunkAPI
    );
    return response;
  }
);

export const postSimilarArtist = createAsyncThunk(
  "similarArtist/postSimilarArtist",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/similar-artist",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const similarArtistSlice = createSlice({
  name: "similarArtist",
  initialState,
  reducers: {},
  extraReducers: {
    [getSimilarArtistByID.pending]: (state) => {
      state.status = "loading";
    },
    [getSimilarArtistByID.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.similarArtist = action.payload.data;
    },
    [getSimilarArtistByID.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [postSimilarArtist.pending]: (state) => {
      state.status = "loading";
    },
    [postSimilarArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [postSimilarArtist.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
  },
});

export default similarArtistSlice.reducer;
