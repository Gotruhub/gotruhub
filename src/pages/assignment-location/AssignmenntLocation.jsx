import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { GoTrash } from 'react-icons/go'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { IoCloseOutline } from 'react-icons/io5'
import Alert from '../../components/alert/Alert'

const AssignmenntLocation = ({baseUrl}) => {

    const [toggleNav, setToggleNav] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [allAssignmentLocations, setAllAssignmentLocations] = useState([])
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [deleteLocation, setDeleteLocation] = useState(false)

    useEffect(() => {
        getAssignmentLocations()
    },[])

    const navigate = useNavigate()
    
    async function getAssignmentLocations(){
        const res = await fetch(`${baseUrl}/locations`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        setAllAssignmentLocations(data.data)
    }

    async function deleteLocationFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/locations/${deleteLocation}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        setLoading(false)
        if(!res.ok){
            setMsg("Error occured, while deleting location");
            setAlertType('error');
            return;
        }
        if(res.ok){
            setDeleteLocation(null)
            getAssignmentLocations()
            setMsg("Location deleted successfully");
            setAlertType('success');
            return;
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5 h-[100dvh]">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>

            <div>
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/inventory`)} className='cursor-pointer' />
                            <p className="text-[28px] text-primary-color font-[600]">Assignment Location</p>
                        </div>
                        {/* <p className='text-[#4F4F4F]'>Manage stock available in your inventory</p> */}
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="text-[#2D3934] bg-white px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => setModal(true)} >Create Location</button> */}
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => navigate('/add-assignment-location')}>Add Location</button>
                    </div>
                </div>
                <div className='flex item-center justify-center flex-col w-[90%] mx-auto'>
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-left">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Start Coord.</th>
                                    {/* <th scope="col" class="px-6 py-3 font-[700]">End Coord.</th> */}
                                    <th scope="col" class="px-6 py-3 font-[700]">Location Range</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allAssignmentLocations?.map((location, index) => {
                                        return(
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}}>
                                                <td class="px-6 py-4">{index +1}</td>
                                                <td class="px-6 py-4">{location.name}</td>
                                                <td class="px-6 py-4">
                                                    <span>{location?.location?.lat}</span>,
                                                    <span className='ml-2'>{location?.location?.long}</span>
                                                </td>
                                                {/* <td class="px-6 py-4">
                                                    <span>{location?.endlocation?.lat}</span>,
                                                    <span className='ml-2'>{location?.endlocation?.long}</span>
                                                </td> */}
                                                <td class="px-6 py-4">
                                                    <span className='ml-2'>{location?.location_range}</span>
                                                </td>
                                                <td className='px-6 py-4 flex items-center gap-3'>
                                                    <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => {
                                                        navigate(`/edit-assignment-location/${location._id}`)
                                                        // setEditAssignment(assignment._id)
                                                        // setName(assignment.name)
                                                        // setCode(assignment.courseCode)
                                                    }}/>
                                                    <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer"  onClick={() => setDeleteLocation(location._id)}/>
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

        {
            deleteLocation &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteLocation(false)}></div>
                <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Location</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteLocation(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this location?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteLocationFn(deleteLocation)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default AssignmenntLocation