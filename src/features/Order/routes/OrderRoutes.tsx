import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import OrderTracking from '../components/OrderTracking'
import LayoutUser from '@features/User/components/LayoutUser'
import path from 'path'
import OrderList from '../components/OrderList'
import OrderDetail from '../components/OrderDetail'
import OrderCancel from '../components/OrderCancel'
import OrderHistory from '../components/OrderHistory'

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
              index: true,
              element: <OrderList />
            },
            {
              path: 'pending',
              element: <OrderList />
            },
            {
              path: 'processing',
              element: <OrderList />
            },
            {
              path: 'shipping',
              element: <OrderList />
            },
            {
              path: 'completed',
              element: <OrderList />
            },
            {
              path: 'cancelled',
              element: <OrderList />
            },
            {
              path: 'tracking/:orderId',
              element: <OrderTracking />
            },
            {
              path: 'detail/:orderId',
              element: <OrderDetail />
            },
            {
              path: 'cancel/:orderId',
              element: <OrderCancel />
            },
            {
              path: 'history',
              element: <OrderHistory />
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
