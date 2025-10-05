import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'
import { IoCloseOutline } from 'react-icons/io5'

const EditStaff = ({baseUrl}) => {

  const navigate = useNavigate()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [staff, setStaff] = useState({})
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState()
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState()
  const [loading, setLoading] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [fileUploadLoader, setfileUploadLoader] = useState(false)
  const [toggleNav, setToggleNav] = useState(false)
  const [modal, setModal] = useState(false)
  const [monitor, setMonitor] = useState(false);
  const [pass, setPass] = useState(false);
  const [trade, setTrade] = useState(false);
  const [appPermissions, setAppPermissions] = useState([])

  // Helper function to handle checkbox changes
  const handlePermissionChange = (permission, isChecked) => {
    if (isChecked) {
      // Add permission if not already in array
      if (!appPermissions.includes(permission)) {
        setAppPermissions([...appPermissions, permission]);
      }
    } else {
      // Remove permission from array
      setAppPermissions(appPermissions.filter(p => p !== permission));
    }
  };
  

  async function getStaffInfo(){
    const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
      headers:{
          Authorization:`Bearer ${user.data.access_token}`
      }
    })
    const data = await res.json()
    const userData = data?.data?.user;
    
    setStaff(userData)
    setProfileImage(userData?.profileImage)
    setEmail(userData?.email)
    setFullName(userData?.fullName)
    
    // Auto-populate appPermissions array
    const permissions = userData?.appPermissions || [];
    setAppPermissions(permissions);
    
    console.log(userData);
  }

  async function handleFileUpload(file){

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    if(file.size > maxSizeInBytes){
        setMsg("File size should not exceed 5MB");
        setAlertType('error')
        setAlertTitle('Failed')
        return
    }
    
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
      body:JSON.stringify({fullName, profileImage:profileImage?._id})
    })
    const data = await res.json()
    if(res) setLoading(false)
      if(res.ok) {
        setMsg("Staff's data updated successfully");
        setAlertType('success');
      }
      if(!res.ok){
        setMsg("Staff's data wasn't updated successfully");
        setAlertType('error');
      }
      console.log(data);
  }

  async function updatePermissions(e){
    console.log({appPermissions:appPermissions});
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${baseUrl}/users/staff/${id}/app-permissions`,{
      method:"PUT",
      headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${user.data.access_token}`
      },
      body:JSON.stringify({appPermissions:appPermissions})
    });
    const data = await res.json();
    if(res) setLoading(false);
      if(res.ok) {
        setMsg("Staff's permissions updated successfully");
        setAlertType('success');
        setModal(false);
        getStaffInfo(); // Refresh staff info to reflect changes
      }
      if(!res.ok){
        setMsg("Staff's permissions wasn't updated successfully");
        setAlertType('error');
      }
      console.log(data);
  }

  useEffect(() => {
    getStaffInfo()
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
                          <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Edit Staff's Data</p>
                      </div>
                      {/* <p className='text-[#4F4F4F]'>Set maximum amount that should be in a user’s wallet</p> */}
                  </div>
                  <button onClick={() => setModal(true)} className='bg-primary-color text-white py-2 px-4 rounded-md'>Staff Permission</button>
              </div>
              <div className='flex item-center justify-center flex-col w-[90%] lg:w-[40%] mx-auto gap-8'>
                <div className="">
                    <label className="block text-gray-700">Staff's full name</label>
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
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <input
                        type="text"
                        name="fullName"
                        value={staff?.role}
                        className="mt-1 p-2 border rounded w-full capitalize"
                    />
                </div>
                <div>
                  <label className='block text-text-color text-left mb-2'>Staff's image</label>
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
                  <button onClick={() => navigate(`/manage-users`)} type="button" className="bg-white text-black border border-black py-2 px-4 rounded">
                      Back
                  </button>
                  {
                      loading ? 
                      <BtnLoader bgColor="#191f1c"/>
                      :
                      <button type="submit" onClick={handleSubmit} className="bg-primary-color text-white py-2 px-4 rounded">Save changes</button>
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

      {
          modal &&
          <div>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
              <div className="bg-white sm:max-w-[650px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                  <div className="flex items-center justify-between border-b pb-[5px]">
                      <p className="text-[px]">Update Staff Permission</p>
                      <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                  </div>
                  <div className='flex items-center gap-[6rem] w-full px-5 py-[1.5rem] text-center justify-center'>
                    <div className='flex items-center gap-2'>
                      <input 
                        type="checkbox" 
                        checked={appPermissions.includes('monitor')}
                        onChange={(e) => handlePermissionChange('monitor', e.target.checked)}
                      />
                      <p>Monitor</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <input 
                        type="checkbox" 
                        checked={appPermissions.includes('pass')}
                        onChange={(e) => handlePermissionChange('pass', e.target.checked)}
                      />
                      <p>Pass</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <input 
                        type="checkbox" 
                        checked={appPermissions.includes('trade')}
                        onChange={(e) => handlePermissionChange('trade', e.target.checked)}
                      />
                      <p>Trade</p>
                    </div>
                  </div>
                  {
                      loading ? 
                      <BtnLoader bgColor="#191f1c"/>
                      :
                      <div className='flex items-center gap-5 justify-center'>
                          <button onClick={() => setModal(false)} className=' border border-primary-color bg-white w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Cancel</button>
                          <button onClick={updatePermissions} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Confirm</button>
                      </div>
                  }
              </div>
          </div>
      }

      {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
      }

  </div>
  )
}

export default EditStaff