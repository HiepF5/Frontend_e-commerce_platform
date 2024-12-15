import { useState } from 'react'
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material'
import { 
  FileDownload as DownloadIcon,
  TableChart as ExcelIcon,
  PictureAsPdf as PdfIcon 
} from '@mui/icons-material'
import { exportToExcel, exportToPDF } from '../utils/exportUtils'
import { Order } from '../types/order'

interface ExportButtonProps {
  orders: Order[]
  selectedOrders?: string[]
  fileName?: string
}

export const ExportButton = ({ 
  orders, 
  selectedOrders = [], 
  fileName = 'orders' 
}: ExportButtonProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleExportExcel = (): void => {
    const ordersToExport = selectedOrders.length > 0
      ? orders.filter(order => selectedOrders.includes(order.id))
      : orders
    exportToExcel(ordersToExport, fileName)
    handleClose()
  }

  const handleExportPDF = (): void => {
    const ordersToExport = selectedOrders.length > 0
      ? orders.filter(order => selectedOrders.includes(order.id))
      : orders
    exportToPDF(ordersToExport, fileName)
    handleClose()
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleClick}
      >
        Export {selectedOrders.length > 0 ? `(${selectedOrders.length} selected)` : 'All'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleExportExcel}>
          <ListItemIcon>
            <ExcelIcon />
          </ListItemIcon>
          <ListItemText>Export to Excel</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportPDF}>
          <ListItemIcon>
            <PdfIcon />
          </ListItemIcon>
          <ListItemText>Export to PDF</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
} 