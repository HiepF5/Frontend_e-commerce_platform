export type VoucherType = 'DISCOUNT' | 'SHIPPING'
export type DiscountType = 'PERCENT' | 'AMOUNT'
export type VoucherStatus = 'ENABLE' | 'DISABLE' | 'EXPIRED'

export interface Voucher {
  id : number
  type: VoucherType
  discountType: DiscountType
  voucherCode: string
  title: string
  voucherCount: number
  remainingCount: number
  discountValue: number
  maxDiscountValue?: number
  minTotalOrder: number
  shippingDiscount?: number
  maxShippingDiscount?: number
  startedAt: string
  expiredAt: string
  status: VoucherStatus
}

export interface VoucherDashboardRequest {
  voucherCode?: string | null
  type?: VoucherType | null
  discountType?: DiscountType | null
  status?: VoucherStatus | null
  startSt?: string | null
  startEd?: string | null
  expirySt?: string | null
  expiryEd?: string | null
  sort?: string | null
  pageNumber: number
  pageSize: number
}

export interface VoucherCreateRequest {
  type: VoucherType
  discountType: DiscountType
  voucherCode: string
  title: string
  voucherCount: number
  remainingCount: number
  discountValue: number
  maxDiscountValue?: number
  minTotalOrder: number
  shippingDiscount?: number
  maxShippingDiscount?: number
  startedAt: string
  expiredAt: string
  status: VoucherStatus
}

export interface VoucherUpdateRequest {
  voucherCode: string
  startedAt: string
  expiredAt: string
  status: VoucherStatus
}

export interface VoucherStatusRequest {
  voucherCode: string
  status: VoucherStatus
}

export interface VoucherCheckRequest {
  voucherCode: string
  totalAmount?: number
  shopAmount?: number
}

export interface PaginationResponse<T> {
  data: T[]
  totalAmount: number
  totalPage: number
  pageNumber: number
  pageSize: number
} 