import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from '../types/order'

interface OrdersResponse {
  orders: Order[]
  total: number
  totalPages: number
}

interface OrdersQueryParams {
  page: number
  limit: number
  search?: string
  status?: string
  startDate?: string
  endDate?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, OrdersQueryParams>({
      query: (params) => ({
        url: 'orders',
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search,
          status: params.status,
          startDate: params.startDate,
          endDate: params.endDate,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
        },
      }),
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => `orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Order', id },
        'Order',
      ],
    }),
    updateBulkOrderStatus: builder.mutation<void, { orderIds: string[]; status: string }>({
      query: ({ orderIds, status }) => ({
        url: 'orders/bulk-status',
        method: 'PATCH',
        body: { orderIds, status },
      }),
      async onQueryStarted({ orderIds, status }, { dispatch, queryFulfilled }) {
        const patches = dispatch(
          orderApi.util.updateQueryData('getOrders', undefined, (draft) => {
            const ordersToUpdate = draft.orders.filter((order) => 
              orderIds.includes(order.id)
            )
            ordersToUpdate.forEach((order) => {
              order.status = status
            })
          })
        )
        try {
          await queryFulfilled
        } catch {
          patches.undo()
        }
      },
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdateBulkOrderStatusMutation,
} = orderApi 