
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import PostForm from './post-form'
import { ICreatePostJsonRequest, Post } from '../types/threads.interface'

interface PostDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (post: ICreatePostJsonRequest) => void
  onSuccess?: () => void
}

export function PostDialog({
  open,
  onClose,
  onSubmit,
}: PostDialogProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Typography variant='h6' component='div' sx={{ fontWeight: 'bold' }}>
          Tạo bài viết
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'grey.100',
            '&:hover': {
              bgcolor: 'grey.200'
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <PostForm
          onSubmit={(post) => {
            onSubmit(post)
            onClose()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
