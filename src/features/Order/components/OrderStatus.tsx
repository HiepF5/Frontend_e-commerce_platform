import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Grid
} from '@mui/material'

export default function OrderStatus() {
  const steps = [
    'Đơn Hàng Đã Đặt',
    'Đã Xác Nhận Thông Tin Thanh Toán',
    'Đã Giao Cho ĐVVC',
    'Đã Nhận Được Hàng',
    'Đơn Hàng Đã Hoàn Thành'
  ]

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' gutterBottom>
          MÃ ĐƠN HÀNG: 241010SKTECKC7 | ĐƠN HÀNG ĐÃ HOÀN THÀNH
        </Typography>
        <Stepper activeStep={4} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Địa Chỉ Nhận Hàng
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography>NGUYỄN CÔNG HIỆP</Typography>
              <Typography>(+84) 975251857</Typography>
              <Typography>
                Số nhà 12A ngõ 4 ao sen Hà Đông, Phường Mộ Lao, Quận Hà Đông, Hà
                Nội
              </Typography>
            </Box>

            <Typography variant='h6' gutterBottom>
              Thông Tin Vận Chuyển
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Typography color='success.main'>12:50 12-10-2024</Typography>
                <Typography>Đã giao</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Typography>07:54 12-10-2024</Typography>
                <Typography>Đang vận chuyển</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Typography>04:23 12-10-2024</Typography>
                <Typography>Đơn hàng đã đến trạm</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Chi Tiết Thanh Toán
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Tổng tiền hàng</Typography>
              <Typography>₫139.000</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Phí vận chuyển</Typography>
              <Typography>₫18.300</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Giảm giá phí vận chuyển</Typography>
              <Typography>-₫14.800</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Voucher từ Shopee</Typography>
              <Typography>-₫14.500</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant='h6'>Thành tiền</Typography>
              <Typography variant='h6' color='error'>
                ₫18.000
              </Typography>
            </Box>
            <Button variant='contained' color='error' fullWidth sx={{ mb: 2 }}>
              Mua Lại
            </Button>
            <Button variant='outlined' fullWidth>
              Liên Hệ Người Bán
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
