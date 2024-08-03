import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from "react-icons/ci";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';


const TransactionHistory = () => {

    const navigate = useNavigate()
    const [filterDropDown, setFilterDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [allTransaction, setAllTransactions] = useState([])
    const [msg, setMsg] = useState('')
    const filterArray = ['All', "Cash sales", "Wallet sales", "Purchases", "Deposits", "Withdrawals"]

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/wallet')} className='cursor-pointer' />
                            <p className="text-[28px] text-primary-color font-[600]">Transaction history</p>
                        </div>
                    </div>
                    <div className='relative'>
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
                    </div>
                </div>
                <div class="relative overflow-x-auto mx-5 mt-10 p-8">
                    <table class="w-full text-sm text-left rtl:text-left">
                    <thead class="text-[14px] border-b">
                        <tr>
                            <th scope="col" class="py-3 th1 font-[700]">Action</th>
                            <th scope="col" class="py-3 font-[700]">User</th>
                            <th scope="col" class="py-3 font-[700]">Role</th>
                            <th scope="col" class="py-3 font-[700]">Date and Time</th>
                            <th scope="col" class="py-3 font-[700]">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>Wallet withdrawal</td>
                            <td>Timi Gowon</td>
                            <td>Member</td>
                            <td>24 October 2024, 10:00AM</td>
                            <td className='text-[#25751E]'>#300,000</td>
                        </tr>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>Cash sales</td>
                            <td>Timi Gowon</td>
                            <td>Admin</td>
                            <td>24 October 2024, 10:00AM</td>
                            <td className='text-[#25751E]'>#300,000</td>
                        </tr>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>Wallet deposits</td>
                            <td>Timi Gowon</td>
                            <td>Admin</td>
                            <td>24 October 2024, 10:00AM</td>
                            <td className='text-[#25751E]'>#300,000</td>
                        </tr>
                        <tr className='text-[#19201D]'>
                            <td className='py-3'>Purchases</td>
                            <td>Timi Gowon</td>
                            <td>Member</td>
                            <td>24 October 2024, 10:00AM</td>
                            <td className='text-[#25751E]'>#300,000</td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionHistory