import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  checkedItems: Set<string>;
};

const initialState: InitialState = {
  checkedItems: new Set(),
};
const checkedItemsSlice = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    addCheckedItems: (state, action) => {
      console.log(
        `checkedItemsSlice - add - action.payload: ${action.payload}`
      );
      state.checkedItems.add(action.payload);
    },
    deleteCheckedItems: (state, action) => {
      console.log(
        `checkedItemsSlice - delete - action.payload: ${action.payload}`
      );
      state.checkedItems.delete(action.payload);
    },
    clearCheckedItems: (state) => {
      console.log(`checkedItemsSlice - clear - action.payload`);
      state.checkedItems.clear();
    },
    initCheckedItems: (state, action) => {
      state.checkedItems = new Set(action.payload.map((data) => data.id));
    },
  },
});

export default checkedItemsSlice;
export const {
  addCheckedItems,
  deleteCheckedItems,
  clearCheckedItems,
  initCheckedItems,
} = checkedItemsSlice.actions;
