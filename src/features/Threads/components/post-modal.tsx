import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Box
} from '@mui/material'
import { Favorite, ChatBubbleOutline, Share } from '@mui/icons-material'
import { Post, Reaction } from '../types/threads.interface'
import { CommentSection } from './comment-section'

interface PostModalProps {
  post: Post | null
  onClose: () => void
  onReact: (postId: number, reactionType: Reaction['type']) => void
  onAddComment: (postId: number, content: string, parentId?: string) => void
  onUpdateComment: (postId: number, commentId: string, content: string) => void
  onDeleteComment: (postId: number, commentId: string) => void
}

export function PostModal({
  post,
  onClose,
  onReact,
  onAddComment,
  onUpdateComment,
  onDeleteComment
}: PostModalProps) {
  if (!post) return null
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title='React'>
            <IconButton onClick={() => onReact(+post.id, 'like')}>
              <Favorite color='primary' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Comment'>
            <IconButton
              onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
            >
              <ChatBubbleOutline color='primary' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Share'>
            <IconButton>
              <Share color='primary' />
            </IconButton>
          </Tooltip>
        </Box>
        {isCommentSectionOpen && (
          <CommentSection
            comments={post.comments}
            onAddComment={(content, parentId) =>
              onAddComment(+post.id, content, parentId)
            }
            onUpdateComment={(commentId, content) =>
              onUpdateComment(+post.id, commentId, content)
            }
            onDeleteComment={(commentId) =>
              onDeleteComment(+post.id, commentId)
            }
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
