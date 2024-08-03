import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'

const Home = () => {

    const tabArray = ['Gotru Trade', 'Gotru Pass', 'Gotru Monitor', 'Result Check']
    const [selectedTab, setSelectedTab] = useState('Gotru Trade')
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    
    useEffect(() => {
        if(user){
            navigate('/dashboard')
        }
    },[])

  return (
    <>
        <Navbar />
        <div>
            <h1 className='mt-[7rem] text-[18px] sm:text-[32px] md:text-[48px] text-primary-color leading-20 text-center font-[500] lg:w-[80%] sm:w-[90%] w-full px-[1rem] mx-auto'>Manage your schools, employees, team members with just one app</h1>
            <p className='mt-[3rem] md:mt-[5rem] w-[85%] md:w-[60%] text-justify leading-[1.6] mx-auto'>
                Gotruhub is a multi tenant digital platform built for diverse functions which include cooperative trading. It also allow you manage your schools, manage staff members, help schools/parents keep track of students security and school attendance record.
                <Link to='/about' className='text-secondary-color font-[500]'> Learn More</Link>
            </p>
            <div className='text-center'>
                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[4rem] px-[35px] py-[16px] text-center mx-auto'>Get Started with Gotruhub</button>
            </div>
            <img src="/land-1.svg" className='mx-auto mt-[5rem] mb-[10rem] md:max-w-[75%] max-w-[95%]' alt="" />
            <div className='text-center'>
                <h1 className='text-primary-color font-[500] text-[18px] sm:text-[32px] md:text-[48px] lg:w-[70%] xl:[w-50%] md:px-[1rem] mx-auto'>
                    We’re all about helping you manage your organization
                </h1>
                <p className='leading-[1.6] w-full sm:w-[580px] mx-auto mt-8'>
                    Our product is aimed at simplifying organization's management processes and helping to keep track of team activities.
                </p>
                <div className='flex items-center justify-center gap-[20px] mt-10'>
                    {
                        tabArray.map((tab, index) => (
                            <div key={index} className='flex items-center justify-center gap-[100px]'>
                                <p className='text-center cursor-pointer text-[#6F7975]' onClick={() => setSelectedTab(tab)}>{tab}</p>
                            </div>
                        ))
                    }
                </div>
                {
                    selectedTab === "Gotru Trade" &&
                    <div className='flex justify-between lg:items-start gap-[2rem] lg:text-left text-center w-[90%] flex-col lg:flex-row items-center mx-auto mt-[5rem]'>
                        <img src="./trade_img.svg" className='max-w-[100%]' alt="" />
                        <div className='g:w-[50%] w-[90%]'>
                            <p className='text-[32px] font-[500] mb-3'>Gotru Trade</p>
                            <p className='text-[#6F7975]'>With our ready to use inventory and ledger management systems, sales and payment management is seamless and can be done without cash. It is most suitable for cooperative trading.</p>
                            <div className=''>
                                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center'>Get Started</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    selectedTab === "Gotru Pass" &&
                    <div className='flex justify-between lg:items-start gap-[2rem] lg:text-left text-center w-[90%] flex-col lg:flex-row items-center mx-auto mt-[5rem]'>
                        <img src="./images/go-tru-pass.svg" className='max-w-[100%]' alt="" />
                        <div className='g:w-[50%] w-[90%]'>
                            <p className='text-[32px] font-[500] mb-3'>Gotru Pass</p>
                            <p className='text-[#6F7975]'>With this feature, schools/corporate organizations captures resumption you and exit times of students/members of staff in real time, it also sends automatic and instant notifications to parent's/Management's contacts at each capture.</p>
                            <div className=''>
                                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center'>Get Started</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    selectedTab === "Result Check" &&
                    <div className='flex justify-between lg:items-start gap-[2rem] lg:text-left text-center w-[90%] flex-col lg:flex-row items-center mx-auto mt-[5rem]'>
                        <img src="./images/go-tru-pass.svg" className='max-w-[100%]' alt="" />
                        <div className='g:w-[50%] w-[90%]'>
                            <p className='text-[32px] font-[500] mb-3'>Result Check</p>
                            <p className='text-[#6F7975]'>This is a feature smartly built to seamlessly upload properly secured results to the app users/students.</p>
                            <div className=''>
                                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center'>Get Started</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    selectedTab === "Gotru Monitor" &&
                    <div className='flex justify-between lg:items-start gap-[2rem] lg:text-left text-center w-[90%] flex-col lg:flex-row items-center mx-auto mt-[5rem]'>
                        <img src="./trade_img.svg" className='max-w-[100%]' alt="" />
                        <div className='g:w-[50%] w-[90%]'>
                            <p className='text-[32px] font-[500] mb-3'>Gotru Monitor</p>
                            <p className='text-[#6F7975]'>This feature captures resumption and exit times to distinct assignments in real time. With this, promptness and due diligence to duty will be enshrined.</p>
                            <div className=''>
                                <button onClick={() => navigate('/register')} className='text-white bg-primary-color rounded-[8px] mt-[2.5rem] px-[35px] py-[16px] text-center'>Get Started</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='bg-primary-color py-[4rem] my-[10rem]'>
                <h1 className='text-white font-[400] text-[18px] sm:text-[28px] md:text-[38px] w-[80%] lg:w-[40%] mb-10 mx-auto text-center'>Why Corporate Organizations choose Gotruhub</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white gap-[5rem] px-[2rem]'>
                    <div className='text-center flex flex-col items-center justify-center'>
                        <img src="./security.svg" alt="" />
                        <p className='my-5 text-[20px]'>Encrypted information</p>
                        <p className='text-[#cdcdcd]'>We provide you with a secure space to share and manage all your information.</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center'>
                        <img src="./affordable.svg" alt="" />
                        <p className='my-5 text-[20px]'>Affordable offers</p>
                        <p className='text-[#cdcdcd]'>Our charges are unbeatable considering the services we provide.</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center'>
                        <img src="./data.svg" alt="" />
                        <p className='my-5 text-[20px]'>Effective management of large data</p>
                        <p className='text-[#cdcdcd]'>Not minding the size of information you enter, we provide stress free handling.</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center'>
                        <img src="./support-service.svg" alt="" />
                        <p className='my-5 text-[20px]'>Suport Team</p>
                        <p className='text-[#cdcdcd]'>Our support team are hands-on and we provide you with instant 24hrs support.</p>
                    </div>
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

export default Home