import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import CheckoutPage from '../components/CheckoutPage'
import CheckoutStatus from '../components/CheckoutStatus'

const CheckoutRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '',
          element: <CheckoutPage />
        },
        {
          path: 'success',
          element: <CheckoutStatus  />
        },
        {
          path: 'failed',
          element: <CheckoutStatus />
          }
        
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default CheckoutRoutes
