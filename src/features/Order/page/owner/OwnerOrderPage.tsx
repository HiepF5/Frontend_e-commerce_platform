import { useGetShopOrderListsMutation } from "../../api/orderShopApi"
import OrderListShopManager from '../../components/shop/OrderListShopManager'


const OwnerOrderPage = (): JSX.Element => {
  return (
    <OrderListShopManager
      useGetDashboardMutation={useGetShopOrderListsMutation}
      status=''
    />
  )
}

export default OwnerOrderPage 