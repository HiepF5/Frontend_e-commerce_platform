import React, { useState } from 'react'
import Img_Repassword from '@assets/SignInImg/siderbar_repassword.png'
import { useAppDispatch } from '@store/hook'
import { useNavigate } from 'react-router-dom'
import { rePassword } from '../../slices/authSlice'
import { toast } from 'react-toastify'
const RePasswordView = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch() 
  const handleSubmit = async () => {
    try {
      const result = await dispatch(rePassword({ email: email }))
      const payload = result.payload as { code: number }
      if (result.meta.requestStatus === 'fulfilled' && payload.code === 200) {
        localStorage.setItem('emailCreate', JSON.stringify(email))
        navigate('/auth/createpassword')
        toast.success('Repassword success')
      }
      return result
    } catch (err) {
      toast.error('Repassword failed')
    }
  }
  return (
    <div className='container'>
      <div>
        <div className='grid grid-cols-2 text-center'>
          <div style={{ height: 'calc(100vh - 100px)' }}>
            <img src={Img_Repassword} alt='' className=' h-full object-cover' />
          </div>
          <div className='container flex flex-col gap-y-4 pt-5'>
            <h1 className='font-bold text-2xl text-left '>
              Reset Your Password
            </h1>
            <span className='text-left text-gray-400/95'>
              Enter your email and we'll send you a link to reset your password.
            </span>
            <span className='text-left text-gray-400/95'>Please check it.</span>

            <div className='flex flex-col text-left pt-8 gap-2'>
              <span>Email</span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='focus001@gmail.com'
                className='h-16 px-4 border rounded border-gray-300 outline-none text-gray-700 text-lg'
              />
              <span className='text-red-400'>We can not find your email</span>
            </div>

            <div className='text-left'>
              <button
                className='border rounded bg-[#8A33FD] text-white px-8 p-2'
                onClick={() => handleSubmit()}
              >
                Send
              </button>
              <p>Back to Login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RePasswordView
