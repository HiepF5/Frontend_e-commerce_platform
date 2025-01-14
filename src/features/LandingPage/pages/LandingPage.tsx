import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'
import Hero from '../components/Hero/Hero';
import Products from '../components/Products/Products';
import TopProducts from '../components/TopProducts/TopProducts';
import Banner from '../components/Banner/Banner';
import Subscribe from '../components/Subscribe/Subscribe';
import Testimonials from '../components/Testimonials/Testimonials';
import Navbar from '../../../layouts/components/Navbar/Navbar';
import Footer from '../../../layouts/components/Footer/Footer';
import ChatBot from '@features/ChatBot/components/ChatBot';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate()
  const handleRedirectToProduct = () => {
    navigate('/products/product-list')
  }
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100
    })
    AOS.refresh()
  }, [])
  return (
    <div>
      <Navbar />
      <Hero handleRedirectToProduct={handleRedirectToProduct} />
      <Products />
      <TopProducts handleRedirectToProduct={handleRedirectToProduct} />
      <Banner />
      <Subscribe />
      <Testimonials />
      <Footer />
      <ChatBot />
    </div>
  )
}

export default LandingPage
