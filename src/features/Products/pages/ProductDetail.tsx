import Breadcrum from '../ProductDetail/Breadcrum/Breadcrum'
import ProductDisplay from '../ProductDetail/ProductDisplay/ProductDisplay'
import DescriptionBox from '../ProductDetail/DescriptionBox/DescriptionBox'
import RelatedProducts from '../ProductDetail/RelatedProducts/RelatedProducts'
import Navbar from '@layouts/components/Navbar/Navbar'
import Footer from '@layouts/components/Footer/Footer'

function ProductDetail() {
 const product = {
   id: 1,
   name: ' Product',
   description: 'This is a  product description.',
   price: 99.99,
   brand: ' Brand',
   imageUrl:
     'https://github.com/HiepF5/Db_Ecommercer/blob/main/SamSung/Samsung%20Galaxy%20A23/4.jpg?raw=true',
   image:
     'https://github.com/HiepF5/Db_Ecommercer/blob/main/SamSung/Samsung%20Galaxy%20A23/1.jpg?raw=true',
   image2:
     'https://github.com/HiepF5/Db_Ecommercer/blob/main/SamSung/Samsung%20Galaxy%20A23/2.jpg?raw=true',
   image3:
     'https://github.com/HiepF5/Db_Ecommercer/blob/main/SamSung/Samsung%20Galaxy%20A23/3.jpg?raw=true',
   image4:
     'https://github.com/HiepF5/Db_Ecommercer/blob/main/SamSung/Samsung%20Galaxy%20A23/5.jpg?raw=true',
   additionalProperty1: 'value1',
   additionalProperty2: 'value2',
   productsName: ' Product Name',
   sold: 100
 }
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      {/* <RelatedProducts /> */}
    </div>
  )
}

export default ProductDetail
