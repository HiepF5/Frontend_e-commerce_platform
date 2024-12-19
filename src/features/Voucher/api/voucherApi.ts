import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import {
  Voucher,
  VoucherDashboardRequest,
  VoucherCreateRequest,
  VoucherUpdateRequest,
  VoucherStatusRequest,
  VoucherCheckRequest,
  PaginationResponse
} from '../types/voucher'
import { IBaseResponse } from '~/types/base.interface'

export const voucherApi = createApi({
  reducerPath: 'voucherApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Voucher'],
  endpoints: (builder) => ({
    // Admin endpoints
    getAdminDashboard: builder.mutation<IBaseResponse<PaginationResponse<Voucher>>, VoucherDashboardRequest>({
      query: (data) => ({
        url: '/admin/voucher/dashboard',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['Voucher'],
    }),

    createAdminVoucher: builder.mutation<void, VoucherCreateRequest>({
      query: (data) => ({
        url: '/admin/voucher',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),

    updateAdminVoucher: builder.mutation<void, VoucherUpdateRequest>({
      query: (data) => ({
        url: '/admin/voucher',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),

    changeAdminVoucherStatus: builder.mutation<void, VoucherStatusRequest>({
      query: ({ voucherCode, status }) => ({
        url: '/admin/voucher/status',
        method: 'PUT',
        body: { voucherCode, status }
      }),
      invalidatesTags: ['Voucher']
    }),

    // Owner endpoints
    getOwnerDashboard: builder.query<
      PaginationResponse<Voucher>,
      VoucherDashboardRequest
    >({
      query: (params) => ({
        url: '/owner/voucher/dashboard',
        method: 'GET',
        params
      }),
      providesTags: ['Voucher']
    }),

    createOwnerVoucher: builder.mutation<void, VoucherCreateRequest>({
      query: (data) => ({
        url: '/owner/voucher',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),

    updateOwnerVoucher: builder.mutation<void, VoucherUpdateRequest>({
      query: (data) => ({
        url: '/owner/voucher',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Voucher']
    }),

    changeOwnerVoucherStatus: builder.mutation<void, VoucherStatusRequest>({
      query: ({ voucherCode, status }) => ({
        url: '/owner/voucher/status',
        method: 'PUT',
        body: { voucherCode, status }
      }),
      invalidatesTags: ['Voucher']
    }),

    // Customer endpoints
    getCustomerVouchers: builder.query<
      PaginationResponse<Voucher>,
      { pageNumber: number; pageSize: number }
    >({
      query: (params) => ({
        url: '/customer/voucher',
        method: 'GET',
        params
      }),
      providesTags: ['Voucher']
    }),

    checkSystemVoucher: builder.query<Voucher, void>({
      query: () => ({
        url: '/customer/voucher/system',
        method: 'GET'
      })
    }),

    checkShippingVoucher: builder.mutation<Voucher, VoucherCheckRequest>({
      query: (data) => ({
        url: '/customer/voucher/system-shipping',
        method: 'POST',
        body: data
      })
    }),

    checkShopVoucher: builder.mutation<Voucher, VoucherCheckRequest>({
      query: (data) => ({
        url: '/customer/voucher/shop',
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useGetAdminDashboardMutation,
  useCreateAdminVoucherMutation,
  useUpdateAdminVoucherMutation,
  useChangeAdminVoucherStatusMutation,
  useGetOwnerDashboardQuery,
  useCreateOwnerVoucherMutation,
  useUpdateOwnerVoucherMutation,
  useChangeOwnerVoucherStatusMutation,
  useGetCustomerVouchersQuery,
  useCheckSystemVoucherQuery,
  useCheckShippingVoucherMutation,
  useCheckShopVoucherMutation
} = voucherApi
