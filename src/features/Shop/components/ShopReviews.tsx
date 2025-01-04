import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Rating,
  Grid,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { IReview } from '~/types/shop-review.interface'
import { createReview, fetchReviews } from '../slices/ShopReviewSlice'
import { useParams } from 'react-router-dom'
import { IProduct } from '~/types/products.interface'
import { useGetListProductQuery } from '@features/Products/api/productApi'
const ShopReviews: React.FC = () => {
  const dispatch = useAppDispatch()
  const { reviews, loading, error } = useAppSelector(
    (state) => state.shopReview
  )
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [selectedStar, setSelectedStar] = useState<number | null>(null)
  const { shopId } = useParams()
  
 const [products, setProducts] = useState<IProduct[]>([])
 console.log(products)
   const { data } = useGetListProductQuery({
     pageNumber: 1,
     pageSize: 40
   })
 
   useEffect(() => {
     if (data && data.data) {
       setProducts((prevProducts) => [
         ...prevProducts,
         ...(Array.isArray(data.data) ? data.data : [])
       ])
     }
   }, [data])


  const fetchAllReviews = async () => {
    const ratings = [1, 2, 3, 4, 5]
    await Promise.all(
      ratings.map((rating) =>
        dispatch(
          fetchReviews({
            shopCode: shopId || '',
            rating,
            sort: 1,
            pageNumber: 1
          })
        )
      )
    )
  }
  useEffect(() => {
    fetchAllReviews()
  }, [dispatch])
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setComment('')
  }
  const handleCreateReview = async () => {
     if (rating === null) {
       alert('Please select a rating')
       return
     }
    await dispatch(
      createReview({
        shopCode: shopId || '',
        rating,
        comment
      })
    )
    setOpen(false)
    setComment('')
    fetchAllReviews()
  }
  if (loading) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Box>
    )
  }

  const filteredReviews = selectedStar
    ? { [selectedStar]: reviews[selectedStar] }
    : reviews

  return (
    <Box p={4}>
      <Box textAlign='center' mb={6}>
        <Typography variant='h4' fontWeight='bold' color='textPrimary'>
          Shop Reviews
        </Typography>
        <Typography color='textSecondary'>4.4 out of 5</Typography>
        <Rating value={4.4} precision={0.1} readOnly sx={{ mt: 1 }} />
      </Box>

      <Box display='flex' justifyContent='center' gap={2} mb={4}>
        <Button
          variant={selectedStar === null ? 'contained' : 'outlined'}
          onClick={() => setSelectedStar(null)}
        >
          All
        </Button>
        {[5, 4, 3, 2, 1].map((star) => (
          <Button
            key={star}
            variant={selectedStar === star ? 'contained' : 'outlined'}
            onClick={() => setSelectedStar(star)}
          >
            {star} Star
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {Object.keys(filteredReviews).map((key) => {
          const rating = parseInt(key, 10)
          return (
            <Grid item xs={12} key={rating}>
              <Typography variant='h5' fontWeight='medium' mb={2}>
                {rating} Star Reviews
              </Typography>
              <Grid container spacing={2}>
                {filteredReviews[rating]?.map((review: IReview) => (
                  <Grid item xs={12} sm={6} md={4} key={review.id}>
                    <Card>
                      <CardContent>
                        <Box display='flex' alignItems='center' mb={1}>
                          <Avatar src={review.userAvatar} alt={review.user} />
                          <Box ml={2}>
                            <Typography variant='subtitle1' fontWeight='medium'>
                              {review.user || 'Anonymous'}
                            </Typography>
                            <Rating
                              value={review.rating}
                              precision={0.5}
                              readOnly
                              size='small'
                            />
                          </Box>
                        </Box>
                        <Typography color='textSecondary' mb={2}>
                          {review.comment || 'No comment provided.'}
                        </Typography>
                        {review.images?.length > 0 && (
                          <Box
                            display='grid'
                            gridTemplateColumns='repeat(3, 1fr)'
                            gap={1}
                          >
                            {review.images.map((img: string, index: number) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Review Image ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: '80px',
                                  objectFit: 'cover',
                                  borderRadius: '4px'
                                }}
                              />
                            ))}
                          </Box>
                        )}
                        {review.isReply && review.reply && (
                          <Box
                            mt={2}
                            p={1}
                            bgcolor='grey.100'
                            borderRadius='4px'
                          >
                            <Typography variant='body2' color='textSecondary'>
                              Shop's reply: {review.reply}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )
        })}
      </Grid>
      <Box display='flex' justifyContent='center' mt={4}>
        <Button variant='contained' color='primary' onClick={handleClickOpen}>
          Thêm Review
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập đánh giá của bạn về cửa hàng.
          </DialogContentText>
          <Rating
            name='rating'
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue)
            }}
            precision={1}
            max={5}
          />
          <TextField
            autoFocus
            margin='dense'
            label='Comment'
            type='text'
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Hủy
          </Button>
          <Button onClick={handleCreateReview} color='primary'>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ShopReviews
