import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from 'react-icons/ci'
import { GoChevronDown } from 'react-icons/go'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb'
import { IoChevronDownOutline } from 'react-icons/io5'

const Orders = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || 1)); // Get the current page from the URL query params
    const [allUnits, setAllUnits] = useState([])
    const [unit, setUnit] = useState('')
    const [subUnit, setSubUnit] = useState('')
    const [allSubUnits, setAllSubUnits] = useState([])
    const [dropDown, setDropDown] = useState('')
    const [startDateFilter, setStartDateFilter] = useState('')
    const [endDateFilter, setEndDateFilter] = useState('')
    const [alertType, setAlertType] = useState('')

    async function getAllOrders(page) {
        const res = await fetch(`${baseUrl}/trade/admin/orders?page=${page}`, {
            headers: {
                Authorization: `Bearer ${user.data.access_token}`
            }
        });
        const data = await res.json();
        setAllOrders(data.data.orders);
        console.log(data.data);
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

    useEffect(() => {
        getAllOrders(currentPage);
        getAllUnits()
    }, [currentPage, searchParams])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            setSearchParams({ page: prevPage });
            // Fetch the filtered or unfiltered data for the previous page
            if (unit || subUnit || startDateFilter || endDateFilter) {
                filterOrderHistory(prevPage);  // For filtered data
            } else {
                getAllOrders(prevPage);  // For unfiltered data
            }
        }
    };
    
    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setSearchParams({ page: nextPage });
        // Fetch the filtered or unfiltered data for the next page
        if (unit || subUnit || startDateFilter || endDateFilter) {
            filterOrderHistory(nextPage);  // For filtered data
        } else {
            getAllOrders(nextPage);  // For unfiltered data
        }
    };
    

    async function filterOrderHistory(page = 1) {
        const queryParams = [];
    
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
    
        const queryString = queryParams.length ? `${queryParams.join('&')}` : '';
        console.log(`${baseUrl}/trade/admin/orders?page=${page}&${queryString}`);
        
        const res = await fetch(`${baseUrl}/trade/admin/orders?page=${page}&${queryString}`, {
            headers: {
                'Authorization': `Bearer ${user.data.access_token}`
            }
        });
        
        const data = await res.json();
        setAllOrders(data.data.orders);
        console.log(data.data);
    }
    


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
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Orders</p>
                        </div>
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
                                    <div className='border mt-1 rounded-[6px] bg-[#fff] text-[#6F7975] p-3'>
                                        <div>
                                            <label className='block text-left mt-2'>Start Date</label>
                                            <input onChange={e => setStartDateFilter(e.target.value)} type="date" className='outline-none w-full rounded-[4px] capitalize bg-transparent border p-3'/>
                                        </div>
                                        <div>
                                            <label className='block text-left mt-2'>End Date</label>
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
                                        <button onClick={() => filterOrderHistory(1)} className='text-white text-[14px] bg-[#2D3934] w-full rounded-[4px] px-[15px] py-[6px] text-center mx-auto mt-3'>Apply Filter</button>
                                </div>
                            }
                        </div>
                        <Link to="/assign-pickup" className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]' >Assign pick up</Link>
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 p-2 lg:p-8 flex flex-col gap-3">
                    {/* <div>
                        <p>Nwaigwe Zainab Ayomide <span className='text-[#333]'>- Assignee</span> </p>
                    </div> */}
                    {
                        allOrders?.map((order, index) => {
                            const formattedDate = new Date(order?.createdAt).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
                            const formattedTime = new Date(order?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                            return(
                                <div className='bg-[#F7F7F7] flex  items-center justify-between px-5 py-3 rounded-[8px] text-[12px] text-[#4F4F4F]'>
                                    <p className='font-[600] text-black'>{index + 1}</p>
                                    <p className='text-[#333] flex items-center'><TbCurrencyNaira className="text-[16px]"/>{order.totalAmount}</p>
                                    <p>{order?.user?.fullName} - {order?.user?.role}</p>
                                    <p className={order?.status === 'delivered' ? 'text-[#25751E] bg-[#25751E1A] px-3 rounded-full py-[2px] capitalize':'text-[#9A7225] bg-[#9A72251A] px-3 rounded-full py-[2px] capitalize'}>{order.status}</p>
                                    <p>{formattedDate}, {formattedTime}</p>
                                    <button className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]' onClick={() => navigate(`/order/${order._id}`)} >View</button>
                                </div>
                            )
                        })
                    }
                    {/* {
                        msg && <p className='text-[#9A2525] text-center'>{msg}</p>
                    } */}
                </div>
                <div className="flex justify-end gap-5 p-6 items-center mt-5">
                    <button onClick={handlePreviousPage} className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'>
                        Previous
                    </button>
                    <button onClick={handleNextPage} className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'>
                        Next
                    </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Orders