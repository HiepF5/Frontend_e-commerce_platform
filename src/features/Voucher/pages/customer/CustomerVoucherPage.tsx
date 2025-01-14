import { Box, Typography, Grid } from '@mui/material'
import { useGetGuestSystemVouchersQuery } from '../../api/voucherApi'
import { VoucherCard } from '../../components/VoucherCard'

const CustomerVoucherPage = (): JSX.Element => {
  const { data, isLoading } = useGetGuestSystemVouchersQuery({
    page_number: '1',
    page_size: '10'
  })
  console.log(data)

  if (isLoading) return <div>Loading...</div>

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>My Vouchers</Typography>
      <Grid container spacing={2}>
        {data?.data?.data.map(voucher => (
          <Grid item xs={12} sm={6} md={4} key={voucher.voucherCode}>
            <VoucherCard voucher={voucher} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CustomerVoucherPage 