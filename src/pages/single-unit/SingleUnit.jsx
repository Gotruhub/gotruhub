import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { BiCloset, BiTrash } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'

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

const SingleUnit = ({baseUrl}) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allSubUnits, setAllSubUnits] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [unitName, setUnitName] = useState('')
    const [loading, setLoading] = useState(false)
    const [subUnitId, setSubUnitId] = useState()

    const [subUnitName, setSubUnitName] = useState()

    const [editUnit, setEditUnit] = useState(false)
    const [deleteUnit, setDeleteUnit] = useState(false)

    const [editSubUnit, setEditSubUnit] = useState(false)
    const [deleteSubUnit, setDeleteSubUnit] = useState(false)

    // const [attendanceSummary, setAttendanceSummary] = useState({
    //     totalStudents: 0,
    //     earlyPercentage: 0,
    //     latePercentage: 0,
    //     absentPercentage: 0
    // })
    
    const [attendanceSummary, setAttendanceSummary] = useState()
    const [unitSummary, setUnitSummary] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    async function getUnitInfo(){
        const res = await fetch(`${baseUrl}/unit/${id}/subunits`,{
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
            setUnitName(data?.data?.units[0]?.unit?.name)
            
            setAlertType('success');
            return;
        }
    }

    async function getUnitSummary(){
        const res = await fetch(`${baseUrl}/my-orgnz-summary/unit/${id}`,{
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
            setUnitSummary(data.data)
            setAlertType('success');
            return;
        }
    }

    async function getSubUnitInfo(){
        const res = await fetch(`${baseUrl}/my-orgnz-summary/unit/${id}/subunit-summary`,{
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
            setAllSubUnits(data.data);
            setAlertType('success');
            return;
        }
    }

    async function getAttendanceSummary(){
        const res = await fetch(`${baseUrl}/my-orgnz-summary/unit/${id}/attendance-summary`,{
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

    async function deleteUnitFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/units/${id}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res) setLoading(false)
        if(res.ok){
            navigate('/units')
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
    }

    async function updateUnitFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/units/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.data.access_token}`
            },
            body: JSON.stringify({name: unitName})
        })
        const data = await res.json()
        if(res) {
            setLoading(false)
            setEditUnit(false)
        }
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

    async function deleteSubUnitFn(subUnitId){
        setLoading(true)
        const res = await fetch(`${baseUrl}/subunits/${subUnitId}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res) setLoading(false)
        if(res.ok){
            getUnitInfo()
            setDeleteSubUnit(false)
            setMsg("Sub unit deleted successfully");
            setAlertType('success');
            return;
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
    }

    async function updateSubUnitFn(subUnitId){
        console.log(subUnitId);
        setLoading(true)
        const res = await fetch(`${baseUrl}/units/${subUnitId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.data.access_token}`
            },
            body: JSON.stringify({name: subUnitName})
        })
        const data = await res.json()
        if(res) {
            setLoading(false)
            setEditSubUnit(false)
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            getUnitInfo()
            setMsg(data.message);
            setAlertType('success');
            return;
        }
    }

    useEffect(() => {
        getUnitInfo()
        getSubUnitInfo()
        getAttendanceSummary()
        getUnitSummary()
    },[])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between md:items-center flex-col gap-3 md:flex-row mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">About {unitName}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="border border-[#2D3934] text-[#19201D] font-[600] px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/unit-assignment-create/${id}`)} >Add assignment</button>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/add-sub-unit/${id}`)} >Add sub-unit</button>
                    </div>
                </div>

                <div className="lg:m-[30px] m-[10px] p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-[3rem]">
                    <div className="p-4 rounded-lg flex-1 mr-4 w-full sm:w-1/2">
                        <div className="mb-2 flex items-center justify-between">
                            <div>Sub-units</div>
                            <div className="font-bold">{unitSummary?.totalSubUnits}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Assignments</div>
                            <div className="font-bold">{unitSummary?.totalAssignments}</div>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <div>Members</div>
                            <div className="font-bold">{unitSummary?.totalStudents}</div>
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

                <div className="relative overflow-x-auto mx-5 mt-10">
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2 text-[18px]'>
                            <LuListTodo />
                            <p className='text-[#1D1D1D] font-[600]'>List of Sub-units</p>
                        </div>
                        <p className='text-[#828282] font-[600]'>Total - {allSubUnits?.length}</p>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-left text-[#1D1D1D]">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="py-3 th1 font-[700]">S/N</th>
                                <th scope="col" className="py-3 font-[700]">Sub-unit</th>
                                <th scope="col" className="py-3 font-[700]">Assignments</th>
                                <th scope="col" className="py-3 font-[700]">Members</th>
                                <th scope="col" className="py-3 font-[700]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allSubUnits && allSubUnits?.map((item, index) => {
                                    return (
                                        <tr className='relative' key={item.id}>
                                            <td className='py-3'>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.totalAssignments}</td>
                                            <td>{item?.totalStudents}</td>
                                            <td> <BsThreeDotsVertical className="cursor-pointer" onClick={() => 
                                                {
                                                    setSubUnitId(item.id)
                                                    console.log(item.id);
                                                }}/> </td>

                                            {subUnitId === item.id &&
                                                <div className='z-[1] absolute right-[110px] w-[200px] top-0 py-3 bg-white border rounded-[10px]'>
                                                    <div className='my-2 mr-4 flex justify-end'>
                                                        <MdOutlineClose className='text-lg cursor-pointer mt-[-5px]' onClick={() => setSubUnitId('')} />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <div onClick={() => navigate(`/view-sub-unit/${item.id}`)} className='flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-[#F2FCF7]'>
                                                            <BsEye />
                                                            <p>View sub-unit</p>
                                                        </div>
                                                        <div onClick={() => setDeleteSubUnit(item.id)} className='flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-[#F2FCF7]'>
                                                            <BiTrash />
                                                            <p>Delete sub-unit</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {
            editUnit &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditUnit(false)}></div>
                <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Edit Unit</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditUnit(false)}/>
                    </div>
                    <div className='mt-5'>
                        <p>Unit Name</p>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
                            <input type="text" value={unitName} onChange={e => setUnitName(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={updateUnitFn} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Unit Name</button>
                    }
                </div>
            </div>
        }

        {
            deleteUnit &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteUnit(false)}></div>
                <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Unit</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteUnit(false)}/>
                    </div>
                    <div className='mt-5'>
                        Are you sure, you want to delete this unit?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={deleteUnitFn} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }

        {
            editSubUnit &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditSubUnit(false)}></div>
                <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Edit Unit</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditSubUnit(false)}/>
                    </div>
                    <div className='mt-5'>
                        <p>Sub Unit Name</p>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
                            <input type="text" value={subUnitName} onChange={e => setSubUnitName(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => updateSubUnitFn(editSubUnit)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Sub Unit Name</button>
                    }
                </div>
            </div>
        }

        {
            deleteSubUnit &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteSubUnit(false)}></div>
                <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Unit</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteSubUnit(false)}/>
                    </div>
                    <div className='mt-5'>
                        Are you sure, you want to delete this sub unit?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteSubUnitFn(deleteSubUnit)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }

        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
        
    </div>
  )
}

export default SingleUnit