import { Button } from '@mui/material'
import { Receipt } from '@mui/icons-material'
import { jsPDF } from 'jspdf'
import { OrderDetail } from '../types/order.interface'
import { formatCurrency } from '@shared/utils/formatPrice'
import autoTable from 'jspdf-autotable'

interface OrderInvoiceProps {
  order: OrderDetail
}

export default function OrderInvoice({ order }: OrderInvoiceProps) {
  const generateInvoice = () => {
    const doc = new jsPDF()

    // Add header
    doc.setFontSize(20)
    doc.text('HÓA ĐƠN BÁN HÀNG', 105, 20, { align: 'center' })

    // Add order info
    doc.setFontSize(12)
    doc.text(`Mã đơn hàng: ${order.id}`, 20, 40)
    doc.text(`Ngày đặt: ${order.createdAt}`, 20, 50)
    doc.text(`Người mua: ${order.shippingDto?.clientName}`, 20, 60)
    doc.text(`Địa chỉ: ${order.shippingDto?.clientAddress}`, 20, 70)
    doc.text(`Điện thoại: ${order.shippingDto?.clientTelephone}`, 20, 80)

    // Add items table
    const tableColumns = ["STT", "Sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"]
    const tableRows = order.itemDtoList.map((item, index) => [
      (index + 1).toString(),
      item.productTitle,
      item.quantity.toString(),
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity)
    ])
    
    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 100,
      theme: 'grid'
    })

    // Add payment summary
    const finalY = (doc as any).lastAutoTable.finalY + 20
    doc.text('Tổng tiền hàng:', 120, finalY)
    doc.text(formatCurrency(order.totalProduct || 0), 170, finalY, {
      align: 'right'
    })
    
    doc.text('Phí vận chuyển:', 120, finalY + 10)
    doc.text(formatCurrency(order.shopShippingFee || 0), 170, finalY + 10, {
      align: 'right'
    })
    
    doc.text('Giảm giá:', 120, finalY + 20)
    doc.text(`-${formatCurrency(order.shopDiscount || 0)}`, 170, finalY + 20, {
      align: 'right'
    })
    
    doc.setFontSize(14)
    doc.text('Thành tiền:', 120, finalY + 35)
    doc.text(
      formatCurrency(order.ecommerceTotalAmount || 0),
      170,
      finalY + 35,
      {
        align: 'right'
      }
    )

    // Save PDF
    doc.save(`invoice-${order.id}.pdf`)
  }

  return (
    <Button
      variant="outlined"
      startIcon={<Receipt />}
      onClick={generateInvoice}
    >
      In hóa đơn
    </Button>
  )
} 