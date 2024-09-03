import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { BsEye } from 'react-icons/bs'
import { BiTrash } from 'react-icons/bi'
import { PiPencil } from 'react-icons/pi'
import Alert from '../../components/alert/Alert'

const Calendar = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allSessions, setAllSessions] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [toggleNav, setToggleNav] = useState(false)
    const [deleteSession, setDeleteSession] = useState()
    const [editSession, setEditSession] = useState()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')

    async function getAllSessions(){
        const res = await fetch(`${baseUrl}/session`,{
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
            setAllSessions(data.data);
            setAlertType('success');
            return;
        }
    }

    async function getSessionInfo (id) {
        setEditSession(id)    
        const res = await fetch(`${baseUrl}/session/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data);
        
        setName(data.data.name)
    }

    async function editSessionFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/session/${editSession}`,{
            method:"PUT",
            body: JSON.stringify({name}),
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res.ok){
            setMsg("Session updated successfully!")
            setAlertType('success')
            setLoading(false)
            setEditSession(null)
            setName('')
            getAllSessions()
        }
        const data = await res.json()
    }

    async function deleteSessionFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/session/${deleteSession}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res.ok){
            setMsg("Session deleted successfully!")
            setAlertType('success')
            setLoading(false)
            setDeleteSession(null)
            setName('')
            getAllSessions()
        }
    }

    useEffect(() => {
        getAllSessions()
    },[])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="bg-[#F7F7F7]">
                <div className="flex flex-row gap-[1rem] justify-between items-center mb-[3rem] bg-[#F2FCF7] lg:px-[30px] px-[10px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Calendar</p>
                    </div>
                    <div className='flex items-center gap-5 '>
                        <button className="bg-[#2D3934] text-white px-3 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-session')}>Create Session</button>
                    </div>
                </div>
                <div className='lg:px-[30px] px-[10px]'>
                    <p className='text-[#19201D] text-[18px] font-[600] mb-3'>All Sessions</p>
                    {
                        allSessions.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    {
                        allSessions && allSessions?.map((session) => (
                            <div className='flex items-center justify-between p-3 shadow rounded-[8px] my-4 bg-white'>
                                <p>{session.name}</p>
                                <div>
                                    <button onClick={() => navigate(`/session-info/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>
                                        <BsEye />
                                    </button>
                                    <button onClick={() => getSessionInfo(session._id)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px] ml-3'>
                                        <PiPencil />
                                    </button>
                                    <button onClick={() => setDeleteSession(session._id)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px] ml-3'>
                                        <BiTrash />
                                    </button>
                                </div>
                                {/* <button onClick={() => navigate(`/create-semester/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>Create Semester</button> */}
                            </div>
                        )).reverse()
                    }
                </div>
            </div>
        </div>
        {
            deleteSession &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteSession(false)}></div>
                <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Session</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteSession(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this session?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteSessionFn(deleteSession)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }
        {
            editSession &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditSession(false)}></div>
                <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Edit Session</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditSession(false)}/>
                    </div>
                    <div className='mt-5'>
                        <p className='text-[#19201D]'>Session</p>
                        <input type="text" onChange={e => setName(e.target.value)} value={name} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter unit name' />
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={editSessionFn} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Save</button>
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

export default Calendar