import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import { CiFilter } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';

const AttendanceSummary = ({baseUrl}) => {

    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams()
    const navigate = useNavigate()
    const [allAttendanceSummary, setAllAttendanceSummary] = useState([])
    const [toggleNav, setToggleNav] = useState(false)

    async function getAllAttendanceSummary(){
        const res = await fetch(`${baseUrl}/attendance/schedule/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllAttendanceSummary(data.data);
            // setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getAllAttendanceSummary()
    }, [])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Attendance Summary</p>
                    </div>
                    <div className='relative flex items-center gap-[10px]'>
                        <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div>
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
                <div class="relative overflow-x-auto mx-5 mt-10 p-8">
                    <table class="w-full text-sm text-left rtl:text-left">
                    <thead class="text-[14px] border-b">
                        <tr>
                            <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                            <th scope="col" class="py-3 font-[700]">Sub Unit</th>
                            <th scope="col" class="py-3 font-[700]">Attendance Type</th>
                            <th scope="col" class="py-3 font-[700]">Start Time</th>
                            <th scope="col" class="py-3 font-[700]">End Time</th>
                            <th scope="col" class="py-3 font-[700]">Location</th>
                            <th scope="col" class="py-3 font-[700]">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        allAttendanceSummary && allAttendanceSummary?.map((item, index) => {
                            const formatTime = (time) => {
                                const timeStr = String(time); // Convert time to a string
                                return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
                            };

                            return (
                                <tr className='text-[#19201D]' key={index}>
                                    <td className='py-3'>{index + 1}</td>
                                    <td>{item?.classScheduleId?.course?.subUnit?.name}</td>
                                    <td>{item?.attendanceType}</td>
                                    <td>{formatTime(item?.classScheduleId?.startTime)}</td>
                                    <td>{formatTime(item?.classScheduleId?.endTime)}</td>
                                    <td className={item?.isValid === true ? `text-green-500 cursor-pointer`: `text-red-500 cursor-pointer`} onClick={() => {
                                        window.open(`https://www.google.com/maps/search/?api=1&query=${item?.location.lat},${item?.location.long}`, '_blank')
                                    }} >{item?.location.lat}, {item?.location.long}</td>
                                    <td>{item?.remark}</td>
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

export default AttendanceSummary