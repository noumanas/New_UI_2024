import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    countries: null,
};

export const getCountries = createAsyncThunk("country/getCountries", (_, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: "/countries",
        }),
        thunkAPI
    );
    return response;
});

export const postCountries = createAsyncThunk("country/postCountries", ({ data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "POST",
            url: "/countries",
            data,
        }),
        thunkAPI
    );
    return response;
});


export const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getCountries.pending]: (state) => {
            state.status = "loading";
        },
        [getCountries.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.countries = action.payload.data;
        },
        [getCountries.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [postCountries.pending]: (state) => {
            state.status = "loading";
        },
        [postCountries.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("Country Added Successfully");
        },
        [postCountries.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
    },
});

export default countrySlice.reducer;
