import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse } from '~/types/base.interface'

interface ChangeAdminRequest {
  user_code: string
  is_admin: boolean
}

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    changeAdmin: builder.mutation<IBaseResponse<void>, ChangeAdminRequest>({
      query: (data) => ({
        url: '/root/users/change-admin',
        method: 'PUT',
        data: {
          user_code: data.user_code,
          is_admin: data.is_admin
        }
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const { useChangeAdminMutation } = rootApi 