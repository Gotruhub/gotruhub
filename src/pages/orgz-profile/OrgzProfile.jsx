import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'

const OrgzProfile = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [bizType, setBizType] = useState("");
    const [nameOfProprietor, setNameOfProprietor] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [yearOfEstablishment, setYearOfEstablishment] = useState("");
    const [referalCode, setReferalCode] = useState("");
    const [nameOfEstablishment, setNameOfEstablishment] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)
    const [toggleNav, setToggleNav] = useState(false)

    async function updateOrgzDetails(){
        setLoading(true)
        const body = {
            bizType,
            nameOfProprietor,
            phone,
            yearOfEstablishment,
            nameOfEstablishment,
            businessAddress
        }
        console.log(body);
        const res = await fetch(`${baseUrl}/profile/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.access_token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        console.log(data);
        if(res) setLoading(false)
        if(res.ok){
            setMsg(data.message);
            setAlertType('success');
            return;
        }
    }

    if(!user){
        navigate('/login')
    }

    async function getProfile(){
        const res = await fetch(`${baseUrl}/profile/get-profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        if(res.ok){
            setBizType(data.data.bizType);
            setNameOfProprietor(data.data.nameOfProprietor);
            setPhone(data.data.phone);
            setEmail(data.data.email);
            setYearOfEstablishment(data.data.yearOfEstablishment);
            setReferalCode(data.data.referalCode);
            setNameOfEstablishment(data.data.nameOfEstablishment);
            setBusinessAddress(data.data.businessAddress);
        }
        console.log(data);
    }

    useEffect(() => {
        getProfile()
    },[])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[1rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                            <p className="text-[24px] lg:text-[28px] text-primary-color font-[600]">Profile</p>
                        </div>
                    </div>
                </div>
                <div className='p-[10px] lg:p-[30px]'>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Name of Establishment</label>
                            <input type="text" value={nameOfEstablishment} onChange={e => setNameOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Business Type</label>
                            <input type="text" value={bizType} onChange={e => setBizType(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Phone Number</label>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Email Address</label>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                        {/* <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <label className='block text-left mb-2'>Enter Referral Code</label>
                                <p className='text-[#828282] text-[12px]'>(Optional)</p>
                            </div>
                            <input type="text" onChange={e => setReferalCode(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div> */}
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Business Address</label>
                            <input type="text" value={businessAddress} onChange={e => setBusinessAddress(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full mt-[3rem]'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Year of Establishment</label>
                            <input type="text" value={yearOfEstablishment} onChange={e => setYearOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Name of proprietor</label>
                            <input value={nameOfProprietor} onChange={e => setNameOfProprietor(e.target.value)} type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={updateOrgzDetails} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Save Changes</button>
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

export default OrgzProfile