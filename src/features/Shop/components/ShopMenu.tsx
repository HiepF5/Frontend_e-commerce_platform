import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const ShopMenu: React.FC = () => {
  const navigate = useNavigate()
  const { shopId } = useParams<{ shopId: string }>()
  const location = useLocation()
  
  // Xác định tab active dựa trên URL hiện tại
  const getActiveTab = () => {
    const path = location.pathname
    if (path.includes('review-shop')) return 6
    if (path.includes('all-products')) return 1
    if (path.includes('sale-shock')) return 2
    if (path.includes('best-seller')) return 3
    if (path.includes('home-care')) return 4
    if (path.includes('health-care')) return 5
    return 0 // Tab "Dạo" mặc định
  }

  const [value, setValue] = React.useState(getActiveTab())

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    switch(newValue) {
      case 0:
        navigate(`/shop/${shopId}`)
        break
      case 1:
        navigate(`/shop/${shopId}/all-products`)
        break  
      case 2:
        navigate(`/shop/${shopId}/sale-shock`)
        break
      case 3:
        navigate(`/shop/${shopId}/best-seller`)
        break
      case 4:
        navigate(`/shop/${shopId}/home-care`)
        break
      case 5:
        navigate(`/shop/${shopId}/health-care`)
        break
      case 6:
        navigate(`/shop/${shopId}/review-shop`)
        break
      default:
        navigate(`/shop/${shopId}`)
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
