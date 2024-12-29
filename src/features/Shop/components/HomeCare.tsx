import { Box, Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import ProductItem from '@features/Products/components/ProductItem'
import { useParams } from 'react-router-dom'
import { IProduct } from '~/types/products.interface'
import { useEffect, useState } from 'react'
import { useGetListProductQuery } from '@features/Products/api/productApi'
const HomeCare = () => {
  const { shopId } = useParams()
  // const { data: products, isLoading } = useGetShopCategoryProductsQuery({
  //   shopCode: shopId,
  //   category: 'home-care'
  // })
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
        <Link underline="hover" color="inherit" href="#">
          Tất cả danh mục
        </Link>
        <Typography color="text.primary">Giặt giũ & Chăm sóc nhà cửa</Typography>
      </Breadcrumbs>

      <Grid container spacing={2}>
        {/* Sidebar categories */}
        <Grid item xs={12} md={3}>
          <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Danh mục con
            </Typography>
            {/* Add subcategories list */}
          </Box>
        </Grid>

        {/* Products grid */}
        <Grid item xs={12} md={9}>
          {isLoading ? (
            <Box>Loading...</Box>
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

export default HomeCare 