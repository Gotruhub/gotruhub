import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'

const services = {
    SynchroPass: {
        image: './images/go-tru-pass.svg',
        subtitle: 'Student Security & GPS-Verified Digital Identity',
        description: 'Support safer arrivals, departures and authorised pickups with digital identity, real-time attendance records and GPS-verified activity for students, guardians and staff.'
    },
    SynchroMonitor: {
        image: './trade_img.svg',
        subtitle: 'Academic Operations, Information & GPS Monitoring',
        description: 'The Operational Intelligence Engine'
    },
    SynchroTrade: {
        image: './trade_img.svg',
        subtitle: 'School Payments, Digital Commerce & Inventory',
        description: 'Bring school payments, student purchases, inventory and transaction records into one secure service. SynchroTrade helps schools manage commerce efficiently while giving families a simpler way to pay.'
    },
    SynchroResults: {
        image: './images/go-tru-pass.svg',
        subtitle: 'Secure Academic Results Access',
        description: 'Publish and access academic results through a secure, connected experience designed for schools, students, parents and guardians.'
    }
}

const Home = () => {
    const tabArray = ['SynchroPass', 'SynchroMonitor', 'SynchroTrade', 'SynchroResults']
    const [selectedTab, setSelectedTab] = useState('SynchroPass')
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const selectedService = services[selectedTab]

    useEffect(() => {
        if(user) navigate('/dashboard')
    },[])

  return (
    <>
        <Navbar />
        <main>
            <section className='bg-background-primary pt-[4rem] pb-[4rem]'>
            <h1 className='text-[36px] sm:text-[44px] md:text-[58px] text-primary-color leading-[1.12] text-center font-[500] max-w-[1060px] w-[92%] mx-auto'>Digital School Infrastructure That Connects Every Part of Your School</h1>
            <p className='mt-[2rem] w-[88%] max-w-[760px] text-center leading-[1.75] text-text-secondary mx-auto'>
                SynchroHub brings school administration, student and guardian engagement, staff operations, academic information, security, attendance, results and school commerce into one connected ecosystem.
                <Link to='/about' className='text-secondary-color font-[500]'> Learn More</Link>
            </p>
            <p className='mt-5 text-center font-[600] text-secondary-color'>One Platform. Three Experiences. Four Core Services.</p>
            <div className='text-center'>
                <button onClick={() => navigate('/register')} className='text-white bg-accent-deep hover:bg-secondary-color rounded-[8px] mt-[3rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with SynchroHub</button>
            </div>
            <div className='mx-auto mt-[4rem] grid w-[92%] max-w-[1100px] grid-cols-1 gap-4 md:grid-cols-3'>
                <article className='rounded-[14px] border border-border-soft bg-background-neutral p-6 text-left shadow-sm'>
                    <p className='text-[12px] font-[600] tracking-[0.14em] text-secondary-color'>01 — ADMINISTRATION</p>
                    <h2 className='mt-4 text-[22px] font-[500] text-primary'>Web Administration Dashboard</h2>
                    <p className='mt-3 leading-[1.65] text-text-secondary'>A connected command centre for school operations, records, reporting and oversight.</p>
                </article>
                <article className='rounded-[14px] border border-border-soft bg-surface-green p-6 text-left shadow-sm'>
                    <p className='text-[12px] font-[600] tracking-[0.14em] text-accent-deep'>02 — COMMUNITY</p>
                    <h2 className='mt-4 text-[22px] font-[500] text-primary'>SynchroLink Mobile App</h2>
                    <p className='mt-3 leading-[1.65] text-primary'>A clear connection between students, parents, guardians and their school.</p>
                </article>
                <article className='rounded-[14px] border border-border-soft bg-accent-deep p-6 text-left shadow-sm'>
                    <p className='text-[12px] font-[600] tracking-[0.14em] text-brand-primary'>03 — STAFF</p>
                    <h2 className='mt-4 text-[22px] font-[500] text-background-neutral'>SynchroStaff Mobile App</h2>
                    <p className='mt-3 leading-[1.65] text-[#d9e6d6]'>Practical day-to-day tools for teachers and staff across the school community.</p>
                </article>
            </div>
            </section>
            <section className='bg-background-neutral text-center py-[6rem]'>
                <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[70%] md:px-[1rem] mx-auto'>One connected platform for the way modern schools operate</h1>
                <p className='leading-[1.6] w-[90%] sm:w-[700px] mx-auto mt-8'>The Web Administration Dashboard is the central hub for school operations and records. SynchroLink connects students, parents and guardians with their school, while SynchroStaff equips teachers and staff for day-to-day operations.</p>
                <div className='flex flex-wrap items-center justify-center gap-3 mt-10' role='tablist' aria-label='SynchroHub services'>
                    {tabArray.map((tab) => {
                        const isSelected = selectedTab === tab

                        return (
                        <button
                            key={tab}
                            type='button'
                            role='tab'
                            aria-selected={isSelected}
                            aria-controls='service-details'
                            className={isSelected
                                ? 'relative rounded-[8px] bg-[#153f34] px-5 py-3 font-[600] text-white shadow-sm motion-reduce:transition-none after:absolute after:bottom-[6px] after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#8FEA5A]'
                                : 'rounded-[8px] bg-[#eef3ef] px-5 py-3 font-[500] text-[#566760] hover:bg-[#8FEA5A] hover:text-[#153f34] motion-reduce:transition-none'}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}<span className='sr-only'>{isSelected ? ' selected' : ''}</span>
                        </button>
                        )
                    })}
                </div>
                <div id='service-details' role='tabpanel' aria-label={`${selectedTab} details`} className='flex justify-between lg:items-center gap-[3rem] lg:text-left text-center w-[90%] max-w-[1200px] flex-col lg:flex-row items-center mx-auto mt-[5rem]'>
                    <img src={selectedService.image} className='w-full max-w-[560px] lg:w-[48%]' alt="" />
                    <div className='lg:w-[48%] w-[95%]'>
                        <p className='text-[32px] font-[500] mb-2'>{selectedTab}</p>
                        <p className='text-secondary-color font-[600] mb-3'>{selectedService.subtitle}</p>
                        {selectedTab === 'SynchroMonitor' ? (
                            <div className='text-text-secondary space-y-4'>
                                <p className='font-[600] text-primary'>{selectedService.description}</p>
                                <p>SynchroMonitor manages the day-to-day academic and operational activities of an institution through two connected monitoring layers:</p>
                                <p><span className='font-[600] text-primary'>Monitor Source</span> monitors staff members — the source of the educational service. It provides visibility into teacher and staff attendance, presence, punctuality, activity and operational performance.</p>
                                <p><span className='font-[600] text-primary'>Monitor End</span> monitors students — the end receivers and beneficiaries of the educational service. It provides visibility into student attendance, presence, lateness, academic information and related performance records.</p>
                                <p>Together, Monitor Source and Monitor End provide a connected view of both service delivery and service reception, combining GPS-supported attendance verification, academic information management, timetable management, reporting, analytics and performance monitoring within one intelligent operational platform.</p>
                            </div>
                        ) : <p className='text-text-secondary'>{selectedService.description}</p>}
                        <button onClick={() => navigate('/register')} className='text-white bg-accent-deep hover:bg-secondary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center'>Get Started</button>
                    </div>
                </div>
            </section>
            <section className='bg-surface-green py-[5rem] my-[4rem]'>
                <h1 className='text-primary font-[400] text-[18px] sm:text-[28px] md:text-[38px] w-[80%] lg:w-[55%] mb-10 mx-auto text-center'>Why schools choose SynchroHub</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-primary gap-5 px-[2rem] max-w-[1300px] mx-auto'>
                    <div className='rounded-[12px] bg-background-neutral text-center flex flex-col items-center justify-center p-7'><span className='rounded-full bg-accent-deep p-3 shadow-sm'><img src="./security.svg" alt="" /></span><p className='my-5 text-[20px]'>Connected and secure</p><p className='text-text-secondary'>Bring vital school information and workflows together in a protected digital environment.</p></div>
                    <div className='rounded-[12px] bg-background-neutral text-center flex flex-col items-center justify-center p-7'><span className='rounded-full bg-accent-deep p-3 shadow-sm'><img src="./affordable.svg" alt="" /></span><p className='my-5 text-[20px]'>Built for school communities</p><p className='text-text-secondary'>Purpose-built experiences support administrators, staff, students, parents and guardians.</p></div>
                    <div className='rounded-[12px] bg-background-neutral text-center flex flex-col items-center justify-center p-7'><span className='rounded-full bg-accent-deep p-3 shadow-sm'><img src="./data.svg" alt="" /></span><p className='my-5 text-[20px]'>Clear operational insight</p><p className='text-text-secondary'>Reliable records help schools coordinate attendance, academics, security and commerce.</p></div>
                    <div className='rounded-[12px] bg-background-neutral text-center flex flex-col items-center justify-center p-7'><span className='rounded-full bg-accent-deep p-3 shadow-sm'><img src="./support-service.svg" alt="" /></span><p className='my-5 text-[20px]'>One connected ecosystem</p><p className='text-text-secondary'>Three tailored experiences work together across four core school services.</p></div>
                </div>
            </section>
            <section className='bg-background-primary text-center py-[6rem]'>
                <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[65%] md:w-[75%] w-[90%] mx-auto'>Bring your school together with SynchroHub</h1>
                <p className='leading-[1.6] mx-auto mt-6'>Create an account to start connecting your school operations and community.</p>
                <button onClick={() => navigate('/register')} className='text-white bg-accent-deep hover:bg-secondary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with SynchroHub</button>
            </section>
            <Footer />
        </main>
    </>
  )
}

export default Home
