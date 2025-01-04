import { Link } from 'react-router-dom'
import { formatCurrency } from '@shared/utils/formatPrice';

type ItemProps = {
  id: string;
  image: string;
  name: string;
  new_price: number;
  old_price: number;
};

function Item({ id, image, name, new_price, old_price }: ItemProps) {
  return (
    <div className='item w-80'>
      <Link to={`/product/${id}`}>
        <img
          className='cursor-pointer w-[320px] h-[320px]'
          onClick={() => window.scrollTo(0, 0)}
          src={image}
          alt=''
        />
      </Link>
      <p className='mt-2 mb-1 text-gray-900'>{name}</p>
      <div className='item-prices flex gap-4'>
        <div className='item-price-new text-gray-800 font-semibold'>
          {formatCurrency(new_price)}
        </div>
        <div className='item-price-old text-gray-500 font-medium line-through'>
          {formatCurrency(old_price)}
        </div>
      </div>
    </div>
  )
}

export default Item
