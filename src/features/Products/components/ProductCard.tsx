'use client'

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
  Link
} from '@mui/material'
import { ChevronRight, Heart, Play } from 'lucide-react'
import { formatPrice } from '@shared/utils/formatPrice'

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  sold: number
  isFavorite?: boolean
  hasVideo?: boolean
  tags?: string[]
}

interface ShopProductsProps {
  shopProducts: Product[]
  recommendedProducts: Product[]
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          height='200'
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        {product.discount > 0 && (
          <Chip
            label={`-${product.discount}%`}
            color='error'
            size='small'
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'error.main'
            }}
          />
        )}
        {product.hasVideo && (
          <IconButton
            size='small'
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' }
            }}
          >
            <Play className='w-4 h-4' />
          </IconButton>
        )}
      </Box>

      <CardContent>
        {product.isFavorite && (
          <Chip
            icon={<Heart className='w-4 h-4' />}
            label='Yêu thích'
            size='small'
            sx={{ mb: 1, bgcolor: 'error.main', color: 'white' }}
          />
        )}

        <Typography
          variant='subtitle2'
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </Typography>

        {product.tags &&
          product.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size='small'
              variant='outlined'
              sx={{ mr: 0.5, mb: 1 }}
            />
          ))}

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography variant='h6' color='error'>
            ₫{formatPrice(product.price)}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ textDecoration: 'line-through' }}
          >
            ₫{formatPrice(product.originalPrice)}
          </Typography>
        </Box>

        <Typography variant='caption' color='text.secondary'>
          Đã bán {product.sold}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function ShopProducts({
  shopProducts,
  recommendedProducts
}: ShopProductsProps) {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant='h6'>CÁC SẢN PHẨM KHÁC CỦA SHOP</Typography>
          <Link
            href='#'
            underline='none'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Xem Tất Cả <ChevronRight className='w-4 h-4' />
          </Link>
        </Box>
        <Grid container spacing={2}>
          {shopProducts.map((product) => (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          CÓ THỂ BẠN CŨNG THÍCH
        </Typography>
        <Grid container spacing={2}>
          {recommendedProducts.map((product) => (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
