import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material'
import { Search, FilterList } from '@mui/icons-material'
import OrderItem from './OrderItem'
import OrderFilter from './OrderFilter'
import OrderExport from './OrderExport'
import OrderStats from './OrderStats'
import OrderNotification from './OrderNotification'

const tabPaths = [
  '', // Tất cả
  'pending', // Chờ thanh toán
  'processing', // Đang xử lý
  'shipping', // Đang giao
  'completed', // Đã giao
  'cancelled' // Đã hủy
]

export default function OrderList() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || ''
  const [tabValue, setTabValue] = useState(tabPaths.indexOf(currentPath))
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<any>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    const path = tabPaths[newValue]
    navigate(path ? `/order/${path}` : '/order')
  }

  const handleFilterApply = (filters: any) => {
    setActiveFilters(filters)
    // Implement filter logic here
  }

  const tabs = [
    'Tất cả',
    'Chờ thanh toán',
    'Đang xử lý',
    'Đang giao',
    'Đã giao',
    'Đã hủy'
  ]

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Đơn hàng của tôi</Typography>
        <OrderExport orders={[]} />
      </Box>

      <OrderStats />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm đơn hàng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setFilterOpen(true)}>
                  <FilterList color={activeFilters ? "primary" : "inherit"} />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 3 }}
        />

        <OrderItem />
      </Box>

      <OrderFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleFilterApply}
      />
      <OrderNotification />
    </Box>
  )
} 