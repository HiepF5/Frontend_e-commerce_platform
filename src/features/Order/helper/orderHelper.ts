import { DeliveryMethod, OrderStatus, PaymentMethod, ShippingStatus } from "../types/order.enum"
import { OrderItemDetail } from "../types/order.interface"

// Helper function to format client info
export const parseClientInfo = (clientInfo: string): {
  name: string
  phone: string
  address: string
} => {
  const [name, phone, address] = clientInfo.split('-')
  return {
    name,
    phone,
    address
  }
}

// Helper function to format order status text
export const getOrderStatusText = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    [OrderStatus.CHO_XAC_NHAN]: 'Chờ xác nhận',
    [OrderStatus.DANG_LAY_HANG]: 'Đang lấy hàng',
    [OrderStatus.DANG_GIAO_HANG]: 'Đang giao hàng',
    [OrderStatus.GH_THANH_CONG]: 'Giao hàng thành công',
    [OrderStatus.DA_HUY]: 'Đã hủy',
    [OrderStatus.TRA_HANG]: 'Trả hàng'
  }
  return statusMap[status]
}

// Helper function to get status color
export const getOrderStatusColor = (status: OrderStatus): string => {
  const colorMap: Record<OrderStatus, string> = {
    [OrderStatus.CHO_XAC_NHAN]: 'warning',
    [OrderStatus.DANG_LAY_HANG]: 'info',
    [OrderStatus.DANG_GIAO_HANG]: 'primary',
    [OrderStatus.GH_THANH_CONG]: 'success',
    [OrderStatus.DA_HUY]: 'error',
    [OrderStatus.TRA_HANG]: 'secondary'
  }
  return colorMap[status]
}

// Helper function to format delivery method text
export const getDeliveryMethodText = (method: DeliveryMethod): string => {
  const methodMap: Record<DeliveryMethod, string> = {
    [DeliveryMethod.GHN]: 'Giao hàng nhanh',
    [DeliveryMethod.GHTK]: 'Giao hàng tiết kiệm',
    [DeliveryMethod.NINJA_VAN]: 'Ninja Van'
  }
  return methodMap[method]
}

// Helper function to format payment method text
export const getPaymentMethodText = (method: PaymentMethod): string => {
  const methodMap: Record<PaymentMethod, string> = {
    [PaymentMethod.THANH_TOAN_KHI_GIAO_HANG]: 'Thanh toán khi nhận hàng',
    [PaymentMethod.THANH_TOAN_ONLINE]: 'Thanh toán online'
  }
  return methodMap[method]
}

// Helper function to format shipping status text
export const getShippingStatusText = (status: ShippingStatus): string => {
  const statusMap: Record<ShippingStatus, string> = {
    [ShippingStatus.PENDING]: 'Chờ lấy hàng',
    [ShippingStatus.PICKED_UP]: 'Đã lấy hàng',
    [ShippingStatus.IN_TRANSIT]: 'Đang vận chuyển',
    [ShippingStatus.DELIVERED]: 'Đã giao hàng',
    [ShippingStatus.FAILED]: 'Giao hàng thất bại'
  }
  return statusMap[status]
}

// Helper function to get shipping status color
export const getShippingStatusColor = (status: ShippingStatus): string => {
  const colorMap: Record<ShippingStatus, string> = {
    [ShippingStatus.PENDING]: 'warning',
    [ShippingStatus.PICKED_UP]: 'info',
    [ShippingStatus.IN_TRANSIT]: 'primary',
    [ShippingStatus.DELIVERED]: 'success',
    [ShippingStatus.FAILED]: 'error'
  }
  return colorMap[status]
}

// Helper function to calculate total amount
export const calculateTotal = (items: OrderItemDetail[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
} 
// Helper function to parse product images
export const parseProductImages = (imageJson: string): string[] => {
  try {
    return JSON.parse(imageJson)
  } catch {
    return []
  }
}