import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { useNavigate } from 'react-router-dom'

const PaymentSuccessfull = ({baseUrl}) => {

    const [toggleNav, setToggleNav] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [id, setId] = useState()
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    async function searchId(){
        if(!id){
            setAlertType('error')
            setMsg("Please fill in the field")
        }else{
            setLoading(true)
            const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                }
            })
            if(res) setLoading(false)
            const data = await res.json()
            if(!res.ok){
                setAlertType('error')
                setMsg("User not found")
            }
            if(res.ok){
                setAlertType('success')
                setMsg("User found")
                navigate(`/user/${id}`)
            }
            console.log(data);
        }
    }


  return (
    <div className='h-[100vh]'>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        {/* <p className="text-[24px] lg:text-[28px] text-primary-color font-[600]">Lost Id</p> */}
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-session')}>Create Session</button> */}
                    </div>
                </div>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <div className="text-center">
                            <div className="text-green-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m0-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful</h2>
                        <p className="text-gray-600 mb-4">Your payment has been successfully processed.</p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-primary-color text-white py-2 px-4 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccessfull