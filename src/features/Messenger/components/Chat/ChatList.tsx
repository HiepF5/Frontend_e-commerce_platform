import React, { useEffect } from 'react'
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
import { getChatListCustomer, getChatListOwner, setCurrentChat } from '../../slices/ChatSlice'
import { IChatItem } from '~/types/message-chat.interface'
import { StyledAvatar, StyledListItemButton } from '@shared/libs/mui/Style'

const ChatList = () => {
  const dispatch = useAppDispatch()
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null
  const { chatList, currentChat } = useAppSelector((state) => state.messageChat)

  useEffect(() => {
    if (user && user.role.includes('CHUCUAHANG')) {
      dispatch(
        getChatListOwner({
          shopCode: user.shop_code,
          userCode: null,
          pageNumber: 1,
          pageSize: 10
        })
      )
    } else {
      dispatch(
        getChatListCustomer({
          shopCode: null,
          userCode: user?.user_code || null,
          pageNumber: 1,
          pageSize: 10
        })
      )
    }
  }, [dispatch])

  return (
    <List>
      {chatList?.data?.map((chat: IChatItem, index) => (
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
      ))}
    </List>
  )
}

export default ChatList
