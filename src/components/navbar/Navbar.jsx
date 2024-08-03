import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";



const Navbar = () => {

    const [openNav, setOpenNav] = useState(false)

  return (
    <nav className='flex items-center justify-between bg-primary-color py-5 lg:px-[100px] md:px-[60px] px-[16px]'>
        <Link to='/'>
            <img src="./images/logo-white.svg" alt="" />
        </Link>
        <FiMenu className='md:hidden block text-white cursor-pointer text-[26px]' onClick={() => setOpenNav(!openNav)}/>
        {
            openNav &&
            <ul className='flex items-center gap-[50px] md:text-white fixed md:relative md:flex-row flex-col right-0 md:bg-transparent bg-white text-black md:top-[0] top-[75px] md:p-0 p-[4rem] shadow-lg border md:border-none md:shadow-none'>

                <li>
                    <Link to='/contact-us'>Contact Us</Link>
                </li>
                <li>
                    <Link to='/about'>About Us</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li className='border md:border-white border-black px-7 py-[10px] rounded-[6px]'>
                    <Link to='/register'>Sign Up</Link>
                </li>
            </ul>
        }

        <ul className='hidden md:flex items-center gap-[50px] text-white relative flex-row'>
            <li>
                <Link to='/contact-us'>Contact Us</Link>
            </li>
            <li>
                <Link to='/about'>About Us</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register' className='border md:border-white border-black px-7 py-[10px] rounded-[6px]'>Sign Up</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar