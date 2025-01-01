import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Avatar,
  Chip,
  IconButton
} from '@mui/material'
import { useGetAdminOrderDetailQuery } from '../../api/orderShopApi'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DoneIcon from '@mui/icons-material/Done'
import PendingIcon from '@mui/icons-material/Pending'

export default function OrderAdminDetail() {
  const { orderId } = useParams()
  const {
    data: order,
    isLoading,
    error
  } = useGetAdminOrderDetailQuery({ orderId: orderId! })
  const convertedOrder = order?.data

  if (isLoading) return <CircularProgress />
  if (error) return <Alert severity='error'>Failed to load order details</Alert>

  const statusColors: {
    [key: string]: 'success' | 'warning' | 'error' | 'info'
  } = {
    completed: 'success',
    pending: 'warning',
    canceled: 'error',
    processing: 'info'
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f7f8fa', minHeight: '100vh' }}>
      <Typography variant='h4' gutterBottom sx={{ color: '#1976d2' }}>
        Order Details
      </Typography>
      <Grid container spacing={3}>
        {/* Thông tin đơn hàng */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6' sx={{ color: '#424242' }}>
                Order Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography>
                <strong>Order ID:</strong> {convertedOrder?.orderCode}
              </Typography>
              <Typography>
                <strong>Customer:</strong> {convertedOrder?.clientInfo}
              </Typography>
              <Typography>
                <strong>Payment Method:</strong> {convertedOrder?.paymentMethod}
              </Typography>
              <Typography>
                <strong>Delivery Method:</strong>{' '}
                {convertedOrder?.deliveryMethod}
              </Typography>
              <Typography>
                <strong>Date:</strong> {convertedOrder?.createdAt}
              </Typography>
              <Chip
                label={convertedOrder?.status}
                color={
                  statusColors[
                    convertedOrder?.status?.toLowerCase() || 'pending'
                  ]
                }
                icon={
                  convertedOrder?.status?.toLowerCase() === 'completed' ? (
                    <DoneIcon />
                  ) : (
                    <PendingIcon />
                  )
                }
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết thanh toán */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6' sx={{ color: '#424242' }}>
                Payment Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Method</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Amount</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {convertedOrder?.listOrderPayment.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Chip
                          label={`$${payment.amount}`}
                          color='success'
                          icon={<AttachMoneyIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          color={
                            statusColors[
                              payment.status?.toLowerCase() || 'pending'
                            ]
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết từng cửa hàng */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6' sx={{ color: '#424242' }}>
                Shop Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Logo</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Shop Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Shipping Fee</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Discount</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Total</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {convertedOrder?.listOrderShop.map((shop, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar src={shop.shopLogo} alt={shop.shopName} />
                      </TableCell>
                      <TableCell>{shop.shopName}</TableCell>
                      <TableCell>
                        <Chip
                          label={shop.orderStatus}
                          color={
                            statusColors[
                              shop.orderStatus?.toLowerCase() || 'processing'
                            ]
                          }
                        />
                      </TableCell>
                      <TableCell>${shop.shopShippingFee}</TableCell>
                      <TableCell>${shop.shopDiscount}</TableCell>
                      <TableCell>
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                          ${shop.shopTotalAmount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
