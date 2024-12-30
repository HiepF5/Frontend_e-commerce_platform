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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/1.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/3.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/1.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true',
    price: 57000,
    originalPrice: 88000,
    discount: 35,
    sold: 3200,
    tags: ['Choice']
  },
  {
    id: '5',
    name: 'Giá đỡ laptop, macbook, máy tính bảng',
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/3.jpg?raw=true',
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
    image: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true',
    price: 56000,
    originalPrice: 125000,
    discount: 55,
    sold: 10000,
    tags: ['Rẻ Vô Địch']
  }
]
  const { productId } = useParams<{ productId: string }>() 
  const { data, isFetching, isError } = useGetProductDetailQuery({
    productId: Number(productId)
  })
  const [products, setProducts] = useState<IProductData>()
  useEffect(() => {
    if (data) {
      setProducts(data.data)
    }
  }, [data, isFetching])

  if (isFetching) return <p>Loading...</p>
  if (isError) return <p>Error loading product detail.</p>
  console.log(data)
  return (
    <div>
      <Breadcrum product={products} />
      <ProductDisplay product={products} />
      <DescriptionBox product={products} />
      <div className='max-w-7xl mx-auto p-4 space-y-4'>
        <SellerProfile
          stats={sellerStats}
          shopCode={products?.shopCode}
        />
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
