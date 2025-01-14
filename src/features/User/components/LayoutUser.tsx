import NavbarLayoutUser from '@features/User/components/NavbarLayoutUser'

import { Outlet } from 'react-router-dom';

const LayoutUser = () => {
  return (
    <div className='bg-[#F9FAFB]'>
      <div className='grid grid-cols-12'>
        <div className='col-span-2'>
          <NavbarLayoutUser />
        </div>
        <div className='col-span-10'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default LayoutUser
