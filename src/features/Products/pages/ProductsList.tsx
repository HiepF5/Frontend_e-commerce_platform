import Sidebar from '../ProductsList/Sidebar/Sidebar'
import Introduction from '../ProductsList/Introduction/Introduction'
import BuyBestPrice from '../ProductsList/BuyBestPrice/BuyBestPrice'


interface ProductsListProps {
  category: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ category }) => {
  console.log(category)
  return (
    <div>
      <Sidebar />
      <Introduction />
      <BuyBestPrice />
    </div>
  )
}

export default ProductsList
