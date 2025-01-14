import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dateMapper } from '@shared/utils/dateMapper'
import {
  IChatItem,
  IChatDetail,
  IMessage
} from '~/types/message-chat.interface'

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

const chatSlice = createSlice({
  name: 'chatApi',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<IChatItem>) => {
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
    addMessageAndSetChatStory: (state, action: PayloadAction<any>) => {
      if (state.chatStory) {
        // Chuyển đổi dữ liệu thành định dạng IMessage
        const message: IMessage = {
          id: Date.now(), // hoặc sử dụng id từ action.payload nếu có
          is_shop_sender:
          action.payload.shopCode === state.currentChat?.shop_code, // ví dụ so sánh shopCode
          reply_to: action.payload.replyTo || 0, // nếu có replyTo thì dùng, nếu không thì mặc định 0
          reply_message: action.payload.replyTo ? action.payload.content : null, // nếu có replyTo thì lấy nội dung reply
          content: action.payload.body.content,
          image_Url: action.payload.imageUrl || null, // Nếu có imageUrl thì lấy, nếu không thì null
          is_read: false, // mặc định là chưa đọc
          created_at: dateMapper() // thời gian tạo tin nhắn
        }

        // Thêm tin nhắn vào list_message
        state.chatStory.list_message.push(message)
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
  handleWebSocketMessage,
  addMessageAndSetChatStory
} = chatSlice.actions
export default chatSlice.reducer
