import { Grid, Paper, Typography, Box } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'

const Dashboard = (): JSX.Element => {
  // Sample data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 198 },
    { month: 'Mar', revenue: 2000, orders: 150 },
    { month: 'Apr', revenue: 2780, orders: 190 },
    { month: 'May', revenue: 1890, orders: 140 },
    { month: 'Jun', revenue: 2390, orders: 170 },
  ]

  // Sample data for user distribution
  const userDistribution = [
    { name: 'Customers', value: 500 },
    { name: 'Shop Owners', value: 50 },
    { name: 'Admins', value: 5 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Platform Overview
        </Typography>
      </Grid>

      {/* Statistics Cards */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Total Revenue
          </Typography>
          <Typography variant="h4">$15,350</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Total Orders
          </Typography>
          <Typography variant="h4">1,088</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Active Shops
          </Typography>
          <Typography variant="h4">50</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" gutterBottom>
            Total Products
          </Typography>
          <Typography variant="h4">2,356</Typography>
        </Paper>
      </Grid>

      {/* Revenue Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Revenue Overview
          </Typography>
          <LineChart width={700} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </Paper>
      </Grid>

      {/* User Distribution */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Distribution
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={300} height={300}>
              <Pie
                data={userDistribution}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard 