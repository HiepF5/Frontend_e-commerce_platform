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
} from '../../service/chatMessage'
import { IChatItem } from '~/types/message-chat.interface'
import { OnlineBadge, StyledAvatar, StyledListItemButton } from '@shared/libs/mui/Style'

const ChatList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currentChat } = useAppSelector((state) => state.chatApi)
  const {
    data: chatList,
    isLoading,
    error,
    refetch: refetchChatList
  } = useFetchChatListOwnerQuery({
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
 const handleSelectChat = (chat: IChatItem) => {
   dispatch(setCurrentChat(chat))
   refetchChatList()
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
            onClick={() => handleSelectChat(chat)}
            selected={currentChat?.chat_id === chat.chat_id}
          >
            <ListItemAvatar className='pr-4'>
              <OnlineBadge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
                sx={{
                  '& .MuiBadge-dot': {
                    backgroundColor: chat.online ? '#44b700' : '#9e9e9e', // Xanh lá khi online, xám khi offline
                     width: '12px', // Tăng kích thước dấu chấm
        height: '12px', // Tăng kích thước dấu chấm
        borderRadius: '50%', // Giữ hình dạng tròn
        border: '2px solid white', // Đường viền dấu chấm
                  }
                }}
              >
                <StyledAvatar src={chat.story_avatar} />
              </OnlineBadge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant='subtitle1' fontWeight='bold' noWrap>
                  {chat.story_name}{' '}
                  {chat.unread_message_count > 0
                    ? `(${chat.unread_message_count})`
                    : ''}
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
                  {chat.last_message} {chat.send_last_at}
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
