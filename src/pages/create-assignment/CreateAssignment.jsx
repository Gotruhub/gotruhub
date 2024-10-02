import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { IoChevronDownOutline } from 'react-icons/io5'

const CreateAssignment = ({baseUrl}) => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [name, setName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [toggleNav, setToggleNav] = useState(false)
  const [allUnits, setAllUnits] = useState()
  const [unitDropDown, setUnitDropDown] = useState(false)
  const [unitText, setUnitText] = useState()
  const [unit, setUnit] = useState()

  useEffect(() => {
    getAllUnits()
  },[])

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

  async function createAssignment(){
    if(!name || !courseCode){
      setMsg("Assignment name and code is required!");
      setAlertType('error');
      return;
    }
    setLoading(true)
    console.log({name, courseCode, unit});
    const res = await fetch(`${baseUrl}/course`,{
        method:"POST",
        body: JSON.stringify({name, courseCode, unit}),
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


  return (
    <div className='h-[100dvh]'>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/assignments')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Create Assignment</p>
                    </div>
                </div>
                <div className='px-[10px] lg:px-[30px] max-w-[500px] mx-auto'>
                  <div className='mb-5'>
                      <p className='text-[#19201D]'>Assignment Name</p>
                      <input type="text" onChange={e => setName(e.target.value)} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Course/Subject' />
                  </div>
                  <div className='mb-5'>
                      <p className='text-[#19201D]'>Assignment / Course Code..</p>
                      <input type="text" onChange={e => setCourseCode(e.target.value)} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter assignment / course code' />
                  </div>
                  <div className='relative w-full mb-5'>
                      <p className='text-[#19201D]'>Select Unit</p>
                      <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                          <input type="text" value={unit} placeholder='Select user type' className='w-[60%] absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                          <p className='text-[14px]'>{unitText}</p>
                          <IoChevronDownOutline className='text-black' cursor='pointer' onClick={() => setUnitDropDown(!unitDropDown)}/>
                      </div>
                      {unitDropDown &&
                          <div className='py-5 bg-white absolute overflow-y-scroll border h-[350px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                              {
                                  allUnits?.map(unit => (
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
                  {
                      loading ? 
                      <BtnLoader bgColor="#191f1c"/>
                      :
                      <button onClick={createAssignment} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Create Assignment</button>
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

export default CreateAssignment