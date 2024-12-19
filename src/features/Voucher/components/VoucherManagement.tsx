import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { VoucherTable } from './VoucherTable'
import { VoucherForm } from './VoucherForm'
import { useAppSelector } from '@store/hook'
import { ROLES } from '@config/constants/roles'
import type { UserRole } from '@config/constants/roles'
import type { Voucher, VoucherCreateRequest, VoucherStatus } from '../types/voucher'
import { VoucherFilters } from './VoucherFilters'
import {
  useChangeAdminVoucherStatusMutation,
  useChangeOwnerVoucherStatusMutation,
  useCreateAdminVoucherMutation,
  useCreateOwnerVoucherMutation,
  useUpdateAdminVoucherMutation,
  useUpdateOwnerVoucherMutation
} from '../api/voucherApi'

interface VoucherManagementProps {
  useGetDashboardMutation: any
  role: UserRole
}
const defaultFilters = {
  type: null,
  discountType: null,
  status: null,
  startSt: null,
  startEd: null,
  expirySt: null,
  expiryEd: null,
  sort: null
}
export const VoucherManagement = ({
  useGetDashboardMutation,
  role
}: VoucherManagementProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAppSelector((state) => state.auth)
  const [filters, setFilters] = useState({})

  const { data, isLoading } = useGetDashboardMutation({
    pageNumber: page,
    pageSize: 10,
    voucherCode: search || null,
    ...defaultFilters,
    ...filters
  })
  const requestData = {
    pageNumber: page,
    pageSize: 10,
    voucherCode: search || null,
    ...defaultFilters,
    ...filters
  }
  if (error) {
    console.error('Error:', error)
  }

  // Log dữ liệu trước khi gửi
  console.log('Request Data:', requestData)

  console.log(page)
  console.log('Filters:', filters)
  console.log(data)

  const mutations =
    role === ROLES.QUANLY
      ? {
          createMutation: useCreateAdminVoucherMutation,
          updateMutation: useUpdateAdminVoucherMutation,
          statusMutation: useChangeAdminVoucherStatusMutation
        }
      : {
          createMutation: useCreateOwnerVoucherMutation,
          updateMutation: useUpdateOwnerVoucherMutation,
          statusMutation: useChangeOwnerVoucherStatusMutation
        }

  const [createVoucher] = mutations.createMutation()
  const [updateVoucher] = mutations.updateMutation()
  const [changeStatus] = mutations.statusMutation()

  const handleCreateVoucher = async (formData: VoucherCreateRequest) => {
    try {
      await createVoucher(formData).unwrap()
      setFormOpen(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create voucher')
    }
  }

  const handleUpdateStatus = async (
    voucherCode: string,
    status: VoucherStatus
  ) => {
    try {
      await changeStatus({ voucherCode, status }).unwrap()
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  if (!user || (role === ROLES.CHUCUAHANG && !user.shop_code)) {
    return (
      <Alert severity='error'>
        You don't have permission to access this page
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='400px'
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Typography variant='h5'>
          {role === ROLES.QUANLY ? 'System Vouchers' : 'Shop Vouchers'}
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Create Voucher
        </Button>
      </Box>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <VoucherFilters
        onSearch={setSearch}
        onPageChange={setPage}
        onFilterChange={setFilters}
      />

      <VoucherTable
        vouchers={data?.content || []}
        onStatusChange={handleUpdateStatus}
        role={role}
        page={0}
        totalPages={0}
        onPageChange={function (page: number): void {
          throw new Error('Function not implemented.')
        }}
        onEdit={function (voucher: Voucher): void {
          throw new Error('Function not implemented.')
        }}
        onDelete={function (voucherCode: string): void {
          throw new Error('Function not implemented.')
        }}
      />

      <VoucherForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateVoucher}
      />
    </Box>
  )
}
