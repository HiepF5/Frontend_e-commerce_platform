import React, { useEffect, useRef, useState } from 'react'
import { Box, Paper, Typography, TextField, Button } from '@mui/material'
import { styled } from '@mui/system'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { getChatStoryCustomer, getChatStoryOwner } from '../../slices/ChatSlice'
import ChatService from '../../service/ChatService'

interface MessageBubbleProps {
  owner: boolean;
}

const MessageBubble = styled(Box)<MessageBubbleProps>(({ theme, owner }) => ({
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
  const { currentChat } = useAppSelector(
    (state) => state.messageChat
  )
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null
  const [input, setInput] = useState<string>('')
  const notificationSound = useRef(new Audio('/src/assets/mp3/mess.mp3'))
  const messageBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMessageReceived = (message: any) => {
      if (message.type === 'SENT') {
        notificationSound.current.play()
        dispatch(addMessage(message))
      }
    }

    if (user?.access_token) {
      ChatService.connectWebSocket(
        user.access_token,
        user.shop_code,
        onMessageReceived,
        (error) => console.error(error)
      )
    }
    return () => {
      ChatService.disconnectWebSocket()
    }
  }, [user, dispatch])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (input.trim() && currentChat) {
      const messageSent = {
        body: {
          chatId: currentChat.chat_id,
          shopCode: user.shop_code,
          userCode: user.user_code,
          replyTo: null,
          content: input.trim(),
          imageUrl: null
        },
        senderCode: user.user_code,
        createdAt: new Date().toISOString(),
        type: 'SENT'
      }

      ChatService.sendMessage(
        `/app/chat.sendCustomer/${user.user_code}`,
        messageSent
      )
      dispatch(addMessage(messageSent))
      setInput('')
    }
  }

  useEffect(() => {
    if (user && user.role.includes('CHUCUAHANG')) {
      dispatch(
        getChatStoryOwner({
          chat_id: currentChat?.chat_id ?? 0,
          page_number: 1,
          page_size: 10
        })
      )
    } else {
      dispatch(
        getChatStoryCustomer({
          chat_id: currentChat?.chat_id ?? 0,
          page_number: 1,
          page_size: 10
        })
      )
    }
  }, [dispatch])

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
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
        {messages.map((msg, i) => (
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
                {new Date(msg.createdAt).toLocaleTimeString()}
              </Typography>
            </MessageBubble>
          </Box>
        ))}
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
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          sx={{ flex: 1 }}
        />
        <Button variant='contained' color='primary' onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default Chat
