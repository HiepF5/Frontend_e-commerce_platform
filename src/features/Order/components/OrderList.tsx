import { useEffect, useState } from 'react'
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
import { IFilters } from '../types/order.interface'

const tabPaths = [
  '', // Tất cả
  'pending', // Chờ xác nhận
  'processing', // Đang lấy hàng
  'shipping', // Đang giao hàng
  'completed', // Giao hàng thành công
  'cancelled', // Đã hủy
  'return' // Trả hàng
]

interface OrderListProps {
  status: string | null
}

export default function OrderList({ status }: OrderListProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || ''
  const [tabValue, setTabValue] = useState(tabPaths.indexOf(currentPath))
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<IFilters>({
    status: null
  })
  console.log(activeFilters)
  useEffect(() => {
      setActiveFilters({ status })
  }, [status])
  useEffect(() => {
    const currentPath = location.pathname.split('/').pop() || ''
    const index = tabPaths.indexOf(currentPath)
    if (index !== -1) {
      setTabValue(index)
    }
    console.log('Current path:', currentPath)
  }, [location.pathname])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setTabValue(newValue)
    const path = tabPaths[newValue]
    console.log(path)
    navigate(`/order/${path}`, { replace: true })
  }

  const handleFilterApply = (filters: any) => {
    setActiveFilters(filters)
  }
  console.log('activeFilters', activeFilters)

  const tabs = [
    'Tất cả',
    'Chờ xác nhận',
    'Đang lấy hàng',
    'Đang giao hàng',
    'Giao hàng thành công',
    'Đã hủy',
    'Trả hàng'
  ]

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>Đơn hàng của tôi</Typography>
        <OrderExport orders={[]} />
      </Box>

      <OrderStats />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(event, newValue) => handleTabChange(event, newValue)}
          variant='scrollable'
          scrollButtons='auto'
        >
          {tabs.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder='Tìm kiếm đơn hàng'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setFilterOpen(true)}>
                  <FilterList color={activeFilters ? 'primary' : 'inherit'} />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ mb: 3 }}
        />

        <OrderItem
          key={location.pathname}
          searchTerm={searchTerm}
          activeFilters={activeFilters}
        />
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
