import React from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../brand-logo/BrandLogo'

const Footer = () => {
  return (
    <div className='bg-accent-deep text-center py-[38px] text-white flex flex-col justify-center align-center mt-[5rem]'>
      <BrandLogo variant='dark' fallbackPath='/images/logo-white.svg' className='h-[52px] max-w-[90%] mx-auto'/>
      <p className='mt-4 text-[#d9e6d6]'>Building Digital Infrastructure for Modern Education</p>
      <ul className='flex items-center justify-center gap-[20px] mt-[4rem]'>
        <li>
          <Link to='/terms-of-use'>Terms of service</Link>
        </li>
        <li className='h-[30px] w-[1px] bg-gray-500'></li>
        <li>
          <Link to='/privacy-policy'>Privacy Policy</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer
