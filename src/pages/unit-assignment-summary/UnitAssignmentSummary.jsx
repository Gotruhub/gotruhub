import React, { useEffect, useState } from 'react'
import SideNav from '../../components/side-nav/SideNav'
import TopNav from '../../components/top-nav/TopNav'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btn-loader/BtnLoader'
import { IoCloseOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const UnitAssignmentSummary = ({baseUrl}) => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [msg, setMsg] = useState('')
    const [alertType, setAlertType] = useState()
    const [summary, setSummary] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteAssignment, setDeleteAssignment] = useState()
    const navigate = useNavigate()

    async function getAllAssignmentsSummary(){
        const res = await fetch(`${baseUrl}/sub-unit/course/cart`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data)
        if(data.success){
            setSummary(data.data)
        }
    }

    useEffect(() => {
        getAllAssignmentsSummary()
    },[])

    async function deleteAssignmentFn(id){
        setLoading(true)
        const res = await fetch(`${baseUrl}/sub-unit/course/single/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        if(res){
            setDeleteAssignment(false)
            getAllAssignmentsSummary()
            setLoading(false)   
        }
        console.log(data);
        if(!res.ok){
            setMsg("Error occured, while deleting assignment");
            setAlertType('error');
            return;
        }
        if(res.ok){
            getAllAssignmentsSummary()
            setMsg("Assignment deleted successfully");
            setAlertType('success');
            return;
        }
    }

    async function payForAssignments(){
        setLoading(true)
        const res = await fetch(`${baseUrl}/sub-unit/course/pay`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${user.data.access_token}`
            }
        })
        const data = await res.json()
        console.log(data.data.data.authorization_url);
        if(res){
            setLoading(false)
        }
        console.log(data);
        if(!res.ok){
            setMsg("Error occured, while deleting assignment");
            setAlertType('error');
            return;
        }
        if(res.ok){
            window.location.assign(data.data.data.authorization_url)
            return;
        }
    }

  return (
    <div>
        <SideNav />
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav />
            <div className="">
                <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[28px] text-primary-color font-[600]">Assignment Summary</p>
                    </div>
                </div>
                <div className='px-[30px] flex items-start gap-5 w-full'>
                    <div class="relative overflow-x-auto mx-5 mt-10 w-full">
                        <table class="w-full text-sm text-left rtl:text-left text-[#1D1D1D]">
                            <thead class="text-[14px] border-b">
                                <tr>
                                    <th scope="col" class="py-3 th1 font-[700]">S/N</th>
                                    <th scope="col" class="py-3 font-[700]">Assignment</th>
                                    <th scope="col" class="py-3 font-[700]">Validity</th>
                                    <th scope="col" class="py-3 font-[700]">Pricing</th>
                                    <th scope="col" class="py-3 font-[700]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    summary && summary?.map((item, index) => {

                                        return (
                                            <tr className='relative'>
                                                <td className='py-3'>{index + 1}</td>
                                                <td>{item?.course?.name}</td>
                                                <td></td>
                                                <td>100</td>
                                                <td> <button onClick={() => setDeleteAssignment(item._id)} className='bg-[#9A2525] px-[16px] py-[7px] rounded-[8px] text-white'>Remove</button> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='shadow-lg py-5 px-3 text-[#1D1D1D] w-[50%] mt-[2.5rem]'>
                        <p className='text-[18px] font-[500] mb-5'>Summary</p>
                        <div className='flex items-center justify-between'>
                            <p>Price per assignment</p>
                            <p className='text-[14px]'>#100</p>
                        </div>
                        <div className='flex items-center justify-between my-4'>
                            <p>Total assignment(s)</p>
                            <p className='text-[14px]'>{summary?.length}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Amount payable</p>
                            <p className='text-[18px]'>#{summary?.length * 100}</p>
                        </div>
                        {
                            loading ? 
                            <BtnLoader bgColor="#191f1c"/>
                            :
                            <button onClick={() => payForAssignments()} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[10px] text-center mx-auto'>Pay now</button>
                        }
                    </div>
                </div>
            </div>
        </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }

        {
            deleteAssignment &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteAssignment(false)}></div>
                <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <div className="flex items-center justify-between border-b pb-[5px]">
                        <p className="text-[px]">Delete Unit</p>
                        <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteAssignment(false)}/>
                    </div>
                    <div className='mt-5 text-center'>
                        Are you sure, you want to delete this assignment?
                    </div>
                    {
                        loading ? 
                        <BtnLoader bgColor="#191f1c"/>
                        :
                        <button onClick={() => deleteAssignmentFn(deleteAssignment)} className='text-white bg-primary-color w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default UnitAssignmentSummary