import { useState , useEffect } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Collapse
} from '@mui/material'
import {
  LocationOn,
  LocalShipping,
  Payment,
  Store,
  LocalOffer
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCheckoutPreviewMutation, useSubmitCheckoutMutation } from '../api/checkoutApi'
import { formatCurrency } from '@shared/utils/formatPrice'
import { VoucherSelector } from './VoucherSelector'
import { Voucher } from '@features/Voucher/types/voucher'
import { ShopVoucherList } from './ShopVoucherList'
import { ShopDiscount } from '../types/checkout.interface'
import { toast } from 'react-toastify'


export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('VNPAY')
  const [shippingMethod, setShippingMethod] = useState('GHN')
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false)
  const [selectedVouchers, setSelectedVouchers] = useState({
    discount: null as Voucher | null,
    shipping: null as Voucher | null,
    shop: {} as { [shopCode: string]: Voucher | null }
  })

  const location = useLocation()
  const { selectedCartItems } = location.state || { selectedCartItems: [] }
  const [checkoutPreview, { data: checkoutData }] = useCheckoutPreviewMutation()
  const [activeShop, setActiveShop] = useState<string | null>(null)
 
  const [activeTab, setActiveTab] = useState<'DISCOUNT' | 'SHIPPING' | 'SHOP'>('DISCOUNT')
  const [expandedShop, setExpandedShop] = useState<string | null>(null)
  const [shopDiscounts, setShopDiscounts] = useState<ShopDiscount>({} as ShopDiscount)
  const navigate = useNavigate()
  useEffect(() => {
    if (selectedCartItems.length > 0) {
      checkoutPreview({
        discountVoucher: selectedVouchers.discount?.voucherCode || null,
        shippingVoucher: selectedVouchers.shipping?.voucherCode || null,
        addressId: 1,
        paymentMethod: 'VNPAY',
        shippingMethod: 'GHN',
        items: selectedCartItems,
        shopDiscounts: shopDiscounts ? Object.values(shopDiscounts) : null
      })
    }
  }, [selectedCartItems, shopDiscounts, selectedVouchers])
  const [
    submitCheckout,
  ] = useSubmitCheckoutMutation()
  const handleSubmitCheckout = async () => {  
    const response = await submitCheckout({
      discountVoucher: selectedVouchers.discount?.voucherCode || null,
      shippingVoucher: selectedVouchers.shipping?.voucherCode || null,
      addressId: 1,
      paymentMethod: paymentMethod,
      shippingMethod: shippingMethod,
      items: selectedCartItems,
      shopDiscounts: shopDiscounts ? Object.values(shopDiscounts) : null
    })
    if (response.data?.code === 200 && response.data.data ){
      toast.success('Đặt hàng thành công với phương thức thanh toán Online')
      navigate('/checkout/success', { state: { link: response.data?.data } })
    }
    else if (response.data?.code === 200 && response.data.data === null) {
      toast.success('Đặt hàng thành công với phương thức thanh toán khi nhận hàng')
      navigate('/order')
    }
    else {
      toast.error('Đặt hàng thất bại')
      navigate('/checkout/error')
    }

  }

  if (!checkoutData) return null

  const { data } = checkoutData

  const handleVoucherSelect = (voucher: Voucher | null, type: 'DISCOUNT' | 'SHIPPING' | 'SHOP', shopCode?: string) => {
    debugger
    setSelectedVouchers(prev => {
      if (type === 'SHOP' && shopCode) {
        return {
          ...prev,
          shop: {
            ...prev.shop,
            [shopCode]: voucher
          }
        }
      }
      return {
        ...prev,
        [type.toLowerCase()]: voucher
      }
    })
    setShopDiscounts(prev => {
      if (type === 'SHOP' && shopCode) {
        return {
          ...prev,
          [shopCode]: {
            shopCode,
            voucherCode: voucher?.voucherCode || ''
          }
        }
      }
      return prev
    }

    )
    setOpenVoucherDialog(false)
  
  }

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
        <Paper key={shop.shopCode} sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              pb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Store color='primary' sx={{ mr: 1 }} />
              <Typography variant='h6'>{shop.shopName}</Typography>
            </Box>
            <Button
              variant={
                selectedVouchers.shop[shop.shopCode] ? 'contained' : 'outlined'
              }
              startIcon={<LocalOffer />}
              onClick={() =>
                setExpandedShop(
                  expandedShop === shop.shopCode ? null : shop.shopCode
                )
              }
              size='small'
              color={
                selectedVouchers.shop[shop.shopCode] ? 'primary' : 'inherit'
              }
            >
              {selectedVouchers.shop[shop.shopCode]
                ? `Voucher: ${selectedVouchers.shop[shop.shopCode]?.voucherCode}`
                : 'Chọn Voucher Shop'}
            </Button>
          </Box>

          {/* Shop vouchers section */}
          <Collapse in={expandedShop === shop.shopCode}>
            <ShopVoucherList
              shopCode={shop.shopCode}
              shopName={shop.shopName}
              selectedVoucher={selectedVouchers.shop[shop.shopCode]}
              onSelectVoucher={(voucher) =>
                handleVoucherSelect(voucher, 'SHOP', shop.shopCode)
              }
              totalAmount={shop.totalAmount}
            />
          </Collapse>

          {/* Shop items */}
          <Box sx={{ mt: 2 }}>
            {shop.listItem.map((item) => (
              <Box
                key={item.variantId}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1,
                  '&:not(:last-child)': {
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={JSON.parse(item.imageUrl)[0]}
                    alt={item.title}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 8
                    }}
                  />
                  <Box>
                    <Typography variant='body1'>{item.title}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Số lượng: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='subtitle1' color='primary'>
                  {formatCurrency(item.sellPrice)}
                </Typography>
              </Box>
            ))}

            {/* Shop summary */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: '1px dashed',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                {shop.listItem.length} sản phẩm
              </Typography>
              <Typography variant='subtitle1'>
                Tổng đơn shop: {formatCurrency(shop.totalAmount)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}

      {/* Phương thức vận chuyển */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalShipping color='primary' sx={{ mr: 1 }} />
          <Typography variant='h6'>Phương thức vận chuyển</Typography>
        </Box>
        <RadioGroup
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
        >
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
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value='VNPAY' control={<Radio />} label='VNPay' />
          <FormControlLabel
        value='THANH_TOAN_KHI_GIAO_HANG'
        control={<Radio />}
        label='Thanh toán khi nhận hàng'
          />
          <FormControlLabel value='MOMO' control={<Radio />} label='Ví MoMo' />
        </RadioGroup>
      </Paper>

      {/* Voucher section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant='h6' gutterBottom>
          Vouchers
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            startIcon={<LocalOffer />}
            variant={selectedVouchers.discount ? 'contained' : 'outlined'}
            onClick={() => {
              setOpenVoucherDialog(true)
              setActiveTab('DISCOUNT')
              setActiveShop(null)
            }}
          >
            {selectedVouchers.discount
              ? `Discount: ${selectedVouchers.discount.voucherCode}`
              : 'Select Discount Voucher'}
          </Button>
          <Button
            startIcon={<LocalShipping />}
            variant={selectedVouchers.shipping ? 'contained' : 'outlined'}
            onClick={() => {
              setOpenVoucherDialog(true)
              setActiveTab('SHIPPING')
              setActiveShop(null)
            }}
          >
            {selectedVouchers.shipping
              ? `Shipping: ${selectedVouchers.shipping.voucherCode}`
              : 'Select Shipping Voucher'}
          </Button>
        </Box>
      </Paper>

      <VoucherSelector
        open={openVoucherDialog}
        onClose={() => {
          setOpenVoucherDialog(false)
          setActiveShop(null)
        }}
        onSelect={handleVoucherSelect}
        totalAmount={data.totalAmount}
        shopBills={data.shopBill}
        selectedVouchers={selectedVouchers}
        activeShop={activeShop}
        initialTab={activeTab}
      />

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
                {formatCurrency(data.shopDiscount + data.ecommerceDiscount + data.ecommerceShipping)}
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
    </Container>
  )
}
