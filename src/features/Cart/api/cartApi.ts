import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { CartDeleteRequest, CartItem, CartItemRequest } from '../types/cart.interface'
import { IBaseResponse } from '~/types/base.interface'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<IBaseResponse<CartItem[]>, void>({
      query: () => ({
        url: '/customer/cart',
        method: 'GET'
      }),
      providesTags: ['Cart'],
    }),

    // Add item to cart
    addToCart: builder.mutation<IBaseResponse<String>, CartItemRequest>({
      query: (data) => {
        const formData = new FormData()
        formData.append('item_id', data.item_id.toString())
        formData.append('quantity', data.quantity.toString())
        
        return {
          url: '/customer/cart',
          method: 'POST',
          data: formData
        }
      },
      invalidatesTags: ['Cart']
    }),

    // Update cart item quantity 
    updateCartItem: builder.mutation<IBaseResponse<String>, CartItemRequest>({
      query: (data) => {
        const formData = new FormData()
        formData.append('item_id', data.item_id.toString())
        formData.append('quantity', data.quantity.toString())

        return {
          url: '/customer/cart',
          method: 'PUT', 
          data: formData
        }
      },
      invalidatesTags: ['Cart']
    }),

    // Remove item from cart
    removeFromCart: builder.mutation<IBaseResponse<void>, CartDeleteRequest>({
      query: (data) => {
        const formData = new FormData()
        formData.append('item_list', data.item_list.toString())

        return {
          url: '/customer/cart',
          method: 'DELETE',
          data: formData
        }
      },
      invalidatesTags: ['Cart']
    }),

    // Clear cart
    clearCart: builder.mutation<IBaseResponse<void>, void>({
      query: () => ({
        url: '/customer/cart/clear',
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    }),

    // Get cart count
    getCartCount: builder.query<String, void>({
      query: () => ({
        url: '/customer/cart/count',
        method: 'GET'
      }),
      providesTags: ['Cart']
    })
  })
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useGetCartCountQuery
} = cartApi
