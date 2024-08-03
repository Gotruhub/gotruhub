import React, { useEffect, useState } from 'react';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import { RxDotsVertical } from "react-icons/rx";
import { HiMiniQrCode } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { LuEye } from 'react-icons/lu';
import Alert from '../../components/alert/Alert';
import { BiEdit } from 'react-icons/bi';


const TimeTable = ({ baseUrl }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [allSchedules, setAllSchedules] = useState([]);
    const [msg, setMsg] = useState('');
    const [alertType, setAlertType] = useState();
    const { id } = useParams();
    const [editSchedule, setEditSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteSchedule, setDeleteSchedule] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    async function getAllSchedules() {
        console.log(`${baseUrl}/schedule/${id}`);
        const res = await fetch(`${baseUrl}/schedule/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.data.access_token}`
            }
        });
        const data = await res.json();
        console.log(data.data);
        if (!res.ok) {
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if (res.ok) {
            setAllSchedules(data.data);
            setAlertType('success');
            return;
        }
    }

    const groupByDay = (data) => {
        return data.reduce((acc, curr) => {
            if (!acc[curr.day]) {
                acc[curr.day] = [];
            }
            acc[curr.day].push(curr);
            return acc;
        }, {});
    };

    const groupedData = groupByDay(allSchedules);

    useEffect(() => {
        getAllSchedules();
    }, []);

    async function shceduleInfo() {
        // Implement schedule info logic here
    }

    async function deleleteScheduleFn(schedule) {
        setLoading(true);
        const res = await fetch(`${baseUrl}/schedule/single/${schedule._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.data.access_token}`
            }
        });
        // const data = await res.json();
        if (res.ok) {
            setAllSchedules(allSchedules.filter((item) => item._id!== schedule._id));
            setMsg("Schedule Deleted Successfully");
            setDeleteSchedule(null);
            setAlertType('success');
            setLoading(false);
            return;
        }
        setMsg("An error occured");
        setAlertType('error');
        setLoading(false);
    }

    return (
        <div>
            <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="w-full lg:w-[78%] ml-auto pb-5">
                <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
                <div className="">
                    <div className="flex justify-between items-center mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Time Table</p>
                        </div>
                        <div className='flex items-center gap-5'>
                            <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-schedule/${id}`)}>Schedule assignment</button>
                        </div>
                    </div>
                    <div className='px-[10px] lg:px-[30px]'>
                        <div className='flex items-center justify-between pb-3'>
                            <p className='text-[#19201D] text-[18px] font-[600] mb-5'>Time Table</p>
                            <p className='text-[#828282] text-[18px] font-[600]'>Total Assignments - {allSchedules?.length}</p>
                        </div>
                        {
                            allSchedules.length < 1 &&
                            <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                                <p>No Schedules to display.</p>
                            </div>
                        }
                        <div className="mx-auto bg-white rounded-xl space-y-4">
                            {Object.keys(groupedData).map((day) => (
                                <div key={day} className='border-b pb-2'>
                                    <h3 className="text-lg font-semibold">{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                                    <ul className="gap-6 mt-2 flex">
                                        {groupedData[day].map((course) => (
                                            <div key={course._id} className='flex items-center gap-1 relative'>
                                                <li className="mt-1">
                                                    {course.code.toUpperCase()}
                                                </li>
                                                <RxDotsVertical className='cursor-pointer' onClick={() => setEditSchedule(course)} />
                                                {
                                                    editSchedule && editSchedule._id === course._id &&
                                                    <div className='bg-white w-[200px] text-[14px] pb-3 px-3 py-1 rounded absolute z-[99] border'>
                                                        <p className='text-end text-[20px] cursor-pointer' onClick={() => setEditSchedule(null)}>&times;</p>
                                                        <div onClick={() => navigate(`/class-schedule-info/${editSchedule._id}`)} className='flex items-center cursor-pointer gap-1'>
                                                            <HiMiniQrCode />
                                                            <p>Barcode</p>
                                                        </div>
                                                        <div className='flex items-center cursor-pointer gap-1 mt-2' onClick={() => setDeleteSchedule(editSchedule)}>
                                                            <HiOutlineTrash />
                                                            <p>Delete Entry</p>
                                                        </div>
                                                        <div className='flex items-center cursor-pointer gap-1 mt-2' onClick={() => navigate(`/attendance-summary/${editSchedule._id}`)}>
                                                            <LuEye />
                                                            <p>View Attendance</p>
                                                        </div>
                                                        <div className='flex items-center cursor-pointer gap-1 mt-2' onClick={() => navigate(`/edit-schedule/${id}/${editSchedule._id}`)}>
                                                            <BiEdit />
                                                            <p>Edit Schedule</p>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </ul>
                                    {
                                        deleteSchedule &&
                                        <div>
                                            <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteSchedule(false)}></div>
                                            <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                                                <div className="flex items-center justify-between border-b pb-[5px]">
                                                    <p className="text-[px]">Delete Schedule</p>
                                                    <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteSchedule(false)}/>
                                                </div>
                                                <div className='mt-5'>
                                                    Are you sure, you want to delete this schedule?
                                                    {/* {deleteSchedule?._id} */}
                                                </div>
                                                {
                                                    loading ? 
                                                    <BtnLoader bgColor="#191f1c"/>
                                                    :
                                                    <button onClick={() => deleleteScheduleFn(deleteSchedule)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {
                msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
            }
        </div>
    );
};

export default TimeTable;
