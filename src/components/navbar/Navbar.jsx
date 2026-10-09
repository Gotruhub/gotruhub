import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from "react-icons/fi";
import BrandLogo from '../brand-logo/BrandLogo'



const Navbar = () => {

    const [openNav, setOpenNav] = useState(false)
  return (
    <nav className='relative flex min-h-[72px] items-center justify-between border-b border-border-soft bg-background-neutral py-[10px] lg:px-[100px] md:px-[60px] px-[16px]'>
        <Link to='/' className='flex shrink-0 items-center' aria-label='SynchroHub home'>
            <BrandLogo className='h-[50px] w-[200px] max-w-[52vw] object-contain object-left' />
        </Link>
        <button type='button' className='md:hidden block text-primary cursor-pointer p-2' aria-label='Toggle navigation' aria-expanded={openNav} onClick={() => setOpenNav(!openNav)}>
            <FiMenu className='text-[27px]'/>
        </button>
        {
            openNav &&
            <ul className='flex items-center gap-[28px] absolute md:relative md:flex-row flex-col right-0 left-0 md:left-auto md:bg-transparent bg-background-neutral text-primary md:top-[0] z-[100] top-full md:p-0 p-[2rem] shadow-lg border-x border-b border-border-soft md:border-none md:shadow-none'>
                <li>
                    <Link to='/contact-us'>Contact Us</Link>
                </li>
                <li>
                    <Link to='/about'>About Us</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li className='bg-accent-deep text-white px-7 py-[10px] rounded-[6px]'>
                    <Link to='/register'>Sign Up</Link>
                </li>
            </ul>
        }

        <ul className='hidden md:flex items-center gap-[32px] text-primary relative flex-row'>
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
                <Link to='/register' className='bg-accent-deep text-white px-7 py-[10px] rounded-[6px]'>Sign Up</Link>
            </li>
            {/* <li>
                <button>Delete Account</button>
            </li> */}
        </ul>
    </nav>
  )
}

export default Navbar
