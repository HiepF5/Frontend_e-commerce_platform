import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
// src/guards/AuthenticatedGuard.tsx
import Cookies from 'js-cookie';
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

export const AuthPermission = ({ children, allowedRoles }: AuthPermissionProps): JSX.Element => {
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const userData = JSON.parse(userStr) as User
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])
  const token = Cookies.get('accessToken')

  if (token == null || token === '') {
    debugger
    return <Navigate to='/auth/login' replace />
  }

  // Check if user is authenticated
  // if (!user?.access_token) {
  //   return <Navigate to="/auth/login" state={{ from: location }} replace />
  // }

  // Check if user has required roles
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = user?.role.some(role => allowedRoles.includes(role)) ?? false
    if (!hasRequiredRole) {
      // Redirect based on user's highest role
      if (user?.role.includes('CHUCUAHANG')) {
        return <Navigate to="/shop-admin" replace />
      } else if (user?.role.includes('KHACHHANG')) {
        return <Navigate to="/" replace />
      }
      return <Navigate to="/" replace />
    }
  }

  // For shop owner routes, check if shop_code exists
  if (allowedRoles?.includes('CHUCUAHANG') && !user?.shop_code) {
    return <Navigate to="/" replace />
  }

  return children
} 