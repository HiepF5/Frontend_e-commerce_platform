'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Container
} from '@mui/material'
import { formatPrice } from '@shared/utils/formatPrice'

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  specs: {
    weight: string
    material: string
    cpu: string
    cores: number
    ram: string
    screen: string
  }
}

const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro 128GB',
    price: 28390000,
    originalPrice: 28990000,
    image: '/placeholder.svg?height=100&width=100',
    specs: {
      weight: '199 g',
      material: 'Khung máy: Titanium',
      cpu: 'Apple A18 Pro',
      cores: 6,
      ram: '8 GB',
      screen: '6.3 inch'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Plus 5G 256GB',
    price: 19990000,
    originalPrice: 26990000,
    image: '/placeholder.svg?height=100&width=100',
    specs: {
      weight: '196 g',
      material: 'Khung máy: Hợp kim nhôm',
      cpu: 'Exynos 2400',
      cores: 8,
      ram: '12 GB',
      screen: '6.7 inch'
    }
  },
  {
    id: '3',
    name: 'Samsung Galaxy Z Flip6 256GB',
    price: 22990000,
    originalPrice: 28990000,
    image: '/placeholder.svg?height=100&width=100',
    specs: {
      weight: '187 g',
      material: 'Khung máy: Armor aluminum',
      cpu: 'Snapdragon 8 Gen 3',
      cores: 8,
      ram: '12 GB',
      screen: '6.7 inch'
    }
  }
]

export default function ProductComparison() {
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

      <Paper sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Thông số</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 100, height: 100, objectFit: 'contain' }}
                    />
                    <Typography variant='subtitle2'>{product.name}</Typography>
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
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Trọng lượng sản phẩm</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  {product.specs.weight}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Chất liệu</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  {product.specs.material}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Phiên bản CPU</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  {product.specs.cpu}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Số nhân</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  {product.specs.cores}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>RAM</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  {product.specs.ram}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Kích thước màn hình</TableCell>
              {products.map((product) => (
                <TableCell key={product.id} align='center'>
                  {product.specs.screen}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}
