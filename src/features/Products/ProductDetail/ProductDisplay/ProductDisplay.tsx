'use client'

import * as React from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Rating,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'

interface Product {
  name: string;
  rating: number;
  ratings: number;
  reviews: number;
  price: number;
  originalPrice: number;
  storage: { size: string }[];
  colors: { value: string; name: string }[];
  specs: {
    chip: string;
    screenSize: string;
    battery: string;
  };
}

export default function ProductDisplay({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = React.useState(
    product.colors[0].value
  )
  const [selectedStorage, setSelectedStorage] = React.useState('128 GB')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left side - Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  component='img'
                  src='/placeholder.svg?height=100&width=100'
                  sx={{ width: 100, height: 100, objectFit: 'cover' }}
                />
              ))}
            </Box>
            <Box
              component='img'
              src='/placeholder.svg?height=400&width=400'
              sx={{ width: 400, height: 400, objectFit: 'cover' }}
            />
          </Box>
        </Grid>

        {/* Right side - Product details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant='h4' component='h1' fontWeight='bold'>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography color='text.secondary'>
                {product.ratings} đánh giá | {product.reviews} bình luận
              </Typography>
            </Box>

            <Box>
              <Typography
                variant='h5'
                color='error'
                fontWeight='bold'
                component='span'
              >
                {formatPrice(product.price)}₫
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ textDecoration: 'line-through', ml: 2 }}
                component='span'
              >
                {formatPrice(product.originalPrice)}₫
              </Typography>
              <Chip label='2%' size='small' color='error' sx={{ ml: 1 }} />
            </Box>

            <Box>
              <Typography variant='h6' gutterBottom>
                Dung lượng
              </Typography>
              <ToggleButtonGroup
                value={selectedStorage}
                exclusive
                onChange={(e, value) => setSelectedStorage(value)}
                sx={{ mb: 3 }}
              >
                {product.storage.map((option) => (
                  <ToggleButton
                    key={option.size}
                    value={option.size}
                    sx={{ px: 3, py: 1 }}
                  >
                    {option.size}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <Box>
              <Typography variant='h6' gutterBottom>
                Màu sắc
              </Typography>
              <ToggleButtonGroup
                value={selectedColor}
                exclusive
                onChange={(e, value) => setSelectedColor(value)}
              >
                {product.colors.map((color) => (
                  <ToggleButton
                    key={color.value}
                    value={color.value}
                    sx={{ px: 3, py: 1 }}
                  >
                    {color.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant='h6' gutterBottom>
                Thông số nổi bật
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant='subtitle1' fontWeight='bold'>
                    Chip
                  </Typography>
                  <Typography>{product.specs.chip}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' fontWeight='bold'>
                    Kích thước màn hình
                  </Typography>
                  <Typography>{product.specs.screenSize}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' fontWeight='bold'>
                    Thời lượng pin
                  </Typography>
                  <Typography>{product.specs.battery}</Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant='contained'
              color='error'
              size='large'
              sx={{ mt: 3 }}
            >
              MUA NGAY
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
