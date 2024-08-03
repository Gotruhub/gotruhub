import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'
import Navbar from '../../components/navbar/Navbar'

const RegisterPersonalBiz = ({baseUrl}) => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [bizType, setBizType] = useState("");
    const [nameOfEstablishment, setNameOfEstablishment] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [referalCode, setReferalCode] = useState("");
    const [personalAddress, setPersonalAddress] = useState("");
    const [yearOfEstablishment, setYearOfEstablishment] = useState("");
    const [nameOfProprietor, setNameOfProprietor] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()

    const raw = {
        email,
        phone,
        bizType,
        yearOfEstablishment,
        referalCode,
        nameOfEstablishment,
        nameOfProprietor,
        businessAddress,
        personalAddress,
      };

    async function handleSignUp(){
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/signup/organization`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(raw)
        })
        console.log(raw);
        const data = await res.json()
          if(res) setIsLoading(false)
          if(!res.ok){
            setMsg(data.message);
            setAlertType('error')
          }
          if(res.ok){
            localStorage.setItem('reg-email', JSON.stringify(data.data.organization.email))
            navigate('/verify-account')
          }
          console.log(res, data);
    }

  return (
    <div>
        <Navbar />
        <div className='w-[100%] mx-auto my-[4rem]'>
            <div className='md:w-[55%] w-[90%] mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='sm:flex items-center gap-1 cursor-pointer hidden' onClick={() => navigate('/register')}>
                        <GoChevronLeft />
                        <p>Back</p>
                    </div>
                    <p className='text-[#19201D] text-[24px] font-[500]'>Personal Business</p>
                    <p></p>
                </div>
                <p className='text-[#828282] mt-8 mb-10'>By proceeding, you are registering your organization as a personal business. Not a personal business? Return to previous screen and select your organization type.</p>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Name of Establishment</label>
                        <input type="text" onChange={e => setNameOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Business Type</label>
                        <input type="text" onChange={e => setBizType(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Phone Number</label>
                        <input type="text" onChange={e => setPhone(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Email Address</label>
                        <input type="text" onChange={e => setEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                    <div className='w-full'>
                        <div className="flex items-center justify-between">
                            <label className='block text-left mb-2'>Enter Referral Code</label>
                            <p className='text-[#828282] text-[12px]'>(Optional)</p>
                        </div>
                        <input type="text" onChange={e => setReferalCode(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Personal Address</label>
                        <input type="text" onChange={e => setPersonalAddress(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Year of Establishment</label>
                        <input type="text" onChange={e => setYearOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Name of proprietor</label>
                        <input type="text" onChange={e => setNameOfProprietor(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='w-full'>
                    <label className='block text-left mb-2'>Business ddress</label>
                    <input type="text" onChange={e => setBusinessAddress(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                </div>
                {
                  isLoading ? 
                  <BtnLoader bgColor="#191f1c"/>
                  :
                  <button onClick={handleSignUp} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button>
                }
                {/* <button className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button> */}
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default RegisterPersonalBiz