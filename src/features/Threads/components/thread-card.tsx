import { useState, forwardRef } from 'react'
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  ImageList,
  ImageListItem,
  Tooltip,
  Divider
} from '@mui/material'
import { 
  MoreVert as MoreVertIcon,
  ChatBubbleOutline,
  Share as ShareIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  People as PeopleIcon,
  LocationOn
} from '@mui/icons-material'
import { IPostResponse } from '../types/threads.interface'
import { useDeleteThreadMutation, useShareThreadMutation } from '../api/threadsApi'
import { toast } from 'react-toastify'
import { CommentSection } from './comment-section'
import { ReactionBar } from './reaction-bar'
import { useNavigate } from 'react-router-dom'

interface ThreadCardProps {
  post: IPostResponse
  onPostUpdated: () => void
  onClick?: () => void
}

const ThreadCard = forwardRef<HTMLDivElement, ThreadCardProps>(
  ({ post, onPostUpdated, onClick }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [showComments, setShowComments] = useState(false)
    const [deleteThread] = useDeleteThreadMutation()
    const [shareThread] = useShareThreadMutation()
    const navigate = useNavigate()

    // Visibility icon mapping
    const visibilityIcons = {
      PUBLIC: <PublicIcon fontSize="small" />,
      PRIVATE: <LockIcon fontSize="small" />,
      FRIENDS: <PeopleIcon fontSize="small" />
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation()
      
      try {
        const response = await deleteThread(post.post_id.toString()).unwrap()
        if (response.code === 403) {
          toast.error('Bạn không có quyền xóa bài viết này')
          return
        }
        
        toast.success('Xóa bài viết thành công')
        onPostUpdated()
      } catch (error) {
        toast.error('Lỗi khi xóa bài viết')
      }
      handleMenuClose()
    }

    const handleShare = async (e: React.MouseEvent) => {
      e.stopPropagation()
      console.log(post.post_id)
      try {
        await shareThread({
          sharedId: post.post_id,
          postRole: 'KHACHHANG',
          visibility: 'PUBLIC',
          content: `Đã chia sẻ bài viết của ${post.post_name}`,
          location: post.location
        }).unwrap()
        toast.success('Chia sẻ bài viết thành công')
        onPostUpdated()
      } catch (error) {
        toast.error('Lỗi khi chia sẻ bài viết')
      }
      handleMenuClose()
    }

    const handleCommentClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      setShowComments(!showComments)
    }

    const handleAvatarClick = (e: React.MouseEvent) => {
      e.stopPropagation() // Prevent card click
      navigate(`/threads/${post.user_code}`) // Navigate to user profile
    }

    return (
      <Card ref={ref} sx={{ mb: 2 }} onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar
              src={post.post_avatar}
              alt={post.post_name}
              onClick={handleAvatarClick}
              sx={{ cursor: 'pointer' }}
            />
          }
          action={
            <Box display='flex' alignItems='center'>
              <Tooltip title={`Visibility: ${post.visibility}`}>
                {visibilityIcons[post.visibility]}
              </Tooltip>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          }
          title={
            <Box display='flex' alignItems='center' gap={1}>
              <Typography variant='subtitle1' fontWeight='bold'>
                {post.post_role === 'QUANLY' ? 'Admin' : post.post_name}
              </Typography>
              <Chip
                label={post.post_role}
                size='small'
                color={post.post_role === 'QUANLY' ? 'primary' : 'default'}
              />
            </Box>
          }
          subheader={
            <Box>
              <Typography variant='caption' color='text.secondary'>
                {post.created_at}
              </Typography>
              {post.location && (
                <Box display='flex' alignItems='center' gap={0.5} mt={0.5}>
                  <LocationOn fontSize='small' color='action' />
                  <Typography variant='caption' color='text.secondary'>
                    {post.location}
                  </Typography>
                </Box>
              )}
            </Box>
          }
        />

        <CardContent>
          <Typography variant='body1' mb={2}>
            {post.content}
          </Typography>

          {post.hash_tag && post.hash_tag.length > 0 && (
            <Box mb={2}>
              {post.hash_tag.map((tag, index) => (
                <Chip
                  key={index}
                  label={`#${tag}`}
                  size='small'
                  sx={{ mr: 0.5, mb: 0.5 }}
                  clickable
                />
              ))}
            </Box>
          )}

          {post.media_url && post.media_url.length > 0 && (
            <ImageList
              sx={{
                width: '100%',
                margin: 0,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr) !important',
                  sm:
                    post.media_url.length > 1
                      ? 'repeat(2, 1fr) !important'
                      : 'repeat(1, 1fr) !important'
                }
              }}
              gap={8}
            >
              {post.media_url.map((url, index) => (
                <ImageListItem key={index}>
                  <img
                    src={url}
                    alt={`Post media ${index + 1}`}
                    loading='lazy'
                    style={{
                      width: '100%',
                      height: '250px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          {post.is_shared && post.shared_post && (
            <Box mt={2}>
              <Divider sx={{ my: 2 }} />
              <Card variant='outlined'>
                <CardHeader
                  avatar={
                    <Avatar
                      src={post.shared_post.shared_post_avatar}
                      alt={post.shared_post.shared_post_name}
                      sx={{ width: 32, height: 32 }}
                    />
                  }
                  title={
                    <Box display='flex' alignItems='center' gap={1}>
                      <Typography variant='subtitle2'>
                        {post.shared_post.shared_post_name}
                      </Typography>
                      <Chip
                        label={post.shared_post.post_role}
                        size='small'
                        color={
                          post.shared_post.post_role === 'QUANLY'
                            ? 'primary'
                            : 'default'
                        }
                      />
                    </Box>
                  }
                  subheader={post.shared_post.created_at}
                />
                <CardContent>
                  <Typography variant='body2'>
                    {post.shared_post.content}
                  </Typography>
                  {post.shared_post.media_url &&
                    post.shared_post.media_url.length > 0 && (
                      <ImageList
                        sx={{
                          width: '100%',
                          margin: '8px 0 0 0',
                          gridTemplateColumns: {
                            xs: 'repeat(1, 1fr) !important',
                            sm:
                              post.shared_post.media_url.length > 1
                                ? 'repeat(2, 1fr) !important'
                                : 'repeat(1, 1fr) !important'
                          }
                        }}
                        gap={8}
                      >
                        {post.shared_post.media_url.map((url, index) => (
                          <ImageListItem key={index}>
                            <img
                              src={url}
                              alt={`Shared media ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '200px',
                                borderRadius: '4px',
                                objectFit: 'cover'
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )}
                </CardContent>
              </Card>
            </Box>
          )}
        </CardContent>

        <CardActions disableSpacing>
          <ReactionBar
            postId={post.post_id}
            likeCount={post.like_count}
            isLiked={post.is_my_like}
            onReactionChange={onPostUpdated}
            reactions={[]}
            onReact={function (type, e) {
              throw new Error('Function not implemented.')
            }}
          />

          <IconButton onClick={handleCommentClick}>
            <ChatBubbleOutline />
            <Typography variant='caption' sx={{ ml: 0.5 }}>
              {post.comment_count}
            </Typography>
          </IconButton>

          <IconButton onClick={handleShare}>
            <ShareIcon />
            <Typography variant='caption' sx={{ ml: 0.5 }}>
              {post.shared_count}
            </Typography>
          </IconButton>
        </CardActions>

        {showComments && (
          <Box px={2} pb={2}>
            <CommentSection
              postId={post.post_id}
              commentCount={post.comment_count}
              comments={[]}
              onAddComment={function (content: string, parentId?: string): void {
                throw new Error('Function not implemented.')
              }}
              onUpdateComment={function (id: string, content: string): void {
                throw new Error('Function not implemented.')
              }}
              onDeleteComment={function (id: string): void {
                throw new Error('Function not implemented.')
              }}
            />
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={(e) => handleDelete(e)}>Xóa bài viết</MenuItem>
          <MenuItem onClick={(e) => handleShare(e)}>Chia sẻ bài viết</MenuItem>
        </Menu>
      </Card>
    )
  }
)

ThreadCard.displayName = 'ThreadCard'

export default ThreadCard 