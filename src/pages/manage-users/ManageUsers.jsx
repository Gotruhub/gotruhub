import {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { BiChevronDown } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';

const ManageUsers = ({baseUrl}) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleNav, setToggleNav] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || 1)); // Get the current page from the URL query params

  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage, searchParams]);

  async function getAllUsers(page){
    
    const res = await fetch(`${baseUrl}/users/get-users/role?page=${page}`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data);
    setAllUsers(data.data.users)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const userType = ["All", "student", "guardian", "staff"]
  const [selectedUserType, setSelectedUserType] = useState(userType[0])
  const [dropDown, setDropDown] = useState(false)

  async function fetchSelecteduser(userType){
    console.log(userType);
    setSelectedUserType(userType)
    setDropDown(false)
    if(userType === "All") return getAllUsers()
    // ${baseUrl}/users/get-users/student?role=student
    const res = await fetch(`${baseUrl}/users/get-users/${userType}?role=${userType}`,{
      headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${user.data.access_token}`
      }
    })
    const data = await res.json()
    setAllUsers(data.data.users)
    console.log(res, data.data.users);
  }

  async function deleteUserFn(){
    setLoading(true)
    const res = await fetch(`${baseUrl}/users/get-user/${deleteUser}`, {
      method: 'DELETE',
      headers: {
          Authorization:`Bearer ${user.data.access_token}`
      }
    })
    if(res) setLoading(false)
    if(!res.ok){
      setMsg("Error occured, while deleting user");
      setAlertType('error');
      return;
    }
    setMsg("User deleted successfully");
    setAlertType('success');
    setDeleteUser(false)
    getAllUsers()
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage); // Update the currentPage state
      setSearchParams({ page: prevPage }); // Update the URL query param
    }
  };
  
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage); // Update the currentPage state
    setSearchParams({ page: nextPage }); // Update the URL query param
  };
  


  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] bg-[#F2FCF7] ml-auto">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
          <div className="lg:px-[30px] px-[10px] py-[1rem]">
            <div className="flex items-center justify-between mb-[3rem]">
              <p className="text-[22px] lg:text-[28px] text-primary-color font-[600]">Manage Users</p>
              <div className="flex items-center gap-3">
                <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/create-user')} >Create User</button>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between lg:px-[30px] px-[10px] mb-10'>
            {/* <input type="text" name="" id="" /> */}
            <div className='flex items-center gap-2'>
              <p>Select User Type:</p>
              <div className='cursor-pointer border rounded-[4px] p-[6px] relative w-[130px]'>
                <div className='flex items-center justify-between' onClick={() => setDropDown(!dropDown)}>
                  <p className='capitalize'>{selectedUserType}</p>
                  <BiChevronDown />
                </div>
                {
                  dropDown &&
                  <div className='rounded-[4px] border absolute left-0 top-[45px] bg-white z-[10] w-[130px]'>
                    {
                      userType?.map((type, index) => {
                        return (
                          <p className='text-[14px] p-2 hover:bg-gray-100 capitalize' onClick={() => { 
                            fetchSelecteduser(type)
                          }}>{type}</p>
                        )
                      })
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-left">
                  <thead class="text-[12px] md:text-[14px] border-b">
                      <tr>
                          <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Email</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Role</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Date Added</th>
                          <th scope="col" class="px-2 py-3 font-[700]">Action</th>
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
                                    <td class="px-6 py-4 text-[12px] md:text-[16px]">{user.email ? user.email : "N/A"}</td>
                                    <td class="px-6 py-4 capitalize text-[12px] md:text-[16px]">{user.role}</td>
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
                                    </td>
                                </tr>
                            )
                        })
                      }
                  </tbody>
              </table>
                        {/* Pagination Buttons */}
              <div className="flex justify-end gap-5 p-6 items-center mt-5">
                <button
                  onClick={handlePreviousPage}
                  className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px] text-[12px]'
                >
                  Next
                </button>
              </div>
              {/* <ReactPaginate
                  previousLabel={'Prev'}
                  nextLabel = {'Next'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName='flex items-center gap-9 mt-5 justify-end pr-[30px] paginationBtns'
                  activeClassName='bg-secondary-color text-white'
                  disabledClassName='bg-gray-500 cursor-not-allowed'
              /> */}
          </div>
        </div>
        {
            deleteUser &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteUser(false)}></div>
                <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete User</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteUser(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this user?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteUserFn(deleteUser)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
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

export default ManageUsers