import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography
} from '@mui/material'
import React from 'react'

interface Product {
  id: number
  name: string
  price: string
  discount: string
  sold: string
  rating: number
  imgUrl: string
}

interface ShopListProductsProps {
  products: Product[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Dây Đeo Thẻ Choice SC650005',
    price: '6.100',
    discount: '-44%',
    sold: '3,6k',
    rating: 4.8,
    imgUrl: 'https://link-to-image1.com'
  },
  {
    id: 2,
    name: 'Dây đeo thẻ học sinh, sinh viên',
    price: '15.300',
    discount: '-30%',
    sold: '798',
    rating: 4.8,
    imgUrl: 'https://link-to-image2.com'
  }
  // thêm các sản phẩm khác
]

const ShopListProducts: React.FC<ShopListProductsProps> = ({ products }) => {
  return (
    <Grid container spacing={2} mt={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component='img'
              height='140'
              image={product.imgUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant='h6'>{product.name}</Typography>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='body2' color='text.secondary'>
                  {product.price} ₫
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {product.discount}
                </Typography>
              </Box>
              <Typography variant='body2' color='text.secondary'>
                Đã bán: {product.sold}
              </Typography>
              <Rating value={product.rating} precision={0.1} readOnly />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ShopListProducts
