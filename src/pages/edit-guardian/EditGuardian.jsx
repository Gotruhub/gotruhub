import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'

const EditGuardian = ({baseUrl}) => {

  const navigate = useNavigate()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [guardian, setGuardian] = useState({})
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState()
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [loading, setLoading] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [fileUploadLoader, setfileUploadLoader] = useState(false)
  const [toggleNav, setToggleNav] = useState(false)
  

  async function getGuardianInfo(){
    const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
      headers:{
          Authorization:`Bearer ${user.data.access_token}`
      }
    })
    const data = await res.json()
    setGuardian(data?.data?.user)
    setFullName(data?.data?.user?.fullName)
    setEmail(data?.data?.user?.email)
    setProfileImage(data?.data?.user?.profileImage)
    console.log(data?.data?.user);
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
      setProfileImage(data.data)
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
      fullName,
      email,
      profileImage:profileImage._id
    });
    setLoading(true)
    const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
      method:"PUT",
      headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${user.data.access_token}`
      },
      body:JSON.stringify({
        fullName,
        email,
        profileImage:profileImage._id
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
      navigate('/manage-users')
    }
    if(!res.ok){
      setMsg("Failed to update guardian's data");
      setAlertType('error')
      setAlertTitle('Failed')
    }
  }

  useEffect(() => {
    getGuardianInfo()
  },[])

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto pb-5">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
          <div className="">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                  <div>
                      <div className="flex items-center gap-2">
                          <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/manage-users')} className='cursor-pointer' />
                          <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Edit Guardian's Data</p>
                      </div>
                      {/* <p className='text-[#4F4F4F]'>Set maximum amount that should be in a user’s wallet</p> */}
                  </div>
              </div>
              <div className='flex item-center justify-center flex-col w-[90%] lg:w-[40%] mx-auto gap-8'>
                <div className="">
                    <label className="block text-gray-700">Guardian's full name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="text"
                        name="fullName"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                <div>
                  <label className='block text-text-color text-left mb-2'>Guardian's image</label>
                  {
                      profileImage?.file?
                      <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                          <img src={profileImage?.file} alt="" className='absolute overflow-hidden h-[250px]'/>
                          <p className='text-text-color font-[600] mt-5 opacity-0'>Click to upload <span className='font-[400] text-[#475367]'></span> </p>
                          <p className='text-[#98A2B3] opacity-0'>PNG, JPG (max. 5mb)</p>
                          <div className='flex items-center gap-[15px] w-full mt-5 opacity-0'>
                              <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5] opacity-0'></div>
                              <p className='opacity-0'>OR</p>
                              <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5] opacity-0'></div>
                          </div>
                          <input onChange={(e) => handleFileUpload(e.target.files[0])} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                          <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto opacity-0'>Browse Files</button>
                      </div>
                      :
                      <div className='relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full' style={{ border:'1.5px dashed #D0D5DD' }}>
                          <img src="./images/file-upload.svg" alt="" />
                          <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367]'></span> </p>
                          <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                          <div className='flex items-center gap-[15px] w-full mt-5'>
                              <div className='w-[35%] ml-auto h-[2px] bg-[#F0F2F5]'></div>
                              <p>OR</p>
                              <div className='w-[35%] mr-auto h-[2px] bg-[#F0F2F5]'></div>
                          </div>
                          <input onChange={(e) => handleFileUpload(e.target.files[0])} type="file" className='cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]'/>
                          <button className='text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto'>Browse Files</button>
                      </div>
                  }
              </div>
              <div className="flex justify-between items-center mt-6">
                  <button onClick={() => navigate(`/guardian-profile/${id}`)} type="button" className="bg-white text-black border border-black py-2 px-4 rounded">
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
  </div>
  )
}

export default EditGuardian