import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  MenuItem,
  Select,
  Avatar,
  Box
} from '@mui/material'

const ProfileComponent = () => {
  // Fake data (can be replaced with dynamic data from API or state)
  const [profile, setProfile] = useState({
    username: 'hiepv1612',
    name: 'HiepF5',
    email: 'ng*****@gmail.com',
    phone: '*******57',
    gender: 'Nam',
    birthDay: '11',
    birthMonth: '10',
    birthYear: '2024',
    avatar: 'https://via.placeholder.com/150' // Placeholder image
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Hồ Sơ Của Tôi
      </Typography>
      <Box display='flex' alignItems='center' sx={{ mb: 2 }}>
        <Avatar
          src={profile.avatar}
          alt='Avatar'
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Button variant='contained' component='label'>
          Chọn Ảnh
          <input hidden accept='image/*' type='file' />
        </Button>
      </Box>
      <TextField
        fullWidth
        label='Tên đăng nhập'
        variant='outlined'
        value={profile.username}
        sx={{ mb: 2 }}
        disabled
      />
      <TextField
        fullWidth
        label='Tên'
        variant='outlined'
        name='name'
        value={profile.name}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label='Email'
        variant='outlined'
        value={profile.email}
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label='Số điện thoại'
        variant='outlined'
        value={profile.phone}
        disabled
        sx={{ mb: 2 }}
      />
      <Typography variant='body1' sx={{ mb: 1 }}>
        Giới tính
      </Typography>
      <RadioGroup
        row
        name='gender'
        value={profile.gender}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      >
        <FormControlLabel value='Nam' control={<Radio />} label='Nam' />
        <FormControlLabel value='Nữ' control={<Radio />} label='Nữ' />
        <FormControlLabel value='Khác' control={<Radio />} label='Khác' />
      </RadioGroup>
      <Typography variant='body1' sx={{ mb: 1 }}>
        Ngày sinh
      </Typography>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Select
          value={profile.birthDay}
          name='birthDay'
          onChange={handleInputChange}
          sx={{ width: '30%' }}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={profile.birthMonth}
          name='birthMonth'
          onChange={handleInputChange}
          sx={{ width: '30%' }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={profile.birthYear}
          name='birthYear'
          onChange={handleInputChange}
          sx={{ width: '30%' }}
        >
          {Array.from({ length: 100 }, (_, i) => (
            <MenuItem key={2024 - i} value={2024 - i}>
              {2024 - i}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button variant='contained' color='primary'>
        Lưu
      </Button>
    </Container>
  )
}

export default ProfileComponent
