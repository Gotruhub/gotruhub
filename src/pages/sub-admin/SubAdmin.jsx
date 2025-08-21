import {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { BiChevronDown } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';

const SubAdmin = ({baseUrl}) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleNav, setToggleNav] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || 1)); // Get the current page from the URL query params

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
                          {/* <th scope="col" class="px-6 py-3 font-[700]">Email</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Date Added</th>
                          <th scope="col" class="px-2 py-3 font-[700]">Action</th> */}
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
                                    {/* <td class="px-6 py-4 flex items-center gap-1">
                                      <img src={user.profileImage.file} className='lg:w-[16px] lg:h-[16px] w-[30px] h-[30px] rounded-full' alt={`${user.fullName} img`} />
                                      <p className='text-[12px] md:text-[16px]'>{user.fullName}</p>
                                    </td>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px]">{user.email ? user.email : "N/A"}</td>
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
                                      <button className='text-white bg-red-400 px-4 py-2 rounded-[4px] text-[12px] mx-1' onClick={() => setDeleteUser(user._id)}>Delete</button>
                                    </td> */}
                                </tr>
                            )
                        })
                      }
                  </tbody>
              </table>
          </div>
        </div>
    </div>
  )
}

export default SubAdmin