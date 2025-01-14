import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from '@mui/material'
import { IUser } from '~/types/users.interface'
import { convertToDateInputFormat } from '@shared/utils/formatDate'

interface ChangeInfoDialogProps {
  open: boolean
  onClose: () => void
  userInfo: IUser
  onSave: (updatedInfo: any) => void
}

const ChangeInfoDialog: React.FC<ChangeInfoDialogProps> = ({
  open,
  onClose,
  userInfo,
  onSave
}) => {
  const [formData, setFormData] = useState(userInfo)

  useEffect(() => {
    if (userInfo.date_of_birth) {
      setFormData({
        ...userInfo,
        date_of_birth: convertToDateInputFormat(userInfo.date_of_birth)
      })
    }
  }, [userInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSave = () => {
    const dataRequest = {
      firstName: formData.first_name,
      lastName: formData.last_name,
      dob: formData.date_of_birth,
      phoneNumber: formData.phone_number,
      email: formData.email,
      username: formData.username
    }
    onSave(dataRequest)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Info</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='First Name'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Last Name'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Date of Birth'
              type='date'
              name='date_of_birth'
              value={formData.date_of_birth} 
              onChange={handleChange}
              fullWidth
              margin='normal'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Phone Number'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin='normal'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeInfoDialog
