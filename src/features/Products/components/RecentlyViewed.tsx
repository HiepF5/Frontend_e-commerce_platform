'use client'

import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton
} from '@mui/material'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { formatPrice } from '@shared/utils/formatPrice'

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  installment: string
  variants?: string[]
  promotions?: string[]
}

const recentProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro 128GB',
    image: '/placeholder.svg?height=200&width=200',
    price: 28390000,
    originalPrice: 28990000,
    discount: 600000,
    installment: 'Trả góp 0%',
    variants: ['128 GB', '256 GB', '512 GB', '1 TB']
  },
  {
    id: '2',
    name: 'Nồi chiên không dầu Unie 12 lít UE-1000',
    image: '/placeholder.svg?height=200&width=200',
    price: 2190000,
    originalPrice: 3590000,
    discount: 1400000,
    promotions: ['Giảm ngay 1 triệu khi mở thẻ tín dụng VPBank'],
    installment: ''
  },
  {
    id: '3',
    name: 'Robot hút bụi Xiaomi Mi Vacuum Mop 2',
    image: '/placeholder.svg?height=200&width=200',
    price: 4490000,
    originalPrice: 7990000,
    discount: 3500000,
    installment: 'Trả góp 0%'
  },
  {
    id: '4',
    name: 'Robot hút bụi Xiaomi Mi Vacuum Mop 2',
    image: '/placeholder.svg?height=200&width=200',
    price: 4490000,
    originalPrice: 7990000,
    discount: 3500000,
    installment: 'Trả góp 0%'
  }
]

export default function RecentlyViewed() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount =
        direction === 'left' ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h5' gutterBottom>
        Sản phẩm đã xem
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            px: 1
          }}
        >
          {recentProducts.map((product) => (
            <Card key={product.id} sx={{ minWidth: 280, maxWidth: 280 }}>
              <CardMedia
                component='img'
                height='200'
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant='subtitle1' component='div'>
                  {product.name}
                </Typography>

                {product.installment && (
                  <Chip
                    label={product.installment}
                    size='small'
                    sx={{ mb: 1 }}
                  />
                )}

                <Typography variant='h6' color='error.main'>
                  {formatPrice(product.price)}₫
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(product.originalPrice)}₫
                </Typography>
                <Typography variant='body2' color='success.main'>
                  Giảm {formatPrice(product.discount)}₫
                </Typography>

                {product.variants && (
                  <Box
                    sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}
                  >
                    {product.variants.map((variant) => (
                      <Chip
                        key={variant}
                        label={variant}
                        size='small'
                        variant='outlined'
                      />
                    ))}
                  </Box>
                )}

                {product.promotions && (
                  <Box sx={{ mt: 1 }}>
                    {product.promotions.map((promo, index) => (
                      <Typography
                        key={index}
                        variant='caption'
                        display='block'
                        color='text.secondary'
                      >
                        {promo}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Container>
  )
}
