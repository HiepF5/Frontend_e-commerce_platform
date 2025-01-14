interface NotificationPayload {
  type: 'email' | 'sms'
  to: string
  orderId: string
  status: string
  message?: string
}

export const sendNotification = async (payload: NotificationPayload) => {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Failed to send notification')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending notification:', error)
    throw error
  }
}

export const subscribeToOrderUpdates = (orderId: string, callback: (update: any) => void) => {
  const eventSource = new EventSource(`/api/orders/${orderId}/updates`)

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    callback(data)
  }

  return () => {
    eventSource.close()
  }
} 