'use client'

import {
  Box,
  Container,
  Typography,
  Rating,
  LinearProgress,
  Grid,
  Paper
} from '@mui/material'
import { FaRobot } from 'react-icons/fa6'
interface ReviewImage {
  id: string
  url: string
}

const reviewImages: ReviewImage[] = [
  { id: '1', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/1.jpg?raw=true' },
  { id: '2', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true' },
  { id: '3', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/3.jpg?raw=true' },
  { id: '4', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true' },
  { id: '5', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/5.jpg?raw=true' },
  { id: '6', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/1.jpg?raw=true' },
  { id: '7', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true' }
]

export default function Reviews() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h5' gutterBottom fontWeight='bold'>
        Khách hàng đánh giá
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant='h3' gutterBottom>
              5.00
            </Typography>
            <Rating value={5} readOnly size='large' />
            <Typography color='text.secondary' sx={{ mt: 1 }}>
              (6 đánh giá)
            </Typography>
          </Box>

          <Box sx={{ px: 2 }}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Box
                key={rating}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <Rating value={rating} readOnly size='small' sx={{ mr: 1 }} />
                <LinearProgress
                  variant='determinate'
                  value={rating === 5 ? 100 : 0}
                  sx={{ flexGrow: 1, mx: 1 }}
                />
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ minWidth: 20 }}
                >
                  {rating === 5 ? 6 : 0}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FaRobot className='w-5 h-5 mr-2' />
              <Typography variant='subtitle1' fontWeight='bold'>
                Trợ lý AI tổng hợp từ các đánh giá mới nhất
              </Typography>
            </Box>
            <Typography variant='body2' paragraph>
              Dữ liệu cho thấy tất cả 7 review đều đánh giá sản phẩm 5 sao. Nội
              dung review chủ yếu là ngắn gọn, tích cực như "Sản phẩm đúng mô
              tả", "Sản phẩm tốt!", "Hàng tốt!", "OK". Không có bất kỳ review
              tiêu cực nào đó. Do đó, đánh giá trung bình là 5 sao.
            </Typography>
            <Typography variant='body2' paragraph>
              <strong>Phân tích chung:</strong> Dựa trên dữ liệu hiện có, sản
              phẩm được đánh giá rất tốt. Tuy nhiên, số lượng review còn quá ít
              để đưa ra kết luận chắc chắn về chất lượng sản phẩm trên diện
              rộng. Tính khách quan của các review cũng cần được xem xét vì tất
              cả đều đến từ cùng một người dùng. Cần thêm nhiều review từ nhiều
              người dùng khác nhau để có đánh giá toàn diện hơn.
            </Typography>
            <Typography variant='body2'>
              <strong>Kết luận:</strong> Dựa trên dữ liệu có hạn, sản phẩm có vẻ
              đáng mua. Tuy nhiên, khuyến nghị nên tìm kiếm thêm thông tin và
              review từ các nguồn khác để có quyết định mua hàng chính xác hơn.
            </Typography>
          </Paper>

          <Typography variant='subtitle1' gutterBottom fontWeight='bold'>
            Tất cả hình ảnh ({reviewImages.length})
          </Typography>
          <Grid container spacing={1}>
            {reviewImages.map((image) => (
              <Grid item key={image.id} xs={4} sm={3} md={2}>
                <img
                  src={image.url}
                  alt='Review'
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
