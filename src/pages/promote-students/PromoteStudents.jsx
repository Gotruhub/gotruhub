import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom';
import { IoChevronDownOutline } from 'react-icons/io5'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader';

const PromoteStudents = ({baseUrl}) => {

    const promotionIds = JSON.parse(localStorage.getItem('promotioIds'))
    const navigate = useNavigate()
    const [allSessions, setAllSessions] = useState([])
    const [allUnits, setAllUnits] = useState()
    const [allSubUnits, setAllSubUnits] = useState()

    const [fromSession, setFromSession] = useState(promotionIds.sessionId ? promotionIds.sessionId : null)
    const [toSession, setToSession] = useState()

    const [fromUnit, setFromUnit] = useState(promotionIds.unitId ? promotionIds.unitId : null)
    const [toUnit, setToUnit] = useState()

    const [fromSubUnit, setFromSubUnit] = useState(promotionIds.subUnitId ? promotionIds.subUnitId : null)
    const [toSubUnit, setToSubUnit] = useState()

    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)
    const [dropDown, setDropDown] = useState()
    const [loading, setLoading] = useState(false)

    const studentsId = JSON.parse(localStorage.getItem('studentsId'))


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
        getAllSessions();
        getAllUnits();
    }, [])

    async function getAllSubUnits(unitId){
        console.log(unitId);
        
        const res = await fetch(`${baseUrl}/unit/${unitId}/subunits`,{
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

//     {
//     "studentIds": ["68904adfedd8e860e283e47a"],

//     "fromSessionId": "688f72012e92ecc0ecd2b7de",
//     "toSessionId": "68598a2e89edf8171de165b2",

//     "fromUnitId": "6859809b89edf8171de16332",
//     "toUnitId": "6859809b89edf8171de16332",

//     "fromSubUnitId": "6859853289edf8171de163e0",
//     "toSubUnitId": "6859852489edf8171de163db",
// }

async function executePromotion(){
        console.log("ID's=====", fromSession, toSession._id, fromUnit, toUnit._id, fromSubUnit, toSubUnit._id);
        if(!toUnit || !fromSubUnit || !toSubUnit){
            setMsg("Please fill in all fields!");
            setAlertType('error');
            return;
        }
        setLoading(true)
        const res = await fetch(`${baseUrl}/promotions/`,{
            method:"POST",
            body: JSON.stringify({
                studentIds: studentsId,
                fromSessionId: fromSession,
                toSessionId: toSession._id,
                fromUnitId: fromUnit,
                toUnitId: toUnit._id,
                fromSubUnitId: fromSubUnit,
                toSubUnitId: toSubUnit._id
            }),
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
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
        setMsg("Students promoted successfully!");
        setAlertType('success');
        setFromSession(null);
        setToSession(null);
        setFromUnit(null);
        setToUnit(null);
        setFromSubUnit(null);
        setToSubUnit(null);
        setDropDown(false);
        // Optionally, you can navigate to another page or reset the form
        // navigate('/some-other-page');
        // or reset the form fields
        console.log("Promotion executed successfully");
        console.log(studentsId)
    }


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[1rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/promotion')} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Promote To {toSubUnit?.name} </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between w-[80%] mx-auto mt-10 items-start px-[10px] lg:px-[30px] py-[1rem]'>
                    <div className="bg-white w-full pt-[20px] md:px-[2rem] px-[16px] pb-[20px]">
                        <div className='w-full relative'>
                            <label className='block text-left mb-2'>Select Session</label>
                            <div onClick={() => setDropDown(dropDown === "to-sessions" ? false : "to-sessions")} className='cursor-pointer flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                <input readOnly type="text" value={toSession?.name} className='cursor-pointer outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                                <IoChevronDownOutline />
                            </div>
                            {
                                dropDown === 'to-sessions' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allSessions?.map(session => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setToSession(session)
                                                    setDropDown(false)
                                                }}>{session.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='relative w-[100%] my-7'>
                            <label className='block text-left mb-2'>Select Unit</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                                <input onChange={e => setToUnit(e.target.value)} type="text" value={toUnit?.name} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "to-unit" ? false : "to-unit")} />
                            </div>
                            {
                                dropDown === 'to-unit' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allUnits?.map(unit => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setToUnit(unit)
                                                    setDropDown(false)
                                                    getAllSubUnits(unit._id)
                                                }}>{unit.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Sub-Unit</label>
                            <div className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                                <input type="text" onChange={e => setToSubUnit(e.target.value)} value={toSubUnit?.name} className='outline-none rounded-[4px] w-full capitalize bg-transparent'/>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "to-sub-unit" ? false : "to-sub-unit")} />
                            </div>
                            {
                                dropDown === 'to-sub-unit' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allSubUnits?.map(subUnit => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setToSubUnit(subUnit)
                                                    setDropDown(false)
                                                }}>{subUnit.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        {
                            loading ? 
                            <BtnLoader bgColor="#191f1c"/>
                            :
                            <button onClick={executePromotion} className='text-white mt-7 bg-[#2D3934] mx-auto block w-[100%] rounded-[7px] px-4 py-3 roun[4px] text-[12px]'>Promote</button>
                        }
                    </div>
                </div>
            </div>
        </div>

        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default PromoteStudents