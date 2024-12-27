import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShopHeader from '../components/ShopHeader'
import ShopMenu from '../components/ShopMenu'
import ShopListProducts, { products } from '../components/ShopListProducts'
import { Outlet, useParams } from 'react-router-dom'
import { getShopDetailApiByShopCode } from '@api/shopApi'
import { IShopDetails } from '~/types/shop.interface'

const ShopHomePage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>()
  const [shopInfo, setShopInfo] = useState<IShopDetails>()
  useEffect(() => {
    const fetchShopInfo = async () => {
      if (shopId) {
        const response = await getShopDetailApiByShopCode(shopId)
        setShopInfo(response.data)
        console.log(shopInfo)
      }
    }
    fetchShopInfo()
  }, [shopId])

  return (
    <div className='container'>
      <Box bgcolor='#f5f5f5' p={2}>
        {shopInfo && <ShopHeader shopInfo={shopInfo} />}
        <ShopMenu />
        <Outlet />
        <Typography variant='h5' mt={2} mb={2}>
          Gợi Ý Cho Bạn
        </Typography>
        <ShopListProducts products={products} />
      </Box>
    </div>
  )
}

export default ShopHomePage
