import { useGetAdminDashboardMutation } from '../../api/voucherApi'
import { VoucherManagement } from '../../components/VoucherManagement'

const AdminVoucherPage = (): JSX.Element => {
  return (
    <VoucherManagement
      useGetDashboardMutation={useGetAdminDashboardMutation}
      role='QUANLY'
    />
  )
}

export default AdminVoucherPage 