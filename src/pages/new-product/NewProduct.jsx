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
import { MdOutlineFileUpload } from 'react-icons/md';

const NewProduct = ({baseUrl}) => {

    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [dropDown, setDropDown] = useState(false)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const user = JSON.parse(localStorage.getItem('user'))
    const sizeArray = ["medium", 'large', 'x-large', 'small']
    const flavorArray = ["vanilla", 'chocolate']
    const colorArray = ["red", 'blue', 'yellow', 'brown']
    
    const [productCoverImage, setProductCoverImage] = useState('')
    const [price, setPrice] = useState()
    const [description, setDescription] = useState(' ')
    const [productName, setProductName] = useState('')
    const [quantity, setQuantity] = useState()
    const [minimumQuantity, setMinimumQuantity] = useState()
    const [toggleNav, setToggleNav] = useState(false)

    const [fileUploadLoader, setfileUploadLoader] = useState(false)

    const navigate = useNavigate()

    async function getCategories(){
        const res = await fetch(`${baseUrl}/trade/category`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        setAllCategories(data.data.categoryExist)
    }

    useEffect(() => {
        getCategories()
    },[])

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedFlavors, setSelectedFlavors] = useState([]);

    async function handleFileUpload(file){
        console.log('file upload');
        setfileUploadLoader(true)
        console.log(`${baseUrl}/upload-media`);
        const formData = new FormData()
        formData.append('file', file)
        console.log(formData);
        const res = await fetch(`${baseUrl}/upload-media`,{
          method:"POST",
          body: formData
        })
        console.log(res);
        const data = await res.json()
        console.log(data);
        if(res) setfileUploadLoader(false)
        if(res.ok) {
          setMsg("File uploaded successfully");
          setAlertType('success')
          setProductCoverImage(data.data)
        }
        if(!res.ok){
          setMsg("File upload wasn't successfull");
          setAlertType('error')
        }
      }

    const handleCheckboxChangeForColor = async (event, color) => {
      if (event.target.checked) {
        setSelectedColors([...selectedColors, color]);
      } else {
        setSelectedColors(selectedColors.filter(c => c !== color));
      }
    };

    const handleCheckboxChangeForFlavors = async (event, color) => {
      if (event.target.checked) {
        setSelectedFlavors([...selectedFlavors, color]);
      } else {
        setSelectedFlavors(selectedFlavors.filter(c => c !== color));
      }
    };

    const handleCheckboxChangeForSizes = async (event, size) => {
        if (event.target.checked) {
          setSelectedSizes([...selectedSizes, size]);
        } else {
          setSelectedSizes(selectedSizes.filter(s => s !== size));
        }
      };

      async function createProduct(){
        console.log(productCoverImage);
        if(!productName || !selectedCategory || !price || !minimumQuantity || !quantity){
            setMsg("Please fill in the required fields")
            setAlertType('error')
            return
        }else{
            setLoading(true)
            const res = await fetch(`${baseUrl}/trade/products`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body: JSON.stringify({price, description, category:selectedCategory._id, productName, quantity, minimumQuantity, colors:selectedColors, flavor:selectedFlavors, size:selectedSizes, productCoverImage:productCoverImage._id})
            })
            const data = await res.json()
            if(res) setLoading(false)
            if(data.success){
                setMsg(data.message)
                setAlertType('success')
                navigate(`/inventory`)
            }else{
                setMsg(data.message)
                setAlertType('error')
            }
        }
        console.log({price, description, category:selectedCategory._id, productName, quantity, minimumQuantity, colors:selectedColors, flavor:selectedFlavors, size:selectedSizes, productCoverImage:productCoverImage._id});
      }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5 h-[100vh]">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div>
                        <div className="flex items-center gap-2">
                            <img src="./images/arrow-left.svg" alt="" onClick={() => navigate(`/inventory`)} className='cursor-pointer' />
                            <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Inventory</p>
                        </div>
                        <p className='text-[#4F4F4F] text-[12px] lg:text-[16px]'>Manage stock available in your inventory</p>
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <button className="text-[#2D3934] bg-white px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => setModal(true)} >Create category</button>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px] font-bold">Add new product</button>
                    </div> */}
                </div>

                <div>
                    <div className='flex item-center justify-center flex-col w-[90%] mx-auto'>
                        <div className=''>
                            <p className='text-[#19201D] text-[18px] mb-2 font-[700]'>About</p>
                            <div>
                                <div className='relative w-full mb-7'>
                                    <p className='text-[#19201D] mb-1'>Category</p>
                                    <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                        <input type="text" placeholder='Select category' value={selectedCategory?.name} className='outline-none rounded-[4px] bg-transparent w-full'/>
                                        <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setDropDown(dropDown === 'category' ? false : "category")}/>
                                    </div>
                                    {
                                        dropDown === 'category' &&
                                        <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                            {
                                                allCategories?.map(category => (
                                                    <div className='px-3 border-b pb-3 cursor-pointer mb-3' onClick={() => {
                                                        setDropDown(false)
                                                        setSelectedCategory(category)
                                                    }}>
                                                        <p className='text-[#1D1D1D] capitalize text-[12px]'>{category.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                                <div className='w-full'>
                                    <label className='block text-left mb-2 text-[#19201D]'>Product name <span className='text-red-500'>*</span></label>
                                    <input type="text" onChange={e => setProductName(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                                </div>
                                <div className='w-full'>
                                    <label className='block text-left mb-2'>Product description (Max 50 characters)</label>
                                    <input type="text" onChange={e => setDescription(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                                </div>
                            </div>
                        </div>

                        <div className='mt-12'>
                            <p className='text-[#19201D] text-[18px] mb-2 font-[700]'>Quantity and pricing</p>
                            <div className='flex flex-col sm:flex-row items-center gap-5 w-full mb-7'>
                                <div className='w-full'>
                                    <label className='block text-left mb-2 text-[#19201D]'>Quantity<span className='text-red-500'>*</span></label>
                                    <input type="number" onChange={e => setQuantity(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                                </div>
                                <div className='w-full'>
                                    <label className='block text-left mb-2'>Minimum quantity</label>
                                    <input type="number" onChange={e => setMinimumQuantity(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center gap-5 w-full'>
                                <div className='w-full'>
                                    <label className='block text-left mb-2 text-[#19201D]'>Price <span className='text-red-500'>*</span></label>
                                    <input type="number" onChange={e => setPrice(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                                </div>
                                {/* <div className='w-full'>
                                    <label className='block text-left mb-2'>Weight</label>
                                    <input type="text" onChange={e => setPrimaryContactEmail(e.target.value)} className='px-4 py-3 outline-none border w-full rounded-[4px]'/>
                                </div> */}
                            </div>
                        </div>

                        <div className='mt-12'>
                            <p className='text-[#19201D] text-[18px] mb-2 font-[700]'>More product info</p>
                            <div className='relative w-full mb-7'>
                                <p className='text-[#19201D] mb-1'>Color</p>
                                <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                    {selectedColors.length > 0 ? (
                                        <ul className='flex items-center text-[12px] gap-2'>
                                            {selectedColors.map((c) => (
                                            <li key={c} className='bg-gray-300 p-1 rounded-[4px] capitalize'>{c}</li>
                                            ))}
                                        </ul>
                                        ) : (
                                        <p>No color selected.</p>
                                    )}
                                    <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setDropDown(dropDown === 'color' ? false : 'color' )}/>
                                </div>
                                {
                                    dropDown === 'color' &&
                                    <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                        {
                                            colorArray?.map(color => (
                                                <div className='px-3 border-b pb-3 cursor-pointer mb-3 flex gap-1'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedColors.some(c => c === color)}
                                                        onChange={(e) => handleCheckboxChangeForColor(e, color)}
                                                    />
                                                    <p className='text-[#1D1D1D] capitalize text-[12px]'>{color}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className='relative w-full mb-7'>
                                <p className='text-[#19201D] mb-1'>Size</p>
                                <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                    {selectedSizes.length > 0 ? (
                                        <ul className='flex items-center text-[12px] gap-2'>
                                            {selectedSizes.map((s) => (
                                            <li key={s} className='bg-gray-300 p-1 rounded-[4px] capitalize'>{s}</li>
                                            ))}
                                        </ul>
                                        ) : (
                                        <p>No size selected.</p>
                                    )}
                                    <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setDropDown(dropDown === 'size' ? false : 'size' )}/>
                                </div>
                                {
                                    dropDown === 'size' &&
                                    <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                        {
                                            sizeArray?.map(size => (
                                                <div className='px-3 border-b pb-3 cursor-pointer mb-3 flex gap-1'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSizes.some(s => s === size)}
                                                        onChange={(e) => handleCheckboxChangeForSizes(e, size)}
                                                    />
                                                    <p className='text-[#1D1D1D] capitalize text-[12px]'>{size}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>


                            <div className='relative w-full mb-7'>
                                <p className='text-[#19201D] mb-1'>Flavor</p>
                                <div className='flex items-center justify-between px-4 py-3 border w-full rounded-[4px]'>
                                    {selectedFlavors.length > 0 ? (
                                        <ul className='flex items-center text-[12px] gap-2'>
                                            {selectedFlavors.map((f) => (
                                            <li key={f} className='bg-gray-300 p-1 rounded-[4px] capitalize'>{f}</li>
                                            ))}
                                        </ul>
                                        ) : (
                                        <p>No flavor selected.</p>
                                    )}
                                    <IoChevronDownOutline color="d7d7d7" cursor='pointer' onClick={() => setDropDown(dropDown === 'flavor' ? false : 'flavor' )}/>
                                </div>
                                {
                                    dropDown === 'flavor' &&
                                    <div className='py-5 bg-white absolute overflow-y-scroll border h-[220px] px-3 rounded-[12px] mt-2 z-[10] w-full'>
                                        {
                                            flavorArray?.map(flavor => (
                                                <div className='px-3 border-b pb-3 cursor-pointer mb-3 flex gap-1'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFlavors.some(f => f === flavor)}
                                                        onChange={(e) => handleCheckboxChangeForFlavors(e, flavor)}
                                                    />
                                                    <p className='text-[#1D1D1D] capitalize text-[12px]'>{flavor}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='relative flex items-center gap-3 p-4 rounded-[4px] w-full cursor-pointer' style={{ border:'1px dashed gray' }}>
                            {productCoverImage ? (
                                <div className='py-[10px] flex items-center flex-col gap-3'>
                                    <img src={productCoverImage?.file} className='w-[100px] h-[100px]'/>
                                    <button className='bg-gray-800 text-white p-2 rounded text-[12px]'>Change Image</button>
                                </div>
                                ) : (
                                <>
                                    <input
                                        className='cursor-pointer opacity-0 w-full h-full absolute left-0'
                                        type="file"
                                        onChange={(e) => handleFileUpload(e.target.files[0])} 
                                    />
                                    <div className='bg-[#EDFFF7] text-[#40916C] p-4 rounded-full'>
                                        <MdOutlineFileUpload />
                                    </div>
                                    <p className='text-[#6F7975] text-[12px]'>Product Image</p>
                                </>
                            )}
                        </div>
                        <div className='mb-10'>
                            {
                                loading ? 
                                <BtnLoader bgColor="#191f1c"/>
                                :
                                <button onClick={createProduct} className='text-white bg-primary-color w-full rounded-[4px] mt-[.5rem] px-[35px] py-[16px] text-center mx-auto'>Create Product</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            fileUploadLoader &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-white" style={{ borderRadius:'10px' }}>
                    {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                    <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col" style={{ padding:'2rem', textAlign:'center' }} >
                        <img src='./images/loader.gif' style={{ height:'40px', width:'40px', margin:'12px auto 30px' }} />
                        <p className='text-gray-500 text-[15px] mb-2 text-center'>File Upload in progress, please do not refresh the page</p>
                    </div>
                </div>
            </div>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default NewProduct