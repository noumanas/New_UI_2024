import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    artistYoutubeStreaming: null,
};

export const getArtistYoutubeStreamingByID = createAsyncThunk("artistYoutubeStreaming/getArtistYoutubeStreamingByID", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: `/artist-youtube-streaming/${id}`
        }),
        thunkAPI
    );
    return response;
});

export const postArtistYoutubeStreaming = createAsyncThunk("artistYoutubeStreaming/postArtistYoutubeStreaming", ({ data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "POST",
            url: "/artist-youtube-streaming",
            data
        }),
        thunkAPI
    );
    return response;
});


export const artistYoutubeStreamingSlice = createSlice({
    name: "artistYoutubeStreaming",
    initialState,
    reducers: {
        updateArtistYoutubeVideosCurrentState: (state, action) => {
            state.artistYoutubeStreaming = action.payload.data;
        },
        emptyArtistYoutubeVideosCurrentState: (state, action) => {
            state.artistYoutubeStreaming = null;
        },
    },
    extraReducers: {
        [getArtistYoutubeStreamingByID.pending]: (state) => {
            state.status = "loading";
        },
        [getArtistYoutubeStreamingByID.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.artistYoutubeStreaming = action.payload.data;
        },
        [getArtistYoutubeStreamingByID.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [postArtistYoutubeStreaming.pending]: (state) => {
            state.status = "loading";
        },
        [postArtistYoutubeStreaming.fulfilled]: (state, action) => {
            state.status = "succeeded";
        },
        [postArtistYoutubeStreaming.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
    },
});

const { updateArtistYoutubeVideosCurrentState, emptyArtistYoutubeVideosCurrentState } = artistYoutubeStreamingSlice.actions;

export {
    updateArtistYoutubeVideosCurrentState,
    emptyArtistYoutubeVideosCurrentState
}

export default artistYoutubeStreamingSlice.reducer;
