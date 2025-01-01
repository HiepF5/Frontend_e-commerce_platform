import { useState, useEffect } from 'react';
import { OrderShopRequest, OrderListItem } from '../../types/order.interface';
import { OrderListManagerProps } from '../../types/order.interface';
import OrderTableShop from './OrderTableShop';
import { Box, Tab, Tabs } from '@mui/material';
import { ORDER_STATUS } from '../../types/order.enum';

const OrderListShopManager = ({ useGetDashboardMutation, status }: OrderListManagerProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [getOrders, { data: orderData, isLoading }] = useGetDashboardMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const params: OrderShopRequest = {
        page: currentPage,
        limit: 10,
        status: selectedStatus
      };
      await getOrders(params);
    };
    fetchOrders();
  }, [currentPage, selectedStatus, getOrders]);

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Tabs
        value={selectedStatus}
        onChange={handleStatusChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="order status tabs"
      >
        <Tab label="Tất cả" value="" />
        <Tab label="Chờ xác nhận" value={ORDER_STATUS.PENDING} />
        <Tab label="Đã xác nhận" value={ORDER_STATUS.CONFIRMED} />
        <Tab label="Đang giao" value={ORDER_STATUS.DELIVERING} />
        <Tab label="Hoàn thành" value={ORDER_STATUS.COMPLETED} />
        <Tab label="Đã hủy" value={ORDER_STATUS.CANCELLED} />
      </Tabs>

      <OrderTableShop
        data={orderData?.data?.items || []}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        pagination={{
          currentPage: currentPage,
          totalPages: orderData?.data?.totalPages || 1,
          totalItems: orderData?.data?.totalItems || 0
        }}
      />
    </Box>
  );
};

export default OrderListShopManager; 