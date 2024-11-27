import { Children, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import ProductsList from '../pages/ProductsList'
import ProductDetail from '../pages/ProductDetail'
const ProductRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: 'product-list',
          element: <ProductsList category={''} />
        },
        {
          path: 'product-detail/:productId',
          element: <ProductDetail />
        },
        {
          path: ':category',
          element: <ProductsList category={':category'} />
        }
      ]
    }
  ]

  const element = useRoutes(routes)

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default ProductRoutes
