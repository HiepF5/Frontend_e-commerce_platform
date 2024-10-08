import { useState, useCallback } from 'react'
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Link,
  Divider,
  Button
} from '@mui/material'
import { Iconify } from '@shared/components/iconify'
import { useAppDispatch, useAppSelector } from '@store/hook'
import { login } from '../../slices/authSlice'
import { setCookie } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'

import Img_SignIn from '@assets/SignInImg/siderbar_signin.png'
import { toast } from 'react-toastify'

const SignInView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { error } = useAppSelector((state) => state.auth)

  const handleSignIn = useCallback(() => {
    ;(async () => {
      try {
        const result = await dispatch(login({ username, password }))
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(setCookie())
          console.log('Login success')
          navigate('/')
          toast.success('Login success')
        }
      } catch (err) {
        console.error('Login failed:', err)
      }
    })()
  }, [dispatch, username, password])


  return (
    <div className='container'>
      <div className='grid grid-cols-2 text-center'>
        <div className='' style={{ height: 'calc(100vh - 100px)' }}>
          <img src={Img_SignIn} alt='' className=' h-full object-cover' />
        </div>
        <div className='container flex flex-col gap-y-4 pt-5'>
          <Box
            gap={1.5}
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{ mb: 5 }}
          >
            <Typography variant='h5'>Sign in</Typography>
            <Typography variant='body2' color='text.secondary'>
              Don’t have an account?
              <Link variant='subtitle2' sx={{ ml: 0.5 }}>
                Get started
              </Link>
            </Typography>
          </Box>

          <Box display='flex' flexDirection='column' alignItems='flex-end'>
            <TextField
              fullWidth
              name='email'
              label='Email address'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              name='password'
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    <Iconify
                      icon={
                        showPassword
                          ? 'solar:eye-bold'
                          : 'solar:eye-closed-bold'
                      }
                    />
                  </IconButton>
                )
              }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              size='large'
              type='submit'
              color='primary'
              variant='contained'
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </Box>

          {error && <Typography color='error'>{error}</Typography>}

          <Divider
            sx={{
              my: 3,
              '&::before, &::after': { borderTopStyle: 'dashed' }
            }}
          >
            <Typography
              variant='overline'
              sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
            >
              OR
            </Typography>
          </Divider>

          <Box gap={1} display='flex' justifyContent='center'>
            <IconButton color='inherit'>
              <Iconify icon='logos:google-icon' />
            </IconButton>
            <IconButton color='inherit'>
              <Iconify icon='eva:github-fill' />
            </IconButton>
            <IconButton color='inherit'>
              <Iconify icon='ri:twitter-x-fill' />
            </IconButton>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default SignInView
