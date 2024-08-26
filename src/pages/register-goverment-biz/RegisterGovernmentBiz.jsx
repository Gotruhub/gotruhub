import React, { useEffect, useState } from 'react'
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload } from "react-icons/md";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar';
import { FaRegFileImage } from "react-icons/fa6";
import { IoChevronDownOutline } from 'react-icons/io5';

const RegisterGovernmentBiz = ({baseUrl}) => {

  const navigate = useNavigate()
  const [govtlevelDropDown, setGovtLevelDropDown] = useState(false)
  const [stateDropDown, setStateDropDown] = useState(false)
  const [lgaDropDown, setLgaDropDown] = useState(false)
  const [states, setStates] = useState([])
  const [lgas, setLgas] = useState([])
  const govtlevelArray = ['Federal', 'State', 'Local']
  const [govtLevel, setGovtLevel] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const [fileUploadLoader, setfileUploadLoader] = useState(false)
  const [cacImage, setCacImage] = useState(null);
  const [cacImageId, setCacImageId] = useState('')
  const [opLicenceImage, setOpLicenceImage] = useState(null);
  const [opLicenceImageId, setOpLicenceImageId] = useState('')
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
  const [dropDown, setDropDown] = useState(false)
  const [customBizType, setCustomBizType] = useState('');

  const [state, setState] = useState('')
  const [lga, setLga] = useState('')

  const handleFileChange = (file, kind) => {

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    if(file.size > maxSizeInBytes){
        setMsg("File size should not exceed 5MB");
        setAlertType('error')
        return
    }

      if (file[0]) {
        if (kind == "cac") {
          setCacImage(file[0]);
          handleFileUpload(file[0], kind)
        } else {
          handleFileUpload(file[0], kind)
          setOpLicenceImage(file[0]);
        }
      }
    };

  async function handleFileUpload(file, type){
      setfileUploadLoader(true)
      console.log(`${baseUrl}/upload-media`);
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${baseUrl}/upload-media`,{
        method:"POST",
        body: formData
      })
      const data = await res.json()
      if(res) setfileUploadLoader(false)
      if(res.ok) {
        setMsg("File uploaded successfully");
        setAlertType('success')
        if(type === 'cac'){
          setCacImageId(data.data._id)
        }else{
          setOpLicenceImageId(data.data._id)
        }
      }
      if(!res.ok){
        setMsg("File upload wasn't successfull");
        setAlertType('error')
      }
    }

    const raw = {
      email,
      phone,
      bizType,
      yearOfEstablishment,
      referalCode,
      nameOfEstablishment,
      nameOfProprietor,
      businessAddress,
      cacImage:cacImageId,
      opLicenceImage:opLicenceImageId
    };

  async function getAlStates(){
    const res = await fetch('https://nigeria-states-towns-lga.onrender.com/api/all')
    const data = await res.json()
    setStates(data)
    console.log(data);
  }
  // 
  async function getLgas(state_code){
    const res = await fetch(`https://nigeria-states-towns-lga.onrender.com/api/${state_code}/lgas`)
    const data = await res.json()
    setLgas(data)
    console.log(data);
  }

  useEffect(() => {
    getAlStates()
  },[])


  return (
    <div>
      <Navbar />
        <div className='w-[100%] mx-auto my-[4rem]'>
            <div className='lg:w-[55%] w-[90%] mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='sm:flex items-center gap-1 cursor-pointer hidden' onClick={() => navigate('/register')}>
                        <GoChevronLeft />
                        <p>Back</p>
                    </div>
                    <p className='text-[#19201D] text-[24px] font-[500]'>Government Institutions</p>
                    <p></p>
                </div>
                <p className='text-[#828282] mt-8 mb-10'>By proceeding, you are registering your organization as a government/licensed institution. Not a government/licensed institution? Return to previous screen and select your organization type.</p>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                  <div className='w-full relative'>
                      <label className='block text-left mb-2'>Government level</label>
                      <div className='px-4 py-3 outline-none border w-full rounded-[4px] flex items-center justify-between'>
                        <input value={govtLevel} placeholder='Select level' type="text" className='outline-none w-full rounded-[4px]'/>
                        <GoChevronDown cursor={'pointer'} onClick={() => setGovtLevelDropDown(!govtlevelDropDown)}/>
                      </div>
                      {
                        govtlevelDropDown && 
                          <div className='absolute w-full bg-white border rounded-[4px] mt-3 px-2 z-[99]'>
                            {
                              govtlevelArray.map((item, index) => {
                                return (
                                    <p onClick={() => {
                                      setGovtLevelDropDown(false)
                                      setGovtLevel(item)
                                    }} className='cursor-pointer py-1 hover:text-[#cecece]'>{item}</p>
                                )
                              })
                            }
                          </div>
                      }
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Ministry/Agency</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>

                {govtLevel === 'State' &&
                  <div className='w-full relative mt-8'>
                    <label className='block text-left mb-2'>State</label>
                    <div className='px-4 py-3 outline-none border w-full rounded-[4px] flex items-center justify-between'>
                      <input value={state} placeholder='Select State' type="text" className='outline-none w-full rounded-[4px]'/>
                      <GoChevronDown cursor={'pointer'} onClick={() => setStateDropDown(!stateDropDown)}/>
                    </div>
                      {
                        stateDropDown && 
                          <div className='bg-white border rounded-[4px] mt-3 px-2 absolute w-full overflow-y-scroll h-[250px]'>
                            {
                              states.map((state, index) => {
                                return (
                                    <p onClick={() => { 
                                      setStateDropDown(false)
                                      setState(state.name)
                                    }} className='cursor-pointer py-1 hover:text-[#cecece]'>{state.name}</p>
                                )
                              })
                            }
                          </div>
                      }
                  </div>
                  }

                  {govtLevel === 'Local' &&
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                      <div className='w-full relative mt-8'>
                        <label className='block text-left mb-2'>State</label>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px] flex items-center justify-between'>
                          <input value={state} placeholder='Select State' type="text" className='outline-none w-full rounded-[4px]'/>
                          <GoChevronDown cursor={'pointer'} onClick={() => setStateDropDown(!stateDropDown)}/>
                        </div>
                        {
                          stateDropDown && 
                            <div className='bg-white border rounded-[4px] mt-3 px-2 absolute w-full overflow-y-scroll h-[250px]'>
                              {
                                states.map((state, index) => {
                                  return (
                                      <p onClick={() => { 
                                        setStateDropDown(false)
                                        setState(state.name)
                                        getLgas(state.state_code)
                                      }} className='cursor-pointer py-1 hover:text-[#cecece]'>{state.name}</p>
                                  )
                                })
                              }
                            </div>
                        }
                      </div>
                      <div className='w-full relative mt-8'>
                        <label className='block text-left mb-2'>LGA</label>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px] flex items-center justify-between'>
                          <input value={lga} placeholder='Select LGA' type="text" className='outline-none w-full rounded-[4px]'/>
                          <GoChevronDown cursor={'pointer'} onClick={() => setLgaDropDown(!lgaDropDown)}/>
                        </div>
                        {
                          lgaDropDown && 
                            <div className='bg-white border rounded-[4px] mt-3 px-2 absolute w-full overflow-y-scroll h-[250px]'>
                              {
                                lgas.map((lga, index) => {
                                  return (
                                      <p onClick={() => { 
                                        setLgaDropDown(false)
                                        setLga(lga.name)
                                      }} className='cursor-pointer py-1 hover:text-[#cecece]'>{lga.name}</p>
                                  )
                                })
                              }
                            </div>
                        }
                      </div>
                    </div>
                  }

                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Contact address</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Website</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Email address</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Phone number</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    {/* <div className='relative flex items-center gap-3 p-4 rounded-[4px] w-full cursor-pointer' style={{ border:'1px dashed gray' }}>
                    {cacImage ? (
                        <div className='py-[10px] flex items-center gap-3'>
                            <img src="/images/pdf-file .svg" />
                            <p className='text-[10px]'>{cacImage?.name}</p>
                            <img src="./images/Delete.svg" alt="" />
                        </div>
                        ) : (
                            <>
                                <input
                                    className='cursor-pointer opacity-0 w-full h-full absolute left-0'
                                    type="file"
                                    accept=".jpg,.png,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange(e.target.files, "cac")}
                                />
                                <div className='bg-[#EDFFF7] text-[#40916C] p-4 rounded-full'>
                                    <MdOutlineFileUpload />
                                </div>
                                <p className='text-[#6F7975] text-[12px]'>CAC certificate/Operational license.(pdf only)</p>
                            </>
                        )}
                    </div> */}

                    <div className='relative flex items-center gap-3 p-4 rounded-[4px] w-full cursor-pointer' style={{ border:'1px dashed gray' }}>
                        {opLicenceImage ? (
                            <div className='py-[10px] flex items-center gap-3'>
                                <FaRegFileImage className='text-[22px] text-green-700' />
                                <p className='text-[10px]'>{opLicenceImage?.name}</p>
                                {/* <img src="./images/Delete.svg" alt="" /> */}
                            </div>
                            ) : (
                            <>
                                <input
                                    className='cursor-pointer opacity-0 w-full h-full absolute left-0'
                                    type="file"
                                    accept=".jpg,.png,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange(e.target.files, "opLic")} 
                                />
                                <div className='bg-[#EDFFF7] text-[#40916C] p-4 rounded-full'>
                                    <MdOutlineFileUpload />
                                </div>
                                <p className='text-[#6F7975] text-[12px]'>Institution Logo (jpeg, jpg or png only) (max. 5mb)</p>
                            </>
                        )}
                    </div>
                </div>
                {
                    fileUploadLoader &&
                    <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                        <div className="bg-white" style={{ borderRadius:'10px' }}>
                            {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                            <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col" style={{ padding:'2rem', textAlign:'center' }} >
                                <img src='./images/loader.gif' style={{ height:'40px', width:'40px', margin:'12px auto 30px' }} />
                                <p className='text-gray-500 text-[15px] mb-2 text-center'>File Upload in progress, please do not refresh the page</p>
                            </div>
                        </div>
                    </div>
                }
                {/* <div className='flex items-center gap-5 w-full my-[3rem]'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Year of Establishment</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Name of proprietor</label>
                        <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div> */}
                {/* <div className='w-full mt-[3rem]'>
                    <div className='flex item-center justify-between mb-2'>
                      <label className='block text-left'>Enter referral code</label>
                      <p className='text-[#828282]'>Optional</p>
                    </div>
                    <input type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                </div> */}
                <button className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default RegisterGovernmentBiz