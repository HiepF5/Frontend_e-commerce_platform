'use client'

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@mui/material'
import { formatPrice } from '@shared/utils/formatPrice'

import { IProduct } from '~/types/products.interface'
import { useNavigate } from 'react-router-dom'

export default function RelatedProducts({ relatedProducts }: { relatedProducts: IProduct[] }) {
  const navigate = useNavigate()
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
                <Button variant='outlined' fullWidth sx={{ mt: 2 }}>
                  So sánh chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
