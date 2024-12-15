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

interface DescriptionBoxProps {
  product: {
    specs: {
      chip: string
      screenSize: string
      battery: string
    }
    brand: string
  }
}

export default function DescriptionBox({ product }: DescriptionBoxProps) {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h5' gutterBottom fontWeight='bold'>
        Thông số kỹ thuật
      </Typography>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                component='th'
                sx={{ bgcolor: 'grey.50', width: '30%' }}
              >
                Thương hiệu
              </TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' sx={{ bgcolor: 'grey.50' }}>
                Chip
              </TableCell>
              <TableCell>{product.specs.chip}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' sx={{ bgcolor: 'grey.50' }}>
                Kích thước màn hình
              </TableCell>
              <TableCell>{product.specs.screenSize}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' sx={{ bgcolor: 'grey.50' }}>
                Thời lượng pin
              </TableCell>
              <TableCell>{product.specs.battery}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Container>
  )
}
