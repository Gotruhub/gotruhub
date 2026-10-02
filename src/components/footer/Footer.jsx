import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-primary-color text-center py-[30px] text-white flex flex-col justify-center align-center mt-[5rem]'>
      <img src="/images/synchrohub-logo.png" alt="SynchroHub" className='w-[150px] h-[90px] object-contain mx-auto'/>
      <p className='mt-4 text-[#BDC4B4]'>Building Digital Infrastructure for Modern Education</p>
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