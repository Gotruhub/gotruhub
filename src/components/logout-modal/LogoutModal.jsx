import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const LogoutModal = ({setLogoutModal}) => {
  return (
    <>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setLogoutModal(false)}></div>
        <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
            <div className="flex items-center justify-between border-b pb-[5px]">
                <p className="text-[22px]">Log out</p>
                <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setLogoutModal(false)}/>
            </div>
            <div className='text-center flex items-center justify-center flex-col'>
                <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                <div className='my-5'>
                    <p className='text-[#19201D] mb-4'>Log out</p>
                    <p className='text-[#828282] text-[14px]'>
                        By logging out, you will have to re-enter your email and password the next time you try to login.
                    </p>
                </div>
                <div className='flex items-center gap-5 mt-3 pb-5'>
                    <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setLogoutModal(false)}>Cancel</button>
                    <button className='bg-[#9A2525] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={() => {
                        localStorage.clear()
                        sessionStorage.clear()
                        window.location.href = '/'
                    }} >Logout</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default LogoutModal