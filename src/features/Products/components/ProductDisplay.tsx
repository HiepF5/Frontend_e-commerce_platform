import * as React from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  IconButton,
  Stack
} from '@mui/material'
import { IProductData } from '../types/products.interface'
import { ChevronLeft, ChevronRight, MonetizationOn, ShoppingCart } from '@mui/icons-material'

interface ProductDetailProps {
  product?: IProductData
}

export default function ProductDisplay({ product }: ProductDetailProps) {
  if (!product) return null

  const [selectedImage, setSelectedImage] = React.useState(0)
  const [selectedVariant, setSelectedVariant] = React.useState<number | null>(
    null
  )

  // Add fake images to the product's image list
  const fakeImages = [
    'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
    'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/3.jpg?raw=true',
    'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true'
  ]
  const images = [...product.listImg, ...fakeImages]

  // Group variants by attribute name
  const variantGroups = product.productVariant.reduce(
    (groups: any, variant) => {
      variant.attribute.forEach((attr) => {
        if (!groups[attr.name]) {
          groups[attr.name] = []
        }
        if (!groups[attr.name].includes(attr.value)) {
          groups[attr.name].push(attr.value)
        }
      })
      return groups
    },
    {}
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left side - Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            {/* Main Image */}
            <Box
              component='img'
              src={images[selectedImage]}
              alt={product.title}
              sx={{
                width: '100%',
                height: 500,
                objectFit: 'contain',
                borderRadius: 2
                // bgcolor: '#f5f5f5'
              }}
            />

            {/* Navigation Arrows */}
            <IconButton
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
              }}
              onClick={handlePrevImage}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
              }}
              onClick={handleNextImage}
            >
              <ChevronRight />
            </IconButton>
          </Box>

          {/* Thumbnail Images */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                component='img'
                src={img}
                alt={`product-${index}`}
                onClick={() => setSelectedImage(index)}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: 1,
                  border:
                    index === selectedImage
                      ? '2px solid #ff4d4f'
                      : '2px solid transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Right side - Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant='h4' gutterBottom>
              {product.title}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: '#f5f5f5',
                p: 2,
                borderRadius: 1
              }}
            >
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography>{product.countComments} đánh giá</Typography>
              <Divider orientation='vertical' flexItem />
              <Typography>{product.favoritesCount} đã thích</Typography>
            </Box>

            <Box
              sx={{
                bgcolor: '#fff8f8',
                p: 2,
                borderRadius: 1,
                border: '1px solid #ffd6d6'
              }}
            >
              <Typography variant='h5' color='error.main' gutterBottom>
                {formatPrice(product.minPrice)}
                {product.maxPrice > product.minPrice &&
                  ` - ${formatPrice(product.maxPrice)}`}
              </Typography>
            </Box>

            {/* Variant Groups */}
            {Object.entries(variantGroups).map(([attrName, values]) => (
              <Box key={attrName}>
                <Typography variant='subtitle1' gutterBottom>
                  {attrName}
                </Typography>
                <ToggleButtonGroup
                  value={selectedVariant}
                  exclusive
                  onChange={(_, value) => setSelectedVariant(value)}
                  sx={{ flexWrap: 'wrap' }}
                >
                  {(values as string[]).map((value) => {
                    const variant = product.productVariant.find((v) =>
                      v.attribute.some((a) => a.value === value)
                    )
                    return (
                      <ToggleButton
                        key={value}
                        value={variant?.variantId ?? ''}
                        sx={{
                          m: 0.5,
                          border: '1px solid #ddd',
                          '&.Mui-selected': {
                            borderColor: 'primary.main',
                            backgroundColor: 'primary.light'
                          }
                        }}
                      >
                        {value}
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
              </Box>
            ))}

            {/* Stock Info */}
            {selectedVariant && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Typography>
                  Kho:{' '}
                  {
                    product.productVariant.find(
                      (v) => v.variantId === selectedVariant
                    )?.stockCount
                  }
                </Typography>
                <Typography>
                  Đã bán:{' '}
                  {
                    product.productVariant.find(
                      (v) => v.variantId === selectedVariant
                    )?.soldCount
                  }
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
              <Button
                variant='contained'
                color='error'
                size='large'
                disabled={!selectedVariant}
                startIcon={<MonetizationOn />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                MUA NGAY
              </Button>
              <Button
                variant='outlined'
                color='error'
                size='large'
                disabled={!selectedVariant}
                startIcon={<ShoppingCart />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                THÊM VÀO GIỎ
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
