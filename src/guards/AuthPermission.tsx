import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

interface AuthPermissionProps {
  children: JSX.Element
  allowedRoles?: string[]
}

export const AuthPermission = ({
  children,
  allowedRoles
}: AuthPermissionProps) => {
  const token = Cookies.get('accessToken')

  if (!token) {
    toast.error('Bạn cần đăng nhập để truy cập trang này')
    return <Navigate to='/auth/login' replace />
  }
  const navigate = useNavigate()

  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  console.log(user)
  console.log(userStr)
  if (!user) {
    toast.error('Thông tin người dùng không hợp lệ')
    return <Navigate to='/auth/login' replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    console.log(user.list_role)
    const hasRequiredRole = user.list_role.some((role: string) =>
      allowedRoles.includes(role)
    )

    if (!hasRequiredRole) {
      if (user.list_role.includes('CHUCUAHANG')) {
        toast.warning('Bạn cần là chủ cửa hàng để truy cập trang này')
        navigate('/shop-admin', { replace: true })
        return null
      } else if (user.list_role.includes('KHACHHANG')) {
        toast.warning('Bạn cần là khách hàng để truy cập trang này')
        navigate('/', { replace: true })
        return null
      } else if (user.list_role.includes('ADMIN')) {
        toast.warning('Bạn cần là admin để truy cập trang này')
            navigate('/', { replace: true })
        return null
      } else if (user.list_role.includes('ROOT')) {
        toast.warning('Bạn cần là root để truy cập trang này')
            navigate('/', { replace: true })
        return null
      }

      toast.warning('Bạn không có quyền truy cập trang này')
      navigate('/', { replace: true })
      return null
    }
  }

  // if (allowedRoles?.includes('CHUCUAHANG') && !user.shop_code) {
  //   toast.warning('Bạn cần có cửa hàng để truy cập trang này')
  //   navigate('/', { replace: true })
  //   return null
  // }

  return children
}
