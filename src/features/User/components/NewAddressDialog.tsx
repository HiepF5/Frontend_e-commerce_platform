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
import { useAppDispatch, useAppSelector } from '@store/hook'
import { getProvince, getDistrict, getWard } from '../slices/GhnSlice'
import { IAddressRequest, AddressType, IAddress } from '~/types/address.interface'
import { mapAddressType } from '@shared/utils/mapAddressType'

interface NewAddressFormProps {
  handleCancelForm: () => void
  handleFormSubmit: (formData: IAddressRequest) => void
  initialData?: IAddress| null // Accept initial data for editing
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({
  handleCancelForm,
  handleFormSubmit,
  initialData
}) => {
  const dispatch = useAppDispatch()
  const { provinces, districts, wards, status } = useAppSelector(
    (state) => state.ghn
  )
  const [formData, setFormData] = useState<IAddressRequest>({
    addressType: 1,
    fullName: '',
    phoneNumber: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    provinceName: '',
    districtName: '',
    wardName: '',
    houseName: '',
    note: '',
    isDefault: true
  })
  const transformAddressToRequest = (
  address: IAddress
): IAddressRequest => {
  return {
    addressId: address.address_id,
    addressType: mapAddressType(address.address_type),
    fullName: address.full_name,
    phoneNumber: address.phone_number,
    wardId: address.ward_id,
    districtId: address.district_id,
    provinceId: address.province_id,
    houseName: '',
    wardName: '',
    districtName: '',
    provinceName: '',
    note: address.note || '',
    isDefault: address.is_default
  };
};
  useEffect(() => {
    if (initialData) {
      const transformedData = transformAddressToRequest(
        initialData,
      )
      setFormData(transformedData)
    }
  }, [initialData])


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
    const selectedProvinceId = event.target.value
    const selectedProvince = provinces?.find(
      (province) => province.ProvinceID === Number(selectedProvinceId)
    )
    const selectedProvinceName = selectedProvince
      ? selectedProvince.ProvinceName
      : ''

    setFormData((prevData) => ({
      ...prevData,
      provinceId: selectedProvinceId,
      districtId: '',
      wardId: '',
      provinceName: selectedProvinceName,
      districtName: '',
      wardName: ''
    }))
    dispatch(getDistrict({ province_id: selectedProvinceId }))
  }

  const handleDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDistrictId = event.target.value
    const selectedDistrict = districts?.find(
      (district) => district.DistrictID === Number(selectedDistrictId)
    )
    const selectedDistrictName = selectedDistrict
      ? selectedDistrict.DistrictName
      : ''

    setFormData((prevData) => ({
      ...prevData,
      districtId: selectedDistrictId,
      wardId: '',
      districtName: selectedDistrictName,
      wardName: ''
    }))
    dispatch(getWard({ district_id: selectedDistrictId }))
  }

  const handleWardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWardId = event.target.value
    const selectedWard = wards?.find(
      (ward) => ward.WardCode === selectedWardId
    ) || { WardName: '' }

    setFormData((prevData) => ({
      ...prevData,
      wardId: selectedWardId,
      wardName: selectedWard.WardName
    }))
  }

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: AddressType
  ) => {
    if (newType !== null) {
      setFormData((prevData) => ({
        ...prevData,
        addressType: newType
      }))
    }
  }

  const handleSubmit = () => {
    handleFormSubmit(formData)
  }

  return (
    <>
      <TextField
        label='Họ và tên'
        name='fullName'
        value={formData.fullName}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Số điện thoại'
        name='phoneNumber'
        value={formData.phoneNumber}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
      <TextField
        select
        label='Tỉnh/Thành phố'
        name='provinceId'
        value={formData.provinceId}
        onChange={handleProvinceChange}
        fullWidth
        margin='normal'
        disabled={status}
      >
        {status ? (
          <MenuItem value='loading'>Đang tải...</MenuItem>
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
        name='districtId'
        value={formData.districtId}
        onChange={handleDistrictChange}
        fullWidth
        margin='normal'
        disabled={!formData.provinceId || status}
      >
        {status ? (
          <MenuItem value='loading'>Đang tải...</MenuItem>
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
        name='wardId'
        value={formData.wardId}
        onChange={handleWardChange}
        fullWidth
        margin='normal'
        disabled={!formData.districtId || status}
      >
        {status ? (
          <MenuItem value='loading'>Đang tải...</MenuItem>
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
        name='houseName'
        value={formData.houseName}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Ghi chú'
        name='note'
        value={formData.note}
        onChange={handleFormInputChange}
        fullWidth
        margin='normal'
      />

      <Typography style={{ marginTop: '20px' }}>Loại địa chỉ:</Typography>
      <ToggleButtonGroup
        value={formData.addressType}
        exclusive
        onChange={handleToggleChange}
        aria-label='Address Type'
        style={{ marginTop: '10px', marginBottom: '20px' }}
      >
        <ToggleButton value={1}>Nhà Riêng</ToggleButton>
        <ToggleButton value={2}>Văn Phòng</ToggleButton>
      </ToggleButtonGroup>

      <DialogActions>
        <Button onClick={handleCancelForm} color='secondary'>
          Trở Lại
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Hoàn thành
        </Button>
      </DialogActions>
    </>
  )
}

export default NewAddressForm
