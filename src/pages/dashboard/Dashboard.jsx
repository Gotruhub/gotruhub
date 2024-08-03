import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '../../components/alert/Alert';
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
import { PiStudentDuotone } from "react-icons/pi";
import { TbCurrencyNaira } from "react-icons/tb";


const Dashboard = ({ baseUrl }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orgzHistory, setOrgzHistory] = useState();
  const navigate = useNavigate();
  const [passHistory, setPassHistory] = useState([]);
  const [allWithdrawals, setAllWithdrawals] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [toggleNav, setToggleNav] = useState(false)
  const [modal, setModal] = useState(false);
  const [unitsArray, setUnitsArray] = useState([])

  useEffect(() => {
    getPassHistory();
    getOrgzHistory();
    getAllWithdrawals()
    getAllProductsInStock()
    getAllUnits()
  }, []);

  useEffect(() => {
    // Ensure user is logged in
    if (!user) {
      navigate('/login');
      return; // Exit early if no user
    }

    // Check if the page has been reloaded
    if (!sessionStorage.getItem("reloaded")) {
      // Use sessionStorage to ensure it's only reloaded once per session
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, [navigate, user]);

  async function getOrgzHistory() {
    const res = await fetch(`${baseUrl}/my-orgnz-summary`, {
      headers: {
        'Authorization': `Bearer ${user.data.access_token}`
      }
    });
    const data = await res.json();
    setOrgzHistory(data.data);
    console.log(data);
  }

  async function getPassHistory() {
    const res = await fetch(`${baseUrl}/pass-history`, {
      headers: {
        'Authorization': `Bearer ${user.data.access_token}`
      }
    });
    const data = await res.json();
    setPassHistory(data.data);
    console.log(data);
  }

  async function getAllWithdrawals(){
    const res = await fetch(`${baseUrl}/trade/withdrawals`, {
      headers: {
        'Authorization':`Bearer ${user.data.access_token}`
      }
    })
    const data = await res.json()
    console.log(data.data);
    if(res.ok){
      setAllWithdrawals(data.data.withdrawalRequests)
    }
    console.log(data);
  }

  async function getAllProductsInStock(){
    const res = await fetch(`${baseUrl}/trade/products`, {
      headers: {
        'Authorization':`Bearer ${user.data.access_token}`
      }
    })
    const data = await res.json()
    setAllProducts(data.data.products)
    console.log(data.data);
    if(res.ok){
      // setAllWithdrawals(data.data.withdrawalRequests)
    }
    console.log(data);
  }

  async function getAllUnits(){
    const response = await fetch(`${baseUrl}/units`, {
        method: 'GET',
        headers: {
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await response.json()
    console.log(data);
    setUnitsArray(data?.data?.units)
  }

  function checkUnit(){
    console.log(unitsArray.length);
    if(unitsArray?.length > 0){
      navigate('/create-user')
    } else {
      setModal('units')
    }
  }

  return (
    <div>
      <>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] bg-[#F2FCF7] ml-auto">
          <TopNav setToggleNav={setToggleNav} toggleNav={toggleNav}/>
          <div className="px-[10px] md:px-[30px] py-[1rem]">
            <div className="flex items-start justify-between mb-[1rem] flex-col md:flex-row">
              <p className="lg:text-[28px] text-[24px] mb-4 text-primary-color font-[600] w-full">Dashboard</p>
              <div className="flex items-center gap-3 w-full justify-end">
                {/* <button className="py-3 px-4 border border-[#1D1D1D] rounded-[8px] text-[14px] lg:w-auto w-full" onClick={() => navigate('/subscribe')}>Subscribe</button> */}
                {
                  orgzHistory?.totalStaffs > 0  ?
                  <>
                    <button className="py-3 px-4 border border-[#1D1D1D] rounded-[8px] text-[14px] lg:w-auto w-full" onClick={() => navigate('/create-unit')}>Create Units</button>
                    <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] text-[14px] lg:w-auto w-full" onClick={checkUnit}>Create Users</button>
                  </>
                  :
                  <button className="bg-[#2D3934] text-white px-4 py-3 rounded-[8px] text-[14px] lg:w-auto w-full" onClick={() => navigate("/create-user")}>Create Staff</button>
                }
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 bg-white px-5 py-5 rounded-[12px]">
              <div className="border-r pr-5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[#4F4F4F]">Students</p>
                  <div className="bg-[#3EB7B7] p-2 text-white rounded-full">
                    <PiStudentDuotone />
                  </div>
                </div>
                <p className="font-[600] text-text-color lg:text-[24px] text-[20px]">{orgzHistory?.totalStudents}</p>
                {/* <div className="flex items-center mt-2">
                  <img src="./images/arrow-up.svg" alt="" />
                  <p className="text-[#25751E] text-[12px]">+15% this week</p>
                </div> */}
              </div>
              <div className="lg:border-r pr-5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[#4F4F4F]">Guardian</p>
                  <img src="./images/members.svg" alt="" />
                </div>
                <p className="font-[600] text-text-color lg:text-[24px] text-[20px]">{orgzHistory?.totalGuardian}</p>
                {/* <div className="flex items-center mt-2">
                  <img src="./images/arrow-down.svg" alt="" />
                  <p className="text-[#9A2525] text-[12px]">-15% this week</p>
                </div> */}
              </div>
              <div className="border-r pr-5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[#4F4F4F]">Staff</p>
                  <img src="./images/members.svg" alt="" />
                </div>
                <p className="font-[600] text-text-color lg:text-[24px] text-[20px]">{orgzHistory?.totalStaffs}</p>
                {/* <div className="flex items-center mt-2">
                  <img src="./images/arrow-up.svg" alt="" />
                  <p className="text-[#25751E] text-[12px]">+10% this week</p>
                </div> */}
              </div>
              <div className="">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[#4F4F4F]">Stocks</p>
                  <img src="./images/stock.svg" alt="" />
                </div>
                <p className="font-[600] text-text-color lg:text-[24px] text-[20px]">{orgzHistory?.totalStocks}</p>
                {/* <div className="flex items-center mt-2">
                  <img src="./images/arrow-up.svg" alt="" />
                  <p className="text-[#25751E] text-[12px]">+1% this week</p>
                </div> */}
              </div>
            </div>
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="w-[100%] md:w-[60%] bg-white rounded-[8px] mt-[1rem] p-5 self-start h-[400px] overflow-y-scroll">
                <p className="text-[#4F4F4F] text-[14px] font-[500]">Recent Activities</p>
                <p className="text-[#828282] text-[14px] mt-7 mb-1 font-[500]">Today</p>
                {
                  passHistory?.map((item, index) => {
                    const formattedTime = new Date(item?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                    return (
                      <div className="bg-[#25751E0A] mb-5 px-4 py-2 rounded-[8px] text-[14px]">
                        <div className="flex items-center gap-10" key={index}>
                          <div className='flex items-center gap-1 py-3'>
                            <img src={item?.user?.profileImage?.file} className='w-[30px]' alt="" />
                            <p>{item?.user?.fullName}</p>
                          </div>
                          <div>
                            <p className={item?.actionType === "sign-out" ? 'text-[#255e9a] py-1 px-2 rounded-[3px] bg-[#25589a66] inline':'text-[#418B47] py-1 px-2 rounded-[3px] bg-[#5FB56766] inline'}>{item?.actionType}</p>
                          </div>
                          <div className='text-[#25751E] underline'>{item?.coordinate[0]}, {item?.coordinate[1]}</div>
                          <div className="text-[#4F4F4F]">{formattedTime}</div>
                        </div>
                        <div className="flex item-center justify-between">
                          <p></p>
                          <p className="text-[#19201D] underline text-end cursor-pointer" onClick={() => navigate('/pass')}>See More</p>
                        </div>
                      </div>
                    )
                  })
                }
                {
                  passHistory?.length === 0 && <p className="text-[#4F4F4F] text-[14px] text-center mt-20">No activities found.</p>
                }
              </div>
              <div className="w-[100%] md:w-[40%] self-start">
                <div className="w-full bg-white rounded-[8px] mt-[1rem] p-5 h-[300px] overflow-y-scroll">
                  <div className="flex items-center justify-between text-[#4F4F4F] text-[14px] mb-6 font-[500]">
                    <p>Stock Update</p>
                    <p>{allProducts?.length} Products</p>
                  </div>
                  {
                    allProducts && allProducts?.map((item, index) => {
                      return(
                        <div className="flex text-[14px] justify-between mb-3">
                          <div className="flex items-center gap-[6px]">
                            <img src="" alt="" />
                            <p className="text-[#4F4F4F] pb-1">{item.productName}</p>
                          </div>
                          {
                            item?.quantity <= 30 && <p className="flex items-center gap-[2px] text-[#9A2525]">{item.quantity}</p>
                          }
                          {
                            item?.quantity >= 31 && <p className="flex items-center text-[#19201D] gap-[2px]">{item.quantity}</p>
                          }
                        </div>
                      )
                    })
                  }
                  {
                    allProducts?.length === 0 && <p className="text-[#4F4F4F] text-[14px] text-center mt-20">No products found.</p>
                  }
                </div>
                <div className="w-full bg-white rounded-[8px] mt-[1rem] p-5 h-[300px] overflow-y-scroll">
                  <p className="text-[#4F4F4F] text-[14px] mb-4 font-[500]">Withdrawal Request</p>
                  {
                    allWithdrawals?.map((item, index) => {
                      const formattedDate = new Date(item?.createdAt).toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
                      const formattedTime = new Date(item?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      return(
                        <div className="flex text-[14px] justify-between mb-5">
                          <div>
                            <p className="text-[#4F4F4F] pb-1">Frank</p>
                            <p className="flex items-center gap-3">{formattedDate} <p className="p-[3px] bg-[#828282] rounded-full"></p> {formattedTime}</p>
                          </div>
                          {
                            item?.status === "pending" && <p className="flex items-center gap-[2px] text-[#D8A04C]"><TbCurrencyNaira className="text-[20px]"/>{item.amount}</p>
                          }
                          {
                            item?.status === "rejected" && <p className="flex items-center gap-[2px] text-[#9A2525]"><TbCurrencyNaira className="text-[20px]"/>{item.amount}</p>
                          }
                          {
                            item?.status === "completed" && <p className="flex items-center gap-[2px] text-[#418B47]"><TbCurrencyNaira className="text-[20px]"/>{item.amount}</p>
                          }
                        </div>
                      )
                    })
                  }
                  {
                    allWithdrawals?.length === 0 && <p className="text-[#4F4F4F] text-[14px] text-center mt-20">No withdrawals found.</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* {
        msg && <Alert msg={"Successfully Logged in"} setMsg={setMsg} alertType={'error'} />
      } */}

        { modal === 'staff' && 
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {
                setCreateUnitModal('')
                }}>
              </div>
              <div className="flex items-center flex-col text-center justify-center gap-3 bg-white md:w-[450px] w-[95%] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                  <img src="./images/failed.svg" alt="" />
                  <p className='text-text-color font-[500]'>Staff(s) not found</p>
                  <p className='text-[#6F7975] text-[14px]'>Please create at least a staff before creating a unit this operationn can be done, using the button below and choose staff in the user type drop down</p>
                  <button className='text-white bg-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[16px] text-center mx-auto' onClick={() => navigate('/create-user')} >Proceed</button>
              </div>
          </>
        }

        { modal === 'units' && 
          <>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {
                setModal('')
                }}>
              </div>
              <div className="flex items-center flex-col text-center justify-center gap-3 bg-white md:w-[450px] w-[95%] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                  <img src="./images/failed.svg" alt="" />
                  <p className='text-text-color font-[500]'>Units(s) not found</p>
                  <p className='text-[#6F7975] text-[14px]'>Please create at least a unit before creating a user this operationn can be done, using the button below</p>
                  <button className='text-white bg-primary-color rounded-[4px] mt-[1.5rem] px-[35px] py-[16px] text-center mx-auto' onClick={() => navigate('/create-unit')} >Proceed</button>
              </div>
          </>
        }
    </div>
  );
}

export default Dashboard;
