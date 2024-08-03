import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const Register = () => {

  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className='w-[100%] mx-auto my-[4rem]'>
        <div className='md:w-[60%] mx-auto'>
          <p className='text-[20px] md:text-[28px] mb-[40px] text-center px-4'>What type of organization are you registering?</p>
        <p className='mb-[3rem] text-center'>Already have an account? <span className='text-secondary-color cursor-pointer' onClick={() => navigate('/login')}>Login</span> </p>
          <div className='border rounded-[4px] px-4 py-3 md:w-[80%] w-[95%] mx-[auto] cursor-pointer' onClick={() => navigate('/register-organization')}>
            <p className='text-[#19201D] font-[600] sm:text-[26px]'>Registered Organizations</p>
            <p className='text-[#6F7975] mt-4'>Companies with Registered CAC</p>
          </div>
          <div className='border rounded-[4px] px-4 py-3 md:w-[80%] w-[95%] mx-auto my-10 cursor-pointer' onClick={() => navigate('/register-personal-biz')}>
            <p className='text-[#19201D] font-[600] sm:text-[26px]'>Personal Businesses</p>
            <p className='text-[#6F7975] mt-4'>Businesses not registered</p>
          </div>
          <div className='border rounded-[4px] px-4 py-3 md:w-[80%] w-[95%] mx-auto cursor-pointer' onClick={() => navigate('/regiser-government-biz')}>
            <p className='text-[#19201D] font-[600] sm:text-[26px]'>Government/Licensed Institutions</p>
            <p className='text-[#6F7975] mt-4'>Government Agencies and Ministries</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Register