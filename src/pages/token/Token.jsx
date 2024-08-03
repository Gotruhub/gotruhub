import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { GoChevronRight } from "react-icons/go";


const Token = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [activeSubs, setActiveSubs] = useState([])
    const [toggleNav, setToggleNav] = useState(false)

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

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
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
                                            ? sub.subscriptionType.feature.map((ft, i) => (
                                                    <span key={i}>
                                                    {ft.name}
                                                    {i < sub?.subscriptionType?.feature?.length - 1 && <span> + </span>}
                                                    </span>
                                                ))
                                                : sub.subscriptionType?.feature[0]?.name
                                            }
                                        </p>
                                        <p className='text-[#828282]'>{sub?.quantityLeft} / {sub?.quantity} Tokens Used</p>
                                    </div>
                                    <GoChevronRight className='text-[20px] text-[#4F4F4F] cursor-pointer' onClick={() => navigate(`/send-token/${sub._id}`)}/>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Token