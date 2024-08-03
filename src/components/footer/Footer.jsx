import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-primary-color text-center py-[30px] text-white flex flex-col justify-center align-center mt-[5rem]'>
      <img src="./images/logo-white.svg" alt="" className='w-[150px] mx-auto'/>
      <ul className='flex items-center justify-center gap-[20px] mt-[4rem]'>
        <li>
          <Link to='#'>Terms of service</Link>
        </li>
        <li className='h-[30px] w-[1px] bg-gray-500'></li>
        <li>
          <Link to='#'>Privacy Policy</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer