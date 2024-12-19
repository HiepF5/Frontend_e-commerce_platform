import { useListAdminDashboardMutation } from '../../api/voucherApi'
import { VoucherManagement } from '../../components/VoucherManagement'

const AdminVoucherPage = (): JSX.Element => {
  return (
    <VoucherManagement
      useListAdminDashboardMutation={useListAdminDashboardMutation}
      role='QUANLY'
    />
  )
}

export default AdminVoucherPage 