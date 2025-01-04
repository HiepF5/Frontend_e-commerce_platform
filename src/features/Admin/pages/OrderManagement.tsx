import { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material'
import { Search as SearchIcon, Visibility as ViewIcon } from '@mui/icons-material'

interface OrderItem {
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customerName: string
  shopName: string
  date: string
  status: string
  total: number
  items: OrderItem[]
}

const OrderManagement = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'John Doe',
      shopName: 'Shop A',
      date: '2024-03-15',
      status: 'Processing',
      total: 299.97,
      items: [
        { productName: 'Product 1', quantity: 2, price: 99.99 },
        { productName: 'Product 2', quantity: 1, price: 99.99 },
      ]
    },
    {
      id: 'ORD002',
      customerName: 'Jane Smith',
      shopName: 'Shop B',
      date: '2024-03-14',
      status: 'Delivered',
      total: 149.99,
      items: [
        { productName: 'Product 3', quantity: 1, price: 149.99 },
      ]
    },
  ])

  const handleView = (order: Order): void => {
    setSelectedOrder(order)
    setOpen(true)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Order Management</Typography>
        <TextField
          placeholder="Search orders..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.shopName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === 'Delivered'
                        ? 'success'
                        : order.status === 'Processing'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<ViewIcon />}
                    size="small"
                    onClick={() => handleView(order)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Information</Typography>
                    <Typography>Order ID: {selectedOrder.id}</Typography>
                    <Typography>Customer: {selectedOrder.customerName}</Typography>
                    <Typography>Shop: {selectedOrder.shopName}</Typography>
                    <Typography>Date: {selectedOrder.date}</Typography>
                    <Typography>Status: {selectedOrder.status}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Items</Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={2}><strong>Total</strong></TableCell>
                          <TableCell><strong>${selectedOrder.total}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default OrderManagement 