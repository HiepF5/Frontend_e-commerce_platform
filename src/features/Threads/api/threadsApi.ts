import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@shared/libs/rtk-query/axiosBaseQuery'
import { IBaseResponse, PaginationResponse } from '~/types/base.interface'
import {
  GetNewPostsRequest,
  GetMyPostsRequest,
  GetUserPostsRequest,
  IPostResponse,
  ISharePostRequest,
  ICreatePostJsonRequest,
  ICommentResponse,
  ICommentRequest
} from '../types/threads.interface'
import { API_ENDPOINTS_THREAD } from '@config/apiConfig'

export const threadsApi = createApi({
  reducerPath: 'threadsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Posts', 'Comments'],
  endpoints: (builder) => ({
    // Lấy danh sách bài viết mới
    getNewPosts: builder.query<
      IBaseResponse<PaginationResponse<IPostResponse>>,
      GetNewPostsRequest
    >({
      query: ({ hashTag, my_user_code, page_number, page_size }) => ({
        url: API_ENDPOINTS_THREAD.ApiGetListThread,
        method: 'GET',
        params: {
          hashTag,
          my_user_code,
          page_number,
          page_size
        }
      }),
      providesTags: (result) =>
        result
          ? result.data.data.map(({ post_id }) => ({
              type: 'Posts',
              id: post_id
            }))
          : ['Posts']
    }),

    // Lấy danh sách bài viết của tôi
    getMyPosts: builder.query<
      IBaseResponse<PaginationResponse<IPostResponse>>,
      GetMyPostsRequest
    >({
      query: ({ hash_tag, page_number, page_size }) => ({
        url: API_ENDPOINTS_THREAD.ApiGetMyListThread,
        method: 'GET',
        params: {
          hash_tag,
          page_number,
          page_size
        }
      }),
      providesTags: ['Posts']
    }),

    // Tạo bài viết mới
    createThread: builder.mutation<
      IBaseResponse<IPostResponse>,
      ICreatePostJsonRequest
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('post_json', JSON.stringify(data.post_json))
        if (data.files && Array.isArray(data.files)) {
          data.files.forEach((file) => {
            formData.append('file', file) 
          })
        }
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`)
        }
        return {
          url: API_ENDPOINTS_THREAD.ApiCreateThread, 
          method: 'POST',
          data: formData,
          headers: {
            // 'Content-Type': 'multipart/form-data' 
          }
        }
      },
      invalidatesTags: ['Posts']
    }),

    // Chỉnh sửa bài viết
    updateThread: builder.mutation<
      IBaseResponse<IPostResponse>,
      ICreatePostJsonRequest
    >({
      query: (data) => {
        const formData = new FormData()
        formData.append('post_json', JSON.stringify(data.post_json))
        if (data.files && Array.isArray(data.files)) {
          data.files.forEach((file) => {
            formData.append('file', file)
          })
        }
        return {
          url: API_ENDPOINTS_THREAD.ApiUpdateThread,
          method: 'PUT',
          data: formData
        }
      },
      invalidatesTags: (result, error, { post_json }) => [
        { type: 'Posts', id: post_json.id }
      ]
    }),

    // Xóa bài viết
    deleteThread: builder.mutation<IBaseResponse<null>, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS_THREAD.ApiDeleteThread}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    }),

    shareThread: builder.mutation<
      IBaseResponse<IPostResponse>,
      ISharePostRequest
    >({
      query: (data) => ({
        url: API_ENDPOINTS_THREAD.ApiSharedThread,
        method: 'POST',
        data
      })
    }),

    // Lấy danh sách bình luận
    getComments: builder.query<
      IBaseResponse<ICommentResponse[]>,
      { post_id: number; page_number: number; page_size?: number }
    >({
      query: ({ post_id, page_number, page_size = 10 }) => ({
        url: '/guest/post/get-comment',
        method: 'GET',
        params: { post_id, page_number, page_size }
      }),
      providesTags: ['Comments']
    }),

    // Thêm bình luận
    addComment: builder.mutation<
      IBaseResponse<ICommentResponse>,
      ICommentRequest
    >({
      query: (data) => ({
        url: '/all/post/create-comment',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Comments']
    }),

    // Chỉnh sửa bình luận
    updateComment: builder.mutation<
      IBaseResponse<ICommentResponse>,
      ICommentRequest
    >({
      query: (data) => ({
        url: '/all/post/update-comment',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Comments']
    }),

    // Xóa bình luận
    deleteComment: builder.mutation<IBaseResponse<null>, number>({
      query: (comment_id) => ({
        url: `/all/post/update-comment/${comment_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comments']
    })
  })
})

export const {
  useGetNewPostsQuery,
  useGetMyPostsQuery,
  useCreateThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useShareThreadMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = threadsApi
