import React, { useEffect, useState } from 'react'
import TopNav from '../../components/top-nav/TopNav'
import SideNav from '../../components/side-nav/SideNav'
import { useNavigate, useParams } from 'react-router-dom'
import { IoChevronDownOutline, IoCloseOutline, IoWalletOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { IoMdInformationCircleOutline } from 'react-icons/io';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import { TbCurrencyNaira } from 'react-icons/tb';
import Alert from '../../components/alert/Alert';

const Inventory = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [dropDown, setDropDown] = useState()
    const [allProducts, setAllProducts] = useState([])
    const [selectedStaff, setSelectedStaff] = useState()
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [toggleNav, setToggleNav] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        getAllProducts()
    },[])

    async function getAllProducts(){
        const res = await fetch(`${baseUrl}/trade/products`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        // data.data.categoryExist.sort((a, b) => a.name.localeCompare(b.name))
        setAllProducts(data.data.products.sort((a, b) => a.productName.localeCompare(b.productName)))
    }


  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto pb-5 h-[100vh]">
          <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
          <div className="">
              <div className="flex flex-col lg:flex-row gap-5 justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                  <div>
                      <div className="flex items-center gap-2">
                          <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/`)} className='cursor-pointer' />
                          <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Inventory</p>
                      </div>
                      <p className='text-[#4F4F4F]'>Manage stock available in your inventory</p>
                  </div>
                  <div className='flex items-center gap-5'>
                      <button className="text-[#2D3934] bg-white px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => navigate('/categories')} >Category</button>
                      <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => navigate('/new-product')}>Add new product</button>
                  </div>
              </div>
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-left">
                    <thead class="text-[14px] border-b">
                        <tr>
                            <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Category</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Product Name</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Price</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Minimum Order</th>
                            <th scope="col" class="px-6 py-3 font-[700]">Status</th>
                            <th scope="col" class="px-2 py-3 font-[700]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProducts && allProducts?.map((product, index) => {
                                return(
                                    <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                        <td class="px-6 py-4">{index +1}</td>
                                        <td class="px-6 py-4 flex items-center gap-1 capitalize">{product?.category?.name}</td>
                                        <td class="px-6 py-4">{product?.productName}</td>
                                        <td class="px-6 py-4 capitalize flex items-center gap-1"><TbCurrencyNaira className="text-[20px]"/>{product?.price.toLocaleString()}</td>
                                        <td class="px-6 py-4">{product?.minimumQuantity}</td>
                                        <td class="px-6 py-4">
                                            <p className={product?.inStock === false ? `bg-red-400 text-center py-1 capitalize rounded-[4px] text-white` : `bg-green-500 text-center py-1 text-white capitalize rounded-[4px]`}>{product?.inStock === true ? "Available" : "Out of stock"}</p>
                                        </td>
                                        <td>
                                        <button className='text-white bg-[#2D3934] px-4 py-2 rounded-[4px]' 
                                        onClick={() => {
                                            navigate(`/product-info/${product._id}`)
                                        }}
                                        >More</button>  
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {/* <ReactPaginate
                    previousLabel={'Prev'}
                    nextLabel = {'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName='flex items-center gap-9 mt-5 justify-end pr-[30px] paginationBtns'
                    activeClassName='bg-secondary-color text-white'
                    disabledClassName='bg-gray-500 cursor-not-allowed'
                /> */}
            </div>
              {/* <div className='flex item-center justify-center flex-col w-[50%] mx-auto gap-8'>
                  <div>
                      <p className='text-[#19201D] mb-1'>Curernt coordinator</p>
                      <p className='border border-[#25751E] rounded-[6px] py-3 px-5 bg-[#25751E26]'>Frank nd Glory</p>
                  </div>
                  <div>
                      <div className='relative w-full'>
                          <p className='text-[#19201D] mb-1'>Sub-unit coordinator</p>
                          <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                              <input type="text" value={selectedStaff?.fullName} placeholder='Select coordinator' className='outline-none rounded-[4px] bg-transparent w-full'/>
                              <IoChevronDownOutline color="black" cursor='pointer' onClick={() => setDropDown(dropDown === 'co-ordinator' ? false : "co-ordinator")}/>
                          </div>
                          {dropDown === 'co-ordinator' &&
                              <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                  {
                                      allStaffs?.map(stf => (
                                          <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                              setDropDown(false)
                                              setSelectedStaff(stf)
                                          }}>
                                              <p className='text-[#1D1D1D] capitalize text-[12px]'>{stf.fullName}</p>
                                          </div>
                                      ))
                                  }
                              </div>
                          }
                      </div>
                  </div>
                  <div className='text-[#865C1D] text-[14px] flex items-center gap-1 mt-[-30px] mb-4'>
                          <IoMdInformationCircleOutline />
                          <p>Each assignment costs NGN 100</p>
                      </div>

                      {
                          loading ? 
                          <BtnLoader bgColor="#191f1c"/>
                          :
                          <button onClick={addCoOrdinator} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Update coordinator</button>
                      }
              </div> */}
          </div>
      </div>
    {
        msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
    }
  </div>
  )
}

export default Inventory