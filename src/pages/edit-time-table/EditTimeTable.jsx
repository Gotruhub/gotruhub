import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronDownOutline } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';

const EditTimeTable = ({baseUrl}) => {

  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [dropDown, setDropDown] = useState()
  const [day, setDay] = useState()
  const [course, setCourse] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [coordinators, setCoordinators] = useState([])
  const { scheduleId, subUnitId } = useParams()
  const [allAssignments, setAllAssignments] = useState([])
  const [allStaffs, setAllStaffs] = useState()
  const user = JSON.parse(localStorage.getItem('user'))
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  const [allAssignmentLocations, setAllAssignmentLocations] = useState([])
  const [name, setName] = useState('')
  const [locations, setLocations] = useState({
      location: {
        lat: "",
        long: ""
      },
      endLocation: {
        lat: "",
        long: ""
      }
    });

    const [locationId, setLocationId] = useState()

    // Fixed: Use separate state variables for coordinates
    const [latStart, setLatStart] = useState('')
    const [lngStart, setLngStart] = useState('')
    const [latEnd, setLatEnd] = useState('')
    const [lngEnd, setLngEnd] = useState('')

    // Fixed: Added onChange handlers for coordinate inputs
    const handleStartLatChange = (e) => {
      const value = e.target.value;
      setLatStart(value);
      setLocations({
        ...locations,
        location: {
          ...locations.location,
          lat: value
        }
      });
    };

    const handleStartLongChange = (e) => {
      const value = e.target.value;
      setLngStart(value);
      setLocations({
        ...locations,
        location: {
          ...locations.location,
          long: value
        }
      });
    };
  
    const handleEndLatChange = (e) => {
      const value = e.target.value;
      setLatEnd(value);
      setLocations({
        ...locations,
        endLocation: {
          ...locations.endLocation,
          lat: value
        }
      });
    };
  
    const handleEndLongChange = (e) => {
      const value = e.target.value;
      setLngEnd(value);
      setLocations({
        ...locations,
        endLocation: {
          ...locations.endLocation,
          long: value
        }
      });
    };

    async function getScheduleInfo(){
      console.log(scheduleId);
      const res = await fetch(`${baseUrl}/schedule/single/${scheduleId}`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
      const data = await res.json()
      console.log(data);
      console.log(data?.data);
      console.log('API Coordinators:', data?.data?.coordinators);
      
      setCourse(data?.data?.course)
      setStartTime(data?.data?.startTime)
      setEndTime(data?.data?.endTime)

      // Fixed: Transform coordinators to match our local state structure
      const apiCoordinators = data?.data?.coordinators || [];
      const transformedCoordinators = apiCoordinators.map(coordinator => ({
        id: coordinator._id || coordinator.id,
        fullName: coordinator.fullName || coordinator.name
      }));
      setCoordinators(transformedCoordinators);
      
      setDay(data?.data?.day)
      setName(data?.data?.locationId?.name)
      
      // Fixed: Properly set coordinate values and locations state
      const startLat = data?.data?.location?.lat || '';
      const startLong = data?.data?.location?.long || '';
      const endLat = data?.data?.endlocation?.lat || '';
      const endLong = data?.data?.endlocation?.long || '';
      
      setLatStart(startLat)
      setLngStart(startLong)
      setLatEnd(endLat)
      setLngEnd(endLong)
      
      setLocations({
        location: {
          lat: startLat,
          long: startLong
        },
        endLocation: {
          lat: endLat,
          long: endLong
        }
      });
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

    async function getAllCourses(){
      const res = await fetch(`${baseUrl}/sub-unit/course/paid/${subUnitId}`,{
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
          setAllAssignments(data.data);
          setAlertType('success');
          return;
      }
  }

  // Fixed: Improved handleCheckboxChange function with better debugging
  const handleCheckboxChange = (id, fullName) => {
      console.log('Checkbox clicked:', { id, fullName });
      console.log('Current coordinators:', coordinators);
      
      setCoordinators((prevCoordinators) => {
        const isAlreadySelected = prevCoordinators.some(coordinator => coordinator.id === id);
        console.log('Is already selected:', isAlreadySelected);
        
        if (isAlreadySelected) {
          const filtered = prevCoordinators.filter(coordinator => coordinator.id !== id);
          console.log('After removal:', filtered);
          return filtered;
        } else {
          const added = [...prevCoordinators, { id, fullName }];
          console.log('After addition:', added);
          return added;
        }
      });
  };

  useEffect(() => {
    getAllStaffs()
    getAllCourses()
    getScheduleInfo()
  },[])

  async function updateSchedule(){
    // Fixed: Filter out any null/undefined values and extract IDs properly
    const ids = coordinators
      .filter(coordinator => coordinator && coordinator.id)
      .map(coordinator => coordinator.id);

    console.log({
        course: course?.course?._id || course?._id,
        day,
        startTime,
        endTime,
        coordinators: ids,
        location: locations.location,
        endlocation: locations.endLocation
    });

    if(!course ||!day ||!startTime ||!endTime){
        setMsg("Please fill in the fields!");
        setAlertType('error');
        return;
    } else {
        setLoading(true)
        const res = await fetch(`${baseUrl}/schedule/single/${scheduleId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            },
            body:JSON.stringify({
                course: course?._id || course?.course?._id,
                day,
                startTime: parseInt(startTime.replace(":", "")),
                endTime:  parseInt(endTime.replace(":", "")),
                coordinators: ids,
                location: locations.location,
                endlocation: locations.endLocation
            })
        })
        const data = await res.json()
        if(res) setLoading(false)
        console.log(data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setMsg("Schedule updated successfully");
            setAlertType('success');
            return;
        }
    }
  }

  async function getAssignmentLocations(){
    const res = await fetch(`${baseUrl}/locations`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data.data);
    setAllAssignmentLocations(data.data)
    }

    useEffect(() => {
        getAssignmentLocations()
    },[])

  function selectedLocation(data){
    console.log(data._id);
    setLocationId(data._id)
    setDropDown(false)
    setName(data.name)
    
    // Fixed: Update both state variables and locations object
    const startLat = data.location?.lat || '';
    const startLong = data.location?.long || '';
    const endLat = data.endlocation?.lat || '';
    const endLong = data.endlocation?.long || '';
    
    setLatStart(startLat)
    setLngStart(startLong)
    setLatEnd(endLat)
    setLngEnd(endLong)
    
    setLocations({
      location: {
        lat: startLat,
        long: startLong
      },
      endLocation: {
        lat: endLat,
        long: endLong
      }
    });
}

return (
  <div>
      <SideNav />
      <div className="w-full lg:w-[78%] ml-auto pb-5 h-[100dvh]">
          <TopNav />
          <div className="">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                  <div>
                      <div className="flex items-center gap-2">
                          <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/time-table/${subUnitId}`)} className='cursor-pointer' />
                          <p className="lg:text-[28px] text-[20px] text-primary-color font-[600]">Edit Schedule</p>
                      </div>
                  </div>
              </div>
              <div className='flex item-center justify-center flex-col w-[90%] mx-auto'>
                  <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Select assignment</label>
                          <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                              <input type="text" value={course?.course?.name || course?.name || ''} readOnly className='capitalize outline-none w-full rounded-[4px]'/>
                              <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "assignment" ? false : "assignment")} />
                          </div>
                          {
                              dropDown === "assignment" &&
                              <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                  {
                                      allAssignments?.map((assignment, index) => {
                                          return (
                                              <p key={index} className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                  setDropDown(false)
                                                  setCourse(assignment)
                                              }}>{assignment?.course?.name}</p>
                                          )
                                      })
                                  }
                              </div>
                          }
                      </div>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Select assignee(s)</label>
                          <div className='flex items-center justify-between border rounded-[6px] py-3 px-2 w-full'>
                              <ul className="flex items-center gap-1 pl-[2px]">
                                  {coordinators?.map((coordinator, index) => (
                                      <li key={coordinator.id} className="inline text-[12px]">
                                          {coordinator.fullName}{index < coordinators.length - 1 && ', '}
                                      </li>
                                  ))}
                              </ul>
                              <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "assignee" ? false : "assignee")} />
                          </div>
                          {
                              dropDown === "assignee" &&
                              <div className=' p-[8px] absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                  {
                                      allStaffs?.map((staff, index) => {
                                          // Fixed: Better checking logic for selected state
                                          const isSelected = coordinators.some(coordinator => 
                                            coordinator.id === staff._id
                                          );
                                          
                                          return (
                                              <div key={staff._id || index} className='flex items-center gap-1 my-2'>
                                                  <input
                                                      type="checkbox"
                                                      id={staff._id}
                                                      className="mr-2"
                                                      checked={isSelected}
                                                      onChange={() => handleCheckboxChange(staff._id, staff.fullName)}
                                                  />
                                                  <label htmlFor={staff._id} className="cursor-pointer">{staff.fullName}</label>
                                              </div>
                                          )
                                      })
                                  }
                              </div>
                          }
                      </div>
                  </div>

                  <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Select day</label>
                          <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                              <input type="text" value={day || ''} readOnly className='outline-none w-full rounded-[4px] capitalize'/>
                              <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'days' ? false : 'days')} />
                          </div>
                          {
                              dropDown === 'days' &&
                              <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                  {
                                      days?.map((dayOption, index) => {
                                          return (
                                              <p key={index} className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                  setDay(dayOption)
                                                  setDropDown(false)
                                              }}>{dayOption}</p>
                                          )
                                      })
                                  }
                              </div>
                          }
                      </div>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Time - range</label>
                          <div className='flex items-center gap-5'>
                              <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                  <input type="time" value={startTime || ''} onChange={e => setStartTime(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                              </div>
                              <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                  <input type="time" value={endTime || ''} onChange={e => setEndTime(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <label className='block text-left mb-2'>Assignment location</label>
                    <div className='w-full relative mb-5'>
                        <label className='block text-left mb-2'>Select Assignment location</label>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input type="text" value={name || ''} readOnly className='outline-none w-full rounded-[4px] capitalize'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'locations' ? false : 'locations')} />
                        </div>
                        {
                            dropDown === 'locations' &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[180px] overflow-y-scroll'>
                                {
                                    allAssignmentLocations?.map((location, index) => {
                                        return (
                                            <p key={index} className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                selectedLocation(location)
                                            }}>{location.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='mb-5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Start Coordinates</p>
                        </div>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            value={latStart}
                            onChange={handleStartLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            value={lngStart}
                            onChange={handleStartLongChange}
                        />
                        </div>
                    </div>
                    <div className='mb-5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Stop Coordinates</p>
                        </div>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            value={latEnd}
                            onChange={handleEndLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            value={lngEnd}
                            onChange={handleEndLongChange}
                        />
                        </div>
                    </div>
                  {
                      loading ? 
                      <BtnLoader bgColor="#191f1c"/>
                      :
                      <button className='text-white bg-primary-color w-full rounded-[4px] px-[35px] py-[16px] text-center mx-auto mb-10' onClick={updateSchedule}>Update Schedule</button>
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

export default EditTimeTable