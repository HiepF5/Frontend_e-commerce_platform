import React from 'react'
import { Link } from 'react-router-dom'

interface Product {
  productId: number
  image: string
  productName: string
  brand: string
  price: number
}

interface ProductItemProps {
  product: Product
  adjustPrice?: number
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  adjustPrice = 0
}) => {
  return (
    <Link
      to={`/products/product-detail/${product.productId}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className='group relative'>
        <div className='cursor-pointer overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75'>
          <img
            src={product.image}
            alt='Chưa update'
            className='h-[200px] w-full object-center h-auto'
          />
        </div>
        <div className='mt-4 flex justify-between'>
          <div>
            <h3 className='text-sm text-gray-700'>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.productName}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>{product.brand}</p>
          </div>
          <div>
            <p
              className='text-sm font-medium text-gray-900'
              style={{ textDecoration: 'line-through' }}
            >
              {product.price}
            </p>
            <p className='text-sm font-medium text-gray-900'>
              {product.price - adjustPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
