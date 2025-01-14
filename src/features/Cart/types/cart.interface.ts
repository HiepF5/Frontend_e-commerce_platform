export interface CartItemVariant {
  name: string
  value: string
}

export interface CartItem {
  productId: number
  variantId: number
  title: string
  productImage: string
  variant: CartItemVariant[]
  sellPrice: number
  quantity: number
  totalAmount: number
}


export interface CartItemRequest {
  item_id: number
  quantity: number
}
export interface CartDeleteRequest {
  item_list: string
}