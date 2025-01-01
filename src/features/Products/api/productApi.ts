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
      IBaseResponse<IProduct[]>,
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
    }),
    getProductRecommendItemBased: builder.query<
      IBaseResponse<IProduct[]>,
      { productId: number; count: number }
    >({
      query: ({ productId, count}) => ({
        url: `/guest/recommend/item-based?product_id=${productId}&count=${count}`,
        method: 'GET'
      })
    }),
    getProductRecommendUserBased: builder.query<
      IBaseResponse<IProduct[]>,
      { productId: number; count: number }
    >({
      query: ({ productId, count }) => ({
        url: `/guest/recommend/user-based?user_id=${productId}&count=${count}`,
        method: 'GET'
      })
    }),
    getProductRecommendContentBased: builder.query<
      IBaseResponse<IProduct[]>,
      { productId: number; count: number }
    >({
      query: ({ productId, count }) => ({
        url: `/guest/recommend/content-based?product_id=${productId}&count=${count}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetListProductQuery,
  useGetProductDetailQuery,
  useGetProductRecommendItemBasedQuery,
  useGetProductRecommendUserBasedQuery,
  useGetProductRecommendContentBasedQuery
} = productApi
