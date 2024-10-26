// src/api/chatApi.ts
import axios from '@shared/libs/axios/axiosInterceptor'
import { IBaseResponse } from '~/types/base.interface'
import {
  IChatImageResponse,
  IChatTextRequest,
  IChatTextResponse,
  IChatImageRequest
} from '~/types/gemini.interface'
import { API_ENDPOINTS_CHATBOT } from '@config/apiConfig'
export const chatTextApi = async (
  data: IChatTextRequest
): Promise<IBaseResponse<IChatTextResponse>> => {
  try {
    const response = await axios.get<IBaseResponse<IChatTextResponse>>(
      `${API_ENDPOINTS_CHATBOT.ApiChatBotText}`,
      {
        params: {
          message: data.message
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in chatTextApi:', error)
    throw error
  }
}

export const chatImageApi = async (
  data: IChatImageRequest
): Promise<IBaseResponse<IChatImageResponse>> => {
  const form_data = new FormData();
  form_data.append('message', data.message);
  form_data.append('file', data.file as Blob);

  const response = await axios.post<IBaseResponse<IChatImageResponse>>(
    `${API_ENDPOINTS_CHATBOT.ApiChatBotImage}`,
    form_data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

