import React, { useState } from 'react'
import {
  Typography,
  Button,
  Grid,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { IAddress } from '~/types/address.interface'
import { ConfirmDialog } from '@shared/components/DiaglogComfirm/DiaglogComfirm'

interface AddressListProps {
  addresses: IAddress[] | null
  handleShowForm: (address: IAddress | null) => void // Pass address to the form
  handleRemoveAddress: (addressId: number) => void // Function to remove address
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  handleShowForm,
  handleRemoveAddress
}) => {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>()
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [addressToRemove, setAddressToRemove] = useState<number | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(event.target.value)
  }

  const handleOpenDialog = (addressId: number) => {
    setAddressToRemove(addressId)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setAddressToRemove(null)
  }

  const handleConfirmRemove = () => {
    if (addressToRemove) {
      handleRemoveAddress(addressToRemove)
    }
    handleCloseDialog()
  }

  return (
    <>
      <RadioGroup value={selectedAddress} onChange={handleChange}>
        {addresses &&
          addresses.map((address, index) => (
            <Box
              key={index}
              border={1}
              borderColor='grey.300'
              borderRadius='8px'
              p={2}
              mb={2}
              display='flex'
              flexDirection='column'
            >
              <Grid container spacing={1} alignItems='center'>
                <Grid item xs={12} sm={8}>
                  <Typography variant='body1' fontWeight='bold'>
                    {address.full_name} | {address.phone_number}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} textAlign='right'>
                  <FormControlLabel
                    value={address.address_id}
                    control={<Radio />}
                    label=''
                  />
                  <Button
                    variant='text'
                    onClick={() => handleShowForm(address)}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    variant='text'
                    color='error'
                    onClick={() => handleOpenDialog(address.address_id)}
                  >
                    Xóa
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box display='flex' alignItems='center'>
                    <LocationOnIcon fontSize='small' color='action' />
                    <Typography variant='body2' ml={1}>
                      {address.address}
                    </Typography>
                  </Box>
                  <Box
                    display='inline-block'
                    border={1}
                    borderColor={address.is_default ? 'error.main' : 'grey.300'}
                    borderRadius='4px'
                    p={1}
                    mt={1}
                    bgcolor={
                      address.is_default ? 'error.light' : 'background.default'
                    }
                  >
                    <Typography
                      variant='caption'
                      color={
                        address.is_default
                          ? 'error.contrastText'
                          : 'textSecondary'
                      }
                    >
                      {address.is_default ? 'Mặc định' : 'Địa chỉ lấy hàng'}
                    </Typography>
                  </Box>
                </Grid>
                {address.note && (
                  <Grid item xs={12}>
                    <Typography variant='caption' color='textSecondary'>
                      Ghi chú: {address.note}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
      </RadioGroup>
      <Button
        variant='outlined'
        style={{ marginTop: '10px' }}
        onClick={() => handleShowForm(null)} // Show form for new address
      >
        + Thêm Địa Chỉ Mới
      </Button>

      {/* Replace the Dialog with ConfirmDialog */}
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        action='xóa'
        title='địa chỉ'
        onConfirm={handleConfirmRemove}
      />
    </>
  )
}

export default AddressList
