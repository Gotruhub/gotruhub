import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate } from 'react-router-dom';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';

const UpdateOrgs = ({baseUrl}) => {

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
    const user = JSON.parse(localStorage.getItem('user'))

    async function handleProfileUpdate(){

        if(!bizType || !nameOfProprietor || !phone || !email || !yearOfEstablishment || !businessAddress || !nameOfEstablishment){
            setMsg('All fields are required!');
            setAlertType('error');
            return;
        }else{
            setIsLoading(true)
            const res = await fetch(`${baseUrl}/profile/update-profile`,{
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.data.access_token}`
                },
                body: JSON.stringify({
                    bizType,
                    nameOfProprietor,
                    phone,
                    yearOfEstablishment,
                    businessAddress,
                    nameOfEstablishment
                })
            })
            const data = await res.json()
            if(res) setIsLoading(false)
            if(res.ok){
                setMsg('Profile updated successfully')
                setAlertType('success')
            }
            if(!res.ok){
                setMsg(data.message)
                setAlertType('error')
            }
            console.log(data);
        }
    }

    async function getMyProfile(){
        const res = await fetch(`${baseUrl}/profile/get-profile`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setBizType(data.data.bizType)
        setNameOfProprietor(data.data.nameOfProprietor)
        setPhone(data.data.phone)
        setEmail(data.data.email)
        setNameOfEstablishment(data.data.nameOfEstablishment)
        setBusinessAddress(data.data.businessAddress)
        setYearOfEstablishment(data.data.yearOfEstablishment)
        console.log(data);
    }

    useEffect(() => {
        getMyProfile()
    },[])

  return (
    <div>
      <SideNav />
      <div className="w-[78%] ml-auto pb-5">
          <TopNav />
          <div className="">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                  <div className="flex items-center gap-2">
                      <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/settings')} className='cursor-pointer' />
                      <p className="text-[28px] text-primary-color font-[600]">Profile</p>
                  </div>
                  {/* <div className='flex items-center gap-5'>
                      <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/wallet-restriction')}>Reset to default</button>
                  </div> */}
              </div>
                <div className='md:w-[75%] w-[90%] mx-auto'>
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
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Phone Number</label>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Business Address</label>
                            <input value={businessAddress} type="text" onChange={e => setBusinessAddress(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Year of Establishment</label>
                            <input type="text" value={yearOfEstablishment} onChange={e => setYearOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Name of proprietor</label>
                            <input value={nameOfProprietor} onChange={e => setNameOfProprietor(e.target.value)} type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                        {/* <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <label className='block text-left mb-2'>Enter Referral Code</label>
                                <p className='text-[#828282] text-[12px]'>(Optional)</p>
                            </div>
                            <input type="text" onChange={e => setReferalCode(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div> */}
                        
                    </div>
                    {/* <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
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
                                    <p className='text-[#6F7975] text-[12px]'>Certificate of Incorporation with CAC Number (pdf only)</p>
                                </>
                            )}
                        </div>

                        <div className='relative flex items-center gap-3 p-4 rounded-[4px] w-full cursor-pointer' style={{ border:'1px dashed gray' }}>
                            {opLicenceImage ? (
                                <div className='py-[10px] flex items-center gap-3'>
                                    <img src="/images/pdf-file .svg" />
                                    <p className='text-[10px]'>{opLicenceImage?.name}</p>
                                    <img src="./images/Delete.svg" alt="" />
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
                                    <p className='text-[#6F7975] text-[12px]'>Operational License (pdf only)</p>
                                </>
                            )}
                        </div>
                    </div> */}
                    {
                        isLoading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={handleProfileUpdate} className='text-white bg-primary-color w-full rounded-[4px] px-[35px] py-[16px] text-center mx-auto'>Save Changes</button>
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

export default UpdateOrgs