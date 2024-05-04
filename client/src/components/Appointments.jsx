import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
const Appointments = () => {

    const [appointList, setAppointList] = useState('')

    const getAppointmentList = async()=>{
        let response = await fetch('http://localhost:5000/api/appointment-list', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({doctorid:sessionStorage.getItem('doctorId')})
        })
        let result = await response.json()
        setAppointList(result.data)
    }

    const acceptAppoint = async (appointmentId, patientId)=>{
        let response = await fetch('http://localhost:5000/api/accept-appointment',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({appointmentid:appointmentId, doctorid:sessionStorage.getItem('doctorId'),patientid:patientId})
        })
        let result = await response.json()
        console.log("response: ", result)
        if(result.status){
            toast.success(result.message)
        }
    }

    useEffect(()=>{
        getAppointmentList()
    },[])

  return (
    <>
        <div className='appointment-container'>
            <Toaster />
            <div>
                {
                    appointList && appointList.map((appoint)=>(
                        <div className='border border-yellow-200 text-2xl'key={appoint.patientId} >
                            <ul className='flex flex-row gap-4 flex-wrap'>
                                <li>Patient Name:{appoint.patientName}</li>
                                <li>Patient Id:{appoint.patientId.slice(0,5)}</li>
                                <li>Appointment Date:{appoint.appointDate}</li>
                                <li>Appointment Status:{appoint.appointStatus}</li>
                            </ul>
                            <button onClick={()=>acceptAppoint(appoint.appointmentId, appoint.patientId)} className='bg-green-600 border border-gray-700 rounded-md mx-4 my-2 px-3 hover:bg-green-400 hover:text-white'>Accept</button>
                            <button className='bg-red-600 border border-gray-700 rounded-md mx-4 my-2 px-3 hover:bg-red-400 hover:text-white '>Reject</button>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Appointments;