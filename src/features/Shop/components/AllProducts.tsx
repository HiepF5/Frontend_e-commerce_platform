import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton
} from '@mui/material'
import {
  ViewModule,
  ViewList,
  Compare,
  Share
} from '@mui/icons-material'
import ProductItem from '@features/Products/components/ProductItem'
import { useParams } from 'react-router-dom'
import { useGetListProductQuery } from '@features/Products/api/productApi'
import { ProductSkeleton } from './common/ProductSkeleton'
import { ProductFilters } from './common/ProductFilters'
import { useInView } from 'react-intersection-observer'
import { IProduct } from '~/types/products.interface'

const AllProducts = () => {
  const { shopId } = useParams()
  console.log(shopId)
  const [sortBy, setSortBy] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const { ref, inView } = useInView({
    threshold: 0.1
  })

  const [products, setProducts] = useState<IProduct[]>([])
  const { data, isLoading, refetch } = useGetListProductQuery({
    pageNumber: page,
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

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1) // Tăng số trang khi cuộn xuống
      refetch()
    }
  }, [inView])

  const handleFilterChange = () => {
    setSelectedProducts([]) // Reset sản phẩm đã chọn khi thay đổi filter
    setPage(1) // Reset về trang đầu khi thay đổi filter
    setProducts([]) // Xóa sản phẩm cũ để tải mới
  }

  const handleCompare = () => {
    // Xử lý logic so sánh sản phẩm
  }

  const handleShare = () => {
    // Xử lý logic chia sẻ sản phẩm
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          size='small'
          placeholder='Tìm kiếm sản phẩm...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size='small' sx={{ width: 200 }}>
            <InputLabel>Sắp xếp theo</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value='newest'>Mới nhất</MenuItem>
              <MenuItem value='price-asc'>Giá tăng dần</MenuItem>
              <MenuItem value='price-desc'>Giá giảm dần</MenuItem>
              <MenuItem value='bestseller'>Bán chạy</MenuItem>
            </Select>
          </FormControl>

          <IconButton onClick={() => setViewMode('grid')}>
            <ViewModule color={viewMode === 'grid' ? 'primary' : 'inherit'} />
          </IconButton>
          <IconButton onClick={() => setViewMode('list')}>
            <ViewList color={viewMode === 'list' ? 'primary' : 'inherit'} />
          </IconButton>

          {selectedProducts.length > 0 && (
            <>
              <Button startIcon={<Compare />} onClick={handleCompare}>
                So sánh ({selectedProducts.length})
              </Button>
              <Button startIcon={<Share />} onClick={handleShare}>
                Chia sẻ
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Filters sidebar */}
        <Grid item xs={12} md={3}>
          <ProductFilters onFilterChange={handleFilterChange} />
        </Grid>

        {/* Product grid */}
        <Grid item xs={12} md={9}>
          {isLoading && page === 1 ? (
            <ProductSkeleton />
          ) : products.length === 0 ? (
            <Typography>Không tìm thấy sản phẩm nào</Typography>
          ) : (
            <>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={viewMode === 'list' ? 12 : 6}
                    md={viewMode === 'list' ? 12 : 4}
                    key={product.productId}
                  >
                    <ProductItem
                      product={product}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box ref={ref} /> {/* Infinite scroll trigger */}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default AllProducts
