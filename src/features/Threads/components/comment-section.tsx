import { useState, useEffect } from 'react'
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import { Reply, Edit, Delete } from '@mui/icons-material'
import { ICommentResponse } from '../types/threads.interface'
import { useGetCommentsQuery } from '../api/threadsApi'

interface CommentSectionProps {
  comments: ICommentResponse[]
  postId: number
  commentCount: number
  onAddComment: (content: string, parentId?: number) => void
  onUpdateComment: (id: number, content: string) => void
  onDeleteComment: (id: number) => void
}

export function CommentSection({
  comments,
  postId,
  onAddComment,
  onUpdateComment,
  onDeleteComment
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<number | undefined>(undefined)
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [childrenComments, setChildrenComments] = useState<{
    [key: number]: ICommentResponse[]
  }>({}) // State for storing child comments
  const [loadingReplies, setLoadingReplies] = useState<{
    [key: number]: boolean
  }>({}) // Track loading state for each comment
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  ) // Track the selected comment for replies

  const {
    data: replyData,
    refetch
  } = useGetCommentsQuery({
    post_id: postId,
    page_number: 1,
    comment_id: selectedCommentId || -1 // Trigger only if a comment is selected
  })

  useEffect(() => {
    if (selectedCommentId !== null && replyData) {
      // Update children comments when the data is fetched
      setChildrenComments((prevState) => ({
        ...prevState,
        [selectedCommentId]: Array.isArray(replyData.data) ? replyData.data : [] // Ensure responseData is an array
      }))
    }
  }, [selectedCommentId, replyData])

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment, replyTo)
      setNewComment('')
      setReplyTo(undefined)
    }
  }

  const handleUpdateComment = (id: number) => {
    if (editingContent.trim()) {
      onUpdateComment(id, editingContent)
      setEditingComment(null)
      setEditingContent('')
    }
  }

  const handleLoadReplies = (commentId: number) => {
    if (loadingReplies[commentId]) return // Prevent multiple fetches for the same comment
    setLoadingReplies((prev) => ({ ...prev, [commentId]: true }))
    setSelectedCommentId(commentId) // Trigger data fetch for replies
    refetch() // Trigger the query
    setLoadingReplies((prev) => ({ ...prev, [commentId]: false }))
  }

  const renderComment = (
    comment: ICommentResponse,
    isReply = false,
    depth = 0
  ) => {
    if (depth > 3) return null
    return (
      <Box key={comment.commentId} ml={isReply ? 4 : 0} mt={2}>
        <Box display='flex' alignItems='flex-start'>
          <Avatar
            src={comment.userAvatar}
            alt={comment.username}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Box flexGrow={1}>
            <Typography variant='subtitle2'>{comment.username}</Typography>
            {editingComment === comment.commentId ? (
              <Box mt={1}>
                <TextField
                  fullWidth
                  multiline
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  variant='outlined'
                  size='small'
                />
                <Box mt={1}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => handleUpdateComment(comment.commentId)}
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
              {comment.createdAt}
            </Typography>
            {comment.childrenCount > 0 && (
              <Typography
                variant='caption'
                color='primary'
                sx={{ cursor: 'pointer', mt: 1 }}
                onClick={() => handleLoadReplies(comment.commentId)} // Trigger the query when clicked
              >
                {`${comment.childrenCount} ${comment.childrenCount === 1 ? 'reply' : 'replies'}`}
              </Typography>
            )}
            {/* Render child comments if available */}
            {childrenComments[comment.commentId]?.map(
              (childComment) => renderComment(childComment, true, depth + 1) // Render replies as indented comments
            )}
            {/* Show loading state */}
            {loadingReplies[comment.commentId] && (
              <Typography variant='body2' color='text.secondary'>
                Loading replies...
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton
              size='small'
              onClick={() => setReplyTo(comment.commentId)}
            >
              <Reply fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                setEditingComment(comment.commentId)
                setEditingContent(comment.content)
              }}
            >
              <Edit fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => onDeleteComment(comment.commentId)}
            >
              <Delete fontSize='small' />
            </IconButton>
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <Box mt={2}>
      {comments.map((comment) => renderComment(comment, false, 0))}
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
            <Button onClick={() => setReplyTo(undefined)}>Cancel Reply</Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}
