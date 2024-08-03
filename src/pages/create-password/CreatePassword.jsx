import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar';


const CreatePassword = ({baseUrl}) => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [encrypted, setEncrypted] = useState(true);
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [isLoading, setIsLoading] = useState(false)

    // validated states
    const [lowerValidated, setLowerValidated]=useState(false);
    const [upperValidated, setUpperValidated]=useState(false);
    const [numberValidated, setNumberValidated]=useState(false);
    const [specialValidated, setSpecialValidated]=useState(false);
    const [lengthValidated, setLengthValidated]=useState(false);

    const handleChange=(value)=>{
      const lower = new RegExp('(?=.*[a-z])');
      const upper = new RegExp('(?=.*[A-Z])');
      const number = new RegExp('(?=.*[0-9])');
      const special = new RegExp('(?=.*[!@#\$%\^&\*])');
      const length = new RegExp('(?=.{8,})')
      if(lower.test(value)){
        setLowerValidated(true);
      }
      else{
        setLowerValidated(false);
      }
      if(upper.test(value)){
        setUpperValidated(true);
      }
      else{
        setUpperValidated(false);
      }
      if(number.test(value)){
        setNumberValidated(true);
      }
      else{
        setNumberValidated(false);
      }
      if(special.test(value)){
        setSpecialValidated(true);
      }
      else{
        setSpecialValidated(false);
      }
      if(length.test(value)){
        setLengthValidated(true);
      }
      else{
        setLengthValidated(false);
      }
      setPassword(value)
    }

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
        console.log(password, confirmPassword);
        setIsLoading(true)
        const body = {
            email: JSON.parse(localStorage.getItem('reg-email')),
            password
        }
        const res = await fetch(`${baseUrl}/set-Password`, {
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
                <h3 className='text-center mx-[20px] text-[30px] mb-[3rem]'>Create Password</h3>
                <div className="" style={{marginBottom:"30px"}}>
                  <p style={{marginBottom:"5px"}}>Enter Password</p>
                  <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                  <input
                    className='w-full text-[#19201d] outline-none '
                    type={encrypted ? "password" : "text"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => {
                      handleChange(e.target.value);
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
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 text-[12px] mt-2 gap-1">
                  {
                    lowerValidated ? 
                    <p className='border border-[#25751E] rounded-[4px] px-2 py-1 bg-[#DEEADD] text-[#1D1D1D]'>Lowercase letter e.g. a</p>
                    :
                    <p className='rounded-[4px] px-2 py-1 bg-[##E0E0E0] text-[#828282] bg-[#E0E0E0]'>Lowercase letter e.g. a</p>
                  }
                  {
                    specialValidated ?
                    <p className='border border-[#25751E] rounded-[4px] px-2 py-1 bg-[#DEEADD] text-[#1D1D1D]'>Special character e.g. _</p>
                    :
                    <p className='rounded-[4px] px-2 py-1 bg-[##E0E0E0] text-[#828282] bg-[#E0E0E0]'>Special character e.g. _</p>
                  }
                  {
                    numberValidated ?
                    <p className='border border-[#25751E] rounded-[4px] px-2 py-1 bg-[#DEEADD] text-[#1D1D1D]'>Number e.g. 1</p>
                    :
                    <p className='rounded-[4px] px-2 py-1 bg-[##E0E0E0] text-[#828282] bg-[#E0E0E0]'>Number e.g. 1</p>
                  }
                  {
                    lengthValidated ?
                    <p className='border border-[#25751E] rounded-[4px] px-2 py-1 bg-[#DEEADD] text-[#1D1D1D]'>At least 8 characters long</p>
                    :
                    <p className='rounded-[4px] px-2 py-1 bg-[##E0E0E0] text-[#828282] bg-[#E0E0E0]'>At least 8 characters long</p>
                  }
                  {
                    upperValidated ?
                    <p className='border border-[#25751E] rounded-[4px] px-2 py-1 bg-[#DEEADD] text-[#1D1D1D]'>Uppercase letter e.g. A</p>
                    :
                    <p className='rounded-[4px] px-2 py-1 bg-[##E0E0E0] text-[#828282] bg-[#E0E0E0]'>Uppercase letter e.g. A</p>

                  }
                </div>
              </div>
          
              <div>
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
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default CreatePassword