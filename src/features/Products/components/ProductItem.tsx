import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@shared/utils/formatPrice'
import { PlayCircle, Heart, ThumbsUp, Zap } from 'lucide-react'

interface ProductSpecs {
  chip?: string
  battery?: string
  camera?: string
}

interface Product {
  productId: number
  imageUrl: string | null
  productTitle: string
  brand: string
  price: number
  specs?: ProductSpecs
  installment?: boolean
  hasVideo?: boolean
  isFavorite?: boolean
  isBestseller?: boolean
  fastShipping?: boolean
  likes?: number
  rating?: number
  soldCount?: number
}

interface ProductItemProps {
  product: Partial<Product>
  adjustPrice?: number
}

const DEFAULT_PRODUCT: Product = {
  productId: 1,
  imageUrl: '/placeholder.svg',
  productTitle: 'Sản phẩm mẫu',
  brand: 'Thương hiệu',
  price: 999000,
  specs: {
    chip: 'Chip xử lý mới',
    battery: 'Pin 24 giờ',
    camera: 'Camera chất lượng cao'
  },
  installment: true,
  hasVideo: true,
  isFavorite: true,
  isBestseller: true,
  fastShipping: true,
  likes: 150,
  rating: 4.5,
  soldCount: 999
}

const ProductItem: React.FC<ProductItemProps> = ({
  product: partialProduct,
  adjustPrice = 0
}) => {
  const product: Product = {
    ...DEFAULT_PRODUCT,
    ...partialProduct
  }

  const discount = adjustPrice > 0
  const discountPercentage = Math.round((adjustPrice / product.price) * 100)
  const finalPrice = product.price - adjustPrice

  return (
    <Link
      to={`/products/product-detail/${product.productId}`}
      onClick={() => window.scrollTo(0, 0)}
      className='block text-decoration-none'
    >
      <div className='group relative transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg rounded-lg bg-white p-3'>
        {/* Image and Video Section */}
        <div className='relative'>
          <div className='overflow-hidden rounded-lg bg-gray-100'>
            <img
              src={product.imageUrl || '/placeholder.svg'}
              alt={product.productTitle}
              className='h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            {product.hasVideo && (
              <div className='absolute bottom-2 right-2 text-white'>
                <PlayCircle className='w-8 h-8' />
              </div>
            )}
          </div>

          {/* Badges Overlay */}
          <div className='absolute left-2 top-2 flex flex-col gap-2'>
            {discount && (
              <div className='bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold'>
                -{discountPercentage}%
              </div>
            )}
            {product.isFavorite && (
              <div className='bg-rose-100 text-rose-500 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1'>
                <Heart className='w-3 h-3' />
                Yêu thích
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className='mt-4 space-y-2'>
          {/* Status Badges */}
          <div className='flex flex-wrap gap-2'>
            {product.isBestseller && (
              <span className='text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded flex items-center gap-1'>
                <ThumbsUp className='w-3 h-3' />
                Bán chạy
              </span>
            )}
            {product.fastShipping && (
              <span className='text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded flex items-center gap-1'>
                <Zap className='w-3 h-3' />
                Giao nhanh
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className='text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]'>
            {product.productTitle}
          </h3>

          {/* Ratings and Stats */}
          <div className='flex items-center gap-3 text-xs text-gray-500'>
            {product.rating && (
              <span className='flex items-center gap-1'>
                ⭐ {product.rating}
              </span>
            )}
            {product.likes && (
              <span className='flex items-center gap-1'>
                <ThumbsUp className='w-3 h-3' /> {product.likes}
              </span>
            )}
            {product.soldCount && <span>Đã bán {product.soldCount}</span>}
          </div>

          {/* Brand */}
          <p className='text-sm text-gray-500'>{product.brand}</p>

          {/* Pricing */}
          <div className='space-y-1'>
            {discount && (
              <p className='text-sm text-gray-500 line-through'>
                {formatCurrency(product.price)}
              </p>
            )}
            <p className='text-lg font-semibold text-red-600'>
              {formatCurrency(finalPrice)}
            </p>
            {discount && (
              <p className='text-xs text-green-600'>
                Giảm {formatCurrency(adjustPrice)}
              </p>
            )}
          </div>

          {/* Additional Features */}
          <div className='flex flex-wrap gap-2'>
            {product.installment && (
              <div className='inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded'>
                Trả góp 0%
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
