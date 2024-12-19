import { VoucherManagement } from '../../components/VoucherManagement'
import { useGetOwnerDashboardQuery } from '../../api/voucherApi'

const OwnerVoucherPage = (): JSX.Element => {
  return (
    <VoucherManagement
      useGetDashboardMutation={useGetOwnerDashboardQuery}
      role='CHUCUAHANG'
    />
  )
}

export default OwnerVoucherPage 