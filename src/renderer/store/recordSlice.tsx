import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  recordState: boolean;
};

const initialState: InitialState = {
  recordState: false,
};
const recordSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    recordToggle: (state, action) => {
      console.log(`recordSlice - toggle - action.payload: ${action.payload}`);
      state.recordState = action.payload;
    },
    init: (state, action) => {
      state.recordState = false;
    },
  },
});

export default recordSlice;
export const { recordToggle, init } = recordSlice.actions;
