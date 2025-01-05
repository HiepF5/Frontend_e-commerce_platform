import { useState, useEffect } from 'react'
import { Container, Box, CircularProgress, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { LeftSidebar } from '../components/left-sidebar'
import { RightSidebar } from '../components/right-sidebar'
import { UserProfile } from '../components/user-profile'
import { SearchBar } from '../components/search-bar'
import ThreadCard from '../components/thread-card'
import { useGetUserPostsQuery } from '../api/threadsApi'
import { IPostResponse } from '../types/threads.interface'
import { PostModal } from '../components/post-modal'

export default function UserProfilePage() {
  const { id } = useParams() // Lấy user_code từ URL
  const [page, setPage] = useState(1)
  const [hashTag, setHashTag] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPostResponse | null>(null)
  const [viewedPosts, setViewedPosts] = useState<IPostResponse[]>([])

  const {
    data: response,
    isLoading,
    refetch
  } = useGetUserPostsQuery({
    user_code_other: id || '',
    hash_tag: hashTag,
    page_number: page,
    page_size: 5
  })

  const handleSearch = (searchTerm: string) => {
    setHashTag(searchTerm || null)
    setPage(1)
  }

  const handlePostClick = (post: IPostResponse) => {
    setSelectedPost(post)
    if (!viewedPosts.some((p) => p.post_id === post.post_id)) {
      setViewedPosts([...viewedPosts, post])
    }
  }

  if (isLoading && page === 1) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  const userInfo = response?.data.data[0] || null

  return (
    <Box display="flex">
      <LeftSidebar />

      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Box mb={3}>
          <SearchBar onSearch={handleSearch} />
          
          {userInfo && (
            <Box mb={4}>
              <UserProfile
                username={userInfo.post_name}
                avatar={userInfo.post_avatar}
                bio={userInfo.location || 'No bio yet'}
                followers={userInfo.like_count || 0}
                following={userInfo.shared_count || 0}
                posts={response?.data.data || []}
                postsCount={response?.data.totalAmount || 0}
              />
            </Box>
          )}
        </Box>

        {response?.data.data.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            Người dùng chưa có bài viết nào
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
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {response?.data.totalPage && response.data.totalPage > page && (
          <Box display="flex" justifyContent="center" mt={3}>
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

      <PostModal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onSuccess={refetch}
      />
    </Box>
  )
} 