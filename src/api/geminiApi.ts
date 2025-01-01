// src/api/chatApi.ts
import axios from '@shared/libs/axios/axiosInterceptor'
import { IBaseResponse } from '~/types/base.interface'
import {
  IChatImageResponse,
  IChatTextRequest,
  IChatTextResponse,
  IChatImageRequest,
  PromptListData,
  CreatePromptFormData,
  UpdatePromptFormData,
  DeletePromptFormData
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
  const form_data = new FormData()
  form_data.append('message', data.message)
  form_data.append('file', data.file as Blob)

  const response = await axios.post<IBaseResponse<IChatImageResponse>>(
    `${API_ENDPOINTS_CHATBOT.ApiChatBotImage}`,
    form_data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data
}

export const getPromptApi = async (): Promise<
  IBaseResponse<PromptListData>
> => {
  try {
    const response = await axios.get<IBaseResponse<PromptListData>>(
      `${API_ENDPOINTS_CHATBOT.ApiChatBotPrompt}`
    )
    return response.data
  } catch (error) {
    console.error('Error in getPromptApi:', error)
    throw error
  }
}

export const createPromptApi = async (
  data: CreatePromptFormData
): Promise<PromptListData> => {
  try {
    const form_data = new FormData()
    form_data.append('prompt_name', data.prompt_name)
    form_data.append('prompt_text', data.prompt_text)
    const response = await axios.post<PromptListData>(
      `${API_ENDPOINTS_CHATBOT.ApiCreatePrompt}`,
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in createPromptApi:', error)
    throw error
  }
}

export const updatePromptApi = async (
  data: UpdatePromptFormData
): Promise<PromptListData> => {
  try {
    const form_data = new FormData()
    form_data.append('prompt_name', data.prompt_name)
    form_data.append('new_prompt_name', data.new_prompt_name)
    form_data.append('prompt_text', data.prompt_text)
    const response = await axios.put<PromptListData>(
      `${API_ENDPOINTS_CHATBOT.ApiUpdatePrompt}`,
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in updatePromptApi:', error)
    throw error
  }
}

export const deletePromptApi = async (
  data: DeletePromptFormData
): Promise<IBaseResponse<String>> => {
  try {
    const form_data = new FormData()
    form_data.append('prompt_name', data.prompt_name)
    const response = await axios.delete<IBaseResponse<String>>(
      `${API_ENDPOINTS_CHATBOT.ApiDeletePrompt}`,
      {
        data: form_data,
        headers: {
          'Content-Type': 'multipart/form-data'
          }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in deletePromptApi:', error)
    throw error
  }
}

export const analysisPromptApi = async (
  data: any
): Promise<IBaseResponse<any>> => {
  try {
    const response = await axios.post<IBaseResponse<any>>(
      `${API_ENDPOINTS_CHATBOT.ApiAnalysisPrompt}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error in analysisPromptApi:', error)
    throw error
  }
}

export const reviewWithPromptApi = async (
  data: any
): Promise<IBaseResponse<any>> => {
  try {
    const response = await axios.post<IBaseResponse<any>>(
      `${API_ENDPOINTS_CHATBOT.ApiReviewWithPrompt}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error in reviewWithPromptApi:', error)
    throw error
  }
}

export const chatWithPromptApi = async (
  data: any
): Promise<IBaseResponse<any>> => {
  try {
    const response = await axios.post<IBaseResponse<any>>(
      `${API_ENDPOINTS_CHATBOT.ApiChatWithPrompt}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error in chatWithPromptApi:', error)
    throw error
  }
}
