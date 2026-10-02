import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'

const services = {
    SynchroTrade: {
        image: './trade_img.svg',
        subtitle: 'School Payments, Digital Commerce & Inventory',
        description: 'Bring school payments, student purchases, inventory and transaction records into one secure service. SynchroTrade helps schools manage commerce efficiently while giving families a simpler way to pay.'
    },
    SynchroPass: {
        image: './images/go-tru-pass.svg',
        subtitle: 'Student Security & GPS-Verified Digital Identity',
        description: 'Support safer arrivals, departures and authorised pickups with digital identity, real-time attendance records and GPS-verified activity for students, guardians and staff.'
    },
    SynchroMonitor: {
        image: './trade_img.svg',
        subtitle: 'Academic Operations, Information & GPS Monitoring',
        description: 'Coordinate schedules, attendance and day-to-day academic activity in one place. GPS-supported monitoring gives school leaders clearer operational insight while keeping staff and families informed.'
    },
    SynchroResults: {
        image: './images/go-tru-pass.svg',
        subtitle: 'Secure Academic Results Access',
        description: 'Publish and access academic results through a secure, connected experience designed for schools, students, parents and guardians.'
    }
}

const Home = () => {
    const tabArray = Object.keys(services)
    const [selectedTab, setSelectedTab] = useState('SynchroTrade')
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const selectedService = services[selectedTab]

    useEffect(() => {
        if(user) navigate('/dashboard')
    },[])

  return (
    <>
        <Navbar />
        <div>
            <h1 className='mt-[7rem] text-[18px] sm:text-[32px] md:text-[48px] text-primary-color leading-20 text-center font-[500] lg:w-[80%] sm:w-[90%] w-full px-[1rem] mx-auto'>Digital School Infrastructure That Connects Every Part of Your School</h1>
            <p className='mt-[3rem] md:mt-[5rem] w-[85%] md:w-[60%] text-center leading-[1.6] mx-auto'>
                SynchroHub brings school administration, student and guardian engagement, staff operations, academic information, security, attendance, results and school commerce into one connected ecosystem.
                <Link to='/about' className='text-secondary-color font-[500]'> Learn More</Link>
            </p>
            <p className='mt-5 text-center font-[600] text-secondary-color'>One Platform. Three Experiences. Four Core Services.</p>
            <div className='text-center'>
                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[4rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with SynchroHub</button>
            </div>
            <img src="/land-1.svg" className='mx-auto mt-[5rem] mb-[10rem] md:max-w-[75%] max-w-[95%]' alt="SynchroHub connected school platform" />
            <div className='text-center'>
                <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[70%] md:px-[1rem] mx-auto'>One connected platform for the way modern schools operate</h1>
                <p className='leading-[1.6] w-[90%] sm:w-[700px] mx-auto mt-8'>The Web Administration Dashboard is the central hub for school operations and records. SynchroLink connects students, parents and guardians with their school, while SynchroStaff equips teachers and staff for day-to-day operations.</p>
                <div className='flex flex-wrap items-center justify-center gap-[20px] mt-10'>
                    {tabArray.map((tab) => (
                        <button key={tab} className={selectedTab === tab ? 'text-secondary-color font-[600] border-b-2 border-secondary-color pb-1' : 'text-[#6F7975] pb-1'} onClick={() => setSelectedTab(tab)}>{tab}</button>
                    ))}
                </div>
                <div className='flex justify-between lg:items-start gap-[2rem] lg:text-left text-center w-[90%] flex-col lg:flex-row items-center mx-auto mt-[5rem]'>
                    <img src={selectedService.image} className='max-w-[100%]' alt="" />
                    <div className='lg:w-[50%] w-[90%]'>
                        <p className='text-[32px] font-[500] mb-2'>{selectedTab}</p>
                        <p className='text-secondary-color font-[600] mb-3'>{selectedService.subtitle}</p>
                        <p className='text-[#6F7975]'>{selectedService.description}</p>
                        <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center'>Get Started</button>
                    </div>
                </div>
            </div>
            <div className='bg-primary-color py-[4rem] my-[10rem]'>
                <h1 className='text-white font-[400] text-[18px] sm:text-[28px] md:text-[38px] w-[80%] lg:w-[55%] mb-10 mx-auto text-center'>Why schools choose SynchroHub</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white gap-[5rem] px-[2rem]'>
                    <div className='text-center flex flex-col items-center justify-center'><img src="./security.svg" alt="" /><p className='my-5 text-[20px]'>Connected and secure</p><p className='text-[#BDC4B4]'>Bring vital school information and workflows together in a protected digital environment.</p></div>
                    <div className='text-center flex flex-col items-center justify-center'><img src="./affordable.svg" alt="" /><p className='my-5 text-[20px]'>Built for school communities</p><p className='text-[#BDC4B4]'>Purpose-built experiences support administrators, staff, students, parents and guardians.</p></div>
                    <div className='text-center flex flex-col items-center justify-center'><img src="./data.svg" alt="" /><p className='my-5 text-[20px]'>Clear operational insight</p><p className='text-[#BDC4B4]'>Reliable records help schools coordinate attendance, academics, security and commerce.</p></div>
                    <div className='text-center flex flex-col items-center justify-center'><img src="./support-service.svg" alt="" /><p className='my-5 text-[20px]'>One connected ecosystem</p><p className='text-[#BDC4B4]'>Three tailored experiences work together across four core school services.</p></div>
                </div>
            </div>
            <div className='text-center'>
                <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[65%] md:w-[75%] w-[90%] mx-auto'>Bring your school together with SynchroHub</h1>
                <p className='leading-[1.6] mx-auto mt-6'>Create an account to start connecting your school operations and community.</p>
                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with SynchroHub</button>
            </div>
            <Footer />
        </div>
    </>
  )
}

export default Home