import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Typography, Box } from '@mui/material'

const CheckoutStatus: React.FC = () => {
  const location = useLocation()
  const paymentLink = location.state?.link.data

  const openPopupWindow = () => {
    
    if (paymentLink) {
      const popup = window.open(
        paymentLink,
        'ThanhToan',
        'width=800,height=600,scrollbars=yes,resizable=yes'
      )
      if (!popup) {
        alert('Vui lòng cho phép cửa sổ bật lên để tiếp tục thanh toán.')
      }
    }
  }

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom>
        Đặt hàng thành công!
      </Typography>
      <Typography variant='body1' sx={{ my: 2 }}>
        Cảm ơn bạn đã đặt hàng. Để hoàn tất thanh toán, vui lòng nhấp vào nút
        bên dưới:
      </Typography>
      {paymentLink ? (
        <Button
          variant='contained'
          color='primary'
          onClick={openPopupWindow}
          sx={{ mt: 2 }}
        >
          Mở Thanh Toán
        </Button>
      ) : (
        <Typography color='error'>
          Không tìm thấy liên kết thanh toán.
        </Typography>
      )}
    </Box>
  )
}

export default CheckoutStatus
