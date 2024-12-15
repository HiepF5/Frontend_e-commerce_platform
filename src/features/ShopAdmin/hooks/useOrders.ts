import { useState, useEffect } from 'react'
import { getPaginatedOrders, getOrderAnalytics } from '../mocks/ordersData'
import { Order } from '../types/order'

interface UseOrdersProps {
  page: number
  limit: number
  search?: string
  status?: string
  startDate?: string | null
  endDate?: string | null
}

interface OrdersData {
  orders: Order[]
  totalPages: number
  totalOrders: number
  isLoading: boolean
  error: string | null
}

export const useOrders = ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate
}: UseOrdersProps): OrdersData => {
  const [data, setData] = useState<OrdersData>({
    orders: [],
    totalPages: 0,
    totalOrders: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      try {
        setData(prev => ({ ...prev, isLoading: true }))
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = getPaginatedOrders(page, limit, {
          search,
          status,
          startDate: startDate ?? undefined,
          endDate: endDate ?? undefined
        })

        setData({
          orders: result.orders,
          totalPages: result.totalPages,
          totalOrders: result.totalOrders,
          isLoading: false,
          error: null
        })
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch orders'
        }))
      }
    }

    fetchOrders()
  }, [page, limit, search, status, startDate, endDate])

  return data
}

export const useOrderAnalytics = () => {
  interface AnalyticsData {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    statusCounts: Record<string, number>;
  }
  
  const [data, setData] = useState<{
    analytics: AnalyticsData | null;
    isLoading: boolean;
    error: string | null;
  }>({
    analytics: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const analytics = getOrderAnalytics()
        setData({
          analytics,
          isLoading: false,
          error: null
        })
      } catch (error) {
        setData({
          analytics: null,
          isLoading: false,
          error: 'Failed to fetch analytics'
        })
      }
    }

    fetchAnalytics()
  }, [])

  return data
} 