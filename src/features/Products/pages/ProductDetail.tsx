import Breadcrum from '../components/Breadcrum'
import DescriptionBox from '../components/DescriptionBox'
import ShopProducts from '../components/ProductCard'
import ProductDisplay from '../components/ProductDisplay'
import ProductFeatures from '../components/ProductFeatures'
import ProductSpecs from '../components/ProductSpecs'
import RecentlyViewed from '../components/RecentlyViewed'
import RelatedProducts from '../components/RelatedProducts'
import Reviews from '../components/Reviews'
import ReviewToCustomer from '../components/ReviewToCustomer'
import SellerProfile from '../components/SellerProfile'
import { useGetProductDetailQuery, useGetProductRecommendContentBasedQuery, useGetProductRecommendItemBasedQuery, useGetProductRecommendUserBasedQuery } from '../api/productApi'
import { useParams } from 'react-router-dom'
import { IProductData } from '../types/products.interface'
import { useEffect, useState } from 'react'
import { IProduct } from '~/types/products.interface'

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

  const { productId } = useParams<{ productId: string }>() 
  const { data, isFetching, isError } = useGetProductDetailQuery({
    productId: Number(productId)
  })
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { data: shopProducts } = useGetProductRecommendUserBasedQuery({
    productId: user.user_id,
    count: 6
  })
  const { data: recommendedProducts } = useGetProductRecommendItemBasedQuery({
    productId: Number(productId),
    count: 6
  })
  const { data: relatedProductsData } = useGetProductRecommendContentBasedQuery({
    productId: Number(productId),
    count: 6
  })
  const [products, setProducts] = useState<IProductData>()
  const [recomenedProducts, setRecomnedProducts] = useState<IProduct[]>()
  const [userRecomenedProducts, setUserRecomenedProducts] = useState<IProduct[]>()
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([])
  const isShopOwner = products?.shopCode === user.shop_code
  useEffect(() => {
    if (data) {
      setProducts(data.data)
    }
    if (recommendedProducts) {
      setRecomnedProducts(recommendedProducts.data as IProduct[])
    }
    if (shopProducts) {
      setUserRecomenedProducts(shopProducts.data as IProduct[])
    }
    if (relatedProductsData) {
      setRelatedProducts(relatedProductsData.data as IProduct[])
    }
  }, [data, isFetching, recommendedProducts, shopProducts, relatedProductsData])

  if (isFetching) return <p>Loading...</p>
  if (isError) return <p>Error loading product detail.</p>
  return (
    <div>
      <Breadcrum product={products} />
      <ProductDisplay product={products} />
      <DescriptionBox product={products} />
      <div className='max-w-7xl mx-auto p-4 space-y-4'>
        <SellerProfile stats={sellerStats} shopCode={products?.shopCode} />
        <ProductSpecs specs={productSpecs} categories={categories} />
      </div>
      <RelatedProducts relatedProducts={relatedProducts} />
      {/* <ProductComparison /> */}
      <Reviews productId={productId} productDetail={products} />
      <ReviewToCustomer productId={productId} isShopOwner={isShopOwner} />
      <RecentlyViewed />
      <ShopProducts
        shopProducts={userRecomenedProducts}
        recommendedProducts={recomenedProducts}
      />
      <ProductFeatures />
    </div>
  )
}

export default ProductDetail
