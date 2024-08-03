import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import { CiFilter } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';
import { IoChevronDownOutline } from 'react-icons/io5';

const Summary = ({baseUrl}) => {

    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams()
    const navigate = useNavigate()
    const [allAttendanceSummary, setAllAttendanceSummary] = useState()
    const [dropDown, setDropDown] = useState()
    const [allSchedules, setAllSchedules] = useState()
    const [schedule, setSchedule] = useState()
    const [allSubUnits, setAllSubUnits] = useState()
    const [allUnits, setAllUnits] = useState()
    const [subunit, setSubunit] = useState()
    const [unit, setUnit] = useState()
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)
    const [toggleNav, setToggleNav] = useState(false)

    async function getAllSchedule(subUbitId){
        const res = await fetch(`${baseUrl}/schedule/${subUbitId._id}`,{
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
            setAllSchedules(data.data);
            // setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getAllUnits()
        // getAllAttendanceSummary()
    }, [])

    async function getAllSubUnits(unitId){
        const res = await fetch(`${baseUrl}/unit/${unitId._id}/subunits`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllSubUnits(data.data.units);
            setAlertType('success');
            return;
        }
    }

    async function getAllUnits(){
        const res = await fetch(`${baseUrl}/units`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllUnits(data.data.units);
            setAlertType('success');
            return;
        }
    }

    async function getSummary(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/attendance/schedule/${schedule._id}`,{
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
            setLoading(false)
            // setAlertType('success');
            return;
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lgtext-[28px] text-primary-color font-[600]">Attendance Summary</p>
                    </div>
                    {/* <div className='relative flex items-center gap-[10px]'>
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
                    </div> */}
                </div>
                <div className='flex items-end justify-between px-[10px] lg:px-[30px] w-full'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 items-end gap-5 w-full my-[1rem]'>
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Unit</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                                <input type="text" value={unit?.name} className='outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "unit" ? false : "unit")} />
                            </div>
                            {
                                dropDown === 'unit' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allUnits?.map(unit => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setUnit(unit)
                                                    setDropDown(false)
                                                    getAllSubUnits(unit)
                                                }}>{unit.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Sub-Unit</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                                <input type="text" value={subunit?.name} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "sub-unit" ? false : "sub-unit")} />
                            </div>
                            {
                                dropDown === 'sub-unit' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allSubUnits?.map(subUnit => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setSubunit(subUnit)
                                                    setDropDown(false)
                                                    getAllSchedule(subUnit)
                                                }}>{subUnit.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Schedule</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 '>
                                <input type="text" value={schedule?.code} className='outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "schedules" ? false : "schedules")} />
                            </div>
                            {
                                dropDown === 'schedules' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allSchedules?.length < 1 &&
                                        <p className='text-center p-5 text-[14px]'>No schedule for the selected unit and subunit</p>
                                    }
                                    {
                                        allSchedules?.map(schedule => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setSchedule(schedule)
                                                    setDropDown(false)
                                                }}>{schedule.code}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className="w-[100%]">
                            <button onClick={getSummary} className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px] text-[14px] w-full'>Get Summary</button>
                        </div>
                    </div>
                </div>
                <div class="relative overflow-x-auto lg:mx-5 mt-10 lg:p-8 p-4">
                        {
                            allAttendanceSummary && allAttendanceSummary.length < 1 &&
                            <p className='text-center p-5 text-[14px]'>No Attendance Summary for the selected unit, subunit and schedule</p>
                        }
                    <table class="w-full text-sm text-left rtl:text-left">
                    <thead class="text-[14px] border-b">
                        <tr>
                            <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Sub Unit</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Attendance Type</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Remark</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Start Time</th>
                            <th scope="col" class="px-6 py-3 font-[700]">End Time</th>
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
                                        <td className='px-6  py-3'>{index + 1}</td>
                                        <td className='px-6 py-3'>{item?.classScheduleId?.course?.subUnit?.name}</td>
                                        <td className='px-6 py-3'>{item?.attendanceType}</td>
                                        <td className='px-6 py-3'>{item?.remark}</td>
                                        <td className='px-6 py-3'>{formatTime(item?.classScheduleId?.startTime)}</td>
                                        <td className='px-6 py-3'>{formatTime(item?.classScheduleId?.endTime)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Summary