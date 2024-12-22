import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBaseResponse } from '~/types/base.interface'
import {
  ICreatePostJsonRequest,
  IPostResponse,
  ISharePostRequest
} from '~/features/Threads/types/threads.interface'
import { API_ENDPOINTS_THREAD } from '@config/apiConfig'

export const threadsApi = createApi({
  reducerPath: 'threadsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    createThread: builder.mutation<
      IBaseResponse<IPostResponse>,
      ICreatePostJsonRequest
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('post_json', JSON.stringify(data.post_json))
        if (data.file) {
          formData.append('file', data.file)
        }
        return {
          url: API_ENDPOINTS_THREAD.ApiCreateThread,
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      }
    }),
    updateThread: builder.mutation<
      IBaseResponse<IPostResponse>,
      ICreatePostJsonRequest
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('post_json', JSON.stringify(data.post_json))
        if (data.file) {
          formData.append('file', data.file)
        }
        return {
          url: API_ENDPOINTS_THREAD.ApiUpdateThread,
          method: 'PUT',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      }
    }),
    deleteThread: builder.mutation<IBaseResponse<IPostResponse>, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS_THREAD.ApiUpdateThread}/${id}`,
        method: 'DELETE'
      })
    }),
    shareThread: builder.mutation<
      IBaseResponse<IPostResponse>,
      ISharePostRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS_THREAD.ApiSharedThread,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useCreateThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useShareThreadMutation
} = threadsApi
