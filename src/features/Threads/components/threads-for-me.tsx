import { useState, useEffect } from 'react'
import { Container, Box, CircularProgress, Typography } from '@mui/material'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { PostModal } from './post-modal'
import { UserProfile } from './user-profile'
import { SearchBar } from './search-bar'
import { ICreatePostJsonRequest, IPostResponse } from '../types/threads.interface'
import { useCreateThreadMutation, useGetMyPostsQuery } from '../api/threadsApi'
import { PostDialog } from './post-dialog'
import ThreadCard from './thread-card'
import { toast } from 'react-toastify'
import { PostTrigger } from './post-trigger'

export default function ThreadForMePage() {
  const [page, setPage] = useState(1)
  const [hashTag, setHashTag] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPostResponse | null>(null)
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [viewedPosts, setViewedPosts] = useState<IPostResponse[]>([])

  // Sử dụng useGetMyPostsQuery thay vì useGetNewPostsQuery
  const {
    data: response,
    isLoading,
    refetch
  } = useGetMyPostsQuery({ 
    hash_tag: hashTag,
    page_number: page, 
    page_size: 5 
  })

  const [createThread] = useCreateThreadMutation()

  useEffect(() => {
    refetch()
  }, [page, hashTag, refetch])

  const handlePostClick = (post: IPostResponse) => {
    setSelectedPost(post)
    if (!viewedPosts.some((p) => p.post_id === post.post_id)) {
      setViewedPosts([...viewedPosts, post])
    }
  }

  const handleSearch = (searchTerm: string) => {
    setHashTag(searchTerm || null)
    setPage(1)
  }

  const handlePostCreated = async (post: ICreatePostJsonRequest) => {
    setIsPostDialogOpen(false)
    try {
      const response = await createThread(post).unwrap()
      if (response && response.code === 200) {
        toast.success('Bài viết đã được tạo')
      }
      if (response && response.code === 403) {
        toast.error(response.message)
      }
      refetch()
    } catch (error) {
      toast.error('Failed to create post')
    }
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Format posts data for UserProfile
  const myPosts = response?.data.data || []
  const userStats = {
    postsCount: response?.data.totalAmount || 0,
    followers: user.followers || 0,
    following: user.following || 0
  }

  if (isLoading && page === 1) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box display='flex'>
      <LeftSidebar />

      <Container maxWidth='md' sx={{ py: 4, flex: 1 }}>
        <Box mb={3}>
          <SearchBar onSearch={handleSearch} />

          <Box mb={4}>
            <UserProfile
              username={user.full_name || 'User'}
              avatar={user.image_url || '/placeholder.svg'}
              bio={user.bio || 'No bio yet'}
              followers={userStats.followers}
              following={userStats.following}
              posts={myPosts}
              postsCount={userStats.postsCount}
            />
          </Box>

          <PostTrigger
            onOpenPostForm={() => setIsPostDialogOpen(true)}
            currentUser={{
              name: user.full_name,
              avatar: user.image_url
            }}
          />
          <PostDialog
            open={isPostDialogOpen}
            onClose={() => setIsPostDialogOpen(false)}
            onSubmit={(post) => handlePostCreated(post)}
          />
        </Box>

        {response?.data.data.length === 0 ? (
          <Typography textAlign='center' color='text.secondary'>
            Bạn chưa có bài viết nào
          </Typography>
        ) : (
          response?.data.data.map((post: IPostResponse) => (
            <ThreadCard
              key={post.post_id}
              post={post}
              onPostUpdated={refetch}
              onClick={() => handlePostClick(post)}
            />
          ))
        )}

        {isLoading && page > 1 && (
          <Box display='flex' justifyContent='center' my={2}>
            <CircularProgress />
          </Box>
        )}

        {response?.data.totalPage && response.data.totalPage > page && (
          <Box display='flex' justifyContent='center' mt={3}>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Xem thêm
            </button>
          </Box>
        )}
      </Container>

      <RightSidebar
        trendingPosts={
          response?.data.data.slice(0, 3).map((post) => ({
            ...post,
            id: post.post_id.toString(),
            reactions: Array.isArray(post.like_count) ? post.like_count : []
          })) || []
        }
        viewedPosts={viewedPosts.slice(0, 3).map((post) => ({
          ...post,
          id: post.post_id.toString(),
          reactions: Array.isArray(post.like_count) ? post.like_count : []
        }))}
        onPostClick={handlePostClick}
      />

      {selectedPost && (
        <PostModal
          open={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
          onSuccess={refetch}
        />
      )}
    </Box>
  )
}
