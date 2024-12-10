import React from 'react'
import { Box } from '@mui/material'
import ChatList from '../components/Chat/ChatList'
import Chat from '../components/Chat/Chat'

const ChatPage: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider' }}>
        <ChatList />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Chat />
      </Box>
    </Box>
  )
}

export default ChatPage
