
import {
  Card,
  CardContent,
  Avatar,
  TextField,
  Box,
  Button,
  Divider
} from '@mui/material'
import { VideoCall, PhotoLibrary, EmojiEmotions } from '@mui/icons-material'

interface PostTriggerProps {
  onOpenPostForm: () => void
  currentUser: {
    name: string
    avatar: string
  }
}

export function PostTrigger({ onOpenPostForm, currentUser }: PostTriggerProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={currentUser.avatar} sx={{ mr: 2 }} />
          <TextField
            fullWidth
            placeholder={`${currentUser.name} ơi, bạn đang nghĩ gì thế?`}
            onClick={onOpenPostForm}
            InputProps={{
              readOnly: true,
              style: {
                color: 'grey'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: 'grey.100'
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'grey',
                opacity: 1
              }
            }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<VideoCall color='error' />}
            sx={{ flex: 1, textTransform: 'none' }}
          >
            Video trực tiếp
          </Button>
          <Button
            startIcon={<PhotoLibrary color='success' />}
            sx={{ flex: 1, textTransform: 'none' }}
          >
            Ảnh/video
          </Button>
          <Button
            startIcon={<EmojiEmotions sx={{ color: '#FFB900' }} />}
            sx={{ flex: 1, textTransform: 'none' }}
          >
            Cảm xúc/hoạt động
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
