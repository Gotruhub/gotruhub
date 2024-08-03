import React, { useEffect, useState } from 'react'

const Norlics = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')

    async function getData(){
        const response = await fetch('https://alpha3.norlics.ng/api/manualRecon/getAllManualReconRecords?page=1&limit=5', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxNjFiYy1lMWM1LTRzMGEtOTE1Mi02YzY1NWMxZDAiLCJtZGFNb2R1bGVDb21wYW55IjoiWDEiLCJtZGFNb2R1bGVDb21wYW55TmFtZSI6IkJJUiIsImlhdCI6MTcyMTYzNTU5OCwiZXhwIjoxNzIxNzIxOTk4fQ.6xg6mlsuDxrQH9tHU44PMSiGlD7eWGKfFR6c1Dxg2To',
                
            }
        })
        const data = await response.json()
        setData(data.data.data)
        setLoading(data.data.currentPage)
        console.log(data)
    }

    useEffect(() => {
        getData()
    },[])

  return (
    <div className='p-5 text-[12px]'>
        <p className='mb-2'>Am outputing all MDA's</p>
        {loading > 0 && <p>Page {loading}</p>}
        {
            data.map((item, index) => (
                <div key={item.id} className='flex items-center gap-5 my-3'>
                    <p>{index + 1}.</p>
                    <p>{item.mda}</p>
                    {/* <p>{item.accountName}</p>
                    <p>{item.bankName}</p>
                    <p>{item.bankCode}</p>
                    <p>{item.accountType}</p> */}
                </div>
            ))
        }
    </div>
  )
}

export default Norlics