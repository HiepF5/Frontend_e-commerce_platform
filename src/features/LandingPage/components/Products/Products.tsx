import Img1 from '@assets/Images/Topproduct/6.png'
import Img2 from '@assets/Images/Topproduct/7.png'
import Img3 from '@assets/Images/Topproduct/8.png'
import Img4 from '@assets/Images/Topproduct/9.png'
import Img5 from '@assets/Images/Topproduct/10.png'
import { FaStar } from 'react-icons/fa6'
const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: 'Iphone 16 pro 128GB',
    rating: 5.0,
    color: 'Titan sa mạc',
    aosDelay: '0'
  },
  {
    id: 2,
    img: Img2,
    title: 'Robot hút bụi Xiaomi Mi Robot Vacuum-Mop P',
    rating: 4.5,
    color: 'White',
    aosDelay: '200'
  },
  {
    id: 3,
    img: Img3,
    title: 'Apple Watch Series 7 GPS 41mm ',
    rating: 4.7,
    color: 'White',
    aosDelay: '400'
  },
  {
    id: 4,
    img: Img4,
    title: 'Nồi chiên không dầu Uni 12 lít AF-12 Air Fryer',
    rating: 4.4,
    color: 'Black',
    aosDelay: '600'
  },
  {
    id: 5,
    img: Img5,
    title: 'Apple Watch Series 7 GPS 41mm',
    rating: 4.5,
    color: 'Brown',
    aosDelay: '800'
  }
]

const Products = () => {
  return (
    <div className='dark:bg-gray-950 dark:text-white duration-200 p-4' >
      <div className='mt-14 mb-12 '>
        <div className='container '>
          {/* Header section  */}
          <div className='text-center mb-10 max-w-[600px] mx-auto'>
            <p data-aos='fade-up' className='text-sm text-primary'>
              Sản phẩm bán chạy nhất
            </p>
            <h1 data-aos='fade-up' className='text-3xl font-bold'>
              Mua online siêu rẻ
            </h1>
            <p data-aos='fade-up' className='text-xs text-gray-400'>
              Tiện lợi, nhanh chóng và an toàn
            </p>
          </div>
          {/* Body section  */}
          <div>
            <div
              className='grid grid-cols-1 sm:grid-cols-3
          md:grid-cols-4 lg:grid-cols-5
          place-items-center gap-5'
            >
              {/* card section  */}
              {ProductsData.map((data) => (
                <div
                  data-aos='fade-up'
                  data-aos-delay={data.aosDelay}
                  key={data.id}
                  className='space-y-3 flex items-center flex-col'
                >
                  <img
                    className='h-[220px] w-[150px] 
                object-cover rounded-md text-center'
                    src={data.img}
                    alt=''
                  />
                  <div>
                    <h3 className='font-semibold'>{data.title}</h3>
                    <p className='text-sm text-gray-600'>{data.color}</p>
                    <div className='flex items-center gap-1'>
                      <FaStar className='text-yellow-400' />
                      <span>{data.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
