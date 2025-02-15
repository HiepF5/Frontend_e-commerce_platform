import  { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaChevronDown, FaThLarge } from 'react-icons/fa'
import Products from './Products'
import ColorFilter from './Sidebar/ColorFilter'
import SizeFilter from './Sidebar/SizeFilter'
import CategoryFilter from './Sidebar/CategoryFilter'
import SubCategoriesList from './Sidebar/SubCategories'
import SortOptionsList from './Sidebar/SortOptionsList'
import { IoMdSearch } from 'react-icons/io'
import { useSearchProductQuery } from '../api/searchApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFetchBrandQuery, useFetchCategoriesQuery } from '../api/productApi'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false }
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' }
]


export default function Sidebar() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const { data } = useSearchProductQuery(
    searchKeyword ? { keyword: searchKeyword } : skipToken
  )
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase()
    setSearchKeyword(keyword)
  }
  const {data : categoryData} = useFetchCategoriesQuery({categoryLevel: 1})
  const { data: brandData } = useFetchBrandQuery()
  console.log(categoryData)
   const [filters, setFilters] = useState([
     {
       id: 'color',
       name: 'Color',
       options: [
         { value: 'white', label: 'White', checked: false },
         { value: 'beige', label: 'Beige', checked: false },
         { value: 'blue', label: 'Blue', checked: true },
         { value: 'brown', label: 'Brown', checked: false },
         { value: 'green', label: 'Green', checked: false },
         { value: 'purple', label: 'Purple', checked: false }
       ]
     },
     {
       id: 'category',
       name: 'Category',
       options: [] // Will be populated from API data
     },
     {
       id: 'brand',
       name: 'Brand',
       options: [
        
       ]
     }
   ])
  useEffect(() => {
    if (categoryData) {
      setFilters((prevFilters) => {
        const updatedFilters = [...prevFilters]
        const categoryFilter = updatedFilters.find(
          (filter) => filter.id === 'category'
        )
        if (categoryFilter) {
          categoryFilter.options = categoryData.data.map((category) => ({
            value: category.categoryId.toString(),
            label: category.categoryName,
            
            checked: false
          }))
        }
        return updatedFilters
      })
    }
  }, [categoryData])
  useEffect(() => {
    // Cập nhật filter 'brand' từ dữ liệu brandData
    if (brandData) {
      setFilters((prevFilters) => {
        const updatedFilters = [...prevFilters]
        const brandFilter = updatedFilters.find(
          (filter) => filter.id === 'brand'
        )
        if (brandFilter) {
          brandFilter.options = brandData.data.map((brand) => ({
            value: brand.id.toString(),
            label: brand.brand,
            count: brand.productCount,
            checked: false
          }))
        }
        return updatedFilters
      })
    }
  }, [brandData])
  return (
    <div className='bg-white container'>
      <div>
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
              Product
            </h1>

            <div className='flex items-center'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                    Sort
                    <FaChevronDown
                      className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <SortOptionsList sortOptions={sortOptions} />
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type='button'
                className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
              >
                <span className='sr-only'>View grid</span>
                <FaThLarge className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}

              <form className='lg:block'>
                <h3 className='sr-only'>Categories</h3>
                <div className='relative group hidden sm:block pb-4'>
                  <input
                    type='text'
                    placeholder='Search'
                    value={searchKeyword}
                    onChange={handleSearch}
                    className='w-[200px] pr-10 pl-10 transition-all duration-300 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800 dark:text-white'
                  />
                  <IoMdSearch className='absolute left-3 text-gray-500' style={{top: '15px'}} />
                </div>

                <SubCategoriesList subCategories={subCategories} />

                {/* Color Filter */}
                <ColorFilter options={filters[0].options} />

                {/* Category Filter */}
                <CategoryFilter options={filters[1].options} />

                {/* Size Filter */}
                <SizeFilter options={filters[2].options} />
              </form>
              {/* Product grid */}
              <div className='lg:col-span-3'>
                <Products searchProduct={data} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
