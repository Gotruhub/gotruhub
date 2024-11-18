import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import { IoIosNotificationsOutline } from "react-icons/io";


const NotificationInfo = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Cash sales", "Wallet sales", "Purchases", "Deposits", "Withdrawals"]
    const [toggleNav, setToggleNav] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams()

    async function getNotification(){
        console.log(`${baseUrl}/notification/${user.data.details._id}/${id}`)
        const res = await fetch(`${baseUrl}/notification/${user.data.details._id}/${id}`,{
            method: "PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setNotification(data.data)
        console.log(data);
    }

    useEffect(() => {
        getNotification()
    }, [])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[1rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/notification')} className='cursor-pointer' />
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
                <div className='px-[10px] lg:px-[30px] py-[1rem]'>
                    <div className='flex items-center justify-between'>
                        <p className='font-[500]'>{notification?.title}</p>
                        <p>On { new Date(notification?.createdAt).toLocaleString() }</p>
                    </div>
                    <p className='mt-3'>{notification?.message}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotificationInfo