import React from 'react'
import Logo from '@assets/logo.png'
import { IoMdSearch } from 'react-icons/io'
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6'
import { FaSignInAlt } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'
import DarkMode from './DarkMode'
import { data } from 'autoprefixer'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@store/hook'
import { Avatar, Box, Typography } from '@mui/material'
import { logout } from '@features/Authentication/slices/authSlice'
import { toast } from 'react-toastify'
import { Menu, DropdownLinks } from '@config/constants/paths'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigate = useNavigate()
   const dispatch = useAppDispatch() 
  const handleSignIn = () => {
    navigate('/auth/signin')

  }
  const handleSignOut = () => {
    localStorage.removeItem('user')
    dispatch(logout())
    Cookies.remove('accessToken')
    navigate('/')
    toast.success('SignOut success')
  }
  const handleRegister = () => {
    navigate('/auth/signup')
  }
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return (
    <div
      className='shadow-md bg-white
     dark:bg-gray-900 dark:text-white 
     duration-200 relative z-40'
    >
      {/* Upper Navbar */}
      <div className='bg-primary py-2'>
        <div
          className='container flex 
        justify-between items-center '
        >
          <div>
            <a href='#' className='font-bold text-2xl sm:text-3xl flex gap-2'>
              <img src={Logo} alt='Logo' className='w-10 uppercase' />
              Shopsy
            </a>
          </div>
          {/* search bar */}
          <div
            className='flex justify-between
           items-center gap-4'
          >
            <div className='relative group hidden sm:block'>
              <input
                type='text'
                placeholder='search'
                className='w-[200px] sm: w-[200px] 
                group-hover:w-[300px] transition-all 
                duration-300 rounded-full border
                border-gray-300 px-2 py-1 focus:outline-none
                focus:border-1
                focus:border-primary 
                dark:border-gray-500
                dark:bg-gray-800'
              />
              <IoMdSearch
                className='text-gray-500
              group-hover:text-primary
              absolute top-1/2 -translate-y-1/2 right-3
              '
              />
            </div>
            {/* order button */}
            <button
              className='bg-gradient-to-r from-orange-400
          to-lime-400 transition-all duration-200
          text-white py-1 px-4 rounded-full flex 
          items-center gap-3 group'
            >
              <span
                className='group-hover:block 
            hidden transition-all
            duration-200'
              >
                Order
              </span>
              <FaCartShopping
                className='text-xl
             text-white
               drop-shadow-sm 
               cursor-pointer
             '
              />
            </button>
            {!user?.full_name ? (
              <>
                <button
                  onClick={() => handleSignIn()}
                  className='bg-gradient-to-r from-orange-400
          to-lime-400 transition-all duration-200
          text-white py-1 px-4 rounded-full flex 
          items-center gap-3 group'
                >
                  <span
                    className='group-hover:block 
            hidden transition-all
            duration-200'
                  >
                    SignIn
                  </span>
                  <FaSignInAlt
                    className='text-xl
             text-white
               drop-shadow-sm 
               cursor-pointer
             '
                  />
                </button>
                <button
                  onClick={() => handleRegister()}
                  className='bg-gradient-to-r from-orange-400
          to-lime-400 transition-all duration-200
          text-white py-1 px-4 rounded-full flex 
          items-center gap-3 group'
                >
                  <span
                    className='group-hover:block 
            hidden transition-all
            duration-200'
                  >
                    Register
                  </span>
                  <FaUserCircle
                    className='text-xl
             text-white
               drop-shadow-sm 
               cursor-pointer
             '
                  />
                </button>
              </>
            ) : (
              <>
                <Box
                  display='flex'
                  alignItems='center'
                  gap={2}
                  onClick={() => navigate('/user/profile')}
                >
                  <Avatar
                    src={user?.image_url}
                    alt='User'
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography>{user?.full_name}</Typography>
                </Box>
                <button
                  onClick={() => handleSignOut()}
                  className='bg-gradient-to-r from-orange-400
          to-lime-400 transition-all duration-200
          text-white py-1 px-4 rounded-full flex 
          items-center gap-3 group'
                >
                  <span
                    className='group-hover:block 
            hidden transition-all
            duration-200'
                  >
                    SignOut
                  </span>
                  <FaSignInAlt
                    className='text-xl
             text-white
               drop-shadow-sm 
               cursor-pointer
             '
                  />
                </button>
              </>
            )}
            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      {/* Lower Navbar */}
      <div className='flex justify-center'>
        <ul className='sm:flex hidden items-center gap-4'>
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className='inline-block px-4
              hover:text-primary duration-200'
              >
                {data.name}
              </a>
            </li>
          ))}
          {/* Simple Dropdown and Links */}
          <li className='group relative cursor-pointer'>
            <a
              href='#'
              className='flex items-center gap-[2px] py-2 duration-200'
            >
              Trending Products
              <span>
                <FaCaretDown
                  className='transition-all
                  duration-200
                  group-hover:rotate-180'
                />
              </span>
            </a>
            <div
              className='absolute z-[9999]
            hidden group-hover:block w-[150px] rounded-md
            bg-white p-2 text-black shadow-md'
            >
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className='inline-block w-full
                     rounded-md p-2
                     hover:bg-primary/20'
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default Navbar
