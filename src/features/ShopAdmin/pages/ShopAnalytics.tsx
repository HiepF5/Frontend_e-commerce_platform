import { Grid, Paper, Typography, Box } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import {
  useGetMonthlyDataQuery,
  useGetOrderStatusDataQuery,
  useGetCategoryPerformanceQuery,
} from '../store/analyticsApi'
import { DrilldownChart } from '../components/DrilldownChart'
import { PeriodComparison } from '../components/PeriodComparison'

const ShopAnalytics = (): JSX.Element => {
  const { data: monthlyData, isLoading: isLoadingMonthly } = useGetMonthlyDataQuery()
  const { data: orderStatusData, isLoading: isLoadingStatus } = useGetOrderStatusDataQuery()
  const { data: categoryPerformance, isLoading: isLoadingCategory } = useGetCategoryPerformanceQuery()

  if (isLoadingMonthly || isLoadingStatus || isLoadingCategory) {
    return <Box>Loading analytics data...</Box>
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  // Dummy data for daily metrics
  const dailyMetrics = [
    { date: '2023-01-01', revenue: 1000, orders: 10 },
    { date: '2023-01-02', revenue: 1500, orders: 15 },
    // Add more data as needed
  ]

  const getDrilldownData = (item: any) => {
    // Example: Drill down from monthly to daily data
    if (item.month) {
      return {
        name: `Daily Data for ${item.month}`,
        data: dailyMetrics
          .filter((metric) => {
            const metricMonth = new Date(metric.date).toLocaleString('default', { month: 'short' })
            return metricMonth === item.month
          })
          .map((metric) => ({
            date: new Date(metric.date).getDate(),
            revenue: metric.revenue,
            orders: metric.orders,
          })),
      }
    }
    return { name: '', data: [] }
  }

  // Dummy data for time series
  const timeSeriesData = [
    { date: '2023-01-01', revenue: 1000 },
    { date: '2023-01-02', revenue: 1500 },
    // Add more data as needed
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
      </Grid>

      {/* Revenue Trend */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Revenue & Orders Trend
          </Typography>
          <LineChart width={1000} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
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
          </LineChart>
        </Paper>
      </Grid>

      {/* Order Status Distribution */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Status Distribution
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={400} height={300}>
              <Pie
                data={orderStatusData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatusData && orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        </Paper>
      </Grid>

      {/* Category Performance */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Category Performance
          </Typography>
          <BarChart width={400} height={300} data={categoryPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Units Sold" />
            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
          </BarChart>
        </Paper>
      </Grid>

      {/* Customer Growth */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            New Customer Growth
          </Typography>
          <LineChart width={1000} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#ff7300"
              name="New Customers"
            />
          </LineChart>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <DrilldownChart
          title="Monthly Revenue Breakdown"
          initialData={monthlyData || []}
          getDrilldownData={getDrilldownData}
          dataKey="month"
          valueKey="revenue"
        />
      </Grid>

      <Grid item xs={12}>
        <PeriodComparison
          currentPeriodData={timeSeriesData}
          previousPeriodData={timeSeriesData.map(item => ({
            ...item,
            date: new Date(item.date).setMonth(new Date(item.date).getMonth() - 1),
          }))}
          title="Period Comparison"
          dataKey="date"
          valueKey="revenue"
          periodOptions={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default ShopAnalytics 