import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IChatListResponse,
  IChatListRequest,
  IChatStoryRequest,
  IChatDetail,
} from '~/types/message-chat.interface';
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery';
import { IBaseResponse } from '~/types/base.interface';

export const chatMessageUser = createApi({
  reducerPath: 'chatMessageUser', // Tên slice
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Lấy danh sách chat của Owner
    fetchChatListOwner: builder.query<IBaseResponse<IChatListResponse>, IChatListRequest>({
      query: (body: IChatListRequest) => ({
        url: '/owner/message-chat',
        method: 'POST',
        data: body,
      }),
    }),

    // Lấy chi tiết cuộc trò chuyện của Owner
    fetchChatStoryOwner: builder.query<IBaseResponse<IChatDetail>, IChatStoryRequest>({
      query: (body: IChatStoryRequest) => {
        const formData = new FormData();
        formData.append('chat_id', body.chat_id.toString());
        formData.append('page_number', body.page_number.toString());
        formData.append('page_size', body.page_size.toString());
        return {
          url: '/owner/get-chat',
          method: 'POST',
          data: formData,
        };
      },
    }),

    // Lấy danh sách chat của Customer
    fetchChatListCustomer: builder.query<IBaseResponse<IChatListResponse>, IChatListRequest>({
      query: (body : IChatListRequest) => ({
        url: '/customer/message-chat',
        method: 'POST',
        data: body,
      }),
    }),

    // Lấy chi tiết cuộc trò chuyện của Customer
    fetchChatStoryCustomer: builder.query<IBaseResponse<IChatDetail>, IChatStoryRequest>({
      query: (body: IChatStoryRequest) => {
        const formData = new FormData();
        formData.append('chat_id', body.chat_id.toString());
        formData.append('page_number', body.page_number.toString());
        formData.append('page_size', body.page_size.toString());
        return {
          url: '/customer/get-chat',
          method: 'POST',
          data: formData,
        };
      },
    }),
  }),
});

// Export các hook
export const {
  useFetchChatListOwnerQuery,
  useFetchChatStoryOwnerQuery,
  useFetchChatListCustomerQuery,
  useFetchChatStoryCustomerQuery,
} = chatMessageUser;
