import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { GoTrash } from 'react-icons/go'
import { IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'

const Assignments = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allAssignments, setAllAssignments] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)

    const [editAssignment, setEditAssignment] = useState()
    const [deleteAssignment, setDeleteAssignment] = useState()

    const [name, setName] = useState('')
    const [code, setCode] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    async function getAllAssignments(){
        const res = await fetch(`${baseUrl}/course`,{
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
            setAllAssignments(data.data);
            setAlertType('success');
            return;
        }
    }

    async function deleteAssignmentFn(assignmentId){
        setLoading(true)
        const res = await fetch(`${baseUrl}/course/${assignmentId}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res) setLoading(false)
        if(res.ok){
            getAllAssignments()
            setDeleteAssignment(false)
            setMsg("Assignment deleted successfully");
            setAlertType('success');
            return;
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
    }

    async function editAssignmentFn(assignmentId){
        setLoading(true)
        const res = await fetch(`${baseUrl}/course/${assignmentId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.data.access_token}`
            },
            body:JSON.stringify({
                name,
                courseCode: code
            })
        })
        const data = await res.json()
        console.log(data.data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            getAllAssignments()
            setEditAssignment(false)
            setMsg(data.message);
            setAlertType('success');
            setLoading(false)
            return;
        }
    }

    useEffect(() => {
        getAllAssignments()
    },[])


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Assignments</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-assignment')}>Create assignment</button>
                    </div>
                </div>
                <div className='px-[10px] lg:px-[30px]'>
                    {
                        allAssignments.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-left">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Code</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Created At</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allAssignments.map((assignment, index) => {
                                        return(
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}}>
                                                <td class="px-6 py-4">{index +1}</td>
                                                <td class="px-6 py-4">{assignment.name}</td>
                                                <td class="px-6 py-4">{assignment.courseCode}</td>
                                                <td class="px-6 py-4">{new Date(assignment.createdAt).toString().split(" ").slice(0, 4).join(" ")}</td>
                                                <td className='px-6 py-4 flex items-center gap-3'>
                                                    <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => {
                                                        setEditAssignment(assignment._id)
                                                        setName(assignment.name)
                                                        setCode(assignment.courseCode)
                                                    }}/>
                                                    <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer"  onClick={() => setDeleteAssignment(assignment._id)}/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {/* <ReactPaginate
                            previousLabel={'Prev'}
                            nextLabel = {'Next'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName='flex items-center gap-9 mt-5 justify-end pr-[30px] paginationBtns'
                            activeClassName='bg-secondary-color text-white'
                            disabledClassName='bg-gray-500 cursor-not-allowed'
                        /> */}
                    </div>
                </div>
            </div>
        </div>

        {
            editAssignment &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditAssignment(false)}></div>
                <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Edit Assignment</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditAssignment(false)}/>
                    </div>
                    <div className='mt-5'>
                        <p>Assignment Name</p>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p>Assignment / Course Code</p>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
                            <input type="text" value={code} onChange={e => setCode(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => editAssignmentFn(editAssignment)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Assignment</button>
                    }
                </div>
            </div>
        }

        {
            deleteAssignment &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteAssignment(false)}></div>
                <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Assignment</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteAssignment(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this assignment?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteAssignmentFn(deleteAssignment)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
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

export default Assignments