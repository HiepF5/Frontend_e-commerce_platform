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