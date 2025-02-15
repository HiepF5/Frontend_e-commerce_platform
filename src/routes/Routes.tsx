import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../features/LandingPage/pages/LandingPage'
import { AuthPermission } from '../guards/AuthPermission'
import ErrorPage from '@pages/error-page'

// Lazy load routes
const AdminRoutes = lazy(() => import('../features/Admin/routes/AdminRoutes'))
const AuthRoutes = lazy(
  () => import('../features/Authentication/routes/AuthRoutes')
)
const UserRoutes = lazy(() => import('../features/User/routes/UserRoutes'))
const ProductRoutes = lazy(
  () => import('../features/Products/routes/ProductRoutes')
)
const ShopRoutes = lazy(() => import('../features/Shop/routes/ShopRoutes'))
const ChatRoutes = lazy(
  () => import('../features/MessengerChat/routes/ChatRoutes')
)
const ChatRoutesUser = lazy(
  () => import('../features/Messenger/routes/ChatRoutesUser')
)
const CheckoutRoutes = lazy(
  () => import('../features/Checkout/routes/CheckoutRoutes')
)
const OrderRoutes = lazy(() => import('../features/Order/routes/OrderRoutes'))
const CartRoutes = lazy(() => import('../features/Cart/routes/CartRoutes'))
const ThreadsRoutes = lazy(
  () => import('../features/Threads/routes/ThreadsRoutes')
)
const ShopAdminRoutes = lazy(
  () => import('../features/ShopAdmin/routes/ShopAdminRoutes')
)
const RootRoutes = lazy(() => import('../features/Root/routes/RootRoutes'))

const MainRoutes = (): JSX.Element => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/products/*' element={<ProductRoutes />} />
          <Route path='/shop/*' element={<ShopRoutes />} />

          <Route path='/messenger/*' element={<ChatRoutes />} />
          <Route path='/messenger-user/*' element={<ChatRoutesUser />} />
          <Route path='/threads/*' element={<ThreadsRoutes />} />
          <Route path='/cart/*' element={<CartRoutes />} />
          <Route path='/checkout/*' element={<CheckoutRoutes />} />
          <Route path='/order/*' element={<OrderRoutes />} />
          <Route path='*' element={<ErrorPage />} />
          {/* Protected routes */}
          <Route>
            <Route
              path='/admin/*'
              element={
                <AuthPermission allowedRoles={['QUANLY']}>
                  <AdminRoutes />
                </AuthPermission>
              }
            />
            <Route
              path='/shop-admin/*'
              element={
                <AuthPermission allowedRoles={['CHUCUAHANG']}>
                  <ShopAdminRoutes />
                </AuthPermission>
              }
            />
            <Route
              path='/user/*'
              element={
                <AuthPermission allowedRoles={['KHACHHANG']}>
                  <UserRoutes />
                </AuthPermission>
              }
            />

            <Route
              path='/root/*'
              element={
                <AuthPermission allowedRoles={['ROOT']}>
                  <RootRoutes />
                </AuthPermission>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default MainRoutes
