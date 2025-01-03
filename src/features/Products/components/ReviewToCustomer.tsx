'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Rating,
  LinearProgress,
  Button,
  Pagination,
  Avatar,
  Stack,
  Chip,
  CircularProgress,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { ReviewData } from '~/types/review.interface'
import { toast } from 'react-toastify'
import ReviewForm from './ReviewForm'
import { Edit, Delete, Storefront, Reply } from '@mui/icons-material'
import {
  useGetReviewsMutation,
  useGetCustomerReviewsMutation,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useReplyReviewMutation
} from '../api/reviewApi'
import Cookies from 'js-cookie'

interface ReviewToCustomerProps {
  productId?: string;
  isShopOwner?: boolean;
}

export default function ReviewToCustomer({ productId, isShopOwner }: ReviewToCustomerProps) {
  const [page, setPage] = useState(1)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [editingReview, setEditingReview] = useState<ReviewData | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null)

  const hasAccessToken = () => Boolean(Cookies.get('accessToken'))
  
  const [getReviews] = useGetReviewsMutation()
  const [getCustomerReviews] = useGetCustomerReviewsMutation()
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation()
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation()
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation()
  const [replyReview, { isLoading: isReplying }] = useReplyReviewMutation()

  const [reviewResponse, setReviewResponse] = useState<any>(null);

  const fetchReviews = async () => {
    const params = {
      productId: Number(productId),
      rating: selectedRating,
      sort: null,
      pageNumber: page,
      pageSize: 20
    }

    let response;
    if (hasAccessToken()) {
      response = await getCustomerReviews(params).unwrap();
    } else {
      response = await getReviews(params).unwrap();
    }
    setReviewResponse(response);
  }

  useEffect(() => {
    fetchReviews()
  }, [page, selectedRating, productId])

  const handleCreateReview = async (formData: FormData) => {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const jsonData = {
        productId: Number(productId),
        rating: Number(formData.get('rating')),
        textReview: formData.get('textReview'),
        tag: formData.get('tag')
      };

      const response = await createReview({
        json: JSON.stringify(jsonData),
        image: formData.get('image') as File || undefined
      }).unwrap();

      if (response.code === 403 && response.message === 'Forbidden') {
        toast.error('Bạn đã đánh giá sản phẩm này rồi')
        setShowReviewForm(false)
        return
      }

      toast.success('Đánh giá đã được gửi thành công');
      setShowReviewForm(false);
      await fetchReviews();
    } catch (error: any) {
      if (error?.data === "Review existed") {
        toast.error('Bạn đã đánh giá sản phẩm này rồi');
      } else {
        toast.error('Lỗi khi gửi đánh giá');
      }
    }
  };

  const handleUpdateReview = async (formData: FormData) => {
    try {
      if (!editingReview) return;

      const jsonData = {
        rating: Number(formData.get('rating')),
        textReview: formData.get('textReview'),
        tag: formData.get('tag')
      };

      await updateReview({
        reviewId: editingReview.review_id,
        json: JSON.stringify(jsonData),
        image: formData.get('image') as File || undefined
      }).unwrap();

      toast.success('Đánh giá đã được cập nhật');
      setEditingReview(null);
      await fetchReviews();
    } catch (error) {
      toast.error('Lỗi khi cập nhật đánh giá');
    }
  };

  const handleDeleteReview = async (productId: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa đánh giá này?')) return
    try {
      await deleteReview(productId).unwrap()
      toast.success('Đã xóa đánh giá')
      await fetchReviews();
    } catch (error) {
      toast.error('Lỗi khi xóa đánh giá')
    }
  }

  const handleReplyClick = (reviewId: number) => {
    setSelectedReviewId(reviewId)
    setReplyDialogOpen(true)
  }

  const handleReplySubmit = async () => {
    if (!selectedReviewId || !replyText.trim()) return

    try {
      await replyReview({
        reviewId: selectedReviewId,
        reply: replyText
      }).unwrap()

      toast.success('Đã trả lời đánh giá')
      setReplyDialogOpen(false)
      setReplyText('')
      setSelectedReviewId(null)
      await fetchReviews()
    } catch (error) {
      toast.error('Lỗi khi trả lời đánh giá')
    }
  }

  if (isCreating || isUpdating || isDeleting) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (!reviewResponse?.data) return null

  const { review_rating, review_page, my_review } = reviewResponse.data

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom>
          Đánh giá từ khách hàng
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', minWidth: 200 }}>
            <Typography variant='h3' gutterBottom>
              {review_rating?.rating}
            </Typography>
            <Rating value={review_rating.rating} precision={0.1} readOnly />
            <Typography color='text.secondary' sx={{ mt: 1 }}>
              {review_rating.review_count} lượt đánh giá
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {[
              { rating: 5, count: review_rating.five_star_count },
              { rating: 4, count: review_rating.four_star_count },
              { rating: 3, count: review_rating.three_star_count },
              { rating: 2, count: review_rating.two_star_count },
              { rating: 1, count: review_rating.one_star_count }
            ].map(({ rating, count }) => (
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
                  value={(count / review_rating.review_count) * 100}
                  sx={{ flexGrow: 1, mx: 1, bgcolor: 'grey.100' }}
                />
                <Typography sx={{ minWidth: 30 }}>{count}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {hasAccessToken() && !my_review && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowReviewForm(true)}
            disabled={isCreating}
            sx={{ mb: 2 }}
          >
            Viết đánh giá
          </Button>
        )}

        <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
          <Chip
            label='Tất cả'
            color={selectedRating === null ? 'error' : 'default'}
            onClick={() => setSelectedRating(null)}
          />
          {[5, 4, 3, 2, 1].map((rating) => (
            <Chip
              key={rating}
              label={`${rating} ★`}
              color={selectedRating === rating ? 'error' : 'default'}
              onClick={() => setSelectedRating(rating)}
            />
          ))}
        </Stack>

        {((showReviewForm && !my_review) || editingReview) && (
          <Paper sx={{ mb: 3 }}>
            <ReviewForm
              initialData={editingReview ? {
                rating: editingReview.rating,
                textReview: editingReview.text_comment,
                tag: editingReview.tag[0] || ''
              } : undefined}
              onSubmit={editingReview ? handleUpdateReview : handleCreateReview}
              onCancel={() => {
                setShowReviewForm(false)
                setEditingReview(null)
              }}
            />
          </Paper>
        )}

        <Stack spacing={2}>
          {review_page.data.map((review: ReviewData) => (
            <Box key={review.review_id} sx={{ display: 'flex', gap: 2 }}>
              <Avatar src={review.user_avatar} alt={review.username}>
                {review.username[0]}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='subtitle2'>{review.username}</Typography>
                <Rating
                  value={review.rating}
                  size='small'
                  readOnly
                  sx={{ my: 0.5 }}
                />
                <Typography variant='body2' sx={{ mb: 1 }}>
                  {review.text_comment}
                </Typography>
                {review.tag && review.tag.length > 0 && (
                  <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
                    {review.tag.map((tag, index) => (
                      <Chip key={index} label={tag} size='small' />
                    ))}
                  </Stack>
                )}
                {review.image_comment && (
                  <Box
                    component='img'
                    src={review.image_comment}
                    alt='Review'
                    sx={{
                      maxWidth: 200,
                      borderRadius: 1,
                      mb: 1
                    }}
                  />
                )}
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Typography variant='caption' color='text.secondary'>
                    {review.createdAt}
                  </Typography>
                  <Button size='small' sx={{ color: 'text.secondary' }}>
                    {review.like_count} · Thích
                  </Button>
                </Stack>
                {review.is_shop_reply && review.reply && (
                  <Box 
                    sx={{ 
                      ml: 2, 
                      mt: 1, 
                      p: 2, 
                      bgcolor: 'grey.50', 
                      borderRadius: 1,
                      borderLeft: '3px solid',
                      borderColor: 'primary.main'
                    }}
                  >
                    <Typography 
                      variant='subtitle2' 
                      color='primary'
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 0.5 
                      }}
                    >
                      <Storefront fontSize="small" />
                      Phản hồi của Shop
                    </Typography>
                    <Typography variant='body2'>
                      {review.reply}
                    </Typography>
                  </Box>
                )}
                {hasAccessToken() && review.review_id === my_review?.review_id && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => setEditingReview(review)}
                      disabled={isUpdating}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => productId && handleDeleteReview(+productId)}
                      disabled={isDeleting}
                    >
                      Xóa
                    </Button>
                  </Stack>
                )}
                {isShopOwner && !review.is_shop_reply && (
                  <Button
                    size="small"
                    startIcon={<Reply />}
                    onClick={() => handleReplyClick(review.review_id)}
                    disabled={isReplying}
                    sx={{ mt: 1 }}
                  >
                    Trả lời
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={review_page.totalPage}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
          />
        </Box>
      </Box>

      <Dialog open={replyDialogOpen} onClose={() => setReplyDialogOpen(false)}>
        <DialogTitle>Trả lời đánh giá</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nội dung trả lời"
            fullWidth
            multiline
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialogOpen(false)}>Hủy</Button>
          <Button 
            onClick={handleReplySubmit}
            disabled={!replyText.trim() || isReplying}
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
