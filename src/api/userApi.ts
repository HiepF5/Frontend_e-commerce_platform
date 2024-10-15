import axios from '@shared/libs/axios/axiosInterceptor'
import { IBaseResponse } from '~/types/base.interface'
import { API_ENDPOINTS_USERS } from '@config/apiConfig'
import {
  IChangePasswordRequest,
  IChangeInfoRequest,
  IChangeAvatarRequest,
  IGetUserDetailRequest,
  IUser
} from '~/types/users.interface'
export const getUserInfo = async (
  data: IGetUserDetailRequest
): Promise<IBaseResponse<IUser>> => {
  try {
    const response = await axios.get<IBaseResponse<IUser>>(
      `${API_ENDPOINTS_USERS.ApiGetUserDetail}`,
       {
        params: {
          email: data.email,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in getLogin:', error)
    throw error
  }
}

export const putChangePassword = async (
  data: IChangePasswordRequest
): Promise<IBaseResponse<string>> => {
  try {
    const form_data = new FormData()
    form_data.append('email', data.email)
    form_data.append('old_password', data.old_password)
    form_data.append('new_password', data.new_password)
    const response = await axios.put<IBaseResponse<string>>(
      `${API_ENDPOINTS_USERS.ApiChangePassword}`,
      form_data,
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
export const putChangeInfo = async (
  data: IChangeInfoRequest
): Promise<IBaseResponse<string>> => {
  debugger;
  try {
    const response = await axios.put<IBaseResponse<string>>(
      `${API_ENDPOINTS_USERS.ApiChangeInfo}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error in getLogin:', error)
    throw error
  }
}
export const putChangeAvt = async (
  data: IChangeAvatarRequest
): Promise<IBaseResponse<string>> => {
  const form_data = new FormData()
  form_data.append('email', data.email)
  form_data.append('file', data.file)
  try {
    const response = await axios.put<IBaseResponse<string>>(
      `${API_ENDPOINTS_USERS.ApiChangeAvatar}`,
      form_data,
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
