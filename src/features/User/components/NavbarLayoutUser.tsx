import React from 'react'
import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  AccountBalance as BankIcon,
  LocationOn as AddressIcon,
  VpnKey as KeyIcon
} from '@mui/icons-material'

const NavbarLayoutUser = () => {
  return (
    <>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <HomeIcon className='text-blue-600' />
        <Link
          to='/user/profile'
          className='text-gray-800 font-medium text-lg hover:text-blue-600'
        >
          Tài khoản của tôi
        </Link>
      </div>

      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <BankIcon className='text-green-600' />
        <Link
          to='/user/bank'
          className='text-gray-800 font-medium text-lg hover:text-green-600'
        >
          Ngân hàng
        </Link>
      </div>

      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <AddressIcon className='text-orange-600' />
        <Link
          to='/user/address'
          className='text-gray-800 font-medium text-lg hover:text-orange-600'
        >
          Địa chỉ
        </Link>
      </div>

      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <KeyIcon className='text-yellow-600' />
        <Link
          to='/user/change-password'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Đổi mật khẩu
        </Link>
      </div>
    </>
  )
}

export default NavbarLayoutUser
