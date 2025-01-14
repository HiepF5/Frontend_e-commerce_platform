'use client'

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material'
import { formatPrice } from '@shared/utils/formatPrice'

import { IProduct } from '~/types/products.interface'
import { useNavigate } from 'react-router-dom'
import { compareProduct } from '@api/geminiApi'
import {  useState } from 'react'

export default function RelatedProducts({
  relatedProducts,
  productId
}: {
  relatedProducts: IProduct[]
  productId?: string
}) {
 const [open, setOpen] = useState(false)
 const [modalContent, setModalContent] = useState<string>('')

 const handleClose = () => setOpen(false)
  const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
const handleCompare = async (event: React.MouseEvent, productOther: number) => {
  event?.stopPropagation()
  setLoading(true) // Hiển thị loading
  setOpen(true) // Mở modal ngay lập tức để hiển thị trạng thái loading
  try {
    const response = await compareProduct({
      product_id: Number(productId),
      product_other: Number(productOther)
    })
    if (response.code === 200) {
      setModalContent(`Comparison Result: ${response.data}`)
    } else {
      setModalContent(`Failed to compare products: ${response.message}`)
    }
  } catch (error: any) {
    setModalContent(`Error: ${error.message}`)
  } finally {
    setLoading(false) // Dừng loading sau khi xử lý xong
  }
}
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' gutterBottom fontWeight='bold'>
          So sánh sản phẩm tương tự
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Gợi ý bởi AI
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {relatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.productId}>
            <Card
              onClick={() =>
                navigate(`/products/product-detail/${product.productId}`)
              }
            >
              <CardMedia
                component='img'
                height='200'
                image={product.imageUrl || ''}
                alt={product.productTitle}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  {product.productTitle}
                </Typography>
                <Typography variant='h6' color='error.main' gutterBottom>
                  {formatPrice(product.minPrice)}₫
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(product.maxPrice)}₫
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    {product.brand}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.category}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.rating || 0} ⭐
                  </Typography>
                </Box>
                <Button
                  variant='outlined'
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={(event) => handleCompare(event, product.productId)}
                >
                  So sánh chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Kết quả so sánh</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='100px'
            >
              <CircularProgress />
            </Box>
          ) : (
            <Typography>{modalContent}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' disabled={loading}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
