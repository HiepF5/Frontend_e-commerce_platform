'use client'

import {
  Box,
  Button,
  Paper,
  Typography,
  Divider
} from '@mui/material'
import { formatPrice } from '@shared/utils/formatPrice'
import { CartItem } from '../types/cart.interface'
import { useNavigate } from 'react-router-dom'

interface CartSummaryProps {
  selectedItems: number[]
  cartItems: CartItem[]
  total: number
}

export default function CartSummary({
  selectedItems,
  cartItems,
  total
}: CartSummaryProps) {
  const selectedTotal = cartItems
    .filter(item => selectedItems.includes(item.variantId))
    .reduce((sum, item) => sum + item.totalAmount, 0)
  const navigate = useNavigate()
  const handleCheckout = () => {
    const selectedCartItems = cartItems
      .filter((item) => selectedItems.includes(item.variantId))
      .map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity
      }))
    navigate('/checkout', { state: { selectedCartItems } })
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Thông tin đơn hàng
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Tổng tiền hàng</Typography>
        <Typography>{formatPrice(total)}₫</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Đã chọn</Typography>
        <Typography color='error'>{formatPrice(selectedTotal)}₫</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h6'>Cần thanh toán</Typography>
        <Typography color='error' variant='h6'>
          {formatPrice(selectedTotal)}₫
        </Typography>
      </Box>

      <Button
        variant='contained'
        color='error'
        fullWidth
        size='large'
        disabled={selectedItems.length === 0}
        onClick={handleCheckout}
      >
        Mua hàng ({selectedItems.length})
      </Button>
    </Paper>
  )
}
