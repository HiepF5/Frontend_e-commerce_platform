// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import themeReducer from '../theme/slices/themeSlice'
import authReducer from '@features/Authentication/slices/authSlice'
import userReducer from '@features/User/slices/UserSlice'
import addressReducer from '@features/User/slices/AddressSlice'
import ghnReducer from '@features/User/slices/GhnSlice'
import chatBotReducer from '@features/ChatBot/slices/ChatBotSlice'
import shopReducer from '@features/User/slices/ShopSlice'
import shopReviewReducer from '@features/Shop/slices/ShopReviewSlice'
import { threadsApi } from '@features/Threads/slices/ThreadsSlide'
import chatReducer from '@features/MessengerChat/slices/ChatSlice'
import { chatMessage } from '@features/MessengerChat/service/chatMessage'
import chatUserReducer from '@features/Messenger/slices/ChatUserSlice'
import { chatMessageUser } from '@features/Messenger/service/chatMessageUser'
import { productApi } from '@features/Products/api/productApi'
import { orderApi } from '../features/ShopAdmin/store/orderApi'
import { analyticsApi } from '../features/ShopAdmin/store/analyticsApi'
import { voucherApi } from '../features/Voucher/api/voucherApi'
import { rootApi } from '@features/Root/api/rootApi'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    address: addressReducer,
    ghn: ghnReducer,
    chat: chatBotReducer,
    shop: shopReducer,
    shopReview: shopReviewReducer,
    chatApi: chatReducer,
    chatUserApi: chatUserReducer,
    [threadsApi.reducerPath]: threadsApi.reducer,
    [chatMessage.reducerPath]: chatMessage.reducer,
    [chatMessageUser.reducerPath]: chatMessageUser.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    [rootApi.reducerPath]: rootApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      threadsApi.middleware,
      chatMessage.middleware,
      chatMessageUser.middleware,
      productApi.middleware,
      orderApi.middleware,
      analyticsApi.middleware,
      voucherApi.middleware,
      rootApi.middleware
    )
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
