import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import { OrderTableProps } from '../../types/order.interface';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '@shared/components/Pagination/PaginationComponent';

const OrderTableShop = ({ data, isLoading, onPageChange, pagination }: OrderTableProps): JSX.Element => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderCode}</TableCell>
                <TableCell>{order.clientInfo}</TableCell>
                <TableCell>{order.totalAmount.toLocaleString()}đ</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/owner/orders/${order.id}`)}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPages}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default OrderTableShop; 