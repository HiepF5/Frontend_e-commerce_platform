import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseElk } from '@shared/libs/rtk-query/axiosBaseElk';
import { FinancialOverview, MonthlyReport, ShopOverviewResponse } from '../types/order';
export const shopAdminApi = createApi({
  reducerPath: 'shopAdminApi',
  baseQuery: axiosBaseElk(),
  endpoints: (builder) => ({
    getShopOverview: builder.query<ShopOverviewResponse, string>({
      query: (shop_id) => ({
        url: `/owner/overview/by-shop/${shop_id}`,
        method: 'GET',
      }),
    }),
    getMonthlyReport: builder.query<MonthlyReport, string>({
      query: (shop_id) => ({
        url: `/owner/overview/by-shop/${shop_id}/monthly-report`,
        method: 'GET',
      }),
    }),
    getMonthlyRevenueOverview: builder.query<FinancialOverview, string>({
      query: (shop_id) => ({
        url: `/owner/overview/by-shop/${shop_id}/monthly-revenue-overview`,
        method: 'GET',
      }),
    })
  }),
});

export const { useGetShopOverviewQuery } = shopAdminApi;
