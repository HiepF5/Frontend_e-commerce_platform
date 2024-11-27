import React, { useState, useRef } from 'react'
import {
  IconButton,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useAppDispatch, useAppSelector } from '@store/hook'
import {
  addUserMessage,
  fetchChatResponse,
  fetchChatImageResponse
} from '../slices/ChatBotSlice'
import ReactMarkdown from 'react-markdown'
import { IChatImageRequest } from '~/types/gemini.interface'

const ChatBot: React.FC = () => {
  const dispatch = useAppDispatch()
  const { messages, loading } = useAppSelector((state) => state.chat)
  console.log(messages)
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null) // Tạo ref cho input file

  const handleToggleChat = () => setIsOpen(!isOpen)

  const handleSendMessage = async () => {
    if (input.trim() || selectedFile) {
      if (selectedFile) {
        const fileUrl = URL.createObjectURL(selectedFile) // Tạo blob URL từ selectedFile
        const requestData: IChatImageRequest = {
          message: input,
          file: selectedFile
        }
        try {
          await dispatch(
            addUserMessage({
              text: input,
              isUser: true,
              fileUrl: fileUrl // Lưu fileUrl vào tin nhắn
            })
          )
          await dispatch(fetchChatImageResponse(requestData))
        } catch (error) {
          console.error('Error sending file:', error)
        }
      } else {
        await dispatch(addUserMessage({ text: input, isUser: true }))
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
      setSelectedFile(null) // Reset nếu không có file nào được chọn
    }
  }

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click() // Kích hoạt click vào input file
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
      {/* Chat button */}
      <IconButton
        onClick={handleToggleChat}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark' }
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat box */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: 300,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 3
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
            <Typography variant='h6'>Chat Bot</Typography>
          </Box>

          {/* Chat content */}
          <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  my: 1,
                  p: 1,
                  maxWidth: '70%',
                  borderRadius: 1,
                  backgroundColor: message.isUser ? 'primary.main' : 'grey.300',
                  color: message.isUser ? 'white' : 'black',
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: message.isUser ? 'auto' : '0',
                  marginRight: message.isUser ? '0' : 'auto'
                }}
              >
                {/* Displaying text */}
                <Typography
                  variant='body2'
                  sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {message.text}
                </Typography>

                {/* Render file content based on file type */}
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
          <Box sx={{ p: 2, borderTop: '1px solid #ddd' }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Type your message...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            {selectedFile && (
              <Box>
                <Typography variant='body2'>{selectedFile.name}</Typography>
              </Box>
            )}
            <IconButton onClick={handleFileButtonClick}>
              <AttachFileIcon />
            </IconButton>
            <input
              type='file'
              onChange={handleFileChange}
              ref={fileInputRef} // Gán ref cho input file
              style={{ display: 'none' }} // Ẩn input file
            />
            <Button variant='contained' onClick={handleSendMessage}>
              Gửi
            </Button>
          </Box>
        </Paper>
      )}
    </>
  )
}

export default ChatBot
