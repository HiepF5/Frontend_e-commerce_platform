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
  Tooltip,
  Box,
  TablePagination
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { Voucher, VoucherStatus } from '../types/voucher'
import { ROLES } from '@config/constants/roles'
import type { UserRole } from '@config/constants/roles'

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
  role,
  page,
  totalPages,
  onPageChange
}: VoucherTableProps) => {
  const columns = [
    { field: 'voucherCode', headerName: 'Code' },
    { field: 'title', headerName: 'Title' },
    { field: 'type', headerName: 'Type' },
    { field: 'discountType', headerName: 'Discount Type' },
    { field: 'discountValue', headerName: 'Discount Value' },
    { field: 'startedAt', headerName: 'Valid Period' },
    { field: 'status', headerName: 'Status' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: Voucher) => (
        <Box>
          {role === ROLES.QUANLY && (
            <Tooltip title='System-wide actions'>
              <>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </>
            </Tooltip>
          )}
          {role === ROLES.CHUCUAHANG && (
            <Tooltip title='Shop-specific actions'>
              <>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </>
            </Tooltip>
          )}
        </Box>
      )
    }
  ]

  return (
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
                  {column.field === 'startedAt' ? (
                    new Date(voucher[column.field]).toLocaleDateString()
                  ) : column.field === 'status' ? (
                    <Chip
                      label={voucher[column.field]}
                      color={
                        voucher[column.field] === 'ENABLE'
                          ? 'success'
                          : voucher[column.field] === 'DISABLE'
                            ? 'error'
                            : 'default'
                      }
                    />
                  ) : column.field === 'actions' ? (
                    <Box>
                      {role === ROLES.QUANLY && (
                        <Tooltip title='System-wide actions'>
                          <>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        </Tooltip>
                      )}
                      {role === ROLES.CHUCUAHANG && (
                        <Tooltip title='Shop-specific actions'>
                          <>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        </Tooltip>
                      )}
                    </Box>
                  ) : (
                    voucher[column.field as keyof Voucher]
                  )}
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
  )
}
