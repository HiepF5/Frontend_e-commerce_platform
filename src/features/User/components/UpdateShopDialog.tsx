import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid
} from '@mui/material'
import { IInfoShop, IShopDetails } from '~/types/shop.interface'

const UpdateShopDialog: React.FC<{
  open: boolean
  onClose: () => void
  data: IShopDetails // Input type
  onSave: (data: IInfoShop) => void // Output type
}> = ({ open, onClose, data, onSave }) => {
  const [shopData, setShopData] = useState<IInfoShop>({
    businessType: 1, // Default or specific value
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
  })

  // Update the local state when the dialog opens with new data
  useEffect(() => {
    if (open) {
      setShopData({
        businessType: 1, // You may want to map this correctly
        shopName: data.shopName,
        description: data.description,
        address: data.address,
        shopHotLine: data.shopHotLine,
        shopEmail: data.shopEmail,
        taxCode: data.taxCode || null,
        identityCode: data.identityCode,
        fullName: data.fullName,
        wardId: data.wardId,
        districtId: data.districtId,
        provinceId: data.provinceId
      })
    }
  }, [open, data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onSave(shopData) // Pass the updated data to the parent
    onClose() // Close the dialog
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md'>
      <DialogTitle>Cập nhật thông tin Shop</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Tên Shop'
              name='shopName'
              value={shopData.shopName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Mô tả'
              name='description'
              value={shopData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Địa chỉ'
              name='address'
              value={shopData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Hotline'
              name='shopHotLine'
              value={shopData.shopHotLine}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Email'
              name='shopEmail'
              value={shopData.shopEmail}
              onChange={handleChange}
              type='email'
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Mã số thuế'
              name='taxCode'
              value={shopData.taxCode || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='CMND/CCCD'
              name='identityCode'
              value={shopData.identityCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Họ và tên'
              name='fullName'
              value={shopData.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Ward ID'
              name='wardId'
              value={shopData.wardId}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='District ID'
              name='districtId'
              value={shopData.districtId}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Province ID'
              name='provinceId'
              value={shopData.provinceId}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateShopDialog
