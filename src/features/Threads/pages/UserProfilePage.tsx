import { useState } from 'react'
import { 
  Container, 
  Box, 
  CircularProgress, 
  Typography,
  Tab,
  Tabs,
  Button,
  Avatar,
  Divider,
  Grid,
  Paper,
  IconButton
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { LeftSidebar } from '../components/left-sidebar'
import { RightSidebar } from '../components/right-sidebar'
import { SearchBar } from '../components/search-bar'
import ThreadCard from '../components/thread-card'
import { useGetUserPostsQuery } from '../api/threadsApi'
import { IPostResponse } from '../types/threads.interface'
import { PostModal } from '../components/post-modal'
import {
  CameraAlt,
  GridView,
  BookmarkBorder,
  PersonAdd,
  Message
} from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function UserProfilePage() {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [hashTag, setHashTag] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPostResponse | null>(null)
  const [viewedPosts, setViewedPosts] = useState<IPostResponse[]>([])
  const [tabValue, setTabValue] = useState(0)

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

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
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
    <Box display='flex'>
      <LeftSidebar />

      <Container maxWidth='md' sx={{ py: 4, flex: 1 }}>
        <SearchBar onSearch={handleSearch} />

        {userInfo && (
          <Paper
            elevation={0}
            sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}
          >
            {/* Cover Photo */}
            <Box
              sx={{
                height: 250,
                bgcolor: 'grey.200',
                position: 'relative',
                backgroundImage:
                  'linear-gradient(to bottom right, #1976d2, #64b5f6)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                <CameraAlt />
              </IconButton>
            </Box>

            {/* Profile Info */}
            <Box sx={{ px: 4, pt: 2, pb: 3, position: 'relative' }}>
              <Grid container spacing={2} alignItems='flex-end'>
                <Grid item>
                  <Avatar
                    src={userInfo.post_avatar}
                    sx={{
                      width: 150,
                      height: 150,
                      border: '4px solid white',
                      marginTop: '-75px',
                      position: 'relative'
                    }}
                  >
                    <Box
                      className='overlay'
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
                        cursor: 'pointer',
                        '&:hover': { opacity: 1 }
                      }}
                    >
                      <CameraAlt sx={{ color: 'white' }} />
                    </Box>
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Box>
                      <Typography variant='h4' fontWeight='bold'>
                        {userInfo.post_name}
                      </Typography>
                      <Typography variant='body1' color='text.secondary' mt={1}>
                        {userInfo.location || 'Chưa có địa chỉ'}
                      </Typography>
                    </Box>
                    <Box display='flex' gap={1}>
                      <Button variant='contained' startIcon={<PersonAdd />}>
                        Theo dõi
                      </Button>
                      <Button variant='outlined' startIcon={<Message />}>
                        Nhắn tin
                      </Button>
                    </Box>
                  </Box>

                  <Box display='flex' gap={4} mt={3}>
                    <Typography>
                      <strong>{response?.data.totalAmount || 0}</strong> bài
                      viết
                    </Typography>
                    <Typography>
                      <strong>{userInfo.like_count || 0}</strong> người theo dõi
                    </Typography>
                    <Typography>
                      Đang theo dõi{' '}
                      <strong>{userInfo.shared_count || 0}</strong> người
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Tabs */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: 120,
                  fontWeight: 'bold'
                }
              }}
            >
              <Tab icon={<GridView />} label='Bài viết' />
              <Tab icon={<BookmarkBorder />} label='Đã lưu' />
            </Tabs>
          </Paper>
        )}

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          {response?.data.data.length === 0 ? (
            <Typography textAlign='center' color='text.secondary' mt={4}>
              Chưa có bài viết nào
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

          {response?.data.totalPage && response.data.totalPage > page && (
            <Box display='flex' justifyContent='center' mt={3}>
              <Button
                variant='outlined'
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLoading}
              >
                Xem thêm
              </Button>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography textAlign='center' color='text.secondary' mt={4}>
            Chưa có bài viết nào được lưu
          </Typography>
        </TabPanel>
      </Container>

      <RightSidebar
        trendingPosts={response?.data.data.slice(0, 3) || []}
        viewedPosts={viewedPosts.slice(0, 3)}
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
      {/* <PostModal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onSuccess={refetch}
      /> */}
    </Box>
  )
} 