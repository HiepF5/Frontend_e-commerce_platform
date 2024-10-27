import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material'
import UpdateShopDialog from './UpdateShopDialog'
import { IInfoShop, IShopDetails } from '~/types/shop.interface'
import {
  followShop,
  removeShop,
  restoreShop,
  updateShop
} from '../slices/ShopSlice'
import { useAppDispatch } from '@store/hook'
import { ConfirmDialog } from '@shared/components/DiaglogComfirm/DiaglogComfirm'

export const ManageShop: React.FC<{ data: IShopDetails }> = ({ data }) => {
  const [isUpdateOpen, setUpdateOpen] = useState(false)
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false)
  const [isRestoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [isLockDialogOpen, setLockDialogOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const dispatch = useAppDispatch()

  const handleUpdate = (updatedData: IInfoShop) => {
    dispatch(updateShop(updatedData))
    setUpdateOpen(false)
  }

  const handleRemove = () => {
    console.log('Removing shop...')
    dispatch(removeShop())
    setRemoveDialogOpen(false)
  }

  const handleRestore = () => {
    console.log('Restoring shop...')
    dispatch(restoreShop())
    setRestoreDialogOpen(false)
  }

  const handleLock = () => {
    console.log('Locking/unlocking shop...')
    setLockDialogOpen(false)
  }

  const handleFollowToggle = () => {
    console.log('Toggling follow...')
    dispatch(followShop({ shop_code: data.fullName, is_follow: !isFollowing }))
    setIsFollowing((prev) => !prev)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h4' sx={{ marginBottom: 2 }}>
          Thông tin Shop
        </Typography>

        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={2}>
            <Avatar
              src={data.shopLogo}
              alt={data.shopName}
              sx={{ width: 80, height: 80 }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant='h5'>{data.shopName}</Typography>
            <Typography color='text.secondary'>{data.description}</Typography>
            <Typography color='text.secondary'>
              Loại hình: {data.businessType}
            </Typography>
          </Grid>
        </Grid>

        <Table sx={{ marginTop: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>{data.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hotline</TableCell>
              <TableCell>{data.shopHotLine}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{data.shopEmail}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mã số thuế</TableCell>
              <TableCell>{data.taxCode || 'Chưa cung cấp'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Người tạo</TableCell>
              <TableCell>{data.createdBy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>{data.createdAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* CMND/CCCD Images */}
        <Typography variant='h6' sx={{ marginTop: 2 }}>
          Hình ảnh CMND/CCCD
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Avatar
              variant='rounded'
              src={data.frontIdentityCard}
              alt='Mặt trước'
              sx={{ width: '100%', height: 350 }}
            />
            <Typography align='center'>Mặt trước</Typography>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              variant='rounded'
              src={data.backIdentityCard}
              alt='Mặt sau'
              sx={{ width: '100%', height: 350 }}
            />
            <Typography align='center'>Mặt sau</Typography>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button variant='contained' onClick={() => setUpdateOpen(true)}>
              Cập nhật
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              color='error'
              onClick={() => setRemoveDialogOpen(true)}
            >
              Xóa
            </Button>
          </Grid>
          
          <Grid item>
            <Button
              variant='outlined'
              onClick={() => setRestoreDialogOpen(true)}
            >
              Khôi phục
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              color='warning'
              onClick={() => setLockDialogOpen(true)}
            >
              Khóa/Mở khóa
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color={isFollowing ? 'secondary' : 'primary'}
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'Bỏ theo dõi' : 'Theo dõi'}
            </Button>
          </Grid>
        </Grid>

        {/* Dialog Components */}
        <UpdateShopDialog
          open={isUpdateOpen}
          onClose={() => setUpdateOpen(false)}
          onSave={handleUpdate}
          data={data}
        />
        <ConfirmDialog
          open={isRemoveDialogOpen}
          onClose={() => setRemoveDialogOpen(false)}
          action='xóa'
          title={data.shopName}
          onConfirm={handleRemove}
        />
        <ConfirmDialog
          open={isRestoreDialogOpen}
          onClose={() => setRestoreDialogOpen(false)}
          action='khôi phục'
          title={data.shopName}
          onConfirm={handleRestore}
        />
        <ConfirmDialog
          open={isLockDialogOpen}
          onClose={() => setLockDialogOpen(false)}
          action='khóa/mở khóa'
          title={data.shopName}
          onConfirm={handleLock}
        />
      </CardContent>
    </Card>
  )
}
export default ManageShop
