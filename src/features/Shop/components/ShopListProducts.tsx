import { Box, Grid, Typography } from '@mui/material'
import ProductItem from '@features/Products/components/ProductItem'
import { useParams } from 'react-router-dom'
import { useGetListProductQuery } from '@features/Products/api/productApi'
import { IProduct } from '~/types/products.interface'
import { useEffect, useState } from 'react'
// import { useGetShopRecommendedQuery } from '@features/Products/api/productApi'

const ShopListProducts = () => {
  const { shopId } = useParams()
  console.log(shopId)
  const [products, setProducts] = useState<IProduct[]>([])
    const { data, isLoading } = useGetListProductQuery({
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
    console.log(products)
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h6' gutterBottom>
        Gợi ý cho bạn
      </Typography>

      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={`${product.productId}-${index}`}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          Danh mục nổi bật
        </Typography>
        {/* Add featured categories grid/list */}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          Thương hiệu nổi bật
        </Typography>
        {/* Add featured brands grid/list */}
      </Box>
    </Box>
  )
}

export default ShopListProducts
