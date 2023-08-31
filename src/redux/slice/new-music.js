import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    allNewMusic: null,
    newMusic: null,
};

export const getNewMusic = createAsyncThunk("new_music/getNewMusic", (_, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: "/new-music",
        }),
        thunkAPI
    );
    return response;
});

export const getNewMusicByID = createAsyncThunk("new_music/getNewMusicByID", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: `/new-music/${id}`,
        }),
        thunkAPI
    );
    return response;
});

export const postNewMusic = createAsyncThunk("new_music/postNewMusic", ({ data }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "POST",
            url: "/new-music",
            data
        }),
        thunkAPI
    );
    return response;
});

export const updateNewMusic = createAsyncThunk("new_music/updateNewMusic", ({ data, id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "PUT",
            url: `/new-music/${id}`,
            data
        }),
        thunkAPI
    );
    return response;
});

export const deleteNewMusic = createAsyncThunk("new_music/deleteNewMusic", ({ id }, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "DELETE",
            url: `/new-music/${id}`
        }),
        thunkAPI
    );
    return response;
});


export const newMusicSlice = createSlice({
    name: "new_music",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getNewMusic.pending]: (state) => {
            state.status = "loading";
        },
        [getNewMusic.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.allNewMusic = action.payload.data;
        },
        [getNewMusic.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [getNewMusicByID.pending]: (state) => {
            state.status = "loading";
        },
        [getNewMusicByID.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.newMusic = action.payload.data;
        },
        [getNewMusicByID.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [postNewMusic.pending]: (state) => {
            state.status = "loading";
        },
        [postNewMusic.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("New Music Record Added Successfully");
        },
        [postNewMusic.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [updateNewMusic.pending]: (state) => {
            state.status = "loading";
        },
        [updateNewMusic.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("New Music Record Updated Successfully");
        },
        [updateNewMusic.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
        [deleteNewMusic.pending]: (state) => {
            state.status = "loading";
        },
        [deleteNewMusic.fulfilled]: (state, action) => {
            state.status = "succeeded";
            toast.success("New Music Record Deleted Successfully");
        },
        [deleteNewMusic.rejected]: (state, action) => {
            state.status = "failed";
            toast.error(action.payload.data.message);
        },
    },
});

export default newMusicSlice.reducer;
