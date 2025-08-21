import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';

const AllUnitSummary = ({baseUrl}) => {

    const [toggleNav, setToggleNav] = useState(false)
    const [apiData, setApiData] = useState()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        console.log("Hello from AllUnitSummary");
        
        fetchData()
    },[])

    async function fetchData() {
        const response = await fetch(`${baseUrl}/my-orgnz-summary/all-unit-summary`, {
            headers:{
                'Authorization':`Bearer ${user.data.access_token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setApiData(data);
    }

  // API data
//   const apiData = {
//     "success": true,
//     "message": "Success",
//     "data": {
//       "dateGroups": [
//         {
//           "period": "Week of July 29, 2025",
//           "periodKey": "2025-W30",
//           "data": [
//             {
//               "sn": 1,
//               "unit": "JSS 1",
//               "subUnit": "JSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "685a122089edf8171de16c2d"
//             },
//             {
//               "sn": 2,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1A",
//               "assignment": 1,
//               "assignee": 1,
//               "student": 3,
//               "duration": "0.3hr",
//               "id": "687bfcd8cfa887288ebaf7ba"
//             },
//             {
//               "sn": 3,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1B ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "687bfd0fcfa887288ebaf7fc"
//             },
//             {
//               "sn": 4,
//               "unit": "SSS 3",
//               "subUnit": "SSS 3A ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 3,
//               "duration": "0.0hr",
//               "id": "68566023d346ebcb83ec9ce0"
//             }
//           ]
//         },
//         {
//           "period": "Week of July 21, 2025",
//           "periodKey": "2025-W29",
//           "data": [
//             {
//               "sn": 5,
//               "unit": "JSS 1",
//               "subUnit": "JSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "685a122089edf8171de16c2d"
//             },
//             {
//               "sn": 6,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1A",
//               "assignment": 17,
//               "assignee": 1,
//               "student": 3,
//               "duration": "4.3hr",
//               "id": "687bfcd8cfa887288ebaf7ba"
//             },
//             {
//               "sn": 7,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1B ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "687bfd0fcfa887288ebaf7fc"
//             },
//             {
//               "sn": 8,
//               "unit": "SSS 3",
//               "subUnit": "SSS 3A ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 3,
//               "duration": "0.0hr",
//               "id": "68566023d346ebcb83ec9ce0"
//             }
//           ]
//         },
//         {
//           "period": "Week of July 8, 2025",
//           "periodKey": "2025-W27",
//           "data": [
//             {
//               "sn": 9,
//               "unit": "JSS 1",
//               "subUnit": "JSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "685a122089edf8171de16c2d"
//             },
//             {
//               "sn": 10,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 3,
//               "duration": "0.0hr",
//               "id": "687bfcd8cfa887288ebaf7ba"
//             },
//             {
//               "sn": 11,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1B ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "687bfd0fcfa887288ebaf7fc"
//             },
//             {
//               "sn": 12,
//               "unit": "SSS 3",
//               "subUnit": "SSS 3A ",
//               "assignment": 1,
//               "assignee": 1,
//               "student": 3,
//               "duration": "0.3hr",
//               "id": "68566023d346ebcb83ec9ce0"
//             }
//           ]
//         },
//         {
//           "period": "Week of July 1, 2025",
//           "periodKey": "2025-W26",
//           "data": [
//             {
//               "sn": 13,
//               "unit": "JSS 1",
//               "subUnit": "JSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "685a122089edf8171de16c2d"
//             },
//             {
//               "sn": 14,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 3,
//               "duration": "0.0hr",
//               "id": "687bfcd8cfa887288ebaf7ba"
//             },
//             {
//               "sn": 15,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1B ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "687bfd0fcfa887288ebaf7fc"
//             },
//             {
//               "sn": 16,
//               "unit": "SSS 3",
//               "subUnit": "SSS 3A ",
//               "assignment": 5,
//               "assignee": 1,
//               "student": 3,
//               "duration": "1.3hr",
//               "id": "68566023d346ebcb83ec9ce0"
//             }
//           ]
//         },
//         {
//           "period": "Week of June 28, 2025",
//           "periodKey": "2025-W25",
//           "data": [
//             {
//               "sn": 17,
//               "unit": "JSS 1",
//               "subUnit": "JSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "685a122089edf8171de16c2d"
//             },
//             {
//               "sn": 18,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1A",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 3,
//               "duration": "0.0hr",
//               "id": "687bfcd8cfa887288ebaf7ba"
//             },
//             {
//               "sn": 19,
//               "unit": "SSS 1",
//               "subUnit": "SSS 1B ",
//               "assignment": 0,
//               "assignee": 0,
//               "student": 0,
//               "duration": "0.0hr",
//               "id": "687bfd0fcfa887288ebaf7fc"
//             },
//             {
//               "sn": 20,
//               "unit": "SSS 3",
//               "subUnit": "SSS 3A ",
//               "assignment": 6,
//               "assignee": 1,
//               "student": 3,
//               "duration": "1.4hr",
//               "id": "68566023d346ebcb83ec9ce0"
//             }
//           ]
//         }
//       ],
//       "pagination": {
//         "total": 5,
//         "page": 1,
//         "limit": 10,
//         "pages": 1
//       },
//       "filters": {
//         "userCategory": "all",
//         "duration": "weekly",
//         "unit": "all"
//       }
//     }
//   };

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // Calculate total records from all date groups
  const totalRecords = apiData?.data.dateGroups.reduce((total, group) => total + group.data.length, 0);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Format date for display
  const formatDate = (period) => {
    const match = period.match(/Week of (\w+ \d+, \d+)/);
    if (match) {
      const date = new Date(match[1]);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return period;
  };

  // Get date range for header
  const getDateRange = () => {
    // console.log(xapiData.data);
    
    if (apiData?.data.dateGroups.length === 0) return '';
    const firstPeriod = apiData?.data.dateGroups[apiData?.data.dateGroups.length - 1].period;
    const lastPeriod = apiData?.data.dateGroups[0].period;
    
    const firstDate = firstPeriod.match(/Week of (\w+ \d+, \d+)/)?.[1];
    const lastDate = lastPeriod.match(/Week of (\w+ \d+, \d+)/)?.[1];
    
    if (firstDate && lastDate) {
      const start = new Date(firstDate);
      const end = new Date(lastDate);
      
      return `Quartely (${start.toLocaleDateString('en-US', { month: 'long' })} - ${end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`;
      // return `Weekly (${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })})`;
    }
    return 'Weekly Summary';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        <BiChevronLeft size={16} />
      </button>
    );
    
    // Page number buttons
    for (let i = 1; i <= Math.min(maxVisibleButtons, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${
            currentPage === i
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
      >
        <BiChevronRight size={16} />
      </button>
    );
    
    return buttons;
  };

  return (
    <div>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[78%] ml-auto pb-5">
            <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl}/>
            <div>
                <div className="flex justify-between md:items-center flex-col gap-3 sm:flex-row mb-[1rem] bg-[#F2FCF7] px-[10px] lg:px-[30px] py-[1rem]">
                    <div className="flex items-center gap-2">
                        <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/units')} className='cursor-pointer' />
                        <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">Attendance Summary</p>
                    </div>
                    {/* <div className="flex items-center gap-4">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FiFilter size={20} className="text-gray-600" />
                        </button>
                        <button 
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <span className="text-gray-700">Filter</span>
                            <BiChevronRight size={16} className="text-gray-600" />
                        </button>
                    </div> */}
                </div>

                <div className="bg-white min-h-screen">
                    <div className="max-w-7xl mx-auto pb-6 px-6">
                        <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600">
                            1 to 10 of {totalRecords} Products
                        </span>
                        <div className="flex items-center gap-2">
                            {renderPaginationButtons()}
                        </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-8">
                            {
                                apiData &&
                                <h2 className="font-semibold text-gray-900 md:text-[16px] text-[14px]">{getDateRange()}</h2>
                            }

                        {apiData?.data.dateGroups.map((group, groupIndex) => (
                            <div key={group.periodKey} className="space-y-4">
                            {/* Date Header */}
                            <h3 className="md:text-[16px] text-[14px] font-medium text-gray-700 border-b border-gray-200 pb-2">
                                {formatDate(group.period)}
                            </h3>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                <thead className='md:text-[16px] text-[12px]'>
                                    <tr className="text-left">
                                    <th className="pb-4 text-gray-600 font-medium">S/N</th>
                                    <th className="pb-4 text-gray-600 font-medium">Unit</th>
                                    <th className="pb-4 text-gray-600 font-medium">Sub-unit</th>
                                    <th className="pb-4 text-gray-600 font-medium">Assignment</th>
                                    <th className="pb-4 text-gray-600 font-medium">Students</th>
                                    <th className="pb-4 text-gray-600 font-medium">Duration</th>
                                    <th className="pb-4 text-gray-600 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.data.map((record, index) => (
                                    <tr key={record.id} className="border-b border-gray-100 md:text-[16px] text-[12px]">
                                        <td className="py-4 text-gray-900">{record.sn}</td>
                                        <td className="py-4 text-gray-900">{record.unit}</td>
                                        <td className="py-4 text-gray-600">{record.subUnit.trim()}</td>
                                        <td className="py-4 text-gray-900">{record.assignment}</td>
                                        <td className="py-4 text-gray-900">{record.student}</td>
                                        <td className="py-4 text-gray-900">{record.duration}</td>
                                        <td className="py-4">
                                        <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                                            View
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>
                        ))}
                        </div>

                        {/* Filter Panel (if shown) */}
                        {showFilter && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                            <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
                            <div className="space-y-4">
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">User Category</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="all">All</option>
                                    <option value="students">Students</option>
                                    <option value="teachers">Teachers</option>
                                </select>
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="daily">Daily</option>
                                </select>
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                    <option value="all">All</option>
                                    <option value="jss1">JSS 1</option>
                                    <option value="sss1">SSS 1</option>
                                    <option value="sss3">SSS 3</option>
                                </select>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button 
                                onClick={() => setShowFilter(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                Cancel
                                </button>
                                <button className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                                Apply Filters
                                </button>
                            </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default AllUnitSummary;