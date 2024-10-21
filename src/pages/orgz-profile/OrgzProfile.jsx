import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'
import { MdOutlineFileUpload } from 'react-icons/md'
import { FaRegFileImage } from 'react-icons/fa6'

const OrgzProfile = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [bizType, setBizType] = useState("");
    const [nameOfProprietor, setNameOfProprietor] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [yearOfEstablishment, setYearOfEstablishment] = useState("");
    const [motto, setMotto] = useState("");
    const [nameOfEstablishment, setNameOfEstablishment] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)
    const [fileUploadLoader, setfileUploadLoader] = useState(false)
    const [toggleNav, setToggleNav] = useState(false)
    const [opLicenceImage, setOpLicenceImage] = useState(null);
    const [opLicenceImageId, setOpLicenceImageId] = useState('')

    async function updateOrgzDetails(){
        setLoading(true)
        const body = {
            bizType,
            nameOfProprietor,
            phone,
            yearOfEstablishment,
            nameOfEstablishment,
            businessAddress,
            motto,
            logo:opLicenceImageId,
        }
        console.log(body);
        const res = await fetch(`${baseUrl}/profile/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.access_token}`
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        console.log(data);
        if(res) setLoading(false)
        if(res.ok){
            setMsg(data.message);
            setAlertType('success');
            return;
        }
    }

    if(!user){
        navigate('/login')
    }

    async function getProfile(){
        const res = await fetch(`${baseUrl}/profile/get-profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        if(res.ok){
            setBizType(data.data.bizType);
            setNameOfProprietor(data.data.nameOfProprietor);
            setPhone(data.data.phone);
            setEmail(data.data.email);
            setYearOfEstablishment(data.data.yearOfEstablishment);
            setMotto(data?.data?.motto);
            setNameOfEstablishment(data.data.nameOfEstablishment);
            setBusinessAddress(data.data.businessAddress);
        }
        console.log(data);
    }

    useEffect(() => {
        getProfile()
    },[])

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
        console.log(data.data.file);
        
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setOpLicenceImage(data.data)
          setOpLicenceImageId(data.data._id)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[1rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                            <p className="text-[24px] lg:text-[28px] text-primary-color font-[600]">Profile</p>
                        </div>
                    </div>
                </div>
                <div className='p-[10px] lg:p-[30px]'>
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
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[3rem]'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Phone Number</label>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Email Address</label>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                        <div className='w-full'>
                            <div className="flex items-center justify-between">
                                <label className='block text-left mb-2'>Organization Motto</label>
                            </div>
                            <input type="text" value={motto} onChange={e => setMotto(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Business Address</label>
                            <input type="text" value={businessAddress} onChange={e => setBusinessAddress(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full mt-[3rem]'>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Year of Establishment</label>
                            <input type="text" value={yearOfEstablishment} onChange={e => setYearOfEstablishment(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                        <div className='w-full'>
                            <label className='block text-left mb-2'>Name of proprietor</label>
                            <input value={nameOfProprietor} onChange={e => setNameOfProprietor(e.target.value)} type="text" className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className="mt-7">
                        <label className='block text-text-color text-left mb-2'>Organization's Logo</label>
                        {
                            opLicenceImage?
                            <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                <img src={opLicenceImage?.file} alt="" className='absolute overflow-hidden h-[250px]'/>
                                <p className='text-text-color font-[600] mt-5 opacity-0'>Click to upload </p>
                                <p className='text-[#98A2B3] opacity-0'>PNG, JPG (max. 5mb)</p>
                                <div className='flex items-center gap-[15px] w-full mt-5 opacity-0'>
                                    <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5] opacity-0'></div>
                                    <p className='opacity-0'>OR</p>
                                    <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5] opacity-0'></div>
                                </div>
                                <input onChange={(e) => handleFileChange(e.target.files, "opLic")} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto opacity-0'>Browse Files</button>
                            </div>
                            :
                            <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                                <img src="./images/file-upload.svg" alt="" />
                                <p className='text-text-color font-[600] mt-5'>Click to upload </p>
                                <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                                <div className='flex items-center gap-[15px] w-full mt-5'>
                                    <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                                    <p>OR</p>
                                    <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                                </div>
                                <input onChange={(e) => handleFileChange(e.target.files, "opLic")} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                                <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                            </div>
                        }
                    </div>
                    
                    {/* <div className='relative mt-5 flex items-center gap-3 p-4 rounded-[4px] w-full cursor-pointer' style={{ border:'1px dashed gray' }}>
                        {opLicenceImage ? (
                            <div className='py-[10px] flex items-center gap-3'>
                                <FaRegFileImage className='text-[22px] text-green-700' />
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
                                <p className='text-[#6F7975] text-[12px]'>Institution Logo (jpeg, jpg or png only) (max. 5mb)</p>
                            </>
                        )}
                    </div> */}
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={updateOrgzDetails} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Save Changes</button>
                    }
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
                </div>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default OrgzProfile