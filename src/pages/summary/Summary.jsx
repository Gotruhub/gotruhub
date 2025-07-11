import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';
import { IoChevronDownOutline } from 'react-icons/io5';
import { HiSearchCircle } from 'react-icons/hi';
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';

const Summary = ({baseUrl}) => {

    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Admin sales", "Admin Purchases"]
    const user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams()
    const navigate = useNavigate()
    const [allAttendanceSummary, setAllAttendanceSummary] = useState()
    const [dropDown, setDropDown] = useState()
    const [allSchedules, setAllSchedules] = useState()
    const [schedule, setSchedule] = useState()
    const [allSubUnits, setAllSubUnits] = useState()
    const [allUnits, setAllUnits] = useState()
    const [subunit, setSubunit] = useState()
    const [unit, setUnit] = useState()
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)
    const [toggleNav, setToggleNav] = useState(false)

    async function getAllSchedule(subUbitId){
        const res = await fetch(`${baseUrl}/sub-unit/course/paid/${subUbitId._id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllSchedules(data.data);
            // setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getAllUnits()
        // getAllAttendanceSummary()
    }, [])

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
    
    async function getSummary(){
        setLoading(true)
        console.log(`${baseUrl}/my-orgnz-summary/subunit-summary/course/${schedule.course._id}/${user.data.details._id}/attendance-summary`);
        
        const res = await fetch(`${baseUrl}/my-orgnz-summary/subunit-summary/course/${schedule._id}/${user.data.details._id}/attendance-summary`,{
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
            setLoading(false)
            return;
        }
        if(res.ok){
            setAllAttendanceSummary(data.data);
            setLoading(false)
            // setAlertType('success');
            return;
        }
    }

    // console.log(allAttendanceSummary?.days?.length);
    

    const formatedTime = (time) => {
        // Convert time to a string and pad with zeros if needed
        const timeStr = time.toString().padStart(4, '0');
    
        // Extract hours and minutes from the string
        const hours = parseInt(timeStr.slice(0, 2), 10);
        const minutes = timeStr.slice(2);
    
        // Create a Date object with the extracted hours and minutes
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
    
        // Format options to convert to 12-hour format with AM/PM
        const options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };
    
        return date.toLocaleTimeString([], options);
    };
    // {{url}}/my-orgnz-summary/subunit-summary/course/:subunitCourseId/:organizationId/attendance-summary
    // {{url}}/my-orgnz-summary/subunit-summary/course/:subunitCourseId/:organizationId/attendance-summary

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lgtext-[28px] text-primary-color font-[600]">Attendance Display</p>
                    </div>
                    {/* <div className='relative flex items-center gap-[10px]'>
                        <div className='flex items-center bg-white p-2 rounded-[4px] cursor-pointer' onClick={() => setFilterDropdown(!filterDropDown)}>
                            <CiFilter className='mr-1'/>
                            <p className='px-5 border-l'>Filter</p>
                            <GoChevronDown />
                        </div>
                        <div className='absolute top-[40px] z-10'>
                            {
                                    filterDropDown &&
                                    <div className='border mt-1 rounded-[6px] bg-[#fff] text-[#6F7975]'>
                                    {
                                        filterArray.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <p onClick={() => {
                                                        setFilterDropdown(false)
                                                    }} className='cursor-pointer p-3 hover:bg-gray-200'>{item}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div> */}
                </div>
                <div className='flex items-end justify-between px-[10px] lg:px-[30px] w-full'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 items-end gap-5 w-full my-[1rem]'>
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Unit</label>
                            <div onClick={() => setDropDown(dropDown === "unit" ? false : "unit")} className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
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
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Sub-Unit</label>
                            <div onClick={() => setDropDown(dropDown === "sub-unit" ? false : "sub-unit")} className='flex items-center justify-between border rounded-[6px] py-3 px-5'>
                                <input readOnly type="text" value={subunit?.name} className='cursor-pointer outline-none rounded-[4px] w-full capitalize bg-transparent'/>
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
                                                    getAllSchedule(subUnit)
                                                }}>{subUnit.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='relative w-[100%]'>
                            <label className='block text-left mb-2'>Select Schedule</label>
                            <div onClick={() => setDropDown(dropDown === "schedules" ? false : "schedules")} className='flex items-center justify-between border rounded-[6px] py-3 px-5 '>
                                <input readOnly type="text" value={schedule?.course.name} className='cursor-pointer outline-none w-full rounded-[4px] capitalize bg-transparent'/>
                                <IoChevronDownOutline />
                            </div>
                            {
                                dropDown === 'schedules' &&
                                <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[250px] overflow-y-scroll'>
                                    {
                                        allSchedules?.length < 1 &&
                                        <p className='text-center p-5 text-[14px]'>No schedule for the selected unit and subunit</p>
                                    }
                                    {
                                        allSchedules?.map(schedule => {
                                            return (
                                                <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                    setSchedule(schedule)
                                                    setDropDown(false)
                                                }}>{schedule.course.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        {
                            loading ?
                            <BtnLoader />
                            :
                            <div className="w-[100%]">
                                <button onClick={getSummary} className='bg-[#19201D] text-white px-[20px] py-2 rounded-[6px] text-[14px] w-full'>View Display</button>
                            </div>
                        }
                    </div>
                </div>
                {/* <div className='grid lg:grid-cols-4 text-center gap-3 mt-5 px-[10px] lg:px-[30px] w-full grid-cols-2 text-[14px]'>
                    <div className='border bg-[#F2FCF8] py-3 rounded-[8px]'>
                        <p className='mb-5'>Start Time</p>
                        <p>
                            {
                                
                                allAttendanceSummary && formatedTime(allAttendanceSummary?.classSchedule?.startTime)
                            }
                        </p>
                    </div>
                    <div className='border bg-[#F2FCF8] py-3 rounded-[8px]'>
                        <p className='mb-5'>End Time</p>
                        <p>
                            {
                                allAttendanceSummary && formatedTime(allAttendanceSummary?.classSchedule?.endTime)
                            }
                        </p>
                    </div>
                    <div className='border bg-[#F2FCF8] py-3 rounded-[8px]'>
                        <p>Saved Location/Start</p>
                        <div className='flex gap-1 items-center justify-center'>
                            <p>Lat :</p>
                            <p>
                                {
                                    
                                    allAttendanceSummary && allAttendanceSummary?.classSchedule?.location?.lat
                                }
                            </p>
                        </div>
                        <div className='flex gap-1 items-center justify-center'>
                            <p>Long :</p>
                            <p>
                                {
                                    
                                    allAttendanceSummary && allAttendanceSummary?.classSchedule?.location?.long
                                }
                            </p>
                        </div>
                    </div>
                    <div className='border bg-[#F2FCF8] py-3 rounded-[8px]'>
                        <p>Saved Location/End</p>
                        <div className='flex gap-1 items-center justify-center'>
                            <p>Lat :</p>
                            <p>
                                {
                                    
                                    allAttendanceSummary && allAttendanceSummary?.classSchedule?.endlocation?.lat
                                }
                            </p>
                        </div>
                        <div className='flex gap-1 items-center justify-center'>
                            <p>Long :</p>
                            <p>
                                {
                                    
                                    allAttendanceSummary && allAttendanceSummary?.classSchedule?.endlocation?.long
                                }
                            </p>
                        </div>
                    </div>
                </div> */}
                <div class="relative overflow-x-auto lg:mx-5 mt-10 lg:p-8 p-4">
                    {/* {
                        allAttendanceSummary && allAttendanceSummary?.attendances.length < 1 &&
                        <p className='text-center p-5 text-[14px]'>No Attendance Summary for the selected unit, subunit and schedule</p>
                    } */}
                    <div className='w-[500px] space-y-2 mb-12'>
                        <div className='flex items-center gap-5'>
                            <p className='font-[500]'>Assignment:</p>
                            <p>{allAttendanceSummary?.courseCode}</p>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='font-[500]'>Total Assignees:</p>
                            {/* coordinators */}
                            <p>{allAttendanceSummary?.coordinators?.length}</p>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='font-[500]'>Days:</p>
                            <div className='flex items-center gap-2'>
                                {allAttendanceSummary?.days?.map(day => (
                                    <p className='capitalize'>{day}</p>
                                ))}
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <p className='font-[500]'>Avg. Duration:</p>
                            <p>{ allAttendanceSummary?.durations && allAttendanceSummary?.durations?.reduce((total, num) => total + num, 0) / allAttendanceSummary?.durations?.length}</p>
                        </div>
                    </div>
                    {/* <div className='flex items-center gap-3 border max-w-[500px] py-2 px-2 rounded-full'>
                        <CiSearch className='text-primary-color text-[20px]'/>
                        <input type="text" placeholder='Search by remark, location, scaned date and scaned time' className='w-full outline-none text-[13px]' onChange={(e) => setSearchText(e.target.value)} />
                    </div> */}
                    <div className='mt-[5rem]'>
                        <p className='font-[600]'>Staffs Attendance Records</p>
                        <table class="w-full text-sm text-left rtl:text-left mt-3">
                            <thead class="text-[12px] border-b">
                                <tr>
                                    <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Attendance Type</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                                    {/* <th scope="col" class="px-6 py-3 font-[700]">Role</th> */}
                                    <th scope="col" class="px-6 py-3 font-[700]">Remark</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Scan Time</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Scan Date</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Scan Coordinate</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Alloted Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                allAttendanceSummary && allAttendanceSummary?.staffsAttendanceRecords?.length < 1 && <p className='mt-5'>No Record Found For Staffs</p>
                            }
                            {
                                allAttendanceSummary && allAttendanceSummary?.staffsAttendanceRecords?.filter((item) => {
                                    if (searchText === "") return item
                                    else if (item?.remark.toLowerCase().includes(searchText.toLowerCase())
                                            || item?.classScheduleId?.location?.lat.includes(searchText)
                                            || item?.classScheduleId?.location?.long.includes(searchText)
                                            || item?.scanned_time.toString().includes(searchText)
                                            || new Date(item?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).includes(searchText)
                                        ) return item
                                }).map((item, index) => {
                                    const formatTime = (time) => {
                                        const timeStr = String(time).padStart(4, '0'); // Convert time to a string
                                        return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
                                    };

                                    return (
                                        <tr className={item?.flag.toString() !== false ? `text-[#19201D] bg-[#865C1D66]` : `text-[#19201D]`} key={index}>
                                            <td className='px-6  py-3'>{index + 1}</td>
                                            <td className='px-6 py-3'>{item?.attendanceType}</td>
                                            <td className='px-6 py-3'>{item?.user?.fullName}</td>
                                            <td className='px-6 py-3 capitalize'>{item?.remark}</td>
                                            <td className='px-6 py-3'>{formatTime(item?.scanned_time)}</td>
                                            <td className='px-6 py-3'>{new Date(item?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                            <td className={item?.isValid.toString() !== false ? `text-[#156140] px-6 py-3` : `text-[#c11a1a] px-6 py-3`}>{item?.location.lat}, {item?.location.long}</td>
                                            <td className='px-6 py-3'>{item?.classScheduleId?.endTime - item?.classScheduleId?.startTime}mins</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-[6rem]'>
                        <p className='font-[600]'>Students Attendance Records</p>
                        {
                            allAttendanceSummary && allAttendanceSummary?.studentsAttendanceRecords?.length < 1 && <p className='text-center mt-6'>No Record Found For Students</p>
                        }
                        <table class="w-full text-sm text-left rtl:text-left mt-3">
                            <thead class="text-[12px] border-b">
                                <tr>
                                    <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Attendance Type</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                                    {/* <th scope="col" class="px-6 py-3 font-[700]">Role</th> */}
                                    <th scope="col" class="px-6 py-3 font-[700]">Remark</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Scan Time</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Scan Date</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Scan Coordinate</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Alloted Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                allAttendanceSummary && allAttendanceSummary?.studentsAttendanceRecords?.filter((item) => {
                                    if (searchText === "") return item
                                    else if (item?.remark.toLowerCase().includes(searchText.toLowerCase())
                                            || item?.classScheduleId?.location?.lat.includes(searchText)
                                            || item?.classScheduleId?.location?.long.includes(searchText)
                                            || item?.scanned_time.toString().includes(searchText)
                                            || new Date(item?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).includes(searchText)
                                        ) return item
                                }).map((item, index) => {
                                    const formatTime = (time) => {
                                        const timeStr = String(time).padStart(4, '0'); // Convert time to a string
                                        return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
                                    };

                                    return (
                                        <tr className={item?.flag !== false.toString() ? `text-[#19201D] bg-[#865C1D66]` : `text-[#19201D]`} key={index}>
                                            <td className='px-6  py-3'>{index + 1}</td>
                                            <td className='px-6 py-3'>{item?.attendanceType}</td>
                                            <td className='px-6 py-3'>{item?.user?.fullName}</td>
                                            <td className='px-6 py-3 capitalize'>{item?.remark}</td>
                                            <td className='px-6 py-3'>{formatTime(item?.scanned_time)}</td>
                                            <td className='px-6 py-3'>{new Date(item?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                            <td className={item?.isValid.toString() !== false ? `text-[#156140] px-6 py-3` : `text-[#c11a1a] px-6 py-3`}>{item?.location.lat}, {item?.location.long}</td>
                                            <td className='px-6 py-3'>{item?.classScheduleId?.endTime - item?.classScheduleId?.startTime}mins</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
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

export default Summary