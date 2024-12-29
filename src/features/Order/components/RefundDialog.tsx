import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material'
import { useState } from 'react'

interface RefundDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: RefundRequest) => void
  orderTotal: number
}

interface RefundRequest {
  reason: string
  refundAmount: number
  description: string
  images?: File[]
}

export default function RefundDialog({
  open,
  onClose,
  onSubmit,
  orderTotal
}: RefundDialogProps) {
  const [request, setRequest] = useState<RefundRequest>({
    reason: '',
    refundAmount: orderTotal,
    description: ''
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yêu cầu hoàn tiền</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Lý do hoàn tiền</InputLabel>
          <Select
            value={request.reason}
            onChange={(e) => setRequest({...request, reason: e.target.value})}
            label="Lý do hoàn tiền"
          >
            <MenuItem value="wrong_item">Sản phẩm không đúng mô tả</MenuItem>
            <MenuItem value="damaged">Sản phẩm bị hỏng</MenuItem>
            <MenuItem value="not_received">Không nhận được hàng</MenuItem>
            <MenuItem value="other">Lý do khác</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="Số tiền hoàn trả"
          type="number"
          value={request.refundAmount}
          onChange={(e) => setRequest({...request, refundAmount: Number(e.target.value)})}
          InputProps={{
            inputProps: { min: 0, max: orderTotal }
          }}
        />

        <TextField
          sx={{ mt: 2 }}
          multiline
          rows={4}
          fullWidth
          label="Mô tả chi tiết"
          value={request.description}
          onChange={(e) => setRequest({...request, description: e.target.value})}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 2 }}
          fullWidth
        >
          Tải ảnh minh chứng
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setRequest({...request, images: Array.from(e.target.files)})
              }
            }}
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button 
          onClick={() => {
            onSubmit(request)
            onClose()
          }}
          variant="contained"
          color="error"
        >
          Yêu cầu hoàn tiền
        </Button>
      </DialogActions>
    </Dialog>
  )
} 