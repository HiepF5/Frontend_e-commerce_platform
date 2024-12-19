import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPermission } from '~/guards/AuthPermission'

const OwnerVoucherPage = lazy(() => import('../pages/owner/OwnerVoucherPage'))
const CustomerVoucherPage = lazy(() => import('../pages/customer/CustomerVoucherPage'))

const VoucherRoutes = (): JSX.Element => {
  return (
    <Routes>
      
      <Route
        path="/shop-admin/vouchers"
        element={
          // <AuthPermission allowedRoles={['CHUCUAHANG']}>
            <OwnerVoucherPage />
          // </AuthPermission>
        }
      />
      <Route
        path="/vouchers"
        element={
          // <AuthPermission allowedRoles={['KHACHHANG']}>
            <CustomerVoucherPage />
          // </AuthPermission>
        }
      />
    </Routes>
  )
}

export default VoucherRoutes 