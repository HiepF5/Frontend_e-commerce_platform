import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse } from '~/types/base.interface'
import { 
  ReviewResponse, 
  ReviewData, 
  GetReviewsParams 
} from '~/types/review.interface'

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviews: builder.mutation<IBaseResponse<ReviewResponse>, GetReviewsParams>({
      query: (data) => ({
        url: '/guest/product-review/get',
        method: 'POST',
        data
      }),
      invalidatesTags: ['Reviews']
    }),

    getCustomerReviews: builder.mutation<IBaseResponse<ReviewResponse>, GetReviewsParams>({
      query: (data) => ({
        url: '/customer/product-review/get',
        method: 'POST',
        data
      }),
      invalidatesTags: ['Reviews']
    }),

    createReview: builder.mutation<IBaseResponse<ReviewData>, {
      json: string;
      image?: File;
    }>({
      query: ({ json, image }) => {
        const formData = new FormData();
        formData.append('json', json);
        if (image) {
          formData.append('image', image);
        }
        return {
          url: '/customer/product-review',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
      },
      invalidatesTags: ['Reviews']
    }),

    updateReview: builder.mutation<IBaseResponse<ReviewData>, {
      reviewId: number;
      json: string;
      image?: File;
    }>({
      query: ({ reviewId, json, image }) => {
        const formData = new FormData();
        formData.append('json', json);
        if (image) {
          formData.append('image', image);
        }
        return {
          url: `/customer/product-review/${reviewId}`,
          method: 'PUT',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
      },
      invalidatesTags: ['Reviews']
    }),

    deleteReview: builder.mutation<IBaseResponse<null>, number>({
      query: (reviewId) => ({
        url: `/customer/product-review/${reviewId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Reviews']
    }),

    replyReview: builder.mutation<IBaseResponse<ReviewData>, {
      reviewId: number;
      reply: string;
    }>({
      query: ({ reviewId, reply }) => {
        const formData = new FormData();
        formData.append('reply', reply);
        return {
          url: `/owner/product-review/${reviewId}`,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
      },
      invalidatesTags: ['Reviews']
    }),
  })
})

export const {
  useGetReviewsMutation,
  useGetCustomerReviewsMutation,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useReplyReviewMutation
} = reviewApi 