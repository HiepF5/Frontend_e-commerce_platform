import React, { useState } from 'react'
import {
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Tooltip,
  Tab,
  Tabs

} from '@mui/material'
import { Edit, MoreVert, Search } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { setCurrentChat } from '../../slices/ChatSlice'
import {
  useFetchChatListOwnerQuery,
} from '../../service/chatMessage'
import { IChatItem } from '~/types/message-chat.interface'
import { OnlineBadge, StyledAvatar, StyledListItemButton } from '@shared/libs/mui/Style'
import { styled } from '@mui/system'
const SearchBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper
}))

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  borderRadius: 20,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.action.selected
  }
}))
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
const [tabValue, setTabValue] = useState(0)
 const chatListData = convertChatList(chatList?.data?.data)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chat list</div>

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 700 }}>
          Chat
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title='Tùy chọn'>
            <IconButton size='small'>
              <MoreVert />
            </IconButton>
          </Tooltip>
          <Tooltip title='Tin nhắn mới'>
            <IconButton size='small'>
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              textTransform: 'none',
              fontSize: '0.9rem'
            }
          }}
        >
          <Tab label='Hộp thư' />
          <Tab label='Cộng đồng' />
        </Tabs>
      </Box>
      <SearchBox>
        <SearchInput
          placeholder='Tìm kiếm trên Messenger'
          startAdornment={<Search sx={{ mr: 1, opacity: 0.5 }} />}
          sx={{
            fontSize: '0.9rem',
            '& .MuiInputBase-input': {
              padding: '8px 12px'
            }
          }}
        />
      </SearchBox>
      <List
        sx={{
          maxHeight: '400px', // Chiều cao tối đa cho danh sách
          overflowY: 'auto', // Kích hoạt cuộn dọc khi vượt quá chiều cao
          '&::-webkit-scrollbar': {
            width: '8px' // Kích thước scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c4c4c4', // Màu của scrollbar
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a0a0a0' // Màu khi hover
          }
        }}
      >
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
                      border: '2px solid white' // Đường viền dấu chấm
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
    </Box>
  )
}

export default ChatList
