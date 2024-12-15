import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const UserManagement = lazy(() => import('../pages/UserManagement'))
const ProductManagement = lazy(() => import('../pages/ProductManagement'))
const OrderManagement = lazy(() => import('../pages/OrderManagement'))

const AdminRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
