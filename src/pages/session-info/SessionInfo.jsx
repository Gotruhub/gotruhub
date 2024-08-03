import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import { FiChevronDown } from "react-icons/fi";


const SessionInfo = ({baseUrl}) => {

  const navigate = useNavigate()
  const { session } = useParams()

  console.log(session);
  const user = JSON.parse(localStorage.getItem('user'))
  const [sessionInfo, setSessionInfo] = useState([])
  const [msg, setMsg] = useState('')
  const [chosenTerm, setChosenTerm] = useState('')
  const [alertType, setAlertType] = useState()
  const [toggleNav, setToggleNav] = useState(false)

  async function getSessionInfo(){
    const res = await fetch(`${baseUrl}/term/${session}`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data);
    console.log(data.data);
    if(!res.ok){
        setMsg(data.message);
        setAlertType('error');
        return;
    }
    if(res.ok){
        setSessionInfo(data.data);
        setAlertType('success');
        return;
    }
  }

  useEffect(() => {
    getSessionInfo()
  },[])

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto pb-5">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
          <div className="bg-[#F7F7F7]">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                  <div className="flex items-center gap-2">
                      <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/calendar')} className='cursor-pointer' />
                      <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">{sessionInfo[0]?.sessionId.name} Session</p>
                  </div>
                  <div className='flex items-center gap-5'>
                      <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-semester/${session}`)}>Create Semester</button>
                  </div>
              </div>
              <div className='px-[10px] lg:px-[30px]'>
                  <p className='text-[#19201D] text-[18px] font-[600] mb-3'>Session Info</p>
                  {
                      sessionInfo.length < 1 &&
                      <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                          <p>There is no information about this session at the moment. you can use the button above to create a semester </p>
                      </div>
                  }
                  {
                      sessionInfo && sessionInfo.map((session) => (
                        <div className='p-3 shadow rounded-[8px] my-4 bg-white'>
                          <div className='flex items-center justify-between'>
                              <p>{session.name}</p>
                              <FiChevronDown className='text-[22px] cursor-pointer' onClick={() => setChosenTerm(session._id)}/>
                              {/* <button onClick={() => navigate(`/create-semester/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button> */}
                          </div>
                          {
                            chosenTerm === session._id &&
                            <div className='border-t mt-3'>
                              <div className='mt-2 flex items-center justify-between'>
                                <p>Start Date:</p>
                                <p>{new Date(session.startDate).toString().split(" ").slice(0, 4).join(" ")}</p>
                              </div>
                              <div className='mt-2 flex items-center justify-between'>
                                <p>End Date:</p>
                                <p>{new Date(session.endDate).toString().split(" ").slice(0, 4).join(" ")}</p>
                              </div>
                              <div className='mt-2 flex items-center justify-between'>
                                <p>Session Type:</p>
                                <p>{session.sessionType}</p>
                              </div>
                            </div>
                          }
                        </div>
                      )).reverse()
                  }
              </div>
          </div>
      </div>
  </div>
  )
}

export default SessionInfo