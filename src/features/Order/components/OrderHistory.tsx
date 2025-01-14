import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material'
import { Download, Visibility } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@shared/utils/formatPrice'

export default function OrderHistory() {
  // Mock data
  const orders = [
    {
      id: '241010SKTECKC7',
      date: '2024-03-15',
      total: 128000,
      status: 'Hoàn thành',
      items: 2,
      shop: 'Shop ABC'
    },
    // Thêm mock data khác...
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Lịch sử đơn hàng</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.shop}</TableCell>
                <TableCell>{order.items} sản phẩm</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status}
                    color={order.status === 'Hoàn thành' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="Xem chi tiết">
                      <IconButton 
                        component={Link} 
                        to={`/order/detail/${order.id}`}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Tải hóa đơn">
                      <IconButton>
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
} 