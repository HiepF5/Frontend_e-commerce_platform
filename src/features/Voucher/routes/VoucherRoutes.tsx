import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutUser from '@features/User/components/LayoutUser'
import { AuthPermission } from '@guards/AuthPermission'

const CustomerVoucherPage = lazy(() => import('../pages/customer/CustomerVoucherPage'))

const VoucherRoutes = (): JSX.Element => {
  return (
    <Routes>
      {/* <Route path="/vouchers" >
        <Route
          element={
            <AuthPermission allowedRoles={['KHACHHANG']}>
            <CustomerVoucherPage />
             </AuthPermission>
          }
        />
      </Route> */}
    </Routes>
  )
}

export default VoucherRoutes 