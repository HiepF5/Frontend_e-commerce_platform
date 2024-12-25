import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShopMenu: React.FC = () => {
  const [value, setValue] = React.useState(0)
   const navigate = useNavigate()

 const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
   setValue(newValue)
   if (newValue === 6) {
    const shopCode = 'SH00000001';
     // Assuming the "Review Shop" tab is the 7th tab (index 6)
     navigate(`/shop/review-shop/${shopCode}`)
   }
 }

  return (
    <Box mt={2} bgcolor='#fff'>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='primary'
        indicatorColor='primary'
        variant='scrollable'
        scrollButtons='auto'
        aria-label='Shop Menu Tabs'
      >
        <Tab label='Dạo' />
        <Tab label='Tất cả sản phẩm' />
        <Tab label='Giảm giá shock' />
        <Tab label='Sản phẩm bán chạy' />
        <Tab label='Giặt giũ chăm sóc nhà cửa' />
        <Tab label='Bảo vệ sức khỏe' />
        <Tab label='Review Shop' />
        <Tab label='Thêm' />
      </Tabs>
    </Box>
  )
}

export default ShopMenu
