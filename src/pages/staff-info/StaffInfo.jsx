import React from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'

const StaffInfo = () => {

  const navigate = useNavigate()

  return (
    <div>
      <SideNav />
      <div className="w-[78%] ml-auto pb-5">
          <TopNav />
          <div className="">
              <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                  <div className="flex items-center gap-2">
                      <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                      <p className="text-[28px] text-primary-color font-[600]">Attendance Grading - Monitor Source</p>
                  </div>
                  <div className='flex items-center gap-5'>
                      <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => navigate('/wallet-restriction')}>Reset to default</button>
                  </div>
              </div>
              <div>

              </div>
          </div>
      </div>
  </div>
  )
}

export default StaffInfo