import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
const Appointments = () => {

    const [appointList, setAppointList] = useState('')
    const [apponHistoryList, setApponHistoryList] = useState('')
    const [pending, setPending] = useState(false)

    const getAppointmentList = async()=>{
        setPending(true)
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

    const appointmentHistory= async()=>{
        setPending(false)
        let response = await fetch('http://localhost:5000/api/appointment-history', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({doctorid:sessionStorage.getItem('doctorId')})
        })
        let result = await response.json()
        setApponHistoryList(result.data)
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
            setAppointList((prev) => prev.filter((elem)=> elem.appointmentId != result.appointmentid))
        }
    }

    const rejectAppoint = async (appointmentId, patientId)=>{
        let response = await fetch('http://localhost:5000/api/reject-appointment',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({appointmentid:appointmentId, doctorid:sessionStorage.getItem('doctorId'),patientid:patientId})
        })
        let result = await response.json()
        console.log("response: ", result)
        if(result.status){
            toast.custom(<div className='border border-red-300 rounded-md'>{result.message}</div>)
            setAppointList((prev) => prev.filter((elem)=> elem.appointmentId != result.appointmentid))
        }
    }

    useEffect(()=>{
        getAppointmentList()
    },[])

  return (
    <>
        <div className='appointment-container'>
            <Toaster />
            <div className='listNavigate text-2xl py-4'>
                <span onClick={getAppointmentList} className={`mr-6 mx-2 ${pending? 'border border-gray-400 rounded-md p-0.5 text-gray-400':''} hover:cursor-pointer`}>Pending Appoinments</span>
                <span onClick={appointmentHistory} className={`mr-6 mx-2 ${!pending? 'border border-gray-400 rounded-md p-0.5 text-gray-400':''} hover:cursor-pointer`}>Appoinments History</span>
            </div>
            <div>
            { pending?
                    appointList && appointList.map((appoint)=>(
                        <div className='border border-yellow-200 text-2xl'key={appoint.appointmentId} >
                            <ul className='flex flex-row gap-4 flex-wrap'>
                                <li><span className='font-medium'>Patient Name</span>: {appoint.patientName}</li>
                                <li><span className='font-medium'>Patient Id</span>: {appoint.patientId.slice(0,5)}</li>
                                <li><span className='font-medium'>Appointment Date</span>: {appoint.appointDate}</li>
                                <li><span className='font-medium'>Appointment Status</span>: {appoint.approveStatus}</li>
                            </ul>
                            <button onClick={()=>acceptAppoint(appoint.appointmentId, appoint.patientId)} className='bg-green-600 border border-gray-700 rounded-md mx-4 my-2 px-3 hover:bg-green-400 hover:text-white'>Accept</button>
                            <button onClick={()=>rejectAppoint(appoint.appointmentId, appoint.patientId)} className='bg-red-600 border border-gray-700 rounded-md mx-4 my-2 px-3 hover:bg-red-400 hover:text-white'>Reject</button>
                        </div>
                    ))
                :<div>
                    { apponHistoryList && apponHistoryList.map((historyAppon) =>(
                    <div className='border border-yellow-200 text-2xl'key={apponHistoryList.appointmentId} >
                            <ul className='flex flex-row gap-10 flex-wrap py-4'>
                                <li><span className='font-medium'>Patient Name</span>: {historyAppon.patientName}</li>
                                <li><span className='font-medium'>Patient Id</span>: {historyAppon.patientId.slice(0,5)}</li>
                                <li><span className='font-medium'>Appointment Date</span>: {historyAppon.appointDate.slice(0,10)}</li>
                                <li><span className='font-medium'>Appointment Status</span>: {historyAppon.approveStatus}</li>
                            </ul>
                        </div>
                            ))
                    }
                </div>
            }
            </div>
        </div>
    </>
  )
}

export default Appointments;