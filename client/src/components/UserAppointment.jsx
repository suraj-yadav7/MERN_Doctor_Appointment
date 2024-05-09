import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from './Layout';

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
    useEffect(()=>{
        getUserAppointments()
    },[]);
  return (
    <>
    <Layout>
        <div className='userAppoint-container'>
            <div>
                { userBookedAppoint && userBookedAppoint.map((userAppoint) =>(
                    <div className='border border-yellow-200 text-2xl' key={userBookedAppoint.appointmentId} >
                        <ul className='flex flex-row gap-4 flex-wrap justify-start py-2 pl-2 capitalize'>
                            <li className='basis-1/5 xl:basis-1/4'><span className='font-medium'>Doctor Name</span>: {userAppoint.doctorName}</li>
                            <li className='basis-1/6'><span className='font-medium'>Doctor Id</span>: {userAppoint.doctorId.slice(0,5)}</li>
                            <li className='basis-1/6'><span className='font-medium'>Problem</span>: {userAppoint.healthissueDept}</li>
                            <li className='basis-1/8 mr-8'><span className='font-medium'>Fees</span>: {userAppoint.doctorFees}</li>
                            <li className='basis-1/8 mr-6'><span className='font-medium'>Appointment Date</span>: {userAppoint.appointDate.slice(0,10)}</li>
                            <li className='basis-1/8'><span className='font-medium'>Appointment Status</span>: {userAppoint.approveStatus}</li>
                        </ul>
                    </div>
                    ))
                }
                </div>
        </div>
    </Layout>
    </>
  )
};

export default UserAppointment;