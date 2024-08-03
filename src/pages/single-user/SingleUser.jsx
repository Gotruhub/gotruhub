import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import ProfileCard from '../../components/guardian-card/GuardianCard';
import MemberProfile from '../../components/member-profile/MemberProfile';

const SingleUser = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState()
    const [toggleNav, setToggleNav] = useState(false)
    const [passSummary, setPassSummary] = useState()
    const [walletSummary, setWalletSummary] = useState()

    async function getUserInfo(){
        const res = await fetch(`${baseUrl}/users/get-user/${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setCurrentUser(data.data)
        console.log(data.data.user)
    }

    async function getUserPassSummary(){
        const res = await fetch(`${baseUrl}/pass-summary?userId=${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setPassSummary(data.data)
        console.log(data)
    }

    async function getWalletSummary(){
        const res = await fetch(`${baseUrl}/wallet-summary/${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        setWalletSummary(data.data)
        console.log(data)
    }

    useEffect(() => {
        getUserPassSummary()
        getWalletSummary()
        getUserInfo()
    },[])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
          <div className="">
            <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                <div className="flex items-center gap-2">
                    <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/manage-users')} className='cursor-pointer' />
                    <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">{currentUser && currentUser.user.fullName}</p>
                </div>
                <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate(`/student-id/${id}`)}>Student Id</button>
            </div>
            {
                currentUser &&
                <MemberProfile currentUser={currentUser} walletSummary={walletSummary} passSummary={passSummary} id={id}/>
            }
          </div>
        </div>
    </div>
  )
}

export default SingleUser