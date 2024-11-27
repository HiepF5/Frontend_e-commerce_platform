import React from 'react'
import remove_icon from '@assets/img/cart_cross_icon.png'

const CartItems: React.FC = () => {
  const productsList = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 2,
      image: 'https://via.placeholder.com/40'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      quantity: 1,
      image: 'https://via.placeholder.com/40'
    }
  ]
  const cart = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    { id: 2, name: 'Product 2', price: 200, quantity: 1 }
  ]
  const userData = { name: 'John Doe', email: 'john.doe@example.com' }
  const shipCost = 50
  const giftProduct = { id: 3, name: 'Gift Product', price: 0 }

  const removeFromCart = (productId: number) => {
    console.log(`Removing product with id ${productId} from cart`)
  }

  const getTotalCartAmount = () => {
    return (
      cart.reduce((total, item) => total + item.price * item.quantity, 0) +
      shipCost
    )
  }

  const getCartItemsForCheckout = () => {
    return cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))
  }

  const adjustPrice = (productId: number, newPrice: number) => {
    console.log(
      `Adjusting price of product with id ${productId} to ${newPrice}`
    )
  }

  return (
    <div className='container'>
      <div className='grid grid-cols-6 items-center gap-x-20 py-5 text-gray-700 font-semibold'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className='my-5 border-t-2 border-gray-300' />
      {productsList.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id)
        if (cartItem) {
          return (
            <div key={product.id} className='grid grid-cols-6 gap-x-20'>
              <img
                src={product.image}
                alt=''
                className='cartItems-product-icon h-16 w-16 col-span-1'
              />
              <p className='col-span-1'>{product.name}</p>
              <p>${product.price}</p>
              <button className='col-span-1 w-16 h-12 border border-gray-300 bg-white'>
                {cartItem.quantity}
              </button>
              <p className='col-span-1'>${product.price * cartItem.quantity}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(product.id)}
                alt=''
                className='col-span-1 w-4 h-4 cursor-pointer'
              />
            </div>
          )
        }
        return null
      })}
      <div className='flex'>
        <div className='flex-1 mr-24'>
          <h1 className='text-2xl font-semibold'>Cart Totals</h1>
          <div className='mt-5'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className='my-3 border-t border-gray-300' />
            <div className='flex justify-between'>
              <p>Shipping: ${shipCost}</p>
            </div>
            {giftProduct && (
              <div className='flex justify-between'>
                <p>Gift: {giftProduct.name}</p>
              </div>
            )}
            <div className='flex justify-between'>
              <p>Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <button className='w-64 h-16 mt-5 bg-red-500 text-white text-lg font-semibold rounded-md cursor-pointer'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-lg font-medium text-gray-700'>
            If you have a promo code, enter it here
          </p>
          <div className='mt-3 flex items-center'>
            <input
              type='text'
              placeholder='Promo code'
              className='w-72 h-12 px-4 border border-gray-300'
            />
            <button
              className='w-44 h-12 ml-4 bg-black text-white text-lg font-semibold rounded-md cursor-pointer'
              onClick={() => console.log(getCartItemsForCheckout())}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
