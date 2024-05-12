import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Pagination from './Pagination'

const AdminDoctorList = () => {

    const [allDoctors, setAllDoctors] = useState('')

    const getAllDoctorList = async()=>{
        let response = await fetch('http://localhost:5000/api/get-doctorList',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        let result = await response.json()
        console.log("response: ", result)
        setAllDoctors(result.drData)
    }

// Pagination for user/patient 
const [currentPage, setCurrentPage] = useState(1)
let itemsPerPage=8;
const startIndex = (currentPage-1)*itemsPerPage
const endIndex = startIndex+itemsPerPage
const onPageChange= (page)=>{
  setCurrentPage(page)
}
const slicedallDoctors = allDoctors.slice(startIndex, endIndex);


useEffect(()=>{
    getAllDoctorList()
},[]);

  return (
    <>
    <Layout>
        <div className='AdminDr-Container'>
            <h3 className='text-3xl  phone:text-xl sm:text-2xl'>All Doctor list</h3>
            <div>
                {
                    allDoctors&& slicedallDoctors.map((dr)=>{
                        return  <div className='border border-yellow-200 text-2xl capitalize phone:text-lg sm:text-xl'key={dr.drId} >
                        <ul className='flex justify-start flex-row gap-2 flex-wrap py-2'>
                            <li className='basis-1/4'><span className='font-medium'>Doctor Name</span>: {dr.drName}</li>
                            <li className='basis-1/4'><span className='font-medium'>Doctor Id</span>: {dr.drId.slice(0,5)}</li>
                            <li className='basis-1/4'><span className='font-medium'>Department</span>: {dr.specialization}</li>
                            <li className=''><span className='font-medium'>fees</span>: {dr.fees}</li>
                        </ul>
                    </div>
                    })
                }
            </div>  
            <Pagination dataLen={allDoctors.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />          
        </div>
    </Layout>
    </>
  )
}

export default AdminDoctorList;