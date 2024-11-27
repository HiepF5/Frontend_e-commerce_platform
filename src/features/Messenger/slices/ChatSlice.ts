import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchChatListOwner,
  fetchChatStoryOwner,
  fetchChatListCustomer,
  fetchChatStoryCustomer
} from '@api/chatMessageApi'
import {
  IChatListRequest,
  IChatStoryRequest,
  IChatListResponse,
  IChatDetail,
  IChatItem
} from '~/types/message-chat.interface'

interface ChatState {
  chatList: IChatListResponse | null
  chatStory: IChatDetail | null
  currentChat: IChatItem | null
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  chatList: null,
  chatStory: null,
  currentChat: null,
  loading: false,
  error: null
}

// Async thunks
export const getChatListOwner = createAsyncThunk(
  'messageChat/getChatListOwner',
  async (data: IChatListRequest, { rejectWithValue }) => {
    try {
      const response = await fetchChatListOwner(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching chat list')
    }
  }
)

export const getChatStoryOwner = createAsyncThunk(
  'messageChat/getChatStoryOwner',
  async (data: IChatStoryRequest, { rejectWithValue }) => {
    try {
      const response = await fetchChatStoryOwner(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching chat story'
      )
    }
  }
)

export const getChatListCustomer = createAsyncThunk(
  'messageChat/getChatListCustomer',
  async (data: IChatListRequest, { rejectWithValue }) => {
    try {
      const response = await fetchChatListCustomer(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching chat list')
    }
  }
)

export const getChatStoryCustomer = createAsyncThunk(
  'messageChat/getChatStoryCustomer',
  async (data: IChatStoryRequest, { rejectWithValue }) => {
    try {
      const response = await fetchChatStoryCustomer(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching chat story'
      )
    }
  }
)

const chatSlice = createSlice({
  name: 'messageChat',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<IChatItem>) => {
      state.currentChat = action.payload
    },
    addMessageToChatStory: (state, action) => {
      if (state.chatStory) {
        state.chatStory.list_message.push(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatListOwner.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getChatListOwner.fulfilled,
        (state, action: PayloadAction<IChatListResponse>) => {
          state.loading = false
          state.chatList = action.payload
        }
      )
      .addCase(getChatListOwner.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(getChatStoryOwner.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getChatStoryOwner.fulfilled,
        (state, action: PayloadAction<IChatDetail>) => {
          state.loading = false
          state.chatStory = action.payload
        }
      )
      .addCase(getChatStoryOwner.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(getChatListCustomer.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getChatListCustomer.fulfilled,
        (state, action: PayloadAction<IChatListResponse>) => {
          state.loading = false
          state.chatList = action.payload
        }
      )
      .addCase(getChatListCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(getChatStoryCustomer.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getChatStoryCustomer.fulfilled,
        (state, action: PayloadAction<IChatDetail>) => {
          state.loading = false
          state.chatStory = action.payload
        }
      )
      .addCase(getChatStoryCustomer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})
export const { setCurrentChat, addMessageToChatStory } = chatSlice.actions
export default chatSlice.reducer
