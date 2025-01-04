import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Dialog,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Pagination,
  Stack,
  CircularProgress,
  InputAdornment,
  Checkbox,
  SelectChangeEvent,
  DialogTitle,
  Grid,
  DialogContent,
  CardContent,
  Card,
  DialogActions,
  Avatar
} from '@mui/material'
import { ImageAspectRatio, Search as SearchIcon } from '@mui/icons-material'
import { useOrders } from '../hooks/useOrders'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  SortableTableHead,
  type Order as SortOrder
} from '../components/SortableTableHead'
import { ExportButton } from '../components/ExportButton'
import { AdvancedFilters } from '../components/AdvancedFilters'
import { BulkActions } from '../components/BulkActions'
import { OrdersAnalytics } from '../components/OrdersAnalytics'
import { ViewIcon } from 'lucide-react'
import { Order } from '../types/order'
import { useGetShopOrderDetailQuery, useGetShopOrderListsMutation, useLazyGetShopOrderDetailQuery, useShopUpdateOrderByIDMutation } from '@features/Order/api/orderShopApi'
import { getOrderStatusColor } from '@features/Order/helper/orderHelper'
import { OrderDetail, OrderListItem } from '@features/Order/types/order.interface'
import { OrderStatus } from '~/features/Order/types/order.enum'
import { toast } from 'react-toastify'

interface FilterValues {
  search: string
  status: string
  startDate: Date | null
  endDate: Date | null
  minAmount: number
  maxAmount: number
}

