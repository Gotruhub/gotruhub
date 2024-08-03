import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';

const Pass = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [passHistory, setPassHistory] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Cash sales", "Wallet sales", "Purchases", "Deposits", "Withdrawals"]
    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)

    async function getPassHistory(){
        const res = await fetch(`${baseUrl}/pass-history`,{
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setPassHistory(data.data)
        console.log(data.data[1]);
    }

    useEffect(() => {
        getPassHistory()
    },[])

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
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Pass</p>
                        </div>
                    </div>
                    <div className='relative flex items-center gap-[10px]'>
                        {/* <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div> */}
                        <button className='text-white text-[14px] bg-[#2D3934] w-full rounded-[4px] px-[15px] py-[6px] text-center mx-auto' onClick={() => navigate('/location')}>Location</button>
                        {/* <div className='absolute top-[40px] z-10'>
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
                        </div> */}
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 mt-10 py-8">
                    <table class="w-full text-sm text-left rtl:text-left">
                        <thead class="text-[14px] border-b">
                            <tr>
                                <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Member</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Role</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Location</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Time</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            passHistory && passHistory?.map((item, index) => {
                                const formattedTime = new Date(item?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                                return (
                                    <tr className='text-[#19201D]'>
                                        <td className='px-6 py-3'>{index + 1}</td>
                                        <td className='px-6 flex items-center gap-1 py-3'>
                                            <img src={item?.user?.profileImage?.file} className='w-[30px]' alt="" />
                                            <p>{item?.user?.fullName}</p>
                                        </td>
                                        <td className='px-6'>{item.user.role}</td>
                                        <td className='text-[#25751E] underline px-6'>{item?.coordinate[0]}, {item?.coordinate[1]}</td>
                                        <td className='px-6'>{formattedTime}</td>
                                        <td className='px-6'>
                                            <p className={item?.actionType === "sign-out" ? 'text-[#255e9a] py-1 px-2 rounded-[3px] bg-[#25589a66] inline':'text-[#418B47] py-1 px-2 rounded-[3px] bg-[#5FB56766] inline'}>{item?.actionType}</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {/* <tr className='text-[#19201D]'>
                            <td className='py-3'>2.</td>
                            <td>Timi Gowon</td>
                            <td>Member</td>
                            <td>Aisha Nwosu</td>
                            <td className='text-[#9A2525] underline'>40.7128, -74.0060</td>
                            <td>08:15AM</td>
                            <td>
                                <p className='text-[#9A2525] py-1 px-2 rounded-[3px] bg-[#9A252566] inline'>Sign-Out</p>
                            </td>
                        </tr>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>3.</td>
                            <td>Timi Gowon</td>
                            <td>Member</td>
                            <td>Aisha Nwosu</td>
                            <td className='text-[#25751E] underline'>40.7128, -74.0060</td>
                            <td>08:15AM</td>
                            <td>
                                <p className='text-[#418B47] py-1 px-2 rounded-[3px] bg-[#5FB56766] inline'>Sign-in</p>
                            </td>
                        </tr>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>4.</td>
                            <td>Timi Gowon</td>
                            <td>Member</td>
                            <td>Aisha Nwosu</td>
                            <td className='text-[#9A2525] underline'>40.7128, -74.0060</td>
                            <td>08:15AM</td>
                            <td>
                                <p className='text-[#9A2525] py-1 px-2 rounded-[3px] bg-[#9A252566] inline'>Sign-Out</p>
                            </td>
                        </tr>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>5.</td>
                            <td>Timi Gowon</td>
                            <td>Member</td>
                            <td>Aisha Nwosu</td>
                            <td className='text-[#25751E] underline'>40.7128, -74.0060</td>
                            <td>08:15AM</td>
                            <td>
                                <p className='text-[#418B47] py-1 px-2 rounded-[3px] bg-[#5FB56766] inline'>Sign-in</p>
                            </td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pass