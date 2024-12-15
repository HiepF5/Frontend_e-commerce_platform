'use client'

import {
  Box,
  Button,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material'
import { ChevronDown } from 'lucide-react'
import { formatPrice } from '@shared/utils/formatPrice'

interface CartSummaryProps {
  subtotal: number
  discount: number
  total: number
  points: number
}

export default function CartSummary({
  subtotal,
  discount,
  total,
  points
}: CartSummaryProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Button variant='outlined' fullWidth sx={{ mb: 2 }}>
        Quà tặng
      </Button>

      <FormControlLabel
        control={<Switch />}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Đổi: 0 điểm (~0đ)</Typography>
          </Box>
        }
      />

      <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
        Thông tin đơn hàng
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Tổng tiền</Typography>
        <Typography>{formatPrice(subtotal)}₫</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Tổng khuyến mãi</Typography>
        <Typography color='error'>-{formatPrice(discount)}₫</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Cần thanh toán</Typography>
        <Typography color='error' variant='h6'>
          {formatPrice(total)}₫
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Typography>Điểm thưởng</Typography>
        <Typography color='warning.main'>+{points}</Typography>
      </Box>

      <Button variant='contained' color='error' fullWidth size='large'>
        Xác nhận đơn
      </Button>

      <Button endIcon={<ChevronDown />} sx={{ mt: 2, color: 'primary.main' }}>
        Xem chi tiết
      </Button>
    </Paper>
  )
}
