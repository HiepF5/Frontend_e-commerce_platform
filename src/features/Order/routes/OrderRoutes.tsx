import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import OrderTracking from '../components/OrderTracking'
import LayoutUser from '@features/User/components/LayoutUser'
import path from 'path'

const OrderRoutes = (): JSX.Element => {
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
              path: 'tracking',
              element: <OrderTracking />
            },
            {
              path: 'history',
              element: <OrderTracking />
            },
            {
              path: 'detail',
              element: <OrderTracking/>
            },
            {
              path: 'cancel',
              element: <OrderTracking />
            },
            {
              path: 'list-order',
              element: <OrderTracking />
            }
          ]
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default OrderRoutes
