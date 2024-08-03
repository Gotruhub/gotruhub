import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronDownOutline } from "react-icons/io5";
import { FiLoader } from "react-icons/fi";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';

const AddSchedule = ({baseUrl}) => {

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
    const { id } = useParams()
    const [allAssignments, setAllAssignments] = useState([])
    const [toggleNav, setToggleNav] = useState(false)

    const [startPosition, setStartPosition] = useState()
    const [positionEnd, setPositionEnd] = useState()

    const [latStart, setLatStart] = useState()
    const [lngStart, setLngStart] = useState()

    const [latEnd, setLatEnd] = useState()
    const [lngEnd, setLngEnd] = useState()

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         console.log("hhloe");
    //         console.log(position.coords.latitude, position.coords.longitude);
    //         setPositionLng(position.coords.longitude);
    //         setPositionLat(position.coords.latitude);
    //     })
    // },[])

    const [locations, setLocations] = useState({
        location: {
          lat: latStart,
          long: lngStart
        },
        endLocation: {
          lat: latEnd,
          long: lngEnd
        }
    });

    //   const handleStartLatChange = (e) => {
    //     setLocations({
    //       ...locations,
    //       location: {
    //         ...locations.location,
    //         lat: e.target.value
    //       }
    //     });
    //   };

    //   const handleStartLongChange = (e) => {
    //     setLocations({
    //       ...locations,
    //       location: {
    //         ...locations.location,
    //         long: e.target.value
    //       }
    //     });
    //   };
    
    //   const handleEndLatChange = (e) => {
    //     setLocations({
    //       ...locations,
    //       endLocation: {
    //         ...locations.endLocation,
    //         lat: e.target.value
    //       }
    //     });
    //   };
    
    //   const handleEndLongChange = (e) => {
    //     setLocations({
    //       ...locations,
    //       endLocation: {
    //         ...locations.endLocation,
    //         long: e.target.value
    //       }
    //     });
    //   };

      const [allStaffs, setAllStaffs] = useState()
      const user = JSON.parse(localStorage.getItem('user'))
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

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
        const res = await fetch(`${baseUrl}/sub-unit/course/paid/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(res,data.data);
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
        // alert("HElo")
    getAllStaffs()
    getAllCourses()
    },[])

    async function createSchedule(){

        console.log(startPosition.coords.latitude, startPosition.coords.longitude);
    const ids = [];
    for (let i = 0; i < coordinators.length; i++) {
        ids.push(coordinators[i].id);
    }

    console.log({
        course: course?.course?._id,
        day,
        startTime: parseInt(startTime?.replace(":", "")),
        endTime:  parseInt(endTime?.replace(":", "")),
        coordinators:ids,
        location: {lat:startPosition.coords.latitude, long: startPosition.coords.longitude},
        endlocation: {lat:positionEnd.coords.latitude, long:positionEnd.coords.longitude}
    });
    if(!course ||!day ||!startTime ||!endTime){
        setMsg("Please fill in the fields!");
        setAlertType('error');
        return;
    }else{
        setLoading(true)
        const res = await fetch(`${baseUrl}/schedule`,{
            method:"POST",
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
                location: {lat:startPosition.coords.latitude.toString(), long: startPosition.coords.longitude.toString()},
                endlocation: {lat:positionEnd.coords.latitude.toString(), long:positionEnd.coords.longitude.toString()}
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

    // navigator.geolocation.getCurrentPosition(
    //     // what to do if query succeeds
    //     ((position) => alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude)),
    //     ((error) => {
    //       // what to do if query fails:
    //        const errors = {
    //          1: 'Permission denied',
    //          2: 'Position unavailable',
    //          3: 'Request timeout'
    //        };
    
    //     }),
    //     // these 3 parameters are very important, especially the first one
    //     { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
    //   );

    function getStartLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setStartPosition(position);
                    console.log(position);
                },
                (err) => {
                    setMsg(err.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            setMsg('Geolocation is not supported by this browser.');
        }
    }

    // function getEndLocation(){
    //     navigator.geolocation.watchPosition((position) => {
    //         setPositionEnd(position)
    //     })
    // }

    function getEndLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setPositionEnd(position);
                    console.log(position);
                },
                (err) => {
                    setMsg(err.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            setMsg('Geolocation is not supported by this browser.');
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5 h-[100dvh]">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/time-table/${id}`)} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Schedule assignment</p>
                        </div>
                        {/* <p className='text-[#4F4F4F]'>Enter your preferred bank account for wallet deposits</p> */}
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/update-bank-account')}>Update Account</button>
                        </div> */}
                        {/* {position} */}
                </div>
                {/* <p>Lat: {positionLat}</p>
                <p>Lng: {positionLng}</p> */}
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
                                            {coordinator.name}{index < coordinators.length - 1 && ', '}
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
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown('days')} />
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
                        <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Start Coordinates</p>
                            <button onClick={getStartLocation}>Get start</button>
                        </div>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            value={startPosition?.coords?.latitude}
                            // onChange={handleStartLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            value={startPosition?.coords?.longitude}
                            // onChange={handleStartLongChange}
                        />
                        </div>
                    </div>
                    <div className='mb-5'>
                        
                        <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Stop Coordinates</p>
                            <button onClick={getEndLocation}>Get End</button>
                        </div>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            value={positionEnd?.coords?.latitude}
                            // onChange={handleEndLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            value={positionEnd?.coords?.longitude}
                            // onChange={handleEndLongChange}
                        />
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button className='text-white bg-primary-color w-full rounded-[4px] px-[35px] py-[16px] text-center mx-auto mb-10' onClick={createSchedule}>Proceed</button>
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

export default AddSchedule