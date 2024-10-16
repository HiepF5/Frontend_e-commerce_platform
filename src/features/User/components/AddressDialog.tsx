import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import NewAddressForm from './NewAddressDialog'
import AddressList from './AddressList'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { getAddress } from '../slices/AddressSlice'

interface FormData {
  name: string
  phone: string
  details: string
}

export type AddressType = 'home' | 'work'

const AddressDialog = () => {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAddress())
  }, [dispatch])

  const { address } = useAppSelector((state) => state.address) || {
    address: []
  }

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
  }

  const handleFormSubmit = (formData: FormData, addressType: AddressType) => {
    console.log('Form Data:', formData)
    console.log('Address Type:', addressType)
    setShowForm(false) // Close the form
  }

  return (
    <Dialog open={true}>
      <DialogTitle>{showForm ? 'Địa chỉ mới' : 'Địa Chỉ Của Tôi'}</DialogTitle>
      <DialogContent>
        {showForm ? (
          <NewAddressForm
            handleCancelForm={handleCancelForm}
            handleFormSubmit={handleFormSubmit}
          />
        ) : (
          <AddressList
            addresses={address}
            handleShowForm={handleShowForm} // No more selectedAddress or handleChange
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
