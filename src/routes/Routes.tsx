import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import AuthenticatedGuard from '../guards/AuthenticatedGuard'
import LandingPage from '../features/LandingPage/pages/LandingPage'
// eslint-disable-next-line @typescript-eslint/promise-function-async
const AdminRoutes = lazy(() => import('../features/Admin/routes/AdminRoutes'))
const AuthRoutes = lazy(() => import('../features/Authentication/routes/AuthRoutes'))
const UserRoutes = lazy(() => import('../features/User/routes/UserRoutes'))
const ProductRoutes = lazy(() => import('../features/Products/routes/ProductRoutes'))
const ShopRoutes = lazy(() => import('../features/Shop/routes/ShopRoutes'))
const ChatRoutes = lazy(() => import('../features/Messenger/routes/ChatRoutes'))
const CartRoutes = lazy(() => import('../features/Cart/routes/CartRoutes'))

const MainRoutes = (): JSX.Element => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/products/*' element={<ProductRoutes />} />
          <Route path='/shop/*' element={<ShopRoutes />} />
          <Route path='/user/*' element={<UserRoutes />} />
          <Route path='/messenger/*' element={<ChatRoutes />} />
          <Route path='/cart/*' element={<CartRoutes />} />
          <Route element={<AuthenticatedGuard />}>
            <Route path='/admin/*' element={<AdminRoutes />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default MainRoutes
