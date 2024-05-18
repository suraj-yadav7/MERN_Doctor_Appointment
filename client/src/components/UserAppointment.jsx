import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from './Layout';
import Pagination from './Pagination';

const UserAppointment = () => {

    const [userBookedAppoint, setUserBookdAppoint] = useState('')

    const getUserAppointments = async()=>{
        let response = await fetch('http://localhost:5000/api/user-appointments', {
            method:'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userid:sessionStorage.getItem('userId')})
        })
        let result = await response.json()
        if(result.status){
            setUserBookdAppoint(result.data)
        }
    }

    const [currentPage, setCurrentPage] =useState(1)
    const itemsPerPage = 4
    const startIndex = (currentPage-1)*itemsPerPage
    const endIndex = startIndex+itemsPerPage
    const onPageChange = (page)=>{
        setCurrentPage(page)
    }
    const sliceduserBookedAppoint = userBookedAppoint.slice(startIndex, endIndex)

    useEffect(()=>{
        getUserAppointments()
    },[]);
  return (
    <>
    <Layout>
        <div className='userAppoint-container'>
            <div className='phone:text-xl'>
                {userBookedAppoint && userBookedAppoint.length<1?<div><h4>No Appointments are booked</h4></div>:  userBookedAppoint&& sliceduserBookedAppoint.map((userAppoint) =>(
                    <div className='border border-yellow-200 text-2xl phone:text-base sm:text-xl' key={userBookedAppoint.appointmentId} >
                        <ul className='flex flex-row gap-4 flex-wrap justify-start py-2 pl-2 capitalize '>
                            <li className='basis-1/5 xl:basis-1/4'><span className='font-medium'>Doctor Name</span>: {userAppoint.doctorName}</li>
                            <li className='basis-1/6'><span className='font-medium'>Doctor Id</span>: {userAppoint.doctorId.slice(0,5)}</li>
                            <li className='basis-1/6'><span className='font-medium'>Problem</span>: {userAppoint.healthissueDept}</li>
                            <li className='basis-1/8 mr-8'><span className='font-medium'>Fees</span>: {userAppoint.doctorFees}</li>
                            <li className='basis-1/8 mr-6'><span className='font-medium'>Appointment Date</span>: {userAppoint.appointDate.slice(0,10)}</li>
                            <li className='basis-1/8'><span className='font-medium'>Appointment Status: </span><span  className={` ${userAppoint.approveStatus==='Pending'?'text-yellow-500':userAppoint.approveStatus==='Accepted'?'text-green-500':userAppoint.approveStatus==='Rejected'?'text-red-500':''}`}>{userAppoint.approveStatus}</span></li>
                        </ul>
                    </div>
                    ))
                }
                </div>
                {
                   userBookedAppoint&& userBookedAppoint.length>0?
                    <Pagination dataLen={userBookedAppoint.length} onPageChange={onPageChange} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                    :''
                }
        </div>
    </Layout>
    </>
  )
};

export default UserAppointment;