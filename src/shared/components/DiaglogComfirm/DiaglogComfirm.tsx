import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'

export const ConfirmDialog: React.FC<{
  open: boolean
  onClose: () => void
  action: string
  title: string
  onConfirm: () => void
}> = ({ open, onClose, action, onConfirm, title }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Xác nhận {action}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Bạn có chắc muốn {action} {title} này?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Hủy</Button>
      <Button
        onClick={() => {
          onConfirm()
          onClose()
        }}
        color='error'
      >
        {action}
      </Button>
    </DialogActions>
  </Dialog>
)
