import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material'
import { styled } from '@mui/system'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SendIcon from '@mui/icons-material/Send'
import {
  useFetchChatListOwnerQuery,
  useFetchChatStoryOwnerQuery
} from '../../service/chatMessage'
import { useAppDispatch, useAppSelector } from '@store/hook'
import {
  addMessageToChatStory,
  setChatStory,
  handleWebSocketMessage
  // addMessageAndSetChatStory
} from '../../slices/ChatSlice'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ChatService from '../../service/ChatService'
import { dateMapper } from '@shared/utils/dateMapper'
import {
  AttachFile,
  EmojiEmotions,
  Gif,
  Image,
  ThumbUp
} from '@mui/icons-material'
import { Send } from 'lucide-react'
import { StyledAvatar } from '@shared/libs/mui/Style'

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
const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 20,
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.selected
    },
    '& fieldset': {
      border: 'none'
    }
  }
}))
const Chat: React.FC = () => {
  const dispatch = useAppDispatch()
  const { chatStory } = useAppSelector((state) => state.chatApi)
  const currentChat = useAppSelector((state) => state.chatApi.currentChat)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const messageBoxRef = useRef<HTMLDivElement | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [messageMenuAnchor, setMessageMenuAnchor] =
    useState<null | HTMLElement>(null)
  const { refetch: refetchChatList } = useFetchChatListOwnerQuery({
    shopCode: null,
    userCode: null,
    pageNumber: 1,
    pageSize: 10
  })

  const {
    data: fetchedChatStory,
    isLoading,
    error: fetchError,
    refetch: refetchChatStoryOwner
  } = useFetchChatStoryOwnerQuery({
    chat_id: currentChat?.chat_id || 0,
    page_number: 1,
    page_size: 10
  })

  useEffect(() => {
    if (fetchedChatStory) {
      dispatch(setChatStory(fetchedChatStory.data))
    }
  }, [fetchedChatStory, dispatch])

  const handleWebSocketMessageAction = useCallback(
    (message: any) => {
      dispatch(handleWebSocketMessage(message))
      refetchChatStoryOwner()
      refetchChatList()
      // dispatch(addMessageAndSetChatStory(message))
      // console.log(chatStory)
      // if (chatStory) {
      //   dispatch(setChatStory({ ...chatStory, list_message: [...chatStory.list_message, message] }))
      // }
      console.log('Received message:', message)
    },
    [dispatch, refetchChatList]
  )
  // const sendFile = async (file: File) => {
  //   setSelectedImage(null)
  //   const reader = new FileReader()
  //   reader.onload = async (e) => {
  //     const base64Image = e.target?.result as string
  //     setSelectedImage(base64Image) // Set preview
  //     console.log('Base64 Image:', base64Image)
  //   }
  //   reader.readAsDataURL(file)
  // }

  const connectWebSocket = useCallback(() => {
    if (currentChat) {
      ChatService.connectWebSocket(
        user.access_token,
        user.shop_code,
        handleWebSocketMessageAction,
        () => setConnected(true),
        (error) => {
          console.error('WebSocket connection failed:', error)
          setConnected(false)
          setError('Connection failed. Attempting to reconnect...')
        }
      )
    }
  }, [currentChat, user.access_token, user.shop_code, handleWebSocketMessage])

  useEffect(() => {
    connectWebSocket()

    return () => {
      ChatService.disconnectWebSocket()
    }
  }, [connectWebSocket])

  const sendMessage = async () => {
    if ((!input.trim() && !selectedImage) || !currentChat || !connected) {
      setError(
        'Cannot send message. Please check your connection and try again.'
      )
      return
    }

    setSending(true)

    const message = {
      body: {
        chatId: currentChat.chat_id,
        shopCode: user.shop_code,
        userCode: user.user_code,
        replyTo: null,
        content: input.trim(),
        imageUrl: selectedImage || null
      },
      senderCode: user.user_code,
      createdAt: dateMapper(),
      type: 'SENT'
    }

    try {
      const success = await ChatService.sendMessage(
        `/app/chat.sendCustomer/${currentChat.user_code}`,
        message
      )

      if (success) {
        refetchChatList()
        setSelectedImage(null)
        setInput('')
        dispatch(addMessageToChatStory(message))
        if (user.role.includes('CHUCUAHANG')) {
          const updatedChatStoryOwner = await refetchChatStoryOwner()
          if (updatedChatStoryOwner.data) {
            dispatch(setChatStory(updatedChatStoryOwner.data.data))
          }
        }
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setError('Failed to send message. Please try again.')
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }
const [hoveredMessageIndex, setHoveredMessageIndex] = useState<number | null>(
  null
)
  const seenMessage = useCallback(async () => {
    if (!connected || !currentChat) {
      console.error(
        'Cannot mark as seen. WebSocket is not connected or no current chat.'
      )
      return
    }

    const message = {
      body: {
        chatId: currentChat.chat_id,
        shopCode: user.shop_code,
        userCode: user.user_code,
        content: null
      },
      senderCode: user.user_code,
      createdAt: new Date().toISOString(),
      type: 'SEEN'
    }

    const success = ChatService.seenMessage(
      `/app/chat.sendShop/${currentChat.user_code}`,
      message
    )
    if (!success) {
      console.error('Failed to send seen message. WebSocket is not connected.')
    }
  }, [connected, currentChat, user.shop_code, user.user_code])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
    }
    seenMessage()
  }, [chatStory, seenMessage])

  if (isLoading) return <CircularProgress />
  if (fetchError)
    return <Typography color='error'>Error loading chat story</Typography>
  const sendFile = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string
      setSelectedImage(base64Image) // Set preview
      console.log('Base64 Image:', base64Image)
    }
    reader.readAsDataURL(file)
  }

  
  const handleMessageMenu = (
    event: React.MouseEvent<HTMLElement>,
    message: any
  ) => {
    event.preventDefault()
    setSelectedMessage(message)
    setMessageMenuAnchor(event.currentTarget)
  }
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        {chatStory?.list_message?.length ? (
          chatStory.list_message.map((msg: any, i: number) => {
            {
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.is_shop_sender
                      ? 'flex-end'
                      : 'flex-start'
                  }}
                  onMouseEnter={() => setHoveredMessageIndex(i)} // Khi hover, lưu chỉ số tin nhắn
                  onMouseLeave={() => setHoveredMessageIndex(null)} // Khi rời chuột, reset state
                  onContextMenu={(e) => handleMessageMenu(e, msg)}
                >
                  {msg.is_shop_sender && (
                    <StyledAvatar
                      src={currentChat?.story_avatar}
                      sx={{
                        width: 28,
                        height: 28,
                        mr: 1,
                        alignSelf: 'flex-end'
                      }}
                    />
                  )}
                  <MessageBubble owner={msg.is_shop_sender}>
                    {msg.image_Url && (
                      <img
                        src={msg.image_Url}
                        alt='Sent'
                        style={{
                          maxHeight: 150,
                          maxWidth: '100%',
                          objectFit: 'contain',
                          marginBottom: 8
                        }}
                      />
                    )}
                    <Typography>{msg.content}</Typography>
                    <Typography variant='caption' sx={{ opacity: 0.7 }}>
                      {msg.created_at}
                    </Typography>
                    {hoveredMessageIndex === i && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '-24px', // Căn sát phía dưới tin nhắn
                          left: !msg.is_shop_sender ? 'auto' : '0', // Bên trái nếu shop gửi
                          right: !msg.is_shop_sender ? '0' : 'auto', // Bên phải nếu user gửi
                          display: 'flex',
                          gap: 0.5,
                          bgcolor: 'background.paper',
                          p: 0.5,
                          borderRadius: 5,
                          boxShadow: 2
                        }}
                      >
                        {['👍', '❤️', '😆', '😮', '😢', '😠'].map((emoji) => (
                          <Typography
                            key={emoji}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': { transform: 'scale(1.2)' },
                              transition: 'transform 0.2s'
                            }}
                          >
                            {emoji}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </MessageBubble>
                </Box>
              )
            }
          })
        ) : (
          <Typography variant='body2' color='text.secondary' align='center'>
            No messages yet.
          </Typography>
        )}
      </Paper>

      <Box
        component='form'
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'background.paper',
          position: 'relative'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title='Đính kèm'>
            <IconButton component='label' sx={{ color: 'text.secondary' }}>
              <AttachFile />
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='file-input'
                type='file'
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    sendFile(e.target.files[0])
                  }
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='Gửi ảnh'>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Image />
            </IconButton>
          </Tooltip>
          <Tooltip title='Chọn nhãn dán'>
            <IconButton sx={{ color: 'text.secondary' }}>
              <EmojiEmotions />
            </IconButton>
          </Tooltip>
          <Tooltip title='Chọn file GIF'>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Gif />
            </IconButton>
          </Tooltip>
        </Box>
        {selectedImage && (
          <Box
            sx={{
              position: 'absolute',
              top: -60,
              left: 10,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'background.paper',
              padding: 1,
              borderRadius: 1,
              boxShadow: 3,
              zIndex: 10
            }}
          >
            <img
              src={selectedImage}
              alt='Preview'
              style={{
                maxHeight: 50,
                maxWidth: 50,
                objectFit: 'contain',
                marginRight: 10
              }}
            />
            <IconButton
              size='small'
              color='secondary'
              onClick={() => setSelectedImage(null)}
            >
              X
            </IconButton>
          </Box>
        )}

        {/* <input
                  accept='image/*'
                  style={{ display: 'none' }}
                  id='file-input'
                  type='file'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      sendFile(e.target.files[0])
                    }
                  }}
                /> */}
        {/* <TextField
                  fullWidth
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Type a message...'
                  disabled={!connected}
                /> */}
        <StyledInput
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Aa'
          disabled={!connected}
          multiline
          maxRows={4}
        />
        {!input.trim() ? (
          <Tooltip title='Gửi like'>
            <IconButton sx={{ color: '#0084ff' }}>
              <ThumbUp />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Gửi'>
            <IconButton
              type='submit'
              color='primary'
              disabled={sending || !connected}
              sx={{
                '&.Mui-disabled': {
                  color: 'text.disabled'
                }
              }}
            >
              <Send />
            </IconButton>
          </Tooltip>
        )}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
          disabled={(!input.trim() && !selectedImage) || sending || !connected}
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Snackbar
        open={!connected}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='warning'>
          WebSocket is not connected. Attempting to reconnect...
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity='error'>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Chat
