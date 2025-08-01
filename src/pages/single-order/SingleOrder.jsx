import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { CiFilter } from 'react-icons/ci'
import { GoChevronDown } from 'react-icons/go'
import { useNavigate, useParams } from 'react-router-dom'
import { TbCurrencyNaira } from 'react-icons/tb'

const SingleOrder = ({baseUrl}) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('user'))
    const [order, setOrder] = useState()
    const [subtotal, setSubTotal] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    async function getOrderInfo(){
        const response = await fetch(`${baseUrl}/trade/admin/orders/${id}`,{
            headers:{
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await response.json()
        setOrder(data.data)
        setSubTotal(data?.data?.items?.reduce((accumulator, item) => accumulator + item.product.price, 0))
        console.log(data.data, subtotal)
    }

    useEffect(() => {
        getOrderInfo()
    },[])

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/orders')} className='cursor-pointer' />
                            <p className="text-[14px] lg:text-[20px] text-primary-color font-[600]">
                                #{order?._id}
                            </p>
                        </div>
                    </div>
                </div>
                {/* {order?.status !== 'delivered' &&
                    <div className='flex items-center px-[10px] lg:px-[30px] gap-2'>
                        <img className='w-[30px] h-[30px] rounded-full' src={order?.attendant?.profileImage?.file} alt="" />
                        <p className='font-bold'>{order?.attendant?.fullName}</p>
                        <p>-</p>
                        <p className='capitalize'>{order?.attendant?.role}</p>
                    </div>
                } */}
                <div class="relative overflow-x-auto py-8 px-4 md:px-8 flex flex-col justify-center items-center gap-3">
                    <div className='flex items-center justify-center flex-col'>
                        <img src={order?.user?.profileImage?.file} className='w-[60px] h-[60px] mb-1 object-cover rounded-full' alt="" />
                        <p className='text-[#4F4F4F] font-[600] text-[24px]'>{order?.user?.fullName}</p>
                        <p className='text-[#757575] mb-2 capitalize'>{order?.user?.role} - {order?.user?.subUnit?.name}</p>
                        <p className={order?.status === 'delivered' ? 'text-[#25751E] bg-[#25751E1A] px-3 rounded-full py-[2px] capitalize':'text-[#9A7225] bg-[#9A72251A] px-3 rounded-full py-[2px] capitalize'}>{order?.status}</p>
                    </div>
                    {
                        order?.status === 'delivered' &&
                        <>
                            <div className='md:w-[400px] w-[95%] mt-5'>
                                <p className='text-[#828282]'>Received by</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#19201D] font-[500] capitalize'>{order?.collectedBy?.fullName}</p>
                                    <p className='text-[#25751E] capitalize'>{order?.collectedBy?.role}</p>
                                </div>
                            </div>
                            <div className='md:w-[400px] w-[95%]'>
                                <p className='text-[#828282]'>Delivered by</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#19201D] font-[500] capitalize'>{order?.attendant?.fullName}</p>
                                    <p className='text-[#25751E] capitalize'>{order?.attendant?.role}</p>
                                </div>
                            </div>
                            <div className='md:w-[400px] w-[95%] mb-5'>
                                <p className='text-[#828282]'>Delivered on</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#19201D] font-[500] capitalize'>{ new Date(order?.updatedAt).toDateString() }</p>
                                    {/* <p className='text-[#25751E] capitalize'>{order?.attendant?.role}</p> */}
                                </div>
                            </div>
                        </>
                    }
                    {/* <div className='w-[400px] mt-5 border-b pb-5'>
                        <div>
                            <div>
                                <p className='text-[#828282]'>Received by</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#19201D]'>{order?.user?.fullName}</p>
                                <p className='text-[#25751E] capitalize'>{order?.user?.role}</p>
                            </div>
                        </div>
                        <div className='mt-7'>
                            <div>
                                <p className='text-[#828282]'>Delivered by</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#19201D]'>{order?.attendant?.fullName}</p>
                                <p className='text-[#25751E] capitalize'>{order?.attendant?.role}</p>
                            </div>
                        </div>
                    </div> */}
                    <div className='md:w-[400px] w-[95%] mt-5 pb-5'>
                        <div className='flex items-center justify-between text-[#828282] mb-2'>
                            <div className='flex items-center gap-6'>
                                <p>S/N</p>
                                <p>Product</p>
                            </div>
                            <p>Price</p>
                        </div>
                        {
                            
                            order?.items?.map((item, index) => {
                                return (
                                    <div className='border-b pb-3 mb-3'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-11'>
                                                <p>{index + 1}</p>
                                                <p>{item?.product?.productName}</p>
                                            </div>
                                            <p className='flex items-center gap-[1px]'><TbCurrencyNaira className="text-[20px]"/>{(item?.product?.price * item?.quantity).toLocaleString()}</p>
                                        </div>
                                        <p className='text-[#828282] ml-[3.2rem] text-[14px]'>Category: {item?.product?.category?.name}</p>
                                        {
                                            item?.product?.colors?.length > 0 &&
                                            <div className='flex items-center gap-1 mt-[6px] text-[#828282] ml-[3.2rem] text-[14px]'>
                                                <p>Colour:</p>
                                                {
                                                    item?.product?.colors?.map(color => (
                                                        <p>{color}</p>
                                                    ))
                                                }
                                            </div>
                                        }
                                        {
                                            <div className='flex items-center gap-1 mt-[6px] text-[#828282] ml-[3.2rem] text-[14px]'>
                                                <p>Quantity:</p>
                                                <p>{item?.quantity}</p>
                                            </div>
                                        }
                                        {
                                            <div className='flex items-center gap-1 mt-[6px] text-[#828282] ml-[3.2rem] text-[14px]'>
                                                <p>Unit Price:</p>
                                                <p className='flex items-center gap-[1px]'><TbCurrencyNaira className="text-[18px]"/>{item?.product?.price.toLocaleString()}</p>
                                            </div>
                                        }
                                        {
                                            item?.product?.size?.length > 0 &&
                                            <div className='flex items-center gap-1 text-[#828282] ml-[3.2rem] text-[14px]'>
                                                <p>Size:</p>
                                                {
                                                    item?.product?.size?.map(siz => (
                                                        <p>{siz}</p>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                        

                        {/* <div className='border-b pb-3'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-11'>
                                    <p>2.</p>
                                    <p>Cheeseballs</p>
                                </div>
                                <p>#500</p>
                            </div>
                            <p className='text-[#828282] ml-[3.2rem]'>Unit: 3</p>
                        </div> */}
                        <div className='mt-5 flex gap-3 flex-col'>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#828282]'>Subtotal</p>
                                <p className='flex items-center gap-[1px]'><TbCurrencyNaira className="text-[20px]"/>{order?.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#828282]'>Tax</p>
                                <p className='flex items-center gap-[1px]'><TbCurrencyNaira className="text-[20px]"/>0</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-[#828282]'>Total</p>
                                <p className='flex items-center gap-[1px] font-[600] text-lg'><TbCurrencyNaira className="text-[20px]"/>{order?.totalAmount.toLocaleString()}</p>
                                {/* <p className='flex items-center gap-[1px]'><TbCurrencyNaira className="text-[20px]"/>{Number(subtotal).toFixed(2)}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleOrder