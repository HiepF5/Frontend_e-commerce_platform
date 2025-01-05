import { useState } from 'react'
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
  ImageListItem,
  ImageList
} from '@mui/material'
import { 
  MoreVert as MoreVertIcon,
  ChatBubbleOutline,
  Share as ShareIcon
} from '@mui/icons-material'
import { IPostResponse, Reaction } from '../types/threads.interface'
import { useDeleteThreadMutation, useShareThreadMutation } from '../api/threadsApi'
import { toast } from 'react-toastify'
import { CommentSection } from './comment-section'
import { ReactionBar } from './reaction-bar'


interface ThreadCardProps {
  post: IPostResponse
  onPostUpdated: () => void
  onClick?: () => void
}

const ThreadCard = ({ post, onPostUpdated, onClick }: ThreadCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showComments, setShowComments] = useState(false)
  const [deleteThread] = useDeleteThreadMutation()
  const [shareThread] = useShareThreadMutation()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    try {
      await deleteThread(post.post_id.toString()).unwrap()
      toast.success('Xóa bài viết thành công')
      onPostUpdated()
    } catch (error) {
      toast.error('Lỗi khi xóa bài viết')
    }
    handleMenuClose()
  }

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
  console.log(post.media_url)
  return (
    <Card sx={{ mb: 2 }} onClick={onClick}>
      <CardHeader
        avatar={<Avatar src={post.post_avatar} alt={post.post_name} />}
        action={
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.post_name}
        subheader={post.created_at}
      />

      <CardContent>
        <Typography variant='body1' mb={2}>
          {post.content}
        </Typography>
        <Box mb={2}>
          {post.hash_tag &&
            post.hash_tag.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                size='small'
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
          
        </Box>
        <Box sx={{ width: '100%' }}>
          {post.media_url && post.media_url.length > 0 && (
            <ImageList
              sx={{
                width: '100%',
                margin: 0,
                // Gridding for responsive layout
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr) !important',
                  sm: 'repeat(2, 1fr) !important'
                }
              }}
            >
              {post.media_url.map((url, index) => (
                <ImageListItem key={index} sx={{ width: '100% !important' }}>
                  <img
                    src={url}
                    alt={`Post media ${index + 1}`}
                    loading='lazy'
                    style={{
                      width: '100%',
                      height: '250px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    // onMouseEnter={(e) =>
                    //   ((e.target as HTMLImageElement).style.transform =
                    //     'scale(1.05)')
                    // }
                    // onMouseLeave={(e) =>
                    //   ((e.target as HTMLImageElement).style.transform =
                    //     'scale(1)')
                    // }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
        {post.is_shared && post.shared_post && (
          <Card variant='outlined' sx={{ mt: 2 }}>
            <CardHeader
              avatar={
                <Avatar
                  src={post.shared_post.shared_post_avatar}
                  alt={post.shared_post.shared_post_name}
                  sx={{ width: 32, height: 32 }}
                />
              }
              title={post.shared_post.shared_post_name}
              subheader={post.shared_post.created_at}
              titleTypographyProps={{ variant: 'subtitle2' }}
              subheaderTypographyProps={{ variant: 'caption' }}
            />
            <CardContent>
              <Typography variant='body2'>
                {post.shared_post.content}
              </Typography>
              {post.shared_post.media_url &&
                post.shared_post.media_url.map((url, index) => (
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
      </CardContent>

      <CardActions disableSpacing>
        <ReactionBar
          postId={post.post_id}
          likeCount={post.like_count}
          isLiked={post.is_my_like}
          onReactionChange={onPostUpdated}
          reactions={[]}
          onReact={function (
            type: Reaction['type'],
            e: React.MouseEvent
          ): void {
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
        <MenuItem onClick={handleDelete}>Xóa bài viết</MenuItem>
        <MenuItem onClick={handleShare}>Chia sẻ bài viết</MenuItem>
      </Menu>
    </Card>
  )
}

export default ThreadCard 