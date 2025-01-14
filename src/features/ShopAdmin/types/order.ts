export interface OrderItem {
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerName: string
  date: string
  status: string
  total: number
  items: OrderItem[]
  address: string
  phone: string
} 
//thong ke
export interface ShopOverviewResponse {
  orderPending: number;
  orderProcessing: number;
  orderCancelled: number;
  orderCompleted: number;
  orderDelivery: number;
  lockedProduct: number;
  soldOutProduct: number;
}
export interface MonthlyReport {
  months: string[]; // Danh sách các tháng
  completedOrders: number[]; // Số lượng đơn hoàn thành theo tháng
  returnOrders: number[]; // Số lượng đơn trả hàng theo tháng
}

export interface FinancialOverview {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  revenuePercentageChange: string;
  costPercentageChange: string;
  profitPercentageChange: string;
}
export interface FeeOverview {
  totalShippingFree: number;  // Tổng phí vận chuyển miễn phí
  totalDiscountFee: number;  // Tổng phí giảm giá
  totalServiceFree: number;  // Tổng phí dịch vụ miễn phí
  totalAmount: number;       // Tổng số tiền
}
