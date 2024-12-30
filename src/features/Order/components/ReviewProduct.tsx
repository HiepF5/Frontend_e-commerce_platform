import {
  Box,
  Paper,
  Typography,
  Rating,
  TextField,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem
} from '@mui/material'
import { PhotoCamera, Close } from '@mui/icons-material'
import { useState, useRef } from 'react'

interface ReviewProductProps {
  productId: number
  productName: string
  productImage: string
  onSubmit: (review: ReviewData) => void
  onCancel: () => void
}

interface ReviewData {
  rating: number
  comment: string
  images: File[]
}

export default function ReviewProduct({
  productName,
  productImage,
  onSubmit,
  onCancel
}: ReviewProductProps) {
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length + images.length > 5) {
      alert('Chỉ được tải lên tối đa 5 ảnh')
      return
    }

    setImages([...images, ...files])
    
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newPreviews = [...previews]
    newImages.splice(index, 1)
    newPreviews.splice(index, 1)
    setImages(newImages)
    setPreviews(newPreviews)
  }

  const handleSubmit = () => {
    if (!rating) {
      alert('Vui lòng chọn số sao đánh giá')
      return
    }

    onSubmit({
      rating,
      comment,
      images
    })
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Đánh giá sản phẩm
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <img
          src={productImage}
          alt={productName}
          style={{ width: 80, height: 80, objectFit: 'cover' }}
        />
        <Typography>{productName}</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Rating
              value={rating}
              onChange={(_, value) => setRating(value)}
              size="large"
            />
            <Typography color="text.secondary">
              {rating ? `${rating} sao` : 'Chọn số sao'}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Nhận xét của bạn"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm"
          />
        </Grid>

        <Grid item xs={12}>
          <input
            type="file"
            multiple
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<PhotoCamera />}
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= 5}
            >
              Thêm ảnh
            </Button>
            <Typography variant="caption" sx={{ ml: 2 }}>
              Tối đa 5 ảnh
            </Typography>
          </Box>

          {previews.length > 0 && (
            <ImageList sx={{ width: '100%', height: 200 }} cols={5} rowHeight={100}>
              {previews.map((preview, index) => (
                <ImageListItem key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    loading="lazy"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 4,
                      top: 4,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
                    }}
                    size="small"
                    onClick={() => removeImage(index)}
                  >
                    <Close sx={{ color: 'white' }} />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Gửi đánh giá
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
} 