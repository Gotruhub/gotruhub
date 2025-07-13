import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import { LuListTodo } from 'react-icons/lu'

// Ring Chart Component
const AttendanceRing = ({ title, total, earlyPercentage, latePercentage, absentPercentage }) => {
  // Calculate the stroke-dasharray and stroke-dashoffset for each segment
  const calculateSegments = () => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    
    // Convert percentages to arc lengths
    const earlyLength = (earlyPercentage / 100) * circumference;
    const lateLength = (latePercentage / 100) * circumference;
    const absentLength = (absentPercentage / 100) * circumference;
    
    return {
      circumference,
      earlySegment: {
        length: earlyLength,
        offset: 0
      },
      lateSegment: {
        length: lateLength,
        offset: earlyLength
      },
      absentSegment: {
        length: absentLength,
        offset: earlyLength + lateLength
      }
    };
  };

  const segments = calculateSegments();

  return (
    <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md flex-1 mx-2">
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold">{title}</div>
        
        {/* Ring Chart */}
        <div className="relative w-32 h-32 my-2">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Early - Green Segment */}
            {earlyPercentage > 0 && (
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#4ade80"
                strokeWidth="20"
                strokeDasharray={`${segments.earlySegment.length} ${segments.circumference - segments.earlySegment.length}`}
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
              />
            )}
            
            {/* Late - Yellow/Gold Segment */}
            {latePercentage > 0 && (
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#eab308"
                strokeWidth="20"
                strokeDasharray={`${segments.lateSegment.length} ${segments.circumference - segments.lateSegment.length}`}
                strokeDashoffset={`-${segments.lateSegment.offset}`}
                transform="rotate(-90 100 100)"
              />
            )}
            
            {/* Absent - Red Segment */}
            {absentPercentage > 0 && (
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#ef4444"
                strokeWidth="20"
                strokeDasharray={`${segments.absentSegment.length} ${segments.circumference - segments.absentSegment.length}`}
                strokeDashoffset={`-${segments.absentSegment.offset}`}
                transform="rotate(-90 100 100)"
              />
            )}
            
            {/* Center Text */}
            <text
              x="100"
              y="80"
              textAnchor="middle"
              fontSize="16"
              fill="white"
            >
              Days
            </text>
            <text
              x="100"
              y="120"
              textAnchor="middle"
              fontSize="40"
              fontWeight="bold"
              fill="white"
            >
              {total}
            </text>
          </svg>
        </div>

        <div className="w-full flex justify-between text-sm">
          <div className="flex flex-col items-center">
            <div className="bg-green-500 h-2 w-2 rounded-full mb-1"></div>
            <div>Early</div>
            <div>{earlyPercentage?.toFixed(0)}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 h-2 w-2 rounded-full mb-1"></div>
            <div>Late</div>
            <div>{latePercentage?.toFixed(0)}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-500 h-2 w-2 rounded-full mb-1"></div>
            <div>Absent</div>
            <div>{absentPercentage?.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewSubUnit = ({baseUrl}) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [subUnitCourses, setSubUnitCourses] = useState('')
    const [toggleNav, setToggleNav] = useState(false)
    const [subUnitInfo, setSubUnitInfo] = useState()
    const [subUnitStats, setSubUnitStats] = useState()
    const [staff, setStaff] = useState()
    const [members, setMembers] = useState([])
    const [attendanceSummary, setAttendanceSummary] = useState()

    const [assigneesSummary, setAssigneesSummary] = useState({
        // total: 32,
        earlyPercentage: 70,
        latePercentage: 20,
        absentPercentage: 10
    })

    async function getAttendanceSummary(){
        const res = await fetch(`${baseUrl}/my-orgnz-summary/subunit-summary/${id}`,{
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
            console.log(data.data);
            
            setAttendanceSummary(data.data.attendanceSummary);
            setAlertType('success');
            return;
        }
    }

    async function getSubUnitInfo(){
        const res = await fetch(`${baseUrl}/subunits/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.unit, data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setSubUnitInfo(data?.data?.unit)
            getSubUnitCourses(data?.data?.unit?._id)
            getAllStaff(data?.data?.unit.coordinator)
            setAlertType('success');
            return;
        }
    }

    async function getSubUnitStats(){
        const res = await fetch(`${baseUrl}/my-orgnz-summary/subunit-summary/${id}`,{
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
            setSubUnitStats(data?.data)
            return;
        }
    }

    async function getSubUnitCourses(){
        console.log(`${baseUrl}/sub-unit/course/paid/${id}`);
        
        const res = await fetch(`${baseUrl}/sub-unit/course/paid/${id}`,{
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
            setSubUnitCourses(data?.data)
            return;
        }
    }

    async function getAllMembers(){
        console.log(`${baseUrl}/sub-unit/course/paid/${id}`);
        
        const res = await fetch(`${baseUrl}/users/get-users/student?role=student&page=2&subunit=${id}`,{
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
            setMembers(data?.data?.users)
            return;
        }
    }

    async function getAllStaff(staffId){
        const res = await fetch(`${baseUrl}/users/get-user/${staffId}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.user);
        setStaff(data.data.user)
    }

    useEffect(() => {
        getAllMembers()
        getSubUnitInfo()
        getSubUnitStats()
        getAttendanceSummary()
    },[])


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-center mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">About {subUnitInfo?.name}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className='font-[600] text-[#25751E] text-[14px]' onClick={() => navigate(`/co-ordinator/${id}`)} >Coordinator</button> */}
                        {/* <button className="border border-[#2D3934] text-[#19201D] font-[600] px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/sub-unit-assignment-create/${id}`)} >Add assignment</button> */}
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/time-table/${id}`)} >Timetable</button>
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => setEditUnit(true)}/>
                        <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer" onClick={() => setDeleteUnit(true)}/>
                    </div> */}
                </div>

                <div className="lg:m-[30px] m-[10px] p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-[3rem]">
                    <div className="p-4 rounded-lg flex-1 w-full sm:w-1/2">
                        <div className="mb-2 flex items-center justify-between">
                            <div>Created</div>
                            <div className="font-bold">{new Date(subUnitInfo?.createdAt).toDateString()}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Last updated</div>
                            <div className="font-bold">{new Date(subUnitInfo?.updatedAt).toDateString()}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Assignments</div>
                            <div className="font-bold">{subUnitStats?.totalAssignments}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Assignees</div>
                            <div className="font-bold">1</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Members</div>
                            <div className="font-bold">{subUnitStats?.totalStudents}</div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full sm:w-1/2 gap-5 sm:gap-0">
                        {/* Members Ring Chart */}

                        <AttendanceRing
                            title="Members"
                            total={attendanceSummary?.totalDays || 0}
                            earlyPercentage={attendanceSummary?.members?.early || 0}
                            latePercentage={attendanceSummary?.members?.late || 0}
                            absentPercentage={attendanceSummary?.members?.absent || 0}
                        />
                        
                        <AttendanceRing 
                            title="Assignees"
                            total={attendanceSummary?.totalDays || 0}
                            earlyPercentage={attendanceSummary?.assignees?.early || 0}
                            latePercentage={attendanceSummary?.assignees?.late || 0}
                            absentPercentage={attendanceSummary?.assignees?.absent || 0}
                        />
                    </div>
                </div>

                <div className="lg:m-[30px] m-[10px] p-4">
                    <p className='text-[20px] mb-4 font-[500]'>Staff</p>
                    <div className="p-4 rounded-lg shadow-md flex items-center justify-between">
                        <div className='flex items-center gap-[1rem] flex-col md:flex-row'>
                            <div className='h-[70px] w-[70px] rounded-full'>
                                <img className='rounded-full w-full h-full object-cover' src={staff?.profileImage?.file} alt="" />
                            </div>
                            <p className='text-[20px] font-[500]'>{staff?.fullName}</p>
                        </div>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/staff/${staff._id}`)} >More Info</button>
                    </div>
                </div>

                <div class="relative overflow-x-auto lg:m-[30px] m-[10px]">
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2 text-[18px] mb-5'>
                            <LuListTodo />
                            <p className='text-[#1D1D1D] font-[600]'>List of Assignments</p>
                        </div>
                        <p className='text-[#828282] font-[600]'>Total - {subUnitCourses?.length}</p>
                    </div>
                    <table class="w-full text-sm text-left rtl:text-left text-[#1D1D1D]">
                        <thead class="text-[14px] border-b">
                            <tr>
                                <th scope="col" class="py-3 th1 font-[700]">S/N</th>
                                <th scope="col" class="py-3 font-[700]">Assignment Name</th>
                                <th scope="col" class="py-3 font-[700]">Assignment Code</th>
                                <th scope="col" class="py-3 font-[700]">Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subUnitCourses && subUnitCourses?.map((item, index) => {

                                    return (
                                        <tr className='relative'>
                                            <td className='py-3'>{index + 1}</td>
                                            <td>{item?.course?.name}</td>
                                            <td>{item?.course?.courseCode}</td>
                                            <td>{ new Date(item?.createdAt).toDateString() }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div class="relative overflow-x-auto lg:mx-[30px] lg:mb-[30px] mx-[10px] mb-[10px] mt-[6rem]">
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2 text-[18px] mb-5'>
                            <LuListTodo />
                            <p className='text-[#1D1D1D] font-[600]'>List of Members</p>
                        </div>
                        <p className='text-[#828282] font-[600]'>Total - {members?.length}</p>
                    </div>
                    <table class="w-full text-sm text-left rtl:text-left text-[#1D1D1D]">
                        <thead class="text-[14px] border-b">
                            <tr>
                                <th scope="col" class="py-3 th1 font-[700]">S/N</th>
                                <th scope="col" class="py-3 font-[700]">Full Name</th>
                                {/* <th scope="col" class="py-3 font-[700]">Assignment Name</th>
                                <th scope="col" class="py-3 font-[700]">Date Added</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members && members?.map((member, index) => {

                                    return (
                                        <tr className='relative'>
                                            <td className='py-3'>{index + 1}</td>
                                            <td>{member?.fullName}</td>
                                            {/* <td>{item?.course?.courseCode}</td>
                                            <td>{ new Date(item?.createdAt).toDateString() }</td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* <div className='px-[30px]'>
                    <p className='text-[#19201D] text-[18px] font-[600] mb-3'>All Sub-units</p>
                    {
                        allSubUnits.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>Create new sessions before updating members' units to ensure session data is accurately collated using units and their members.</p>
                        </div>
                    }
                    {
                        allSubUnits && allSubUnits.map((subUnit) => (
                            <div className='flex items-center justify-between p-3 shadow rounded-[8px] my-4 bg-white'>
                                <p>{subUnit.name}</p>
                                <div className='flex items-center gap-2'>
                                    <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => {
                                        setEditSubUnit(subUnit._id)
                                        setSubUnitName(subUnit.name)
                                    }} />
                                    <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer" onClick={() => setDeleteSubUnit(subUnit._id)} />
                                </div>
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

export default ViewSubUnit