import { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Box, CircularProgress, Typography } from '@mui/material'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { PostModal } from './post-modal'
import { SearchBar } from './search-bar'
import { ICreatePostJsonRequest, IPostResponse } from '../types/threads.interface'
import { useCreateThreadMutation, useGetNewPostsQuery } from '../api/threadsApi'
import { PostDialog } from './post-dialog'
import ThreadCard from './thread-card'
import { toast } from 'react-toastify'
import { PostTrigger } from './post-trigger'

export default function ThreadPage() {
  const [page, setPage] = useState(1)
  const [hashTag, setHashTag] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPostResponse | null>(null)
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [posts, setPosts] = useState<IPostResponse[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [viewedPosts, setViewedPosts] = useState<IPostResponse[]>(() => {
    const saved = localStorage.getItem('viewedPosts')
    return saved ? JSON.parse(saved) : []
  })

  const observer = useRef<IntersectionObserver>()
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (!hasMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

  const {
    data: response,
    isLoading,
    refetch
  } = useGetNewPostsQuery({ hashTag, page_number: page, page_size: 10 })

  const [createThread] = useCreateThreadMutation()

  useEffect(() => {
    if (response?.data.data) {
      if (page === 1) {
        setPosts(response.data.data)
      } else {
        setPosts((prev) => [...prev, ...response.data.data])
      }
      setHasMore(page < (response.data.totalPage || 1))
    }
  }, [response, page])

  useEffect(() => {
    localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts))
  }, [viewedPosts])

  const handlePostClick = (post: IPostResponse) => {
    setSelectedPost(post)
    setViewedPosts((prevPosts) => {
      const filteredPosts = prevPosts.filter((p) => p.post_id !== post.post_id)
      return [post, ...filteredPosts]
    })
  }

  const handleSearch = (searchTerm: string) => {
    setHashTag(searchTerm || null)
    setPage(1)
    setPosts([])
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

  if (isLoading && page === 1) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
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

        {posts.length === 0 && !isLoading ? (
          <Typography textAlign='center' color='text.secondary'>
            Không có bài viết nào
          </Typography>
        ) : (
          posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <Box ref={lastPostElementRef} key={post.post_id}>
                  <ThreadCard
                    post={post}
                    onPostUpdated={refetch}
                    onClick={() => handlePostClick(post)}
                  />
                </Box>
              )
            } else {
              return (
                <ThreadCard
                  key={post.post_id}
                  post={post}
                  onPostUpdated={refetch}
                  onClick={() => handlePostClick(post)}
                />
              )
            }
          })
        )}

        {isLoading && (
          <Box display='flex' justifyContent='center' my={2}>
            <CircularProgress />
          </Box>
        )}
      </Container>

      <RightSidebar
        trendingPosts={posts.slice(0, 3)}
        viewedPosts={viewedPosts}
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
