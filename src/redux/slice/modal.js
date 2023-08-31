import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    isOpen: false,
    data: null  
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
      openModal: (state, action) => {
        state.isOpen = true;
        state.name = action.payload.name;
        state.data = action.payload.data;
      },
      closeModal: (state) => {
        state.isOpen = false;
        state.name = null;
        state.data = null;
      },
    }
})

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;