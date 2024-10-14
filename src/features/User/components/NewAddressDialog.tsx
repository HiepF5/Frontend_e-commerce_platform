import React, { useState } from 'react'
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Typography,
  DialogActions
} from '@mui/material'
import { AddressType } from './AddressDialog';

interface NewAddressFormProps {
  handleCancelForm: () => void
  handleFormSubmit: (
    formData: { name: string; phone: string; details: string },
    addressType: AddressType
  ) => void
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({ handleCancelForm, handleFormSubmit }) => {
  const [addressType, setAddressType] = useState<AddressType>('Nhà Riêng' as AddressType)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    specificAddress: '',
    details: ''
  })

  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleAddressTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: AddressType
  ) => {
    if (newType !== null) {
      setAddressType(newType)
    }
  }

  return (
    <>
      <TextField
        label='Họ và tên'
        name='name'
        value={formData.name}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Số điện thoại'
        name='phone'
        value={formData.phone}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
       <TextField
        name='details'
        value={formData.details}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
      <TextField
        select
        label='Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'
        name='city'
        value={formData.city}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      >
        <MenuItem value='Hà Nội'>Hà Nội</MenuItem>
        <MenuItem value='Thanh Hóa'>Thanh Hóa</MenuItem>
      </TextField>
      <TextField
        label='Địa chỉ cụ thể'
        name='specificAddress'
        value={formData.specificAddress}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
      <Button variant='outlined' style={{ marginTop: '10px' }}>
        + Thêm vị trí
      </Button>

      <Typography style={{ marginTop: '20px' }}>Loại địa chỉ:</Typography>
      <ToggleButtonGroup
        value={addressType}
        exclusive
        onChange={handleAddressTypeChange}
        aria-label='Address Type'
        style={{ marginTop: '10px', marginBottom: '20px' }}
      >
        <ToggleButton value='Nhà Riêng'>Nhà Riêng</ToggleButton>
        <ToggleButton value='Văn Phòng'>Văn Phòng</ToggleButton>
      </ToggleButtonGroup>

      <DialogActions>
        <Button onClick={handleCancelForm} color='secondary'>
          Trở Lại
        </Button>
        <Button
          onClick={() => handleFormSubmit(formData, addressType)}
          color='primary'
        >
          Hoàn thành
        </Button>
      </DialogActions>
    </>
  )
}

export default NewAddressForm
