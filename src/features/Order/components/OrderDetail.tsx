import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { formatCurrency } from '@shared/utils/formatPrice'
import ReviewDialog from './ReviewDialog'
import RefundDialog from './RefundDialog'
import OrderMap from './OrderMap'
import OrderInvoice from './OrderInvoice'
import ChatWithSeller from './ChatWithSeller'
import { sendNotification, subscribeToOrderUpdates } from '../services/notificationService'
import { OrderDetail as IOrderDetail, OrderStatus, PaymentMethod, getOrderStatusText, getOrderStatusColor, DeliveryMethod, ShippingStatus } from '../types/order.interface'

export default function OrderDetail() {
  const { orderId } = useParams()
  const [reviewOpen, setReviewOpen] = useState(false)
  const [refundOpen, setRefundOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const navigate = useNavigate()
  // Mock data
  const orderDetail: IOrderDetail = {
    id: Number(orderId),
    orderShopCode: `SOR-20241227-DUUM-${orderId?.padStart(8, '0')}`,
    orderStatus: OrderStatus.CHO_XAC_NHAN,
    totalProduct: 5292000,
    shopShippingFee: 41501,
    shopDiscount: 100000,
    serviceFee: 158760,
    shopTotalAmount: 5033240,
    ecommerceTotalAmount: 5233501,
    deliveryMethod: DeliveryMethod.GHN,
    paymentMethod: PaymentMethod.THANH_TOAN_KHI_GIAO_HANG,
    isPayment: false,
    createdAt: '27/12/2024 03:03:55',
    shippingDto: {
      id: Number(orderId),
      clientAddress: 'nha 20, Chi Can, Thieu Hoa, Thanh Hoa',
      clientTelephone: '0987654321',
      clientName: 'Hoang Van An',
      shippingId: null,
      method: DeliveryMethod.GHN,
      status: ShippingStatus.PENDING,
      trackingCode: 1000000,
      carrier: 'GHN',
      shippingDate: null,
      deliveryDate: '2024-12-31T03:03:54.966857',
      shippingFee: 41501
    },
    itemDtoList: [
      {
        id: 586,
        productId: 491,
        variantId: 1967,
        productTitle: 'Don Thatt',
        variantName: '...',
        productImage:
          '["https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzd2qfj9xc99f4.webp"]',
        quantity: 1,
        price: 5292000,
        description: null
      }
    ],
    historyDtoList: [
      {
        id: 357,
        event: 'Tạo đơn hàng',
        description: 'Đơn hàng được tạo vào lúc 27/12/2024 03:03:54',
        note: null
      },
      {
        id: 358,
        event: 'Xác nhận đơn hàng',
        description: 'Đơn hàng đã được xác nhận',
        note: null
      },
      {
        id: 359,
        event: 'Đóng gói',
        description: 'Đơn hàng đang được đóng gói',
        note: null
      }
    ]
  }

  const handleReview = (product: any) => {
    setSelectedProduct(product)
    setReviewOpen(true)
  }

  const handleSubmitReview = (review: any) => {
    console.log('Review submitted:', review)
  }

  const handleSubmitRefund = (refundData: any) => {
    console.log('Refund requested:', refundData)
  }

  useEffect(() => {
    const unsubscribe = subscribeToOrderUpdates(orderId!, async (update) => {
      if (update.status !== orderDetail.orderStatus) {
        try {
          await sendNotification({
            type: 'email',
            to: orderDetail.shippingDto.clientTelephone,
            orderId: orderId!,
            status: update.status
          })
        } catch (error) {
          console.error('Failed to send notification:', error)
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [orderId])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h5' gutterBottom>
        Chi tiết đơn hàng #{orderDetail.orderShopCode}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant='h6'>Trạng thái đơn hàng</Typography>
              <Chip
                label={getOrderStatusText(orderDetail.orderStatus)}
                color={getOrderStatusColor(orderDetail.orderStatus) as any}
              />
            </Box>
            <Stepper orientation='vertical'>
              {orderDetail.historyDtoList.map((history, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant='subtitle2'>{history.event}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {history.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6' gutterBottom>
              Sản phẩm
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align='right'>Đơn giá</TableCell>
                    <TableCell align='right'>Số lượng</TableCell>
                    <TableCell align='right'>Thành tiền</TableCell>
                    <TableCell align='right'>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.itemDtoList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                          <img
                            src={JSON.parse(item.productImage)[0]}
                            alt={item.productTitle}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: 'cover'
                            }}
                          />
                          <Box>
                            <Typography>{item.productTitle}</Typography>
                            <Typography variant='body2' color='text.secondary'>
                              {item.variantName}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align='right'>
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell align='right'>{item.quantity}</TableCell>
                      <TableCell align='right'>
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                      <TableCell align='right'>
                        <Button size='small' onClick={() => handleReview(item)}>
                          Đánh giá
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle1' gutterBottom>
                Thông tin giao hàng
              </Typography>
              <Typography>
                Người nhận: {orderDetail.shippingDto.clientName}
              </Typography>
              <Typography>
                Số điện thoại: {orderDetail.shippingDto.clientTelephone}
              </Typography>
              <Typography>
                Địa chỉ: {orderDetail.shippingDto.clientAddress}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant='h6' gutterBottom>
              Tổng quan đơn hàng
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography>Tổng tiền hàng</Typography>
                <Typography>
                  {formatCurrency(orderDetail.totalProduct)}
                </Typography>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography>Phí vận chuyển</Typography>
                <Typography>
                  {formatCurrency(orderDetail.shopShippingFee)}
                </Typography>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography>Giảm giá</Typography>
                <Typography>
                  -{formatCurrency(orderDetail.shopDiscount)}
                </Typography>
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography>Phí dịch vụ</Typography>
                <Typography>
                  {formatCurrency(orderDetail.serviceFee)}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='h6'>Thành tiền</Typography>
                <Typography variant='h6' color='error'>
                  {formatCurrency(orderDetail.ecommerceTotalAmount)}
                </Typography>
              </Box>
              <Button
                variant='contained'
                color='error'
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate(`/order/tracking/${orderId}`)}
              >
                Theo dõi đơn hàng
              </Button>
              <Button
                variant='contained'
                color='error'
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate(`/order/detail-status/${orderId}`)}
              >
                Thông Tin Vận Chuyển
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <OrderInvoice order={orderDetail} />
          </Paper>

          <ChatWithSeller />
        </Grid>
      </Grid>

      <ReviewDialog
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={handleSubmitReview}
        productName={selectedProduct?.productTitle || ''}
      />

      <RefundDialog
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
        onSubmit={handleSubmitRefund}
        orderTotal={orderDetail.ecommerceTotalAmount}
      />
    </Box>
  )
} 