import React, { useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'

const AddAssignmentLocation = ({baseUrl}) => {

    const [toggleNav, setToggleNav] = useState(false)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState('')
    const [name, setName] = useState()
    const [location_range, setLocationRange] = useState('')


    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

      const handleStartLatChange = (e) => {
        setLocations({
          ...locations,
          location: {
            ...locations.location,
            lat: e.target.value
          }
        });
      };

      const handleStartLongChange = (e) => {
        setLocations({
          ...locations,
          location: {
            ...locations.location,
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

      const [locations, setLocations] = useState({
        location: {
          lat: '',
          long: ''
        },
        endLocation: {
          lat: '',
          long: ''
        }
    });

    async function createLocation(){
      console.log({name, locations});
      console.log("Location Range", {name, location:locations.location});
      
      
      setLoading(true)
      try {
          const response = await fetch(`${baseUrl}/locations`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${user.data.access_token}`
            },
            body: JSON.stringify({name, location:locations.location, location_range: 35 }),
            // body: JSON.stringify({name, location:locations.location, endlocation:locations.endLocation }),
          });
          const data = await response.json()
          console.log(response, data);
          
          if (response.ok) {
                setMsg("Assignment location added successfully!");
                setAlertType('success');
                return;
          } else {
                setMsg(data.message);
                setAlertType('error');
                return;
          }
      } catch (error) {
          console.error('Error adding assignment location:', error);
      }finally{
          setLoading(false)
      }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5 h-[100dvh]">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div>
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/assignment-location`)} className='cursor-pointer' />
                            <p className="md:text-[28px] text-primary-color font-[600]">Assignment Location</p>
                        </div>
                        {/* <p className='text-[#4F4F4F]'>Manage stock available in your inventory</p> */}
                    </div>
                    <div className='flex items-center gap-5'>
                        {/* <button className="text-[#2D3934] bg-white px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => setModal(true)} >Create Location</button> */}
                        {/* <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px] font-bold">Add Location</button> */}
                    </div>
                </div>
                <div className='flex item-center justify-center flex-col w-[90%] mx-auto'>
                    <div className="">
                        <p className="block text-gray-700">Location Name</p>
                        <input
                            type="text"
                            name="fullName"
                            onChange={e => setName(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <p className='block text-left mb-3 mt-6 text-gray-700'>Assignment location</p>
                    <div className='mb-5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Preferred Scan Location</p>
                            {/* <p className='text-[#19201D]'>Start Coordinates</p> */}
                        </div>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            onChange={handleStartLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            onChange={handleStartLongChange}
                        />
                        </div>
                    </div>
                    <div className='mb-5'>
                        {/* <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Location Range (in meters)</p>
                        </div> */}
                        {/* <div className='flex items-center gap-3'> */}
                        {/* <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='10'
                            onChange={e => setLocationRange(e.target.value)}
                        /> */}
                        {/* <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            onChange={handleEndLongChange}
                        /> */}
                        {/* </div> */}
                    </div>
                    {/* <div className='mb-5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#19201D]'>Stop Coordinates</p>
                        </div>
                        <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Latitude'
                            onChange={handleEndLatChange}
                        />
                        <input
                            type="text"
                            className='border py-3 px-3 rounded mt-1 w-full'
                            placeholder='Longitude'
                            onChange={handleEndLongChange}
                        />
                        </div>
                    </div> */}
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={createLocation} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Add Location</button>
                    }
                </div>
            </div>
            {
                msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
            }
        </div>
    </div>
  )
}

export default AddAssignmentLocation