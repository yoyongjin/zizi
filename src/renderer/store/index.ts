import { configureStore } from '@reduxjs/toolkit';
import recordSlice from './recordSlice';
import modalSlice from './modalSlice';
import connectSlice from './connectSlice';

const store = configureStore({
  reducer: {
    recorder: recordSlice.reducer,
    modaler: modalSlice.reducer,
    connector: connectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
