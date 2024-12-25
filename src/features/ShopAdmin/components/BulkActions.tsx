import { 
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  TableCell,
  TableRow,
} from '@mui/material'
import {
  LocalShipping as ShipIcon,
  Check as DeliverIcon,
  Block as CancelIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { Order } from '../types/order'

interface BulkActionsProps {
  selectedOrders: string[]
  onSelectAll: (checked: boolean) => void
  onSelectOne: (orderId: string, checked: boolean) => void
  onBulkStatusUpdate: (orderIds: string[], status: string) => void
  orders: Order[]
  allSelected: boolean
}

export const BulkActions = ({
  selectedOrders,
  onSelectAll,
  onBulkStatusUpdate,
  allSelected,
}: BulkActionsProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleBulkAction = (status: string): void => {
    onBulkStatusUpdate(selectedOrders, status)
    handleClose()
  }

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            indeterminate={selectedOrders.length > 0 && !allSelected}
          />
        </TableCell>
        <TableCell colSpan={6}>
          <Button
            variant="contained"
            disabled={selectedOrders.length === 0}
            onClick={handleClick}
          >
            Bulk Actions ({selectedOrders.length})
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleBulkAction('shipped')}>
              <ListItemIcon>
                <ShipIcon />
              </ListItemIcon>
              <ListItemText>Mark as Shipped</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleBulkAction('delivered')}>
              <ListItemIcon>
                <DeliverIcon />
              </ListItemIcon>
              <ListItemText>Mark as Delivered</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleBulkAction('cancelled')}>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <ListItemText>Cancel Orders</ListItemText>
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </>
  )
} 