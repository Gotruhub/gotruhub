import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import OTPInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar'

const VerifyAccount = ({baseUrl}) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()

    async function verifyAccount(){
        if(!otp){
            setMsg("OTP is required!");
            setAlertType('error')
            return;
        }
        setIsLoading(true)
        console.log(JSON.stringify({email:JSON.parse(localStorage.getItem('reg-email')), token:otp}));
        const res = await fetch(`${baseUrl}/verify-account`,{
            method:"POST",
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify({email:JSON.parse(localStorage.getItem('reg-email')), token:otp})
        })
        const data = await res.json()
        if(res) setIsLoading(false)
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error')
        }
        if(res.ok){
            navigate('/create-password')
        }
        console.log(res, data);
    }

    async function resendVerificationToken(){
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/resend-token`,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({email:JSON.parse(localStorage.getItem('reg-email'))})
        })
          const data = await res.json()
          if(res) setIsLoading(false)
          if(res.ok){
            setMsg(data.message)
            setAlertType('success')
          }
          if(!res.ok){
            setMsg(data.message);
            setAlertType('error')
        }
          console.log(res, data);
    }

  return (
    <>
        <Navbar />
        <div className='w-[100%] mx-auto my-[7rem]'>
        <div className='w-[100%] md:w-[70%] mx-auto'>
            <div
                className="center"
                style={{ padding: "0 8vw", position: "relative" }}
            >
                <div style={{ maxWidth: 664, width: "100%", paddingBottom: 90 }}>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1 cursor-pointer' onClick={() => navigate('/register')}>
                        <GoChevronLeft />
                        <p>Back</p>
                    </div>
                    <p className='text-[#19201D] text-[22px] font-[500]'>Verify your Email Address</p>
                    <p></p>
                </div>
                <p className='text-[14px] text-[#828282] mb-[35px] mt-[4.5rem]'>A verification code has been sent to your email address ce*****ft@gmail.com Enter the code below to complete your registration.</p>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <OTPInput
                    value={otp}
                    inputType='number'
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span style={{ visibility:'hidden' }}>---</span>}
                    renderInput={(props) => <input {...props} placeholder='1' style={{ width:"71px" }} className='text-center outline-none font-[500] h-[58px] rounded-[4px] w-[71px] border placeholder:text-[#BDBDBD59] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>}
                />
                </div>
                {
                    isLoading ? 
                    <BtnLoader bgColor="#191f1c"/>
                    :
                    <button onClick={verifyAccount} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button>
                }
                <p className='flex items-center justify-center gap-2 text-center mt-5'>Did not get a code? <span className='cursor-pointer text-secondary-color' onClick={resendVerificationToken}>Resend</span> </p>
                {/* <p >Resend verification code</p> */}
                </div>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
    </>
  )
}

export default VerifyAccount