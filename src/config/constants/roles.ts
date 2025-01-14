export const ROLES = {
  QUANLY: 'QUANLY',
  CHUCUAHANG: 'CHUCUAHANG',
  KHACHHANG: 'KHACHHANG'
} as const

export type UserRole = keyof typeof ROLES 