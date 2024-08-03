import React from 'react'
import GuardianCard from '../guardian-card/GuardianCard'
import MemberCard from '../member-card/MemberCard'
import WalletCard from '../wallet-card/WalletCard'

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

import { Doughnut, Bar } from 'react-chartjs-2'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import Slider from "react-slick";

const SummaryBar = ({ label, percentage, color }) => (
    <div className="flex items-center mb-2 w-full">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="ml-2 text-[13px]">{percentage}%</span>
    </div>
);

const MemberProfile = ({currentUser, id, passSummary, walletSummary}) => {

  console.log(currentUser);

    Chart.register(CategoryScale);

    const settings = {
        speed: 500,
        slidesToShow: 2.03,
        slidesToScroll: 1,
      };

      const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const graphDdata = [
        { name: 'Group A', value: 400, color: '#FFBB28' },
        { name: 'Group B', value: 300, color: '#FF8042' },
        { name: 'Group C', value: 300, color: '#00C49F' },
        { name: 'Group D', value: 200, color: '#0088FE' },
      ];


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





    // console.log();
  return (
    <div className='flex items-start gap-10 px-[30px] py-[1rem]'>
        <div className='w-full'>
            <div className='shadow-md rounded-[6px] flex items-center gap-7 p-[20px] mb-10 w-full justify-between'>
                <img src={currentUser?.user?.profileImage?.file ? currentUser?.user?.profileImage?.file : './images/user.svg'} className='w-[200px] rounded-[6px]' alt="Member Image" />
                <img src={currentUser?.user?.passQrcode} className='w-[200px] rounded-[6px]' alt="Passcode Image" />
            </div>
            <MemberCard currentUser={currentUser} id={id}/>
            <GuardianCard currentUser={currentUser} id={id}/>
            <div className='shadow-md rounded-[6px] p-[20px] mt-10'>
                <div className='flex items-center justify-between mb-3'>
                    <p className='text-[#19201D] font-[600] txt-[18px]'>Authorized persons</p>
                    <img src="./images/edit.svg" alt="" className='cursor-pointer' />
                </div>
                <div className='flex items-center gap-7'>
                    <img src={currentUser?.user?.guardians?.relationImage?.file} className='w-[45%] rounded-[6px]' alt="Relation image" />
                    <img src={currentUser?.user?.guardians?.signature?.file} className='w-[45%] rounded-[6px]' alt="Image of signature" />
                </div>
            </div>
        </div>
        <div className='w-[50%]'>
            <div className='shadow-md rounded-[6px] p-[20px] w-full'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Wallet</p>
                <div className='w-full'>
                    <Slider {...settings}>
                        <WalletCard title="Wallet Balance" amount={walletSummary?.balance} />
                        <WalletCard title="Total Credits" amount={walletSummary?.totalCredits} />
                        <WalletCard title="Total Withdrawals" amount={walletSummary?.totalWithdrawals} />
                        <WalletCard title="Total Debits" amount={walletSummary?.totalDebits} />
                        <WalletCard title="Total Transactions" amount={walletSummary?.totalTransactions} />
                    </Slider>
                </div>
            </div>
            <div className='w-[100%] shadow-md rounded-[6px] p-[20px] mt-10'>
                <p className='text-[#1D1D1D] text-[18px] font-[600] mb-5'>Assignment Strength</p>
                <div className='w-full'>
                    {/* <Doughnut data={data} /> */}
                    <PieChart width={220} height={220}>
                        <Pie
                        data={graphDdata}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={110}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {graphDdata.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
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
                        <span>Admin</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#FF6F61] mr-2"></div>
                        <span>Guardian</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#FFDB58] mr-2"></div>
                        <span>Other</span>
                    </div>
                    {/* <div className="flex items-center">
                        <div className="w-6 h-6 rounded-[5px] bg-[#967BB6] mr-2"></div>
                        <span>Signature</span>
                    </div> */}
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