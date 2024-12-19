import { VoucherManagement } from '../../components/VoucherManagement'
import { useListOwnerDashboardMutation } from '../../api/voucherApi'

const OwnerVoucherPage = (): JSX.Element => {
  return (
    <VoucherManagement
      useGetDashboardMutation={useListOwnerDashboardMutation}
      role='CHUCUAHANG'
    />
  )
}

export default OwnerVoucherPage 