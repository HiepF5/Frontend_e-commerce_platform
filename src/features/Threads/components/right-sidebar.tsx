import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Paper
} from '@mui/material'
import { IPostResponse } from '../types/threads.interface'
import { Whatshot, History, BookmarkBorder } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MAX_VIEWED_POSTS = 5 // Số lượng bài viết đã xem tối đa muốn hiển thị

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
  const navigate = useNavigate()
  const [recentViewedPosts, setRecentViewedPosts] = useState<IPostResponse[]>([])

  // Cập nhật danh sách bài viết đã xem khi viewedPosts thay đổi
  useEffect(() => {
    // Lọc bỏ các bài trùng lặp và lấy các bài mới nhất
    const uniquePosts = viewedPosts.reduce((acc: IPostResponse[], current) => {
      const exists = acc.find(post => post.post_id === current.post_id)
      if (!exists) {
        acc.unshift(current) // Thêm bài mới vào đầu mảng
      }
      return acc
    }, [])

    // Giới hạn số lượng bài hiển thị
    setRecentViewedPosts(uniquePosts.slice(0, MAX_VIEWED_POSTS))
  }, [viewedPosts])

  const handleAvatarClick = (e: React.MouseEvent, userCode: string) => {
    e.stopPropagation()
    navigate(`/threads/${userCode}`)
  }

  return (
    <Box
      sx={{
        width: 340,
        height: '100vh',
        position: 'sticky',
        top: 0,
        p: 2,
        overflowY: 'auto',
        bgcolor: 'background.default',
        borderLeft: '1px solid',
        borderColor: 'divider',
        '&::-webkit-scrollbar': {
          width: '4px'
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px'
        }
      }}
    >
      {/* Recently Viewed Section - Đưa lên trên đầu */}
      {recentViewedPosts.length > 0 && (
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <History color="action" />
            <Typography variant="h6" fontWeight="bold">
              Đã xem gần đây
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {recentViewedPosts.map((post) => (
              <ListItem
                key={post.post_id}
                onClick={() => onPostClick(post)}
                sx={{
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={post.post_avatar}
                    onClick={(e) => handleAvatarClick(e, post.user_code)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="medium">
                      {post.post_name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {post.content}
                    </Typography>
                  }
                />
                <IconButton size="small">
                  <BookmarkBorder fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Trending Section */}
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Whatshot color="error" />
          <Typography variant="h6" fontWeight="bold">
            Bài viết nổi bật
          </Typography>
        </Box>
        <List sx={{ p: 0 }}>
          {trendingPosts.map((post) => (
            <ListItem
              key={post.post_id}
              onClick={() => onPostClick(post)}
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={post.post_avatar}
                  onClick={(e) => handleAvatarClick(e, post.user_code)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight="medium">
                    {post.post_name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {post.content}
                  </Typography>
                }
              />
              <IconButton size="small">
                <BookmarkBorder fontSize="small" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
