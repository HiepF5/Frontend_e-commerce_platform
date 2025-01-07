import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import '../styles/OrderFilter.css'

export enum OrderStatus {
  CHO_XAC_NHAN = 'CHO_XAC_NHAN',
  DANG_LAY_HANG = 'DANG_LAY_HANG',
  DANG_GIAO_HANG = 'DANG_GIAO_HANG',
  GH_THANH_CONG = 'GH_THANH_CONG',
  DA_HUY = 'DA_HUY',
  TRA_HANG = 'TRA_HANG'
}

interface OrderFilterProps {
  open: boolean
  onClose: () => void
  onApply: (filters: any) => void
}

export default function OrderFilter({
  open,
  onClose,
  onApply
}: OrderFilterProps) {
  const [filters, setFilters] = useState({
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
    priceRange: '',
    sortBy: 'newest',
    status: ''
  })

  const orderStatusOptions = [
    { label: 'Tất cả', value: '' },
    { label: 'Chờ xác nhận', value: OrderStatus.CHO_XAC_NHAN },
    { label: 'Đang lấy hàng', value: OrderStatus.DANG_LAY_HANG },
    { label: 'Đang giao hàng', value: OrderStatus.DANG_GIAO_HANG },
    { label: 'Giao hàng thành công', value: OrderStatus.GH_THANH_CONG },
    { label: 'Đã hủy', value: OrderStatus.DA_HUY },
    { label: 'Trả hàng', value: OrderStatus.TRA_HANG }
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Lọc đơn hàng</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* <Grid item xs={6}>
            <Box sx={{ '& .react-datepicker-wrapper': { width: '100%' } }}>
              <DatePicker
                selected={filters.dateFrom}
                onChange={(date) => setFilters({ ...filters, dateFrom: date })}
                placeholderText='Từ ngày'
                dateFormat='dd/MM/yyyy'
                className='MuiOutlinedInput-input MuiInputBase-input'
                wrapperClassName='datePicker'
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ '& .react-datepicker-wrapper': { width: '100%' } }}>
              <DatePicker
                selected={filters.dateTo}
                onChange={(date) => setFilters({ ...filters, dateTo: date })}
                placeholderText='Đến ngày'
                dateFormat='dd/MM/yyyy'
                className='MuiOutlinedInput-input MuiInputBase-input'
                wrapperClassName='datePicker'
                minDate={filters.dateFrom}
              />
            </Box>
          </Grid> */}

          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Sắp xếp theo</InputLabel>
              <Select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
                label='Sắp xếp theo'
              >
                <MenuItem value='newest'>Mới nhất</MenuItem>
                <MenuItem value='oldest'>Cũ nhất</MenuItem>
                <MenuItem value='price_high'>Giá cao đến thấp</MenuItem>
                <MenuItem value='price_low'>Giá thấp đến cao</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                label='Trạng thái'
              >
                {orderStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={() => {
            onApply(filters)
            onClose()
          }}
          variant='contained'
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  )
}
