import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
  Chip,
  Avatar,
  CircularProgress,
} from '@mui/material'
import { formatCurrency } from '@shared/utils/formatPrice'
import { useNavigate } from 'react-router-dom'
import { useGetOrderListsMutation } from '../api/orderShopApi'
import { useEffect } from 'react'
import { IFilters, OrderListItem } from '../types/order.interface'
import { getOrderStatusColor, getOrderStatusText } from '../helper/orderHelper'
import useCreateMessage from '@hooks/useCreateMessage'
import PaginationComponent from '@shared/components/Pagination/PaginationComponent'
import usePagination from '@hooks/usePagination'

interface OrderItemProps {
  searchTerm: string
  activeFilters: IFilters | null
}

export default function OrderItem({
  searchTerm,
  activeFilters
}: OrderItemProps) {
  console.log('render')
  const [getOrderLists, { data, isLoading }] = useGetOrderListsMutation()
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
 const { currentPage, handlePageChange } = usePagination({ initialPage: 1 })


    // useEffect(() => {
    //   // const delayDebounceFn = setTimeout(() => {
    //     getOrderLists({
    //       orderCode: searchTerm || null,
    //       status: (activeFilters?.status as string) || null,
    //       sort: null,
    //       pageNumber: 1,
    //       pageSize: 10
    //     })
    //   // }, 1000) // 1 minute delay

    //   // return () => clearTimeout(delayDebounceFn)
    // }, [getOrderLists, searchTerm, activeFilters])
    useEffect(() => {
      getOrderLists({
        orderCode: searchTerm || null,
        status: (activeFilters?.status as string) || null,
        sort: null,
        pageNumber: currentPage, // sử dụng pageNumber từ state
        pageSize: 10
      })
    }, [getOrderLists, searchTerm, activeFilters, currentPage])

  const dataOrder =
    data?.data?.data.map((item: OrderListItem) => ({
      ...item
    })) || []

  const { handleChatClick } = useCreateMessage()

  if (isLoading || !data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {dataOrder.map((data, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            p: 1,
            radius: 1,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 2,
              backgroundColor: '#f5f5f5'
            },
            backgroundColor: getOrderStatusColor(data.orderStatus)
          }}
          onClick={() => navigate(`/order/detail/${data.orderShopCode}`)}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={data.shopLogo}
                alt={data.shopName}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {data.shopName}
              </Typography>
            </Box>
            <Chip
              label={getOrderStatusText(data.orderStatus)}
              color={
                getOrderStatusColor(data.orderStatus) as
                  | 'error'
                  | 'default'
                  | 'warning'
                  | 'primary'
                  | 'success'
                  | 'info'
                  | 'secondary'
              }
              sx={{ fontWeight: 'bold' }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Order details */}
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary'>
                  Mã đơn hàng: {data.orderShopCode}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Phương thức thanh toán: {data.paymentMethod}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Phương thức giao hàng: {data.deliveryMethod}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body2' color='text.secondary'>
                  Tổng tiền sản phẩm: {formatCurrency(data.totalProduct)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Phí vận chuyển: {formatCurrency(data.shopShippingFee)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Tổng tiền đơn hàng: {formatCurrency(data.shopTotalAmount)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant='body2' color='text.secondary'>
                Ngày tạo: {data.createdAt}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Thông tin khách hàng: {data.clientInfo}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='outlined'
                onClick={(e) => {
                  e.stopPropagation()
                  handleChatClick(data.shopCode)
                }}
              >
                Liên hệ người bán
              </Button>
              <Button
                variant='contained'
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/order/detail/${data.orderShopCode}`)
                }}
              >
                Xem chi tiết
              </Button>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
      <PaginationComponent
        totalPage={data?.data?.totalPage || 1}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Paper>
  )
}
