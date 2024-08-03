import React from 'react'

const AlertModal = ({msg, alertType, alertTitle, setMsg, setMsgsetAlertType, setAlertTitle}) => {
  return (
    <>
        <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {
          setMsg('')
          // setMsgsetAlertType('')
          setAlertTitle('')
          }}></div>
        <div className="flex items-center flex-col text-center justify-center gap-3 bg-white w-[450px] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
            {
                alertType ==='success' ?
                <img src="./images/success.svg" alt="" />
                :
                <img src="./images/failed.svg" alt="" />
            }
            <p className='text-text-color font-[500]'>{alertTitle}</p>
            <p className='text-[#6F7975] text-[14px]'>{msg}</p>
        </div>
    </>
  )
}

export default AlertModal