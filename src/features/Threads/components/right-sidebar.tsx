import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Button
} from '@mui/material'
import { IPostResponse, Post } from '../types/threads.interface'

interface RightSidebarProps {
  trendingPosts: IPostResponse[]
  viewedPosts: IPostResponse[]
  onPostClick: (post: IPostResponse) => void
}

export function RightSidebar({
  trendingPosts,
  viewedPosts,
  onPostClick
}: RightSidebarProps) {
  return (
    <div
      style={{
        width: 300,
        height: '100vh',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <Card sx={{ mb: 2 }}>
        <CardHeader title='Bài viết nổi bật' />
        <CardContent>
          {trendingPosts.map((post) => (
            <Button
              key={post.post_id}
              fullWidth
              sx={{ justifyContent: 'flex-start', mb: 1 }}
              onClick={() => onPostClick(post)}
            >
              <Avatar src={post.post_avatar} sx={{ mr: 1 }} />
              <div style={{ textAlign: 'left' }}>
                <Typography variant='subtitle2'>{post.post_name}</Typography>
                <Typography variant='body2' color='text.secondary' noWrap>
                  {post.content}
                </Typography>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title='Bài viết đã xem' />
        <CardContent>
          {viewedPosts.map((post) => (
            <Button
              key={post.post_id}
              fullWidth
              sx={{ justifyContent: 'flex-start', mb: 1 }}
              onClick={() => onPostClick(post)}
            >
              <Avatar src={post.post_avatar} sx={{ mr: 1 }} />
              <div style={{ textAlign: 'left' }}>
                <Typography variant='subtitle2'>{post.post_name}</Typography>
                <Typography variant='body2' color='text.secondary' noWrap>
                  {post.content}
                </Typography>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
