import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  DialogTitle,
  Button,
  ImageList,
  ImageListItem,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Close as CloseIcon,
  Share as ShareIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  People as PeopleIcon,
  LocationOn,
  BookmarkBorder,
  Bookmark
} from '@mui/icons-material'
import { IPostResponse, ReactionType } from '../types/threads.interface'
import { toast } from 'react-toastify'
import { ReactionBar } from './reaction-bar'
import { CommentSection } from './comment-section'
import { useShareThreadMutation } from '../api/threadsApi'
import { useNavigate } from 'react-router-dom'

interface PostModalProps {
  open: boolean
  post: IPostResponse | null
  onClose: () => void
  onSuccess?: () => void
}

export function PostModal({ open, post, onClose, onSuccess }: PostModalProps) {
  const [shareThread] = useShareThreadMutation()
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const visibilityIcons = {
    PUBLIC: <PublicIcon fontSize="small" />,
    PRIVATE: <LockIcon fontSize="small" />,
    FRIENDS: <PeopleIcon fontSize="small" />
  }

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

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Đã bỏ lưu bài viết' : 'Đã lưu bài viết')
  }

  const handleUserClick = () => {
    navigate(`/threads/${post.user_code}`)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 2,
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Chi tiết bài viết</Typography>
          <Tooltip title={`Visibility: ${post.visibility}`}>
            {visibilityIcons[post.visibility]}
          </Tooltip>
        </Box>
        <Box>
          <IconButton onClick={handleSave} sx={{ mr: 1 }}>
            {isSaved ? <Bookmark color="primary" /> : <BookmarkBorder />}
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            mb={2}
            sx={{ cursor: 'pointer' }}
            onClick={handleUserClick}
          >
            <Avatar
              src={post.post_avatar}
              alt={post.post_name}
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.post_role === 'QUANLY' ? 'Admin' : post.post_name}
                </Typography>
                <Chip
                  label={post.post_role}
                  size="small"
                  color={post.post_role === 'QUANLY' ? 'primary' : 'default'}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="caption" color="text.secondary">
                  {post.created_at}
                </Typography>
                {post.location && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {post.location}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>

          {post.media_url && post.media_url.length > 0 && (
            <Box mb={2}>
              <ImageList
                sx={{
                  width: '100%',
                  m: 0,
                  gridTemplateColumns:
                    post.media_url.length > 1
                      ? 'repeat(2, 1fr) !important'
                      : 'repeat(1, 1fr) !important'
                }}
                gap={8}
              >
                {post.media_url.map((url, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={url}
                      alt={`Post content ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '300px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}

          <Box mb={2}>
            {post.hash_tag?.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                size="small"
                sx={{ mr: 0.5, mb: 0.5 }}
                clickable
              />
            ))}
          </Box>

          {post.is_shared && post.shared_post && (
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar
                    src={post.shared_post.shared_post_avatar}
                    alt={post.shared_post.shared_post_name}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Box>
                    <Typography variant="subtitle2">
                      {post.shared_post.shared_post_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.shared_post.created_at}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {post.shared_post.content}
                </Typography>
                {post.shared_post.media_url?.map((url, index) => (
                  <Box mt={1} key={index}>
                    <img
                      src={url}
                      alt={`Shared media ${index + 1}`}
                      style={{
                        width: '100%',
                        borderRadius: 8,
                        maxHeight: 300,
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <ReactionBar
              postId={post.post_id}
              likeCount={post.like_count}
              isLiked={post.is_my_like}
              myReaction={post.my_reaction as ReactionType}
              onReactionChange={onSuccess || (() => {})}
            />
            <Button
              startIcon={<ShareIcon />}
              onClick={handleShare}
              variant="outlined"
              size="small"
            >
              Chia sẻ
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <CommentSection
            postId={post.post_id}
            commentCount={post.comment_count}
            comments={[]}
            onAddComment={(content: string) => {
              console.log('Add comment:', content)
            }}
            onUpdateComment={(id: string, content: string) => {
              console.log('Update comment:', id, content)
            }}
            onDeleteComment={(id: string) => {
              console.log('Delete comment:', id)
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
