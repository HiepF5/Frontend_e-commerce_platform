import {  Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import ShopHomePage from '../page/ShopHomePage'
import ShopReviews from '../components/ShopReviews'
const ShopRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '/',
          element: <ShopHomePage />,
          children: [
            {
              path: 'review-shop',
              element: <ShopReviews />,           
            },
          ]
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default ShopRoutes
