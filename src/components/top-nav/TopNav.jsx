import React, { useState } from 'react'
import { IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import LogoutModal from '../logout-modal/LogoutModal';
import { useNavigate } from 'react-router-dom';


const TopNav = ({toggleNav, setToggleNav}) => {

  const [logoutModal, setLogoutModal] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='bg-[#1D2522] flex items-center justify-between w-[100%] py-[1.2rem] top-0 right-0 z-[99] px-5'>
      <div className='flex items-center gap-5'>
        <img src="./images/admin-profile-icon.png" onClick={() => navigate('/orgz-profile')} className='w-[40px] h-[40px] cursor-pointer' alt="" />
        {/* <div className='bg-[#C3FAE2] text-[20px] text-[#19201D] w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-full'>
          <IoNotificationsOutline />
        </div>
        <div className='bg-[#C3FAE2] text-[20px] text-[#19201D] w-[40px] h-[40px] cursor-pointer flex items-center justify-center rounded-full'>
          <LuSettings2 />
        </div> */}
      </div>
      <div className='flex items-center gap-10'>
        {/* <div className='flex items-center gap-3 bg-[#E7FDF4] rounded-[4px] pr-4 py-[5px] w-[300px]'>
          <input type="text" placeholder='Search the dashboard' className='text-[#242E2A] w-full placeholder:text-[#242E2A] bg-transparent text-[14px] outline-none px-4 py-[5px]' style={{ borderRight:'1px solid #242E2A4D' }}/>
          <CiSearch className='text-[#242E2A] cursor-pointer'/>
        </div> */}
        <div onClick={() => {
          setLogoutModal(true)
        }} className='text-[#19201D] items-center gap-3 bg-[#C3FAE2] py-[9px] px-[16px] rounded-[4px] cursor-pointer hidden lg:flex'>
          <IoIosLogOut fontSize={"20px"}/>
          <p>Logout</p>
        </div>
        <IoMenuOutline className='text-white text-[30px] cursor-pointer block lg:hidden' onClick={() => setToggleNav(!toggleNav)}/>
      </div>
      {
        logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />
      }
    </div>
  )
}

export default TopNav