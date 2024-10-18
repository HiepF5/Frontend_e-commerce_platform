import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Typography,
  DialogActions
} from '@mui/material'
import { AddressType } from './AddressDialog'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { getProvince, getDistrict, getWard } from '../slices/GhnSlice'

interface NewAddressFormProps {
  handleCancelForm: () => void
  handleFormSubmit: (
    formData: { name: string; phone: string; details: string },
    addressType: AddressType
  ) => void
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({
  handleCancelForm,
  handleFormSubmit
}) => {
  const dispatch = useAppDispatch()
  const { provinces, districts, wards, status } = useAppSelector(
    (state) => state.ghn
  )

  const [addressType, setAddressType] = useState<AddressType>('home')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    specificAddress: '',
    details: ''
  })

  useEffect(() => {
    dispatch(getProvince())
  }, [dispatch])

  const handleFormInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedProvince = event.target.value
    setFormData((prevData) => ({
      ...prevData,
      province: selectedProvince,
      district: '', // Reset district and ward when province changes
      ward: ''
    }))
    dispatch(getDistrict({ province_id: selectedProvince }))
  }

  const handleDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDistrict = event.target.value
    setFormData((prevData) => ({
      ...prevData,
      district: selectedDistrict,
      ward: '' // Reset ward when district changes
    }))
    dispatch(getWard({ district_id: selectedDistrict }))
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
        select
        label='Tỉnh/Thành phố'
        name='province'
        value={formData.province}
        onChange={handleProvinceChange}
        fullWidth
        margin='normal'
        disabled={status}
      >
        {status ? (
          <MenuItem value=''>Đang tải...</MenuItem>
        ) : (
          provinces?.map((province) => (
            <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
              {province.ProvinceName}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        select
        label='Quận/Huyện'
        name='district'
        value={formData.district}
        onChange={handleDistrictChange}
        fullWidth
        margin='normal'
        disabled={!formData.province || status}
      >
        {status ? (
          <MenuItem value=''>Đang tải...</MenuItem>
        ) : (
          districts?.map((district) => (
            <MenuItem key={district.DistrictID} value={district.DistrictID}>
              {district.DistrictName}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        select
        label='Phường/Xã'
        name='ward'
        value={formData.ward}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
        disabled={!formData.district || status}
      >
        {status ? (
          <MenuItem value=''>Đang tải...</MenuItem>
        ) : (
          wards?.map((ward) => (
            <MenuItem key={ward.WardCode} value={ward.WardCode}>
              {ward.WardName}
            </MenuItem>
          ))
        )}
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
