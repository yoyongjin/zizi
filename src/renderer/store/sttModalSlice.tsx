import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  sttModalState: boolean;
  sttModalFileName: string;
};

const initialState: InitialState = {
  sttModalState: false,
  sttModalFileName: '',
};
const sttModalSlice = createSlice({
  name: 'sttModaler',
  initialState,
  reducers: {
    sttModalToggle: (state, action) => {
      console.log(
        `sttModalSlice - sttModalToggle - action.payload: ${action.payload}`
      );
      state.sttModalState = action.payload;
    },
    setSttModalFileName: (state, action) => {
      console.log(
        `sttModalSlice - setSttModalFileName - action.payload: ${action.payload}`
      );
      state.sttModalFileName = action.payload;
    },
    sttModalInit: (state, action) => {
      state.sttModalState = false;
    },
  },
});

export default sttModalSlice;
export const { sttModalToggle, setSttModalFileName, sttModalInit } =
  sttModalSlice.actions;
