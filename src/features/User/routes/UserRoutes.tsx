import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import UserInfo from '../components/UserInfo'
import LayoutPage from '@layouts/LayoutPage'

const UserRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage/>,
      children: [
      {
        path: 'profile',
        element: <UserInfo />
      },
      
    ]
    },
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading Auth...</div>}>{element}</Suspense>
}

export default UserRoutes
