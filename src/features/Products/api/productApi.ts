import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse } from '~/types/base.interface'
import { IProduct } from '~/types/products.interface'
import { IProductData } from '../types/products.interface'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getListProduct: builder.query<
      IBaseResponse<IProduct>,
      { pageNumber: number; pageSize: number }
    >({
      query: ({ pageNumber = 1, pageSize = 40 }) => ({
        url: `/guest/product/get-list-product?page_number=${pageNumber}&page_size=${pageSize}`,
        method: 'GET'
      })
    }),

    getProductDetail: builder.query<
      IBaseResponse<IProductData>,
      { productId: number }
    >({
      query: ({ productId = 0 }) => ({
        url: `/guest/product/detail/${productId}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetListProductQuery, useGetProductDetailQuery } = productApi
