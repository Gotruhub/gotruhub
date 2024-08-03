import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { FiInfo } from "react-icons/fi";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronDownOutline } from 'react-icons/io5';

const CreateSemester = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const { session } = useParams()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [selectedSessionType, setSelectedSessionType] = useState('Select session type')
    const [sessionTypeDropDown, setSessionTypeDropDown] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [sessionType, setSessionType] = useState('')
    const [toggleNav, setToggleNav] = useState(false)
    const sessionTypesArray = [
        {
            name: 'HS',
            value: 'High School'
        },
        {
            name: 'UN',
            value: 'University'
        },
        {
            name: 'OT',
            value: 'Other'
        }

    ]

    const navigate = useNavigate()

    async function getSessionInfo(){
        const res = await fetch(`${baseUrl}/session/${session}`,{
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
            setName(data.data.name);
            setAlertType('success');
            return;
        }
    }

    async function createSemester(){
        setLoading(true)
        console.log(JSON.stringify({
            name,
            startDate,
            endDate,
            sessionType,
            sessionId: session
        }));
        const res = await fetch(`${baseUrl}/term`,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                startDate,
                endDate,
                sessionType,
                sessionId: session
            })
        })
        console.log("After request ====> ",JSON.stringify({
            name,
            startDate,
            endDate,
            sessionType,
            sessionId: session
        }));
        const data = await res.json()
        console.log(data);
        if(res) setLoading(false)
        if(res.ok){
            setMsg('Semester created successfully')
            setAlertType('success')
            return;
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
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
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/calendar')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Create Semester</p>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center gap-5 px-5 max-w-[500px] mx-auto">
                    <div className='text-[#865C1D] flex items-center gap-2'>
                        <FiInfo className='text-[30px]' />
                        <p className='text-[14px]'>Creating a new semester collects new data on members and closes update on the previous semester</p>
                    </div>
                    <div className='w-full flex flex-col gap-7'>
                        <div>
                            <p className='text-[#19201D] font-[450] mb-1'>Semester Name or Term Name </p>
                            <input type="text" onChange={e => setName(e.target.value)}  placeholder='First Term' className='w-full border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26] outline-none'  />
                            {/* <p className='border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E1A]'>{name}</p> */}
                        </div>
                        <div className='relative'>
                            <p>Session Type</p>
                            <div className='flex items-center justify-between border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>
                                <p>{selectedSessionType}</p>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setSessionTypeDropDown(!sessionTypeDropDown)} />
                            </div>
                            {
                                sessionTypeDropDown &&
                                <div className='absolute top-[80px] border rounded-[5px] bg-white w-full h-[120px] overflow-y-scroll'>
                                    {
                                        sessionTypesArray.map(type => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2' onClick={() => {
                                                    setSelectedSessionType(type.value)
                                                    setSessionTypeDropDown(!sessionTypeDropDown)
                                                    setSessionType(type.name)
                                                }}>{type.value}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div>
                            <p className='text-[#19201D] font-[450] mb-1'>Start Date</p>
                            <input type="date" onChange={(e) => setStartDate(e.target.value)} placeholder='Enter Account Number' className='w-full border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26] outline-none' />
                        </div>
                        <div>
                            <p className='text-[#19201D] font-[450] mb-1'>End Date</p>
                            <input type="date" onChange={(e) => setEndDate(e.target.value)} placeholder='Enter Account Number' className='w-full border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26] outline-none' />
                            <p className='mt-1 text-[#865C1D] text-[14px]'>This should not be above 4 months</p>
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                    <button onClick={createSemester} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Create Semester</button>
                    }
                </div>
            </div>
        </div>
        {
        msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default CreateSemester