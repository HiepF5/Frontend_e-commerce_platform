import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
  CircularProgress
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { VoucherTable } from '../components/VoucherTable'
import { VoucherForm } from '../components/VoucherForm'
import { useGetAdminDashboardQuery, useCreateAdminVoucherMutation } from '../api/voucherApi'
import { Voucher, VoucherCreateRequest, VoucherStatus } from '../types/voucher'

export const VoucherManagement = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | undefined>()

  const { data, isLoading } = useGetAdminDashboardQuery({
    pageNumber: page,
    pageSize: 10,
    voucherCode: search || null
  })

  const [createVoucher] = useCreateAdminVoucherMutation()

  const handleCreateVoucher = async (formData: VoucherCreateRequest) => {
    try {
      await createVoucher(formData).unwrap()
      setFormOpen(false)
    } catch (error) {
      console.error('Failed to create voucher:', error)
    }
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Voucher Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedVoucher(undefined)
            setFormOpen(true)
          }}
        >
          Create Voucher
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Voucher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      <VoucherTable
        vouchers={data?.content || []}
        onEdit={(voucher) => {
          setSelectedVoucher(voucher)
          setFormOpen(true)
        } }
        onDelete={(voucherCode) => {
          // Handle delete
          console.log('Delete voucher:', voucherCode)
        } } onStatusChange={function (voucherCode: string, status: VoucherStatus): void {
          throw new Error('Function not implemented.')
        } } role={'ADMIN'} page={0} totalPages={0} onPageChange={function (page: number): void {
          throw new Error('Function not implemented.')
        } }      />

      <VoucherForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateVoucher}
        initialData={selectedVoucher}
      />
    </Box>
  )
} 