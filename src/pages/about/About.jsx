import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useNavigate } from 'react-router-dom'

const About = () => {

  const navigate = useNavigate()
  
  return (
    <>
      <Navbar />
      <div>
        <div className='text-start mb-[10rem] mt-[5rem] w-[85%] mx-auto'>
          <h1 className='text-[25px] font-[600] mb-4 text-[#19201D]'>About Gotruhub</h1>
          <p className='mb-5 font-[500] text-[18px]'>Manage your schools, employees, team members with just one app</p>
          <p>
            Gotruhub is a multi tenant digital platform built for diverse functions which include cooperative trading. It enable you manage your schools, manage members of staff, help schools/parents keep track of students security and school attendance record. It as well make schools accountable for students in their custody and also provide you with tools that can help you in revenue collection and accountability.
            Gotruhub make sales and access to payments easy. It alerts you on the arrival and departure of your minors at schools, ensures that schools take responsibility of students times in their care. It keeps track of staff promptness to duty and as well helps the Government/ corporate organizations keep detailed track of revenue sources and further helps in collecting and keeping records of revenue from such sources.
          </p>
        </div>
        <div className='text-center'>
            <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[65%] md:w-[75%] w-[90%] mx-auto'>
                Sign up with Gotruhub to start managing your team
            </h1>
            <p className='leading-[1.6] mx-auto mt-6'>
                Create account instantly to start managing your team and resources.
            </p>
            <div className='text-center'>
                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with Gotruhub</button>
            </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default About