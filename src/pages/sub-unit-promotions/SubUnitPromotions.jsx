// SubUnitPromotions.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';

const SubUnitPromotions = ({ baseUrl }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { subUnitId, sessionId } = useParams();
  const [allPromotions, setAllPromotions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleNav, setToggleNav] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || 1)
  );
  const [totalPages, setTotalPages] = useState(1);
  const [subUnitDetails, setSubUnitDetails] = useState(null);

  // Checkbox selection
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getAllSubUnitsForPromotions();
    getSubUnitDetails()
  }, [currentPage]);

  async function getSubUnitDetails() {
    const res = await fetch(`${baseUrl}/my-orgnz-summary/subunit-summary/${subUnitId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.data.access_token}`,
      },
    });
    const data = await res.json();
    setSubUnitDetails(data.data);
  }

  async function getAllSubUnitsForPromotions() {
    const res = await fetch(
      `${baseUrl}/promotions/${subUnitId}/${sessionId}?page=${currentPage}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.data.access_token}`,
        },
      }
    );
    const data = await res.json();
    setAllPromotions(data.data);
    setTotalPages(data.totalPages || 1);
  }

  // Handle single checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Header "Select All" checkbox
  const idsOnPage = allPromotions.map((p) => p.studentId);
  const selectAll = idsOnPage.length > 0 && idsOnPage.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (selectAll) {
      // un-select all on current page
      setSelectedIds((prev) =>
        prev.filter((id) => !idsOnPage.includes(id))
      );
    } else {
      // select all on current page
      setSelectedIds((prev) => [...new Set([...prev, ...idsOnPage])]);
    }
  };

  // Pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchParams({ page });
    }
  };

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
      <div className="w-full lg:w-[78%] ml-auto">
        <TopNav
          toggleNav={toggleNav}
          setToggleNav={setToggleNav}
          baseUrl={baseUrl}
        />
        <div className="bg-[#F2FCF7] lg:px-[30px] px-[10px] py-[1rem]">
          <div className="flex items-center justify-between">
            <p className="text-[22px] lg:text-[28px] text-primary-color font-[600]">
              Promote {subUnitDetails?.name}
            </p>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-[3rem]">
            <div className='flex items-center justify-between px-6 py-3'>
                <div className="font-[700]">
                    <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="mr-2"
                    />
                    Select All
                </div>
                <div className="flex justify-center items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === i + 1 ? 'bg-gray-700 text-white' : ''
                        }`}
                        >
                        {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </div>
            </div>
          <table className="w-full text-sm text-left">
            <thead className="text-[12px] md:text-[14px] border-b">
              <tr>
                <th className="px-6 py-3 font-[700]">S/N</th>
                <th className="px-6 py-3 font-[700]">Student Name</th>
                <th className="px-6 py-3 font-[700]">Student Email</th>
                <th className="px-6 py-3 font-[700]">Attendance</th>
                <th className="px-6 py-3 font-[700]">Session</th>
                <th className="px-2 py-3 font-[700]">Action</th>
              </tr>
            </thead>
            <tbody>
              {allPromotions.map((promotion, index) => (
                <tr
                  style={{ borderBottom: '1px solid #dcdcdc' }}
                  key={promotion.studentId}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(promotion.studentId)}
                      onChange={() => handleCheckboxChange(promotion.studentId)}
                      className="mr-1"
                    />
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{promotion.studentName}</td>
                  <td className="px-6 py-4">{promotion.studentEmail}</td>
                  <td className="px-6 py-4">{promotion.avgAttendanceGrading}</td>
                  <td className="px-6 py-4">{promotion.name}</td>
                  <td className="py-4">
                    <button
                      className="bg-[#1D2522] text-white px-5 py-2 rounded-md"
                      onClick={() =>{
                        navigate(`/promote-student`)
                        localStorage.setItem('studentsId', JSON.stringify(selectedIds))
                        }
                      }
                    >
                      Promote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Debug */}
        {/* <div className="mt-5 text-center">
          <p className="text-sm text-gray-500">
            Selected IDs: {JSON.stringify(selectedIds)}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SubUnitPromotions;