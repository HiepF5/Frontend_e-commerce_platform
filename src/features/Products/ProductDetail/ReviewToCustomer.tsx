'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Rating,
  LinearProgress,
  Button,
  TextField,
  Pagination,
  Avatar,
  Stack,
  Chip
} from '@mui/material'



interface Review {
  id: string
  author: string
  rating: number
  content: string
  createdAt: Date
  likes: number
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'Mai Thanh Vy',
    rating: 4,
    content:
      'Tuy giá không phải tốt nhất nhưng mua FPT được cái an tâm mấy dịch vụ về sau khi bảo hành, ghé của hàng nào cũng vui vẻ',
    createdAt: new Date('2024-01-10'),
    likes: 0
  },
  {
    id: '2',
    author: 'Hà Bích Ngọc',
    rating: 5,
    content: 'good.nhân viên nhiệt tình vui vẻ chuyên nghiệp',
    createdAt: new Date('2024-01-10'),
    likes: 0
  },
  {
    id: '3',
    author: 'Trịnh Thanh Mai',
    rating: 5,
    content: 'Sản phẩm chất lượng rất hài lòng',
    createdAt: new Date('2024-01-10'),
    likes: 0
  }
]

export default function ReviewToCustomer() {
  const [page, setPage] = useState(1)
  const [comment, setComment] = useState('')
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const ratings = {
    5: 8,
    4: 3,
    3: 1,
    2: 0,
    1: 0
  }

  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0)
  const averageRating = 4.6

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          Khách hàng nói về sản phẩm
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', minWidth: 200 }}>
            <Typography variant='h3' gutterBottom>
              {averageRating}
            </Typography>
            <Rating value={averageRating} precision={0.1} readOnly />
            <Typography color='text.secondary' sx={{ mt: 1 }}>
              {totalRatings} lượt đánh giá
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {Object.entries(ratings)
              .reverse()
              .map(([rating, count]) => (
                <Box
                  key={rating}
                  sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                >
                  <Typography sx={{ minWidth: 25 }}>{rating}</Typography>
                  <Box component='span' sx={{ color: 'warning.main', mx: 1 }}>
                    ★
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={(count / totalRatings) * 100}
                    sx={{ flexGrow: 1, mx: 1, bgcolor: 'grey.100' }}
                  />
                  <Typography sx={{ minWidth: 30 }}>{count}</Typography>
                </Box>
              ))}
          </Box>
        </Box>

        <Button variant='contained' color='error'>
          Đánh giá sản phẩm
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' gutterBottom>
          72 Bình luận
        </Typography>

        <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
          <Chip
            label='Tất cả'
            color='error'
            onClick={() => setSelectedRating(null)}
          />
          {[5, 4, 3, 2, 1].map((rating) => (
            <Chip
              key={rating}
              label={`${rating} ★`}
              variant={selectedRating === rating ? 'filled' : 'outlined'}
              onClick={() => setSelectedRating(rating)}
            />
          ))}
        </Stack>

        <TextField
          fullWidth
          placeholder='Nhập nội dung bình luận'
          multiline
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button variant='contained' color='error'>
            Gửi bình luận
          </Button>
        </Box>

        <Stack spacing={2}>
          {reviews.map((review) => (
            <Box key={review.id} sx={{ display: 'flex', gap: 2 }}>
              <Avatar>{review.author[0]}</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='subtitle2'>{review.author}</Typography>
                <Rating
                  value={review.rating}
                  size='small'
                  readOnly
                  sx={{ my: 0.5 }}
                />
                <Typography variant='body2' sx={{ mb: 1 }}>
                  {review.content}
                </Typography>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Typography variant='caption' color='text.secondary'>
                    {review.createdAt.toLocaleDateString()} ·{' '}
                  </Typography>
                  <Button size='small' sx={{ color: 'text.secondary' }}>
                    {review.likes} · Trả lời
                  </Button>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={24}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
          />
        </Box>
      </Box>
    </Container>
  )
}
