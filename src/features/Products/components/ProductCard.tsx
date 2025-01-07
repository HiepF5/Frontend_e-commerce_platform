'use client'

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
  Link
} from '@mui/material'
import { ChevronRight} from 'lucide-react'
import { formatPrice } from '@shared/utils/formatPrice'
import { IProduct } from '~/types/products.interface'
import { useNavigate } from 'react-router-dom'


interface ShopProductsProps {
  shopProducts?: IProduct[]
  recommendedProducts?: IProduct[]
}

function ProductCard({ product }: { product: IProduct }) {
  const navigate = useNavigate()
  return (
    <Card sx={{ height: '100%', position: 'relative' }} onClick={() => {navigate(`/products/product-detail/${product.productId}`)}}>
      <Box sx={{ position: 'relative' }}>navigate
        <CardMedia
          component='img'
          height='200'
          image={
            'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true'
          }
          alt={product.productTitle}
          sx={{ objectFit: 'cover' }}
        />
        {true && (
          <Chip
            label={`-30%`}
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
      </Box>

      <CardContent>
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
          {product.productTitle}
        </Typography>

        <Chip
          key={'Rẻ Vô Địch'}
          label={'Rẻ Vô Địch'}
          size='small'
          variant='outlined'
          sx={{ mr: 0.5, mb: 1 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography variant='h6' color='error'>
            ₫{formatPrice(product.minPrice)}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ textDecoration: 'line-through' }}
          >
            ₫{formatPrice(product.maxPrice)}
          </Typography>
        </Box>

        <Typography variant='caption' color='text.secondary'>
          Đã bán {product.soldCount}
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
          <Typography variant='h6'>GỢI Ý TỪ NGƯỜI DÙNG KHÁC</Typography>
          <Link
            href='#'
            underline='none'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Xem Tất Cả <ChevronRight className='w-4 h-4' />
          </Link>
        </Box>
        <Grid container spacing={2}>
          {shopProducts && shopProducts.map((product) => (
            <Grid item key={product.productId} xs={6} sm={4} md={3} lg={2}>
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
          {recommendedProducts?.map((product) => (
            <Grid item key={product.productId} xs={6} sm={4} md={3} lg={2}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
