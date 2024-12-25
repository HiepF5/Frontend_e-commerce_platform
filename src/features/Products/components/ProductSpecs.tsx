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

interface ProductSpecsProps {
  specs: {
    sku: string
    material: string
    origin: string
  }
  categories: string[]
}

export default function ProductSpecs({ specs, categories }: ProductSpecsProps) {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          CHI TIẾT SẢN PHẨM
        </Typography>

        <Breadcrumbs
          separator={<ChevronRight className='w-4 h-4' />}
          sx={{ mb: 3 }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href='#'
              color={
                index === categories.length - 1 ? 'text.primary' : 'inherit'
              }
              underline='hover'
            >
              {category}
            </Link>
          ))}
        </Breadcrumbs>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell component='th' sx={{ width: '30%', border: 'none' }}>
                Kho
              </TableCell>
              <TableCell sx={{ border: 'none' }}>{specs.sku}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' sx={{ width: '30%', border: 'none' }}>
                Chất liệu
              </TableCell>
              <TableCell sx={{ border: 'none' }}>{specs.material}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' sx={{ width: '30%', border: 'none' }}>
                Gửi từ
              </TableCell>
              <TableCell sx={{ border: 'none' }}>{specs.origin}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
          MÔ TẢ SẢN PHẨM
        </Typography>

        <Typography variant='body1' paragraph>
          Giá đỡ máy tính xách tay Seven N3 với bày bánh răng có thể điều chỉnh
        </Typography>

        <Typography variant='body1' paragraph>
          Giá đỡ máy tính xách tay gấp nhỏ gọn cho tất cả các loại máy từ 12 đến
          18 inch có thể điều chỉnh tất cả các loại vật liệu chất lượng cao
        </Typography>

        <Typography variant='body1' paragraph>
          Vật chất vật liệu kim loại siêu cứng chất lượng cao bền với lớp phủ
          chống trầy xước
        </Typography>

        <Typography variant='body1'>
          Khi mở: dài 25 cm - cao 15,5 cm, rộng 18,5 cm Khi gấp: dài 25cm - rộng
          4,3cm
        </Typography>
      </Card>
    </Container>
  )
}
