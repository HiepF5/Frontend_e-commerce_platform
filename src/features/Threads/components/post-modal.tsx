import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  Chip
} from '@mui/material'
import { Close as CloseIcon, Share as ShareIcon } from '@mui/icons-material'
import { IPostResponse, Reaction } from '../types/threads.interface'
import { toast } from 'react-toastify'
import {ReactionBar }from './reaction-bar'
import {CommentSection }from './comment-section'
import { useShareThreadMutation } from '../api/threadsApi'

interface PostModalProps {
  open: boolean
  post: IPostResponse | null
  onClose: () => void
  onSuccess?: () => void
}

export function PostModal({ open, post, onClose, onSuccess }: PostModalProps) {
  const [shareThread] = useShareThreadMutation()
  
  if (!post) return null

  const handleShare = async () => {
    try {
      await shareThread({
        sharedId: post.post_id,
        postRole: 'KHACHHANG',
        visibility: 'PUBLIC',
        content: `Đã chia sẻ bài viết của ${post.post_name}`,
        location: post.location
      }).unwrap()
      toast.success('Chia sẻ bài viết thành công')
      onSuccess?.()
    } catch (error) {
      toast.error('Lỗi khi chia sẻ bài viết') 
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Chi tiết bài viết</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={post.post_avatar} alt={post.post_name} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {post.post_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.created_at}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>

          {post.media_url && Array.isArray(post.media_url) && post.media_url.length > 0 && (
            <Box mb={2}>
              {post.media_url.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Post content ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    borderRadius: 8,
                    maxHeight: 400,
                    objectFit: 'cover' 
                  }}
                />
              ))}
            </Box>
          )}

          <Box mb={2}>
            {post.hash_tag?.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                size="small"
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
          </Box>

          {post.is_shared && post.shared_post && (
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar
                    src={post.shared_post.shared_post_avatar}
                    alt={post.shared_post.shared_post_name}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography variant="subtitle2">
                    {post.shared_post.shared_post_name}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {post.shared_post.content}
                </Typography>
                {post.shared_post.media_url?.map((url, index) => (
                  <Box mt={1} key={index}>
                    <img
                      src={url}
                      alt={`Shared media ${index + 1}`}
                      style={{
                        width: '100%',
                        borderRadius: 4,
                        maxHeight: 300,
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <ReactionBar
            postId={post.post_id}
            likeCount={post.like_count}
            isLiked={post.is_my_like}
            onReactionChange={onSuccess || (() => { })} reactions={[]} onReact={function (type: Reaction['type'], e: React.MouseEvent): void {
              throw new Error('Function not implemented.')
            } }          />
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>

        <CommentSection
          postId={post.post_id}
          commentCount={post.comment_count} comments={[]} onAddComment={function (content: string, parentId?: string): void {
            throw new Error('Function not implemented.')
          } } onUpdateComment={function (id: string, content: string): void {
            throw new Error('Function not implemented.')
          } } onDeleteComment={function (id: string): void {
            throw new Error('Function not implemented.')
          } }        />
      </DialogContent>
    </Dialog>
  )
}
