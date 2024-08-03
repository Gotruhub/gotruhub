import React, { useEffect } from 'react'
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const GuardianCard = ({id, currentUser}) => {

    const navigate = useNavigate()
    useEffect(()=> {
        console.log(currentUser);
    },[])

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl">
      <div className="p-8">
        <div className="flex items-center justify-center">
        <img  className="h-[120px] w-[120px] rounded-full object-cover" src={currentUser?.user?.guardians?.profileImage?.file} alt="Guardian image" />
        </div>
        <div className="mt-6 text-center">
          <div className="flex justify-between">
            <div className="text-lg font-semibold flex items-center gap-3">
                <img src="./images/frame-user.svg" alt="" />
                <p>Guardian data</p>
            </div>
            <img src="./images/edit.svg" alt="" className='cursor-pointer' onClick={() => navigate(`/guardian-profile/${currentUser?.user?.guardians?._id}`)} />
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Full name</span>
              <span className="font-medium">{currentUser?.user?.guardians?.fullName}</span>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{currentUser?.user?.guardians?.email}</span>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-600">Role</span>
              <span className="font-medium">{currentUser?.guardians?.role || "Guardian"}</span>
              {/* <span className="font-medium">{currentUser?.guardians?.role}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuardianCard