import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseElk } from '@shared/libs/rtk-query/axiosBaseElk';


export interface IProductSearchRequest {
  id: number;
  title: string;
  slug: string;
  minPrice: number;
  maxPrice: number;
  productCode: string;
  rating: number;
  shopCode: string;
  shopId: number;
  shopCategoryIds: number[];
  productUrl: string;
  updatedAt: string;
  isDeleted: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  isHidden: boolean;
  brandDocument: {
    brandId: number;
    brandName: string;
  };
  stockQuantity: number;
  categoryDocument: {
    categoryId: number;
    categoryName: string;
  };
  attributes: {
    attributeId: number;
    attributeName: string;
    attributeValue: string;
  }[];
  score: number;
}

export interface IBaseResponseSearch<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
export interface Category {
  categoryId: number;
  categoryName: string;
}
export interface BrandFilter {
  id: number;
  brand : string;
  productCount: number;
}
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: axiosBaseElk(), 
  endpoints: (builder) => ({
    searchProduct: builder.query<IBaseResponseSearch<IProductSearchRequest>, { keyword: string}>({
      query: ({ keyword}) => ({
        url: `/guest/search?keyword=${keyword}`,
        method: 'POST',
      }),
    }),
    
  }),
});

export const { useSearchProductQuery } = searchApi;
