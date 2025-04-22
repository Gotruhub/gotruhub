import React, { useEffect, useState } from 'react'
import GuardianCard from '../guardian-card/GuardianCard'
import MemberCard from '../member-card/MemberCard'
import WalletCard from '../wallet-card/WalletCard'
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { IoChevronDownOutline } from 'react-icons/io5';

const SummaryBar = ({ label, percentage, color }) => (
    <div className="flex items-center mb-2 w-full">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="ml-2 text-[13px]">{percentage}%</span>
    </div>
);

const MemberProfile = ({baseUrl, currentUser, id, passSummary, walletSummary}) => {

    // Imported this component from Single User
    const [dropDown, setDropDown] = useState()
    const [session, setSession] = useState()
    const [allSessions, setAllSessions] = useState([])
    const [allTerms, setAllTerms] = useState([])
    const [term, setTerm] = useState()
    const [chartData, setChartData] = useState([])
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    async function getMemberAttendanceSummary() {
        console.log(`${baseUrl}/attendance-summary/${user.data.details._id}/${term._id}`);
        setLoading(true)
        const res = await fetch(`${baseUrl}/attendance-summary/${user.data.details._id}/${term._id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        if(res) setLoading(false)

        console.log(res, data);
        

        // Predefined colors for the graph
        const colors = ['#FFBB28', '#FF8042', '#00C49F', '#0088FE'];

        setChartData(data.data.map((item, index) => ({
            name: item.courseName.trim(), // Use courseName for name
            value: item.attendedSessions, // (attendanceRate is the correct value to use, attendedSessions is for testing purposes)
            color: colors[index % colors.length], // Assign colors in a loop
        })));

        setChartData(data.data)
    }

    async function getAllSessions(){
        const res = await fetch(`${baseUrl}/session`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setAllSessions(data.data)
    }

    async function getTerms(id){
        const res = await fetch(`${baseUrl}/term/${id}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setAllTerms(data.data)
    }

    useEffect(() => {
        getAllSessions()
        getMemberAttendanceSummary()
    },[])

    const settings = {
        speed: 500,
        slidesToShow: 2.03,
        slidesToScroll: 1,
      };

      const signInData = passSummary?.signin?.map((item, index) => (
        <SummaryBar
          key={index}
          label={item.authorizationType}
          percentage={item.percentage}
          color={getColor(item.authorizationType)}
        />
      ));
    
      const signOutData = passSummary?.signout?.map((item, index) => (
        <SummaryBar
          key={index}
          label={item.authorizationType}
          percentage={item.percentage.toFixed(2)}
          color={getColor(item.authorizationType)}
        />
      ));

      function getColor(type) {
        switch (type) {
          case 'admin':
            return 'bg-[#2E8B57]';
          case 'guardian':
            return 'bg-[#FF6F61]';
          case 'other':
            return 'bg-[#FFDB58]';
          case 'Signature':
            return 'bg-[#967BB6]';
          default:
            return 'bg-gray-500';
        }
      }


    const navigate = useNavigate()

    // console.log();
  return (
    <div className='flex items-start flex-col lg:flex-row gap-10 px-[30px] py-[1rem]'>
        <div className='w-full'>
            <div className='shadow-md rounded-[6px] flex items-center gap-7 p-[20px] mb-10 w-full justify-between flex-col sm:flex-row'>
                <img src={currentUser?.user?.profileImage?.file ? currentUser?.user?.profileImage?.file : './images/user.svg'} className='w-[200px] rounded-[6px]' alt="Member Image" />
                <img src={currentUser?.user?.passQrcode} className='w-[200px] rounded-[6px]' alt="Passcode Image" />
            </div>
            <MemberCard currentUser={currentUser} id={id}/>
            <GuardianCard currentUser={currentUser} id={id}/>
            <div className='shadow-md rounded-[6px] p-[20px] mt-10'>
                <div className='flex items-center justify-between mb-3'>
                    <p className='text-[#19201D] font-[600] txt-[18px]'>Authorized persons</p>
                    <img src="./images/edit.svg" alt="" onClick={() => navigate(`/update-authorized-images/${id}`)} className='cursor-pointer' />
                </div>
                <div className='flex items-center gap-7 flex-col sm:flex-row'>
                    <img src={currentUser?.user?.guardians?.relationImage?.file} className='w-[200px] h-[200px] object-cover rounded-[6px]' alt="Relation image" />
                    <img src={currentUser?.user?.guardians?.signature?.file} className='w-[200px] h-[200px] object-cover rounded-[6px]' alt="Image of signature" />
                </div>
            </div>
        </div>
        <div className='lg:w-[50%] w-full'>
            <div className='shadow-md rounded-[6px] p-[20px] w-full'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Wallet</p>
                <div className='w-full'>
                    <Slider {...settings}>
                        <WalletCard title="Wallet Balance" amount={walletSummary?.balance?.toLocaleString()} />
                        <WalletCard title="Total Credits" amount={walletSummary?.totalCredits?.toLocaleString()} />
                        <WalletCard title="Total Withdrawals" amount={walletSummary?.totalWithdrawals?.toLocaleString()} />
                        <WalletCard title="Total Debits" amount={walletSummary?.totalDebits?.toLocaleString()} />
                        <WalletCard title="Total Transactions" amount={walletSummary?.totalTransactions?.toLocaleString()} />
                    </Slider>
                </div>
            </div>
            <div className='w-full'>
              <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                  <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Assignment Strength</p>
                  <div className='mb-2 flex gap-2'>
                    <div className='relative'>
                        <p>Session</p>
                        <div className='flex items-center justify-between border rounded-[6px] py-2 px-2 w-full'>
                            <input type="text" value={session?.name} className='outline-none w-full rounded-[4px] capitalize'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'sessions' ? false : 'sessions')} />
                        </div>
                        {
                            dropDown === "sessions" &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                {
                                    allSessions?.map(session => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setDropDown(false)
                                                setSession(session)
                                                getTerms(session._id)
                                            }}>{session?.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='relative'>
                        <p>Term/Semester</p>
                        <div className='flex items-center justify-between border rounded-[6px] py-2 px-2 w-full'>
                            <input type="text" value={term?.name} className='outline-none w-full rounded-[4px] capitalize'/>
                            <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'terms' ? false : 'terms')} />
                        </div>
                        {
                            dropDown === "terms" &&
                            <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                                {
                                    allTerms?.map(term => {
                                        return (
                                            <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                                setDropDown(false)
                                                setTerm(term)
                                            }}>{term?.name}</p>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    
                  </div>
                  {
                    term &&
                    <button onClick={getMemberAttendanceSummary} className={ loading ? 'bg-[#565a58] cursor-not-allowed w-full py-[6px] rounded-[6px] text-white block mb-10 mt-3' : 'bg-[#1E2522] w-full py-[6px] rounded-[6px] text-white block mb-10 mt-3'}>{loading ? "Loading...": "Get Assignment Strength"}</button>
                  }
                  {
                    loading ? "" : <>
                        {
                            chartData.length <= 0 && <p className='text-center'>No data found</p>
                        }
                    </>
                  }
                  <div className='w-full flex gap-10 mt-7'>
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

            <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Gotrupass summary</p>
                {/* <div className='w-full'>
                    <div className='w-full'>
                        <div className='flex items-center justify-between mb-3 w-full'>
                            <p className='text-[#1D1D1D] font-[500]'>Sign-in</p>
                            <p className='text-[#1D1D1D] font-[500]'>26 days</p>
                        </div>
                        <Bar
                        data={data}
                        options={{
                            plugins: {
                                title: {
                                display: false,
                                text: "Users Gained between 2016-2020"
                                },
                                legend: {
                                display: false
                                }
                            }
                            }}
                        />
                    </div>
                    <div className='w-full mt-10'>
                        <div className='flex items-center justify-between mb-3 w-full'>
                            <p className='text-[#1D1D1D] font-[500]'>Sign-out</p>
                            <p className='text-[#1D1D1D] font-[500]'>26 days</p>
                        </div>
                        <Bar
                        data={data}
                        options={{
                            plugins: {
                                title: {
                                display: false,
                                text: "Users Gained between 2016-2020"
                                },
                                legend: {
                                display: false
                                }
                            }
                            }}
                        />
                    </div>
                </div> */}
                <div className="flex w-full gap-5">
                    <div className='w-full'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className="text-lg font-medium">Sign-in</h3>
                            {/* <p className="text-sm">26 days</p> */}
                        </div>
                        {signInData?.length ? signInData : "No data available"}
                        {/* <SummaryBar label="Member" percentage={35} color="bg-[#2E8B57]" />
                        <SummaryBar label="Guardian" percentage={35} color="bg-[#FF6F61]" />
                        <SummaryBar label="Relation" percentage={20} color="bg-[#FFDB58]" />
                        <SummaryBar label="Signature" percentage={10} color="bg-[#967BB6]" /> */}
                    </div>
                    <div className='w-full border-l pl-5'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className="text-lg font-medium">Sign-out</h3>
                            {/* <p className="text-sm">26 days</p> */}
                        </div>
                        {signOutData?.length ? signOutData : "No data available"}
                        {/* <SummaryBar label="Member" percentage={35} color="bg-[#2E8B57]" />
                        <SummaryBar label="Guardian" percentage={35} color="bg-[#FF6F61]" />
                        <SummaryBar label="Relation" percentage={20} color="bg-[#FFDB58]" />
                        <SummaryBar label="Signature" percentage={10} color="bg-[#967BB6]" /> */}
                    </div>
                </div>
                <div className="mt-8 flex justify-between text-[13px]">
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#2E8B57] mr-2"></div>
                        <span>Self</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#FF6F61] mr-2"></div>
                        <span>Guardian</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#FFDB58] mr-2"></div>
                        <span>Authorize</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#967BB6] mr-2"></div>
                        <span>Signature</span>
                    </div>
                </div>
            </div>
            <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Bank Account</p>
                <div className='flex items-center justify-between'>
                    <p>Bank Name</p>
                    <p>{currentUser?.user?.guardians?.bankName ? currentUser?.user?.guardians?.bankName : "N/A"}</p>
                </div>
                <div className='flex items-center justify-between my-5'>
                    <p>Account Name</p>
                    <p>{currentUser?.user?.guardians?.bankName ? currentUser?.user?.guardians?.accountName : "N/A"}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>Account Number</p>
                    <p>{currentUser?.user?.guardians?.bankName ? currentUser?.user?.guardians?.accountNum : "N/A"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MemberProfile