'use client'

import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material'
import { IProductData } from '../types/products.interface'

interface DescriptionBoxProps {
  product?: IProductData
}

export default function DescriptionBox({ product }: DescriptionBoxProps) {
  if (!product) return null

  const specifications = [
    {
      label: 'Thương hiệu',
      value: product.productBrand?.brand
    },
    {
      label: 'Mã sản phẩm',
      value: product.shopCode
    },
    {
      label: 'Danh mục',
      value: product.productCategory?.category
    },
    {
      label: 'Đánh giá',
      value: product.rating ? `${product.rating} sao (${product.countComments} đánh giá)` : 'Chưa có đánh giá'
    },
    {
      label: 'Lượt thích',
      value: `${product.favoritesCount} lượt thích`
    },
    {
      label: 'Giá',
      value: product.minPrice === product.maxPrice 
        ? `${product.minPrice.toLocaleString()}đ`
        : `${product.minPrice.toLocaleString()}đ - ${product.maxPrice.toLocaleString()}đ`
    }
  ].filter(spec => spec.value)

  // Add product variants if they exist
  if (product.productVariant?.length > 0) {
    specifications.push({
      label: 'Phiên bản',
      value: product.productVariant
      .map(
        (variant) =>
        `${variant.attribute.map(attr => attr.name).join(', ')}: ${variant.stockCount.toLocaleString()} cái`
      )
      .join(', ')
    })
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h5' gutterBottom fontWeight='bold'>
        Thông số sản phẩm
      </Typography>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Table>
          <TableBody>
            {specifications.map((spec, index) => (
              <TableRow key={spec.label}>
                <TableCell
                  component='th'
                  sx={{
                    bgcolor: 'grey.50',
                    width: '30%',
                    borderBottom: index === specifications.length - 1 ? 'none' : undefined
                  }}
                >
                  {spec.label}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: index === specifications.length - 1 ? 'none' : undefined
                  }}
                >
                  {spec.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}
