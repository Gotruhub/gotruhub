import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { IoMdStar } from 'react-icons/io'
import { BiSolidTrash } from 'react-icons/bi'
import PaystackPop from "@paystack/inline-js"
import AlertModal from '../../components/alert-modals/AlertModal'

const SubSummary = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertTitle, setAlertTitle] = useState('')
    const [alertType, setAlertType] = useState()
    const [itemsInCart, setItemsInCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [subArray, setSubArray] = useState([])
    const [confirmPurchase, setConfirmPurchase] = useState(false)
    const [toggleNav, setToggleNav] = useState(false)

    // function payWithPayStack(){
    //     // console.log(id, amount, duration);

          
    //     const payStack = new PaystackPop()
    //     payStack.newTransaction({
    //       key:"pk_test_12420d20e0b354e9670266456195a13f3a03ec68",
    //       amount:totalPrice * 100,
    //       email:user.data.details.email,
    //       onSuccess(transaction){
    //         setConfirmPurchase(false)
    //         subscribeOrgs()
    //         console.log(transaction)
    //       },
    //       oncancel(){
    //         console.log("Failed Transaction")
    //       }
    //     })
    //   }

    //   async function payWithPayStack(){
    //     console.log(subArray);
    //     setIsLoading(true)
    //     console.log(itemsInCart);
    //     const res = await fetch(`${baseUrl}/plan/add-to-cart`,{
    //         method:"POST",
    //         headers:{
    //             'Content-Type':'application/json',
    //             Authorization:`Bearer ${user.data.access_token}`
    //         },
    //         body:JSON.stringify(subArray)
    //     })
    //     const data = await res.json()
    //     console.log(data);
    //     if(res.ok){
    //         setConfirmPurchase(false)
    //         payNow()
    //         // setMsg('You have successfully subscribed to Gotruhub. Share the token received with your members to have access to the mobile app.')
    //         // setAlertType('success')
    //         // setAlertTitle('Successful')
    //         // localStorage.removeItem('itemsInCart')
    //     }
    //     if(!res.ok){
    //         setMsg(data.message);
    //         setAlertType('error')
    //         setAlertTitle('Failed')
    //     }
    //     setIsLoading(false)
    //   }

      async function payNow(){
        const res = await fetch(`${baseUrl}/plan/pay`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            },
        })
        const data = await res.json()
        console.log(data.data.paystack.data.authorization_url);
        if(res.ok){
            window.location.href = data.data.paystack.data.authorization_url
        }
      }

      async function removeFeature(id){
        const res = await fetch(`${baseUrl}/plan/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        // const data = await res.json()
        console.log(res);
        if(res.ok){
            getMyPlans()
            setMsg('This feature was successfully removed from your package.')
            setAlertType('success')
            setAlertTitle('Successful')
        }
      }

      useEffect(() => {
        const calculateTotalPrice = () => {
          const total = itemsInCart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount;
          }, 0);
          setTotalPrice(total);
        };
        calculateTotalPrice();
    },[itemsInCart])

    useEffect(() => {
        getMyPlans()
    },[])

      async function getMyPlans(){
        const res = await fetch(`${baseUrl}/plan/pending`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.plans);
        setItemsInCart(data.data.plans)
      }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/subscribe')} className='cursor-pointer' />
                        <p className="text-[22px] lg:text-[28px] text-primary-color font-[600]">Subscription Summary</p>
                    </div>
                    {/* <button className="bg-[#646464] text-white px-5 py-3 rounded-[8px] text-[14px]" >Send Token</button> */}
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-left">
                        <thead class="text-[14px] border-b">
                            <tr>
                                <th scope="col" class="px-6 py-3 th1">S/N</th>
                                <th scope="col" class="px-6 py-3">Name</th>
                                <th scope="col" class="px-6 py-3">Duration</th>
                                <th scope="col" class="px-6 py-3">Pricing</th>
                                <th scope="col" class="px-6 py-3">Members</th>
                                <th scope="col" class="px-6 py-3">Total</th>
                                <th scope="col" class="px-6 py-3 th2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemsInCart && itemsInCart?.map((item, index) => (
                                    <tr style={{borderBottom:"1px solid #dcdcdc"}}>
                                        <td class="px-6 py-4">{index + 1}</td>
                                        <td class="px-6 py-4 capitalize">{item?.subscriptionType?.name}</td>
                                        <td class="px-6 py-4 capitalize">{item?.planValidity}</td>
                                        <td class="px-6 py-4">{item?.subscriptionType?.amount?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'NGN'
                                        })}</td>
                                        <td class="px-6 py-4">{item?.quantity}</td>
                                        <td class="px-6 py-4">{item?.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'NGN'
                                        })}</td>
                                        <td class="py-2 text-center text-white my-4">
                                            <button className='bg-[#9A2525] rounded-[8px] px-6 py-3' onClick={() => removeFeature(item?._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='flex items-center justify-between mt-5 px-[30px]'>
                    <p></p>
                    <div className='flex items-center gap-8'>
                        <p className='text-[#1D1D1D] font-[700] text-[18px]'>{totalPrice.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'NGN' // Change to your desired currency code (e.g., 'EUR', 'GBP', 'JPY', etc.)
                        })}</p>
                        <button onClick={payNow} className='bg-[#19201D] text-white font-[500] rounded-[8px] px-6 py-[9px]'>Pay Now</button>
                    </div>
                </div>
            </div>
        </div>
        {msg &&
            <AlertModal msg={msg} alertType={alertType} setMsg={setMsg} alertTitle={alertTitle}/>
        }
        {
            confirmPurchase &&
            <>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => { setConfirmPurchase(false)}}></div>
                <div className="flex items-center flex-col text-center justify-center gap-3 bg-white w-[450px] fixed top-[50%] left-[50%] py-[50px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                    <img src="./images/approval.svg" alt="" />
                    <p className='text-text-color font-[500]'>Confirm Purchase</p>
                    <p className='text-[#6F7975] text-[14px]'>Are you sure, you want to make this purchase</p>
                    <div className='flex items-center gap-5 justify-center mt-9'>
                        <button className='border border-[#19201D] text-[#19201D] px-5 py-3 rounded-[4px] text-[14px] w-[140px] font-[600]' onClick={() => setConfirmPurchase(false)}>Back</button>
                        <button className="bg-[#19201D] text-white px-5 py-3 rounded-[4px] text-[14px] w-[140px]" onClick={payWithPayStack} >Confirm</button>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default SubSummary