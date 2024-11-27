import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton
} from '@mui/material'
import { styled } from '@mui/system'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChatService from '../../service/ChatService'
import { useAppDispatch, useAppSelector } from '@store/hook'
import {
  getChatStoryCustomer,
  getChatStoryOwner,
  addMessageToChatStory
} from '../../slices/ChatSlice'

const MessageBubble = styled(Box)<{ owner: boolean }>(({ theme, owner }) => ({
  display: 'inline-block',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(2),
  maxWidth: '70%',
  wordWrap: 'break-word',
  backgroundColor: owner ? theme.palette.primary.main : theme.palette.grey[200],
  color: owner
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  alignSelf: owner ? 'flex-end' : 'flex-start'
}))

const Chat: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currentChat, loading, chatStory, error } = useAppSelector(
    (state) => state.messageChat
  )
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [connected, setConnected] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const messageBoxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (currentChat) {
      // Fetch chat history based on user role
      const fetchChatHistory = user.role.includes('CHUCUAHANG')
        ? getChatStoryOwner
        : getChatStoryCustomer
      dispatch(
        fetchChatHistory({
          chat_id: currentChat.chat_id,
          page_number: 1,
          page_size: 10
        })
      )

      // Establish WebSocket connection
      ChatService.connectWebSocket(
        user.access_token,
        user.shop_code,
        (message) => {
          dispatch(addMessageToChatStory(message))
          setConnected(true)
        },
        (error) => {
          console.error('WebSocket connection failed:', error)
          setConnected(false)
        }
      )
    }

    return () => {
      ChatService.disconnectWebSocket()
    }
  }, [currentChat, dispatch, user])

  const sendMessage = async () => {
    if (!input.trim() || !currentChat || !connected) {
      console.error(
        'Cannot send message. Either not connected or input is empty.'
      )
      return
    }

    setSending(true)

    const messageSent = {
      body: {
        chatId: currentChat.chat_id,
        shopCode: user.shop_code,
        userCode: user.user_code,
        content: input.trim()
      },
      senderCode: user.user_code,
      createdAt: new Date().toISOString(),
      type: 'SENT'
    }

    const success = ChatService.sendMessage(
      `/app/chat.sendCustomer/${user.user_code}`,
      messageSent
    )

    if (success) {
      setInput('')
    } else {
      alert('Failed to send message. Reconnecting...')
      setConnected(false)
    }

    setSending(false)
  }

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!connected && (
        <Typography variant='body2' color='error' align='center'>
          WebSocket is not connected. Please check your connection.
        </Typography>
      )}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
        ref={messageBoxRef}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color='error'>{error}</Typography>
        ) : chatStory?.list_message?.length ? (
          chatStory.list_message.map((msg: any, i: number) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: msg.isOwn ? 'flex-end' : 'flex-start'
              }}
            >
              <MessageBubble owner={msg.isOwn}>
                <Typography>{msg.content}</Typography>
                <Typography variant='caption' sx={{ opacity: 0.7 }}>
                  {formatTime(msg.createdAt)}
                </Typography>
              </MessageBubble>
            </Box>
          ))
        ) : (
          <Typography variant='body2' color='text.secondary' align='center'>
            No messages yet.
          </Typography>
        )}
      </Paper>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
          onKeyPress={(e) => e.key === 'Enter' && !sending && sendMessage()}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={sendMessage}
          disabled={!input.trim() || sending || !connected}
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Chat
