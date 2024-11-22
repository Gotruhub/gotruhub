import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const MemberProfile = ({baseUrl}) => {

    const [toggleNav, setToggleNav] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [loading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [memberInfo, setMemberInfo] = useState()
    const [chartData, setChartData] = useState()
    const { id } = useParams()

    async function getMember() {
        console.log(`${baseUrl}/users/get-user/${id}`);
        
        setIsLoading(true)
        try {
            const response = await fetch(`${baseUrl}/users/get-user/${id}`,{
                headers:{
                    Authorization:`Bearer ${user.data.access_token}`
                }
            })
            const data = await response.json()
            console.log(response, data);
            
            if(data.success){
                setMemberInfo(data.data)
                // setAlertType('success')
                // localStorage.setItem('member', JSON.stringify(data.data))
            } else {
                setMsg(data.message)
                setAlertType('error')
            }
        } catch (error) {
            setMsg('An error occurred while fetching member data.')
            setAlertType('error')
        }
        setIsLoading(false)
    }

    async function getMemberAttendanceSummary() {
        const res = await fetch(`${baseUrl}/attendance-summary/669d0ed4b147f834be933c67/66ad4c9ead67f20eee6ee2a3`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()

        // Predefined colors for the graph
        const colors = ['#FFBB28', '#FF8042', '#00C49F', '#0088FE'];

        setChartData(data.data.map((item, index) => ({
            name: item.courseName.trim(), // Use courseName for name
            value: item.attendedSessions, // (attendanceRate is the correct value to use, attendedSessions is for testing purposes)
            color: colors[index % colors.length], // Assign colors in a loop
        })));

        // setChartData(data.data)
        console.log(chartData);
    }

    useEffect(() => {
        getMemberAttendanceSummary()
        getMember()
    },[])

  return (
    <div className='h-[100vh]'>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[24px] lg:text-[28px] text-primary-color font-[600]">Member profile</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]">Print Summary</button>
                    </div>
                </div>
                <div className='shadow-md rounded-[6px] flex gap-7 p-[20px] mb-10 w-full justify-between flex-col sm:flex-row'>
                    <div className='flex items-start justify-between w-full'>
                        <div>
                            <img src={memberInfo?.user?.profileImage?.file} className='w-[200px] rounded-[6px]' alt="Member Image" />
                            <p>{memberInfo?.user?.fullName}</p>
                            <p>{memberInfo?.user?.role}</p>
                            <p>{memberInfo?.user?.subUnit?.name}</p>
                        </div>
                        <div>
                            <img src={memberInfo?.user?.passQrcode} className='w-[200px] rounded-[6px]' alt="Passcode Image" />
                            <p>{memberInfo?.user?.fullName}</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-[100%] p-[20px]'>
                            <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Assignment Strength</p>
                            <div className='w-full flex gap-10'>
                                <PieChart width={220} height={220}>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={90}
                                        outerRadius={110}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        >
                                        {chartData?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                                <div>
                                    {
                                        chartData?.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-2'>
                                                    <div>
                                                        <p className={`p-2 rounded-full bg-[${item.color}]`}></p>
                                                    </div>
                                                    <p>{item.name}</p>
                                                    <p className='ml-5 text-gray-500'>{item.value}%</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='flex items-center gap-5 w-[500px] mx-auto'>
                    <input onChange={e => setId(e.target.value)} type="text" className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter user Id' />
                    {
                        loading ?
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]">
                            <img src="./images/loader.gif" className='w-[30px] mx-auto' alt="" />
                        </button>
                        :
                        <button onClick={searchId} className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]">Search</button>
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

export default MemberProfile