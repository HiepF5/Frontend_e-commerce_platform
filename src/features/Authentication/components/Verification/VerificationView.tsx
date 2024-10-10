import Img_Verification from '@assets/SignInImg/siderbar_verification.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@store/hook'
import { verifycation } from '../../slices/authSlice'
import { useState } from 'react'
const VerificationView = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() 
  const [code, setCode] = useState('')
  const emailRegister = JSON.parse(localStorage.getItem('emailRegister') || 'null')
  const handleSubmit = async () => {
    try {
      const result = await dispatch(
        verifycation({ email: emailRegister, verify_code: code })
      )
      const payload = result.payload as { code: number }
      if (result.meta.requestStatus === 'fulfilled' && payload.code === 200) {
        navigate('/auth/signin')
        localStorage.removeItem('emailRegister')
        toast.success('Register success')
      }
      return result
    } catch (err) {
      toast.error('Register failed')
    }
 
  }
  return (
    <div className='container'>
      <div>
        <div className='grid grid-cols-2 text-center'>
          <div style={{ height: 'calc(100vh - 100px)' }}>
            <img
              src={Img_Verification}
              alt=''
              className=' h-full object-cover'
            />
          </div>
          <div className='container flex flex-col gap-y-4 pt-5'>
            <h1 className='font-bold text-3xl text-left '>Verification</h1>
            <span className='text-left text-gray-400/95'>
              Verify your code.
            </span>
            <div className='flex flex-col text-left pt-8 gap-2'>
              <span>Verification Code</span>
              <input
                type='text'
                placeholder='0975'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className='h-16 px-4 border rounded border-gray-300 outline-none text-gray-700 text-lg'
              />
            </div>

            <div className='text-left'>
              <button
                className='border rounded bg-[#8A33FD] text-white px-8 p-2'
                onClick={() => handleSubmit()}
              >
                {' '}
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationView
