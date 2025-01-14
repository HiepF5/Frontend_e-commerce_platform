import { Box, Grid, Typography, Chip } from '@mui/material'
import ProductItem from '@features/Products/components/ProductItem'
import { useParams } from 'react-router-dom'
import { IProduct } from '~/types/products.interface'
import { useEffect, useState } from 'react'
import { useGetListProductQuery } from '@features/Products/api/productApi'
// import { useGetShopSaleProductsQuery } from '@features/Products/api/productApi'

const SaleShock = () => {
  const { shopId } = useParams()
  console.log(shopId)
  // const { data: products, isLoading } = useGetShopSaleProductsQuery(shopId)
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
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>Flash Sale</Typography>
        <Chip 
          color="error" 
          label="Đang diễn ra" 
          sx={{ mr: 1 }}
        />
        <Typography variant="body2" color="text.secondary">
          Kết thúc trong: 02:45:30
        </Typography>
      </Box>

      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Grid container spacing={2}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.productId}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default SaleShock 