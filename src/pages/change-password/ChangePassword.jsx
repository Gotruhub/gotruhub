import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar';

const ChangePassword = ({baseUrl}) => {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [encrypted, setEncrypted] = useState(true);
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [isLoading, setIsLoading] = useState(false)
  
    async function createPassword(){
      if(!password || !confirmPassword){
          setMsg("Both password fields are required!");
          setAlertType('error')
          return;
      }else if(password !== confirmPassword){
          setMsg("Both password fields must match");
          setAlertType('error')
          return
      }else{
          console.log(`${baseUrl}/set-Password`);
          setIsLoading(true)
          console.log({
            email: JSON.parse(localStorage.getItem('password-reset-email')),
            password,
            token: JSON.parse(localStorage.getItem('token'))
        });
          const body = {
              email: JSON.parse(localStorage.getItem('password-reset-email')),
              password,
              token: JSON.parse(localStorage.getItem('token'))
          }
          const res = await fetch(`${baseUrl}/reset-password/change-password`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
          })
          const data = await res.json()
          if(res) setIsLoading(false)
          console.log(res, data);
          if(!res.ok){
              setMsg(data.message);
              setAlertType('error')
              return
          }
          if(res.ok){
              setMsg("Password Created Successfully!")
              navigate('/login')
          }
      }
    }


  return (
    <div>
      <Navbar />
      <div
        className="className='w-[100%] mx-auto my-[4rem]"
      >
            <div className='md:w-[40%] sm:w-[60%] w-[90%] mx-auto'>
                <h3 className='text-center mx-[20px] text-[30px] mb-[3rem]'>Reset Password</h3>
                <div className="" style={{marginBottom:"30px"}}>
                  <p style={{marginBottom:"5px"}}>Enter Password</p>
                  <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                  <input
                    className='w-full text-[#19201d] outline-none '
                    type={encrypted ? "password" : "text"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div>
                    {!encrypted ? (
                        <img src="./images/see.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer' />
                    ) : (
                        <img src="./images/encrypt.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer'  />
                    )}
                  </div>
                </div>
              </div>
          
              <div className="">
              <p style={{marginBottom:"5px"}}>Confirm password</p>
                <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                  <input
                    className='w-full text-[#19201d] outline-none '
                    type={encrypted ? "password" : "text"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <div>
                    {!encrypted ? (
                        <img src="./images/see.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer' />
                    ) : (
                        <img src="./images/encrypt.svg" onClick={()=> setEncrypted(!encrypted)} className='cursor-pointer'  />
                    )}
                  </div>
                </div>
              </div>
              {
                isLoading ? 
                <BtnLoader bgColor="#191f1c"/>
                :
                <button onClick={createPassword} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button>
              }
              {/* <button onClick={verifyAccount} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button> */}
            </div>
        </div>
        <div className='text-[#6F7975] mt-[10rem] text-center text-[14px] mb-7'>
            <p>&copy; 2022 Gotruhub and Gotruhub logo are trademarks of the company.</p>
            <p>Please visit our <span className='text-secondary-color cursor-pointer'>Terms of service</span> for more details.</p>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default ChangePassword