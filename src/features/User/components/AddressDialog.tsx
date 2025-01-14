import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import AddressList from './AddressList'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { createAddress, deleteAddress, getAddress, updateAddress } from '../slices/AddressSlice'
import NewAddressForm from './NewAddressDialog'
import { IAddressRequest, IAddress, IDeleteAddressRequest } from '~/types/address.interface'

const AddressDialog = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<IAddress | null>(
    null
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAddress())
  }, [dispatch])

  const { address } = useAppSelector((state) => state.address) || {
    address: []
  }

  const handleShowForm = (address: IAddress | null) => {
    setShowForm(true)
    setEditingAddress(address)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingAddress(null) 
  }

  const handleFormSubmit = async (formData: IAddressRequest) => {
    const action = editingAddress ? updateAddress : createAddress
    try {
      await dispatch(action(formData)).unwrap()
      await dispatch(getAddress()).unwrap()
      setShowForm(false)
      setEditingAddress(null)
    } catch (error) {
      console.error('Error updating/creating address:', error)
    }
  }
  const handleRemoveAddress = async (addressId: number) => {
    const deleteRequest: IDeleteAddressRequest = {
      addressId: addressId.toString()
    }
    try {
      await dispatch(deleteAddress(deleteRequest)).unwrap()
      await dispatch(getAddress()).unwrap()
    } catch (error) {
      console.error('Error removing address:', error)
    }
  }

  return (
    <Dialog open={true}>
      <DialogTitle>{showForm ? 'Địa chỉ mới' : 'Địa Chỉ Của Tôi'}</DialogTitle>
      <DialogContent>
        {showForm ? (
          <NewAddressForm
            handleCancelForm={handleCancelForm}
            handleFormSubmit={handleFormSubmit}
            initialData={editingAddress}
          />
        ) : (
          <AddressList
              addresses={address}
              handleShowForm={handleShowForm} 
              handleRemoveAddress={handleRemoveAddress}            
          />
        )}
      </DialogContent>
      {!showForm && (
        <DialogActions>
          <Button onClick={() => navigate('/user/profile')} color='primary'>
            Xác nhận
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default AddressDialog
