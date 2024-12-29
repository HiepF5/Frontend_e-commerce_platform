import { Box, Grid, Typography, Tabs, Tab } from '@mui/material'
import ProductItem from '@features/Products/components/ProductItem'
import { useParams } from 'react-router-dom'
// import { useGetShopBestSellerQuery } from '@features/Products/api/productApi'
import { IProduct } from '~/types/products.interface'
import { useEffect, useState } from 'react'
import { useGetListProductQuery } from '@features/Products/api/productApi'
const BestSeller = () => {
  const { shopId } = useParams()
  const [timeRange, setTimeRange] = useState('week')
  
  // const { data: products, isLoading } = useGetShopBestSellerQuery({
  //   shopCode: shopId,
  //   timeRange
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={timeRange} 
          onChange={(e, v) => setTimeRange(v)}
        >
          <Tab label="Tuần này" value="week" />
          <Tab label="Tháng này" value="month" />
          <Tab label="Mọi thời điểm" value="all" />
        </Tabs>
      </Box>

      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Grid container spacing={2}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.productId}>
              <ProductItem 
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default BestSeller 