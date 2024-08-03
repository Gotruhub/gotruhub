import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/Alert';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const Location = ({baseUrl}) => {

    const [editLocationModal, setEditLocationModal] = useState(false)
    const [deleteLocationModal, setDeleteLocationModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [toggleNav, setToggleNav] = useState(false)
    const [locations, setLocations] = useState({
        startLocation: {
          lat: "",
          long: ""
        },
        endLocation: {
          lat: "",
          long: ""
        }
      });

      const handleStartLatChange = (e) => {
        setLocations({
          ...locations,
          startLocation: {
            ...locations.startLocation,
            lat: e.target.value
          }
        });
      };
    
      const handleStartLongChange = (e) => {
        setLocations({
          ...locations,
          startLocation: {
            ...locations.startLocation,
            long: e.target.value
          }
        });
      };
    
      const handleEndLatChange = (e) => {
        setLocations({
          ...locations,
          endLocation: {
            ...locations.endLocation,
            lat: e.target.value
          }
        });
      };
    
      const handleEndLongChange = (e) => {
        setLocations({
          ...locations,
          endLocation: {
            ...locations.endLocation,
            long: e.target.value
          }
        });
      };

      async function getProfile(){
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/profile/get-profile`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(res, data);
        if(res.ok){
            setIsLoading(false)
        }
      }

      useEffect(() => {
        getProfile()
      },[])

      async function updateLocation(){
        if(!locations.startLocation.lat || !locations.startLocation.long || !locations.endLocation.lat || !locations.endLocation.long){
            setMsg("All fields are required!");
            setAlertType('error')
            return;
        }else{
            setIsLoading(true)
            // const body = lo
            const res = await fetch(`${baseUrl}/profile/update-profile`,{
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body: JSON.stringify(locations)
            })
            const data = await res.json()
            console.log(res, data);
            if(res) setIsLoading(false)
            if(res.ok){
                setMsg("Location updated successfully!");
                setAlertType('success')
                getProfile()
                setLocations({
                    startLocation: {
                        lat: "",
                        long: ""
                    },
                    endLocation: {
                        lat: "",
                        long: ""
                    }
                })
            }
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/pass')} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Location</p>
                        </div>
                        <p className='text-[#4F4F4F] text-[14px]'>Actions performed outside your saved locations would be recorded as suspicious activity</p>
                    </div>
                </div>
                <div className='flex items-start justify-center gap-3 py-8'>
                   {/* <img src="./images/map.svg" className='w-[65%]' alt="" /> */}
                   
                   <div className='p-4 shadow-lg'>
                        <div>
                            <p className='mb-6 font-[700] text-[20px] text-[#1D1D1D]'>Input Location Co-Ordinates</p>
                           
                                <div className='mb-5'>
                                    <p className='text-[#19201D]'>Start Coordinates</p>
                                    <div className='flex items-center flex-col md:flex-row gap-3'>
                                        <input
                                            type="text"
                                            className='border py-3 px-3 rounded mt-1 w-full'
                                            placeholder='Latitude'
                                            value={locations.startLocation.lat}
                                            onChange={handleStartLatChange}
                                        />
                                        <input
                                            type="text"
                                            className='border py-3 px-3 rounded mt-1 w-full'
                                            placeholder='Longitude'
                                            value={locations.startLocation.long}
                                            onChange={handleStartLongChange}
                                        />
                                    </div>
                                    <p className='text-[#865C1D] text-[12px]'>We use a range to ensure location accuracy</p>
                                </div>
                                <div className='mb-5'>
                                    <p className='text-[#19201D]'>Stop Coordinates</p>
                                    <div className='flex items-center flex-col md:flex-row gap-3'>
                                        <input
                                            type="text"
                                            className='border py-3 px-3 rounded mt-1 w-full'
                                            placeholder='Latitude'
                                            value={locations.endLocation.lat}
                                            onChange={handleEndLatChange}
                                        />
                                        <input
                                            type="text"
                                            className='border py-3 px-3 rounded mt-1 w-full'
                                            placeholder='Longitude'
                                            value={locations.endLocation.long}
                                            onChange={handleEndLongChange}
                                        />
                                    </div>
                                </div>
                                {
                                    loading ? 
                                    <BtnLoader bgColor="#191f1c"/>
                                    :
                                    <button onClick={updateLocation} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Location</button>
                                }
                        </div>
                        {/* <div className='mt-12'>
                            <p className='mb-6 font-[700] text-[20px] text-[#1D1D1D]'>Saved Locations</p>
                            <div className='mb-5 bg-[#F7F7F7] p-3 rounded-[8px]'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#1D1D1D]'>Primary section</p>
                                    <div className='flex items-center gap-2'>
                                        <CiEdit className='text-[#25751E] bg-[#25751E1A] p-1 rounded-full text-[28px] font-[700] cursor-pointer' onClick={() => setEditLocationModal(true)}/>
                                        <MdOutlineDeleteForever className='text-[#9A2525] bg-[#9A25251A] p-1 rounded-full text-[28px] font-[700] cursor-pointer' onClick={() => setDeleteLocationModal(true)}/>
                                    </div>
                                </div>
                                <p className='mt-3 text-[#6F7975]'>8.329780 - 3.346063</p>
                            </div>
                            <div className='mb-5 bg-[#F7F7F7] p-3 rounded-[8px]'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#1D1D1D]'>Primary section</p>
                                    <div className='flex items-center gap-2'>
                                        <CiEdit className='text-[#25751E] bg-[#25751E1A] p-1 rounded-full text-[28px] font-[700] cursor-pointer' onClick={() => setEditLocationModal(true)}/>
                                        <MdOutlineDeleteForever className='text-[#9A2525] bg-[#9A25251A] p-1 rounded-full text-[28px] font-[700] cursor-pointer' onClick={() => setDeleteLocationModal(true)}/>
                                    </div>
                                </div>
                                <p className='mt-3 text-[#6F7975]'>8.329780 - 3.346063</p>
                            </div>
                            <div className='mb-5 bg-[#F7F7F7] p-3 rounded-[8px]'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#1D1D1D]'>Primary section</p>
                                    <div className='flex items-center gap-2'>
                                        <CiEdit className='text-[#25751E] bg-[#25751E1A] p-1 rounded-full text-[28px] font-[700] cursor-pointer' onClick={() => setEditLocationModal(true)}/>
                                        <MdOutlineDeleteForever className='text-[#9A2525] bg-[#9A25251A] p-1 rounded-full text-[28px] font-[700] cursor-pointer' onClick={() => setDeleteLocationModal(true)}/>
                                    </div>
                                </div>
                                <p className='mt-3 text-[#6F7975]'>8.329780 - 3.346063</p>
                            </div>
                        </div> */}
                   </div>
                </div>
            </div>
        </div>

        {
            editLocationModal &&
            <>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditLocationModal(false)}></div>
                <div className="bg-white w-[650px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[22px]">Edit Location</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditLocationModal(false)}/>
                    </div>
                    <div className='flex items-center justify-center flex-col mt-10 w-full'>
                        <div className='mb-5 w-full'>
                            <p className='text-[#19201D]'>Location Name</p>
                            <input type="text" className='border py-3 px-3 rounded mt-1 w-full' placeholder='Primary section' />
                        </div>
                        <div className='mb-5 w-full'>
                            <p className='text-[#19201D]'>Start Coordinates</p>
                            <input type="text" className='border py-3 px-3 rounded mt-1 w-full' placeholder='8.329780 - 3.346063' />
                            <p className='text-[#865C1D] text-[12px]'>We use a range to ensure location accuracy</p>
                        </div>
                        <div className='mb-5 w-full'>
                            <p className='text-[#19201D]'>Stop Coordinates</p>
                            <input type="text" className='border py-3 px-3 rounded mt-1 w-full' placeholder='8.329780 - 3.346063' />
                        </div>
                        <button className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Location</button>
                    </div>
                </div>
            </>
        }

        {   deleteLocationModal &&
            <>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteLocationModal(false)}></div>
                <div className="flex items-center flex-col text-center justify-center gap-3 bg-white w-[450px] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                    <img src="./images/approval.svg" alt="" />
                    <p className='text-text-color font-[500]'>Confirm</p>
                    <p className='text-[#6F7975] text-[14px]'>Are you sure you want to delete this location? This action cannot be undone.</p>
                    {
                        isLoading ? 
                        <BtnLoader />
                        :
                        <div className='flex items-center gap-5 justify-center mt-9'>
                            <button className='border border-[#19201D] text-[#19201D] px-5 py-3 rounded-[4px] text-[14px] w-[140px] font-[600]' onClick={() => setDeleteLocationModal(false)}>Back</button>
                            <button className="bg-[#9A2525] text-white px-5 py-3 rounded-[4px] text-[14px] w-[140px]" onClick={() => console.log("hello")}>Delete</button>
                        </div>
                    }
                </div>
            </>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
    
  )
}

export default Location