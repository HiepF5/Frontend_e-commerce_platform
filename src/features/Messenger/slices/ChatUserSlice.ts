import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatItem, IChatDetail } from '~/types/message-chat.interface'

interface ChatState {
  currentChat: IChatItem | null
  chatStory: IChatDetail | null
  chatList: any | null
}

const initialState: ChatState = {
  currentChat: null,
  chatStory: null,
  chatList: null
}

const chatUserSlice = createSlice({
  name: 'chatUserApi',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<IChatItem>) => {
      console.log('setCurrentChat', action.payload)
      state.currentChat = action.payload
    },
    setChatStory: (state, action: PayloadAction<IChatDetail>) => {
      state.chatStory = action.payload
    },
    addMessageToChatStory: (state, action: PayloadAction<any>) => {
      if (state.chatStory) {
        state.chatStory = {
          ...state.chatStory, // Tạo object mới
          list_message: [...state.chatStory.list_message, action.payload] // Tạo mảng mới
        }
      }
    },

    handleWebSocketMessage: (state, action: PayloadAction<any>) => {
      const message = action.payload

      // If the message belongs to the current chat
      if (state.currentChat && message.chatId === state.currentChat.chat_id) {
        if (state.chatStory) {
          state.chatStory = {
            ...state.chatStory,
            list_message: [...state.chatStory.list_message, message]
          }
        }
      } else if (state.chatList) {
        // If the message belongs to another chat, increase `unread_count`
        state.chatList = {
          ...state.chatList,
          data: state.chatList.data.map(
            (chat: { chat_id: any; unread_count?: number }) =>
              chat.chat_id === message.chatId
                ? {
                    ...chat,
                    last_message: message.content,
                    updated_at: message.timestamp || new Date().toISOString(),
                    unread_count: (chat.unread_count || 0) + 1
                  }
                : chat
          )
        }
      }
    }
  }
})

export const {
  setCurrentChat,
  setChatStory,
  addMessageToChatStory,
  handleWebSocketMessage
} = chatUserSlice.actions
export default chatUserSlice.reducer
