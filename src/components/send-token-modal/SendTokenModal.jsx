import React from 'react'
import BtnLoader from '../btn-loader/BtnLoader'

const SendTokenModal = ({sendTokenModal, alertType, alertTitle, setSendTokenModal, sendToken, isLoading}) => {
  return (
    <>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setSendTokenModal(false)}></div>
        <div className="flex items-center flex-col text-center justify-center gap-3 bg-white w-[450px] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
            {
                alertType ==='success' ?
                <img src="./images/approval.svg" alt="" />
                :
                <img src="./images/failed.svg" alt="" />
            }
            <p className='text-text-color font-[500]'>{alertTitle}</p>
            <p className='text-[#6F7975] text-[14px]'>{sendTokenModal}</p>
            {
                isLoading ? 
                <BtnLoader />
                :
                <div className='flex items-center gap-5 justify-center mt-9'>
                    <button className='border border-[#19201D] text-[#19201D] px-5 py-3 rounded-[4px] text-[14px] w-[140px] font-[600]' onClick={() => setSendTokenModal(false)}>Back</button>
                    <button className="bg-[#19201D] text-white px-5 py-3 rounded-[4px] text-[14px] w-[140px]" onClick={() => {
                        sendToken()
                    }} >Confirm</button>
                </div>
            }
        </div>
    </>
  )
}

export default SendTokenModal