import { useState , useEffect } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Dialog,
  TextField,
  Card,
  CardContent
} from '@mui/material'
import {
  LocationOn,
  LocalShipping,
  Payment,
  Store,
  Receipt
} from '@mui/icons-material'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useCheckoutPreviewMutation, useSubmitCheckoutMutation } from '../api/checkoutApi'
import { formatCurrency } from '@shared/utils/formatPrice'
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
  const location = useLocation()
  const { selectedCartItems } = location.state || { selectedCartItems: [] }
  const [checkoutPreview, { data: checkoutData }] = useCheckoutPreviewMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (selectedCartItems.length > 0) {
      checkoutPreview({
        discountVoucher: null,
        shippingVoucher: null,
        addressId: 1,
        paymentMethod: 'VNPAY',
        shippingMethod: 'GHN',
        items: selectedCartItems,
        shopDiscounts: null
      })
    }
  }, [selectedCartItems])
  const [
    submitCheckout,
  ] = useSubmitCheckoutMutation()
  const handleSubmitCheckout = async () => {  
    const response = await submitCheckout({
      discountVoucher: null,
      shippingVoucher: null,
      addressId: 1,
      paymentMethod: 'VNPAY',
      shippingMethod: 'GHN',
      items: selectedCartItems,
      shopDiscounts: null
    })
    if (response.data?.code === 200) navigate('/checkout/success', { state: { link: response.data?.data } })
    else navigate('/checkout/error')

  }

  if (!checkoutData) return null

  const { data } = checkoutData

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Địa chỉ giao hàng */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn color='primary' sx={{ mr: 1 }} />
          <Typography variant='h6'>Địa chỉ nhận hàng</Typography>
        </Box>
        <Box sx={{ ml: 4 }}>
          <Typography>
            <strong>{data.addressDto.full_name}</strong> |{' '}
            {data.addressDto.phone_number}
          </Typography>
          <Typography color='text.secondary'>
            {data.addressDto.house_name}, {data.addressDto.address},{' '}
            {data.addressDto.ward_name}, {data.addressDto.district_name},{' '}
            {data.addressDto.province_name}
          </Typography>
        </Box>
      </Paper>

      {/* Danh sách đơn hàng theo shop */}
      {data.shopBill.map((shop) => (
        <Paper key={shop.shopCode} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Store color='primary' sx={{ mr: 1 }} />
            <Typography variant='h6'>{shop.shopName}</Typography>
          </Box>

          {shop.listItem.map((item) => (
            <Box
              key={item.variantId}
              sx={{ display: 'flex', py: 2, borderBottom: '1px solid #eee' }}
            >
              <img
                src={JSON.parse(item.imageUrl)[0]}
                alt={item.title}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  marginRight: 16
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography>{item.title}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Số lượng: {item.quantity}
                </Typography>
                <Typography color='primary'>
                  {formatCurrency(item.sellPrice)}
                </Typography>
              </Box>
            </Box>
          ))}

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Phí vận chuyển:</Typography>
            <Typography>{formatCurrency(shop.fee)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              <strong>Tổng tiền:</strong>
            </Typography>
            <Typography color='primary'>
              <strong>{formatCurrency(shop.totalAmount)}</strong>
            </Typography>
          </Box>
        </Paper>
      ))}

      {/* Phương thức vận chuyển */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalShipping color='primary' sx={{ mr: 1 }} />
          <Typography variant='h6'>Phương thức vận chuyển</Typography>
        </Box>
        <RadioGroup defaultValue='GHN'>
          <FormControlLabel
            value='GHN'
            control={<Radio />}
            label='Giao Hàng Nhanh'
          />
          <FormControlLabel
            value='GHTK'
            control={<Radio />}
            label='Giao Hàng Tiết Kiệm'
          />
        </RadioGroup>
      </Paper>

      {/* Phương thức thanh toán */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Payment color='primary' sx={{ mr: 1 }} />
          <Typography variant='h6'>Phương thức thanh toán</Typography>
        </Box>
        <RadioGroup defaultValue='VNPAY'>
          <FormControlLabel value='VNPAY' control={<Radio />} label='VNPay' />
          <FormControlLabel
            value='COD'
            control={<Radio />}
            label='Thanh toán khi nhận hàng'
          />
          <FormControlLabel value='MOMO' control={<Radio />} label='Ví MoMo' />
        </RadioGroup>
      </Paper>
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

      {/* Tổng kết đơn hàng */}
      <Paper sx={{ p: 2, position: 'sticky', bottom: 0 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography>
                Tổng tiền hàng: {formatCurrency(data.productTotal)}
              </Typography>
              <Typography>
                Phí vận chuyển: {formatCurrency(data.totalFee)}
              </Typography>
              <Typography>
                Giảm giá:{' '}
                {formatCurrency(data.shopDiscount + data.ecommerceDiscount)}
              </Typography>
              <Typography variant='h6' color='primary'>
                Tổng thanh toán: {formatCurrency(data.totalAmount)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              onClick={handleSubmitCheckout}
            >
              Đặt hàng
            </Button>
          </Grid>
        </Grid>
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
