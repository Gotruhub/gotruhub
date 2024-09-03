import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { GoChevronRight } from "react-icons/go";
import { TbTrash } from 'react-icons/tb';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';


const Token = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [activeSubs, setActiveSubs] = useState([])
    const [toggleNav, setToggleNav] = useState(false)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [deleteToken, setDeleteToken] = useState()

    useEffect(() => {
        getMyPlans()
    },[])

    async function getMyPlans(){
        const res = await fetch(`${baseUrl}/plan/my-plans`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.plans);
        setActiveSubs(data.data.plans)
    }

    async function deleteTokenFn() {
        setLoading(true)
        const res = await fetch(`${baseUrl}/plan/${deleteToken}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        if(res) setLoading(false)
        if(res.ok){
            getMyPlans()
            setDeleteToken(null)
            setMsg("Plan deleted successfully");
            setAlertType('success');
            return;
        }
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div>
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/subscribe')} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Token</p>
                    </div>
                    <button className="bg-[#646464] text-white px-5 py-3 rounded-[8px] text-[14px]" >Send Token</button>
                </div>
                <div className='px-[10px] lg:px-[30px] flex items-start gap-[7rem]'>
                    <div className='w-full'>
                        <p className='text-[#19201D] font-[700] md:text-[24px] text-[20px] mb-10'>Active Subscriptions</p>
                        {
                            activeSubs && activeSubs?.map(sub => (
                                <div className='shadow-lg px-[20px] py-[16px] rounded-[12px] flex items-center justify-between mb-5'>
                                    <div>
                                        <p className='text-[#19201D] text-[18px] mb-2 font-[500]'>{
                                            sub.subscriptionType?.feature?.length > 1
                                            ? sub.subscriptionType?.feature?.map((ft, i) => (
                                                    <span key={i}>
                                                    {ft.name}
                                                    {i < sub?.subscriptionType?.feature?.length - 1 && <span> + </span>}
                                                    </span>
                                                ))
                                                : sub.subscriptionType?.feature[0]?.name
                                            }
                                        </p>
                                        <p className='text-[#828282]'>{sub?.quantity} Tokens: <span className='font-bold'>{sub?.quantityLeft} Available</span>  - {sub?.quantity - sub?.quantityLeft} Used</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        {sub?.quantityLeft < 1 &&
                                            <TbTrash className='text-[20px] text-red-500 cursor-pointer' onClick={() => setDeleteToken(sub._id)}/>
                                        }
                                        <GoChevronRight className='text-[20px] text-[#4F4F4F] cursor-pointer' onClick={() => navigate(`/send-token/${sub._id}`)}/>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        {
            deleteToken &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteToken(false)}></div>
                <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Token</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteToken(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this token?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteTokenFn(deleteToken)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default Token