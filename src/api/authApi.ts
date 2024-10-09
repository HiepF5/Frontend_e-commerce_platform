import { ILoginFormRequest, ILoginResponse, ISignupFormRequest } from '~/types/auth.interface';
import axios from '@shared/libs/axios/axiosInterceptor';
import { IBaseResponse } from '~/types/base.interface';
import { API_ENDPOINTS_ACCOUNT } from '@config/apiConfig';

export const getLogin = async (data: ILoginFormRequest): Promise<IBaseResponse<ILoginResponse>> => {
  try {
    const form_data = new FormData();
    form_data.append('username', data.username)
    form_data.append('password', data.password)
    const response = await axios.post<IBaseResponse<ILoginResponse>>(`${API_ENDPOINTS_ACCOUNT.ApiLogin}`,
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in getLogin:', error);
    throw error;
  }
};
export const postSignup = async (data: ISignupFormRequest): Promise<IBaseResponse<string>> => {
  debugger;
  try {
    const response = await axios.post<IBaseResponse<string>>(
      `${API_ENDPOINTS_ACCOUNT.ApiRegister}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error in postSignup:', error);
    throw error;
  }
};