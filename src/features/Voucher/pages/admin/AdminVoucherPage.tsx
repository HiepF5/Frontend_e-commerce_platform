import { useListAdminDashboardMutation } from '../../api/voucherApi'
import { VoucherManagement } from '../../components/VoucherManagement'

const AdminVoucherPage = (): JSX.Element => {
  return (
    <VoucherManagement
      useGetDashboardMutation={useListAdminDashboardMutation}
      role='QUANLY'
    />
  )
}

export default AdminVoucherPage 