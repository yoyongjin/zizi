import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  callPlayerState: boolean;
  callPlayerFileName: string;
};

const initialState: InitialState = {
  callPlayerState: false,
  callPlayerFileName: '',
};
const callPlayerSlice = createSlice({
  name: 'callPlayer',
  initialState,
  reducers: {
    callPlayerToggle: (state, action) => {
      console.log(
        `callPlayerSlice - callPlayerToggle - action.payload: ${action.payload}`
      );
      state.callPlayerState = action.payload;
    },
    setCallPlayerFileName: (state, action) => {
      console.log(
        `callPlayerSlice - setCallPlayerFileName - action.payload: ${action.payload}`
      );
      state.callPlayerFileName = action.payload;
    },
    callPlayerInit: (state, action) => {
      state.callPlayerState = false;
    },
  },
});

export default callPlayerSlice;
export const { callPlayerToggle, setCallPlayerFileName, callPlayerInit } =
  callPlayerSlice.actions;
