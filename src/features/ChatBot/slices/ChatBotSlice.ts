import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { chatTextApi, chatImageApi } from '@api/geminiApi'
import { IBaseResponse } from '~/types/base.interface'
import {
  IChatTextRequest,
  IChatTextResponse,
  IChatImageRequest,
  IChatImageResponse
} from '~/types/gemini.interface'

interface ChatMessage {
  text: string
  isUser: boolean
  fileUrl?: string // Optional property for file URLs
  error?: string | null
}
interface ChatState {
  messages: Array<{
    text: string
    isUser: boolean
    fileUrl?: string
  }>
  loading: boolean
  isOpen: boolean // Thêm state để quản lý trạng thái mở/đóng của ChatBot
  error: string | null // Thêm state để quản lý lỗi
}

// Khởi tạo trạng thái ban đầu
const initialState: ChatState = {
  messages: [],
  error: null, // Thêm giá trị mặc định
  isOpen: false, // Thêm giá trị mặc định
  loading: false
}

// Tạo async thunk để gọi API chat bot
export const fetchChatResponse = createAsyncThunk(
  'chat/fetchChatResponse',
  async (message: string) => {
    const requestData: IChatTextRequest = { message }
    const response: IBaseResponse<IChatTextResponse> =
      await chatTextApi(requestData)
    return response.data.candidates[0].content.parts[0].text
  }
)

// Tạo async thunk để gọi API chat-image
export const fetchChatImageResponse = createAsyncThunk(
  'chat/fetchChatImageResponse',
  async (data: IChatImageRequest) => {
    const response: IBaseResponse<IChatImageResponse> = await chatImageApi(data)
    return response.data.candidates[0].content.parts[0].text // Adjust based on actual response structure
  }
)

const ChatBotSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    toggleChat: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Xử lý khi gọi API chat bot
      .addCase(fetchChatResponse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchChatResponse.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false
          state.messages.push({ text: action.payload, isUser: false })
        }
      )
      .addCase(fetchChatResponse.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Đã xảy ra lỗi'
      })
      // Xử lý cho API chat-image
      .addCase(fetchChatImageResponse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchChatImageResponse.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false
          state.messages.push({ text: action.payload, isUser: false })
        }
      )
      .addCase(fetchChatImageResponse.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Đã xảy ra lỗi'
      })
  }
})

export const { addUserMessage, toggleChat } = ChatBotSlice.actions
export default ChatBotSlice.reducer
