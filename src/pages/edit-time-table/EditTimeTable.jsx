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

    const handleStartLatChange = (e) => {
      setLocations({
        ...locations,
        location: {
          ...locations.location,
          lat: e.target.value
        }
      });
    };

    const handleStartLongChange = (e) => {
      setLocations({
        ...locations,
        location: {
          ...locations.location,
          long: e.target.value
        }
      });
    };
  
    const handleEndLatChange = (e) => {
      setLocations({
        ...locations,
        endLocation: {
          ...locations.endLocation,
          lat: e.target.value
        }
      });
    };
  
    const handleEndLongChange = (e) => {
      setLocations({
        ...locations,
        endLocation: {
          ...locations.endLocation,
          long: e.target.value
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
    //   setDay(data.data.day)
      setLocations({
        location: {
          lat: data?.data?.location?.lat,
          long: data?.data?.location?.long
        },
        endLocation: {
          lat: data?.data?.endlocation?.lat,
          long: data?.data?.endlocation?.lat
        }
      })
      setCourse(data?.data?.course)
      setStartTime(data?.data?.startTime)
      setEndTime(data?.data?.endTime)
      setCoordinators(data?.data?.coordinators)
      setDay(data?.data?.day)
      // setAllStaffs(data.data.users)
      
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

  // const [selectedIds, setSelectedIds] = useState([]);

  // const [coordinators, setCoordinators] = useState([]);

  const handleCheckboxChange = (id, name) => {
      setCoordinators((prevCoordinators) => {
        if (prevCoordinators.some(coordinator => coordinator.id === id)) {
          return prevCoordinators.filter(coordinator => coordinator.id !== id);
        } else {
          return [...prevCoordinators, { id, name }];
        }
      });
  };

  useEffect(() => {
    getAllStaffs()
    getAllCourses()
    getScheduleInfo()
  },[])

  async function updateSchedule(){
  const ids = [];
  for (let i = 0; i < coordinators.length; i++) {
      ids.push(coordinators[i].id);
  }

  console.log({
      course: course?.course?._id,
      day,
      startTime,
      // startTime: parseInt(startTime?.replace(":", "")),
      // endTime:  parseInt(endTime?.replace(":", "")),
      coordinators:ids,
      location: locations.location,
      endlocation: locations.endLocation
  });
  if(!course ||!day ||!startTime ||!endTime){
      setMsg("Please fill in the fields!");
      setAlertType('error');
      return;
  }else if(typeof startTime === 'number' && !isNaN(startTime) || typeof endTime === 'number' && !isNaN(endTime)){
    setMsg("Start and end time should be provided");
    setAlertType('error');
    return;
  }else{
      setLoading(true)
      const res = await fetch(`${baseUrl}/schedule/single/${scheduleId}`,{
          method:"PUT",
          headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${user.data.access_token}`
          },
          body:JSON.stringify({
              course: course?._id,
              day,
              startTime: parseInt(startTime.replace(":", "")),
              endTime:  parseInt(endTime.replace(":", "")),
              coordinators:ids,
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
          setMsg("Schedule created successfully");
          setAlertType('success');
          // navigate(`/time-table/${id}`)
          return;
      }
  }

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
                          <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/time-table/${scheduleId}`)} className='cursor-pointer' />
                          <p className="lg:text-[28px] text-[20px] text-primary-color font-[600]">Edit Schedule</p>
                      </div>
                      {/* <p className='text-[#4F4F4F]'>Enter your preferred bank account for wallet deposits</p> */}
                  </div>
                  {/* <div className='flex items-center gap-5'>
                      <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/update-bank-account')}>Update Account</button>
                  </div> */}
              </div>
              <div className='flex item-center justify-center flex-col w-[90%] mx-auto'>
                  <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Select assignment</label>
                          <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                              <input type="text" value={course?.course?.name} onChange={e => setCourse(e.target.value)} className='capitalize outline-none w-full rounded-[4px]'/>
                              <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === "assignment" ? false : "assignment")} />
                          </div>
                          {
                              dropDown === "assignment" &&
                              <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                  {
                                      allAssignments.map(assignment => {
                                          return (
                                              <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                  setDropDown(false)
                                                  setCourse(assignment)
                                              }}>{assignment?.course.name}</p>
                                          )
                                      })
                                  }
                              </div>
                          }
                      </div>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Select assignee(s)</label>
                          <div className='flex items-center justify-between border rounded-[6px] py-3 px-2 w-full'>
                              {/* <input type="text" value={
                                          coordinators.coordinator? coordinators.coordinator?.join(', ') : 'What position(s) are you applying for?'
                                      } className='capitalize outline-none w-full rounded-[4px]'/> */}
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
                                      allStaffs.map(staff => {
                                          return (
                                              <div className='flex items-center gap-1 my-2'>
                                                  <input
                                                      type="checkbox"
                                                      id={staff._id}
                                                      className="mr-2"
                                                      checked={coordinators.some(coordinator => coordinator.id === staff._id)}
                                                      onChange={() => handleCheckboxChange(staff._id, staff.fullName)}
                                                  />
                                                  <p>{staff.fullName}</p>
                                              </div>
                                              // <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                              //     setDropDown(false)
                                              //     // setBankDropDown(!bankDropDown)
                                              //     // setBankCode(bank.code)
                                              // }}>{staff.fullName}</p>
                                          )
                                      })
                                  }
                              </div>
                          }
                      </div>
                  </div>

                  <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                      <div className='w-full relative'>
                          <label className='block text-left mb-2'>Select days</label>
                          <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                              <input type="text" value={day} onChange={e => setDay(e.target.value)} className='outline-none w-full rounded-[4px] capitalize'/>
                              <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'days' ? false : 'days')} />
                          </div>
                          {
                              dropDown === 'days' &&
                              <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                  {
                                      days.map(day => {
                                          return (
                                              <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                  setDay(day)
                                                  setDropDown(false)
                                              }}>{day}</p>
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
                                  <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                              </div>
                              <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                                  <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                              </div>
                          </div>
                          {/* {
                              bankDropDown &&
                              <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                  {
                                      allBanks.map(bank => {
                                          return (
                                              <p className='cursor-pointer hover:bg-gray-300 p-2' onClick={() => {
                                                  setSelectedBank(bank.name)
                                                  setBankDropDown(!bankDropDown)
                                                  setBankCode(bank.code)
                                              }}>{bank.name}</p>
                                          )
                                      })
                                  }
                              </div>
                          } */}
                      </div>
                  </div>
                  <label className='block text-left mb-2'>Assignment location</label>
                  <div className='mb-5'>
                      <p className='text-[#19201D]'>Start Coordinates</p>
                      <div className='flex items-center gap-3'>
                      <input
                          type="text"
                          className='border py-3 px-3 rounded mt-1 w-full'
                          placeholder='Latitude'
                          value={locations.location.lat}
                          onChange={handleStartLatChange}
                      />
                      <input
                          type="text"
                          className='border py-3 px-3 rounded mt-1 w-full'
                          placeholder='Longitude'
                          value={locations.location.long}
                          onChange={handleStartLongChange}
                      />
                      </div>
                  </div>
                  <div className='mb-5'>
                      <p className='text-[#19201D]'>Stop Coordinates</p>
                      <div className='flex items-center gap-3'>
                      <input
                          type="text"
                          className='border py-3 px-3 rounded mt-1 w-full'
                          placeholder='Latitude'
                          value={locations.endLocation.lat}
                          onChange={handleEndLatChange}
                      />
                      <input
                          type="text"
                          className='border py-3 px-3 rounded mt-1 w-full'
                          placeholder='Longitude'
                          value={locations.endLocation.long}
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