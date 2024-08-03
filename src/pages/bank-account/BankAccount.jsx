import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate } from 'react-router-dom'
import { IoWalletOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";

const BankAccount = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [bankAccountDetails, setBankAccountDetails] = useState({})
    const [toggleNav, setToggleNav] = useState(false)

    async function getBankAccountDetails(){
        const res = await fetch(`${baseUrl}/bank`,{
            headers:{
                'Authorization': `Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setBankAccountDetails(data.data)
        console.log(data)
    }

    useEffect(() => {
        getBankAccountDetails()
    },[])


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-center mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/wallet')} className='cursor-pointer' />
                        <p className="text-[22px] lg:text-[28px] text-primary-color font-[600]">Bank Account</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/update-bank-account')}>Update Account</button>
                    </div>
                </div>
                <div className='flex item-center justify-center flex-col lg:w-[40%] w-[90%] mx-auto gap-8'>
                    <div>
                        <p>Bank</p>
                        <p className='border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>{bankAccountDetails?.settlement_bank ? bankAccountDetails?.settlement_bank :  "No bank name"}</p>
                    </div>
                    <div>
                        <p>Account Number</p>
                        <p className='border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>{bankAccountDetails?.account_number ? bankAccountDetails?.account_number :  "No account number"}</p>
                        <p>{bankAccountDetails?.account_name ? bankAccountDetails?.account_name :  "No account number"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BankAccount