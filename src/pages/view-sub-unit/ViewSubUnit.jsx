import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/alert/Alert'

const ViewSubUnit = ({baseUrl}) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [unitName, setUnitName] = useState('')
    const [toggleNav, setToggleNav] = useState(false)
    const [subUnitInfo, setSubUnitInfo] = useState()
    const [subUnitStats, setSubUnitStats] = useState()
    const [staff, setStaff] = useState()
    

    async function getSubUnitInfo(){
        const res = await fetch(`${baseUrl}/subunits/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(JSON.stringify(data.data.unit));
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setSubUnitInfo(data?.data?.unit)
            getAllStaff(data?.data?.unit.coordinator)
            setAlertType('success');
            return;
        }
    }

    async function getSubUnitStats(){
        const res = await fetch(`${baseUrl}/my-orgnz-summary/subunit-summary/${id}`,{
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
            setSubUnitStats(data?.data)
            return;
        }
    }

    async function getAllStaff(staffId){
        const res = await fetch(`${baseUrl}/users/get-user/${staffId}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.user);
        setStaff(data.data.user)
    }

    useEffect(() => {
        getSubUnitInfo()
        getSubUnitStats()
    },[])


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-center mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">About {unitName}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className='font-[600] text-[#25751E] text-[14px]' onClick={() => navigate(`/co-ordinator/${id}`)} >Coordinator</button> */}
                        {/* <button className="border border-[#2D3934] text-[#19201D] font-[600] px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/sub-unit-assignment-create/${id}`)} >Add assignment</button> */}
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/time-table/${id}`)} >Timetable</button>
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => setEditUnit(true)}/>
                        <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer" onClick={() => setDeleteUnit(true)}/>
                    </div> */}
                </div>

                <div className="lg:m-[30px] m-[10px] p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-[3rem]">
                    <div className="p-4 rounded-lg flex-1 mr-4 w-full sm:w-1/2">
                        <div className="mb-2 flex items-center justify-between">
                            <div>Created</div>
                            <div className="font-bold">{new Date(subUnitInfo?.createdAt).toDateString()}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Last updated</div>
                            <div className="font-bold">{new Date(subUnitInfo?.updatedAt).toDateString()}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Assignments</div>
                            <div className="font-bold">{subUnitStats?.totalAssignments}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Assignees</div>
                            <div className="font-bold">1</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Members</div>
                            <div className="font-bold">{subUnitStats?.totalStudents}</div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-0">
                        {/* <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md flex-1 mx-2">    //w-full sm:w-1/2
                            <div className="flex flex-col items-center">
                                <div className="text-lg font-bold">Members</div>
                                <div className="text-3xl font-bold my-2">32</div>
                                <div className="w-full flex justify-between text-sm">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-green-500 h-2 w-2 rounded-full mb-1"></div>
                                        <div>Early</div>
                                        <div>70%</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-yellow-500 h-2 w-2 rounded-full mb-1"></div>
                                        <div>Late</div>
                                        <div>20%</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-red-500 h-2 w-2 rounded-full mb-1"></div>
                                        <div>Absent</div>
                                        <div>10%</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md flex-1 mx-2">
                            <div className="flex flex-col items-center">
                                <div className="text-lg font-bold">Assignees</div>
                                <div className="text-3xl font-bold my-2">32</div>
                                <div className="w-full flex justify-between text-sm">
                                <div className="flex flex-col items-center">
                                    <div className="bg-green-500 h-2 w-2 rounded-full mb-1"></div>
                                    <div>Early</div>
                                    <div>70%</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-yellow-500 h-2 w-2 rounded-full mb-1"></div>
                                    <div>Late</div>
                                    <div>20%</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-red-500 h-2 w-2 rounded-full mb-1"></div>
                                    <div>Absent</div>
                                    <div>10%</div>
                                </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="lg:m-[30px] m-[10px] p-4">
                    <p className='text-[20px] mb-4 font-[500]'>Staff</p>
                    <div className="p-4 rounded-lg shadow-md flex items-center justify-between">
                        <div className='flex items-center gap-[1rem]'>
                            <div className='h-[70px] w-[70px] rounded-full'>
                                <img className='rounded-full w-full h-full object-cover' src={staff?.profileImage?.file} alt="" />
                            </div>
                            <p className='text-[20px] font-[500]'>{staff?.fullName}</p>
                        </div>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/staff/${staff._id}`)} >More Info</button>
                    </div>
                </div>

                    {/* <div class="relative overflow-x-auto mx-5 mt-10">
                        <div className='flex items-center justify-between mb-2'>
                            <div className='flex items-center gap-2 text-[18px]'>
                                <LuListTodo />
                                <p className='text-[#1D1D1D] font-[600]'>List of Assignees</p>
                            </div>
                            <p className='text-[#828282] font-[600]'>Total - {allSubUnits?.length}</p>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-left text-[#1D1D1D]">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="py-3 font-[700]">Assignment</th>
                                    <th scope="col" class="py-3 font-[700]">Assignee 1</th>
                                    <th scope="col" class="py-3 font-[700]">Assignee 2</th>
                                    <th scope="col" class="py-3 font-[700]">Members</th>
                                    <th scope="col" class="py-3 font-[700]">Avg. duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allSubUnits && allSubUnits?.map((item, index) => {

                                        return (
                                            <tr className='relative'>
                                                <td className='py-3'>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td> <BsThreeDotsVertical  className="cursor-pointer" onClick={() => setSubUnitId(item._id)}/> </td>

                                                {subUnitId === item._id &&
                                                    <div className='z-[1] absolute right-[110px] w-[200px] top-0 py-3 bg-white border rounded-[10px]'>
                                                        <div className='my-2 mr-4 flex justify-end'>
                                                            <MdOutlineClose className='text-lg cursor-pointer mt-[-5px]' onClick={() => setSubUnitId('')} />
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <div onClick={() => navigate(`/view-sub-unit/${item._id}`)} className='flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-[#F2FCF7]'>
                                                                <LuListTodo />
                                                                <p>View sub-unit</p>
                                                            </div>
                                                            <div className='flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-[#F2FCF7]'>
                                                                <LuListTodo />
                                                                <p>Edit time-table</p>
                                                            </div>
                                                            <div onClick={() => setDeleteSubUnit(item._id)} className='flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-[#F2FCF7]'>
                                                                <LuListTodo />
                                                                <p>Delete sub-unit</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> */}

                {/* <div className='px-[30px]'>
                    <p className='text-[#19201D] text-[18px] font-[600] mb-3'>All Sub-units</p>
                    {
                        allSubUnits.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    {
                        allSubUnits && allSubUnits.map((subUnit) => (
                            <div className='flex items-center justify-between p-3 shadow rounded-[8px] my-4 bg-white'>
                                <p>{subUnit.name}</p>
                                <div className='flex items-center gap-2'>
                                    <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => {
                                        setEditSubUnit(subUnit._id)
                                        setSubUnitName(subUnit.name)
                                    }} />
                                    <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer" onClick={() => setDeleteSubUnit(subUnit._id)} />
                                </div>
                            </div>
                        )).reverse()
                    }
                </div> */}
            </div>
        </div>

        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
        
    </div>
  )
}

export default ViewSubUnit