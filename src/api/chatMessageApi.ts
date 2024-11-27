import axios from '@shared/libs/axios/axiosInterceptor'
import { IBaseResponse } from '~/types/base.interface'
import {
  IChatListResponse,
  IChatListRequest,
  IChatStoryRequest,
  IChatDetail
} from '~/types/message-chat.interface'

export const fetchChatListOwner = async (
  data: IChatListRequest
): Promise<IBaseResponse<IChatListResponse>> => {
  try {
    const response = await axios.post(
      'http://localhost:9000/api/owner/message-chat',
      data
    )
    return response.data
  } catch (error) {
    console.error('Error fetching chat story:', error)
    throw error
  }
}
export const fetchChatStoryOwner = async (
  data: IChatStoryRequest
): Promise<IBaseResponse<IChatDetail>> => {
  try {
    const form_data = new FormData()
    form_data.append('chat_id', data.chat_id.toString())
    form_data.append('page_number', data.page_number.toString())
    form_data.append('page_size', data.page_size.toString())
    const response = await axios.post(
      'http://localhost:9000/api/owner/get-chat',
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching chat story:', error)
    throw error
  }
}
export const fetchChatListCustomer = async (
  data: IChatListRequest
): Promise<IBaseResponse<IChatListResponse>> => {
  try {
    const response = await axios.post(
      'http://localhost:9000/api/customer/message-chat',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Error fetching chat story:', error)
    throw error
  }
}
export const fetchChatStoryCustomer = async (
  data: IChatStoryRequest
): Promise<IBaseResponse<IChatDetail>> => {
  try {
    const form_data = new FormData()
    form_data.append('chat_id', data.chat_id.toString())
    form_data.append('page_number', data.page_number.toString())
    form_data.append('page_size', data.page_size.toString())
    const response = await axios.post(
      'http://localhost:9000/api/customer/get-chat',
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching chat story:', error)
    throw error
  }
}
