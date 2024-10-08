// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../theme/slices/themeSlice';
import authReducer from '@features/Authentication/slices/authSlice';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