const ShopOrders = (): JSX.Element => {
  // State for filters and pagination
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null)
  const [order, setOrder] = useState<SortOrder>('desc')
  const [orderBy, setOrderBy] = useState('date')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [advancedFilters, setAdvancedFilters] = useState<FilterValues>({
    search: '',
    status: '',
    startDate: null,
    endDate: null,
    minAmount: 0,
    maxAmount: 10000
  })

  // RTK Query hooks
  const { orders, totalPages, isLoading, error } = useOrders({
    page,
    limit: 10,
    search,
    status,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString()
  })
  const [getOrderShopLists, { data: ordersData }] = useGetShopOrderListsMutation()
  useEffect(() => {
    getOrderShopLists({
      orderCode: null,
      orderStatus: null,
      userFullName: null,
      phoneNumber: null,
      address: null,
      sort: null,
      startDate: '2024-12-15T00:20:12',
      endDate: null,
      pageNumber: 1,
      pageSize: 20
    })
  }, [getOrderShopLists])
  console.log(ordersData)
  const ordersDataApi = ordersData?.data?.data || []

  // Handlers
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value)
    setPage(1) // Reset to first page when searching
  }

  const handleStatusFilter = (event: SelectChangeEvent<string>): void => {
    setStatus(event.target.value)
    setPage(1)
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value)
  }

  const [updateOrderStatus] =
    useShopUpdateOrderByIDMutation()

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedOrder) return

    try {
      const response = await updateOrderStatus({
        orderId: selectedOrder.orderShopCode,
        data: newStatus
      }).unwrap()
      toast.success('Cập nhật trạng thái đơn hàng thành công')
      setSelectedOrder((prev) => prev ? ({
        ...prev,
        orderStatus: newStatus as OrderStatus
      }) : null)
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error)
    }
  }


  const handleRequestSort = (property: string): void => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAll = (checked: boolean): void => {
    setSelectedOrders(checked ? (orders.map((order) => order.id) ?? []) : [])
  }

  const handleSelectOne = (orderId: string, checked: boolean): void => {
    setSelectedOrders((prev) =>
      checked ? [...prev, orderId] : prev.filter((id) => id !== orderId)
    )
  }

  const handleBulkStatusUpdate = async (
    orderIds: string[],
    newStatus: string
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Update local state logic here
    setSelectedOrders((prev) =>
      prev.map((id) => (orderIds.includes(id) ? newStatus : id))
    )
  }

  const [trigger, { data: orderDetail }] =
    useLazyGetShopOrderDetailQuery()

  const handleView = (order: OrderListItem): void => {
    trigger({ orderId: order.orderShopCode })
      .unwrap()
      .then((data) => {
        setSelectedOrder(data.data)
        setDialogOpen(true)
      })
      .catch((error) => {
        console.error('Failed to fetch order details:', error)
      })
  }

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  // Define table headers
  const headCells = [
    { id: 'checkbox', label: '', sortable: true, align: undefined },
    { id: 'id', label: 'Order ID', sortable: true, align: undefined },
    { id: 'customerName', label: 'Customer', sortable: true, align: undefined },
    { id: 'date', label: 'Date', sortable: true, align: undefined },
    { id: 'status', label: 'Status', sortable: true, align: undefined },
    { id: 'total', label: 'Total', sortable: true, align: 'right' as 'right' },
    { id: 'actions', label: 'Actions', sortable: false, align: undefined }
  ]

  // Loading state
  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='400px'
      >
        <CircularProgress />
      </Box>
    )
  }

  // Error state
  if (error) {
    return (
      <Alert severity='error' sx={{ mt: 2 }}>
        Error loading orders. Please try again later.
      </Alert>
    )
  }

  return (
    <Box>
      {orders && <OrdersAnalytics orders={orders} />}

      <AdvancedFilters
        filters={advancedFilters}
        onFilterChange={setAdvancedFilters}
      />

      {/* Filters */}
      <Stack spacing={2} direction='row' sx={{ mb: 3 }}>
        <TextField
          placeholder='Search orders...'
          value={search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusFilter} label='Status'>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='processing'>Processing</MenuItem>
            <MenuItem value='shipped'>Shipped</MenuItem>
            <MenuItem value='delivered'>Delivered</MenuItem>
            <MenuItem value='cancelled'>Cancelled</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <div className='datepicker'>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              placeholderText='Select date range'
              dateFormat='yyyy-MM-dd'
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
              customInput={
                <TextField label='Date Range' size='small' fullWidth />
              }
            />
          </div>
        </Box>
        <ExportButton orders={orders ?? []} selectedOrders={selectedOrders} />
      </Stack>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <SortableTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            <BulkActions
              selectedOrders={selectedOrders}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              orders={orders ?? []}
              allSelected={
                orders.length === selectedOrders.length && orders.length > 0
              }
            />
            {ordersDataApi.map((order) => (
              <TableRow key={order.id}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedOrders.includes(order.id.toString())}
                    onChange={(e) =>
                      handleSelectOne(order.id.toString(), e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={order.shopLogo}
                      alt={order.shopLogo}
                      sx={{ width: 32, height: 32 }}
                    />
                    {order.orderShopCode}
                  </div>
                </TableCell>
                <TableCell>{order.clientInfo}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>
                  <Chip
                    label={order.orderStatus}
                    style={{
                      backgroundColor: getOrderStatusColor(order.orderStatus)
                    }}
                  />
                </TableCell>
                <TableCell>${order.shopTotalAmount}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<ViewIcon />}
                    size='small'
                    onClick={() => handleView(order)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages ?? 1}
          page={page}
          onChange={handlePageChange}
          color='primary'
        />
      </Box>

      {/* Order Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {/* {selectedOrder && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant='h6'>Order Information</Typography>
                    <Typography>Order ID: {selectedOrder.id}</Typography>
                    <Typography>
                      Customer: {selectedOrder.clientInfo}
                    </Typography>
                    <Typography>Date: {selectedOrder.createdAt}</Typography>
                    <Typography>
                      Phương thức: {selectedOrder.paymentMethod}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <FormControl fullWidth size='small'>
                        <InputLabel>Update Status</InputLabel>
                        <Select
                          value={selectedOrder.orderStatus}
                          label='Update Status'
                          onChange={(e) => handleUpdateStatus(e.target.value)}
                        >
                          <MenuItem value='Processing'>Processing</MenuItem>
                          <MenuItem value='Shipped'>Shipped</MenuItem>
                          <MenuItem value='Delivered'>Delivered</MenuItem>
                          <MenuItem value='Cancelled'>Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant='h6'>Order Items</Typography>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={2}>
                            <strong>Total</strong>
                          </TableCell>
                          <TableCell>
                            <strong>${selectedOrder.total}</strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )} */}
          {selectedOrder && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Thông tin đơn hàng */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Thông tin đơn hàng
                    </Typography>
                    <Typography>
                      Mã đơn hàng: {selectedOrder.orderShopCode}
                    </Typography>
                    <Typography>
                      Trạng thái: {selectedOrder.orderStatus}
                    </Typography>
                    <Typography>Ngày tạo: {selectedOrder.createdAt}</Typography>
                    <Typography>
                      Phương thức thanh toán: {selectedOrder.paymentMethod}
                    </Typography>
                    <Typography>
                      Phí vận chuyển: {selectedOrder.shopShippingFee}₫
                    </Typography>
                    <Typography>
                      Chiết khấu: {selectedOrder.shopDiscount}₫
                    </Typography>
                    <Typography>
                      Phí dịch vụ: {selectedOrder.serviceFee}₫
                    </Typography>
                    <Typography>
                      Tổng tiền: {selectedOrder.shopTotalAmount}₫
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <FormControl fullWidth size='small'>
                        <InputLabel>Cập nhật trạng thái</InputLabel>
                        <Select
                          value={selectedOrder.orderStatus}
                          label='Cập nhật trạng thái'
                          onChange={(e) => handleUpdateStatus(e.target.value)}
                        >
                          <MenuItem value='CHO_XAC_NHAN'>Chờ xác nhận</MenuItem>
                          <MenuItem value='DANG_LAY_HANG'>
                            Đang lấy hàng
                          </MenuItem>
                          <MenuItem value='DANG_GIAO_HANG'>
                            Đang giao hàng
                          </MenuItem>
                          <MenuItem value='GH_THANH_CONG'>
                            Giao hàng thành công
                          </MenuItem>
                          <MenuItem value='DA_HUY'>Đã hủy</MenuItem>
                          <MenuItem value='TRA_HANG'>Trả hàng</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Thông tin giao hàng */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Thông tin giao hàng
                    </Typography>
                    <Typography>
                      Tên khách hàng: {selectedOrder.shippingDto.clientName}
                    </Typography>
                    <Typography>
                      Địa chỉ: {selectedOrder.shippingDto.clientAddress}
                    </Typography>
                    <Typography>
                      Số điện thoại: {selectedOrder.shippingDto.clientTelephone}
                    </Typography>
                    <Typography>
                      Nhà vận chuyển: {selectedOrder.shippingDto.carrier}
                    </Typography>
                    <Typography>
                      Trạng thái: {selectedOrder.shippingDto.status}
                    </Typography>
                    <Typography>
                      Ngày giao hàng dự kiến:{' '}
                      {new Date(
                        selectedOrder.shippingDto.deliveryDate
                      ).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Danh sách sản phẩm */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Danh sách sản phẩm
                    </Typography>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Sản phẩm</TableCell>
                          <TableCell>Số lượng</TableCell>
                          <TableCell>Giá</TableCell>
                          <TableCell>Tổng cộng</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.itemDtoList.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <img
                                src={
                                  JSON.parse(item.productImage)[0]
                                
                                }
                                alt={item.productTitle}
                                width={50}
                                height={50}
                                

                              />
                            </TableCell>
                            <TableCell>{item.productTitle}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              {item.price.toLocaleString()}₫
                            </TableCell>
                            <TableCell>
                              {(item.quantity * item.price).toLocaleString()}₫
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3}>
                            <strong>Tổng tiền</strong>
                          </TableCell>
                          <TableCell>
                            <strong>
                              {selectedOrder.ecommerceTotalAmount.toLocaleString()}
                              ₫
                            </strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>

              {/* Lịch sử đơn hàng */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Lịch sử đơn hàng
                    </Typography>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Sự kiện</TableCell>
                          <TableCell>Mô tả</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.historyDtoList.map((history, index) => (
                          <TableRow key={index}>
                            <TableCell>{history.event}</TableCell>
                            <TableCell>{history.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ShopOrders
