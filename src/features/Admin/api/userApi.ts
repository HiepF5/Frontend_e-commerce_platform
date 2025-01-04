import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse, PaginationResponse } from '~/types/base.interface'
import { UserListRequest } from '../types/user.interface'
import { IUser } from '~/types/users.interface'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.mutation<IBaseResponse<PaginationResponse<IUser>>, UserListRequest>({
      query: (data) => ({
        url: '/admin/users/dashboard',
        method: 'POST',
        data
      }),
      invalidatesTags: ['Users']
    }),

    changeAdminRole: builder.mutation<IBaseResponse<String>, {
      user_code: string;
      is_admin: boolean;
    }>({
      query: ({ user_code, is_admin }) => {
        const formData = new FormData()
        formData.append('user_code', user_code)
        formData.append('is_admin', is_admin.toString())
        
        return {
          url: '/root/users/change-admin',
          method: 'PUT',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      },
      invalidatesTags: ['Users']
    })
  })
})

export const { 
  useGetUsersMutation,
  useChangeAdminRoleMutation
} = userApi 