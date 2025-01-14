// src/redux/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeColor: localStorage.getItem('themeColor') ?? '#CB1C22'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
      localStorage.setItem('themeColor', action.payload);
    }
  }
});

export const { setThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
