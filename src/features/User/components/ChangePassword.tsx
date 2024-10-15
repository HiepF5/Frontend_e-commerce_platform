import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { StyledCard } from '@shared/libs/mui/Style'
import { changePassword } from '../slices/UserSlice'
import { useAppDispatch } from '@store/hook'
const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const dispatch = useAppDispatch()
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(
        changePassword({
          email: email,
          old_password: oldPassword,
          new_password: newPassword
        })
      )
      toast.success('Password changed successfully')
    } catch (error) {
      toast.error('Failed to change password')
    }
  }

  return (
    <StyledCard>
      <Box
        component='form'
        onSubmit={handleChangePassword}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          margin: 'auto',
          mt: 5
        }}
      >
        <Typography variant='h5' textAlign='center'>
          Change Password
        </Typography>
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label='Old Password'
          type='password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <TextField
          label='New Password'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          Change Password
        </Button>
      </Box>
    </StyledCard>
  )
}

export default ChangePassword
