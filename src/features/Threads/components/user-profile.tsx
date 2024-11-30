import React from 'react'
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box
} from '@mui/material'
import { Post } from '../types/threads.interface'

interface UserProfileProps {
  username: string
  avatar: string
  bio: string
  followers: number
  following: number
  posts: Post[]
}

export function UserProfile({
  username,
  avatar,
  bio,
  followers,
  following,
  posts
}: UserProfileProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs>
              <Typography variant='h5'>{username}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {bio}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant='body2' component='span' mr={2}>
                  <strong>{followers}</strong> followers
                </Typography>
                <Typography variant='body2' component='span'>
                  <strong>{following}</strong> following
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button variant='contained'>Follow</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Posts' />
          <Tab label='Media' />
          <Tab label='Likes' />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant='body1'>{post.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
