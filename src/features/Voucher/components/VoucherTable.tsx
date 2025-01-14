import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  TablePagination,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as EnableIcon,
  Block as DisableIcon,
  HourglassEmpty as WaitIcon,
  DeleteForever as DeletedIcon
} from '@mui/icons-material'
import { Voucher, VoucherStatus } from '../types/voucher'
import type { UserRole } from '@config/constants/roles'
import { useState } from 'react'
import { ConfirmStatusDialog } from './ConfirmStatusDialog'

interface VoucherTableProps {
  vouchers: Voucher[]
  onStatusChange: (voucherCode: string, status: VoucherStatus) => void
  role: UserRole
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  onEdit: (voucher: Voucher) => void
  onDelete: (voucherCode: string) => void
}

export const VoucherTable = ({
  vouchers,
  onStatusChange,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete
}: VoucherTableProps) => {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    voucherCode: '',
    status: '' as VoucherStatus
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedVoucher, setSelectedVoucher] = useState<string>('')

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    voucherCode: string
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedVoucher(voucherCode)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedVoucher('')
  }

  const getStatusColor = (status: VoucherStatus) => {
    switch (status) {
      case 'ENABLE':
        return 'success'
      case 'DISABLE':
        return 'error'
      case 'WAIT':
        return 'warning'
      case 'DELETED':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: VoucherStatus) => {
    switch (status) {
      case 'ENABLE':
        return <EnableIcon color='success' />
      case 'DISABLE':
        return <DisableIcon color='error' />
      case 'WAIT':
        return <WaitIcon color='warning' />
      case 'DELETED':
        return <DeletedIcon />
      default:
        return <span />
    }
  }

  const renderActionMenu = (voucher: Voucher) => (
    <Box>
      <IconButton onClick={(e) => handleOpenMenu(e, voucher.voucherCode)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && selectedVoucher === voucher.voucherCode}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            onEdit(voucher)
            handleCloseMenu()
          }}
        >
          <ListItemIcon>
            <EditIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(voucher.voucherCode)
            handleCloseMenu()
          }}
        >
          <ListItemIcon>
            <DeleteIcon color='error' />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            handleStatusChange(voucher.voucherCode, 'ENABLE')
            handleCloseMenu()
          }}
        >
          <ListItemIcon>
            <EnableIcon color='success' />
          </ListItemIcon>
          <ListItemText>Enable</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleStatusChange(voucher.voucherCode, 'DISABLE')
            handleCloseMenu()
          }}
        >
          <ListItemIcon>
            <DisableIcon color='error' />
          </ListItemIcon>
          <ListItemText>Disable</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleStatusChange(voucher.voucherCode, 'WAIT')
            handleCloseMenu()
          }}
        >
          <ListItemIcon>
            <WaitIcon color='warning' />
          </ListItemIcon>
          <ListItemText>Wait</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleStatusChange(voucher.voucherCode, 'DELETED')
            handleCloseMenu()
          }}
        >
          <ListItemIcon>
            <DeletedIcon />
          </ListItemIcon>
          <ListItemText>Delete Status</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )

  const columns = [
    { field: 'voucherCode', headerName: 'Code' },
    { field: 'title', headerName: 'Title' },
    { field: 'type', headerName: 'Type' },
    { field: 'discountType', headerName: 'Discount Type' },
    { field: 'minTotalOrder', headerName: 'Min Total Order' },
    {
      field: 'discountValue',
      headerName: 'Discount Value',
      renderCell: (voucher: Voucher) => {
        if (voucher.type === 'SHIPPING') return '-'
        if (voucher.discountType === 'PERCENT') {
          return `${voucher.discountValue}%`
        }
        return voucher.discountValue
          ? `₫${voucher.discountValue.toLocaleString()}`
          : '-'
      }
    },
    {
      field: 'maxDiscountValue',
      headerName: 'Max Discount Value',
      renderCell: (voucher: Voucher) => {
        if (voucher.type === 'SHIPPING') return '-'
        if (voucher.discountType === 'PERCENT') {
          return `${voucher.maxDiscountValue}%`
        }
        return voucher.maxDiscountValue
          ? `${voucher.maxDiscountValue.toLocaleString()}`
          : '-'
      }
    },
    {
      field: 'shippingDiscount',
      headerName: 'Shipping Discount',
      renderCell: (voucher: Voucher) => {
        if (voucher.type !== 'SHIPPING') return '-'
        return voucher.shippingDiscount
          ? `₫${voucher.shippingDiscount.toLocaleString()}`
          : '-'
      }
    },
    {
      field: 'maxShippingDiscount',
      headerName: 'Max Shipping Discount',
      renderCell: (voucher: Voucher) => {
        if (voucher.type !== 'SHIPPING') return '-'
        return voucher.maxShippingDiscount
          ? `₫${voucher.maxShippingDiscount.toLocaleString()}`
          : '-'
      }
    },
    {
      field: 'startedAt',
      headerName: 'Valid Period',
      renderCell: (voucher: Voucher) => (
        <Box>
          <div>From: {new Date(voucher.startedAt).toLocaleDateString()}</div>
          <div>To: {new Date(voucher.expiredAt).toLocaleDateString()}</div>
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (voucher: Voucher) => (
        <Chip
          label={voucher.status}
          color={getStatusColor(voucher.status)}
          icon={getStatusIcon(voucher.status)}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (voucher: Voucher) => renderActionMenu(voucher)
    }
  ]

  const handleStatusChange = (
    voucherCode: string,
    newStatus: VoucherStatus
  ) => {
    setConfirmDialog({
      open: true,
      voucherCode,
      status: newStatus
    })
  }

  const handleConfirmStatus = () => {
    onStatusChange(confirmDialog.voucherCode, confirmDialog.status)
    setConfirmDialog({ ...confirmDialog, open: false })
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.voucherCode}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.renderCell
                      ? column.renderCell(voucher)
                      : voucher[column.field as keyof Voucher]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            component='div'
            count={totalPages * 10}
            page={page - 1}
            onPageChange={(_, newPage) => onPageChange(newPage + 1)}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
          />
        </Table>
      </TableContainer>

      <ConfirmStatusDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        onConfirm={handleConfirmStatus}
        status={confirmDialog.status}
        voucherCode={confirmDialog.voucherCode}
      />
    </>
  )
}
