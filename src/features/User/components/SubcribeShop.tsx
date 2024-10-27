import React, { useState } from 'react'
import { IShopRequest } from '~/types/shop.interface'
import {
  Button,
  TextField,
  Grid,
  Typography,
  Input,
  CircularProgress
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { subscribeShop } from '../slices/ShopSlice'
import { StyledCard } from '@shared/libs/mui/Style'
import { RootState } from '@store/store'

const SubcribeShop: React.FC = () => {
  const dispatch = useAppDispatch()
  const { loading, success, message, error } = useAppSelector(
    (state: RootState) => state.shop
  )

  const [shopData, setShopData] = useState<IShopRequest>({
    subscribe_body: {
      businessType: 1,
      shopName: '',
      description: '',
      address: '',
      shopHotLine: '',
      shopEmail: '',
      taxCode: null,
      identityCode: '',
      fullName: '',
      wardId: '',
      districtId: '',
      provinceId: ''
    },
    frontCard: null,
    backCard: null
  })

  // Xử lý thay đổi input text
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShopData((prev) => ({
      ...prev,
      subscribe_body: {
        ...prev.subscribe_body,
        [name]: value
      }
    }))
  }

  // Xử lý thay đổi file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setShopData((prev) => ({
        ...prev,
        [name]: files[0]
      }))
    }
  }

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(subscribeShop(shopData))
  }

  return (
    <StyledCard>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Tên Shop'
              name='shopName'
              value={shopData.subscribe_body.shopName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Mô tả'
              name='description'
              value={shopData.subscribe_body.description}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Địa chỉ'
              name='address'
              value={shopData.subscribe_body.address}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Hotline'
              name='shopHotLine'
              value={shopData.subscribe_body.shopHotLine}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Email Shop'
              name='shopEmail'
              value={shopData.subscribe_body.shopEmail}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              type='file'
              name='frontCard'
              onChange={handleFileChange}
              required
            />
            <Typography variant='caption'>Mặt trước căn cước</Typography>
          </Grid>

          <Grid item xs={12}>
            <Input
              type='file'
              name='backCard'
              onChange={handleFileChange}
              required
            />
            <Typography variant='caption'>Mặt sau căn cước</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Đăng ký'}
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color='error'>{error}</Typography>
            </Grid>
          )}

          {message && (
            <Grid item xs={12}>
              <Typography color='primary'>{message}</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </StyledCard>
  )
}

export default SubcribeShop
