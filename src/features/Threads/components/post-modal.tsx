import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Button
} from '@mui/material'
import { Favorite, ChatBubbleOutline, Share } from '@mui/icons-material'
import { Post } from '../types/threads.interface'

interface PostModalProps {
  post: Post | null
  onClose: () => void
}

export function PostModal({ post, onClose }: PostModalProps) {
  if (!post) return null

  return (
    <Dialog open={!!post} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Bài viết</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <Avatar src={post.avatar} sx={{ mr: 2 }} />
          <div>
            <Typography variant='subtitle1'>{post.author}</Typography>
            <Typography variant='body2' color='text.secondary'>
              {post.timestamp}
            </Typography>
          </div>
        </div>
        <Typography variant='body1' paragraph>
          {post.content}
        </Typography>
        {post.image && (
          <img
            src={post.image}
            alt='Post content'
            style={{ width: '100%', borderRadius: '4px', marginBottom: '16px' }}
          />
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button startIcon={<Favorite />} color='primary'>
            {post.reactions.length}
          </Button>
          <Button startIcon={<ChatBubbleOutline />} color='primary'>
            {post.comments.length}
          </Button>
          <Button startIcon={<Share />} color='primary'>
            Chia sẻ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
