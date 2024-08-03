import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import OTPInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar'

const ValidateToken = ({baseUrl}) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()

    async function verifyToken(){
        if(!otp){
            setMsg("OTP is required!");
            setAlertType('error')
            return;
        }
        setIsLoading(true)
        console.log(JSON.stringify({email:JSON.parse(localStorage.getItem('password-reset-email')), token:otp}));
        const res = await fetch(`${baseUrl}/reset-password/validate-token`,{
            method:"POST",
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify({email:JSON.parse(localStorage.getItem('password-reset-email')), token:otp})
        })
        const data = await res.json()
        if(res) setIsLoading(false)
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error')
        }
        if(res.ok){
            localStorage.setItem('token', JSON.stringify(otp))
            navigate('/change-password')
        }
        console.log(res, data);
    }

    async function resendCode(){
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/reset-password/get-reset-token`,{
            method:"POST",
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify({email:JSON.parse(localStorage.getItem('password-reset-email'))})
        })
        const data = await res.json()
        if(res) setIsLoading(false)
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error')
        }
        if(res.ok){
            setMsg(data.message);
            setAlertType('success')
        }
        console.log(data);
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
                    <p className='text-[#19201D] text-[22px] font-[500]'>Enter Verification code</p>
                    <p></p>
                </div>
                <p className='text-center text-[14px] text-[#828282] mb-[35px] mt-[4.5rem]'>Enter the 6-digit verification code sent to your email address</p>
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
                    <button onClick={verifyToken} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button>
                }
                </div>
                <p className='text-center'>Did not get a code? <span className='text-secondary-color cursor-pointer' onClick={() => resendCode()}>Resend code</span> </p>
            </div>
            <div className='text-[#6F7975] mt-[10rem] text-center text-[14px]'>
                <p>&copy; 2022 Gotruhub and Gotruhub logo are trademarks of the company.</p>
                <p>Please visit our <span className='text-secondary-color cursor-pointer'>Terms of service</span> for more details.</p>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
        </div>
    </>
  )
}

export default ValidateToken