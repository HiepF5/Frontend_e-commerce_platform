import React from 'react'
import Navbar from '@layouts/components/Navbar/Navbar'
import Footer from '@layouts/components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const LayoutPage = () => {
  return (
    <div>
      <Navbar />
      <div className='h-[87vh]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default LayoutPage
