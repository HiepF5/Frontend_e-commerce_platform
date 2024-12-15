'use client'

import { useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Checkbox,
  Box,
  Breadcrumbs,
  Link
} from '@mui/material'

import { ChevronRight } from 'lucide-react'
import CartItem from '../components/CartItems'
import CartSummary from '../components/CartSummary'

const mockProducts = [
  {
    id: '1',
    name: 'Samsung Galaxy A06 4GB 128GB Đen SM-A065',
    image: '/placeholder.svg?height=80&width=80',
    price: 3190000,
    originalPrice: 3490000,
    colors: [{ name: 'Đen', value: 'black' }],
    warranties: [
      {
        id: 'w1',
        name: 'Dịch vụ Samsung care plus 6 tháng đến thoại',
        price: 239000,
        originalPrice: 500000
      },
      {
        id: 'w2',
        name: 'Dịch vụ Samsung care plus 12 tháng đến thoại',
        price: 367000,
        originalPrice: 650000
      },
      {
        id: 'w3',
        name: 'Đặc quyền Bảo hành thêm 1 năm BTĐB (BT)',
        price: 150000,
        originalPrice: 300000
      }
    ]
  },
  {
    id: '2',
    name: 'Macbook Air 13 M2 2024 8CPU/8GPU/16GB/256GB Xám MC7U4SA/A',
    image: '/placeholder.svg?height=80&width=80',
    price: 24490000,
    originalPrice: 24990000,
    colors: [{ name: 'Xám', value: 'gray' }],
    warranties: [
      {
        id: 'w4',
        name: 'Đặc quyền Bảo hành 1 đổi 1 Macbook (BT)',
        price: 1500000,
        originalPrice: 2000000
      },
      {
        id: 'w5',
        name: 'Đặc quyền Bảo hành thêm 1 năm Macbook (BT)',
        price: 800000,
        originalPrice: 2400000
      }
    ]
  }
]

export default function CartPage() {
  const [products, setProducts] = useState(mockProducts)

  const subtotal = 28480000
  const discount = 800000
  const total = 27680000
  const points = 6920

  const handleRemoveItem = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Breadcrumbs
        separator={<ChevronRight className='w-4 h-4' />}
        sx={{ mb: 4 }}
      >
        <Link underline='hover' color='inherit' href='/'>
          Trang chủ
        </Link>
        <Typography color='text.primary'>Giỏ hàng</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Checkbox />
            <Typography>Chọn tất cả ({products.length})</Typography>
          </Box>

          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onQuantityChange={() => {}}
              onRemove={() => handleRemoveItem(product.id)}
            />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
            points={points}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
