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
    {
      path: 'signup',
      element: (
        <AuthLayout layoutQuery={'xs'}>
          <SignUp />
        </AuthLayout>
      )
    },
    {
      path: 'createpassword',
      element: (
        <AuthLayout layoutQuery={'xs'}>
          <CreatePassword />
        </AuthLayout>
      )
    },
    {
      path: 'checkemail',
      element: (
        <AuthLayout layoutQuery={'xs'}>
          <CheckEmail />
        </AuthLayout>
      )
    },
    {
      path: 'repassword',
      element: (
        <AuthLayout layoutQuery={'xs'}>
          <RePassword />
        </AuthLayout>
      )
    },
    {
      path: 'verification',
      element: (
        <AuthLayout layoutQuery={'xs'}>
          <Verification />
        </AuthLayout>
      )
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading Auth...</div>}>{element}</Suspense>
}

export default AuthRoutes
