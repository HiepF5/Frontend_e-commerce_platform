import React from 'react'
import Item from '../Item/Item'
import TitleList from '@shared/components/TitleList/TitleList'
function RelatedProducts() {
  const productsList = [
    {
      productsId: 1,
      productsName: 'Product 1',
      price: 100,
      sold: 150,
      image: 'image1.jpg'
    },
    {
      productsId: 2,
      productsName: 'Product 2',
      price: 200,
      sold: 250,
      image: 'image2.jpg'
    },
    {
      productsId: 3,
      productsName: 'Product 3',
      price: 300,
      sold: 350,
      image: 'image3.jpg'
    },
    {
      productsId: 4,
      productsName: 'Product 4',
      price: 400,
      sold: 450,
      image: 'image4.jpg'
    }
  ]
  return (
    <div className='container'>
      <TitleList title='Similar Product' />
      <div className='flex flex-col items-center '>
        <div className='flex mt-10 gap-5 mb-10'>
          {productsList.map((item, i) => (
            <Item
              key={i}
              id={item.productsId}
              name={item.productsName}
              new_price={item.price}
              old_price={item.sold}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
