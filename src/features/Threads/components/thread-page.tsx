import React, { useState, useEffect } from 'react'
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Chip,
  Button,
  Tooltip,
  IconButton
} from '@mui/material'
import { Favorite, ChatBubbleOutline, Share } from '@mui/icons-material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { PostModal } from './post-modal'
import { SearchBar } from './search-bar'
import { Post, Reaction, Comment } from '../types/threads.interface'
import { ReactionBar } from './reaction-bar'
import { useNavigate } from 'react-router-dom'
import { PostDialog } from './post-dialog'
import { PostTrigger } from './post-trigger'
import { useThreadActions } from '../hooks/useThreadActions'
import { PostActions } from './threads-action'

export default function ThreadPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [viewedPosts, setViewedPosts] = useState<Post[]>([])
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null)
  const navigate = useNavigate()
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    postId: number
  ) => {
    setAnchorEl(event.currentTarget)
    setHoveredPostId(postId)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setHoveredPostId(null)
  }
  useEffect(() => {
    fetchMorePosts()
  }, [])

  const fetchMorePosts = () => {
    const newPosts: Post[] = Array(10)
      .fill(null)
      .map((_, index) => ({
        id: Date.now().toString() + index,
        author: `User ${index}`,
        avatar: '/placeholder.svg',
        content: `This is post number ${posts.length + index + 1}`,
        image:
          index % 2 === 0
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMylYQp1Y5ctCDu1dcP6quswN3FahbmX7Y4g&s'
            : undefined,
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
    setHasMore(posts.length + newPosts.length < 50)
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    if (!viewedPosts.some((p) => p.id === post.id)) {
      setViewedPosts([...viewedPosts, post])
    }
  }

  const handleReact = (postId: number, reactionType: Reaction['type']) => {
    setPosts(
      posts.map((post) => {
        if (+post.id === postId) {
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
    postId: number,
    content: string,
    parentId?: string
  ) => {
    setPosts(
      posts.map((post) => {
        if (+post.id === postId) {
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
    postId: number,
    commentId: string,
    content: string
  ) => {
    setPosts(
      posts.map((post) => {
        if (+post.id === postId) {
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

  const handleDeleteComment = (postId: number, commentId: string) => {
    setPosts(
      posts.map((post) => {
        if (+post.id === postId) {
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
  const handleProfile = (open: boolean) => {
    navigate('/threads/me')
  }

  const handleHashtagClick = (hashtag: string) => {
    console.log(`Clicked hashtag: ${hashtag}`)
  }
  const {
    handleCreateThread,
    handleUpdateThread,
    handleDeleteThread,
    handleShareThread
  } = useThreadActions(setPosts)

  return (
    <div style={{ display: 'flex' }}>
      <LeftSidebar />
      <Container
        maxWidth='md'
        sx={{ py: 4, flex: 1, overflowY: 'auto', height: '100vh' }}
      >
        <SearchBar />
        <PostTrigger
          onOpenPostForm={() => setIsPostDialogOpen(true)}
          currentUser={{
            name: 'Current User',
            avatar: '/placeholder.svg'
          }}
        />
        <PostDialog
          open={isPostDialogOpen}
          onClose={() => setIsPostDialogOpen(false)}
          currentUser={{
            name: 'Current User',
            avatar: '/placeholder.svg'
          }}
          onSubmit={handleCreateThread}
        />
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more posts to load.</p>}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{ mb: 2 }}
              onClick={(e) => {
                e.stopPropagation()
                handlePostClick(post)
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={post.avatar}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProfile(true)
                    }}
                  />
                }
                title={post.author}
                subheader={post.timestamp}
                action={
                  <PostActions
                    postId={post.id}
                    onUpdate={handleUpdateThread}
                    onDelete={handleDeleteThread}
                    onShare={handleShareThread}
                  />
                }
              />
              <CardContent>
                <Typography variant='body1'>{post.content}</Typography>
                {post.image && (
                  <img
                    src={post.image}
                    alt='Post content'
                    style={{
                      width: '100%',
                      borderRadius: '4px',
                      marginTop: '8px'
                    }}
                  />
                )}
                <div style={{ marginTop: '8px' }}>
                  {post.hashTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleHashtagClick(tag)
                      }}
                      style={{ marginRight: '4px' }}
                    />
                  ))}
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <ReactionBar
                  reactions={post.reactions}
                  onReact={(type: Reaction['type'], e: React.MouseEvent) => {
                    e.stopPropagation()
                    handleReact(+post.id, type)
                  }}
                />
                <Tooltip title='Like'>
                  <IconButton
                    onMouseEnter={(event) => {
                      event.stopPropagation()
                      handlePopoverOpen(event, +post.id)
                    }}
                    onMouseLeave={handlePopoverClose}
                  >
                    <Favorite />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Comment'>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation()
                      handlePostClick(post)
                    }}
                  >
                    <ChatBubbleOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Share'>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation()
                      handlePostClick(post)
                    }}
                  >
                    <Share />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </InfiniteScroll>
      </Container>
      <RightSidebar
        trendingPosts={posts.slice(0, 3)}
        viewedPosts={viewedPosts.slice(0, 3)}
        onPostClick={handlePostClick}
      />
      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onReact={handleReact}
        onAddComment={handleAddComment}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  )
}
