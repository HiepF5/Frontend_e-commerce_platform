import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid
} from '@mui/material'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function OrderCancel() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    // Implement cancel logic
    console.log('Cancel order:', {
      orderId,
      reason,
      description
    })
    navigate('/order')
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Hủy đơn hàng #{orderId}</Typography>

      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Lý do hủy</InputLabel>
              <Select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                label="Lý do hủy"
              >
                <MenuItem value="change_mind">Đổi ý không muốn mua nữa</MenuItem>
                <MenuItem value="wrong_item">Đặt nhầm sản phẩm</MenuItem>
                <MenuItem value="better_price">Tìm thấy giá tốt hơn</MenuItem>
                <MenuItem value="other">Lý do khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả chi tiết"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={handleSubmit}
                disabled={!reason}
              >
                Xác nhận hủy
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
} 