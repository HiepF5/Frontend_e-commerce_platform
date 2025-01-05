import { Box, Avatar, Typography, Grid, Paper, Button, Divider, Tab, Tabs } from '@mui/material'
import { IPostResponse } from '../types/threads.interface'
import { CameraAlt, Edit } from '@mui/icons-material'
import { useState } from 'react'

interface UserProfileProps {
  username: string
  avatar: string
  bio: string
  followers: number
  following: number
  posts: IPostResponse[]
  postsCount: number
}

export function UserProfile({
  username,
  avatar,
  bio,
  followers,
  following,
  postsCount
}: UserProfileProps) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {/* Cover Photo */}
      <Box
        sx={{
          height: 200,
          bgcolor: 'grey.200',
          position: 'relative',
          backgroundImage: 'linear-gradient(to bottom right, #1976d2, #64b5f6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
      >
        <Button
          startIcon={<CameraAlt />}
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            bgcolor: 'white',
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'grey.100'
            }
          }}
        >
          Thêm ảnh bìa
        </Button>
      </Box>

      {/* Profile Info */}
      <Box sx={{ px: 4, pb: 3, position: 'relative' }}>
        {/* Avatar */}
        <Avatar
          src={avatar}
          alt={username}
          sx={{
            width: 168,
            height: 168,
            border: '4px solid white',
            marginTop: '-84px',
            position: 'relative',
            '&:hover .overlay': {
              opacity: 1
            }
          }}
        >
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              height: '40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: '0.3s ease',
              cursor: 'pointer'
            }}
          >
            <CameraAlt sx={{ color: 'white' }} />
          </Box>
        </Avatar>

        {/* Name and Bio */}
        <Box sx={{ mt: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {username}
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                {bio || 'Thêm tiểu sử'}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{ height: 'fit-content' }}
            >
              Chỉnh sửa trang cá nhân
            </Button>
          </Box>

          {/* Stats */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="h6" fontWeight="bold">
                {postsCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bài viết
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight="bold">
                {followers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Người theo dõi
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight="bold">
                {following}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đang theo dõi
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}
