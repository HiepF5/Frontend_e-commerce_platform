import React from 'react'
import { Box } from '@mui/material'
import ChatList from '../components/Chat/ChatListUser'
import Chat from '../components/Chat/ChatUser'

const ChatPageUser: React.FC = () => {
  return (
    <Box sx={{ height: '87vh', display: 'flex' }}>
      <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider' }}>
        <ChatList />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Chat />
      </Box>
    </Box>
  )
}

export default ChatPageUser
