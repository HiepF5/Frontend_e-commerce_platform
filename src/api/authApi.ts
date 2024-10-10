import { ILoginFormRequest, ILoginResponse, IResetPasswordRequest, ISignupFormRequest, IVerificationRequest, INewPasswordRequest } from '~/types/auth.interface';
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
export const postVerification = async (data: IVerificationRequest): Promise<IBaseResponse<string>> => {
  try {
    const response = await axios.get<IBaseResponse<string>>(
      `${API_ENDPOINTS_ACCOUNT.ApiCheckRegister}`,
      {
        params: {
          email: data.email,
          verify_code: data.verify_code,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in postVerification:', error);
    throw error;
  }
};
export const postRepassword = async (data: IResetPasswordRequest): Promise<IBaseResponse<string>> => {
  try {
    const response = await axios.get<IBaseResponse<string>>(
      `${API_ENDPOINTS_ACCOUNT.ApiForgotPassword}`,
      {
        params: {
          email: data.email,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in postRepassword:', error);
    throw error;
  }
};
export const postCreateNewPassword = async (data: INewPasswordRequest): Promise<IBaseResponse<string>> => {
  const form_data = new FormData();
  form_data.append('email', data.email);
  form_data.append('new_password', data.new_password);
  form_data.append('verify_code', data.verify_code);

  try {
    const response = await axios.put<IBaseResponse<string>>(
      `${API_ENDPOINTS_ACCOUNT.ApiCheckForgot}`,
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in postCreateNewPassword:', error);
    throw error;
  }
};
