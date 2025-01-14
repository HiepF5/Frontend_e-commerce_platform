import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Divider
} from '@mui/material'
import { Send } from '@mui/icons-material'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'seller'
  timestamp: Date
}

export default function ChatWithSeller() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    setMessages([...messages, {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }])
    setNewMessage('')

    // Simulate seller response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.',
        sender: 'seller',
        timestamp: new Date()
      }])
    }, 1000)
  }

  return (
    <Paper sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Chat với người bán</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <Avatar
                sx={{ 
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                  ml: message.sender === 'user' ? 1 : 0,
                  mr: message.sender === 'user' ? 0 : 1
                }}
              >
                {message.sender === 'user' ? 'U' : 'S'}
              </Avatar>
              <Paper
                sx={{
                  p: 1,
                  maxWidth: '70%',
                  bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100'
                }}
              >
                <Typography>{message.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  )
} 