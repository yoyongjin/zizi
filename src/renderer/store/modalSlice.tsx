import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  modalState: boolean;
};

const initialState: InitialState = {
  modalState: false,
};
const modalSlice = createSlice({
  name: 'modaler',
  initialState,
  reducers: {
    modalToggle: (state, action) => {
      console.log(`modalSlice - toggle - action.payload: ${action.payload}`);
      state.modalState = action.payload;
    },
    init: (state, action) => {
      state.modalState = false;
    },
  },
});

export default modalSlice;
export const { modalToggle, init } = modalSlice.actions;
