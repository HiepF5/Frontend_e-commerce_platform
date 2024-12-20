'use client'

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
  Breadcrumbs
} from '@mui/material'
import {
  MessageCircle,
  Store,
  ChevronRight,
  Clock,
  Users,
  Star,
  Timer
} from 'lucide-react'

interface SellerStats {
  rating: string
  responseRate: string
  responseTime: string
  followers: string
  lastSeen: string
  products: number
}

interface SellerProfileProps {
  name: string
  stats: SellerStats
}

export default function SellerProfile({ name, stats }: SellerProfileProps) {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src='/placeholder.svg?height=80&width=80'
            />
          </Grid>

          <Grid item xs>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant='h6'>{name}</Typography>
              <Typography
                variant='caption'
                sx={{
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                <Clock className='w-4 h-4 inline-block mr-1' />
                Online 3 Phút Trước
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant='contained'
                color='error'
                startIcon={<MessageCircle />}
              >
                Chat Ngay
              </Button>
              <Button variant='outlined' startIcon={<Store />}>
                Xem Shop
              </Button>
            </Box>
          </Grid>

          <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <Typography color='text.secondary' gutterBottom>
                    Đánh Giá
                  </Typography>
                  <Typography variant='h6' color='error'>
                    {stats.rating}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography color='text.secondary' gutterBottom>
                    Tỉ Lệ Phản Hồi
                  </Typography>
                  <Typography variant='h6' color='success.main'>
                    {stats.responseRate}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography color='text.secondary' gutterBottom>
                    Thời Gian Phản Hồi
                  </Typography>
                  <Typography variant='h6'>{stats.responseTime}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography color='text.secondary' gutterBottom>
                    Người Theo Dõi
                  </Typography>
                  <Typography variant='h6'>{stats.followers}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}
