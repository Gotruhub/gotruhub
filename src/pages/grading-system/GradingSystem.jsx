import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate } from 'react-router-dom';
import { TbPencilDiscount } from 'react-icons/tb';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { BiChevronDown } from 'react-icons/bi';
import Alert from '../../components/alert/Alert';

const GradingSystem = ({baseUrl}) => {

    const navigate = useNavigate()

    const [earlyMins, setEarlyMins] = useState(0);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [selectedTagApplies, setSelectedTagApplies] = useState('')
    const [toggleNav, setToggleNav] = useState(false)
    const [monitorType, setMonitorType] = useState('monitorSource')
    const tags = ["Before expected start time", "At expected start time", "After expected start time"]
    const tagName = [
        {
            label: "Early",
            value: 'early'
        },
        {
            label: "Late",
            value: 'late'
        },
        {
            label: "Absent",
            value: 'absent'
        }
    ]

    const thresholdTagName = [
        {
            label: "Excellent",
            value: 'excellent'
        },
        {
            label: "Pass",
            value: 'pass'
        },
        {
            label: "Fail",
            value: 'fail'
        }
    ]
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [time, setTime] = useState('')
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const user = JSON.parse(localStorage.getItem('user'))

    async function createPerformanceTag(){
        console.log(JSON.stringify({name, value, time, type:monitorType}));
        if(!name || !value || !time){
          setMsg("Please fill in all fields");
          setAlertType('error');
          return;
        }
        setLoading(true)
        const res = await fetch(`${baseUrl}/attendance-grading`,{
            method:"POST",
            body: JSON.stringify({name, value, time, type:monitorType}),
            headers:{
              "Content-Type":"application/json",
              'Authorization':`Bearer ${user.data.access_token}`
          }
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(res.ok){
          setMsg(data.message);
          setAlertType('success');
          return;
        }
        if(!res.ok){
          setMsg(data.message);
          setAlertType('error');
          return;
        }
      }

    const [performanceValues, setPerformanceValues] = useState({
        early: { mins: 0, value: 100 },
        onTime: { mins: 5, value: 100 },
        late: { mins: 10, value: 80 },
        absent: { mins: 61, value: 0 },
      });
    
      const handleChange = (tag, field, value) => {
        setPerformanceValues(prev => ({
          ...prev,
          [tag]: {
            ...prev[tag],
            [field]: value,
          },
        }));
      };


    

  return (
    <div>
        <SideNav  toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav  toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem] md:flex-row flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        {
                            monitorType === 'monitorSource' ?
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Attendance Grading - Monitor Source</p>
                            :
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Attendance Grading - Monitor End</p>
                        }
                    </div>
                    <div className='flex items-center gap-5 md:w-auto w-full'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px] w-full" onClick={() => setModal('reset')}>Reset to default</button>
                    </div>
                </div>
                {
                    monitorType === 'monitorSource' &&
                    <div>
                        <div className="py-6 px-[10px] lg:px-[30px] bg-white rounded-lg">
                            <header className="mb-4 flex sm:items-center justify-between flex-col sm:flex-row gap-2">
                                <h1 className="text-[##19201D]">Configure grading system</h1>
                                <div className='flex bg-[#F2FCF8] px-2 py-2 rounded-full items-center gap-3'>
                                    <p className='bg-[#2C3933] text-[white] rounded-full py-2 px-4 cursor-pointer' onClick={() => setMonitorType('monitorSource')} >Staff</p>
                                    <p className='pr-2 cursor-pointer' onClick={() => setMonitorType('monitorEnd')} >Member</p>
                                </div>
                            </header>

                            <section className="mb-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 100-14 7 7 0 000 14z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold">Note</h3>
                                        <ul className="list-disc pl-5 text-[14px] mt-2 md:text-[16px]">
                                            <li>Changes made here will affect the attendance grading system for this user category.</li>
                                            <li>Ensure thresholds are set appropriately to match institutional policies.</li>
                                            <li>Performance value counts from before or after the expected start time <span className='text-[#828282]'> e.g early - before start time</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="my-[4rem]">
                                <div className='flex md:items-center justify-between flex-col md:flex-row'>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Performance value</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            This assigns the value to performance tags e.g early, late, and absent to a user depending on daily sign-in time.
                                        </p>
                                    </div>
                                    <button className="bg-[#2C3934] text-white py-2 px-4 rounded-md md:w-auto w-full" onClick={() => setModal('create-performance')}>
                                        Create a new tag
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 border-b">
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Early</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">Mins</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <h4 className="text-sm font-medium text-gray-900">Value</h4>
                                                    <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                                </div>
                                                <div className="flex items-center border w-full px-3 py-2 rounded-md">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 ml-2">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Late</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">Mins</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <h4 className="text-sm font-medium text-gray-900">Value</h4>
                                                    <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                                </div>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full text-start outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 ml-2">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Absent</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">Mins</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <h4 className="text-sm font-medium text-gray-900">Value</h4>
                                                    <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                                </div>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full text-start outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 ml-2">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="mb-4">
                                <div className='flex md:items-center justify-between flex-col md:flex-row'>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Threshold value</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            This assigns the value to threshold tags e.g excellent, pass and fail to a user depending on average attendance performance
                                        </p>
                                    </div>
                                    <button className="bg-[#2C3934] text-white py-2 px-4 rounded-md md:w-auto w-full" onClick={() => setModal('create-threshold')}>
                                        Create a new tag
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 border-b">
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className='w-full'>
                                                <h4 className="text-sm font-medium text-gray-900">Excellent</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className='w-full'>
                                                <h4 className="text-sm font-medium text-gray-900">Pass</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className='w-full'>
                                                <h4 className="text-sm font-medium text-gray-900">Fail</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                }

                {
                    monitorType === 'monitorEnd' &&
                    <div>
                        <div className="py-6 px-[10px] lg:px-[30px] bg-white rounded-lg">
                            <header className="mb-4 flex sm:items-center justify-between flex-col sm:flex-row gap-2">
                                <h1 className="text-[##19201D]">Configure grading system</h1>
                                <div className='flex bg-[#F2FCF8] px-2 py-2 rounded-full items-center gap-3'>
                                    <p className='pl-2 cursor-pointer' onClick={() => setMonitorType('monitorSource')} >Staff</p>
                                    <p className='bg-[#2C3933] text-[white] rounded-full py-2 px-4 cursor-pointer' onClick={() => setMonitorType('monitorEnd')} >Member</p>
                                </div>
                            </header>

                            <section className="mb-4">
                                <div className="flex items-start">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 100-14 7 7 0 000 14z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Note</h3>
                                    <ul className="list-disc pl-5 text-[14px] mt-2 md:text-[16px]">
                                        <li>Changes made here will affect the attendance grading system for this user category.</li>
                                        <li>Ensure thresholds are set appropriately to match institutional policies.</li>
                                        <li>Performance value counts from before or after the expected start time <span className='text-[#828282]'> e.g early - before start time</span></li>
                                    </ul>
                                </div>
                                </div>
                            </section>

                            <section className="mb-4">
                                <div  className='flex md:items-center justify-between flex-col md:flex-row'>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Performance value</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            This assigns the value to performance tags e.g early, late, and absent to a user depending on daily sign-in time.
                                        </p>
                                    </div>
                                    <button className="bg-[#2C3934] text-white py-2 px-4 rounded-md md:w-auto w-full" onClick={() => setModal('create-performance')}>
                                        Create a new tag
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 border-b">
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                        <div className="flex items-center gap-3 w-full">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Early</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">Mins</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <h4 className="text-sm font-medium text-gray-900">Value</h4>
                                                    <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                                </div>
                                                <div className="flex items-center border w-full px-3 py-2 rounded-md">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 ml-2">%</span>
                                                </div>
                                                {/* <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                    {/* Title Section */}
                                        <div className="flex items-center gap-3 w-full">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Late</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">Mins</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <h4 className="text-sm font-medium text-gray-900">Value</h4>
                                                    <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                                </div>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full text-start outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 ml-2">%</span>
                                                </div>
                                                {/* <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between py-4 rounded-md">
                                    {/* Title Section */}
                                        <div className="flex items-center gap-3 w-full">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Late</h4>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 pl-2 border-l">Mins</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-between'>
                                                    <h4 className="text-sm font-medium text-gray-900">Value</h4>
                                                    <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                                </div>
                                                <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                                    <input
                                                        type="number"
                                                        className="w-full text-start outline-none"
                                                        value={earlyMins}
                                                        onChange={(e) => setEarlyMins(e.target.value)}
                                                    />
                                                    <span className="text-gray-400 ml-2">%</span>
                                                </div>
                                                {/* <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="mb-4">
                                <div  className='flex md:items-center justify-between flex-col md:flex-row'>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Threshold value</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            This assigns the value to threshold tags e.g excellent, pass and fail to a user depending on average attendance performance.
                                        </p>
                                    </div>
                                    <button className="bg-[#2C3934] text-white py-2 px-4 rounded-md md:w-auto w-full" onClick={() => setModal('create-threshold')}>
                                        Create a new tag
                                    </button>
                                </div>

                                <div className="border-b grid md:grid-cols-3 grid-cols-2 gap-3 w-full py-[20px]">
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <h4 className="text-sm font-medium text-gray-900">Excellent</h4>
                                            <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                        </div>
                                        <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                            <input
                                                type="number"
                                                className="w-full outline-none"
                                                value={earlyMins}
                                                onChange={(e) => setEarlyMins(e.target.value)}
                                            />
                                            <span className="text-gray-400 pl-2 border-l">%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <h4 className="text-sm font-medium text-gray-900">Pass</h4>
                                            <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                        </div>
                                        <div className="flex items-center border w-full px-3 py-2 rounded-md">
                                            <input
                                                type="number"
                                                className="w-full outline-none"
                                                value={earlyMins}
                                                onChange={(e) => setEarlyMins(e.target.value)}
                                            />
                                            <span className="text-gray-400 ml-2">%</span>
                                        </div>
                                        {/* <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" /> */}
                                    </div>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <h4 className="text-sm font-medium text-gray-900">Fail</h4>
                                            <TbPencilDiscount className="w-5 h-5 text-green-600 cursor-pointer" />
                                        </div>
                                        <div className="flex items-center border px-3 py-2 rounded-md w-full">
                                            <input
                                                type="number"
                                                className="w-full outline-none"
                                                value={earlyMins}
                                                onChange={(e) => setEarlyMins(e.target.value)}
                                            />
                                            <span className="text-gray-400 pl-2 border-l">%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                }
            </div>
        </div>
        {
            modal === "create-performance" &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
                <div className="bg-white sm:max-w-[650px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Create a performance tag</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                    </div>
                    <div className='mt-5'>
                        <p>Select Tag Name</p>
                        <div className='cursor-pointer border rounded-[4px] px-[6px] py-3 relative'>
                            <div className='flex items-center justify-between' onClick={() => setDropDown(dropDown === 'tag-name' ? false : 'tag-name')}>
                                <p className='capitalize px-3 rounded mt-1 w-full outline-none'>{name}</p>
                                <BiChevronDown />
                            </div>
                            {
                                dropDown === 'tag-name' &&
                                <div className='rounded-[4px] border absolute left-0 top-[45px] bg-white z-[10] w-full'>
                                    {
                                        tagName?.map((type, index) => {
                                            return (
                                            <p className='text-[14px] p-2 hover:bg-gray-100 capitalize' onClick={() => {
                                                setDropDown(false)
                                                setName(type.value)
                                            }}>{type.label}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-5 w-full'>
                        <div className='mt-5 w-full'>
                            <p className='text-[#19201D]'>Duration in minutes</p>
                            <input type="text" onChange={e => setTime(e.target.value)} value={time} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='10' />
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='text-[#19201D]'>Value in percentage</p>
                            <input type="text" onChange={e => setValue(e.target.value)} value={value} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='100' />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p>Select when this tag applies</p>
                        <div className='cursor-pointer border rounded-[4px] px-[6px] py-3 relative'>
                            <div className='flex items-center justify-between' onClick={() => setDropDown(dropDown === 'tag-applies' ? false : 'tag-applies')}>
                                <p className='capitalize py-1 px-3 rounded mt-1 w-full outline-none'>{selectedTagApplies}</p>
                                <BiChevronDown />
                            </div>
                            {
                                dropDown === 'tag-applies' &&
                                <div className='rounded-[4px] border absolute left-0 top-[45px] bg-white z-[10] w-full'>
                                    {
                                        tags?.map((type, index) => {
                                            return (
                                            <p className='text-[14px] p-2 hover:bg-gray-100 capitalize' onClick={() => { 
                                                setSelectedTagApplies(type)
                                                setDropDown(false)
                                                // setType(type)
                                            }}>{type}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={createPerformanceTag} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Save</button>
                    }
                </div>
            </div>
        }
        {
            modal === "create-threshold" &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
                <div className="bg-white sm:max-w-[650px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Create a threshold tag</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                    </div>
                    <div className='flex items-center flex-col gap-5 w-full'>
                        <div className='mt-5 w-full'>
                            <p>Select Tag Name</p>
                            <div className='cursor-pointer border rounded-[4px] px-[6px] py-3 relative w-full'>
                                <div className='flex items-center justify-between' onClick={() => setDropDown(dropDown === 'tag-threshold-name' ? false : 'tag-threshold-name')}>
                                    <p className='capitalize px-3 rounded mt-1 w-full outline-none'>{name}</p>
                                    <BiChevronDown />
                                </div>
                                {
                                    dropDown === 'tag-threshold-name' &&
                                    <div className='rounded-[4px] border absolute left-0 top-[45px] bg-white z-[10] w-full'>
                                        {
                                            thresholdTagName?.map((type, index) => {
                                                return (
                                                <p className='text-[14px] p-2 hover:bg-gray-100 capitalize' onClick={() => {
                                                    setDropDown(false)
                                                    setName(type.value)
                                                }}>{type.label}</p>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='text-[#19201D]'>Range in percentage (Maximum)</p>
                            <input type="text" onChange={e => setValue(e.target.value)} value={value} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='100' />
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='text-[#19201D]'>Range in percentage (Minimum)</p>
                            <input type="text" onChange={e => setValue(e.target.value)} value={value} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='70' />
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={createPerformanceTag} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Save</button>
                    }
                </div>
            </div>
        }
        {
            modal === 'reset' &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
                <div className="bg-white sm:max-w-[650px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Reset to default</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                    </div>
                    <div className='flex items-center flex-col gap-5 w-full px-5 py-[3rem] text-center'>
                        <img src="/images/confirm.svg" alt="" />
                        <p>By clicking the confirm button this will reset your performance rating system to the system default.</p>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <div className='flex items-center gap-5 justify-center'>
                            <button onClick={() => setModal(false)} className=' border border-primary-color bg-white w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Cancel</button>
                            <button className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Confirm</button>
                        </div>
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

export default GradingSystem