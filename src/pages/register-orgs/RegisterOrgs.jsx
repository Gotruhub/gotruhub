import React, { useState } from 'react'
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload } from "react-icons/md";
import Alert from '../../components/alert/Alert';
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Navbar from '../../components/navbar/Navbar';
import { FaRegFileImage } from "react-icons/fa6";
import { IoChevronDownOutline } from 'react-icons/io5';


const RegisterOrgs = ({baseUrl}) => {

    const navigate = useNavigate()

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

    const handleFileChange = (file, kind) => {
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

      const handleSignUp = async () => {
        console.log(JSON.stringify(raw));
        if(!email || !yearOfEstablishment || !nameOfEstablishment || !phone || !businessAddress || !nameOfProprietor || !cacImageId || !opLicenceImageId){
          setMsg("Please fill in all fields");
          setAlertType('error')
        }else{
          console.log('Loading...');
          setIsLoading(true)
          const res = await fetch(`${baseUrl}/signup/organization`,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(raw)
          })
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
      }

      const bizTypeArray = ["Primary", "Secondary", "Tertiary", "Others"]

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
                    <p className='text-[#19201D] text-[24px] font-[500]'>Register Organization</p>
                    <p></p>
                </div>
                <p className='text-[#828282] mt-8 mb-10'>By proceeding, you are registering your organization as a registered business. Not registered? Return to previous screen and select your organization type.</p>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Name of Establishment</label>
                        <input type="text" onChange={e => setNameOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>

                    <div className='w-full relative'>
                      <label className='block text-left mb-2'>Business Type</label>
                      <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                        <input
                          type="text"
                          value={bizType === "Others" ? customBizType : bizType} // Display customBizType if "Others" is selected
                          className='outline-none w-full rounded-[4px]'
                          readOnly={bizType !== "Others"} // Make input read-only unless "Others" is selected
                          placeholder='Enter your business type'
                          onChange={(e) => bizType === "Others" && setCustomBizType(e.target.value)} // Update customBizType when typing
                        />
                        <IoChevronDownOutline
                          className='cursor-pointer'
                          onClick={() => setDropDown(!dropDown)}
                        />
                      </div>
                      {
                        dropDown &&
                        <div className='absolute z-10 top-[78px] border rounded-[5px] bg-white w-full h-[150px] overflow-y-scroll'>
                          {
                            bizTypeArray?.map(biz => (
                              <p
                                key={biz}
                                className='cursor-pointer hover:bg-gray-300 p-2 capitalize text-gray-500 text-[15px]'
                                onClick={() => {
                                  setBizType(biz);
                                  if (biz !== "Others") setCustomBizType(''); // Clear customBizType if "Others" is not selected
                                  setDropDown(false);
                                }}
                              >
                                {biz}
                              </p>
                            ))
                          }
                          {/* {
                            bizType === "Others" &&
                            <input
                              type="text"
                              value={customBizType} // Bind input value to customBizType state
                              onChange={e => setCustomBizType(e.target.value)}
                              className='mx-3 my-2 px-4 py-[10px] outline-none border w-[95%] rounded-[4px]'
                              placeholder='Enter your business type'
                            />
                          } */}
                        </div>
                      }
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Phone Number</label>
                        <input type="number" onChange={e => setPhone(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
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
                        <label className='block text-left mb-2'>Business Address</label>
                        <input type="text" onChange={e => setBusinessAddress(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Year of Establishment</label>
                        <input type="text" onChange={e => setYearOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                    <div className='w-full'>
                        <label className='block text-left mb-2'>Name of proprietor</label>
                        <input onChange={e => setNameOfProprietor(e.target.value)} type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                    <div className='relative flex items-center gap-3 p-4 rounded-[4px] w-full cursor-pointer' style={{ border:'1px dashed gray' }}>
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
                    </div>

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
                                <p className='text-[#6F7975] text-[12px]'>Institution Logo (jpeg, jpg or png only)</p>
                            </>
                        )}
                    </div>
                </div>
                {
                  isLoading ? 
                  <BtnLoader bgColor="#191f1c"/>
                  :
                  <button onClick={handleSignUp} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Proceed</button>
                }
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
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default RegisterOrgs