import { Suspense, useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
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
   const location = useLocation()

   useEffect(() => {
     // Cuộn về đầu trang mỗi khi điều hướng đến một route mới
     window.scrollTo(0, 0)
   }, [location])

  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default ProductRoutes
