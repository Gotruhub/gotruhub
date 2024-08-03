import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar'

const Login = ({baseUrl}) => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [encrypted, setEncrypted] = useState(true);
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()

  const [verificationMsg, setVerificationMsg] = useState('')

  const body = {
    email,
    password
  };
  const [loading, setLoading] = useState(false)

  async function login() {
    if (!email || !password) {
      setMsg("Email and Password are required!!");
      setAlertType('error');
      return;
    }
    console.log(body);
    setLoading(true)
    const resp = await fetch(`${baseUrl}/login/organization`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 
          "Content-type": "application/json" 
        }
      }
    );
    const data = await resp.json();
    console.log(resp, data);
    if(resp) setLoading(false)
    if (!resp.ok) {
      setMsg(data.message);
      setAlertType('error')
      // return;
    }

    if(data.message.includes("Account not verified")){
      setVerificationMsg(data.message)
      resendVerificationToken()
      localStorage.setItem('reg-email', JSON.stringify(email))
      // navigate('/verify-account')
    }

    if(resp.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      // window.location.href = '/#/dashboard'
      navigate("/dashboard");
    }
    // if(data.organization) {
    //   setAgent(data.organization);
    //   localStorage.setItem("agent", JSON.stringify(data.organization));
    // }
    // localStorage.setItem("token", data.token);
  }

  async function resendVerificationToken(){
    // setLoading(true)
    const res = await fetch(`${baseUrl}/resend-token`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email})
      })
      const data = await res.json()
      console.log(res, data);
  }


  return (
    <>
      <Navbar />
      <div className='w-[100%] mx-auto text-center my-[4rem]'>
        <div className='md:w-[40%] sm:w-[60%] w-[90%] mx-auto'>
          <p className='text-[28px] mb-[40px]'>Login to manage your company</p>
          <div>
            <label className='block text-left mb-2'>Email Address</label>
            <input placeholder='hello@company.com' type="text" onChange={e => setEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
          </div>
          <div className='mt-7'>
            <label className='block text-left mb-2'>Password</label>
            <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
              <input placeholder='Your Password' type="password" onChange={e => setPassword(e.target.value)} className='outline-none w-full rounded-[4px]'/>
            </div>
          </div>
          <p className='text-left mt-5'>Forgot Your Password? <span className='text-secondary-color cursor-pointer' onClick={() => navigate('/reset-password')}>Reset</span> </p>
          {
              loading ? 
              <BtnLoader bgColor="#191f1c"/>
              :
              <button onClick={login} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Login</button>
          }
          <p className='mt-10'>New to Gotru? <span className='text-secondary-color  cursor-pointer' onClick={() => navigate('/register')}>Sign up</span> </p>
        </div>
        <div className='text-[#6F7975] mt-[10rem]'>
          <p>&copy; 2022 Gotruhub and Gotruhub logo are trademarks of the company.</p>
          <p>Please visit our <span className='text-secondary-color cursor-pointer'>Terms of service</span> for more details.</p>
        </div>

        {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }

        { verificationMsg && 
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {
                setVerificationMsg('')
                }}>
              </div>
              <div className="flex items-center flex-col text-center justify-center gap-3 bg-white w-[450px] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                  <img src="./images/failed.svg" alt="" />
                  <p className='text-text-color font-[500]'>Account Verification Failed</p>
                  <p className='text-[#6F7975] text-[14px]'>{verificationMsg}</p>
                  <button className='text-white bg-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[16px] text-center mx-auto' onClick={() => navigate('/verify-account')} >Complete verification</button>
              </div>
          </>
        }

      </div>
    </>
  )
}

export default Login