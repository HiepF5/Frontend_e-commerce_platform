import Sidebar from '../components/Sidebar'
import Introduction from '../components/Introduction'
import BuyBestPrice from '../components/BuyBestPrice';


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
