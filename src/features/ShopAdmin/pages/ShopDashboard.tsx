import { Grid, Paper, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'
import { useGetShopOverviewQuery } from '../api/shopAdminApi'

const ShopDashboard = (): JSX.Element => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  console.log(user.shop_id)
  const { data: overview } = useGetShopOverviewQuery(user.shop_id)
  console.log(overview)
  const overviewData = [
    {
      title: 'Pending Orders',
      value: overview?.orderPending || 0,
      color: '#FFCDD2'
    },
    {
      title: 'Processing Orders',
      value: overview?.orderProcessing || 0,
      color: '#FFE082'
    },
    {
      title: 'Cancelled Orders',
      value: overview?.orderCancelled || 0,
      color: '#E57373'
    },
    {
      title: 'Completed Orders',
      value: overview?.orderCompleted || 0,
      color: '#81C784'
    },
    {
      title: 'Delivery Orders',
      value: overview?.orderDelivery || 0,
      color: '#64B5F6'
    },
    {
      title: 'Locked Products',
      value: overview?.lockedProduct || 0,
      color: '#FFB74D'
    },
    {
      title: 'Sold Out Products',
      value: overview?.soldOutProduct || 0,
      color: '#90A4AE'
    }
  ]
  // Sample data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 2000, orders: 120 },
    { month: 'Feb', revenue: 1500, orders: 98 },
    { month: 'Mar', revenue: 1800, orders: 110 },
    { month: 'Apr', revenue: 2200, orders: 130 },
    { month: 'May', revenue: 1900, orders: 115 },
    { month: 'Jun', revenue: 2400, orders: 140 },
  ]

  const topProducts = [
    { name: 'Iphone 13', sales: 150 },
    { name: 'Iphone 12', sales: 120 },
    { name: 'Iphone 14', sales: 90 },
    { name: 'Iphone 16', sales: 60 },
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          Shop Dashboard
        </Typography>
      </Grid>

      {/* Overview Data */}
      {overviewData.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              backgroundColor: item.color,
              color: '#fff',
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Typography color='inherit' gutterBottom>
              {item.title}
            </Typography>
            <Typography variant='h4' color='inherit'>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}

      {/* Revenue Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Revenue & Orders Overview
          </Typography>
          <LineChart width={700} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='revenue'
              stroke='#8884d8'
              name='Revenue ($)'
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='orders'
              stroke='#82ca9d'
              name='Orders'
            />
          </LineChart>
        </Paper>
      </Grid>

      {/* Top Products */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Top Selling Products
          </Typography>
          <BarChart width={300} height={300} data={topProducts}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='sales' fill='#8884d8' name='Units Sold' />
          </BarChart>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ShopDashboard 