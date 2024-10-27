import React from 'react'
import Sidebar from '../ProductsList/Sidebar/Sidebar'
import Introduction from '../ProductsList/Introduction/Introduction'
import BuyBestPrice from '../ProductsList/BuyBestPrice/BuyBestPrice'


const ProductsList = () => {
  return (
    <div>
      <Sidebar />
      <Introduction />
      <BuyBestPrice />
    </div>
  )
}

export default ProductsList
