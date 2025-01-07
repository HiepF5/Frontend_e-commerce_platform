import { useState, useEffect } from 'react';
import { OrderListManagerProps } from '../../types/order.interface';
import OrderTableShop from './OrderTableShop';
import { Box, Tab, Tabs } from '@mui/material';
import { OrderStatus } from '../../types/order.enum';

const OrderListShopManager = ({ useGetDashboardMutation, status }: OrderListManagerProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [getOrders, { data: orderData, isLoading }] = useGetDashboardMutation();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const params = {
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
        <Tab label="Chờ xác nhận" value={OrderStatus.CHO_XAC_NHAN} />
        <Tab label="Đã xác nhận" value={OrderStatus.DANG_GIAO_HANG} />
        <Tab label="Đang giao" value={OrderStatus.DA_HUY} />
        <Tab label="Hoàn thành" value={OrderStatus.GH_THANH_CONG} />
        <Tab label="Đã hủy" value={OrderStatus.DA_HUY} />
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