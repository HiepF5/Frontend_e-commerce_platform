import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import {
  Voucher,
  VoucherDashboardRequest,
  VoucherCreateRequest,
  VoucherUpdateRequest,
  VoucherStatusRequest,
  VoucherCheckRequest,
  PaginationResponse,
  GetCustomerVouchersParams
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
    getCustomerVouchers: builder.query<IBaseResponse<PaginationResponse<Voucher>>, GetCustomerVouchersParams>({
      query: (params) => {
        return {
        url: '/customer/voucher',
        method: 'GET',
        params,  
      }
    },
      providesTags: ['Voucher'],
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
  useListAdminDashboardMutation,
  useCreateAdminVoucherMutation,
  useUpdateAdminVoucherMutation,
  useChangeAdminVoucherStatusMutation,
  useListOwnerDashboardMutation,
  useCreateOwnerVoucherMutation,
  useUpdateOwnerVoucherMutation,
  useChangeOwnerVoucherStatusMutation,
  useGetCustomerVouchersQuery,
  useCheckSystemVoucherQuery,
  useCheckShippingVoucherMutation,
  useCheckShopVoucherMutation
} = voucherApi
