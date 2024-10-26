// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../theme/slices/themeSlice';
import authReducer from '@features/Authentication/slices/authSlice';
import userReducer from '@features/User/slices/UserSlice';
import addressReducer from '@features/User/slices/AddressSlice';
import ghnReducer from '@features/User/slices/GhnSlice';
import chatBotReducer from '@features/ChatBot/slices/ChatBotSlice';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    address: addressReducer,
    ghn: ghnReducer,
    chat: chatBotReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
