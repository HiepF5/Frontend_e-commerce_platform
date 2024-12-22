import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse } from '~/types/base.interface'
import { 
  CheckoutSubmitRequest, 
  CheckoutSubmitResponse,
  CheckoutPreviewData
} from '../types/checkout.interface'

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Checkout'],
  endpoints: (builder) => ({
    // Query để lấy preview đơn hàng
    getCheckoutPreview: builder.query<IBaseResponse<CheckoutPreviewData>, CheckoutSubmitRequest>({
      query: () => ({
        url: '/customer/checkout',
        method: 'GET'
      }),
      providesTags: ['Checkout']
    }),

    // Mutation để submit đơn hàng
    submitCheckout: builder.mutation<IBaseResponse<CheckoutSubmitResponse>, CheckoutSubmitRequest>({
      query: (data) => ({
        url: '/customer/checkout/submit',
        method: 'POST',
        data
      }),
      invalidatesTags: ['Checkout']
    })
  })
})

export const {
  useGetCheckoutPreviewQuery,
  useSubmitCheckoutMutation
} = checkoutApi
