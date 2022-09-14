import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  connectState: boolean;
};

const initialState: InitialState = {
  connectState: false,
};
const connectSlice = createSlice({
  name: 'connector',
  initialState,
  reducers: {
    connectToggle: (state, action) => {
      console.log(`connectSlice - toggle - action.payload: ${action.payload}`);
      state.connectState = action.payload;
    },
    init: (state, action) => {
      state.connectState = false;
    },
  },
});

export default connectSlice;
export const { connectToggle, init } = connectSlice.actions;
