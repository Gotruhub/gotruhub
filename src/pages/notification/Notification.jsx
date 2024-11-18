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
    const [page, setPage] = useState(1);

    async function getAllNotification(pageNumber){
        console.log(`${user.data.details._id}`)
        const res = await fetch(`${baseUrl}/notification/${user.data.details._id}?page=${pageNumber}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setAllNotification(data.data)
        console.log(data.data);
    }

    async function markNotificationAsRead(notificationId) {
        const res = await fetch(`${baseUrl}/notification/${user.data.details._id}/${notificationId}`,{
            method: "PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        if(res.ok){
            getAllNotification()
        }
    }

    async function incrementPage() {
        setPage((prevPage) => prevPage + 1);
    }

    async function decrementPage() {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    }

    useEffect(() => {
        getAllNotification(page)
    }, [page])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
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
                                        filterArray?.map((item, index) => {
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
                    {
                        allNotification?.notifications?.map(notification => (
                            <div className={notification.read === true ? 'bg-[#F7F7F7] px-8 py-6 w-full rounded-[16px] my-5':  'bg-[#F7F7F7] px-8 py-6 w-full rounded-[16px] my-5 border border-[#1E2522]'}>
                                <div className='flex items-ceter justify-between'>
                                    <div className='flex items-center gap-3 text-[#1E2522]'>
                                        <IoIosNotificationsOutline className='font-[700] bg-[#fff] text-[30px] p-1 rounded-full'/>
                                        <div className='flex items-center gap-2'>
                                            <p className='font-[600]'>{notification?.title}</p>
                                            <p className='text-[11px] font-[500] bg-[#C3FAE2] p-1 rounded-full'>{notification?.type}</p>
                                        </div>
                                    </div>
                                    {
                                        notification.read === false &&
                                        <p className='text-[#4F4F4F] font-[600] cursor-pointer text-[12px]' onClick={() => markNotificationAsRead(notification._id)}>Mark as read</p>
                                    }
                                </div>
                                <p className='text-[#19201D] mt-4 cursor-pointer inline-block'>{notification?.message}</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#4F4F4F] text-[14px] mt-4'>{ new Date(notification?.createdAt).toLocaleDateString() }</p>
                                    <p className='text-[#4F4F4F] mt-4 text-[13px] cursor-pointer' onClick={() => navigate(`/notification/${notification._id}`)}>Read More</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className='flex items-center justify-between'>
                        <button onClick={decrementPage} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>Prev</button>
                        <div className='flex items-center gap-3'>
                            <p>Page {allNotification?.currentPage} of {allNotification?.totalPages}</p>
                        </div>
                        <button onClick={incrementPage} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification