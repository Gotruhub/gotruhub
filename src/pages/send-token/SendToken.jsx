import React, { useState, useEffect } from 'react'
import AlertModal from '../../components/alert-modals/AlertModal'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate, useParams } from 'react-router-dom'
import SendTokenModal from '../../components/send-token-modal/SendTokenModal'

const SendToken = ({baseUrl}) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertTitle, setAlertTitle] = useState('Confirm')
    const [alertType, setAlertType] = useState('success')
    const [sendTokenModal, setSendTokenModal] = useState(false)
    const [allGuardians, setAllGuardians] = useState([])
    const [selectedGuardians, setSelectedGuardians] = useState([])
    const [planInfo, setPlanInfo] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    async function getAllGuardians(){
      const res = await fetch(`${baseUrl}/users/get-users/guardian`,{
          headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${user.data.access_token}`
          }
      })
      const data = await res.json()
      console.log(data.data.users);
      setAllGuardians(data.data.users)
    }

    async function getPlanInfo(){
      const res = await fetch(`${baseUrl}/plan/single/${id}`,{
          headers:{
              Authorization:`Bearer ${user.data.access_token}`
          }
      })
      const data = await res.json()
      console.log(data.data);
      setPlanInfo(data.data)
    }

    useEffect(() => {
        getPlanInfo()
        getAllGuardians()
        setMsg("You can only send a maximum of six(6) tokens to a single user at a time and collectively, you can only select 10 members at once to send tokens to")
        setAlertTitle("Notice!")
    },[])

    const handleCheckboxChange = (guardianId) => {
      if (selectedGuardians.some(guardian => guardian.id === guardianId)) {
        setSelectedGuardians(selectedGuardians.filter((guardian) => guardian.id !== guardianId));
      } else {
        setSelectedGuardians([...selectedGuardians, { id: guardianId, quantity: 1 }]);
      }
    };

    const handleQuantityChange = (guardianId, newQuantity) => {
      setSelectedGuardians(selectedGuardians.map((guardian) =>
        guardian.id === guardianId ? { ...guardian, quantity: newQuantity } : guardian
      ));
    };

    async function sendToken(){
      const tokenData = selectedGuardians.map((guardian) => ({
        user: guardian.id,
        quantity: guardian.quantity
      }));

      console.log({
        users: tokenData,
        plan: planInfo._id
      });

      setIsLoading(true)
      const res = await fetch(`${baseUrl}/tokens/send-token`,{
          headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${user.data.access_token}`
          },
          method:'POST',
          body:JSON.stringify({
            users: tokenData,
            plan: planInfo._id
          })
      })
      const data = await res.json()
      if(res) setIsLoading(false)
      console.log(data);
      if(res.ok){
        getPlanInfo()
        setSendTokenModal(false)
        setAlertTitle('Successfull')
        setAlertType('success')
        setMsg('The tokens have been successfully sent to the selected members. This process may take about 48 hours to show up in their registered email address.')
      }else{
        setMsg(data.message)
        setSendTokenModal(false)
        setAlertType('error')
        setAlertTitle('Failed')
      }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                      <div>
                        <>
                          <div className='flex items-center gap-2'>
                            <div className='flex gap-3'>
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/token')} className='cursor-pointer' />
                            {
                              planInfo && planInfo?.subscriptionType?.feature?.length > 1 
                              ? planInfo.subscriptionType.feature.map((ft, i) => 
                                <div className="flex items-center gap-2" key={i}>
                                  <p className="text-[24px] text-primary-color font-[600]">{ft.name}</p>
                                  {i < planInfo.subscriptionType.feature.length - 1 && <span> + </span>}
                                </div>
                              )
                                :
                                <p className="text-[24px] text-primary-color font-[600]">{planInfo?.subscriptionType?.feature[0].name}</p>
                            }
                          </div>
                          {
                            planInfo && 
                            <p className='text-[20px] text-gray-500'>({planInfo?.subscriptionType?.duration})</p>
                          }
                          </div>
                        </>
                        {
                          planInfo && 
                          <p className='ml-9 text-[14px] text-gray-500'>Tokens Left: {planInfo.quantityLeft}</p>
                        }
                      </div>
                    </div>
                    <button 
                      className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => {
                        setAlertTitle('Confirm')
                        setAlertType('success')
                        setSendTokenModal(`By clicking the confirm button, ${selectedGuardians.length} token(s) will be sent to the selected members email.`)
                    }}>Send Token
                    </button>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-left">
                        <thead className="text-[14px] border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3 th1 font-[700]">S/N</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Profile Pic</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Name</th>
                                <th scope="col" className="px-6 py-3 font-[700]">Email</th>
                                <th>Select Member</th>
                                <th>Number of tokens</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              allGuardians.map((sub, index) => {
                                  const selectedGuardian = selectedGuardians.find((guardian) => guardian.id === sub._id);
                                  const quantity = selectedGuardian ? selectedGuardian.quantity : 1;
                                  return(
                                      <tr key={sub._id} style={{borderBottom:"1px solid #dcdcdc"}}>
                                          <td className="px-6 py-4">{index +1}</td>
                                          <td className="px-6 py-4">
                                            <img className='w-[30px] h-[30px] rounded-full' src={sub.profileImage.file} alt={`${sub.fullName} img`} />
                                          </td>
                                          <td className="px-6 py-4">{sub.fullName}</td>
                                          <td className="px-6 py-4">{sub.defaultEmail}</td>
                                          <td>
                                            <input type="checkbox" checked={!!selectedGuardian} onChange={() => handleCheckboxChange(sub._id)} />
                                          </td>
                                          <td>
                                            <input 
                                              type="text" 
                                              className='w-[50px] outline-none border p-1 rounded text-center' 
                                              value={quantity} 
                                              onChange={e => handleQuantityChange(sub._id, Number(e.target.value))}
                                              disabled={!selectedGuardian}
                                            />
                                          </td>
                                      </tr>
                                  )
                              })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {
            sendTokenModal &&
            <SendTokenModal isLoading={isLoading} sendToken={sendToken} sendTokenModal={sendTokenModal} alertType={alertType} alertTitle={alertTitle} setSendTokenModal={setSendTokenModal}/>
        }

        {
            msg &&
            <AlertModal msg={msg} setAlertType={setAlertType} setAlertTitle={setAlertTitle} alertType={alertType} setMsg={setMsg} alertTitle={alertTitle}/>
        }
        
    </div>
  )
}

export default SendToken
