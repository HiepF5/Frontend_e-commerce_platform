import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import OrderTracking from '../components/OrderTracking'
import LayoutUser from '@features/User/components/LayoutUser'
import OrderList from '../components/OrderList'
import OrderDetail from '../components/OrderDetail'

import OrderHistory from '../components/OrderHistory'
import OrderStatus from '../components/OrderStatus'
import OrderReceipt from '../components/OrderReceipt'

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
              element: <OrderList status={''} />
            },
            {
              path: 'pending',
              element: <OrderList status={'CHO_XAC_NHAN'} />
            },
            {
              path: 'processing',
              element: <OrderList status={'DANG_LAY_HANG'} />
            },
            {
              path: 'shipping',
              element: <OrderList status={'DANG_GIAO_HANG'} />
            },
            {
              path: 'completed',
              element: <OrderList status={'GH_THANH_CONG'} />
            },
            {
              path: 'cancelled',
              element: <OrderList status={'DA_HUY'} />
            },
            {
              path: 'return',
              element: <OrderList status={'TRA_HANG'} />
            },
            {
              path: 'order-receipt/:orderId',
              element: <OrderReceipt />
            },
            {
              path: 'tracking/:orderId',
              element: <OrderTracking />
            },
            {
              path: 'detail/:orderId',
              element: <OrderDetail />
            },
            // {
            //   path: 'cancel/:orderId',
            //   element: <OrderCancel />
            // },
            {
              path: 'history',
              element: <OrderHistory />
            },
            {
              path: 'detail-status/:status',
              element: <OrderStatus />
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
