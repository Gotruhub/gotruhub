import React, { useState } from 'react'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const ResetPassword = ({baseUrl}) => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)

    async function resetPassword(){
        if(!email){
            setMsg("Email is required!");
            setAlertType('error');
            return;
        }else{
            setLoading(true)
            const resp = await fetch(`${baseUrl}/reset-password/get-reset-token`, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            const data = await resp.json();
            if(resp) setLoading(false)
            if(!resp.ok){
                setMsg(data.message);
                setAlertType('error');
                return;
            }
            if(resp.ok){
                setMsg(data.message);
                setAlertType('success');
                navigate('/verify-token')
                localStorage.setItem('password-reset-email', JSON.stringify(email))
                return;
            }
            console.log(resp, data);
        }
    }

  return (
    <>
      <Navbar />
      <div className='w-[100%] mx-auto text-center my-[4rem]'>
        <div className='md:w-[40%] sm:w-[60%] w-[90%] mx-auto'>
          <p className='text-[28px] mb-[40px] text-text-color'>Reset password</p>
          <div>
            <label className='block text-left mb-2'>Email Address</label>
            <input placeholder='hello@company.com' type="text" onChange={e => setEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
          </div>
          {
              loading ? 
              <BtnLoader bgColor="#191f1c"/>
              :
              <button onClick={resetPassword} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Reeset Password</button>
          }
          <p className='mt-10 text-secondary-color cursor-pointer' onClick={() => navigate('/login')}>Login </p>
        </div>
        <div className='text-[#6F7975] mt-[10rem]'>
          <p>&copy; 2022 Gotruhub and Gotruhub logo are trademarks of the company.</p>
          <p>Please visit our <span className='text-secondary-color cursor-pointer'>Terms of service</span> for more details.</p>
        </div>
        {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }

      </div>
    </>
  )
}

export default ResetPassword