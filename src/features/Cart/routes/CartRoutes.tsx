import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import CartPage from '../pages/CartPage'
const CartRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '',
          element: <CartPage />
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default CartRoutes
