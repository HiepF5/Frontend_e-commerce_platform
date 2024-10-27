import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'

const ShopMenu: React.FC = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
        <Tab label='Thêm' />
      </Tabs>
    </Box>
  )
}

export default ShopMenu
