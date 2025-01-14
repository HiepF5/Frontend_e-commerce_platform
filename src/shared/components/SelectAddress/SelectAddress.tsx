import React, { useEffect } from 'react'
import { TextField, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/hook'
import {
  getDistrict,
  getProvince,
  getWard
} from '@features/User/slices/GhnSlice'

interface SelectAddressProps {
  provinceId: string
  districtId: string
  wardId: string
  onProvinceChange: (provinceId: string) => void
  onDistrictChange: (districtId: string) => void
  onWardChange: (wardId: string) => void
  status: boolean
}

const SelectAddress: React.FC<SelectAddressProps> = ({
  provinceId,
  districtId,
  wardId,
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  status
}) => {
  const dispatch = useAppDispatch()
  const { provinces, districts, wards } = useAppSelector((state) => state.ghn)

  useEffect(() => {
    dispatch(getProvince())
  }, [dispatch])

  useEffect(() => {
    if (provinceId) {
      dispatch(getDistrict({ province_id: provinceId }))
    }
  }, [provinceId, dispatch])

  useEffect(() => {
    if (districtId) {
      dispatch(getWard({ district_id: districtId }))
    }
  }, [districtId, dispatch])

  return (
    <>
      <TextField
        select
        label='Tỉnh/Thành phố'
        value={provinceId}
        onChange={(e) => onProvinceChange(e.target.value)}
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
        value={districtId}
        onChange={(e) => onDistrictChange(e.target.value)}
        fullWidth
        margin='normal'
        disabled={!provinceId || status}
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
        value={wardId}
        onChange={(e) => onWardChange(e.target.value)}
        fullWidth
        margin='normal'
        disabled={!districtId || status}
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
    </>
  )
}

export default SelectAddress
