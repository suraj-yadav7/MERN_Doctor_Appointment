import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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
        <div className='userAppoint-container'>
            <div>
                { userBookedAppoint && userBookedAppoint.map((userAppoint) =>(
                <div className='border border-yellow-200 text-2xl' key={userBookedAppoint.appointmentId} >
                        <ul className='flex flex-row gap-10 flex-wrap py-4'>
                            <li><span className='font-medium'>Patient Name</span>: {userAppoint.doctorName}</li>
                            <li><span className='font-medium'>Patient Id</span>: {userAppoint.doctorId.slice(0,5)}</li>
                            <li><span className='font-medium'>Problem</span>: {userAppoint.healthissueDept}</li>
                            <li><span className='font-medium'>Fees</span>: {userAppoint.doctorFees}</li>
                            <li><span className='font-medium'>Appointment Date</span>: {userAppoint.appointDate.slice(0,10)}</li>
                            <li><span className='font-medium'>Appointment Status</span>: {userAppoint.approveStatus}</li>
                        </ul>
                    </div>
                    ))
                }
                </div>
        </div>
    </>
  )
};

export default UserAppointment;