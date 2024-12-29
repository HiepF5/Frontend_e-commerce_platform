import {  Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import ShopHomePage from '../page/ShopHomePage'
import ShopReviews from '../components/ShopReviews'
import AllProducts from '../components/AllProducts'
import SaleShock from '../components/SaleShock'
import BestSeller from '../components/BestSeller'
import HomeCare from '../components/HomeCare'
import HealthCare from '../components/HealthCare'
import ShopListProducts from '../components/ShopListProducts'

const ShopRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: ':shopId',
          element: <ShopHomePage />,
          children: [
            {
              path: '', 
              element: <ShopListProducts />
            },
            {
              path: 'all-products',
              element: <AllProducts />
            },
            {
              path: 'sale-shock', 
              element: <SaleShock />
            },
            {
              path: 'best-seller',
              element: <BestSeller />
            },
            {
              path: 'home-care',
              element: <HomeCare />
            },
            {
              path: 'health-care',
              element: <HealthCare />
            },
            {
              path: 'review-shop',
              element: <ShopReviews />
            }
          ]
        },
        {
          path: 'home',
          element: <ShopHomePage />,
          
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default ShopRoutes
