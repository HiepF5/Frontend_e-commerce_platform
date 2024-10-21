import React, { useEffect, useState } from 'react'
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
import { createAddress, getAddress } from '../slices/AddressSlice'
import NewAddressForm from './NewAddressDialog'
import { IAddressRequest, IAddress } from '~/types/address.interface'

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

  const handleFormSubmit = (formData: IAddressRequest) => {
    dispatch(createAddress(formData)) 
    setShowForm(false)
    setEditingAddress(null)
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
