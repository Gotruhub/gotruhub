import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import { IoChevronDownOutline } from 'react-icons/io5';

const Pass = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [passHistory, setPassHistory] = useState([])
    const [msg, setMsg] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)
    const [allUnits, setAllUnits] = useState([])
    const [unit, setUnit] = useState('')
    const [subUnit, setSubUnit] = useState('')
    const [allSubUnits, setAllSubUnits] = useState([])
    const [dropDown, setDropDown] = useState('')
    const [startDateFilter, setStartDateFilter] = useState('')
    const [endDateFilter, setEndDateFilter] = useState('')
    const [alertType, setAlertType] = useState('')

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

    async function getPassHistory(){
        const res = await fetch(`${baseUrl}/pass-history`,{
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setPassHistory(data.data)
        console.log(data.data);
    }

    async function filterPassHistory() {
        // Initialize an array to hold query parameters
        const queryParams = [];
    
        // Check if filter states have data and push relevant query parameters
        if (unit && unit._id) {
            queryParams.push(`unit=${unit._id}`);
        }
        if (subUnit && subUnit._id) {
            queryParams.push(`subunit=${subUnit._id}`);
        }
        if (startDateFilter) {
            queryParams.push(`startDate=${startDateFilter}`);
        }
        if (endDateFilter) {
            queryParams.push(`endDate=${endDateFilter}`);
        }
    
        // Join the query parameters with "&" and prepend with "?" if there are any
        const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    
        console.log(`${baseUrl}/pass-history${queryString}`);
    
        const res = await fetch(`${baseUrl}/pass-history${queryString}`, {
            headers: {
                'Authorization': `Bearer ${user.data.access_token}`
            }
        });
    
        const data = await res.json();
    
        // Set filtered pass history
        setPassHistory(data.data);
        console.log(data.data);
    }
    

    useEffect(() => {
        getPassHistory()
        getAllUnits()
    },[])

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
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Pass</p>
                        </div>
                    </div>
                    <div className='relative flex items-center gap-[10px]'>
                        <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div>
                        <button className='text-white text-[14px] bg-[#2D3934] w-full rounded-[4px] px-[15px] py-[6px] text-center mx-auto' onClick={() => navigate('/location')}>Location</button>
                        <div className='absolute top-[40px] z-10'>
                            {
                                    filterDropDown &&
                                    <div className='border mt-1 rounded-[6px] bg-[#fff] text-[#6F7975] p-3'>
                                        <div>
                                            <label className='block text-left mb-2'>Start Date</label>
                                            <input onChange={e => setStartDateFilter(e.target.value)} type="date" className='outline-none w-full rounded-[4px] capitalize bg-transparent border p-3'/>
                                        </div>
                                        <div>
                                            <label className='block text-left mb-2'>End Date</label>
                                            <input onChange={e => setEndDateFilter(e.target.value)} type="date" className='outline-none w-full rounded-[4px] capitalize bg-transparent border p-3'/>
                                        </div>
                                        <div className='w-full relative my-6'>
                                            <label className='block text-left mb-2'>Select Unit</label>
                                            <div className='flex items-center justify-between border rounded-[6px] p-3 w-full'>
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
                                        <div className='w-full relative'>
                                            <label className='block text-left mb-2'>Select Sub-Unit</label>
                                            <div className='flex items-center justify-between border rounded-[6px] p-3 w-full'>
                                                <input type="text" value={subUnit?.name} className='outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "sub-unit" ? false : "sub-unit")} />
                                            </div>
                                            {
                                                dropDown === 'sub-unit' &&
                                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                                    {
                                                        allSubUnits?.map(subUnit => {
                                                            return (
                                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                                    setSubUnit(subUnit)
                                                                    setDropDown(false)
                                                                }}>{subUnit.name}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <button onClick={filterPassHistory} className='text-white text-[14px] bg-[#2D3934] w-full rounded-[4px] px-[15px] py-[6px] text-center mx-auto mt-3'>Apply Filter</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 mt-10 py-8">
                    <table class="w-full text-sm text-left rtl:text-left">
                        <thead class="text-[13px] border-b">
                            <tr>
                                <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Member</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Scanned By</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Custodian</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Role</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Location</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Time</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Date</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            passHistory && passHistory?.history?.map((item, index) => {
                                const formattedTime = new Date(item?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                                return (
                                    <tr className='text-[#19201D]'>
                                        <td className='px-6 py-3'>{index + 1}</td>
                                        <td className='px-6 flex items-center gap-1 py-3'>
                                            <img src={item?.user?.profileImage?.file} className='w-[30px] rounded-full h-[30px] object-cover' alt="" />
                                            <p>{item?.user?.fullName}</p>
                                        </td>
                                        <td className='px-6'>{item?.scannedBy?.fullName}</td>
                                        <td className='px-6'>{item?.approvalBy?.fullName}</td>
                                        <td className='px-6'>{item?.scannedBy?.role}</td>
                                        <td className='text-[#25751E] underline px-6'>{item?.coordinate?.lat}, {item?.coordinate?.long}</td>
                                        <td className='px-6'>{formattedTime}</td>
                                        <td className='px-6'>{new Date(item?.createdAt).toLocaleDateString()}</td>
                                        <td className='px-6'>
                                            <p className={item?.isValid === false ? 'text-[#ffffff] py-1 px-2 rounded-[3px] bg-red-600 inline':'text-[#418B47] py-1 px-2 rounded-[3px] bg-[#5FB56766] inline'}>{item?.actionType}</p>
                                        </td>
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

export default Pass