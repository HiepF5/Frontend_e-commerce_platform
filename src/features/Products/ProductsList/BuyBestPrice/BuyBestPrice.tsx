import React, { useEffect, useState } from 'react'
import TitleList from '@shared/components/TitleList/TitleList'
import ProductItem from '../ProductItem/ProductItem'

function BuyBestPrice() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [lastProducts, setLastProducts] = useState([])
  return (
    <div className='container'>
      <header className='bg-primary p-4 text-center'>
        <h1 className='text-2xl font-bold mb-2'>Điện thoại giá tốt</h1>
        <p>Giá tốt nhất</p>
      </header>
      <main className='container mx-auto px-4'>
        <TitleList title='Sản phẩm nổi bật' />
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {featuredProducts.map((product, index) => (
            <ProductItem key={index} product={product} adjustPrice={undefined} />
          ))}
        </ul>
        <TitleList title='Sản phẩm khác' />
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {lastProducts.slice(0, 4).map((product, index) => (
            <ProductItem key={index} product={product} adjustPrice={undefined} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default BuyBestPrice
