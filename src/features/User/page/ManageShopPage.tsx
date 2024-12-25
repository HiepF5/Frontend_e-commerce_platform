// src/features/shop/pages/ManageShopPage.tsx
import React, { useEffect } from 'react'

import { Typography, CircularProgress, Box } from '@mui/material'
import ManageShop from '../components/ManageShop'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { getShopDetail } from '../slices/ShopSlice'

const ManageShopPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { shopData, loading, error } = useAppSelector(
    (state) => state.shop
  )

  useEffect(() => {
    dispatch(getShopDetail())
  }, [dispatch])

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Box>
    )
  }

  return (
    <div>
      {shopData ? (
        <ManageShop data={shopData} />
      ) : (
        <Typography variant='h6' color='error'>
          No shop data available
        </Typography>
      )}
    </div>
  )
}

export default ManageShopPage
