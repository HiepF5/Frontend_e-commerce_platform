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
import { useGetProductRecommendContentBasedQuery } from '../api/productApi'
import { useEffect, useState } from 'react'
import { IProduct } from '~/types/products.interface'

interface RelatedProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  specs: {
    weight: string
    material: string
    cpu: string
    ram: string
    screen: string
  }
}

const relatedProducts: RelatedProduct[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Plus 5G 256GB',
    price: 19990000,
    originalPrice: 26990000,
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true',
    specs: {
      weight: '196 g',
      material: 'Hợp kim nhôm',
      cpu: 'Exynos 2400',
      ram: '12 GB',
      screen: '6.7 inch'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy Z Flip6 256GB',
    price: 22990000,
    originalPrice: 28990000,
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/3.jpg?raw=true',
    specs: {
      weight: '187 g',
      material: 'Armor aluminum',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '12 GB',
      screen: '6.7 inch'
    }
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 5G 512GB',
    price: 21490000,
    originalPrice: 26490000,
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
    specs: {
      weight: '167 g',
      material: 'Hợp kim nhôm',
      cpu: 'Exynos 2400',
      ram: '8 GB',
      screen: '6.2 inch'
    }
  }
]

export default function RelatedProducts({ relatedProducts }: { relatedProducts: IProduct[] }) {
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
            <Card>
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
