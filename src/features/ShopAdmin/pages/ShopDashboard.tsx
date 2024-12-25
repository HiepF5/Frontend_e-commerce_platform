import { Grid, Paper, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'

const ShopDashboard = (): JSX.Element => {
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
    { name: 'Product A', sales: 150 },
    { name: 'Product B', sales: 120 },
    { name: 'Product C', sales: 90 },
    { name: 'Product D', sales: 60 },
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Shop Dashboard
        </Typography>
      </Grid>

      {/* Statistics Cards */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Today's Revenue
          </Typography>
          <Typography variant="h4">$1,350</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Today's Orders
          </Typography>
          <Typography variant="h4">25</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Active Products
          </Typography>
          <Typography variant="h4">48</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Pending Orders
          </Typography>
          <Typography variant="h4">12</Typography>
        </Paper>
      </Grid>

      {/* Revenue Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Revenue & Orders Overview
          </Typography>
          <LineChart width={700} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue ($)" />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
          </LineChart>
        </Paper>
      </Grid>

      {/* Top Products */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Top Selling Products
          </Typography>
          <BarChart width={300} height={300} data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Units Sold" />
          </BarChart>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ShopDashboard 