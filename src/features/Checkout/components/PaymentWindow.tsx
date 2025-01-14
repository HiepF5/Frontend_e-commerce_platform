import React from 'react'
import { Button } from '@mui/material'

interface PaymentPopupProps {
  paymentLink: string
}

const PaymentWindow: React.FC<PaymentPopupProps> = ({ paymentLink }) => {
  const handlePayment = () => {
    window.open(
      paymentLink,
      'Thanh Toán',
      'width=800,height=600,scrollbars=yes,resizable=yes'
    )
  }

  return (
    <Button variant='contained' onClick={handlePayment}>
      Thanh Toán Ngay
    </Button>
  )
}

export default PaymentWindow
