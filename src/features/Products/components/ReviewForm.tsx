import { useState } from 'react';
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import { ReviewFormData } from '~/types/review.interface';
import { toast } from 'react-toastify';

interface ReviewFormProps {
  initialData?: ReviewFormData;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

const REVIEW_TAGS = [
  'Sản phẩm tốt - Giao hàng nhanh',
  'Chất lượng sản phẩm tuyệt vời',
  'Đóng gói sản phẩm đẹp và chắc chắn',
  'Shop phục vụ rất tốt'
];

export default function ReviewForm({ initialData, onSubmit, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>(initialData || {
    rating: 5,
    textReview: '',
    tag: REVIEW_TAGS[0],
    image: undefined
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('rating', formData.rating.toString());
      form.append('textReview', formData.textReview);
      form.append('tag', formData.tag);
      if (formData.image) {
        form.append('image', formData.image);
      }
      await onSubmit(form);
    } catch (error) {
      toast.error('Lỗi khi gửi đánh giá');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Đánh giá của bạn
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Rating
          value={formData.rating}
          onChange={(_, value) => setFormData({ ...formData, rating: value || 5 })}
          size="large"
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
        value={formData.textReview}
        onChange={(e) => setFormData({ ...formData, textReview: e.target.value })}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle2" gutterBottom>
        Gắn thẻ đánh giá
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
        {REVIEW_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => setFormData({ ...formData, tag })}
            color={formData.tag === tag ? 'primary' : 'default'}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>

      <Box sx={{ mb: 2 }}>
        <input
          accept="image/*"
          type="file"
          id="review-image"
          hidden
          onChange={handleImageChange}
        />
        <label htmlFor="review-image">
          <Button
            variant="outlined"
            component="span"
            startIcon={<PhotoCamera />}
          >
            Thêm ảnh
          </Button>
        </label>
        
        {previewImage && (
          <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: 200, borderRadius: 8 }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: 'background.paper'
              }}
              onClick={() => {
                setPreviewImage('');
                setFormData({ ...formData, image: undefined });
              }}
            >
              <Close />
            </IconButton>
          </Box>
        )}
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel}>
          Hủy
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!formData.textReview || !formData.rating}
        >
          Gửi đánh giá
        </Button>
      </Stack>
    </Box>
  );
} 