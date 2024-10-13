import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from 'react-icons/ci'
import { GoChevronDown } from 'react-icons/go'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb'
import { PiPencil } from 'react-icons/pi'
import { BiTrash } from 'react-icons/bi'
import { IoChevronDownOutline, IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'

const AssignPickup = ({baseUrl}) => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allPickUps, setAllPickUps] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [addPickup, setAddPickup] = useState()
    const [editPickup, setEditPickup] = useState()
    const [deletePickup, setDeletePickup] = useState()
    const [dropDown, setDropDown] = useState()
    const [allSubUnits, setAllSubUnits] = useState()
    const [allUnits, setAllUnits] = useState()
    const [subunit, setSubunit] = useState()
    const [unit, setUnit] = useState()
    const [allAssignee, setAllAsignee] = useState([])
    const [assignee, setAssignee] = useState()
    const [allStaffs, setAllStaffs] = useState()
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || 1)); // Get the current page from the URL query params

    async function getAllPickUps(){
        const res = await fetch(`${baseUrl}/trade/order-pickups?organizationId=${user.data.details._id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setAllPickUps(data.data)
        console.log(data.data);
    }

    useEffect(() => {
        getAllPickUps();
        getAllUnits();
        getAllStaffs();
    }, [])

    async function getPickupInfo(id) {
        setEditPickup(id)
        console.log(`${baseUrl}/trade/order-pickups/${id}`);
        
        const res = await fetch(`${baseUrl}/trade/order-pickups/${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()

        console.log(data);
    }

    async function editPickUpFn() { }

    async function deletePickUpFn() {
        console.log(`${baseUrl}/trade/order-pickups/${deletePickup}`);
        
        const res = await fetch(`${baseUrl}/trade/order-pickups/${deletePickup}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        if(res.ok){
            getAllPickUps()
            setDeletePickup(false)
            setMsg('Pickup deleted successfully');
            setAlertType('success');
        }
    }

    async function getAllSubUnits(unitId){
        console.log(unitId);
        
        const res = await fetch(`${baseUrl}/unit/${unitId}/subunits`,{
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

    async function getAllStaffs(){
        const res = await fetch(`${baseUrl}/users/get-users/staff?role=staff`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.users);
        setAllStaffs(data.data.users)
    }

    async function assignPickup(){
        console.log({assignee:assignee._id, subunit:subunit._id, unit:unit._id});
        
        const res = await fetch(`${baseUrl}/trade/order-pickups?organizationId=${user.data.details._id}`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            },
            body:JSON.stringify({assignee:assignee._id, subunit:subunit._id, unit:unit._id})
        })
        if(res.ok){
            getAllPickUps()
            setAddPickup(false)
            setMsg('Pickup assigned successfully');
            setAlertType('success');
        }
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
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/orders')} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">All Pickups</p>
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
                        <button onClick={() => setAddPickup(true)} className='bg-[#19201D] text-white px-[20px] text-[15px] py-2 rounded-[6px]' >Assign pick up</button>
                    </div>
                </div>

                <div class="relative overflow-x-auto mx-5 mt-10 py-8">
                    <table class="w-full text-sm text-left rtl:text-left">
                        <thead class="text-[14px] border-b">
                            <tr>
                                <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Assingee</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Unit</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Sub Unit</th>
                                <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            allPickUps?.map((pickup, index) => {
                                // const formattedTime = new Date(item?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                                return (
                                    <tr className='text-[#19201D]'>
                                        <td className='px-6 py-3'>{index + 1}</td>
                                        <td className='px-6 flex items-center gap-1 py-3'>{pickup?.assignee?.fullName}</td>
                                        <td className='px-6'>{pickup?.unit?.name}</td>
                                        <td className='px-6'>{pickup?.subunit?.name}</td>
                                        <td className='px-6'>
                                            <div>
                                                <button onClick={() => getPickupInfo(pickup._id)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px] ml-3'>
                                                    <PiPencil />
                                                </button>
                                                {/* <button onClick={() => setDeletePickup(pickup._id)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px] ml-3'>
                                                    <BiTrash />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>


                {/* <div class="relative overflow-x-auto mx-5 p-2 lg:p-8 flex flex-col gap-3">
                    {
                        allPickUps?.map((pickup, index) => {
                            // const formattedDate = new Date(order?.createdAt).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
                            // const formattedTime = new Date(order?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                            return(
                                <div className='bg-[#F7F7F7] flex  items-center justify-between px-5 py-3 rounded-[8px] text-[12px] text-[#4F4F4F]'>
                                    <p className='font-[600] text-black'>{index + 1}</p>
                                    <p className='text-[#333] flex items-center'>{pickup?.assignee?.fullName}</p>
                                    <p>{pickup?.unit?.name}</p>
                                    <p>{pickup?.subunit?.name}</p>
                                    <button className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]' onClick={() => navigate(`/order/${pickup._id}`)} >View</button>
                                </div>
                            )
                        })
                    }
                </div> */}
            </div>
        </div>
        {
            editPickup &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditPickup(false)}></div>
                <div className="bg-white sm:max-w-[550px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Edit Pickup</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditPickup(false)}/>
                    </div>
                    <div className='relative w-[100%] my-7'>
                        <label className='block text-left mb-2'>Select Asignee</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                            <input type="text" value={assignee?.fullName} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "asignee" ? false : "asignee")} />
                        </div>
                        {
                            dropDown === 'asignee' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                {
                                    allStaffs?.map(staff => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setAssignee(staff)
                                                setDropDown(false)
                                            }}>{staff.fullName}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='relative w-[100%] my-7'>
                        <label className='block text-left mb-2'>Select Unit</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                            <input type="text" value={unit?.name} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
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
                                                getAllSubUnits(unit._id)
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
                                            }}>{subUnit.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className="flex justify-end gap-5 p-6 items-center mt-5">
                        <button className='text-[#2D3934] border border-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'>Back</button>
                        <button onClick={assignPickup} className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'>Assign</button>
                    </div>
                </div>
            </div>
        }

        {
            deletePickup &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeletePickup(false)}></div>
                <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Pickup</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeletePickup(false)}/>
                    </div>
                    <p className='text-center text-[15px] mt-10'>Are you sure, you want to delete this pickup?</p>
                    <button onClick={deletePickUpFn} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Delete</button>
                </div>
            </div>
        }

        {
            addPickup &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setAddPickup(false)}></div>
                <div className="bg-white sm:max-w-[550px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Add Pickup</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setAddPickup(false)}/>
                    </div>
                    <div className='relative w-[100%] my-7'>
                        <label className='block text-left mb-2'>Select Asignee</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                            <input type="text" value={assignee?.fullName} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "asignee" ? false : "asignee")} />
                        </div>
                        {
                            dropDown === 'asignee' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                {
                                    allStaffs?.map(staff => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setAssignee(staff)
                                                setDropDown(false)
                                            }}>{staff.fullName}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='relative w-[100%] my-7'>
                        <label className='block text-left mb-2'>Select Unit</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                            <input type="text" value={unit?.name} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
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
                                                getAllSubUnits(unit._id)
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
                                            }}>{subUnit.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className="flex justify-end gap-5 p-6 items-center mt-5">
                        <button className='text-[#2D3934] border border-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'>Back</button>
                        <button onClick={assignPickup} className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'>Assign</button>
                    </div>
                </div>
            </div>
        }

        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default AssignPickup