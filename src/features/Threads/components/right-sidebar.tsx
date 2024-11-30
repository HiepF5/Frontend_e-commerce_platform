import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Button
} from '@mui/material'
import { Post } from '../types/threads.interface'

interface RightSidebarProps {
  trendingPosts: Post[]
  viewedPosts: Post[]
  onPostClick: (post: Post) => void
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
              key={post.id}
              fullWidth
              sx={{ justifyContent: 'flex-start', mb: 1 }}
              onClick={() => onPostClick(post)}
            >
              <Avatar src={post.avatar} sx={{ mr: 1 }} />
              <div style={{ textAlign: 'left' }}>
                <Typography variant='subtitle2'>{post.author}</Typography>
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
              key={post.id}
              fullWidth
              sx={{ justifyContent: 'flex-start', mb: 1 }}
              onClick={() => onPostClick(post)}
            >
              <Avatar src={post.avatar} sx={{ mr: 1 }} />
              <div style={{ textAlign: 'left' }}>
                <Typography variant='subtitle2'>{post.author}</Typography>
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
