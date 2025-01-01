import { useParams } from "react-router-dom";
import { useGetAdminOrderListsMutation } from "../../api/orderShopApi"
import OrderListManager from "../../components/admin/OrderListManager"
import { statusMapping } from "../../helper/orderHelper";




const AdminOrderPage = (): JSX.Element => {
  const { path } = useParams()
  const status = path ? statusMapping[path] : undefined
  return (
    <OrderListManager
      useGetDashboardMutation={useGetAdminOrderListsMutation}
      status={status ?? ""}
    />
  )
}

export default AdminOrderPage 