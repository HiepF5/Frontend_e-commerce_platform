import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse, PaginationResponse } from '~/types/base.interface'
import { IProduct } from '~/types/products.interface'
import { IProductData } from '../types/products.interface'
import { BrandFilter, Category } from './searchApi'

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
      query: ({ productId, count }) => ({
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
    }),
    listProductOfShop: builder.mutation<
      IBaseResponse<PaginationResponse<IProduct>>,
      { shopId: string; pageNumber: number; pageSize: number }
    >({
      query: ({ shopId, pageNumber = 1, pageSize = 20 }) => ({
        url: `/guest/product/get-shop-product`,
        method: 'POST',
        data: {
          shopCode: shopId,
          title: null,
          brandId: null,
          category: null,
          shopCategoryId: null,
          pageNumber,
          pageSize
        }
      })
    }),
    fetchCategories: builder.query<IBaseResponse<Category[]>, { categoryLevel: number }>({
      query: ({ categoryLevel }) => ({
        url: `/owner/category?categoryLevel=${categoryLevel}`,
        method: 'GET',
      }),
    }),
    fetchBrand: builder.query<IBaseResponse<BrandFilter[]>, void>({
      query: () => ({
        url: `/guest/product/all-brand`,
        method: 'GET',
      }),
      }),
  })
})

export const {
  useGetListProductQuery,
  useGetProductDetailQuery,
  useGetProductRecommendItemBasedQuery,
  useGetProductRecommendUserBasedQuery,
  useGetProductRecommendContentBasedQuery,
  useListProductOfShopMutation,
  useFetchCategoriesQuery,
  useFetchBrandQuery
} = productApi
