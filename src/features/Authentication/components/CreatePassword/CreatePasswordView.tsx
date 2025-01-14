import Img_CreatePassword from '@assets/SignInImg/siderbar_createpassword.png'
import { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@store/hook'
import { createPassword } from '../../slices/authSlice'
const CreatePasswordView = () => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const emailCreate = JSON.parse(localStorage.getItem('emailCreate') || 'null')
    const navigate = useNavigate()
    const dispatch = useAppDispatch() 
  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
       try {
         const result = await dispatch(
           createPassword({ email: emailCreate, new_password:password, verify_code: code })
         )
         const payload = result.payload as { code: number }
         if (
           result.meta.requestStatus === 'fulfilled' &&
           payload.code === 200
         ) {
           navigate('/auth/signin')
           localStorage.removeItem('emailCreate')
           toast.success('Repassword success')
         }
         return result
       } catch (err) {
         toast.error('Repassword failed')
       }
    }
  }

  return (
    <div className='container'>
      <div className='grid grid-cols-2 text-center'>
        <div style={{ height: 'calc(100vh - 100px)' }}>
          <img
            src={Img_CreatePassword}
            alt='Create Password Illustration'
            className='h-full object-cover'
          />
        </div>
        <div className='container flex flex-col gap-y-4 pt-5'>
          <h1 className='font-bold text-2xl text-left'>Create New Password</h1>
          <span className='text-left text-gray-400/95'>
            Your new password must be different from previous used passwords.
          </span>
          {/* Verification Code Input */}
          <div className='flex flex-col text-left pt-8 gap-2'>
            <label htmlFor='verificationCode'>Verification Code</label>
            <input
              type='text'
              id='verificationCode'
              placeholder='0975'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='h-16 px-4 border rounded border-gray-300 outline-none text-gray-700 text-lg'
            />
          </div>

          {/* Password Input */}
          <div className='flex flex-col text-left'>
            <label htmlFor='password'>Password</label>
            <div className='border rounded border-gray-300 outline-none flex justify-between items-center'>
              <input
                type='password'
                id='password'
                placeholder='******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='h-12 px-4 text-gray-700 text-lg'
              />
              <FaEyeSlash />
            </div>
            <span className='text-gray-400/95'>
              Must be at least 8 characters
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className='flex flex-col text-left'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='******'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='h-12 px-4 border rounded border-gray-300 outline-none text-gray-700 text-lg'
            />
            {password !== confirmPassword && confirmPassword && (
              <span className='text-red-400/95'>
                Password and confirm password do not match
              </span>
            )}
          </div>

          {/* Reset Password Button */}
          <div className='text-left'>
            <button
              className='border rounded bg-[#8A33FD] text-white px-8 p-2'
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePasswordView
