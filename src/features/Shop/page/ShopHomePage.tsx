import { Box, Typography } from '@mui/material'
import React from 'react'
import ShopHeader from '../components/ShopHeader'
import ShopMenu from '../components/ShopMenu'
import ShopListProducts, { products } from '../components/ShopListProducts'


const shopInfo = {
  name: 'Shopee Choice Việt Nam',
  followers: '1.2tr',
  productsCount: '15,4k',
  rating: 4.8,
  joinedDate: '26 Tháng Trước',
  responseRate: '100%',
  logoUrl: 'https://link-to-shop-logo.com',
  bannerUrl: 'https://link-to-shop-banner.com'
}

const ShopHomePage: React.FC = () => {
  return (
    <div className='container'>
      <Box bgcolor='#f5f5f5' p={2}>
        {/* Header Shop */}
        <ShopHeader shopInfo={shopInfo} />

        {/* Menu Shop */}
        <ShopMenu />

        {/* Danh sách sản phẩm */}
        <Typography variant='h5' mt={2} mb={2}>
          Gợi Ý Cho Bạn
        </Typography>
        <ShopListProducts products={products} />
      </Box>
    </div>
  )
}

export default ShopHomePage
