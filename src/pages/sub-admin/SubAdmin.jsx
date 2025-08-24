import {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { BiChevronDown, BiQuestionMark } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';
import { BsQuestionCircle } from 'react-icons/bs';

const SubAdmin = ({baseUrl}) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleNav, setToggleNav] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || 1)); // Get the current page from the URL query params
  const  [modal, setModal] = useState()
  const  [removeSubAdminModal, setRemoveSubAdminModal] = useState()
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState()

  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage, searchParams]);

  async function getAllUsers(page){
    const res = await fetch(`${baseUrl}/users/get-users/staff?role=staff`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data);
    setAllUsers(data.data.users)
  }

  async function makeSubAdmin () {
    setLoading(true)
    const res = await fetch(`${baseUrl}/users/upgrade-to-subadmin`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        },
        body:JSON.stringify({ userId: modal })
    })
    const data = await res.json()
    console.log(data);
    if(res) setLoading(false)
    if(!res.ok){
        setAlertType('error');
        setMsg(data.message)
        return;
      }
      if(res.ok){
        setAlertType('success');
        setMsg(data.message)
        setModal('')
        getAllUsers()
        return;
    }
  }

  async function removeSubAdmin () {
    setLoading(true)
    const res = await fetch(`${baseUrl}/users/upgrade-to-subadmin`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        },
        body:JSON.stringify({ userId: removeSubAdminModal })
    })
    const data = await res.json()
    console.log(data);
    if(res) setLoading(false)
    if(!res.ok){
        setAlertType('error');
        setMsg(data.message)
        return;
      }
      if(res.ok){
        setAlertType('success');
        setMsg(data.message)
        setRemoveSubAdminModal('')
        getAllUsers()
        return;
    }
  }

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] bg-[#F2FCF7] ml-auto">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
          <div className="lg:px-[30px] px-[10px] py-[1rem]">
            <div className="flex items-center justify-between mb-[3rem]">
              <p className="text-[22px] lg:text-[28px] text-primary-color font-[600]">Sub Admins</p>
            </div>
          </div>

          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-left">
                  <thead class="text-[12px] md:text-[14px] border-b">
                      <tr>
                          <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Role</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Is Sub Admin</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                          {/* 
                          <th scope="col" class="px-6 py-3 font-[700]">Date Added</th>
                           */}
                      </tr>
                  </thead>
                  <tbody>
                      {
                        allUsers && allUsers?.map((user, index) => {
                            return(
                                <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                    <td class="px-6 py-4">{index +1}</td>
                                    <td class="px-6 py-4 flex items-center gap-1">
                                      <img src={user.profileImage.file} className='lg:w-[16px] lg:h-[16px] w-[30px] h-[30px] rounded-full' alt={`${user.fullName} img`} />
                                      <p className='text-[12px] md:text-[16px]'>{user.fullName}</p>
                                    </td>
                                    <td class="px-6 py-4 capitalize text-[12px] md:text-[16px]">{user.role}</td>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px] capitalize">{user?.subAdmin.toString()}</td>
                                    {
                                      user?.subAdmin === true ?
                                      <button className='text-white bg-primary-color px-4 py-2 rounded-[4px] text-[12px] mx-1' onClick={() => setRemoveSubAdminModal(user._id)}>Remove Sub Admin</button>
                                      :
                                      <button className='text-white bg-secondary-color px-4 py-2 rounded-[4px] text-[12px] mx-1' onClick={() => setModal(user._id)}>Make Sub Admin</button>
                                    }
                                    {/* <td class="px-6 py-4 flex items-center gap-1">
                                      <img src={user.profileImage.file} className='lg:w-[16px] lg:h-[16px] w-[30px] h-[30px] rounded-full' alt={`${user.fullName} img`} />
                                      <p className='text-[12px] md:text-[16px]'>{user.fullName}</p>
                                    </td>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px]">{formatDate(user.createdAt)}</td>
                                    <td className='flex'>
                                      <button className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]' onClick={() => {
                                        if(user.role === "student"){
                                          navigate(`/user/${user._id}`)
                                        }else if(user.role === "staff") {
                                          navigate(`/staff/${user._id}`)
                                        }else if(user.role === "guardian") {
                                          navigate(`/guardian-profile/${user._id}`)
                                        }
                                      }}>View</button>
                                    </td> */}
                                </tr>
                            )
                        })
                      }
                  </tbody>
              </table>
          </div>
        </div>
        { modal && 
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {
                setModal('')
                }}>
              </div>
              <div className="flex items-center flex-col text-center justify-center gap-3 bg-white md:w-[450px] w-[95%] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                  <BsQuestionCircle className='text-[50px]'/>
                  <p className='text-text-color font-[500]'>Make Sub Admin?</p>
                  <p className='text-[#6F7975] text-[14px]'>Are you sure, you want to make this user a sub admin?</p>
                  {
                    loading ?
                    <BtnLoader />
                    :
                    <div className='flex gap-5 items-center justify-center'>
                      <button className='text-white bg-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[10px] text-center mx-auto' onClick={makeSubAdmin} >Proceed</button>
                      <button className='text-primary-color border border-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[10px] text-center mx-auto' onClick={() => setModal('')} >Cancel</button>
                    </div>
                  }
              </div>
          </>
        }
        { removeSubAdminModal && 
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {
                setRemoveSubAdminModal('')
                }}>
              </div>
              <div className="flex items-center flex-col text-center justify-center gap-3 bg-white md:w-[450px] w-[95%] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                  <BsQuestionCircle className='text-[50px]'/>
                  <p className='text-text-color font-[500]'>Remove Sub Admin?</p>
                  <p className='text-[#6F7975] text-[14px]'>Are you sure, you want to remove this user as a sub admin?</p>
                  {
                    loading ?
                    <BtnLoader />
                    :
                    <div className='flex gap-5 items-center justify-center'>
                      <button className='text-white bg-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[10px] text-center mx-auto' onClick={removeSubAdmin} >Proceed</button>
                      <button className='text-primary-color border border-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[10px] text-center mx-auto' onClick={() => setRemoveSubAdminModal('')} >Cancel</button>
                    </div>
                  }
              </div>
          </>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default SubAdmin