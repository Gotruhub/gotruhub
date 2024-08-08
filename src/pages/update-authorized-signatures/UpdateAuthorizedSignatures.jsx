import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'

const UpdateAuthorizedSignatures = ({baseUrl}) => {

  const navigate = useNavigate()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [guardian, setGuardian] = useState()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [relationImage, setRelationImage] = useState()
  const [signatureImage, setSignatureImage] = useState()
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [loading, setLoading] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [fileUploadLoader, setfileUploadLoader] = useState(false)
  const [toggleNav, setToggleNav] = useState(false)
  

  async function getUserInfo(){
    const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
        headers:{
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    setGuardian(data.data.user)
    setSignatureImage(data.data.user.guardians.signature)
    setRelationImage(data.data.user.guardians.relationImage)
    console.log(data.data.user)
  }

  async function handleFileUpload(file){
    console.log(file);
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
      setAlertTitle('Success')
      setRelationImage(data.data)
    //   setUserImagePreview(data.data.file)
    }
    if(!res.ok){
      setMsg("File upload wasn't successfull");
      setAlertType('error')
      setAlertTitle('Failed')
    }
  }


  async function handleSignatureUpload(file){
    console.log(file);
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
      setAlertTitle('Success')
      setSignatureImage(data.data)
    //   setUserImagePreview(data.data.file)
    }
    if(!res.ok){
      setMsg("File upload wasn't successfull");
      setAlertType('error')
      setAlertTitle('Failed')
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    console.log({
      fullName: guardian.guardians.fullName,
      role: 'guardian',
      email: guardian.guardians.email,
      children: guardian.guardians.children,
      profileImage: guardian.profileImage._id,
      relationImage:relationImage._id,
      signature:signatureImage._id
    });
    setLoading(true)
    const res = await fetch(`${baseUrl}/users/get-user/${guardian.guardians._id}`,{
      method:"PUT",
      headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${user.data.access_token}`
      },
      body:JSON.stringify({
        fullName: guardian.guardians.fullName,
        role: 'guardian',
        children: guardian.guardians.children,
        profileImage: guardian.profileImage._id,
        relationImage:relationImage._id,
        signature:signatureImage._id
      })
    })
    const data = await res.json()
    console.log(data);
    setLoading(false)
    if(res) setfileUploadLoader(false)
    if(res.ok) {
      setMsg("Guardian's data updated successfully");
      setAlertType('success')
      setAlertTitle('Success')
    }
    if(!res.ok){
      setMsg("Failed to update guardian's data");
      setAlertType('error')
      setAlertTitle('Failed')
    }
  }

  useEffect(() => {
    getUserInfo()
  },[])

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto pb-5">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
          <div className="">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                  <div>
                      <div className="flex items-center gap-2">
                          <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/manage-users')} className='cursor-pointer' />
                          <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Update Authorised Person's image and signature</p>
                      </div>
                      {/* <p className='text-[#4F4F4F]'>Set maximum amount that should be in a user’s wallet</p> */}
                  </div>
              </div>
              <div className='flex item-center justify-center flex-col lg:flex-row w-[90%] lg:w-[80%] mx-auto gap-8'>
                <div className='xl:w-[1200px] flex items-center justify-center flex-col'>
                  <label className='block text-text-color text-left mb-2'>Relation image</label>
                  <div className='border border-dashed p-3 rounded max-w-[500px]'>
                    <img src={relationImage ? relationImage.file : guardian?.guardians?.relationImage?.file} className='' alt="" />
                  </div>
                  <div className='bg-red-500 relative mt-4 cursor-pointer'>
                    <input type="file" onChange={e => handleFileUpload(e.target.files[0])} className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                    <button className='text-white bg-primary-color text-[12px] rounded-[4px] px-[28px] py-[10px] text-center mx-auto cursor-pointer'>Change Image</button>
                  </div>
                  {/* <input type="file" onChange={e => handleFileUpload(e.target.files[0])}/> */}
                  {/* <button className='bg-gray-800 text-white p-2 rounded text-[12px] mt-3'>Change Image</button> */}
              </div>
                <div className='xl:w-[1200px] flex items-center justify-center flex-col'>
                  <label className='block text-text-color text-left mb-2'>Signature image</label>
                  <div className='border border-dashed p-3 rounded max-w-[500px]'>
                    <img src={signatureImage ? signatureImage.file : guardian?.guardians?.relationImage?.file} className='w-[100%]' alt="" />
                  </div>
                  <div className='bg-red-500 relative mt-4 cursor-pointer'>
                    <input type="file" onChange={e => handleSignatureUpload(e.target.files[0])} className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                    <button className='text-white bg-primary-color text-[12px] rounded-[4px] px-[28px] py-[10px] text-center mx-auto cursor-pointer'>Change Image</button>
                  </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 px-[30px]">
                <button onClick={() => navigate(`/user/${id}`)} type="button" className="bg-white text-black border border-black py-2 px-4 rounded">
                    Back
                </button>
                {
                    loading ? 
                    <BtnLoader bgColor="#191f1c"/>
                    :
                    <button type="submit" className="bg-primary-color text-white py-2 px-4 rounded" onClick={handleSubmit}>Save changes</button>
                }
            </div>
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

export default UpdateAuthorizedSignatures