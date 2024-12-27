import React from 'react'
import {
  Typography,
  CardMedia,
  Box,
  Avatar,
  Rating,
  Button
} from '@mui/material'
import banner from '@assets/img/banner_mens.png'
import { useNavigate } from 'react-router-dom'
import { IShopDetails } from '~/types/shop.interface'

interface ShopHeaderProps {
  shopInfo: IShopDetails
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
          src={shopInfo.shopLogo}
          alt='Shop Logo'
          sx={{ width: 80, height: 80 }}
        />
        <Box ml={2}>
          <Typography variant='h6'>{shopInfo.fullName}</Typography>
          <Box display='flex' alignItems='center'>
            <Typography variant='body2'>
              Sản phẩm: {shopInfo.productQuantity}
            </Typography>
            <Typography variant='body2' ml={2}>
              Người theo dõi: {shopInfo.followCount}
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
              Tỉ lệ phản hồi: {shopInfo.processOrder}
            </Typography>
            <Typography variant='body2' ml={2}>
              Tham gia: {shopInfo.successOrder}
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
