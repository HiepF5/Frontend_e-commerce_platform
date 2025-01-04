import { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import { CheckCircle as ApproveIcon, Block as RejectIcon, Visibility as ViewIcon } from '@mui/icons-material'

interface Product {
  id: number
  name: string
  price: number
  shopName: string
  status: string
  image: string
  description: string
}

const ProductManagement = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      shopName: 'Shop A',
      status: 'Pending',
      image: 'https://via.placeholder.com/150',
      description: 'Product description here...'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      shopName: 'Shop B',
      status: 'Approved',
      image: 'https://via.placeholder.com/150',
      description: 'Another product description...'
    },
  ])

  const handleView = (product: Product): void => {
    setSelectedProduct(product)
    setOpen(true)
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Product Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.shopName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Chip
                    label={product.status}
                    color={
                      product.status === 'Approved'
                        ? 'success'
                        : product.status === 'Pending'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<ViewIcon />}
                    size="small"
                    onClick={() => handleView(product)}
                  >
                    View
                  </Button>
                  <Button
                    startIcon={<ApproveIcon />}
                    size="small"
                    color="success"
                    disabled={product.status === 'Approved'}
                  >
                    Approve
                  </Button>
                  <Button
                    startIcon={<RejectIcon />}
                    size="small"
                    color="error"
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={selectedProduct.image}
                    alt={selectedProduct.name}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{selectedProduct.name}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Shop: {selectedProduct.shopName}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {selectedProduct.price}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {selectedProduct.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<ApproveIcon />}
          >
            Approve Product
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<RejectIcon />}
          >
            Reject Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductManagement 