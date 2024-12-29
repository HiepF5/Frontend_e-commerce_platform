import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
  Chip
} from '@mui/material'
import { formatCurrency } from '@shared/utils/formatPrice'
import { Link } from 'react-router-dom'

export default function OrderItem() {
  const order = {
    id: '241010SKTECKC7',
    status: 'Đã giao hàng',
    date: '2024-03-15',
    shop: {
      name: 'Shop ABC',
      avatar: '/shop-avatar.jpg'
    },
    items: [
      {
        name: 'Cờ Tổ Quốc treo gia đình ban công',
        quantity: 1,
        price: 35000,
        image: '/flag.jpg'
      }
    ],
    total: 128000
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img 
            src={order.shop.avatar} 
            alt={order.shop.name}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
          <Typography>{order.shop.name}</Typography>
        </Box>
        <Chip label={order.status} color="success" />
      </Box>
      
      <Divider sx={{ my: 2 }} />

      {order.items.map((item, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs>
              <Typography gutterBottom>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                x{item.quantity}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{formatCurrency(item.price)}</Typography>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {order.date}
          </Typography>
          <Typography variant="h6">
            Tổng tiền: {formatCurrency(order.total)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined">Liên hệ người bán</Button>
          <Button 
            variant="contained" 
            component={Link}
            to={`/order/detail/${order.id}`}
          >
            Xem chi tiết
          </Button>
        </Box>
      </Box>
    </Paper>
  )
} 