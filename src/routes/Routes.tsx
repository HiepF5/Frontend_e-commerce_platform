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
const MainRoutes = (): JSX.Element => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/' element={<LandingPage />} />
          <Route element={<AuthenticatedGuard />}>
            <Route path='/admin/*' element={<AdminRoutes />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default MainRoutes
