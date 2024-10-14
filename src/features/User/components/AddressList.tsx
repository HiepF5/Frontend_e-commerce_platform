import React from 'react'
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button
} from '@mui/material'

interface Address {
  name: string;
  phone: string;
  details: string;
  default?: boolean;
}

interface AddressListProps {
  addresses: Address[];
  selectedAddress: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowForm: () => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  selectedAddress,
  handleChange,
  handleShowForm
}) => {
  return (
    <>
      <RadioGroup value={selectedAddress} onChange={handleChange}>
        {addresses.map((address, index) => (
          <FormControlLabel
            key={index}
            value={address.name}
            control={<Radio />}
            label={
              <div>
                <Typography variant='body1'>
                  {address.name} ({address.phone})
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {address.details}
                </Typography>
                {address.default && (
                  <Typography variant='caption' color='error'>
                    Mặc định
                  </Typography>
                )}
              </div>
            }
          />
        ))}
      </RadioGroup>
      <Button
        variant='outlined'
        style={{ marginTop: '10px' }}
        onClick={handleShowForm}
      >
        + Thêm Địa Chỉ Mới
      </Button>
    </>
  )
}

export default AddressList
