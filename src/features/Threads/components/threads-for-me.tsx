import React, { useState, useEffect } from 'react'
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Fab,
  Chip
} from '@mui/material'
import {
  Add,
  Close,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { PostModal } from './post-modal'
import { UserProfile } from './user-profile'
import { Notifications } from './notifications'
import { SearchBar } from './search-bar'
import { Post, Reaction, Comment } from '../types/threads.interface'
import PostForm from './post-form'
import { ReactionBar } from './reaction-bar'
import { CommentSection } from './comment-section'

export default function ThreadForMePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [viewedPosts, setViewedPosts] = useState<Post[]>([])
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)

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
    setHasMore(posts.length + newPosts.length < 50) // Limit to 50 posts for this example
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    if (!viewedPosts.some((p) => p.id === post.id)) {
      setViewedPosts([...viewedPosts, post])
    }
  }

  const handleReact = (postId: string, reactionType: Reaction['type']) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const existingReaction = post.reactions.find(
            (r) => r.type === reactionType
          )
          if (existingReaction) {
            return {
              ...post,
              reactions: post.reactions.map((r) =>
                r.type === reactionType ? { ...r, count: r.count + 1 } : r
              )
            }
          } else {
            return {
              ...post,
              reactions: [...post.reactions, { type: reactionType, count: 1 }]
            }
          }
        }
        return post
      })
    )

    // Simulating a new notification
    const newNotification = {
      id: Date.now().toString(),
      type: 'reaction',
      user: 'Someone',
      avatar: '/placeholder.svg',
      content: `reacted with ${reactionType} to your post`,
      timestamp: 'Just now'
    }
    setNotifications([newNotification, ...notifications])
  }

  const handleAddComment = (
    postId: string,
    content: string,
    parentId?: string
  ) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            author: 'Current User',
            avatar: '/placeholder.svg',
            content,
            timestamp: 'Just now',
            replies: []
          }
          if (parentId) {
            return {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === parentId
                  ? { ...comment, replies: [...comment.replies, newComment] }
                  : comment
              )
            }
          } else {
            return { ...post, comments: [...post.comments, newComment] }
          }
        }
        return post
      })
    )
  }

  const handleUpdateComment = (
    postId: string,
    commentId: string,
    content: string
  ) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, content }
                : {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                      reply.id === commentId ? { ...reply, content } : reply
                    )
                  }
            )
          }
        }
        return post
      })
    )
  }

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => {
              if (comment.id === commentId) {
                return false
              }
              comment.replies = comment.replies.filter(
                (reply) => reply.id !== commentId
              )
              return true
            })
          }
        }
        return post
      })
    )
  }

  const handleHashtagClick = (hashtag: string) => {
    // In a real application, this would filter posts or navigate to a hashtag page
    console.log(`Clicked hashtag: ${hashtag}`)
  }

  return (
    <div style={{ display: 'flex' }}>
      <LeftSidebar />

      
      <RightSidebar
        trendingPosts={posts.slice(0, 3)}
        viewedPosts={viewedPosts.slice(0, 3)}
        onPostClick={handlePostClick}
      />
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <UserProfile
        username='Current User'
        avatar='/placeholder.svg'
        bio='This is a sample bio for the current user.'
        followers={100}
        following={50}
        posts={posts.filter((post) => post.author === 'Current User')}
      />
      <Notifications notifications={notifications} />
      <Fab
        color='primary'
        aria-label='add'
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
      >
        {isCreatePostOpen ? <Close /> : <Add />}
      </Fab>
      <IconButton
        color='primary'
        aria-label='notifications'
        style={{ position: 'fixed', bottom: 16, left: 16 }}
        onClick={() => setIsNotificationsOpen(true)}
      >
        <Badge badgeContent={notifications.length} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </div>
  )
}
