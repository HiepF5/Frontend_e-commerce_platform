// src/redux/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeColor: localStorage.getItem('themeColor') ?? '#19857b' // Màu mặc định hoặc lấy từ localStorage
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
