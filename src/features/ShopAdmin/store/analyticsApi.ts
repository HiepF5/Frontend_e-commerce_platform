import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { 
  MonthlyData, 
  OrderStatusData, 
  CategoryPerformance 
} from '../types/analytics'

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getMonthlyData: builder.query<MonthlyData[], void>({
      query: () => 'analytics/monthly',
    }),
    getOrderStatusData: builder.query<OrderStatusData[], void>({
      query: () => 'analytics/order-status',
    }),
    getCategoryPerformance: builder.query<CategoryPerformance[], void>({
      query: () => 'analytics/category-performance',
    }),
  }),
})

export const {
  useGetMonthlyDataQuery,
  useGetOrderStatusDataQuery,
  useGetCategoryPerformanceQuery,
} = analyticsApi 