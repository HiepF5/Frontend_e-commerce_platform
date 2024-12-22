import { IAddress } from "~/types/address.interface"

// Interface cho item trong giỏ hàng khi checkout
export interface CheckoutItem {
  variantId: number
  quantity: number
}

// Interface cho giảm giá của shop (nếu có)
export interface ShopDiscount {
  shopCode: string
  voucherCode: string
}

// Enum cho phương thức thanh toán
export enum PaymentMethod {
  VNPAY = 'VNPAY',
  COD = 'COD',
  MOMO = 'MOMO'
}

// Enum cho phương thức vận chuyển
export enum ShippingMethod {
  GHN = 'GHN',
  GHTK = 'GHTK'
}

// Interface cho request submit checkout
export interface CheckoutSubmitRequest {
  discountVoucher: string | null
  shippingVoucher: string | null
  addressId: number
  paymentMethod: PaymentMethod
  shippingMethod: ShippingMethod
  items: CheckoutItem[]
  shopDiscounts: ShopDiscount[] | null
}

// Interface cho response khi submit checkout thành công
export interface CheckoutSubmitResponse {
  code: number
  message: string
  data: {
    orderId: string
    paymentUrl?: string // URL thanh toán (cho VNPAY, MOMO)
    totalAmount: number
  }
  status: number
}

// Interface cho variant của sản phẩm trong checkout
export interface CheckoutItemVariant {
  name: string
  value: string
}

// Interface cho item trong shop bill
export interface CheckoutBillItem {
  productId: number
  variantId: number
  title: string
  imageUrl: string
  variant: CheckoutItemVariant[] | null
  sellPrice: number
  quantity: number
  itemTotal: number
}

// Interface cho shop bill
export interface ShopBill {
  shopCode: string
  shopName: string
  shopLogo: string
  productTotal: number
  fee: number
  discount: number
  totalAmount: number
  leadDay: number
  leadTime: string
  voucher: string | null
  listItem: CheckoutBillItem[]
}

// Interface cho data trong response
export interface CheckoutPreviewData {
  fullName: string
  addressDto: IAddress
  itemsCount: number
  productTotal: number
  totalFee: number
  shopDiscount: number
  ecommerceDiscount: number
  ecommerceShipping: number
  totalAmount: number
  discountVoucher: string | null
  shippingVoucher: string | null
  shopBill: ShopBill[]
}
