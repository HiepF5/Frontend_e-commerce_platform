import { Box, Paper, Typography, Grid } from '@mui/material'
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
  Cell
} from 'recharts'

export default function OrderStats() {
  // Mock data
  const monthlyData = [
    { month: 'T1', orders: 65, total: 1200000 },
    { month: 'T2', orders: 59, total: 1100000 },
    { month: 'T3', orders: 80, total: 1500000 },
    { month: 'T4', orders: 81, total: 1600000 },
    { month: 'T5', orders: 56, total: 1000000 },
    { month: 'T6', orders: 55, total: 950000 },
  ]

  const statusData = [
    { name: 'Hoàn thành', value: 400 },
    { name: 'Đang giao', value: 300 },
    { name: 'Đã hủy', value: 100 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FF8042']

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Thống kê đơn hàng</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Đơn hàng theo tháng</Typography>
            <LineChart
              width={700}
              height={300}
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#8884d8"
                name="Số đơn"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                name="Doanh thu"
              />
            </LineChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Trạng thái đơn hàng</Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={statusData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {statusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
} 