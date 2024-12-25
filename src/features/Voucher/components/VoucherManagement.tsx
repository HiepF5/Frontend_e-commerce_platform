import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { VoucherTable } from './VoucherTable'
import { VoucherForm } from './VoucherForm'
import { ROLES } from '@config/constants/roles'
import type { UserRole } from '@config/constants/roles'
import type {
  Voucher,
  VoucherCreateRequest,
  VoucherStatus,
  VoucherUpdateRequest
} from '../types/voucher'
import { VoucherFilters } from './VoucherFilters'
import {
  useChangeAdminVoucherStatusMutation,
  useChangeOwnerVoucherStatusMutation,
  useCreateAdminVoucherMutation,
  useCreateOwnerVoucherMutation,
  useUpdateAdminVoucherMutation,
  useUpdateOwnerVoucherMutation
} from '../api/voucherApi'
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
interface VoucherManagementProps {
  useGetDashboardMutation: any
  role: UserRole
}
export const VoucherManagement = ({
  useGetDashboardMutation,
  role
}: VoucherManagementProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null
  const [filters, setFilters] = useState<{ search?: string }>({})
  const [listDashboard, { data, isLoading }] = useGetDashboardMutation()
  useEffect(() => {
    listDashboard({
      pageNumber: page,
      pageSize: 10,
      voucherCode: search || null,
      ...defaultFilters,
      ...filters
    })
  }, [listDashboard, page, search, filters])
  const paginationData = {
    totalAmount: data?.data?.totalAmount || 0,
    totalPage: data?.data?.totalPage || 0,
    pageNumber: data?.data?.pageNumber || 0,
    pageSize: data?.data?.pageSize || 0
  }

  // Dữ liệu bảng
  const dataTable =
    data?.data?.data.map((item: Voucher) => ({
      id: item.id,
      voucherCode: item.voucherCode,
      title: item.title,
      type: item.type,
      discountType: item.discountType,
      discountValue: item.discountValue,
      maxDiscountValue: item.maxDiscountValue,
      shippingDiscount : item.shippingDiscount,
      maxShippingDiscount: item.maxShippingDiscount,
      minTotalOrder: item.minTotalOrder,
      startedAt: item.startedAt,
      expiredAt: item.expiredAt,
      status: item.status
    })) || []
    console.log(dataTable)
  if (error) {
    console.error('Error:', error)
  }

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

  const refreshDashboard = async () => {
    await listDashboard({
      pageNumber: page,
      pageSize: 10,
      voucherCode: search || null,
      ...filters
    })
  }

  const handleCreateVoucher = async (formData: VoucherCreateRequest) => {
    try {
      await createVoucher(formData).unwrap()
      setFormOpen(false)
      setError(null)
      await refreshDashboard()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create voucher')
    }
  }

  const handleStatusChange = async (voucherCode: string, status: VoucherStatus) => {
    try {
      const formData = new FormData();
      formData.append('voucher_code', voucherCode);
      formData.append('status', status);

      await changeStatus({ voucherCode, status }).unwrap()
      await refreshDashboard()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change status')
    }
  }

  const handleUpdateVoucher = async (data: VoucherUpdateRequest) => {
    try {
      await updateVoucher(data).unwrap()
      setFormOpen(false)
      setError(null)
      await refreshDashboard()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update voucher')
    }
  }

  console.log(user)

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
        vouchers={dataTable}
        onStatusChange={handleStatusChange}
        role={role}
        page={paginationData.pageNumber}
        totalPages={paginationData.totalPage}
        onPageChange={setPage}
        onEdit={(voucher: Voucher) => handleUpdateVoucher({
          voucherCode: voucher.voucherCode,
          title: voucher.title,
          type: voucher.type,
          discountType: voucher.discountType,
          discountValue: voucher.discountValue || 0,
          maxDiscountValue: voucher.maxDiscountValue,
          shippingDiscount: voucher.shippingDiscount,
          maxShippingDiscount: voucher.maxShippingDiscount,
          minTotalOrder: voucher.minTotalOrder,
          startedAt: voucher.startedAt,
          expiredAt: voucher.expiredAt,
          voucherCount: 0,
          remainingCount: 0
        })}
        onDelete={(voucher) => console.log('Delete voucher', voucher)}
      />

      <VoucherForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateVoucher}
      />
    </Box>
  )
}
