import {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import Alert from '../../components/alert/Alert';

const Promotions = ({baseUrl}) => {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const [allPromotions, setAllPromotions] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleNav, setToggleNav] = useState(false)
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || 1)); // Get the current page from the URL query params

  useEffect(() => {
    getAllSubUnitsForPromotions();
  }, []);

  async function getAllSubUnitsForPromotions(){
    const res = await fetch(`${baseUrl}/promotions`,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.data.access_token}`
        }
    })
    const data = await res.json()
    console.log(data);
    setAllPromotions(data.data)
  }

  const saveIdsToLocalstorage = (sessionId, unitId, subUnitId) =>{
    localStorage.setItem('promotioIds', JSON.stringify({ sessionId, unitId, subUnitId }))
    navigate(`/promotion/${subUnitId}/${sessionId}`)
  }

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
      <div className="w-full lg:w-[78%] ml-auto">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
          <div className="bg-[#F2FCF7] lg:px-[30px] px-[10px] py-[1rem]">
            <div className="flex items-center justify-between">
              <p className="text-[22px] lg:text-[28px] text-primary-color font-[600]">Promotion</p>
            </div>
          </div>

          <div class="relative overflow-x-auto mt-[3rem]">
              <table class="w-full text-sm text-left rtl:text-left">
                  <thead class="text-[12px] md:text-[14px] border-b">
                      <tr>
                          <th scope="col" class="px-6 py-3 th1 font-[700]">S/N</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Sub-units</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Coordinator</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Members</th>
                          <th scope="col" class="px-6 py-3 font-[700]">Session</th>
                          <th scope="col" class="px-2 py-3 font-[700]">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        allPromotions && allPromotions?.map((promotion, index) => {
                            return(
                                <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                    <td class="px-6 py-4">{index +1}</td>
                                    <td class="px-6 py-4">{promotion.subUnitName}</td>
                                    <td class="px-6 py-4 flex items-center gap-1">{promotion.subUnitCoordinatorName}</td>
                                    <td class="px-6 py-4">{promotion.totalStudents}</td>
                                    <td class="px-6 py-4">{promotion.sessionName}</td>
                                    <td class="py-4">
                                        <button className='bg-[#1D2522] text-white px-5 py-2 rounded-md' onClick={() => saveIdsToLocalstorage(promotion.sessionId, promotion.unitId, promotion.subUnitId)}>Promote</button>
                                    </td>
                                </tr>
                            )
                        })
                      }
                  </tbody>
              </table>
          </div>
        </div>
    </div>
  )
}

export default Promotions