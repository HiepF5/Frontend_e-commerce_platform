import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { AuthLayout } from '@layouts/auth/LayoutAuth'
const SignIn = lazy(() => import('../page/SignIn'))
const SignUp = lazy(() => import('../page/SignUp'))
const Verification = lazy(() => import('../page/Verification'))
const CheckEmail = lazy(() => import('../page/CheckEmail'))
const RePassword = lazy(() => import('../page/RePassword'))
const CreatePassword = lazy(() => import('../page/CreatePassword'))

const AuthRoutes = (): JSX.Element => {
  const routes = [
    {
      path: 'signin',
      element: (
        <AuthLayout layoutQuery={'xs'}>
          <SignIn />
        </AuthLayout>
      )
    },
    { path: 'signup', element: <SignUp /> },
    { path: 'register', element: <CreatePassword /> },
    { path: 'checkemail', element: <CheckEmail /> },
    { path: 'repassword', element: <RePassword /> },
    { path: 'verification', element: <Verification /> }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading Auth...</div>}>{element}</Suspense>
}

export default AuthRoutes
