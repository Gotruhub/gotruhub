import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'

const BarCodeView = ({baseUrl}) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [classScheduleInfo, setClassScheduleInfo] = useState()
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()

    async function getClassScheduleInfo(){
        const res = await fetch(`${baseUrl}/schedule/single/${id}`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data);
        console.log(data.data.coordinators?.length);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setClassScheduleInfo(data.data);
            setAlertType('success');
            // formatTime(data.data)
            return;
        }
    }

    // const formatTime = (time) => {
    //     const timeStr = String(time); // Convert time to a string
    //     return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
    // };

    function formatTime(time) {
        const timeStr = String(time); // Convert time to a string
        return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
    }

    useEffect(() => {
        getClassScheduleInfo()
    },[])

  return (
    <div>
        <SideNav />
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="bg-[#F7F7F7] pb-20">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">BarCode</p>
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-semester/${sessionInfo[0]?.sessionId?._id}`)}>Create Semester</button>
                    </div> */}
                </div>
                {
                    classScheduleInfo &&
                    <div className="flex flex-col gap-5 justify-center items-center bg-white lg:w-[500px] w-[95%] mx-auto rounded-lg pb-7">
                        <div className="flex items-center">
                            <img src={classScheduleInfo.qrcode} alt="" className="w-[200px] h-[200px]" />
                        </div>
                        <div className="flex items-center justify-between w-full lg:px-[3rem] px-[1rem]">
                            <p className="text-[#19201D] font-[500]">Assignment Name:</p>
                            <p className="text-[#19201D] font-[500]">{classScheduleInfo?.course?.course?.name}</p>
                        </div>
                        <div className="flex items-center justify-between w-full lg:px-[3rem] px-[1rem]">
                            <p className="text-[#19201D] font-[500]">Assignment / Course Code:</p>
                            <p className="text-[#19201D] font-[500]">{classScheduleInfo?.course?.course?.courseCode}</p>
                        </div>
                        <div className="flex items-center justify-between w-full lg:px-[3rem] px-[1rem]">
                            <p className="text-[#19201D] font-[500]">Day:</p>
                            <p className="text-[#19201D] font-[500]">{classScheduleInfo?.day}</p>
                        </div>
                        <div className="flex items-center justify-between w-full lg:px-[3rem] px-[1rem]">
                            <p className="text-[#19201D] font-[500]">Start Time:</p>
                            <p className="text-[#19201D] font-[500]">{formatTime(classScheduleInfo?.startTime)}</p>
                        </div>
                        <div className="flex items-center justify-between w-full lg:px-[3rem] px-[1rem]">
                            <p className="text-[#19201D] font-[500]">End Time:</p>
                            <p className="text-[#19201D] font-[500]">{formatTime(classScheduleInfo?.endTime)}</p>
                        </div>
                        <div className="flex items-center justify-between w-full lg:px-[3rem] px-[1rem]">
                            <p className="text-[#19201D] font-[500]">Assignee:</p>
                            <p className="text-[#19201D] font-[500]">{classScheduleInfo?.coordinators?.length}</p>
                        </div>
                    </div>    
                }
            </div>
        </div>
    </div>
  )
}

export default BarCodeView