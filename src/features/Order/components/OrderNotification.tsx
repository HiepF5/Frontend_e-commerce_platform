import { useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useOrderSubscription } from '../hooks/useOrderSubscription'

export default function OrderNotification() {
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'info' | 'warning' | 'error'
  }>({
    open: false,
    message: '',
    severity: 'info'
  })

  const { orderUpdates } = useOrderSubscription()

  useEffect(() => {
    if (orderUpdates) {
      setNotification({
        open: true,
        message: `Đơn hàng #${orderUpdates.orderId} ${orderUpdates.status}`,
        severity: 'info'
      })
    }
  }, [orderUpdates])

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={() => setNotification(prev => ({ ...prev, open: false }))}
    >
      <Alert
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        severity={notification.severity}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
} 