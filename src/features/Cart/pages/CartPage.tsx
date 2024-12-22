'use client'

import { useState } from 'react'
import {
  Container,
  Grid,
  Typography,
  Checkbox,
  Box,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
  Button
} from '@mui/material'
import { ChevronRight } from 'lucide-react'
import CartItem from '../components/CartItems'
import CartSummary from '../components/CartSummary'
import { useClearCartMutation, useGetCartCountQuery, useGetCartQuery, useRemoveFromCartMutation, useUpdateCartItemMutation } from '../api/cartApi'
import { RemoveCircleTwoTone } from '@mui/icons-material'

export default function CartPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const { data: cartData, isLoading, error } = useGetCartQuery()
  const [updateCartItem] = useUpdateCartItemMutation()
  const [removeFromCart] = useRemoveFromCartMutation()
  const [clearCart] = useClearCartMutation()
  const { data: countItem, isLoading: isCountLoading, error: countError } = useGetCartCountQuery()
  console.log(cartData)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartData?.data.map(item => item.variantId) || [])
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (variantId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, variantId])
    } else {
      setSelectedItems(selectedItems.filter(id => id !== variantId))
    }
  }

  const handleQuantityChange = async (variantId: number, quantity: number) => {
    try {
      await updateCartItem({
        item_id: variantId,
        quantity
      }).unwrap()
    } catch (err) {
      console.error('Failed to update quantity:', err)
    }
  }

  const handleRemoveItem = async (variantId: number) => {
    try {
      await removeFromCart({
        item_list: variantId.toString()
      }).unwrap()
    } catch (err) {
      console.error('Failed to remove item:', err)
    }
  }
  const handleClearCart = async () => {
    try {
      await clearCart().unwrap()
    } catch (err) {
      console.error('Failed to clear cart:', err)
    }
  }

  if (isLoading) return <CircularProgress />
  if (error) return <Alert severity="error">Failed to load cart</Alert>

  const cartItems = cartData?.data || []
  const total = 0
  const itemCount =  countItem || 0

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Breadcrumbs
        separator={<ChevronRight className='w-4 h-4' />}
        sx={{ mb: 4 }}
      >
        <Link underline='hover' color='inherit' href='/'>
          Trang chủ
        </Link>
        <Typography color='text.primary'>Giỏ hàng</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox
                checked={selectedItems.length === cartItems.length}
                indeterminate={
                  selectedItems.length > 0 &&
                  selectedItems.length < cartItems.length
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <Typography>Chọn tất cả ({itemCount})</Typography>
            </Box>
            <Box>
              <Button
                startIcon={<RemoveCircleTwoTone />}
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography variant='h6'>Giỏ hàng ({itemCount})</Typography>
          </Box>

          {cartItems.map((item) => (
            <CartItem
              key={item.variantId}
              item={item}
              selected={selectedItems.includes(item.variantId)}
              onSelect={(checked) => handleSelectItem(item.variantId, checked)}
              onQuantityChange={(quantity) =>
                handleQuantityChange(item.variantId, quantity)
              }
              onRemove={() => handleRemoveItem(item.variantId)}
            />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary
            selectedItems={selectedItems}
            cartItems={cartItems}
            total={total}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
