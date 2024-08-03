import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Contact = () => {

  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div>
        <div className='text-center my-[10rem] md:w-[30%] w-[85%] mx-auto'>
          <h1 className='text-[25px] font-[500] mb-4'>Contact Us</h1>
          <p className='mb-5'>Have a concern, please do send us a message we are always available to help out</p>
          <div className='flex items-center gap-2 justify-center my-3'>
            <img src="./images/phone.svg" alt="" />
            <p>090 20060037</p>
          </div>
          <div className='flex items-center gap-2 justify-center my-3'>
            <img src="./images/email.svg" alt="" />
            <p>gotruhub@gmail.com</p>
          </div>
          <div className='flex items-center gap-2 justify-center my-3'>
            <img src="./images/email.svg" alt="" />
            <p>acandacresources@gmail.com</p>
          </div>
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

export default Contact