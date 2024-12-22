'use client'

import { useState } from 'react'
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Stack
} from '@mui/material'
import { Trash2, Minus, Plus } from 'lucide-react'
import { formatPrice } from '@shared/utils/formatPrice'
import { CartItem as ICartItem } from '../types/cart.interface'

interface CartItemProps {
  item: ICartItem
  selected: boolean
  onSelect: (checked: boolean) => void
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export default function CartItem({
  item,
  selected,
  onSelect,
  onQuantityChange,
  onRemove
}: CartItemProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta)
    onQuantityChange(newQuantity)
  }

  const productImage =JSON.parse(item.productImage)[0]
  return (
    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Checkbox 
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
        />
        
        <Box
          component="img"
          src={productImage}
          alt={item.title}
          sx={{ width: 80, height: 80, objectFit: 'contain' }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            {item.title}
          </Typography>

          <Stack direction="row" spacing={1} mb={1}>
            {item.variant.map((v, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                {v.name}: {v.value}
              </Typography>
            ))}
          </Stack>

          <Typography variant="h6" color="error">
            {formatPrice(item.sellPrice)}₫
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </IconButton>
            
            <Typography>{item.quantity}</Typography>
            
            <IconButton 
              size="small" 
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="w-4 h-4" />
            </IconButton>
            
            <IconButton
              size="small"
              color="error"
              onClick={onRemove}
              sx={{ ml: 'auto' }}
            >
              <Trash2 className="w-4 h-4" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
