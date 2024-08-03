import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { IoChevronDownOutline } from 'react-icons/io5'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const CreateSubUnit = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allUnits, setAllUnits] = useState([])
    const [unitDropDown, setUnitDropDown] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const [unitText, setUnitText] = useState()
    const [unit, setUnit] = useState()

    const [staffDropDown, setStaffDropDown] = useState(false)
    const [staffText, setStaffText] = useState()
    const [staff, setStaff] = useState()
    const [allStaffs, setAllStaffs] = useState([])
    const [toggleNav, setToggleNav] = useState(false)

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

    async function getAllStaffs(){
        const res = await fetch(`${baseUrl}/users/get-users/staff?role=staff`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.users);
        setAllStaffs(data.data.users)
    }

    useEffect(() => {
        getAllUnits()
        getAllStaffs()
    },[])

    async function createSubUnit(){
        console.log(staff, name, unit);
        if(!name || !staff || !unit){
            setMsg("Please fill in the fields!");
            setAlertType('error');
            return;
        }
        setLoading(true)
        const res = await fetch(`${baseUrl}/subunits`,{
            method:"POST",
            body: JSON.stringify({coordinator:staff, name, unit}),
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${user.data.access_token}`
        }
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(res.ok){
            setMsg("Sub unit created successfully!");
            setAlertType('success');
            return;
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Create Sub Unit</p>
                    </div>
                </div>
                <div className='px-[10px] lg:px-[30px]'>
                    <div className='px-[10px] lg:px-[30px] max-w-[500px] mx-auto'>
                        <div className='relative w-full mb-5'>
                            <p className='text-[#19201D]'>Select Unit</p>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                <input type="text" value={unit} placeholder='Select user type' className='w-[60%] absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                                <p className='text-[14px]'>{unitText}</p>
                                <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setUnitDropDown(!unitDropDown)}/>
                            </div>
                            {unitDropDown &&
                                <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allUnits.map(unit => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setUnitDropDown(false) 
                                                setUnit(unit._id)
                                                setUnitText(unit.name)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{unit.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>

                        <div className='mb-5'>
                            <p className='text-[#19201D]'>Sub-unit name.</p>
                            <input type="text" onChange={e => setName(e.target.value)} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter Sub-unit name' />
                        </div>

                        <div className='relative w-full mb-5'>
                            <p className='text-[#19201D]'>Sub-unit coordinator</p>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                <input type="text" value={staff} placeholder='Select user type' className='w-[60%] absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                                <p className='text-[14px]'>{staffText}</p>
                                <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setStaffDropDown(!staffDropDown)}/>
                            </div>
                            {staffDropDown &&
                                <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allStaffs.map(stf => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setStaffDropDown(false) 
                                                setStaff(stf._id)
                                                setStaffText(stf.fullName)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{stf.fullName}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <div className='text-[#865C1D] text-[14px] flex items-center gap-1 mt-[-20px] mb-4'>
                            <IoMdInformationCircleOutline />
                            <p>Coordinator is responsible for result upload.</p>
                        </div>

                        {
                            loading ? 
                            <BtnLoader bgColor="#191f1c"/>
                            :
                            <button onClick={createSubUnit} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Create Sub Unit</button>
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

export default CreateSubUnit