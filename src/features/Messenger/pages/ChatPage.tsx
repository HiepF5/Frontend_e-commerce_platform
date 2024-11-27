// src/App.jsx
import { Box } from '@mui/material'
import ChatList from '../components/Chat/ChatList'
import Chat from '../components/Chat/Chat'


function ChatPage() {
  return (
    <div className='h-full'>
      <Box sx={{ display: 'flex', }}>
        <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider' }}>
          <ChatList />
        </Box>
        <Box sx={{ flex: 1 }}>
          {/* <Chat /> */}
        </Box>
      </Box>
    </div>
  )
}

export default ChatPage
