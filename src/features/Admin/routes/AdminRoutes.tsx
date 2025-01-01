import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const UserManagement = lazy(() => import('../pages/UserManagement'))
const ProductManagement = lazy(() => import('../pages/ProductManagement'))
const OrderManagement = lazy(() => import('../pages/OrderManagement'))
import AdminVoucherPage from '@features/Voucher/pages/admin/AdminVoucherPage'
import AdminOrderPage from '@features/Order/page/admin/AdminOrderPage'
import OrderAdminDetail from '@features/Order/components/admin/OrderAdminDetail'

const AdminRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='users' element={<UserManagement />} />
        <Route path='products' element={<ProductManagement />} />
        <Route path='orders' element={<OrderManagement />} />
        <Route path='vouchers' element={<AdminVoucherPage />} />
        <Route path='orders-manager' element={<AdminOrderPage />} />
        <Route path='orders-manager/:path' element={<AdminOrderPage />} />
        <Route
          path='orders-manager/detail/:orderId'
          element={<OrderAdminDetail />}
        />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
