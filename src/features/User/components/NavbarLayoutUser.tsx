import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  AccountBalance as BankIcon,
  LocationOn as AddressIcon,
  VpnKey as KeyIcon,
  Store as StoreIcon,
  Storefront as ShopManagementIcon,
  ShoppingCart as ShoppingCartIcon,
  HomeWorkTwoTone as StoreMallIcon,
  StoreMallDirectory as StoreMallDirectoryIcon
} from '@mui/icons-material'

const NavbarLayoutUser = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
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
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <StoreIcon className='text-yellow-600' />

        <Link
          to='/user/subcribe-shop'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Đăng kí Shop
        </Link>
      </div>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <ShopManagementIcon className='text-yellow-600' />

        <Link
          to='/user/manage-shop'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Thông tin Shop
        </Link>
      </div>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <ShoppingCartIcon className='text-yellow-600' />

        <Link
          to='/shop-admin'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Quản lí Shop
        </Link>
      </div>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <StoreMallIcon className='text-yellow-600' />

        <Link
          to={`/shop/${user.shop_id}`}
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Trang chủ Shop của Tôi
        </Link>
      </div>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <ShoppingCartIcon className='text-yellow-600' />

        <Link
          to='/user/vouchers'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Voucher của tôi
        </Link>
      </div>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <StoreMallDirectoryIcon className='text-yellow-600' />

        <Link
          to='/order'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Đơn mua
        </Link>
      </div>
      <div className='flex items-center p-4 gap-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'>
        <StoreMallDirectoryIcon className='text-yellow-600' />

        <Link
          to='/order/history'
          className='text-gray-800 font-medium text-lg hover:text-yellow-600'
        >
          Lịch sử đơn hàng
        </Link>
      </div>
    </>
  )
}

export default NavbarLayoutUser
