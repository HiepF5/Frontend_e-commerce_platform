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
import OrderInvoice from './OrderInvoice'
import ChatWithSeller from './ChatWithSeller'
import {
  sendNotification,
  subscribeToOrderUpdates
} from '../services/notificationService'
import { getOrderStatusText, getOrderStatusColor } from '../helper/orderHelper'
import {
  DeliveryMethod,
  OrderStatus,
  PaymentMethod,
  ShippingStatus
} from '../types/order.enum'
import type { OrderDetail } from '../types/order.interface'
import { useCancelOrderByIDMutation, useGetOrderDetailQuery } from '../api/orderShopApi'
import { toast } from 'react-toastify'
const initOrderDetail: OrderDetail = {
  id: 0,
  orderShopCode: '',
  orderStatus: OrderStatus.CHO_XAC_NHAN,
  totalProduct: 0,
  shopShippingFee: 0,
  shopDiscount: 0,
  serviceFee: 0,
  shopTotalAmount: 0,
  ecommerceTotalAmount: 0,
  deliveryMethod: DeliveryMethod.GHN,
  paymentMethod: PaymentMethod.THANH_TOAN_KHI_GIAO_HANG,
  isPayment: false,
  createdAt: '',
  shippingDto: {
    id: 0,
    clientAddress: '',
    clientTelephone: '',
    clientName: '',
    shippingId: null,
    method: DeliveryMethod.GHN,
    status: ShippingStatus.PENDING,
    trackingCode: 0,
    carrier: '',
    shippingDate: null,
    deliveryDate: '',
    shippingFee: 0
  },
  itemDtoList: [],
  historyDtoList: []
}

export default function OrderDetail() {
  const { orderId } = useParams()
  const [reviewOpen, setReviewOpen] = useState(false)
  const [refundOpen, setRefundOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const navigate = useNavigate()
  console.log(orderId)
  // const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null)
  const { data: getData } = useGetOrderDetailQuery({
    orderId: orderId!
  })
  console.log(getData)

  const [orderDetail, setOrderDetail] = useState<OrderDetail>(initOrderDetail)
  useEffect(() => {
    if (getData && getData.data) {
      {
        setOrderDetail(getData.data)
      }
    }
  }, [getData])

  const handleReview = (product: any) => {
    if (orderDetail.orderStatus === OrderStatus.GH_THANH_CONG) {
      setSelectedProduct(product)
      setReviewOpen(true)
    } else {
      toast.error('Chưa thể đánh giá. Đơn hàng chưa hoàn thành.')
    }
  }

  const handleSubmitReview = (review: any) => {
    console.log('Review submitted:', review)
  }
  const [cancelOrder] = useCancelOrderByIDMutation()

  const handleSubmitRefund = (refundData: any) => {
    toast.success('Đã gửi yêu cầu hủy đơn hàng')
    console.log(refundData)
    const respone = cancelOrder({ orderId: orderId! })
    console.log(respone)
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
              {orderDetail?.historyDtoList.map((history, index) => (
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
              {orderDetail.orderStatus !== OrderStatus.GH_THANH_CONG && (
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant='contained'
                    color='error'
                    fullWidth
                    onClick={() => setRefundOpen(true)}
                  >
                    Hủy đơn hàng
                    </Button>              
                </Box>
              )}
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
                Theo dõi trạng thái
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
