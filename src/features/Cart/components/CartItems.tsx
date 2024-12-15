'use client'

import { useState } from 'react'
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControlLabel,
  SelectChangeEvent,
  Radio,
  RadioGroup,
  FormGroup,
  Stack
} from '@mui/material'
import { Trash2, Minus, Plus } from 'lucide-react'
import { formatPrice } from '@shared/utils/formatPrice'

interface CartItemProps {
  product: {
    id: string
    name: string
    image: string
    price: number
    originalPrice: number
    colors: { name: string; value: string }[]
    warranties: {
      id: string
      name: string
      price: number
      originalPrice: number
    }[]
  }
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export default function CartItem({
  product,
  onQuantityChange,
  onRemove
}: CartItemProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value)
  const [selectedWarranty, setSelectedWarranty] = useState<string>('')

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta)
    setQuantity(newQuantity)
    onQuantityChange(newQuantity)
  }

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value)
  }

  return (
    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Checkbox />
        <Box
          component='img'
          src={product.image}
          alt={product.name}
          sx={{ width: 80, height: 80, objectFit: 'contain' }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='subtitle1' gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant='body2'>Màu:</Typography>
            <Select
              size='small'
              value={selectedColor}
              onChange={handleColorChange}
              sx={{ minWidth: 120 }}
            >
              {product.colors.map((color) => (
                <MenuItem key={color.value} value={color.value}>
                  {color.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h6' color='error'>
              {formatPrice(product.price)}₫
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ textDecoration: 'line-through' }}
            >
              {formatPrice(product.originalPrice)}₫
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <IconButton
              size='small'
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className='w-4 h-4' />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton size='small' onClick={() => handleQuantityChange(1)}>
              <Plus className='w-4 h-4' />
            </IconButton>
            <IconButton
              size='small'
              color='error'
              onClick={onRemove}
              sx={{ ml: 'auto' }}
            >
              <Trash2 className='w-4 h-4' />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ ml: 7, mt: 2 }}>
        <Typography variant='subtitle2' color='error' gutterBottom>
          Chọn gói bảo hành
        </Typography>
        <RadioGroup
          value={selectedWarranty}
          onChange={(e) => setSelectedWarranty(e.target.value)}
        >
          <Stack spacing={1}>
            {product.warranties.map((warranty) => (
              <FormControlLabel
                key={warranty.id}
                value={warranty.id}
                control={<Radio size='small' />}
                label={
                  <Box>
                    <Typography variant='body2'>{warranty.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant='body2' color='error'>
                        +{formatPrice(warranty.price)}₫
                      </Typography>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {formatPrice(warranty.originalPrice)}₫
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  )
}
