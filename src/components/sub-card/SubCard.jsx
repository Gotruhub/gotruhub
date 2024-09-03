import React from 'react'
import ConfirmSubModal from '../confirm-sub-modal/ConfirmSubModal'

const SubCard = ({ plan, setConfirmSubModal }) => {
  const featureNames = plan?.feature?.map(f => f.name).join(', ');

  return (
    <>
      <div className='p-2 shadow-lg bg-white rounded-[4px]'>
        <div className='bg-[#EDEDED] h-[100px] flex items-center justify-center rounded-[4px] mb-2'>
          <p className='text-[14px] font-[500]'>
            {plan.name}
          </p>
        </div>
        <p className='text-[12px] mb-1 text-[#1C2320] font-[500]'>
          {featureNames}/<span className='text-[#828282] font-[400]'>{plan.duration}</span>
        </p>
        <p className='font-[500] text-[14px]'>#{plan.amount.$numberDecimal}</p>
        {/* <p className='text-[12px] mb-1 text-[#1C2320] font-[500]'>Features: {featureNames}</p> */}
        <button className='bg-[#1C2320] text-white mt-3 text-center w-full py-[6px] font-[500] rounded-[4px]' onClick={() => {
          setConfirmSubModal(true)
          localStorage.setItem('selectedPlan', JSON.stringify(plan))
        }}>Add to cart</button>
      </div>
      {/* {
          confirmSubModal && <ConfirmSubModal />
      } */}
    </>
  )
}

export default SubCard
