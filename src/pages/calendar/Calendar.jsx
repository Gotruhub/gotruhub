import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'

const Calendar = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allSessions, setAllSessions] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [toggleNav, setToggleNav] = useState(false)

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

    useEffect(() => {
        getAllSessions()
    },[])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
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
                        allSessions && allSessions.map((session) => (
                            <div className='flex items-center justify-between p-3 shadow rounded-[8px] my-4 bg-white'>
                                <p>{session.name}</p>
                                {/* <button onClick={() => navigate(`/create-semester/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>Create Semester</button> */}
                                <button onClick={() => navigate(`/session-info/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button>
                            </div>
                        )).reverse()
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Calendar