import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { IoChevronDownOutline } from 'react-icons/io5'
import { IoMdInformationCircleOutline } from 'react-icons/io'

const UnitAssignmentCreate = ({baseUrl}) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const [unitInfo, setUnitInfo] = useState()
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)

    const [subUnitText, setSubUnitText] = useState()
    const [subUnit, setSubUnit] = useState()

    const [dropDown, setDropDown] = useState()
    const [allSubUnits, setAllSubUnits] = useState([])
    const [allAssignments, setAllAssignments] = useState([])
    const [allSession, setAllSession] = useState([])
    const [allSemesters, setAllSemesters] = useState([])
    const [selectedSession, setSelectedSession] = useState({})
    const [selectedSemester, setSelectedSemester] = useState({})
    const [basePrice, setBasePrice] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    async function getUnitInfo(){
        const res = await fetch(`${baseUrl}/units/${id}`,{
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
            setUnitInfo(data.data.unit);
            getAllSubUnits(data.data.unit._id)
            setAlertType('success');
            return;
        }
    }

    async function getBasePrice(){
        const res = await fetch(`${baseUrl}/sub-unit/monitor-price`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        if(res.ok){
            setBasePrice(data.data.basePrice)
            return;
        }
    }

    async function getAllSubUnits(unitId){
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

    async function getAllSession(){
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
            setAllSession(data.data);
            setAlertType('success');
            return;
        }
    }


    async function getAllAssignments(){
        console.log("Called.............");
        
        setLoading(true);
        const res = await fetch(`${baseUrl}/course?unit=${unitInfo?._id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log("All assignments for this unit", data);
        if(res) setLoading(false);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllAssignments(data.data);
            setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getUnitInfo()
        getAllSession()
        getBasePrice()
        if(unitInfo){
            getAllAssignments()
        }
    },[])

    async function getAllSemesters(session){
        console.log({selectedSession, session});
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
            setAllSemesters(data.data);
            setAlertType('success');
            return;
        }
    }

    const addToCart = async (assignment) => {
        console.log("Added ===>", {quantity:1, subscriptionType:assignment});
        try {
          const response = await fetch(`${baseUrl}/sub-unit/course`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${user.data.access_token}`
            },
            body: JSON.stringify({term:selectedSemester._id, subUnit, course:assignment}),
          });
          const data = await response.json()
          if (response.ok) {
                setMsg(data.message);
                setAlertType('success');
                return;
          } else {
                setMsg(data.message);
                setAlertType('error');
                return;
          }
        } catch (error) {
          console.error('Error adding assignment to cart:', error);
        }
      };
    
      const removeFromCart = async (assignment) => {
        console.log('Removed ===>', {quantity:1, subscriptionType:assignment});
        try {
            const response = await fetch(`${baseUrl}/plan/add-to-cart`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.data.access_token}`
              },
              body: JSON.stringify({quantity:1, subscriptionType:assignment}),
            });
            const data = await response.json()
            if (response.ok) {
                  setMsg(data.message);
                  setAlertType('success');
                  return;
            } else {
                  setMsg(data.message);
                  setAlertType('error');
                  return;
            }
          } catch (error) {
            console.error('Error adding assignment to cart:', error);
          }
      };

    const [selectedAssignments, setSelectedAssignments] = useState([]);

    const handleCheckboxChange = async (event, assignment) => {
      if (event.target.checked) {
        await addToCart(assignment._id);
        setSelectedAssignments([...selectedAssignments, assignment]);
      } else {
        await removeFromCart(assignment._id);
        setSelectedAssignments(selectedAssignments.filter(a => a._id !== assignment._id));
      }
    };


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Add Assignment</p>
                    </div>
                </div>
                <div className=''>
                    <div className='px-[10px] lg:px-[30px] max-w-[500px] mx-auto'>
                        <div className='mb-5'>
                            <p className='text-[#19201D]'>Pivot unit</p>
                            <input type="text" value={unitInfo?.name} className='border py-3 px-3 rounded mt-1 w-full outline-none' />
                        </div>

                        <div className='relative w-full mb-5'>
                            <p className='text-[#19201D]'>Select sub-unit</p>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px] cursor-pointer' onClick={() => setDropDown(dropDown === 'sub-units' ? false : "sub-units")}>
                                <input type="text" value={subUnit} placeholder='Select user type' className='absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                                <p className='text-[14px]'>{subUnitText}</p>
                                <IoChevronDownOutline color="black"/>
                            </div>
                            {dropDown === 'sub-units' &&
                                <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allSubUnits?.map(unit => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setDropDown(false)
                                                setSubUnit(unit._id)
                                                setSubUnitText(unit.name)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{unit.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>

                        <div className='relative w-full mb-5'>
                            <p className='text-[#19201D]'>Select session</p>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px] cursor-pointer' onClick={() => setDropDown(dropDown === 'session' ? false : "session")}>
                                <input type="text" value={selectedSession._id} placeholder='Select user type' className='absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                                <p className='text-[14px]'>{selectedSession?.name}</p>
                                <IoChevronDownOutline color="black" cursor='pointer' />
                            </div>
                            {dropDown === 'session' &&
                                <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allSession?.map(session => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setDropDown(false)
                                                setSelectedSession(session)
                                                getAllSemesters(session)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{session.name}</p>
                                            </div>
                                        ))
                                    }
                                    {
                                        allSession?.length === 0 &&
                                        <div className='flex items-center justify-center pt-10 text-center flex-col gap-7'>
                                            <p>You have no session created for yet, please create one</p>
                                            <button onClick={() => navigate('/create-session')} className='text-white bg-primary-color w-1/2 rounded-[4px] mt-[.5rem] px-[15px] py-[8px] text-center mx-auto'>Create Session</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='relative w-full mb-5'>
                            <p className='text-[#19201D]'>Select semester / Term</p>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px] cursor-pointer' onClick={() => setDropDown(dropDown === 'semester' ? false : "semester")}>
                                <input type="text" value={selectedSemester._id} placeholder='Select user type' className='absolute opacity-0 outline-none rounded-[4px] bg-transparent'/>
                                <p className='text-[14px]'>{selectedSemester?.name}</p>
                                <IoChevronDownOutline color="black" cursor='pointer'/>
                            </div>
                            {dropDown === 'semester' &&
                                <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allSemesters?.map(semester => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setDropDown(false)
                                                setSelectedSemester(semester)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{semester.name}</p>
                                            </div>
                                        ))
                                    }

                                    {
                                        allSemesters?.length === 0 &&
                                        <div className='flex items-center justify-center pt-10 text-center flex-col gap-2 text-gray-500 text-[14px]'>
                                            <p>You have no semester created yet, please create one</p>
                                            <p>Note: A session should exist before creating a semester/term</p>
                                            <button onClick={() => navigate('/calendar')} className='text-white bg-primary-color w-1/2 rounded-[4px] mt-[.5rem] px-[15px] py-[8px] text-center mx-auto'>Create Semester/Term</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className='relative w-full mb-5'>
                            <p className='text-[#19201D]'>Select Assignment</p>
                            <div onClick={() => setDropDown(dropDown === 'assignments' ? false : 'assignments' )} className='flex items-center cursor-pointer justify-between px-4 py-3 border w-full rounded-[4px]'>
                                {selectedAssignments.length > 0 ? (
                                    <ul className='flex items-center text-[12px] gap-2'>
                                        {selectedAssignments?.map((assignment) => (
                                        <li key={assignment._id} className='bg-gray-300 p-1 rounded-[4px]'>{assignment.courseCode}</li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <p>No assignments selected.</p>
                                )}
                                <IoChevronDownOutline color="black" onClick={getAllAssignments} cursor='pointer' />
                            </div>
                            {dropDown === 'assignments' &&
                                <div className='py-5 bg-white absolute overflow-y-scroll top-[-210px] border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allAssignments?.map(assignment => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3 flex gap-1'>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAssignments.some(a => a._id === assignment._id)}
                                                    onChange={(e) => handleCheckboxChange(e, assignment)}
                                                />
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{assignment.name}</p>
                                            </div>
                                        ))
                                    }
                                    {
                                        loading ? <BtnLoader />
                                        :
                                        <>
                                            {
                                                allAssignments?.length === 0 &&
                                                <div className='flex items-center justify-center pt-10 text-center flex-col gap-2 text-gray-500 text-[14px]'>
                                                    <p>You have no assignment created for {unitInfo?.name} yet, please create one</p>
                                                    <button onClick={() => navigate('/create-assignment')} className='text-white bg-primary-color w-1/2 rounded-[4px] mt-[.5rem] px-[15px] py-[8px] text-center mx-auto'>Create Assignment</button>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            }
                        </div>
                        <div className='text-[#865C1D] text-[14px] flex items-center gap-1 mt-[-20px] mb-4'>
                            <IoMdInformationCircleOutline />
                            <p>Each assignment costs NGN {basePrice}</p>
                        </div>

                        {/* {
                            loading ? 
                            <BtnLoader bgColor="#191f1c"/>
                            :
                        } */}
                        <button onClick={() => navigate('/view-assignment-summary')} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed to payment</button>
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

export default UnitAssignmentCreate