import UserInfo from '../components/UserInfo'
import ChangeInfoDialog from '../components/ChangeInfoDialog'
import { useEffect, useState } from 'react'
import { IChangeInfoRequest } from '~/types/users.interface'
import { changeAvatar, changeInfo, getInfo } from '../slices/UserSlice'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { toast } from 'react-toastify'

const UserInfoPage = () => {
  const dispatch = useAppDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    dispatch(getInfo({ email: user.email }))
    // dispatch(setInfoUserLocalstorage())
  }, [dispatch, shouldUpdate])
  const handleDialogOpen = () => {
    setDialogOpen(true)
  }
  
  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  const { user: userInfo } = useAppSelector((state) => state.user)

  const handleSave = async (updatedInfo: IChangeInfoRequest) => {
    try {
      const resultAction = await dispatch(changeInfo({ ...updatedInfo }))
      if (changeInfo.fulfilled.match(resultAction)) {
        setShouldUpdate((prev) => !prev)
        toast.success('User info changed successfully')
      } else if (changeInfo.rejected.match(resultAction)) {
        toast.error(
          typeof resultAction.payload === 'string'
            ? resultAction.payload
            : 'Failed to update user info'
        ) 
      }
    } catch (error) {
      toast.error('An error occurred') 
    }
  }
const handleAvatarChange = async (file: File) => {
  if (!userInfo) {
    toast.error('User info is not available')
    return
  }
  try {
    const resultAction = await dispatch(changeAvatar({ email: userInfo.email, file }))
    if (changeAvatar.fulfilled.match(resultAction)) {
      setShouldUpdate((prev) => !prev)
      // toast.success('User avt changed successfully')
    } else if (changeAvatar.rejected.match(resultAction)) {
      toast.error(
        typeof resultAction.payload === 'string'
          ? resultAction.payload
          : 'Failed to update user avt'
      )
    }
  } catch (error) {
    toast.error('An error occurred')
  }
}
  return (
    <div className='h-full'>
      {userInfo && (
        <UserInfo
          setDialogOpen={setDialogOpen}
          shouldUpdate={shouldUpdate}
          userInfo={userInfo}
          onDialogOpen={handleDialogOpen}
          onChangeAvatar={handleAvatarChange}
        />
      )}
      {userInfo && (
        <ChangeInfoDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          userInfo={userInfo}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default UserInfoPage