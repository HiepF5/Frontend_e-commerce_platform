import React from 'react'
import {
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { setCurrentChat } from '../../slices/ChatSlice'
import {
  useFetchChatListOwnerQuery,
  useFetchChatListCustomerQuery
} from '../../service/chatMessage'
import { IChatItem, IChatListResponse } from '~/types/message-chat.interface'
import { StyledAvatar, StyledListItemButton } from '@shared/libs/mui/Style'

const ChatList: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { currentChat } = useAppSelector((state) => state.chatApi)
  console.log('currentChat', currentChat)
  const {
    data: chatList,
    isLoading,
    error
  } = user.role.includes('CHUCUAHANG')
    ? useFetchChatListOwnerQuery({
        shopCode: null,
        userCode: null,
        pageNumber: 1,
        pageSize: 10
      })
    : useFetchChatListCustomerQuery({
        shopCode: null,
        userCode: null,
        pageNumber: 1,
        pageSize: 10
      })


 const convertChatList = (chatList: IChatItem[] | undefined): IChatItem[] => {
   if (!chatList) return []
   return chatList.map((chat: IChatItem) => ({
     ...chat,
     story_avatar: chat.story_avatar || 'https://via.placeholder.com/150'
   }))
 }

 const chatListData = convertChatList(chatList?.data?.data)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chat list</div>

  return (
    <List>
      {chatListData.length ? (
        chatListData.map((chat: IChatItem, index: number) => (
          <StyledListItemButton
            key={index}
            onClick={() => dispatch(setCurrentChat(chat))}
            selected={currentChat?.chat_id === chat.chat_id}
          >
            <ListItemAvatar className='pr-4'>
              <StyledAvatar src={chat.story_avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant='subtitle1' fontWeight='bold' noWrap>
                  {chat.story_name}
                </Typography>
              }
              secondary={
                <Typography
                  variant='body2'
                  color='text.secondary'
                  noWrap
                  sx={{
                    maxWidth: '20ch',
                    display: 'block'
                  }}
                >
                  {chat.last_message}
                </Typography>
              }
            />
            <Box sx={{ ml: 'auto' }}>
              <IconButton edge='end' aria-label='options'>
                <MoreVert />
              </IconButton>
            </Box>
          </StyledListItemButton>
        ))
      ) : (
        <Typography variant='body1' color='textSecondary'>
          No chat available
        </Typography>
      )}
    </List>
  )
}

export default ChatList
