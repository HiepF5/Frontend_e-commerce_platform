import { useState } from 'react'
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import { Reply, Edit, Delete } from '@mui/icons-material'
import { Comment } from '../types/threads.interface'


interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (content: string, parentId?: string) => void
  onUpdateComment: (id: string, content: string) => void
  onDeleteComment: (id: string) => void
}

export function CommentSection({
  comments,
  onAddComment,
  onUpdateComment,
  onDeleteComment
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment, replyTo || undefined)
      setNewComment('')
      setReplyTo(null)
    }
  }

  const handleUpdateComment = (id: string) => {
    if (newComment.trim()) {
      onUpdateComment(id, newComment)
      setNewComment('')
      setEditingComment(null)
    }
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <Box key={comment.id} ml={isReply ? 4 : 0} mt={2}>
      <Box display='flex' alignItems='flex-start'>
        <Avatar
          src={comment.avatar}
          alt={comment.author}
          sx={{ width: 32, height: 32, mr: 1 }}
        />
        <Box flexGrow={1}>
          <Typography variant='subtitle2'>{comment.author}</Typography>
          {editingComment === comment.id ? (
            <Box mt={1}>
              <TextField
                fullWidth
                multiline
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant='outlined'
                size='small'
              />
              <Box mt={1}>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => handleUpdateComment(comment.id)}
                >
                  Update
                </Button>
                <Button size='small' onClick={() => setEditingComment(null)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant='body2'>{comment.content}</Typography>
          )}
          <Typography variant='caption' color='text.secondary'>
            {comment.timestamp}
          </Typography>
        </Box>
        <Box>
          <IconButton size='small' onClick={() => setReplyTo(comment.id)}>
            <Reply fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setEditingComment(comment.id)
              setNewComment(comment.content)
            }}
          >
            <Edit fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => onDeleteComment(comment.id)}>
            <Delete fontSize='small' />
          </IconButton>
        </Box>
      </Box>
      {comment.replies.map((reply) => renderComment(reply, true))}
    </Box>
  )

  return (
    <Box mt={2}>
      {comments.map((comment) => renderComment(comment))}
      <Box mt={2}>
        <TextField
          fullWidth
          multiline
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyTo ? 'Write a reply...' : 'Write a comment...'}
          variant='outlined'
        />
        <Box mt={1}>
          <Button variant='contained' onClick={handleAddComment}>
            {replyTo ? 'Reply' : 'Comment'}
          </Button>
          {replyTo && (
            <Button onClick={() => setReplyTo(null)}>Cancel Reply</Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
