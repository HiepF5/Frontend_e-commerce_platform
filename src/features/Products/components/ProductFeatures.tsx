'use client'

import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import { Shield, Truck, Award, MapPin } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Thương hiệu đảm bảo',
    description: 'Nhập khẩu, bảo hành chính hãng'
  },
  {
    icon: Truck,
    title: 'Đổi trả dễ dàng',
    description: 'Theo chính sách đổi trả tại FPT Shop'
  },
  {
    icon: Award,
    title: 'Sản phẩm chất lượng',
    description: 'Đảm bảo tương thích và độ bền cao'
  },
  {
    icon: MapPin,
    title: 'Giao hàng tận nơi',
    description: 'Tại 63 tỉnh thành'
  }
]

export default function ProductFeatures() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box sx={{ color: 'error.main', mb: 2 }}>
                <feature.icon size={24} />
              </Box>
              <Typography variant='subtitle1' gutterBottom fontWeight='bold'>
                {feature.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
