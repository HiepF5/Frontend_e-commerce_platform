import axios from '@shared/libs/axios/axiosInterceptor'
import { IBaseResponse } from '~/types/base.interface'
import {

  IChatItem,
  IChatCreateRequest
} from '~/types/message-chat.interface'


export const createChatWithCustomer = async (
  data: IChatCreateRequest
): Promise<IBaseResponse<IChatItem>> => {
  try {
    const form_data = new FormData()
    form_data.append('user_code', data.user_code)
    form_data.append('shop_code', data.shop_code)
    const response = await axios.post(
      'http://localhost:9000/api/customer/create-chat',
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

export const createChatWithShop = async (
  data: IChatCreateRequest
): Promise<IBaseResponse<IChatItem>> => {
  try {
    const form_data = new FormData()
    form_data.append('user_code', data.user_code)
    form_data.append('shop_code', data.shop_code)
    const response = await axios.post(
      'http://localhost:9000/api/owner/create-chat',
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
