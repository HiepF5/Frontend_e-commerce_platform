import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPermission } from '@guards/AuthPermission'
import RootLayout from '../layouts/RootLayout'

const RootPage = lazy(() => import('../pages/RootPage'))
const CreateRootPage = lazy(() => import('../pages/CreateRootPage'))

const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/create" element={<CreateRootPage />} />
      <Route
        element={
          <AuthPermission allowedRoles={['ROOT']}>
            <RootLayout />
          </AuthPermission>
        }
      >
        <Route index element={<RootPage />} />
      </Route>
    </Routes>
  )
}

export default RootRoutes 