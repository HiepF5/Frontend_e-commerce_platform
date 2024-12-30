import React, { useState } from 'react'
import {
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Tabs,
  Tab,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material'
import {
  MoreVert,
  Search,
  Edit,
  Archive,
  VolumeOff,
  Block,
  Flag,
  Delete
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { setCurrentChat } from '../../slices/ChatUserSlice'
import { useFetchChatListCustomerQuery } from '../../service/chatMessageUser'
import { IChatItem } from '~/types/message-chat.interface'
import {
  OnlineBadge,
  StyledAvatar,
  StyledListItemButton
} from '@shared/libs/mui/Style'
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
const ChatListUser: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedChat, setSelectedChat] = useState<IChatItem | null>(null)
  console.log(selectedChat)
  const handleChatMenu = (
    event: React.MouseEvent<HTMLElement>,
    chat: IChatItem
  ) => {
    event.stopPropagation()
    setSelectedChat(chat)
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedChat(null)
  }

  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { currentChat } = useAppSelector((state) => state.chatApi)
  console.log('user', user)

  const {
    data: chatList,
    isLoading,
    error,
    refetch: refetchChatList
  } = useFetchChatListCustomerQuery({
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
  console.log('chatListData', chatListData)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading chat list</div>
  const handleSelectChat = (chat: IChatItem) => {
    dispatch(setCurrentChat(chat))
    refetchChatList()
  }

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
                      backgroundColor: chat.online ? '#44b700' : '#9e9e9e',
                      width: '12px', // Tăng kích thước dấu chấm
                      height: '12px', // Tăng kích thước dấu chấm
                      borderRadius: '50%', // Giữ hình dạng tròn
                      border: '2px solid white' // Đường viền dấu chấm // Xanh lá khi online, xám khi offline
                    }
                  }}
                >
                  <StyledAvatar src={chat.story_avatar} />
                </OnlineBadge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: chat.unread_message_count ? 600 : 400
                      }}
                      noWrap
                    >
                      {chat.story_name}
                    </Typography>
                    {chat.unread_message_count > 0 && (
                      <Box
                        component='span'
                        sx={{
                          ml: 1,
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          borderRadius: '12px',
                          padding: '2px 6px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {chat.unread_message_count}
                      </Box>
                    )}
                  </Box>
                }
                secondary={
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    noWrap
                    sx={{
                      maxWidth: '20ch',
                      display: 'block',
                      fontWeight: chat.unread_message_count ? 500 : 400
                    }}
                  >
                    {chat.last_message} {chat.send_last_at}
                  </Typography>
                }
              />
              <Box sx={{ ml: 'auto' }}>
                <IconButton
                  edge='end'
                  aria-label='options'
                  sx={{ color: 'text.secondary' }}
                  onClick={(e) => handleChatMenu(e, chat)}
                >
                  <MoreVert />
                </IconButton>
              </Box>
            </StyledListItemButton>
          ))
        ) : (
          <Typography variant='body1' sx={{ p: 2, color: 'text.secondary' }}>
            No chat available
          </Typography>
        )}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Archive sx={{ mr: 1 }} fontSize='small' />
          Lưu trữ đoạn chat
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <VolumeOff sx={{ mr: 1 }} fontSize='small' />
          Tắt thông báo
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Block sx={{ mr: 1 }} fontSize='small' />
          Chặn
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Flag sx={{ mr: 1 }} fontSize='small' />
          Báo cáo
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} fontSize='small' />
          Xóa đoạn chat
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ChatListUser
