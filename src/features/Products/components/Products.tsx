import { useState, useEffect, useCallback } from 'react'

import ProductItem from './ProductItem'
import { IProduct } from '~/types/products.interface'
import { useGetListProductQuery } from '../api/productApi'
import { IBaseResponseSearch, IProductSearchRequest } from '../api/searchApi';

interface ProductsProps {
  searchProduct?: IBaseResponseSearch<IProductSearchRequest>;
}

export default function Products({ searchProduct }: ProductsProps) {
  console.log(searchProduct)
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  const [products, setProducts] = useState<IProduct[]>([])
  const { data, isFetching, isError } = useGetListProductQuery({
    pageNumber,
    pageSize: 40
  })

  useEffect(() => {
    if (data && data.data) {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...(Array.isArray(data.data) ? data.data : [])
      ])
      if (data.data.length === 0) {
        setHasMore(false)
      }
    }
  }, [data])
  console.log(data)

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1)
    }
  }, [isFetching, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    const target = document.querySelector('#load-more-trigger')
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [loadMore, hasMore])

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Danh sách điện thoại
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {searchProduct
            ? searchProduct.content.map(
                (productRequest: IProductSearchRequest, index: number) => {
                  const product = {
                    productId: productRequest.id,
                    imageUrl: productRequest.productUrl || '',
                    productTitle: productRequest.title,
                    brand: `Brand: ${productRequest.brandDocument.brandName}`,
                    price: productRequest.minPrice,
                    hasVideo: true,
                    isFavorite: true,
                    isBestseller: true,
                    fastShipping: true,
                    rating: 4.5,
                    likes: 1234,
                    soldCount: 999,
                    installment: true
                  }
                  return (
                    <div key={index} className='group relative'>
                      <ProductItem product={product} />
                    </div>
                  )
                }
              )
            : products.map((product) => (
                <div key={product.productId}>
                  <ProductItem
                    product={{
                      productId: product.productId,
                      imageUrl: product.imageUrl || '',
                      productTitle: product.productTitle,
                      brand: `Brand: ${product.brand}`,
                      price: product.minPrice,
                      hasVideo: true,
                      isFavorite: true,
                      isBestseller: true,
                      fastShipping: true,
                      rating: 4.5,
                      likes: 1234,
                      soldCount: 999,
                      installment: true
                    }}
                    adjustPrice={300000}
                  />
                </div>
              ))}
        </div>

        {hasMore && <div id='load-more-trigger' className='h-10'></div>}
        {isFetching && <p>Đang tải thêm sản phẩm...</p>}
        {isError && <p>Đã xảy ra lỗi khi tải sản phẩm.</p>}
        {!hasMore && <p>Không còn sản phẩm nào để hiển thị.</p>}
      </div>
    </div>
  )
}
