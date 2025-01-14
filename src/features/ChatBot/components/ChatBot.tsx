import React, { useState, useRef } from 'react'
import {
  IconButton,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Tooltip
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import { useAppDispatch, useAppSelector } from '@store/hook'
import {
  addUserMessage,
  fetchChatResponse,
  fetchChatImageResponse,
  toggleChat
} from '../slices/ChatBotSlice'
import ReactMarkdown from 'react-markdown'
import { IChatImageRequest } from '~/types/gemini.interface'

const ChatBot: React.FC = () => {
  const dispatch = useAppDispatch()
  const { messages, loading, isOpen } = useAppSelector((state) => state.chat)
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleToggleChat = () => {
    dispatch(toggleChat(!isOpen))
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleSendMessage = async () => {
    if (input.trim() || selectedFile) {
      if (selectedFile) {
        const fileUrl = URL.createObjectURL(selectedFile)
        const requestData: IChatImageRequest = {
          message: input,
          file: selectedFile
        }
        try {
          dispatch(
            addUserMessage({
              text: input,
              isUser: true,
              fileUrl: fileUrl
            })
          )
          await dispatch(fetchChatImageResponse(requestData))
        } catch (error) {
          console.error('Error sending file:', error)
        }
      } else {
        dispatch(addUserMessage({ text: input, isUser: true }))
        await dispatch(fetchChatResponse(input))
      }

      // Reset state
      setSelectedFile(null)
      setInput('')
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    } else {
      setSelectedFile(null)
    }
  }

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Hàm để kiểm tra loại tệp
  const renderFileContent = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt='File content'
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      )
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
      return (
        <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
          <source
            src={URL.createObjectURL(file)}
            type={`video/${fileExtension}`}
          />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return (
        <Typography variant='body2'>
          <a
            href={URL.createObjectURL(file)}
            target='_blank'
            rel='noopener noreferrer'
          >
            Tải xuống tệp
          </a>
        </Typography>
      )
    }
  }

  return (
    <>
      <IconButton
        onClick={handleToggleChat}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark' },
          zIndex: 1300
        }}
      >
        <ChatIcon />
      </IconButton>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: isExpanded ? '60%' : 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 3,
            transition: 'width 0.3s ease',
            zIndex: 1200
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'white'
            }}
          >
            <Typography variant='h6'>AI Assistant</Typography>
            <Box>
              <Tooltip title={isExpanded ? 'Thu nhỏ' : 'Mở rộng'}>
                <IconButton
                  onClick={handleToggleExpand}
                  sx={{ color: 'white' }}
                >
                  {isExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Chat content */}
          <Box
            sx={{
              p: 2,
              flex: 1,
              overflowY: 'auto',
              bgcolor: '#f5f5f5'
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  my: 1,
                  p: 2,
                  maxWidth: '80%',
                  borderRadius: 2,
                  backgroundColor: message.isUser ? 'primary.main' : 'white',
                  color: message.isUser ? 'white' : 'text.primary',
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: message.isUser ? 'auto' : '0',
                  marginRight: message.isUser ? '0' : 'auto',
                  boxShadow: 1
                }}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>

                {message.fileUrl &&
                  selectedFile &&
                  renderFileContent(selectedFile)}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <CircularProgress size={24} />
              </Box>
            )}
          </Box>

          {/* Input box */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid #ddd',
              bgcolor: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {selectedFile && (
              <Box
                sx={{
                  p: 1,
                  bgcolor: '#f0f0f0',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' noWrap sx={{ flex: 1 }}>
                  {selectedFile.name}
                </Typography>
                <IconButton size='small' onClick={() => setSelectedFile(null)}>
                  ×
                </IconButton>
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                variant='outlined'
                placeholder='Nhập tin nhắn...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                size='small'
                multiline
                maxRows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <IconButton onClick={handleFileButtonClick} color='primary'>
                <AttachFileIcon />
              </IconButton>
              <Button
                variant='contained'
                onClick={handleSendMessage}
                sx={{ borderRadius: 2 }}
              >
                Gửi
              </Button>
            </Box>
          </Box>
          <input
            type='file'
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </Paper>
      )}
    </>
  )
}

export default ChatBot
