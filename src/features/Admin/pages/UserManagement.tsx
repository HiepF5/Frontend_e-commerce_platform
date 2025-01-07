import { useState, useEffect, useCallback } from 'react'
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
  TextField,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { Edit as EditIcon, Block as BlockIcon, AdminPanelSettings as AdminIcon } from '@mui/icons-material'
import { useGetUsersMutation, useChangeAdminRoleMutation } from '../api/userApi'
import PaginationComponent from '@shared/components/Pagination/PaginationComponent'
import { IUser } from '~/types/users.interface'
import { debounce } from 'lodash'
import { toast } from 'react-toastify'

const UserManagement = () => {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    active: null,
    userCode: '',
    email: '',
    telephone: ''
  })
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const [getUsers, { data: response, isLoading }] = useGetUsersMutation()
  const [changeAdminRole, { isLoading: isChangingRole }] = useChangeAdminRoleMutation()

  const debouncedFetch = useCallback(
    debounce((filters) => {
      getUsers({
        ...filters,
        userCode: filters.userCode || null,
        email: filters.email || null,
        telephone: filters.telephone || null,
        pageNumber: page,
        pageSize: 20
      })
    }, 500),
    [getUsers, page]
  )

  useEffect(() => {
    debouncedFetch(filters)
    return () => {
      debouncedFetch.cancel()
    }
  }, [filters, page, debouncedFetch])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
    setPage(1)
  }

  const handleChangeAdminRole = async (user: IUser) => {
    setSelectedUser(user)
    setOpenDialog(true)
  }

  const handleConfirmChangeRole = async () => {
    if (!selectedUser) return

    try {
      const isManager = selectedUser.list_role.includes('QUANLY')
      await changeAdminRole({
        user_code: selectedUser.user_code,
        is_admin: !isManager
      }).unwrap()

      toast.success(`Đã ${isManager ? 'gỡ' : 'thêm'} quyền quản lý`)
      debouncedFetch(filters)
    } catch (error) {
      toast.error('Lỗi khi thay đổi quyền quản lý')
    } finally {
      setOpenDialog(false)
      setSelectedUser(null)
    }
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Quản lý người dùng
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="Mã người dùng"
          size="small"
          value={filters.userCode}
          onChange={(e) => handleFilterChange('userCode', e.target.value)}
        />
        <TextField
          label="Email"
          size="small"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
        <TextField
          label="Số điện thoại"
          size="small"
          value={filters.telephone}
          onChange={(e) => handleFilterChange('telephone', e.target.value)}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã người dùng</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response?.data.data.map((user: IUser) => (
              <TableRow key={user.user_code}>
                <TableCell>{user.user_code}</TableCell>
                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  {user.list_role.map((role) => (
                    <Chip
                      key={role}
                      label={role}
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.active ? 'Hoạt động' : 'Khóa'}
                    color={user.active ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                    >
                      Sửa
                    </Button>
                    <Button
                      startIcon={<BlockIcon />}
                      size="small"
                      color={user.active ? 'error' : 'primary'}
                    >
                      {user.active ? 'Khóa' : 'Mở khóa'}
                    </Button>
                    <Button
                      startIcon={<AdminIcon />}
                      size="small"
                      color="warning"
                      onClick={() => handleChangeAdminRole(user)}
                    >
                      {user.list_role.includes('QUANLY') 
                        ? 'Gỡ Quản lý' 
                        : 'Thêm Quản lý'}
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Xác nhận thay đổi quyền</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedUser?.list_role.includes('QUANLY')
              ? `Bạn có chắc muốn gỡ quyền quản lý của người dùng ${selectedUser?.first_name} ${selectedUser?.last_name}?`
              : `Bạn có chắc muốn thêm quyền quản lý cho người dùng ${selectedUser?.first_name} ${selectedUser?.last_name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            disabled={isChangingRole}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleConfirmChangeRole}
            variant="contained"
            color="primary"
            disabled={isChangingRole}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent="center" mt={2}>
        <PaginationComponent
          currentPage={page}
          totalPage={response?.data.totalPage || 1}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}

export default UserManagement 