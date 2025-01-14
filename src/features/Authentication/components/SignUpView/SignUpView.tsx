import React, { useState } from 'react'
import Img_SignUp from '@assets/SignInImg/siderbar_signup.png'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  TextField,
  Button,
  FormControlLabel as MuiFormControlLabel,
  Typography,
  IconButton,
  InputAdornment,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material'
import { useAppDispatch } from '@store/hook'
import { signup } from '../../slices/authSlice'// Đảm bảo đường dẫn đúng

const SignUpView = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    isMale: true,
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch() 
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
   const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({
       ...formData,
       isMale: e.target.value === 'male'
     })
   }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const response = await dispatch(
      signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        isMale: 1,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        username: formData.username,
        password: formData.password
      })
    )
    const payload = response.payload as { code: number };
    if (response.meta.requestStatus === 'fulfilled' && payload.code === 200) {
      toast.success('Bạn hãy xác nhận mã code trong mail!')
      localStorage.setItem('emailRegister', JSON.stringify(formData.email))
      navigate('/auth/checkemail')
    } else {
      toast.error((response.payload as { message: string }).message) 
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='container'>
      <div>
        <div className='grid grid-cols-2 text-center'>
          <div style={{ height: 'calc(100vh - 100px)' }}>
            <img src={Img_SignUp} alt='' className='h-full object-cover' />
          </div>
          <div className='container flex flex-col gap-y-4 pt-5'>
            <Typography variant='h5'>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='First Name'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Last Name'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Date of Birth'
                    type='date'
                    name='dob'
                    value={formData.dob}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Phone Number'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Email Address'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    variant='outlined'
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
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    label='Password'
                    value={formData.password}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={toggleShowPassword}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    variant='outlined'
                    label='Confirm Password'
                    fullWidth
                    margin='normal'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={toggleShowPassword}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label='gender'
                      name='isMale'
                      value={formData.isMale ? 'male' : 'female'}
                      onChange={handleGenderChange}
                    >
                      <MuiFormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                      />
                      <MuiFormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpView
