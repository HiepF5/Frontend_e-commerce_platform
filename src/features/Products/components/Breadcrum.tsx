import arrow_icon from '@assets/img/breadcrum_arrow.png'
import { IProductData } from '../types/products.interface'
interface BreadcrumProps {
  product?: IProductData
}

function Breadcrum({ product }: BreadcrumProps) {
  if (!product) {
    return <div className='container flex items-center gap-8 text-gray-600 text-base font-semibold capitalize my-[60px] mx-[170px] '>HOME</div>
  }
  return (
    <div className='container flex items-center gap-8 text-gray-600 text-base font-semibold capitalize my-[60px] mx-[170px] '>
      HOME
      <img src={arrow_icon} alt='' /> SHOP
      <img src={arrow_icon} alt='' /> {product.productBrand.brand}
      <img src={arrow_icon} alt='' /> {product.title}
    </div>
  )
}

export default Breadcrum
