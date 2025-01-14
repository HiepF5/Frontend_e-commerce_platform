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
  Grid,
  Alert
} from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface CancelReason {
  id: string
  label: string
  description: string
}

const cancelReasons: CancelReason[] = [
  {
    id: 'WRONG_PRODUCT',
    label: 'Đặt nhầm sản phẩm',
    description: 'Sản phẩm không đúng như mong muốn'
  },
  {
    id: 'CHANGE_MIND',
    label: 'Đổi ý không muốn mua nữa',
    description: 'Không có nhu cầu mua sản phẩm này nữa'
  },
  {
    id: 'BETTER_PRICE',
    label: 'Tìm thấy giá tốt hơn',
    description: 'Đã tìm thấy sản phẩm tương tự với giá tốt hơn'
  },
  {
    id: 'DELIVERY_TOO_LONG',
    label: 'Thời gian giao hàng quá lâu',
    description: 'Không thể đợi thời gian giao hàng lâu như vậy'
  },
  {
    id: 'OTHER',
    label: 'Lý do khác',
    description: 'Vui lòng mô tả chi tiết lý do của bạn'
  }
]

export default function CancelOrder() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      if (!reason) {
        setError('Vui lòng chọn lý do hủy đơn')
        return
      }

      if (reason === 'OTHER' && !description.trim()) {
        setError('Vui lòng nhập mô tả chi tiết lý do hủy đơn')
        return
      }

      // Call API to cancel order
      await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reason,
          description: description.trim() || undefined
        })
      })

      navigate(`/order/detail/${orderId}`)
    } catch (err) {
      setError('Có lỗi xảy ra khi hủy đơn hàng')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Hủy đơn hàng #{orderId}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Lý do hủy đơn</InputLabel>
              <Select
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  setError('')
                }}
                label="Lý do hủy đơn"
              >
                {cancelReasons.map((reason) => (
                  <MenuItem key={reason.id} value={reason.id}>
                    {reason.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {reason && (
            <Grid item xs={12}>
              <Typography color="text.secondary" gutterBottom>
                {cancelReasons.find(r => r.id === reason)?.description}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả chi tiết (nếu có)"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setError('')
              }}
              required={reason === 'OTHER'}
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