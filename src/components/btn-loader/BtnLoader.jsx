import React from 'react'

const BtnLoader = ({ bgColor}) => {
    console.log(bgColor);
  return (
    <div className={`bg-[${bgColor}] w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto`}>
        <img src="./images/loader.gif" className='w-[30px] mx-auto' alt="" />
    </div>
  )
}

export default BtnLoader