import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'

const WalletRestriction = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [toggleNav, setToggleNav] = useState(false)
    const [newMaxBal, setNewMaxBal] = useState('')
    const [currentMaxBal, setCurrentMaxBal] = useState('')
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()

    async function updateMaximumBalance() {
        if(!newMaxBal || !currentMaxBal){
            setMsg("Please fill in the two fields")
            setAlertType("error")
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] md:px-[30px] px-4 py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/wallet')} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Wallet Restriction</p>
                        </div>
                        <p className='text-[#4F4F4F]'>Set maximum amount that should be in a user's wallet</p>
                    </div>
                </div>
                <div className='flex item-center justify-center flex-col md:w-[40%] px-5 mx-auto gap-8'>
                    {/* <div>
                        <p>Current maximum balance</p>
                        <p className='border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>United Bank for Africa</p>
                    </div> */}
                    <div>
                        <p>Current maximum balance</p>
                        <input onChange={e => setCurrentMaxBal(e.target.value)} type="text" placeholder='NGN 0' className='border border-[#25751E] rounded-[6px] outline-none py-3 px-5 bg-[#25751E26] w-full'/>
                    </div>
                    <div>
                        <p>New maximum balance</p>
                        <input onChange={e => setNewMaxBal(e.target.value)} type="text" placeholder='NGN 0' className='border border-[#25751E] rounded-[6px] outline-none py-3 px-5 bg-[#25751E26] w-full'/>
                    </div>
                    <button onClick={updateMaximumBalance} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Update maximum balance</button>
                </div>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default WalletRestriction