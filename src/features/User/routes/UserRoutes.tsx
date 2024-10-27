import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import UserInfoPage from '../page/UserInfoPage'
import LayoutUser from '../components/LayoutUser'
import ChangePasswordPage from '../page/ChangePasswordPage'
import AddressPage from '../page/AddressPage'
import SubcribeShopPage from '../page/SubcribeShopPage'
import ManageShopPage from '../page/ManageShopPage'

const UserRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '/',
          element: <LayoutUser />,
          children: [
            {
              path: 'profile',
              element: <UserInfoPage />
            },
            {
              path: 'bank',
              element: <UserInfoPage />
            },
            {
              path: 'address',
              element: <AddressPage />
            },
            {
              path: 'change-password',
              element: <ChangePasswordPage />
            },
            {
              path: 'subcribe-shop',
              element: <SubcribeShopPage />
            },
            {
              path: 'manage-shop',
              element: <ManageShopPage />
            }
          ]
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading Auth...</div>}>{element}</Suspense>
}

export default UserRoutes
