import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

interface ConfirmStatusDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  status: string
  voucherCode: string
}

export const ConfirmStatusDialog = ({
  open,
  onClose,
  onConfirm,
  status,
  voucherCode
}: ConfirmStatusDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Status Change</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to change the status of voucher {voucherCode} to {status}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
} 