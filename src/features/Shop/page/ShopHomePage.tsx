import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShopHeader from '../components/ShopHeader'
import ShopMenu from '../components/ShopMenu'
import { Outlet, useParams } from 'react-router-dom'
import { getShopDetailApiByShopCode } from '@api/shopApi'
import { IShopDetails } from '~/types/shop.interface'

const ShopHomePage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>()
  const [shopInfo, setShopInfo] = useState<IShopDetails>()

  useEffect(() => {
    const fetchShopInfo = async () => {
      console.log(shopId)
      if (shopId === undefined) {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        console.log(user)
        const shopInfo = await getShopDetailApiByShopCode(user.shop_code)
        setShopInfo(shopInfo.data)
      } else if (shopId) {
        const shopInfo = await getShopDetailApiByShopCode(shopId)
        setShopInfo(shopInfo.data)
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
      </Box>
    </div>
  )
}

export default ShopHomePage
