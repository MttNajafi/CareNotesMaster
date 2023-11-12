import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category} from 'types/common';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as Category[],
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => action.payload,
  },
});

export const {setCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
