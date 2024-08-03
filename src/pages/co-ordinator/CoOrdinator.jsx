import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronDownOutline, IoWalletOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdInformationCircleOutline } from 'react-icons/io';
import BtnLoader from '../../components/btn-loader/BtnLoader';

const CoOrdinator = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [dropDown, setDropDown] = useState()
    const [allStaffs, setAllStaffs] = useState([])
    const [selectedStaff, setSelectedStaff] = useState()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    async function getBankAccountDetails(){
        const res = await fetch(`${baseUrl}/bank`,{
            headers:{
                'Authorization': `Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data)
    }

    useEffect(() => {
        getBankAccountDetails()
        getAllStaffs()
    },[])

    async function getAllStaffs(){
        const res = await fetch(`${baseUrl}/users/get-users/staff?role=staff`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.users);
        setAllStaffs(data.data.users)
    }

    async function addCoOrdinator(){
        console.log({staff:selectedStaff._id});
    }

  return (
    <div>
        <SideNav />
        <div className="w-[78%] ml-auto pb-5 h-[100vh]">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/view-sub-unit/${id}`)} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Coordinator</p>
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/update-bank-account')}>Update Account</button>
                    </div> */}
                </div>
                <div className='flex item-center justify-center flex-col w-[50%] mx-auto gap-8'>
                    <div>
                        <p className='text-[#19201D] mb-1'>Curernt coordinator</p>
                        <p className='border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>Frank nd Glory</p>
                    </div>
                    <div>
                        <div className='relative w-full'>
                            <p className='text-[#19201D] mb-1'>Sub-unit coordinator</p>
                            <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                <input type="text" value={selectedStaff?.fullName} placeholder='Select coordinator' className='outline-none rounded-[4px] bg-transparent w-full'/>
                                <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setDropDown(dropDown === 'co-ordinator' ? false : "co-ordinator")}/>
                            </div>
                            {dropDown === 'co-ordinator' &&
                                <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                    {
                                        allStaffs?.map(stf => (
                                            <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                setDropDown(false)
                                                setSelectedStaff(stf)
                                            }}>
                                                <p className='text-[#1D1D1D] capitalize text-[12px]'>{stf.fullName}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className='text-[#865C1D] text-[14px] flex items-center gap-1 mt-[-30px] mb-4'>
                            <IoMdInformationCircleOutline />
                            <p>Each assignment costs NGN 100</p>
                        </div>

                        {
                            loading ? 
                            <BtnLoader bgColor="#191f1c"/>
                            :
                            <button onClick={addCoOrdinator} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Update coordinator</button>
                        }
                </div>
            </div>
        </div>
    </div>
  )
}

export default CoOrdinator