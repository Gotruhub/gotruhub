import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import { FiChevronDown } from "react-icons/fi";
import { BiPencil, BiTrash } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';


const SessionInfo = ({baseUrl}) => {

  const navigate = useNavigate()
  const { session } = useParams()

  console.log(session);
  const user = JSON.parse(localStorage.getItem('user'))
  const [sessionInfo, setSessionInfo] = useState([])
  const [msg, setMsg] = useState('')
  const [chosenTerm, setChosenTerm] = useState('')
  const [alertType, setAlertType] = useState()
  const [toggleNav, setToggleNav] = useState(false)
  const [deleteSemester, setDeleteSemester] = useState(false)
  const [loading, setLoading] = useState(false)

  async function getSessionInfo(){
    const res = await fetch(`${baseUrl}/term/${session}`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data);
    console.log(data.data);
    if(!res.ok){
        setMsg(data.message);
        setAlertType('error');
        return;
    }
    if(res.ok){
        setSessionInfo(data.data);
        setAlertType('success');
        return;
    }
  }

  useEffect(() => {
    getSessionInfo()
  },[])

  const deleteSemesterFn = async (semesterId) => {
    setLoading(true);
    try {
        const res = await fetch(`${baseUrl}/term/single/${semesterId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.data.access_token}` }
        });
        // const data = await res.json();
        // if (!res.ok) throw new Error(data.message);

      setDeleteSemester(false);
      setMsg('Semester deleted successfully');
      setAlertType('success');
      getSessionInfo();
    } catch (error) {
        setMsg(error.message);
        setAlertType('error');
    } finally {
        setLoading(false);
    }
}

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto pb-5">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
          <div className="bg-[#F7F7F7]">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                  <div className="flex items-center gap-2">
                      <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/calendar')} className='cursor-pointer' />
                      <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">{sessionInfo[0]?.sessionId.name} Session</p>
                  </div>
                  <div className='flex items-center gap-5'>
                      <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/create-semester/${session}`)}>Create Semester</button>
                  </div>
              </div>
              <div className='px-[10px] lg:px-[30px]'>
                  <p className='text-[#19201D] text-[18px] font-[600] mb-3'>Session Info</p>
                  {
                      sessionInfo.length < 1 &&
                      <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                          <p>There is no information about this session at the moment. you can use the button above to create a semester </p>
                      </div>
                  }
                  {
                      sessionInfo && sessionInfo.map((session) => (
                        <div className='p-3 shadow rounded-[8px] my-4 bg-white'>
                          <div className='flex items-center justify-between'>
                              <p>{session.name}</p>
                              <div className='flex gap-2 items-center'>
                                <BiPencil onClick={() => navigate(`/update-semester/${session._id}`)} className='cursor-pointer'/>
                                <BiTrash onClick={() => setDeleteSemester(session._id)} className='cursor-pointer'/>
                                <FiChevronDown className='text-[22px] cursor-pointer' onClick={() => setChosenTerm(session._id)}/>
                              </div>
                              {/* <button onClick={() => navigate(`/create-semester/${session._id}`)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>View</button> */}
                          </div>
                          {
                            chosenTerm === session._id &&
                            <div className='border-t mt-3'>
                              <div className='mt-2 flex items-center justify-between'>
                                <p>Start Date:</p>
                                <p>{new Date(session.startDate).toString().split(" ").slice(0, 4).join(" ")}</p>
                              </div>
                              <div className='mt-2 flex items-center justify-between'>
                                <p>End Date:</p>
                                <p>{new Date(session.endDate).toString().split(" ").slice(0, 4).join(" ")}</p>
                              </div>
                              <div className='mt-2 flex items-center justify-between'>
                                <p>Session Type:</p>
                                <p>{session.sessionType}</p>
                              </div>
                            </div>
                          }
                        </div>
                      )).reverse()
                  }
              </div>
          </div>
      </div>
      {
          deleteSemester &&
          <div>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteSemester(false)}></div>
              <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                  <div className="flex items-center justify-between border-b pb-[5px]">
                      <p className="text-[px]">Delete Session</p>
                      <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteSemester(false)}/>
                  </div>
                  <div className='mt-5 text-center'>
                      Are you sure, you want to delete this semester/term?
                  </div>
                  {
                      loading ? 
                      <BtnLoader bgColor="#191f1c"/>
                      :
                      <button onClick={() => deleteSemesterFn(deleteSemester)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                  }
              </div>
          </div>
      }
      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
  </div>
  )
}

export default SessionInfo