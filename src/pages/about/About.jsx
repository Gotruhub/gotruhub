import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <main className='bg-background-neutral'>
        <div className='bg-background-primary text-start mb-[6rem] pt-[5rem] pb-[5rem] w-full'><div className='w-[85%] max-w-[980px] mx-auto'>
          <h1 className='text-[25px] font-[600] mb-4 text-text-color'>About SynchroHub</h1>
          <p className='mb-2 font-[600] text-[18px]'>SYNCHROHUB SOLUTIONS LTD</p>
          <p className='mb-5 font-[500] text-[18px] text-secondary-color'>Building Digital Infrastructure for Modern Education</p>
          <p className='leading-[1.8]'>
            SynchroHub is a Digital School Infrastructure Platform designed to bring school administration, student and guardian engagement, staff operations, academic information, security, attendance, results and school commerce into one connected ecosystem.
          </p>
          <p className='leading-[1.8] mt-4'>
            Through the Web Administration Dashboard, SynchroLink Mobile App and SynchroStaff Mobile App, every part of the school community can access the tools and information relevant to them. SynchroPass, SynchroMonitor, SynchroResults and SynchroTrade provide four connected services for the way modern schools operate.
          </p>
          <p className='mt-5 font-[600]'>One connected platform. Built for the way modern schools operate.</p>
        </div></div>
        <div className='bg-background-neutral text-center py-[4rem]'>
            <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[65%] md:w-[75%] w-[90%] mx-auto'>Connect your school with SynchroHub</h1>
            <p className='leading-[1.6] mx-auto mt-6'>Create an account to bring your school operations and community into one ecosystem.</p>
            <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with SynchroHub</button>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default About