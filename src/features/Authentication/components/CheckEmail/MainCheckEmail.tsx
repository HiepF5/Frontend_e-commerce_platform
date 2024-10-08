import Img_Checkmail from '@assets/SignInImg/siderbar_checkmail.png'
import { IoIosArrowBack } from 'react-icons/io'
const MainCheckEmail = () => {
  return (
    <div className='container'>
      <div>
        <div className='grid grid-cols-2 text-center'>
          <div style={{ height: 'calc(100vh - 100px)' }}>
            <img
              src={Img_Checkmail}
              alt=''
              className=' h-full object-cover'
            />
          </div>
          <div className='container flex flex-col gap-y-4 pt-5'>
            <h1 className='font-bold text-2xl text-left '>Check Email</h1>
            <span className='text-left text-gray-400/95'>
              Please check your email inbox and click on the provided link to
              reset your password. If you don't receive email, Click here to
              resend
            </span>
            <div className='flex items-center justify-start gap-x-3'>
              <IoIosArrowBack className='text-gray-400/95' />
              <span className='text-left text-gray-400/95'>Back to Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCheckEmail
