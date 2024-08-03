import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'

const EditUnit = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allUnits, setAllUnits] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [toggleNav, setToggleNav] = useState(false)
    const [deleteUnit, setDeleteUnit] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        getUnitInfo()
    },[])

    async function getUnitInfo(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/units/${id}`,{
            headers:{
              'Authorization':`Bearer ${user.data.access_token}`
          }
        })
        const data = await res.json()
        console.log(data);
        if(res) setLoading(false)
        if(res.ok){
          setName(data?.data?.unit?.name);
          return;
        }
        if(!res.ok){
          setMsg(data.message);
          setAlertType('error');
          return;
        }
    }

    async function updateUnit(){
        if(!name){
          setMsg("Unit name is required!");
          setAlertType('error');
          return;
        }
        setLoading(true)
        console.log(JSON.stringify({name}));
        const res = await fetch(`${baseUrl}/units/${id}`,{
            method:"PUT",
            body: JSON.stringify({name}),
            headers:{
              "Content-Type":"application/json",
              'Authorization':`Bearer ${user.data.access_token}`
          }
        })
        const data = await res.json()
        if(res) setLoading(false)
        if(res.ok){
          setMsg(data.message);
          setAlertType('success');
          return;
        }
        if(!res.ok){
          setMsg(data.message);
          setAlertType('error');
          return;
        }
    }

    async function deleteUnitFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/units/${id}`,{
            method:"DELETE",
            body: JSON.stringify({name}),
            headers:{
              'Authorization':`Bearer ${user.data.access_token}`
          }
        })
        if(res) setLoading(false)
        if(res.ok){
          setMsg("Unit successfully deleted");
          setAlertType('success');
          setDeleteUnit(false);
          navigate('/units')
          return;
        }
        if(!res.ok){
          setMsg("An error occured please contact support");
          setAlertType('error');
          return;
        }
    }

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto pb-5">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
          <div className="">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                  <div className="flex items-center gap-2">
                      <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                      <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Update Unit</p>
                  </div>
                  <button onClick={() => setDeleteUnit(true)} className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]'>Delete Unit</button>
              </div>
              <div className='px-[10px] lg:px-[30px] max-w-[500px] mx-auto'>
                <div className='mb-5'>
                    <p className='text-[#19201D]'>Unit</p>
                    <input type="text" onChange={e => setName(e.target.value)} value={name} className='border py-3 px-3 rounded mt-1 w-full outline-none' placeholder='Enter unit name' />
                </div>
                {
                  loading ? 
                  <BtnLoader bgColor="#191f1c"/>
                  :
                  <button onClick={updateUnit} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Unit</button>
                }
              </div>
          </div>
      </div>
      {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
      }
      {
            deleteUnit &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-white" style={{ borderRadius:'10px' }}>
                    {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                    <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col text-center py-2">
                        <img src='./images/caution.svg' className='w-[60px]'/>
                        <p className='text-gray-500 text-[15px] mb-2 text-center my-6'>Are you sure you want to delete this unit?</p>
                        {
                          loading ? 
                          <BtnLoader bgColor="#191f1c"/>
                          :
                          <div className='flex items-center gap-4 mt-5'>
                              <button className="py-2 px-4 border border-[#1D1D1D] rounded-[8px] text-[14px] lg:w-auto w-full" onClick={() => setDeleteUnit(false)}>No</button>
                              <button className='bg-[#19201D] py-2 px-4 rounded-[4px] text-white text-[14px]' onClick={deleteUnitFn}>Yes</button>
                          </div>
                        }
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default EditUnit