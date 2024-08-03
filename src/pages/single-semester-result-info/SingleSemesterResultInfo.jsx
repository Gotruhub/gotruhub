import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import { FiChevronDown } from "react-icons/fi";
const SingleSemesterResultInfo = ({baseUrl}) => {


  const navigate = useNavigate()
  const { semester } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [semesterInfo, setSemesterInfo] = useState([])
  const [msg, setMsg] = useState('')
  const [chosenTerm, setChosenTerm] = useState('')
  const [alertType, setAlertType] = useState()

  async function getSemesterInfo(){
    const res = await fetch(`${baseUrl}/term/${semester}`,{
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
        setSemesterInfo(data.data);
        setAlertType('success');
        return;
    }
  }

  useEffect(() => {
    getSemesterInfo()
  },[])


  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="bg-[#F7F7F7]">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/result')} className='cursor-pointer' />
                        {/* <p className="text-[28px] text-primary-color font-[600]">{sessionInfo[0]?.sessionInfo?.name} Session</p> */}
                        qqq
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-semester/${sessionInfo[0]?.sessionId?._id}`)}>Create Semester</button>
                    </div> */}
                </div>
                {/* <div className='px-[30px]'>
                    <p className='text-[#19201D] text-[18px] font-[600] mb-3'>Session Info</p>
                    {
                        sessionInfo.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    {
                        sessionInfo && sessionInfo.map((session) => (
                            <div className='p-3 shadow rounded-[8px] my-4 bg-white'>
                                <div className='flex items-center justify-between'>
                                    <p>{session.name}</p>
                                    <button onClick={() => navigate(`/single-semester-result-info/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button>
                                </div>
                            </div>
                        )).reverse()
                    }
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default SingleSemesterResultInfo