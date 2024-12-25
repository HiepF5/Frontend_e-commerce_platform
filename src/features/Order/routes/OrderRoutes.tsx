import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import OrderTracking from '../components/OrderTracking'

const OrderRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '',
          element: <OrderTracking />
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default OrderRoutes
