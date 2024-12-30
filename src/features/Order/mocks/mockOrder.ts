import { DeliveryMethod, OrderStatus, PaymentMethod, ShippingStatus } from "../types/order.enum";
import { OrderDetail } from "../types/order.interface";

export const mockOrder: OrderDetail = {
  id: 1,
  orderShopCode: "ORD-2024-001",
  orderStatus: OrderStatus.DANG_GIAO,
  totalProduct: 3,
  shopShippingFee: 30000,
  shopDiscount: 50000,
  serviceFee: 10000,
  shopTotalAmount: 580000,
  ecommerceTotalAmount: 590000,
  deliveryMethod: DeliveryMethod.GHN,
  paymentMethod: PaymentMethod.THANH_TOAN_KHI_GIAO_HANG,
  isPayment: false,
  createdAt: "2024-01-30T10:00:00Z",
  shippingDto: {
    id: 1,
    clientAddress: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
    clientTelephone: "0901234567",
    clientName: "Nguyễn Văn A",
    shippingId: "SHP001",
    method: DeliveryMethod.GHN,
    status: ShippingStatus.IN_TRANSIT,
    trackingCode: 123456789,
    carrier: "GHN Express",
    shippingDate: "2024-01-31T08:00:00Z",
    deliveryDate: "2024-02-02T17:00:00Z",
    shippingFee: 30000
  },
  itemDtoList: [
    {
      id: 1,
      productId: 101,
      variantId: 1001,
      productTitle: "Áo thun nam",
      variantName: "Màu đen - Size L",
      productImage: JSON.stringify(["/placeholder.svg"]),
      quantity: 2,
      price: 200000,
      description: "Áo thun cotton 100%"
    },
    {
      id: 2,
      productId: 102,
      variantId: 1002,
      productTitle: "Quần jean nam",
      variantName: "Màu xanh - Size 32",
      productImage: JSON.stringify(["/placeholder.svg"]),
      quantity: 1,
      price: 400000,
      description: "Quần jean cao cấp"
    }
  ],
  historyDtoList: [
    {
      id: 1,
      event: OrderStatus.DA_GIAO,
      description: "Đơn hàng được tạo",
      note: "2024-01-30T10:00:00Z"
    },
    {
      id: 2,
      event: OrderStatus.CHO_XAC_NHAN,
      description: "Đơn hàng đang được xử lý",
      note: "2024-01-30T10:30:00Z"
    }
  ]
}

