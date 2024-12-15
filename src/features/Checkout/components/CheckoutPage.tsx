'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  Dialog
} from '@mui/material'
import {
  LocationOn,
  LocalShipping,
  Payment,
  Receipt
} from '@mui/icons-material'

interface VoucherType {
  code: string
  discount: string
  minSpend: string
  validTill: string
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('shopeePay')
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherType | null>(
    null
  )

  const vouchers: VoucherType[] = [
    {
      code: 'FREESHIP40K',
      discount: '40.000₫',
      minSpend: '0₫',
      validTill: '3 giờ'
    },
    {
      code: 'FREESHIP35K',
      discount: '35.000₫',
      minSpend: '0₫',
      validTill: '3 giờ'
    }
  ]

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      {/* Delivery Address */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn color='primary' />
          <Typography variant='h6' sx={{ ml: 1 }}>
            Địa Chỉ Nhận Hàng
          </Typography>
        </Box>
        <Typography>
          NGUYỄN CÔNG HIỆP (+84) 975251857
          <br />
          Số nhà 12A ngõ 4 ao sen Hà Đông, Phường Mộ Lao, Quận Hà Đông, Hà Nội
        </Typography>
      </Paper>

      {/* Product Details */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalShipping color='primary' />
          <Typography variant='h6' sx={{ ml: 1 }}>
            Sản phẩm
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <img
              src='/placeholder.svg'
              alt='Product'
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography>
              Nón Kết Gấu Đâu, Mũ Bảo Hiểm Lưỡi Trai Gấu...
            </Typography>
            <Typography color='text.secondary'>Loại: Mũ Hồng 3D</Typography>
            <Typography>₫25.500</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Payment Methods */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Payment color='primary' />
          <Typography variant='h6' sx={{ ml: 1 }}>
            Phương thức thanh toán
          </Typography>
        </Box>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value='shopeePay'
            control={<Radio />}
            label='Ví ShopeePay'
          />
          <FormControlLabel
            value='agribank'
            control={<Radio />}
            label='Agribank'
          />
          <FormControlLabel value='mb' control={<Radio />} label='MB' />
        </RadioGroup>
      </Paper>

      {/* Voucher Selection */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Receipt color='primary' />
          <Typography variant='h6' sx={{ ml: 1 }}>
            Shopee Voucher
          </Typography>
          <Button
            variant='outlined'
            sx={{ ml: 'auto' }}
            onClick={() => setOpenVoucherDialog(true)}
          >
            Chọn Voucher
          </Button>
        </Box>
      </Paper>

      {/* Total */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Tổng tiền hàng:</Typography>
          <Typography>₫25.500</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Phí vận chuyển:</Typography>
          <Typography>₫16.500</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant='h6'>Tổng thanh toán:</Typography>
          <Typography variant='h6' color='error'>
            ₫42.000
          </Typography>
        </Box>
        <Button variant='contained' color='error' fullWidth size='large'>
          Đặt hàng
        </Button>
      </Paper>

      {/* Voucher Dialog */}
      <Dialog
        open={openVoucherDialog}
        onClose={() => setOpenVoucherDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Chọn Shopee Voucher
          </Typography>
          <TextField fullWidth placeholder='Mã Shopee Voucher' sx={{ mb: 2 }} />
          {vouchers.map((voucher, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography variant='subtitle1'>
                      Giảm tối đa {voucher.discount}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Đơn Tối Thiểu {voucher.minSpend}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Sắp hết hạn: Còn {voucher.validTill}
                    </Typography>
                  </Box>
                  <Radio
                    checked={selectedVoucher?.code === voucher.code}
                    onChange={() => setSelectedVoucher(voucher)}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setOpenVoucherDialog(false)}>TRỞ LẠI</Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => setOpenVoucherDialog(false)}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  )
}
