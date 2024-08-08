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
    const [open, setOpen] = useState(false)

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
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-center mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/wallet')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Bank Account</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[12px]" onClick={() => navigate('/update-bank-account')}>Update Account</button>
                    </div>
                </div>
                <div className='flex item-center justify-center flex-col lg:w-[40%] w-[90%] mx-auto gap-8' onClick={() => setOpen(true)}>
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
        {
            open &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-white" style={{ borderRadius:'10px' }}>
                    {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                    <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col" style={{ padding:'2rem', textAlign:'center' }} >
                        <img src='./images/caution.svg' style={{ height:'40px', width:'40px', margin:'12px auto 30px' }} />
                        <p className='text-gray-500 text-[15px] mb-2 text-center'>Click on the button below, to create or update account details</p>
                        <div className='flex items-center gap-5 mt-5'>
                            <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[12px]" onClick={() => navigate('/update-bank-account')}>Create or Update Account</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default BankAccount