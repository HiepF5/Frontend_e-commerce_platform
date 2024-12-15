import { Order } from '../types/order'

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    date: '2024-03-15',
    status: 'Processing',
    total: 299.99,
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    items: [
      {
        productName: 'Gaming Laptop',
        quantity: 1,
        price: 299.99
      }
    ]
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    date: '2024-03-14',
    status: 'Delivered',
    total: 159.98,
    phone: '+0987654321',
    address: '456 Oak St, Town, Country',
    items: [
      {
        productName: 'Wireless Mouse',
        quantity: 2,
        price: 29.99
      },
      {
        productName: 'Keyboard',
        quantity: 1,
        price: 99.99
      }
    ]
  },
  {
    id: 'ORD003',
    customerName: 'Bob Wilson',
    date: '2024-03-13',
    status: 'Shipped',
    total: 499.95,
    phone: '+1122334455',
    address: '789 Pine St, Village, Country',
    items: [
      {
        productName: 'iPhone Case',
        quantity: 3,
        price: 19.99
      },
      {
        productName: 'iPad Pro',
        quantity: 1,
        price: 439.98
      }
    ]
  },
  {
    id: 'ORD004',
    customerName: 'Alice Brown',
    date: '2024-03-12',
    status: 'Cancelled',
    total: 89.97,
    phone: '+9988776655',
    address: '321 Elm St, County, Country',
    items: [
      {
        productName: 'Headphones',
        quantity: 1,
        price: 89.97
      }
    ]
  },
  {
    id: 'ORD005',
    customerName: 'Charlie Davis',
    date: '2024-03-11',
    status: 'Processing',
    total: 1299.99,
    phone: '+5544332211',
    address: '654 Maple St, District, Country',
    items: [
      {
        productName: 'MacBook Air',
        quantity: 1,
        price: 1299.99
      }
    ]
  },
  ...Array.from({ length: 100 }, (_, i) => ({
    id: `ORD${(i + 6).toString().padStart(3, '0')}`,
    customerName: `Customer ${i + 1}`,
    date: `2024-03-${(10 - i % 10).toString().padStart(2, '0')}`,
    status: ['Processing', 'Delivered', 'Shipped', 'Cancelled'][i % 4],
    total: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
    phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    address: `${Math.floor(Math.random() * 1000)} Random St, City ${i + 1}, Country`,
    items: Array.from({ length: Math.ceil(Math.random() * 3) }, (_, j) => ({
      productName: `Product ${i + j + 1}`,
      quantity: Math.ceil(Math.random() * 5),
      price: parseFloat((Math.random() * 100 + 10).toFixed(2))
    }))
  }))
].flat();


// Pagination helper
export const getPaginatedOrders = (
  page: number,
  limit: number,
  filters?: {
    search?: string
    status?: string
    startDate?: string
    endDate?: string
  }
) => {
  console.log("mockOrders",mockOrders)
  let filteredOrders = [...mockOrders]

  // Apply filters
  if (filters) {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredOrders = filteredOrders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm) ||
        order.id.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      filteredOrders = filteredOrders.filter(order =>
        order.status.toLowerCase() === filters.status!.toLowerCase()
      )
    }

    if (filters.startDate) {
      filteredOrders = filteredOrders.filter(order =>
        new Date(order.date) >= new Date(filters.startDate!)
      )
    }

    if (filters.endDate) {
      filteredOrders = filteredOrders.filter(order =>
        new Date(order.date) <= new Date(filters.endDate!)
      )
    }
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  return {
    orders: paginatedOrders,
    totalPages: Math.ceil(filteredOrders.length / limit),
    totalOrders: filteredOrders.length
  }
}

// Analytics helpers
export const getOrderAnalytics = () => {
  const totalOrders = mockOrders.length
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const averageOrderValue = totalRevenue / totalOrders

  const statusCounts = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    statusCounts
  }
} 