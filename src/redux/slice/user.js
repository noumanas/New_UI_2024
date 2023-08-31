import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "../../services/api";

import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  users: null,
};

export const getUsers = createAsyncThunk("auth/user", (payload, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: `/users`,
    }),
    thunkAPI
  );
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      const users = action.payload.data;
      state.status = "succeeded";
      state.users = users;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
  },
});

export default userSlice.reducer;
