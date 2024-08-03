import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { FiInfo } from "react-icons/fi";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { useNavigate } from 'react-router-dom';


const CreateSession = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    const navigate = useNavigate()

    async function createSession(){
        if(!name){
            setMsg("Session name is required!");
            setAlertType('error');
            return;
        }else{
            console.log(user);
            setLoading(true)
            const res = await fetch(`${baseUrl}/session`,{
                method:"POST",
                headers:{
                    'Authorization':`Bearer ${user.data.access_token}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({name})
            })
            const data = await res.json()
            if(res) setLoading(false)
            if(!res.ok){
                setMsg(data.message);
                setAlertType('error');
                return;
            }
            if(res.ok){
                setMsg(data.message);
                setAlertType('success');
                return;
            }
        }
    }
    
  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/calendar')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Create Session</p>
                    </div>
                </div>
                <div className="flex items-center flex-col justify-center gap-5 px-5 max-w-[500px] mx-auto">
                    <div className='text-[#865C1D] flex items-center gap-2'>
                        <FiInfo className='text-[30px]'/>
                        <p className='lg:text-[14px] text-[12px]'>Creating a new session collects new data on members and closes update on the previous session</p>
                    </div>
                    <div className='w-full'>
                        <p className='font-[450] text-[14px]'>Session name</p>
                        <div className='flex items-center justify-between border border-[#DADFDD] rounded-[6px] py-3 px-5 bg-[#25751E26]'>
                            <input onChange={e => setName(e.target.value)} type="text" placeholder='e.g 2024/2025' className='bg-transparent outline-none w-full' />
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                    <button onClick={createSession} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Create Session</button>
                    }
                </div>
            </div>
        </div>
        {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default CreateSession