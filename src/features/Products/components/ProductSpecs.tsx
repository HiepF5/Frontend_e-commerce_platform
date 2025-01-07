'use client'

import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Breadcrumbs,
  Link,
  Container
} from '@mui/material'
import { ChevronRight } from 'lucide-react'
import { IProductData } from '../types/products.interface'
import ReactMarkdown from 'react-markdown'
interface ProductDetailProps {
  product?: IProductData
}

export default function ProductSpecs({ product }: ProductDetailProps) {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          CHI TIẾT SẢN PHẨM
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component='th' sx={{ width: '30%', border: 'none' }}>
                Yêu thích
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                {product?.favoritesCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          MÔ TẢ SẢN PHẨM
        </Typography>

        <ReactMarkdown >
          {product?.description}
        </ReactMarkdown>
      </Card>
    </Container>
  )
}
