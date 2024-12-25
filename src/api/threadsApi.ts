import axios from '@shared/libs/axios/axiosInterceptor'
import { IBaseResponse } from '~/types/base.interface'
import {
  API_ENDPOINTS_THREAD
} from '@config/apiConfig'
import {
  ICreatePostJsonRequest,
  IPostResponse,
  ISharePostRequest
} from '~/features/Threads/types/threads.interface'

export const createThreadApi = async (
  data: ICreatePostJsonRequest
): Promise<IBaseResponse<IPostResponse>> => {
  const formData = new FormData()
  formData.append('post_json', JSON.stringify(data.post_json))
  if (data.file) {
    formData.append('file', data.file)
  }

  try {
    const response = await axios.post<IBaseResponse<IPostResponse>>(
      API_ENDPOINTS_THREAD.ApiCreateThread,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in getLogin:', error)
    throw error
  }
}
export const updateThreadApi = async (
  data: ICreatePostJsonRequest
): Promise<IBaseResponse<IPostResponse>> => {
  const formData = new FormData()
  formData.append('post_json', JSON.stringify(data.post_json))
  if (data.file) {
    formData.append('file', data.file)
  }

  try {
    const response = await axios.put<IBaseResponse<IPostResponse>>(
      API_ENDPOINTS_THREAD.ApiUpdateThread,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in getLogin:', error)
    throw error
  }
}
export const deleteThreadApi = async (
  id: string
): Promise<IBaseResponse<IPostResponse>> => {
  try {
    const response = await axios.delete<IBaseResponse<IPostResponse>>(
      `${API_ENDPOINTS_THREAD.ApiUpdateThread}/${id}`
    )
    return response.data
  } catch (error) {
    console.error('Error in deleteThreadApi:', error)
    throw error
  }
}
export const sharedThreadApi = async (data: ISharePostRequest): Promise<IBaseResponse<IPostResponse>> => {
  try {
    const response = await axios.post<IBaseResponse<IPostResponse>>(
      `${API_ENDPOINTS_THREAD.ApiSharedThread}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error in postSignup:', error);
    throw error;
  }
};
