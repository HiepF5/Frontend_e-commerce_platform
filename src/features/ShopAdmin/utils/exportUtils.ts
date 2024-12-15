import * as XLSX from 'xlsx'
import { Order } from '../types/order'
import 'jspdf-autotable'

export const exportToExcel = (orders: Order[], fileName: string): void => {
  const worksheet = XLSX.utils.json_to_sheet(
    orders.map(order => ({
      'Order ID': order.id,
      'Customer Name': order.customerName,
      'Date': order.date,
      'Status': order.status,
      'Total': order.total,
      'Address': order.address,
      'Phone': order.phone,
      'Items': order.items.map(item => 
        `${item.productName} (${item.quantity}x $${item.price})`
      ).join(', ')
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export const exportToPDF = async (orders: Order[], fileName: string): Promise<void> => {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()

  orders.forEach((order, index) => {
    if (index > 0) doc.addPage()

    doc.setFontSize(16)
    doc.text(`Order Details - ${order.id}`, 20, 20)

    doc.setFontSize(12)
    doc.text(`Customer: ${order.customerName}`, 20, 40)
    doc.text(`Date: ${order.date}`, 20, 50)
    doc.text(`Status: ${order.status}`, 20, 60)
    doc.text(`Total: $${order.total}`, 20, 70)
    doc.text(`Address: ${order.address}`, 20, 80)
    doc.text(`Phone: ${order.phone}`, 20, 90)

    doc.text('Items:', 20, 110)
    order.items.forEach((item, itemIndex) => {
      doc.text(
        `- ${item.productName} (${item.quantity}x $${item.price})`,
        30,
        120 + itemIndex * 10
      )
    })
  })

  doc.save(`${fileName}.pdf`)
}

export const exportAnalysisResults = (results: any[], filename: string): void => {
  // Export to Excel
  const worksheet = XLSX.utils.json_to_sheet(
    results.map(result => ({
      'Analysis Type': result.type,
      'Description': result.description,
      'Data': JSON.stringify(result.data),
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Analysis Results')
  XLSX.writeFile(workbook, `${filename}.xlsx`)

  // Export to PDF
  const pdf = new jsPDF()
  pdf.autoTable({
    head: [['Analysis Type', 'Description', 'Details']],
    body: results.map(result => [
      result.type,
      result.description,
      JSON.stringify(result.data, null, 2),
    ]),
  })
  pdf.save(`${filename}.pdf`)
} 