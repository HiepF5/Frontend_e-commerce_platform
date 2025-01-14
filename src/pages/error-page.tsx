import { useNavigate } from 'react-router-dom'
import './ErrorPage.css' // Giữ lại CSS riêng

const ErrorPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/') // Điều hướng về trang chủ
  }

  return (
    <section className='page_404 flex items-center justify-center h-screen'>
      <div className='container mx-auto text-center'>
        <div className='four_zero_four_bg mb-6'>
          <h1 className='text-9xl font-extrabold text-gray-800'>404</h1>
        </div>
        <div className='contant_box_404'>
          <h3 className='text-2xl font-semibold text-gray-700'>
            Look like you're lost
          </h3>
          <p className='text-gray-500 mb-6'>
            The page you are looking for is not available!
          </p>
          <button
            className='link_404 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
            onClick={handleGoHome}
          >
            Go to Home
          </button>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
