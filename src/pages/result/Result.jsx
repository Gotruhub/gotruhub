import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { IoChevronDownOutline } from 'react-icons/io5'
import Alert from '../../components/alert/Alert'

const Result = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allSessions, setAllSessions] = useState([])
    const [allTerms, setAllTerms] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [dropDown, setDropDown] = useState()
    const [session, setSession] = useState()
    const [term, setTerm] = useState()
    const [allSubUnits, setAllSubUnits] = useState()
    const [allUnits, setAllUnits] = useState()
    const [subunit, setSubunit] = useState()
    const [unit, setUnit] = useState()
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState()
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

    async function getAllSemesters(session){
        console.log(session);
        const res = await fetch(`${baseUrl}/term/${session._id}`,{
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
            setAllTerms(data.data);
            setAlertType('success');
            return;
        }
    }

    async function getAllSubUnits(unitId){
        const res = await fetch(`${baseUrl}/unit/${unitId._id}/subunits`,{
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
            setAllSubUnits(data.data.units);
            setAlertType('success');
            return;
        }
    }

    async function getAllUnits(){
        const res = await fetch(`${baseUrl}/units`,{
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
            setAllUnits(data.data.units);
            setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getAllSessions()
        getAllUnits()
    },[])

    async function getResult(){
        if(!session || !term || !subunit){
            setMsg('Please select all required fields');
            setAlertType('error');
            return;
        }else{
            const res = await fetch(`${baseUrl}/result/${session._id}/${term._id}/${subunit._id}`,{
                method:"GET",
                headers:{
                    'Authorization':`Bearer ${user.data.access_token}`
                }
            })
            const data = await res.json()
            setResult(data.data)
            console.log(data.data)
            console.log({session, term, subunit});
        }
    }

  return (
    <div className='h-[100vh]'>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[24px] lg:text-[28px] text-primary-color font-[600]">Result</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-session')}>Create Session</button> */}
                    </div>
                </div>
                <div className='grid sm:grid-cols-2 md:grid-cols-4 items-end gap-5 w-full my-[1rem] px-[10px] lg:px-[30px]'>
                    <div className='w-full relative'>
                        <label className='block text-left mb-2'>Select Session</label>
                        <div onClick={() => setDropDown(dropDown === "sessions" ? false : "sessions")} className='cursor-pointer flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input readOnly type="text" value={session?.name} className='cursor-pointer outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                            <IoChevronDownOutline />
                        </div>
                        {
                            dropDown === 'sessions' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                {
                                    allSessions?.map(session => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setSession(session)
                                                setDropDown(false)
                                                getAllSemesters(session)
                                            }}>{session.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='w-full relative'>
                        <label className='block text-left mb-2'>Select Term/Semester</label>
                        <div onClick={() => setDropDown(dropDown === "terms" ? false : "terms")} className='cursor-pointer flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input readOnly type="text" value={term?.name} className='cursor-pointer outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                            <IoChevronDownOutline />
                        </div>
                        {
                            dropDown === 'terms' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                {
                                    allTerms?.map(term => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setTerm(term)
                                                setDropDown(false)
                                            }}>{term.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='w-full relative'>
                        <label className='block text-left mb-2'>Select Unit</label>
                        <div onClick={() => setDropDown(dropDown === "unit" ? false : "unit")} className='cursor-pointer flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input readOnly type="text" value={unit?.name} className='cursor-pointer outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                            <IoChevronDownOutline />
                        </div>
                        {
                            dropDown === 'unit' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                {
                                    allUnits?.map(unit => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setUnit(unit)
                                                setDropDown(false)
                                                getAllSubUnits(unit)
                                            }}>{unit.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='w-full relative'>
                        <label className='block text-left mb-2'>Select Sub-Unit</label>
                        <div onClick={() => setDropDown(dropDown === "sub-unit" ? false : "sub-unit")} className='cursor-pointer flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input readOnly type="text" value={subunit?.name} className='cursor-pointer outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                            <IoChevronDownOutline />
                        </div>
                        {
                            dropDown === 'sub-unit' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                {
                                    allSubUnits?.map(subUnit => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setSubunit(subUnit)
                                                setDropDown(false)
                                            }}>{subUnit.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className="w-full">
                        <button onClick={getResult} className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px]'>Get Result</button>
                    </div>
                </div>
                <div className='px-[30px]'>
                    {
                        result?.length === 0 &&
                        <p>No Result for the selected session, term and subunit</p>
                    }
                </div>

                <div className='p-[30px]'>
                    {
                        result?.length > 0 &&
                        <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-left">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result?.map((res, index) => {
                                        return(
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}}>
                                                <td class="px-6 py-4">{index +1}</td>
                                                <td class="px-6 py-4">{res?.user?.fullName}</td>
                                                <td class="px-6 py-4">
                                                    <button onClick={() => showResult(true)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
                {/* <div className='px-[30px]'>
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
                                <button onClick={() => navigate(`/semester-result-info/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button>
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

export default Result