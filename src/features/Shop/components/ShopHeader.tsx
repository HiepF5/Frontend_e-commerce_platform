import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Avatar,
  Rating,
  Button,
  Tabs,
  Tab
} from '@mui/material'
import banner from '@assets/img/banner_mens.png'
import { useNavigate } from 'react-router-dom'

interface ShopInfo {
  name: string
  followers: string
  productsCount: string
  rating: number
  joinedDate: string
  responseRate: string
  logoUrl: string
  bannerUrl: string
}

interface ShopHeaderProps {
  shopInfo: ShopInfo
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ shopInfo }) => {
  const navigate = useNavigate()
  return (
    <Box>
      {/* Banner Shop */}
      <CardMedia
        component='img'
        height='200'
        image={banner}
        alt='Shop Banner'
      />
      {/* Thông tin Shop */}
      <Box display='flex' alignItems='center' p={2} bgcolor='#fff'>
        <Avatar
          src={shopInfo.logoUrl}
          alt='Shop Logo'
          sx={{ width: 80, height: 80 }}
        />
        <Box ml={2}>
          <Typography variant='h6'>{shopInfo.name}</Typography>
          <Box display='flex' alignItems='center'>
            <Typography variant='body2'>
              Sản phẩm: {shopInfo.productsCount}
            </Typography>
            <Typography variant='body2' ml={2}>
              Người theo dõi: {shopInfo.followers}
            </Typography>
            <Typography variant='body2' ml={2}>
              Đánh giá: {shopInfo.rating}
            </Typography>
            <Box ml={1}>
              <Rating value={shopInfo.rating} precision={0.1} readOnly />
            </Box>
          </Box>
          <Box display='flex' alignItems='center' mt={1}>
            <Typography variant='body2'>
              Tỉ lệ phản hồi: {shopInfo.responseRate}
            </Typography>
            <Typography variant='body2' ml={2}>
              Tham gia: {shopInfo.joinedDate}
            </Typography>
          </Box>
        </Box>
        <Box ml='auto'>
          <Button variant='outlined'>Theo Dõi</Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ ml: 2 }}
            onClick={() => navigate('/messenger/chat')}
          >
            Chat
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ShopHeader
