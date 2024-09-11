import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import { useNavigate } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { GoTrash } from 'react-icons/go'
import { IoCloseOutline } from 'react-icons/io5'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import Alert from '../../components/alert/Alert'

const Category = ({baseUrl}) => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [allCategories, setAllCategories] = useState([])
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [loading, setLoading] = useState(false)

    const [editCategory, setEditCategory] = useState()
    const [deleteCategory, setDeleteCategory] = useState()
    const [toggleNav, setToggleNav] = useState(false)
    const [name, setName] = useState('')

    const [modal, setModal] = useState('')

    useEffect(() =>{
        getAllCategories()
    },[])

    async function getAllCategories(){
        const res = await fetch(`${baseUrl}/trade/category`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data);
        if(!res.ok){
            setMsg(data.message);
            setAlertType('error');
            return;
        }
        if(res.ok){
            setAllCategories(data.data.categoryExist);
            setAlertType('success');
            return;
        }
    }

    async function addCategory(){
        if(!name){
            setMsg('Please enter a category name.');
            setAlertType('error');
            return;
        }else{
            setLoading(true)
            const res = await fetch(`${baseUrl}/trade/category`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body:JSON.stringify({name})
            })
            const data = await res.json()
            console.log(data);
            if(res) setLoading(false)
            if(res.ok){
                setMsg('Category created successfully.');
                setAlertType('success');
                setModal(false);
                setName('');
                getAllCategories()
            }else{
                setMsg(data.message);
                setAlertType('error');
            }
            setLoading(false)
        }
    }

    async function deleteCategoryFn(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/trade/category/${deleteCategory}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res) setLoading(false)
        if(res.ok){
            setMsg('Category deleted successfully.');
            setAlertType('success');
            setDeleteCategory(false);
            getAllCategories()
        }else{
            setMsg("An error occurred while deleting");
            setAlertType('error');
        }
    }

    async function editCategoryFn(){
        if(!name){
            setMsg('Please enter a category name.');
            setAlertType('error');
            return;
        }else{
            setLoading(true)
            const res = await fetch(`${baseUrl}/trade/category/${editCategory}`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${user.data.access_token}`
                },
                body:JSON.stringify({name})
            })
            const data = await res.json()
            console.log(data);
            if(res) setLoading(false)
            if(res.ok){
                setMsg('Category created successfully.');
                setAlertType('success');
                setModal(false);
                setEditCategory('');
                getAllCategories()
            }else{
                setMsg(data.message);
                setAlertType('error');
            }
            setLoading(false)
        }
    }

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Categories</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <button className="bg-[#2D3934] text-white px-5 py-3 rounded-[8px] text-[14px]" onClick={() => setModal('create-category')}>Create Category</button>
                    </div>
                </div>
                <div className='px-[10px] lg:px-[30px]'>
                    {
                        allCategories.length < 1 &&
                        <div className="flex items-center gap-5 justify-center text-center px-[3rem]">
                            <p>No Category Available</p>
                        </div>
                    }
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-left">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Name</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Created At</th>
                                    <th scope="col" class="px-6 py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCategories?.map((category, index) => {
                                        return(
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}}>
                                                <td class="px-6 py-4">{index +1}</td>
                                                <td class="px-6 py-4">{category.name}</td>
                                                <td class="px-6 py-4">{new Date(category.createdAt).toString().split(" ").slice(0, 4).join(" ")}</td>
                                                <td className='px-6 py-4 flex items-center gap-3'>
                                                    <FaRegEdit className="text-gray-500 font-[600] text-[20px] cursor-pointer" onClick={() => {
                                                        setEditCategory(category._id)
                                                        setName(category.name)
                                                    }}/>
                                                    <GoTrash className="text-red-500 font-[600] text-[20px] cursor-pointer"  onClick={() => setDeleteCategory(category._id)}/>
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
                </div>
            </div>
        </div>

        {
            modal === 'create-category' &&
            <>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => {setModal('')}}></div>
                <div className="flex items-center flex-col text-center justify-center gap-3 bg-white sm:w-[500px] w-[95%] fixed top-[50%] left-[50%] py-[30px] px-[2rem] z-[100]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px] w-full mb-7">
                        <p className="text-[18px] text-[#19201D]">Create category</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                    </div>
                    <div className='text-left w-full'>
                        <p className='text-[#828282] text-[14px] mb-3'>What would you like to call this category? </p>
                        <p className='text-[#19201D] text-[14px] mb-2'>Category Name</p>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px]'>
                            <input type="text" placeholder='e.g Snacks' onChange={e => setName(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-2 w-full mt-5'>
                        <button className="text-[#2D3934] border px-5 py-3 rounded-[8px] text-[14px] font-bold" onClick={() => setModal(false)}>Cancel</button>
                        {
                            loading ? 
                            <button className="bg-[#2D3934] text-white px-3 py-3 rounded-[8px] text-[14px] font-bold">
                                <img src="./images/loader.gif" className='w-[30px] mx-auto' alt="" />
                            </button>
                            :
                            <button className="bg-[#2D3934] text-white px-3 py-3 rounded-[8px] text-[14px] font-bold" onClick={addCategory}>Create Category</button>
                        }
                        
                    </div>
                </div>
            </>
        }

        {
            editCategory &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setEditCategory(false)}></div>
                <div className="bg-white sm:max-w-[450px] w-[95%] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Edit Category</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setEditCategory(false)}/>
                    </div>
                    <div className='mt-5'>
                        <p>Category Name</p>
                        <div className='px-4 py-3 outline-none border w-full rounded-[4px] mt-1'>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => editCategoryFn(editCategory)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Update Category</button>
                    }
                </div>
            </div>
        }

        {
            deleteCategory &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteCategory(false)}></div>
                <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] md:px-[2rem] px-[16px] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Category</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteCategory(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this category?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteCategoryFn(deleteCategory)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default Category