import React, { useEffect, useState } from 'react'
import { IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import LogoutModal from '../logout-modal/LogoutModal';
import { useNavigate } from 'react-router-dom';


const TopNav = ({toggleNav, setToggleNav, baseUrl}) => {

  const [logoutModal, setLogoutModal] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  async function getAllNotification(){
    const res = await fetch(`${baseUrl}/notification/${user.data.details._id}`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    setNotificationCount(data.data.totalNotifications)
    console.log(data);
}

useEffect(() => {
    getAllNotification()
}, [])

  return (
    <div className='bg-[#1D2522] flex items-center justify-between w-[100%] py-[1.2rem] top-0 right-0 z-[99] px-5'>
      <div className='flex items-center gap-5'>
        {
          user?.data?.details?.logo?.file ?
          <img src={user?.data?.details?.logo?.file} onClick={() => navigate('/orgz-profile')} alt="" className="w-[50px] h-[50px] rounded-full object-cover" />
          :
          <img src="./images/admin-profile-icon.png" onClick={() => navigate('/orgz-profile')} className='w-[40px] h-[40px] cursor-pointer' alt="" />
        }
        {/* <img src="./images/admin-profile-icon.png" onClick={() => navigate('/orgz-profile')} className='w-[40px] h-[40px] cursor-pointer' alt="" /> */}
        <div onClick={() => navigate('/notification')} className='bg-[#C3FAE2] text-[20px] text-[#19201D] w-[40px] h-[40px] flex relative items-center justify-center cursor-pointer rounded-full'>
          <IoNotificationsOutline />
          <div className='absolute top-[-10px] text-[14px] right-[-8px] border-2 border-[#1E2522] bg-gray-200 px-[6px] rounded-full'>
            {
              notificationCount && <p>{notificationCount}</p>
            }
          </div>
        </div>
        {/* <div className='bg-[#C3FAE2] text-[20px] text-[#19201D] w-[40px] h-[40px] cursor-pointer flex items-center justify-center rounded-full'>
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