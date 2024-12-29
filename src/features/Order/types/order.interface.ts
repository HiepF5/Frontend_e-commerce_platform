import { DeliveryMethod, OrderStatus, PaymentMethod, ShippingStatus } from "./order.enum"

export interface OrderItem {
  name: string
  quantity: number
  price: number
  image: string
}

export interface Shop {
  name: string
  avatar: string
  id: string
}
export interface OrderRequest {
  orderCode: string | null;
  status: string | null;
  sort: string | null;
  pageNumber: number;
  pageSize: number;
}
export interface OrderShopRequest {  
  orderCode: string | null;
  orderStatus: string | null;
  userFullName: string | null;
  phoneNumber: string | null;
  address: string | null;
  sort: string | null;
  startDate: string | null; // ISO date string
  endDate: string | null; // ISO date string
  pageNumber: number;
  pageSize: number;
}
export interface OrderAdminRequest {
  orderCode: string | null;
  status: string | null;
  sort: string | null;
  paymentMethod: string | null;
  isPayment: boolean | null;
  startDate: string | null; // ISO date string
  endDate: string | null;   // ISO date string
  pageNumber: number;
  pageSize: number;
}
export interface Order {
  id: string
  status: string
  date: string
  shop: Shop
  items: OrderItem[]
  total: number
  customer?: {
    name: string
    phone: string
    address: string
  }
  payment?: {
    method: string
    subtotal: number
    shipping: number
    shippingDiscount: number
    voucher: number
    total: number
  }
}

export interface OrderListItem {
  id: number
  shopName: string
  shopLogo: string
  shopCode: string
  orderShopCode: string
  orderStatus: OrderStatus
  totalProduct: number
  shopShippingFee: number
  shopDiscount: number
  serviceFee: number
  shopTotalAmount: number
  ecommerceTotalAmount: number
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  isPayment: boolean
  clientInfo: string
  createdAt: string
}


export interface OrderDetail {
  id: number
  orderShopCode: string
  orderStatus: OrderStatus
  totalProduct: number
  shopShippingFee: number
  shopDiscount: number
  serviceFee: number
  shopTotalAmount: number
  ecommerceTotalAmount: number
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  isPayment: boolean
  createdAt: string
  shippingDto: ShippingInfo
  itemDtoList: OrderItemDetail[]
  historyDtoList: OrderHistory[]
}

export interface ShippingInfo {
  id: number
  clientAddress: string
  clientTelephone: string
  clientName: string
  shippingId: string | null
  method: DeliveryMethod
  status: ShippingStatus
  trackingCode: number
  carrier: string
  shippingDate: string | null
  deliveryDate: string
  shippingFee: number
}

export interface OrderItemDetail {
  id: number
  productId: number
  variantId: number
  productTitle: string
  variantName: string
  productImage: string // This is a JSON string of image URLs
  quantity: number
  price: number
  description: string | null
}

export interface OrderHistory {
  id: number
  event: string
  description: string
  note: string | null
}



///admin

export interface OrderDataAdmin {
  id: number;
  orderCode: string;
  status: string;
  totalFee: number;
  totalShipping: number;
  totalDiscount: number;
  totalAmount: number;
  ecommerceServiceFee: number;
  deliveryMethod: string;
  clientInfo: string;
  paymentMethod: string;
  isPayment: boolean;
  createdAt: string;
  listOrderPayment: OrderPaymentAdmin[];
  listOrderShop: OrderShopAdmin[];
}

interface OrderPaymentAdmin {
  id: number;
  method: string;
  amount: number;
  status: string;
  transactionCode: string;
  transactionNote: string | null;
  startDate: string;
  expiryDate: string;
}

interface OrderShopAdmin {
  id: number;
  shopName: string;
  shopLogo: string;
  shopCode: string;
  orderShopCode: string;
  orderStatus: string;
  totalProduct: number;
  shopShippingFee: number;
  shopDiscount: number;
  serviceFee: number;
  shopTotalAmount: number;
  ecommerceTotalAmount: number;
  deliveryMethod: string;
  paymentMethod: string;
  isPayment: boolean;
  clientInfo: string;
  createdAt: string;
}
//shop
export interface OrderShop {
  id: number;
  orderCode: string;
  status: string;
  totalFee: number;
  totalShipping: number;
  totalDiscount: number;
  totalAmount: number;
  ecommerceServiceFee: number;
  deliveryMethod: string;
  clientInfo: string;
  paymentMethod: string;
  isPayment: boolean;
  createdAt: string;
}