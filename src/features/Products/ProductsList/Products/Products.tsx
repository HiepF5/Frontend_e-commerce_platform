import React, { useState } from 'react'
import { useEffect } from 'react'
import ProductItem from '../ProductItem/ProductItem'

export default function Products() {
  // Sample fake data
  const products = [
    { productsId: 1, name: 'iPhone 13', price: 999 },
    { productsId: 2, name: 'Samsung Galaxy S21', price: 899 },
    { productsId: 3, name: 'OnePlus 9 Pro', price: 969 },
    { productsId: 4, name: 'Google Pixel 6', price: 799 },
    { productsId: 5, name: 'Xiaomi Mi 11', price: 749 }
  ]
  const [searchTerm, setSearchTerm] = useState('')

  // Xử lý sự kiện thay đổi của ô tìm kiếm
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Lọc danh sách sản phẩm dựa trên categoryNow và giá trị tìm kiếm
  const categoryNow = ''; // Define categoryNow variable
  const filteredProducts = products
    .filter((product: { productsId: number; name: string; price: number; brand?: string }) => {
      const matchesCategory = !categoryNow || product.brand === categoryNow;
      return matchesCategory;
    })
    .filter((product: { productsId: number; name: string; price: number; brand?: string }) => {
      const matchesSearchTerm = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      return matchesSearchTerm
    })

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Danh sách điện thoại
        </h2>
        {/* Ô tìm kiếm */}
        <input
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
          value={searchTerm}
          onChange={handleSearchTermChange}
          className='mt-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredProducts.map((product) => (
            <div key={product.productsId}>
              <ProductItem product={
                {
                  productsId: product.productsId,
                  image: 'https://via.placeholder.com/300',
                  productsName: product.name,
                  brand: 'Apple',
                  price: product.price
                }
                  
              } />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
