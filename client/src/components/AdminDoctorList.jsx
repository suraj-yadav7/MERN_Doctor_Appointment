import React, { useEffect, useState } from 'react'
import Layout from './Layout'

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

useEffect(()=>{
    getAllDoctorList()
},[])

  return (
    <>
    <Layout>
        <div className='AdminDr-Container'>
            All Doctor list
            <div>
                {
                    allDoctors&& allDoctors.map((dr)=>{
                        return  <div className='border border-yellow-200 text-2xl'key={dr.drId} >
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
        </div>
    </Layout>
    </>
  )
}

export default AdminDoctorList;