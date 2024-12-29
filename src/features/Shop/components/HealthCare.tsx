import { Box, Grid, Typography, Breadcrumbs, Link, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material'
import ProductItem from '@features/Products/components/ProductItem'
import { useParams } from 'react-router-dom'
import { LocalHospital, Healing, Favorite, FitnessCenter, Restaurant } from '@mui/icons-material'
import { ProductSkeleton } from './common/ProductSkeleton'
import { IProduct } from '~/types/products.interface'
import { useEffect, useState } from 'react'
import { useGetListProductQuery } from '@features/Products/api/productApi'
const healthCategories = [
  {
    id: 1,
    name: 'Thực phẩm chức năng',
    icon: <Restaurant />,
    count: 120
  },
  {
    id: 2, 
    name: 'Dụng cụ y tế',
    icon: <LocalHospital />,
    count: 85
  },
  {
    id: 3,
    name: 'Chăm sóc sức khỏe',
    icon: <Healing />,
    count: 95
  },
  {
    id: 4,
    name: 'Thể thao & Fitness',
    icon: <FitnessCenter />,
    count: 75
  },
  {
    id: 5,
    name: 'Sản phẩm hỗ trợ',
    icon: <Favorite />,
    count: 65
  }
]

const HealthCare = () => {
  const { shopId } = useParams()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

const [products, setProducts] = useState<IProduct[]>([])
  const { data, isLoading, refetch } = useGetListProductQuery({
    pageNumber: 1,
    pageSize: 40
  })

  useEffect(() => {
    if (data && data.data) {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...(Array.isArray(data.data) ? data.data : [])
      ])
    }
  }, [data])

  return (
    <Box sx={{ mt: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline='hover' color='inherit' href='#'>
          Tất cả danh mục
        </Link>
        <Typography color='text.primary'>Bảo vệ sức khỏe</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        {/* Sidebar categories */}
        <Grid item xs={12} md={3}>
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
            <Typography variant='subtitle1' gutterBottom fontWeight='bold'>
              Danh Mục Sức Khỏe
            </Typography>

            <List>
              {healthCategories.map((category) => (
                <ListItem
                  key={category.id}
                  component="li"
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light'
                      }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {category.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    secondary={
                      <Chip
                        size='small'
                        label={`${category.count} sản phẩm`}
                        sx={{ mt: 0.5 }}
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle1' gutterBottom fontWeight='bold'>
                Chứng nhận & Giấy phép
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label='FDA Approved' color='success' size='small' />
                <Chip label='GMP' color='primary' size='small' />
                <Chip label='ISO 9001' color='info' size='small' />
                <Chip label='Halal' size='small' />
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle1' gutterBottom fontWeight='bold'>
                Xuất xứ
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label='Việt Nam' size='small' />
                <Chip label='Mỹ' size='small' />
                <Chip label='Nhật Bản' size='small' />
                <Chip label='Hàn Quốc' size='small' />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Products grid */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h6' gutterBottom>
              {selectedCategory
                ? healthCategories.find((c) => c.id === selectedCategory)?.name
                : 'Tất cả sản phẩm sức khỏe'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Các sản phẩm chăm sóc sức khỏe chất lượng cao, đã được kiểm định
              và chứng nhận an toàn
            </Typography>
          </Box>

          {isLoading ? (
            <ProductSkeleton />
          ) : products?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color='text.secondary'>
                Không tìm thấy sản phẩm nào trong danh mục này
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {products?.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.productId}>
                  <ProductItem product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default HealthCare 