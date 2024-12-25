import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import {
  Voucher,
  VoucherDashboardRequest,
  VoucherCreateRequest,
  VoucherUpdateRequest,
  VoucherStatusRequest,
  PaginationResponse,
  GetGuestFormdata,
  VoucherRequest,
  VoucherShopRequest
} from '../types/voucher'
import { IBaseResponse } from '~/types/base.interface'

export const voucherApi = createApi({
  reducerPath: 'voucherApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Voucher'],
  endpoints: (builder) => ({
    // Admin endpoints
    listAdminDashboard: builder.mutation<
      IBaseResponse<PaginationResponse<Voucher>>,
      VoucherDashboardRequest
    >({
      query: (data) => ({
        url: '/admin/voucher/dashboard',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data
      }),
      invalidatesTags: ['Voucher']
    }),

    createAdminVoucher: builder.mutation<
      IBaseResponse<Voucher>,
      VoucherCreateRequest
    >({
      query: (data) => ({
        url: '/admin/voucher',
        method: 'POST',
        data
      }),
      invalidatesTags: ['Voucher']
    }),

    updateAdminVoucher: builder.mutation<
      IBaseResponse<Voucher>,
      VoucherUpdateRequest
    >({
      query: (data) => ({
        url: '/admin/voucher',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        data
      }),
      invalidatesTags: ['Voucher']
    }),

    changeAdminVoucherStatus: builder.mutation<
      IBaseResponse<Voucher>,
      VoucherStatusRequest
    >({
      query: ({ voucherCode, status }) => {
        const formData = new FormData()
        formData.append('voucher_code', voucherCode)
        formData.append('status', status)
        return {
          url: '/admin/voucher/status',
          method: 'PUT',
          data: formData
        }
      },
      invalidatesTags: ['Voucher']
    }),

    // Owner endpoints
    listOwnerDashboard: builder.mutation<
      IBaseResponse<PaginationResponse<Voucher>>,
      VoucherDashboardRequest
    >({
      query: (data) => ({
        url: '/owner/voucher/dashboard',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data
      }),
      invalidatesTags: ['Voucher']
    }),

    createOwnerVoucher: builder.mutation<
      IBaseResponse<Voucher>,
      VoucherCreateRequest
    >({
      query: (data) => ({
        url: '/owner/voucher',
        method: 'POST',
        data
      }),
      invalidatesTags: ['Voucher']
    }),

    updateOwnerVoucher: builder.mutation<
      IBaseResponse<Voucher>,
      VoucherUpdateRequest
    >({
      query: (data) => ({
        url: '/owner/voucher',
        method: 'PUT',
        data
      }),
      invalidatesTags: ['Voucher']
    }),

    changeOwnerVoucherStatus: builder.mutation<
      IBaseResponse<Voucher>,
      VoucherStatusRequest
    >({
      query: ({ voucherCode, status }) => {
        const formData = new FormData()
        formData.append('voucher_code', voucherCode)
        formData.append('status', status)
        return {
          url: '/owner/voucher/status',
          method: 'PUT',
          data: formData
        }
      },
      invalidatesTags: ['Voucher']
    }),

    // Customer endpoints
    getGuestSystemVouchers: builder.query<
      IBaseResponse<PaginationResponse<Voucher>>,
      GetGuestFormdata
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('page_number', data.page_number)
        formData.append('page_size', data.page_size)
        return {
          url: '/guest/system-voucher',
          method: 'GET',
          data: formData
        }
      },
      providesTags: ['Voucher']
    }),
    getGuestShopVouchers: builder.query<
      IBaseResponse<PaginationResponse<Voucher>>,
      GetGuestFormdata
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('page_number', data.page_number)
        formData.append('page_size', data.page_size)
        return {
          url: '/guest/shop-voucher',
          method: 'GET',
          data: formData
        }
      },
      providesTags: ['Voucher']
    }),

    listShippingVoucher: builder.mutation<IBaseResponse<PaginationResponse<Voucher>>, VoucherRequest>({
      query: (data) => ({
        url: '/customer/shipping-system-voucher',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),

    listDiscountVoucher: builder.mutation<IBaseResponse<PaginationResponse<Voucher>>, VoucherRequest>({
      query: (data) => ({
        url: '/customer/discount-system-voucher',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Voucher']
    }), 
    listShopVoucher: builder.mutation<IBaseResponse<PaginationResponse<Voucher>>, VoucherShopRequest>({
      query: (data) => ({
        url: '/customer/shipping-system-voucher',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Voucher']
    })
  })
})

export const {
  useListAdminDashboardMutation,
  useCreateAdminVoucherMutation,
  useUpdateAdminVoucherMutation,
  useChangeAdminVoucherStatusMutation,
  useListOwnerDashboardMutation,
  useCreateOwnerVoucherMutation,
  useUpdateOwnerVoucherMutation,
  useChangeOwnerVoucherStatusMutation,
  useGetGuestSystemVouchersQuery,
  useGetGuestShopVouchersQuery,
  useListShippingVoucherMutation,
  useListDiscountVoucherMutation,
  useListShopVoucherMutation
} = voucherApi
