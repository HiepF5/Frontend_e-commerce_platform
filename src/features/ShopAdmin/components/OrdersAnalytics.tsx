import { Grid, Paper, Typography, Box, Card, CardContent, IconButton } from '@mui/material'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  LocalShipping,
  Cancel
} from '@mui/icons-material'
import { useState } from 'react'
import { Order } from '../types/order'

interface OrdersAnalyticsProps {
  orders: Order[]
}

export const OrdersAnalytics = ({ orders }: OrdersAnalyticsProps): JSX.Element => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('7days')
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('line')

  // Calculate summary statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const averageOrderValue = totalRevenue / totalOrders
  const cancelledOrders = orders.filter(order => order.status === 'Cancelled').length

  // Calculate status distribution
  const statusData = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Calculate daily metrics
  const dailyMetrics = orders.reduce((acc, order) => {
    const date = order.date.split('T')[0]
    if (!acc[date]) {
      acc[date] = { date, revenue: 0, orders: 0, averageOrder: 0 }
    }
    acc[date].revenue += order.total
    acc[date].orders += 1
    acc[date].averageOrder = acc[date].revenue / acc[date].orders
    return acc
  }, {} as Record<string, { date: string; revenue: number; orders: number; averageOrder: number }>)

  // Convert to array and sort by date
  const timeSeriesData = Object.values(dailyMetrics)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-getTimeRangeDays())

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  function getTimeRangeDays(): number {
    switch (timeRange) {
      case '30days':
        return 30
      case '90days':
        return 90
      default:
        return 7
    }
  }

  const SummaryCard = ({ title, value, icon, trend }: {
    title: string
    value: string | number
    icon: JSX.Element
    trend?: number
  }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="textSecondary">{title}</Typography>
          {icon}
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        {trend !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {trend >= 0 ? (
              <TrendingUp color="success" />
            ) : (
              <TrendingDown color="error" />
            )}
            <Typography
              variant="body2"
              color={trend >= 0 ? 'success.main' : 'error.main'}
              sx={{ ml: 1 }}
            >
              {Math.abs(trend)}% vs last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )

  const renderTimeSeriesChart = () => {
    const ChartComponent = {
      bar: BarChart,
      line: LineChart,
      area: AreaChart,
    }[chartType]

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          {chartType === 'area' ? (
            <>
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fill="#8884d8"
                name="Revenue ($)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#82ca9d"
                fill="#82ca9d"
                name="Orders"
              />
            </>
          ) : (
            <>
              {chartType === 'line' ? (
                <>
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    name="Revenue ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    name="Orders"
                  />
                </>
              ) : (
                <>
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    fill="#8884d8"
                    name="Revenue ($)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="orders"
                    fill="#82ca9d"
                    name="Orders"
                  />
                </>
              )}
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    )
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Revenue"
            value={`${totalRevenue.toFixed(2)}`}
            icon={<AttachMoney color="primary" />}
            trend={12.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Orders"
            value={totalOrders}
            icon={<ShoppingCart color="secondary" />}
            trend={8.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Average Order Value"
            value={`${averageOrderValue.toFixed(2)}`}
            icon={<LocalShipping color="primary" />}
            trend={-2.4}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Cancelled Orders"
            value={cancelledOrders}
            icon={<Cancel color="error" />}
            trend={-5.1}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Revenue & Orders Trend</Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={(e) => setTimeRange(e.currentTarget.value as any)}
                >
                  <select style={{ border: 'none', background: 'none' }}>
                    <option value="7days">7 Days</option>
                    <option value="30days">30 Days</option>
                    <option value="90days">90 Days</option>
                  </select>
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => setChartType(e.currentTarget.value as any)}
                >
                  <select style={{ border: 'none', background: 'none' }}>
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                    <option value="area">Area</option>
                  </select>
                </IconButton>
              </Box>
            </Box>
            {renderTimeSeriesChart()}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(statusData).map(([name, value]) => ({
                    name,
                    value,
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.entries(statusData).map((_, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Average Order Value Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageOrder"
                  stroke="#8884d8"
                  name="Average Order Value ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
} 