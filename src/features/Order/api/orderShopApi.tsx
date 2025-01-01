import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse, PaginationResponse } from '~/types/base.interface'
import {
  OrderAdminRequest,
  OrderAdminResponse,
  OrderDataAdmin,
  OrderDetail,
  OrderListItem,
  OrderRequest,
  OrderShopRequest
} from '../types/order.interface'

export const orderShopApi = createApi({
  reducerPath: 'orderShopApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['OrderShop'],
  endpoints: (builder) => ({
    getOrderLists: builder.mutation<
      IBaseResponse<PaginationResponse<OrderListItem>>,
      OrderRequest
    >({
      query: (data) => ({
        url: '/customer/order/dashboard',
        method: 'POST',
        data
      }),
      invalidatesTags: ['OrderShop']
    }),
    getOrderDetail: builder.query<
      IBaseResponse<OrderDetail>,
      { orderId: String }
    >({
      query: ({ orderId }: { orderId: string }) => ({
        url: `/customer/order/detail/${orderId}`,
        method: 'GET'
      }),
      providesTags: ['OrderShop']
    }),
    cancelOrderByID: builder.mutation<
      IBaseResponse<String>,
      { orderId: String }
    >({
      query: ({ orderId }: { orderId: string }) => ({
        url: `/customer/order/cancel/${orderId}`,
        method: 'PUT'
      }),
      invalidatesTags: ['OrderShop']
    }),
    getShopOrderLists: builder.mutation<
      IBaseResponse<PaginationResponse<OrderListItem>>,
      OrderShopRequest
    >({
      query: (data) => ({
        url: '/owner/order/dashboard',
        method: 'POST',
        data
      }),
      invalidatesTags: ['OrderShop']
    }),
    getShopOrderDetail: builder.query<
      IBaseResponse<OrderDetail>,
      { orderId: String }
    >({
      query: ({ orderId }: { orderId: string }) => ({
        url: `/owner/order/detail/${orderId}`,
        method: 'GET'
      }),
      providesTags: ['OrderShop']
    }),
    shopUpdateOrderByID: builder.mutation<IBaseResponse<String>, void>({
      query: (id) => ({
        url: `/owner/order/update/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['OrderShop']
    }),
    getAdminOrderLists: builder.mutation<
      IBaseResponse<PaginationResponse<OrderDataAdmin>>,
      OrderAdminRequest
    >({
      query: (data) => ({
        url: '/admin/order/dashboard',
        method: 'POST',
        data
      }),
      invalidatesTags: ['OrderShop']
    }),
    getAdminOrderDetail: builder.query<
      IBaseResponse<OrderAdminResponse>,
      { orderId: String }
    >({
      query: ({ orderId }: { orderId: string }) => ({
        url: `/admin/order/detail/${orderId}`,
        method: 'GET'
      }),
      providesTags: ['OrderShop']
    })
    
  })
})

export const {
  useGetOrderListsMutation,
  useGetOrderDetailQuery,
  useCancelOrderByIDMutation,
  useGetShopOrderListsMutation,
  useGetShopOrderDetailQuery,
  useShopUpdateOrderByIDMutation,
  useGetAdminOrderListsMutation,
  useGetAdminOrderDetailQuery
  
} = orderShopApi
