import { useState, useEffect } from 'react'
import { OrderAdminRequest, OrderListItem } from '../../types/order.interface'
import { OrderListManagerProps } from '../../types/order.interface'
import OrderTable from './OrderTable'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import usePagination from '@hooks/usePagination'
import OrderExport from '../OrderExport'
import OrderStats from '../OrderStats'
const tabPaths = [
  '', // Tất cả
  'pending', // Chờ xác nhận
  'processing', // Đang lấy hàng
  'completed', // Giao hàng thành công
  'cancelled', // Đã hủy
]
const OrderListManager = ({
  useGetDashboardMutation,
  status
}: OrderListManagerProps): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || ''
  const [tabValue, setTabValue] = useState(tabPaths.indexOf(currentPath))
  const { currentPage, handlePageChange } = usePagination({ initialPage: 1 })
  const [selectedStatus, setSelectedStatus] = useState(status)
  const [getOrders, { data: orderData, isLoading }] = useGetDashboardMutation()
  console.log(orderData)
  useEffect(() => {
    const fetchOrders = async () => {
      const params: OrderAdminRequest = {
        orderCode: null,
        status: status || null,
        sort: null,
        paymentMethod: null,
        isPayment: null,
        startDate: null,
        endDate: null,
        pageNumber: 1,
        pageSize: 20
      }
      await getOrders(params)
    }
    fetchOrders()
  }, [currentPage, selectedStatus, getOrders, status])
  console.log(orderData)
  const transformedOrders = (orderData?.data?.data || []).map((order: any) => ({
    id: order.id,
    orderCode: order.orderCode,
    status: order.status,
    totalFee: order.totalFee,
    totalShipping: order.totalShipping,
    totalDiscount: order.totalDiscount,
    totalAmount: order.totalAmount,
    ecommerceFee: order.ecommerceServiceFee,
    deliveryMethod: order.deliveryMethod,
    clientInfo: order.clientInfo,
    paymentMethod: order.paymentMethod,
    isPayment: order.isPayment,
    createdAt: order.createdAt
  }))
  console.log(transformedOrders)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setTabValue(newValue)
    const path = tabPaths[newValue]
    console.log(path)
    navigate(`/admin/orders-manager/${path}`, { replace: true })
  }
  const tabs = [
    'Tất cả',
    'Chờ thanh toán',
    'Đang xử lí',
    'Hoàn thành',
    'Đã hủy',
  ]
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5'>Đơn hàng của tôi</Typography>
        <OrderExport orders={[]} />
      </Box>

      <OrderStats />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(event, newValue) => handleTabChange(event, newValue)}
          variant='scrollable'
          scrollButtons='auto'
        >
          {tabs.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Box>

      <OrderTable
        data={transformedOrders || []}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        pagination={{
          currentPage: currentPage,
          totalPages: orderData?.data?.totalPage || 1,
          totalItems: orderData?.data?.totalAmount || 0
        }}
      />
    </Box>
  )
}

export default OrderListManager
