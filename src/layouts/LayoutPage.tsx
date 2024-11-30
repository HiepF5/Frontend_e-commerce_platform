import React from 'react'
import Navbar from '@layouts/components/Navbar/Navbar'
import Footer from '@layouts/components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import ChatBot from '@features/ChatBot/components/ChatBot'

const LayoutPage = () => {
  return (
    <div>
      <Navbar />
      <div className='relative' style={{ minHeight: '87vh' }}>
        <Outlet />
      </div>
      <ChatBot />
      <Footer />
    </div>
  )
}

export default LayoutPage
