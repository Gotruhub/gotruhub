import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import { FiChevronDown } from "react-icons/fi";

const GuardianProfile = ({baseUrl}) => {


  const navigate = useNavigate()
  const { semester } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [semesterInfo, setSemesterInfo] = useState([])
  const [msg, setMsg] = useState('')
  const [chosenTerm, setChosenTerm] = useState('')
  const [alertType, setAlertType] = useState()
  const { id } = useParams()
  console.log(id, `${baseUrl}/users/get-user/${id}`);
  const [userProfile, setUserProfile] = useState({})
  const [children, setChildrenProfiles] = useState([])
  const [toggleNav, setToggleNav] = useState(false)

  async function getUserInfo(){
    const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
        headers:{
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    setUserProfile(data?.data?.user)
    console.log(data);
    // setFullName(data?.data?.user?.fullName)
    // setSelectedUnit(data?.data?.user?.piviotUnit?.name)
    // setSelectedSubUnit(data?.data?.user?.subUnit?.name)
    // setProfileImage(data?.data?.profileImage)
    // setRegNum(data?.data?.user?.regNum)
    // setGuardians(data?.data?.user?.guardians?._id)
    console.log(data?.data?.user?.guardians?.children)
    // const childrenIds = ['662e3418cb09e06e8de6e4f4', '662e3430cb09e06e8de6e4fe'];
        getChildProfiles(data?.data?.user?.guardians?.children).then(profiles => {
            setChildrenProfiles(profiles);
        });
    }

    useEffect(() => {
        getUserInfo()
    },[])


    async function getChildProfiles(childrenIds) {
        const childProfiles = [];
      
        for (let i = 0; i < childrenIds.length; i++) {
          const childId = childrenIds[i];
          try {
            const response = await fetch(`${baseUrl}/users/get-user/${childId}`,{
                headers:{
                    Authorization:`Bearer ${user.data.access_token}`
                }
            });
            console.log(`${baseUrl}/users/get-user/${childId}`);
            if (!response.ok) {
              throw new Error(`Error fetching profile for child ID: ${childId}`);
            }
            const profileData = await response.json();
            console.log(profileData);
            // setChildProfiles(profileData)
            childProfiles.push(profileData);
          } catch (error) {
            console.error(error);
          }
        }
      
        return childProfiles;
      }


  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/manage-users')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">{userProfile?.fullName}</p>
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-semester/${sessionInfo[0]?.sessionId?._id}`)}>Create Semester</button>
                    </div> */}
                </div>
                <div className='gradient-bg p-5 mb-[5rem] h-[150px] relative'>
                    <img src={userProfile?.profileImage?.file} alt="" className='w-[120px] absolute bottom-[-50px] h-[120px] object-cover rounded-full'/>
                </div>
                <div className='w-[90%] rounded-md shadow-md p-5 mx-auto'>
                    <div className="flex justify-between">
                        <div className='flex items-center gap-3 mb-5 font-[600]'>
                            <img src="./images/frame-user.svg" alt="" className='w-[22px]'/>
                            <p>Guardian profile data</p>
                        </div>
                        <img src="./images/edit.svg" alt="" className='cursor-pointer' onClick={() => navigate(`/edit-guardian/${id}`)} />
                    </div>
                    <div className='flex items-center md:gap-5 flex-col md:flex-row mt-5'>
                        <div className="w-full" style={{marginBottom:"30px"}}>
                            <p style={{marginBottom:"5px"}}>Guardian’s full name</p>
                            <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                <input
                                    className='w-full text-[#19201d] outline-none bg-transparent'
                                    type='text'
                                    value={userProfile?.fullName}
                                />
                            </div>
                        </div>
                        <div className="w-full" style={{marginBottom:"30px"}}>
                            <p style={{marginBottom:"5px"}}>Email</p>
                            <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                <input
                                    className='w-full text-[#19201d] outline-none bg-transparent'
                                    type='text'
                                    value={userProfile?.email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center md:gap-5 flex-col md:flex-row'>
                        <div className="w-full" style={{marginBottom:"30px"}}>
                            <p style={{marginBottom:"5px"}}>Role</p>
                            <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                <input
                                    className='w-full text-[#19201d] outline-none bg-transparent'
                                    type='text'
                                    value="Guardian"
                                />
                            </div>
                        </div>
                        <div className="w-full" style={{marginBottom:"30px"}}>
                            <p style={{marginBottom:"5px"}}>Ward</p>
                            <div className="border w-full rounded-[4px] flex items-center justify-between px-4 py-3">
                                <input
                                    className='w-full text-[#19201d] outline-none bg-transparent'
                                    type='text'
                                    value={userProfile?.children?.length}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[90%] mx-auto mt-12'>
                    <p className='text-[#19201D] font-[600] mb-3'>Ward Profile Data</p>
                    <div className='grid md:grid-cols-2 gap-10'>
                        {
                            userProfile?.children?.map(child => (

                                <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl mb-10 w-full">
                                    <div className="p-8">
                                        <div className="flex items-center justify-center mb-5">
                                            <img className="h-[120] w-[120px] rounded-full object-cover" src={child?.profileImage?.file} alt="Profile" />
                                        </div>
                                        <div className="text-center">
                                        <div className="flex justify-between">
                                            <div className="text-lg font-semibold flex items-center gap-3">
                                                {/* <img src={child?.data?.user?.profileImage.file} alt="" /> */}
                                                <p>Ward data</p>
                                            </div>
                                            <img src="./images/edit.svg" alt="" className='cursor-pointer' onClick={() => navigate(`/profile-edit/${child._id}`)} />
                                        </div>

                                        <div className="mt-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Full name</span>
                                                <span className="font-medium">{child?.fullName}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-6">
                                                <span className="text-gray-600">Unit/Sub-unit</span>
                                                <span className="font-medium">{child?.piviotUnit?.name} / {child?.subUnit?.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-6">
                                                <span className="text-gray-600">Role</span>
                                                <span className="font-medium">{child?.role}</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GuardianProfile