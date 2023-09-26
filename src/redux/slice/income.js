import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  yearlyincome: null,
};

export const getYearlyIncomeArtistByID = createAsyncThunk("yearlyincome/getYearlyIncomeArtistByID", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: `/income/yearly/${id}`,
        }),
        thunkAPI
    );
    return response;
});


export const yearlyincomeArtistSlice = createSlice({
  name: "yearlyincome",
  initialState,
  reducers: {},
  extraReducers: {
    [getYearlyIncomeArtistByID.pending]: (state) => {
      state.status = "loading";
    },
    [getYearlyIncomeArtistByID.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.similarArtist = action.payload.data;
    },
    [getYearlyIncomeArtistByID.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    }
  },
});

export default yearlyincomeArtistSlice.reducer;
