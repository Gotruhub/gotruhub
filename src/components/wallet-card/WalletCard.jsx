import React from 'react'

const WalletCard = ({ title, amount }) => {
  return (
    <div className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg text-white w-[90%] flex-shrink-0 snap-center">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="w-6 h-6 bg-white text-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-lg font-bold">₦{amount}</p>
      </div>
    </div>
  )
}

export default WalletCard