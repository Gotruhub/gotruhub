import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <main className='bg-background-neutral'>
        <div className='bg-background-primary text-center my-0 py-[6rem] md:w-full w-full'><div className='md:w-[40%] w-[85%] mx-auto'>
          <h1 className='text-[25px] font-[500] mb-4'>Contact SynchroHub</h1>
          <p className='mb-5'>Have a question or need support? Our team is ready to help.</p>
          <div className='flex items-center gap-2 justify-center my-3'>
            <img src="./images/email.svg" alt="" />
            <a className='text-secondary-color' href="mailto:office@synchrohub.online">office@synchrohub.online</a>
          </div>
        </div></div>
        <div className='text-center py-[5rem]'>
            <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[65%] md:w-[75%] w-[90%] mx-auto'>Connect your school with SynchroHub</h1>
            <p className='leading-[1.6] mx-auto mt-6'>Create an account to bring your school operations and community into one ecosystem.</p>
            <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with SynchroHub</button>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Contact