import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
  Box,
  Typography
} from '@mui/material'
import { useState } from 'react'

interface ReviewDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (review: {rating: number, comment: string}) => void
  productName: string
}

export default function ReviewDialog({
  open,
  onClose,
  onSubmit,
  productName
}: ReviewDialogProps) {
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Đánh giá sản phẩm</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{productName}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            size="large"
          />
          <Typography sx={{ ml: 2 }}>
            {rating ? `${rating} sao` : 'Chưa đánh giá'}
          </Typography>
        </Box>
        <TextField
          multiline
          rows={4}
          fullWidth
          label="Nhận xét của bạn"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button 
          onClick={() => {
            onSubmit({rating: rating || 0, comment})
            onClose()
          }}
          variant="contained"
          disabled={!rating}
        >
          Gửi đánh giá
        </Button>
      </DialogActions>
    </Dialog>
  )
} 