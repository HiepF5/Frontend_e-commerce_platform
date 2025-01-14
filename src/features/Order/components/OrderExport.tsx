import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { FileDownload, PictureAsPdf, TableChart } from '@mui/icons-material'
import { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { Order } from '../types/order.interface'

interface OrderExportProps {
  orders: Order[]
}

export default function OrderExport({ orders }: OrderExportProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleExportPDF = () => {
    const doc = new jsPDF()

    // Add header
    doc.setFontSize(18)
    doc.text('Danh sách đơn hàng', 14, 22)

    // Add order table
    const tableColumn = ['Mã đơn', 'Ngày', 'Shop', 'Tổng tiền', 'Trạng thái']
    const tableRows = orders.map((order) => [
      order.id,
      order.date,
      order.shop.name,
      order.total.toString(),
      order.status
    ])

    // doc.autoTable({
    //   head: [tableColumn],
    //   body: tableRows,
    //   startY: 30,
    // })
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid'
    })

    doc.save('orders.pdf')
    setAnchorEl(null)
  }

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      orders.map((order) => ({
        'Mã đơn hàng': order.id,
        'Ngày đặt': order.date,
        Shop: order.shop.name,
        'Tổng tiền': order.total,
        'Trạng thái': order.status
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
    XLSX.writeFile(workbook, 'orders.xlsx')
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<FileDownload />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Xuất dữ liệu
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleExportPDF}>
          <ListItemIcon>
            <PictureAsPdf />
          </ListItemIcon>
          <ListItemText>Xuất PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportExcel}>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText>Xuất Excel</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
