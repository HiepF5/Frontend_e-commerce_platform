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

export default function RelatedProducts() {
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
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component='img'
                height='200'
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  {product.name}
                </Typography>
                <Typography variant='h6' color='error.main' gutterBottom>
                  {formatPrice(product.price)}₫
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(product.originalPrice)}₫
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    Trọng lượng: {product.specs.weight}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    Chất liệu: {product.specs.material}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    CPU: {product.specs.cpu}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    RAM: {product.specs.ram}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    Màn hình: {product.specs.screen}
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
