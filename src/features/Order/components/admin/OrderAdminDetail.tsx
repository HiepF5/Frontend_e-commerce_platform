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
  TableRow
} from '@mui/material'
import { useGetAdminOrderDetailQuery } from '../../api/orderShopApi'

export default function OrderAdminDetail() {
  const { orderId } = useParams()
  console.log(orderId)
  const {
    data: order,
    isLoading,
    error
  } = useGetAdminOrderDetailQuery({ orderId: orderId! })
  const convertedOrder = order?.data
  console.log(convertedOrder
  )

  if (isLoading) return <CircularProgress />
  if (error) return <Alert severity='error'>Failed to load order details</Alert>

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Order Information</Typography>
              <Typography>Order ID: {convertedOrder?.orderCode}</Typography>
              <Typography>Customer: {convertedOrder?.clientInfo}</Typography>
              <Typography>Date: {convertedOrder?.createdAt}</Typography>
              <Typography>Status: {convertedOrder?.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Order Items</Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {convertedOrder?.listOrderPayment.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.method}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>${item.amount}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell>
                      <strong>${convertedOrder?.totalAmount}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
