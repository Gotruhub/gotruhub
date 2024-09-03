import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { FiInfo } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';

const EditSemester = ({ baseUrl }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [selectedSessionType, setSelectedSessionType] = useState('');
    const [sessionTypeDropDown, setSessionTypeDropDown] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sessionType, setSessionType] = useState('');
    const [toggleNav, setToggleNav] = useState(false);

    const sessionTypesArray = [
        { name: 'HS', value: 'High School' },
        { name: 'UN', value: 'University' },
        { name: 'OT', value: 'Other' }
    ];

    useEffect(() => {
        const getSemesterInfo = async () => {
            try {
                const res = await fetch(`${baseUrl}/term/single/${id}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${user.data.access_token}` }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setName(data.data.name);
                setSessionType(data.data.sessionType);
                setStartDate(formatDate(data.data.startDate));
                setEndDate(formatDate(data.data.endDate));
                setAlertType('success');
            } catch (error) {
                setMsg(error.message);
                setAlertType('error');
            }
        };
        getSemesterInfo();
    }, [baseUrl, id, user.data.access_token]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const updateSemester = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/term/single/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.data.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    startDate,
                    endDate,
                    sessionType,
                    // sessionId: session
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setMsg('Semester updated successfully');
            setAlertType('success');
        } catch (error) {
            setMsg(error.message);
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleSessionTypeSelect = (type) => {
        setSelectedSessionType(type.value);
        setSessionTypeDropDown(false);
        setSessionType(type.name);
    };

    return (
        <div>
            <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
            <div className="w-full lg:w-[78%] ml-auto pb-5">
                <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl} />
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/calendar')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Update Semester</p>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center gap-5 px-5 max-w-[500px] mx-auto">
                    <div className='text-[#865C1D] flex items-center gap-2'>
                        <FiInfo className='text-[30px]' />
                        <p className='text-[14px]'>Creating a new semester collects new data on members and closes update on the previous semester</p>
                    </div>
                    <div className='w-full flex flex-col gap-7'>
                        <div>
                            <p className='text-[#19201D] font-[450] mb-1'>Semester Name or Term Name </p>
                            <input
                                value={name}
                                type="text"
                                onChange={e => setName(e.target.value)}
                                placeholder='First Term'
                                className='w-full border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26] outline-none'
                            />
                        </div>
                        <div className='relative'>
                            <p>Session Type</p>
                            <div className='flex items-center justify-between border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>
                                <p>{selectedSessionType ? selectedSessionType : sessionType}</p>
                                <IoChevronDownOutline className='cursor-pointer' onClick={() => setSessionTypeDropDown(!sessionTypeDropDown)} />
                            </div>
                            {sessionTypeDropDown && (
                                <div className='absolute top-[80px] border rounded-[5px] bg-white w-full h-[120px] overflow-y-scroll'>
                                    {sessionTypesArray?.map(type => (
                                        <p
                                            key={type.name}
                                            className='cursor-pointer hover:bg-gray-300 p-2'
                                            onClick={() => handleSessionTypeSelect(type)}
                                        >
                                            {type.value}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className='text-[#19201D] font-[450] mb-1'>Start Date</p>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className='w-full border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26] outline-none'
                            />
                        </div>
                        <div>
                            <p className='text-[#19201D] font-[450] mb-1'>End Date</p>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className='w-full border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26] outline-none'
                            />
                            <p className='mt-1 text-[#865C1D] text-[14px]'>This should not be above 4 months</p>
                        </div>
                    </div>
                    {loading ? (
                        <BtnLoader bgColor="#191f1c" />
                    ) : (
                        <button
                            onClick={updateSemester}
                            className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'
                        >
                            Update Semester
                        </button>
                    )}
                </div>
            </div>
            {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
        </div>
    );
};

export default EditSemester;
