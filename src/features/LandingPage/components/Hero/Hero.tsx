import React from 'react'
import Image1 from '@assets/Images/Hero/sale_blackfriday.png'
import Image2 from '@assets/Images/Hero/sale_daikiosan.png'
import Image3 from '@assets/Images/Hero/sale_iphone.png'
import Slider from 'react-slick'
const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Black Friday Sale upto 50% Off",
    description:
      'Giá sốc hàng ngày giảm giá đến 50% cho tất cả các sản phẩm. Đừng bỏ lỡ cơ hội mua sắm lớn nhất trong năm.'
  },
  {
    id: 2,
    img: Image2,
    title: "Máy lọc nước chính hãng giảm 50% giá",
    description:
      "Chọn lọc đỉnh chất - Bố là đỉnh chót. Máy lọc nước từ các thương hiệu nổi tiếng. Sản phẩm chất lượng, giá cả hợp lý."
  },
  {
    id: 3,
    img: Image3,
    title: 'IPhone 13 Pro Max giảm giá sốc',
    description: 'Mua ngay iPhone 13 Pro Max giảm giá sốc. Số lượng có hạn, nhanh tay kẻo lỡ.'
  }
]
interface HeroProps {
  handleRedirectToProduct: () => void
}

const Hero: React.FC<HeroProps> = ({ handleRedirectToProduct }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div
      className='relative overflow-hidden min-h-[550px]
    sm:min-h-[650px] bg-gray-100 flex justify-center items-center 
    dark:bg-gray-950 dark:text-white duration-200'
    >
      {/* background pattern */}
      <div
        className='h-[700px] w-[700px] bg-primary/40
      absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]'
      ></div>
      {/* hero section*/}
      <div className='container pb-8 sm:pb-0'>
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {/* text content section  */}
                <div
                  className='flex flex-col justify-center gap-4 pt-12 
            sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'
                >
                  <h1
                    data-aos='zoom-out'
                    data-aos-duration='500'
                    data-aos-once='true'
                    className='text-5xl sm:text-6xl
              lg:text-7xl font-bold'
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos='fade-up'
                    data-aos-duration='500'
                    data-aos-delay='100'
                    className='text-sm'
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos='fade-up'
                    data-aos-duration='500'
                    data-aos-delay='300'
                  >
                    <button
                      onClick={handleRedirectToProduct}
                      className='bg-gradient-to-r from-primary
               to-secondary hover:scale-105 
               duration-200 text-white 
               py-2 px-4 rounded-full'
                    >
                      Order Now
                    </button>
                  </div>
                </div>
                {/* image section  */}
                <div className='order-1 sm:order-2'>
                  <div className='relative z-10'>
                    <img
                      data-aos='zoom-in'
                      data-aos-once='true'
                      className='w-[300px] h-[300px]
                 sm:h-[450px] sm:w-[450px] 
                 sm:scale-125 lg:scale-100 
                 object-contain mx-auto'
                      src={data.img}
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Hero
