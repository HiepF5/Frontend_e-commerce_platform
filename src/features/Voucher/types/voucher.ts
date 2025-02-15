export type VoucherType = 'DISCOUNT' | 'SHIPPING'
export type DiscountType = 'PERCENT' | 'AMOUNT'
export type VoucherStatus = 'ENABLE' | 'DISABLE' | 'EXPIRED' |'WAIT' |'DELETED'

export interface Voucher {
  id : number
  type: VoucherType
  discountType: DiscountType
  voucherCode: string
  description: string
  title: string
  voucherCount: number
  remainingCount: number
  discountValue?: number
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


export interface GetCustomerVouchersParams {
  type : VoucherType
  page_number: number;
  page_size: number;
}
export interface GetGuestSystemVouchers {
  page_number: string;
  page_size: string;
}
export interface GetGuestShopVouchers{
  shop_code: string
  page_number: string;
  page_size: string;
}
export interface VoucherRequest {
  voucherCode: string | null
  totalAmount: number
  pageNumber: number
  pageSize: number
}
export interface VoucherShopRequest {
  shopCode?: string
  voucherCode: string | null
  totalAmount: number
  pageNumber: number
  pageSize: number
}