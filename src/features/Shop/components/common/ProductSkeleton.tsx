import { Box, Skeleton, Grid } from '@mui/material'

interface ProductSkeletonProps {
  count?: number
}

export const ProductSkeleton = ({ count = 8 }: ProductSkeletonProps) => {
  return (
    <Grid container spacing={2}>
      {Array(count).fill(0).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton height={24} sx={{ mt: 1 }} />
            <Skeleton height={24} width="60%" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Skeleton width={80} />
              <Skeleton width={60} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
} 