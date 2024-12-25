import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

interface User {
  full_name: string
  email: string
  image_url: string
  role: string[]
  gender: string
  user_code: string
  shop_code?: string
  date_of_birth: string
  phone_number: string
  access_token: string
}

interface AuthPermissionProps {
  children: JSX.Element
  allowedRoles?: string[]
}

export const AuthPermission = ({
  children,
  allowedRoles
}: AuthPermissionProps): JSX.Element => {
  const token = Cookies.get('accessToken')

  if (!token) {
    toast.error('Bạn cần đăng nhập để truy cập trang này')
    return <Navigate to='/auth/login' replace />
  }

  const userStr = localStorage.getItem('user')
  const user: User | null = userStr ? JSON.parse(userStr) : null

  if (!user) {
    toast.error('Thông tin người dùng không hợp lệ')
    return <Navigate to='/auth/login' replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = user.role.some((role) =>
      allowedRoles.includes(role)
    )

    if (!hasRequiredRole) {
      if (user.role.includes('CHUCUAHANG')) {
        toast.warning('Bạn cần là chủ cửa hàng để truy cập trang này')
        return <Navigate to='/shop-admin' replace />
      } else if (user.role.includes('KHACHHANG')) {
        toast.warning('Bạn cần là khách hàng để truy cập trang này')
        return <Navigate to='/' replace />
      } else if (user.role.includes('ADMIN')) {
        toast.warning('Bạn cần là admin để truy cập trang này')
        return <Navigate to='/' replace />
      } else if (user.role.includes('ROOT')) {
        toast.warning('Bạn cần là root để truy cập trang này')
        return <Navigate to='/' replace />
      }

      toast.warning('Bạn không có quyền truy cập trang này')
      return <Navigate to='/' replace />
    }
  }

  if (allowedRoles?.includes('CHUCUAHANG') && !user.shop_code) {
    toast.warning('Bạn cần có cửa hàng để truy cập trang này')
    return <Navigate to='/' replace />
  }

  return children
}
