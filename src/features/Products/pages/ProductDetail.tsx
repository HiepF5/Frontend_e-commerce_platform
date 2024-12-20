import Breadcrum from '../components/Breadcrum'
import DescriptionBox from '../components/DescriptionBox'
import ShopProducts from '../components/ProductCard'
import ProductComparison from '../components/ProductComparison'
import ProductDisplay from '../components/ProductDisplay'
import ProductFeatures from '../components/ProductFeatures'
import ProductSpecs from '../components/ProductSpecs'
import RecentlyViewed from '../components/RecentlyViewed'
import RelatedProducts from '../components/RelatedProducts'
import Reviews from '../components/Reviews'
import ReviewToCustomer from '../components/ReviewToCustomer'
import SellerProfile from '../components/SellerProfile'
import { useGetProductDetailQuery } from '../api/productApi'
import { useParams } from 'react-router-dom'
import { IProductData } from '../types/products.interface'
import { useEffect, useState } from 'react'

function ProductDetail() {
  

const sellerStats = {
  rating: '9.6k',
  responseRate: '100%',
  responseTime: 'trong vài phút',
  followers: '3.7k',
  lastSeen: '3 Phút Trước',
  products: 46
}

const productSpecs = {
  sku: '9476',
  material: 'Nhựa ABS, Nhôm',
  origin: 'Nước ngoài'
}

const categories = [
  'Shopee',
  'Máy Tính & Laptop',
  'Phụ Kiện Máy Tính',
  'Bàn Laptop'
]
const shopProducts = [
  {
    id: '1',
    name: 'Miếng lót chuột, bàn di chuột anime One Piece',
    image: '/placeholder.svg?height=200&width=200',
    price: 18000,
    originalPrice: 34000,
    discount: 47,
    sold: 118,
    isFavorite: true,
    hasVideo: true
  },
  {
    id: '2',
    name: 'Giá kê đỡ điện thoại, máy tính bảng',
    image: '/placeholder.svg?height=200&width=200',
    price: 15000,
    originalPrice: 24000,
    discount: 37,
    sold: 193,
    isFavorite: true,
    tags: ['Rẻ Vô Địch']
  },
  {
    id: '3',
    name: 'Miếng Lót Chuột Bằng Xốp e-DRA',
    image: '/placeholder.svg?height=200&width=200',
    price: 24000,
    originalPrice: 38000,
    discount: 32,
    sold: 195,
    isFavorite: true,
    tags: ['Rẻ Vô Địch']
  },
  {
    id: '4',
    name: 'Giá đỡ điện thoại máy tính bảng đa năng',
    image: '/placeholder.svg?height=200&width=200',
    price: 33000,
    originalPrice: 49000,
    discount: 32,
    sold: 98,
    isFavorite: true,
    hasVideo: true,
    tags: ['Rẻ Vô Địch']
  },
  {
    id: '5',
    name: 'Bộ Dụng Cụ Vệ Sinh Laptop, Điện Thoại',
    image: '/placeholder.svg?height=200&width=200',
    price: 56000,
    originalPrice: 74000,
    discount: 24,
    sold: 166,
    isFavorite: true,
    hasVideo: true
  },
  {
    id: '6',
    name: 'Chuột Bluetooth Không Dây Sạc Pin',
    image: '/placeholder.svg?height=200&width=200',
    price: 40000,
    originalPrice: 65000,
    discount: 38,
    sold: 183,
    isFavorite: true
  }
]

const recommendedProducts = [
  {
    id: '1',
    name: 'Giá đỡ LAPTOP, MACBOOK nhôm cao cấp',
    image: '/placeholder.svg?height=200&width=200',
    price: 64000,
    originalPrice: 89000,
    discount: 28,
    sold: 157,
    isFavorite: true,
    tags: ['Rẻ Vô Địch', 'Giảm 45k']
  },
  {
    id: '2',
    name: 'Giá đỡ máy tính xách tay Giá đỡ Laptop',
    image: '/placeholder.svg?height=200&width=200',
    price: 28000,
    originalPrice: 35000,
    discount: 20,
    sold: 112,
    isFavorite: true,
    hasVideo: true
  },
  {
    id: '3',
    name: 'Giá đỡ Laptop, Macbook, Máy Tính Bảng',
    image: '/placeholder.svg?height=200&width=200',
    price: 129000,
    originalPrice: 199000,
    discount: 35,
    sold: 96,
    isFavorite: true,
    tags: ['Rẻ Vô Địch', 'Giảm 70k']
  },
  {
    id: '4',
    name: '[Choice] Giá đỡ máy tính Pahada',
    image: '/placeholder.svg?height=200&width=200',
    price: 57000,
    originalPrice: 88000,
    discount: 35,
    sold: 3200,
    tags: ['Choice']
  },
  {
    id: '5',
    name: 'Giá đỡ laptop, macbook, máy tính bảng',
    image: '/placeholder.svg?height=200&width=200',
    price: 50000,
    originalPrice: 81000,
    discount: 38,
    sold: 17000,
    isFavorite: true,
    hasVideo: true,
    tags: ['Rẻ Vô Địch']
  },
  {
    id: '6',
    name: 'Giá đỡ Laptop, Macbook, Ipad bằng nhôm',
    image: '/placeholder.svg?height=200&width=200',
    price: 56000,
    originalPrice: 125000,
    discount: 55,
    sold: 10000,
    tags: ['Rẻ Vô Địch']
  }
]
  const { productId } = useParams<{ productId: string }>() // Lấy productId từ URL
  const { data, isFetching, isError } = useGetProductDetailQuery({
    productId: Number(productId)
  })
  const [products, setProducts] = useState<IProductData>()
  useEffect(() => {
    if (data) {
      setProducts(data.data)
    }
  }, [data, isFetching])
  const product = {
    name: 'iPhone 16 Pro 128GB',
    rating: 4.6,
    reviews: 72,
    ratings: 12,
    price: 28390000,
    originalPrice: 28990000,
    sku: '00911084',
    specs: {
      chip: 'Apple A18 Pro',
      screenSize: '6.3 inch',
      battery: '27.2h',
      performance: ['Hiệu năng tốt', 'Hiệu năng rất tốt', 'Hiệu năng vượt trội']
    },
    colors: [
      { name: 'Titan Sạ Mạc', value: 'titan-natural' },
      { name: 'Titan Trắng', value: 'titan-white' },
      { name: 'Titan Tự nhiên', value: 'titan-natural' },
      { name: 'Titan Đen', value: 'titan-black' }
    ],
    storage: [
      { size: '128 GB', price: 28390000 },
      { size: '256 GB', price: 31390000 },
      { size: '512 GB', price: 37390000 },
      { size: '1 TB', price: 43390000 }
    ],
    brand: 'Apple'
  }

  

  if (isFetching) return <p>Loading...</p>
  if (isError) return <p>Error loading product detail.</p>
  console.log(data)
  return (
    <div>
      <Breadcrum product={products} />
      <ProductDisplay product={products} />
      <DescriptionBox product={product} />
      <div className='max-w-7xl mx-auto p-4 space-y-4'>
        <SellerProfile name='deerlu05.vn' stats={sellerStats} />
        <ProductSpecs specs={productSpecs} categories={categories} />
      </div>
      <RelatedProducts />
      <ProductComparison />
      <Reviews />
      <ReviewToCustomer />
      <RecentlyViewed />
      <ShopProducts
        shopProducts={shopProducts}
        recommendedProducts={recommendedProducts}
      />
      <ProductFeatures />
    </div>
  )
}

export default ProductDetail
