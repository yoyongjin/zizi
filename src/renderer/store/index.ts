import { configureStore } from '@reduxjs/toolkit';
import recordSlice from './recordSlice';
import modalSlice from './modalSlice';
import callPlayerSlice from './callPlayerSlice';
import connectSlice from './connectSlice';
// import checkedItemsSlice from './checkedItemsSlice';

const store = configureStore({
  reducer: {
    recorder: recordSlice.reducer,
    modaler: modalSlice.reducer,
    callPlayer: callPlayerSlice.reducer,
    connector: connectSlice.reducer,
    // checked: checkedItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
