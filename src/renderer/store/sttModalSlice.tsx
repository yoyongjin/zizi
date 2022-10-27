import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  sttModalState: boolean;
  sttModalMode: 'REALTIME' | 'FILE';
  sttModalFileName: string;
};

const initialState: InitialState = {
  sttModalState: false,
  sttModalMode: 'REALTIME',
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
    setSttModalMode: (state, action) => {
      console.log(
        `sttModalSlice - setSttModalMode - action.payload: ${action.payload}`
      );
      state.sttModalMode = action.payload;
    },
    sttModalInit: (state, action) => {
      state.sttModalState = false;
    },
  },
});

export default sttModalSlice;
export const {
  sttModalToggle,
  setSttModalFileName,
  setSttModalMode,
  sttModalInit,
} = sttModalSlice.actions;
