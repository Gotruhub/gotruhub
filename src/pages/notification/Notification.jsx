import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import { IoIosNotificationsOutline } from "react-icons/io";


const Notification = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allNotification, setAllNotification] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Cash sales", "Wallet sales", "Purchases", "Deposits", "Withdrawals"]
    const [toggleNav, setToggleNav] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    async function getAllNotification(){
        const res = await fetch(`${baseUrl}/notification/${user.data._id}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data);
    }

    useEffect(() => {
        getAllNotification()
    }, [])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[1rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Notification</p>
                        </div>
                    </div>
                    <div className='relative flex items-center gap-[10px]'>
                        {/* <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div> */}
                        <div className='absolute top-[40px] z-10'>
                            {
                                    filterDropDown &&
                                    <div className='border mt-1 rounded-[6px] bg-[#fff] text-[#6F7975]'>
                                    {
                                        filterArray.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p onClick={() => {
                                                        setFilterDropdown(false)
                                                    }} className='cursor-pointer p-3 hover:bg-gray-200'>{item}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 mt-10">
                    <div className='bg-[#F7F7F7] px-8 py-6 sm:w-[90%] w-full rounded-[16px]'>
                        <div className='flex items-ceter justify-between'>
                            <div className='flex items-center gap-3 text-[#9A2525]'>
                                <IoIosNotificationsOutline className='font-[700] bg-[#9A25251A] text-[30px] p-1 rounded-full'/>
                                <p className='font-[600]'>Unauthorized location</p>
                            </div>
                            <p className='text-[#4F4F4F] font-[600] cursor-pointer'>Mark as read</p>
                        </div>
                        <p className='text-[#19201D] mt-4 cursor-pointer inline-block'>Ngozi Oduduwa - member signed in for COS 101 at 8.29780,3.346063 by Benjamin Adamu - admin</p>
                        <p className='text-[#4F4F4F] text-[14px] mt-4'>09 March, 2024 - 11:56AM</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification