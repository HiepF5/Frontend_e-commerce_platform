import { useState, useEffect } from 'react'
import { Container, Box, Fab, IconButton, Badge } from '@mui/material'
import {
  Add,
  Close,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { PostModal } from './post-modal'
import { UserProfile } from './user-profile'
import { Notifications } from './notifications'
import { SearchBar } from './search-bar'
import { Post } from '../types/threads.interface'
import PostForm from './post-form'

export default function ThreadForMePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [viewedPosts, setViewedPosts] = useState<Post[]>([])
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    // Simulating initial post fetch
    fetchMorePosts()
  }, [])

  const fetchMorePosts = () => {
    // In a real application, this would be an API call
    const newPosts: Post[] = Array(10)
      .fill(null)
      .map((_, index) => ({
        id: Date.now().toString() + index,
        author: `User ${index}`,
        avatar: '/placeholder.svg',
        content: `This is post number ${posts.length + index + 1}`,
        image: index % 2 === 0 ? '/placeholder.svg' : undefined,
        timestamp: 'Just now',
        reactions: [
          { type: 'like', count: Math.floor(Math.random() * 10) },
          { type: 'love', count: Math.floor(Math.random() * 5) },
          { type: 'haha', count: Math.floor(Math.random() * 3) },
          { type: 'wow', count: Math.floor(Math.random() * 2) },
          { type: 'sad', count: Math.floor(Math.random() * 2) },
          { type: 'angry', count: Math.floor(Math.random() * 1) }
        ],
        comments: [],
        postRole: 'KHACHHANG',
        visibility: 'PUBLIC',
        location: '',
        hashTags: [`tag${index + 1}`]
      }))

    setPosts([...posts, ...newPosts])
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    if (!viewedPosts.some((p) => p.id === post.id)) {
      setViewedPosts([...viewedPosts, post])
    }
  }

  return (
    <Box display='flex'>
      <LeftSidebar />
      <Container
        maxWidth='md'
        sx={{ py: 4, flex: 1, overflowY: 'auto', height: '100vh' }}
      >
        <SearchBar />
        <UserProfile
          username='Current User'
          avatar='/placeholder.svg'
          bio='This is a sample bio for the current user.'
          followers={100}
          following={50}
          posts={posts.filter((post) => post.author === 'Current User')}
        />
      </Container>
      <RightSidebar
        trendingPosts={posts.slice(0, 3)}
        viewedPosts={viewedPosts.slice(0, 3)}
        onPostClick={handlePostClick}
      />
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
      >
        {isCreatePostOpen ? <Close /> : <Add />}
      </Fab>
      <IconButton
        color='primary'
        aria-label='notifications'
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
        onClick={() => setIsNotificationsOpen(true)}
      >
        <Badge badgeContent={notifications.length} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {isCreatePostOpen && (
        <PostForm
          onSubmit={(newPost) => {
            const post: Post = {
              id: Date.now().toString(),
              author: 'Current User',
              avatar: '/placeholder.svg',
              timestamp: 'Just now',
              comments: [],
              ...newPost,
              reactions: []
            }
            setPosts([post, ...posts])
            setIsCreatePostOpen(false)
            setNotifications([
              {
                id: Date.now(),
                message: 'New post created',
                timestamp: new Date().toISOString()
              },
              ...notifications
            ])
          }}
          currentUser={{
            name: 'Current User',
            avatar: '/placeholder.svg'
          }}
        />
      )}
      {isNotificationsOpen && <Notifications notifications={notifications} />}
    </Box>
  )
}
