import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ShopAdminLayout from '../layouts/ShopAdminLayout'
import OwnerVoucherPage from '@features/Voucher/pages/owner/OwnerVoucherPage'

const ShopDashboard = lazy(() => import('../pages/ShopDashboard'))
const ShopProducts = lazy(() => import('../pages/ShopProducts'))
const ShopOrders = lazy(() => import('../pages/ShopOrders'))
const ShopAnalytics = lazy(() => import('../pages/ShopAnalytics'))

const ShopAdminRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<ShopAdminLayout />}>
        <Route index element={<ShopDashboard />} />
        <Route path='products' element={<ShopProducts />} />
        <Route path='orders' element={<ShopOrders />} />
        <Route path='analytics' element={<ShopAnalytics />} />
        <Route path='vouchers' element={<OwnerVoucherPage />} />
      </Route>
    </Routes>
  )
}

export default ShopAdminRoutes
