import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import NewAddressForm from './NewAddressDialog'
import AddressList from './AddressList'
import { Navigate, useNavigate } from 'react-router-dom'

interface FormData {
  name: string
  phone: string
  details: string
}

export type AddressType = 'home' | 'work' 
const AddressDialog = () => {
  const [selectedAddress, setSelectedAddress] = useState('An Hoàng')
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const addresses = [
    {
      name: 'An Hoàng',
      phone: '+84 867 865 001',
      details: 'Kí Túc Xá B2, Bưu Chính, Phường Mộ Lao, Quận Hà Đông, Hà Nội',
      default: true
    },
    {
      name: 'Hoàng Văn An',
      phone: '+84 867 865 001',
      details: 'Thị Trấn Thiệu Hóa, Huyện Thiệu Hóa, Thanh Hóa',
      default: false
    }
  ]

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(event.target.value)
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
            addresses={addresses}
            selectedAddress={selectedAddress}
            handleChange={handleChange}
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
