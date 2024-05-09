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
    },[]);

  return (
    <>
        <div className='appointment-container'>
            <Toaster />
            <div className='listNavigate text-xl py-4'>
                <span onClick={getAppointmentList} className={`mr-6 mx-2 p-1 border border-gray-400  rounded-md  ${pending? 'bg-slate-400 border-gray-400 p-px text-gray-100 text-xl':''} hover:cursor-pointer`}>Pending Appoinments</span>
                <span onClick={appointmentHistory} className={`mr-6 mx-2 p-1 border border-gray-400  rounded-md  ${!pending? 'bg-slate-400 border-gray-400 p-px text-gray-100 text-xl':''} hover:cursor-pointer`}>Appoinments History</span>
            </div>
            <div>
            { pending?
                    appointList && appointList.map((appoint)=>(
                        <div className='border border-yellow-200 text-2xl'key={appoint.appointmentId} >
                            <ul className='flex flex-row gap-5 flex-wrap pl-4'>
                                <li className='basis-1/4 2xl:basis-1/6 capitalize'><span className='font-medium'>Patient Name</span>: {appoint.patientName}</li>
                                <li className='basis-1/1 mr-8'><span className='font-medium '>Patient Id</span>: {appoint.patientId.slice(0,5)}</li>
                                <li className='basis-1/8 mr-8'><span className='font-medium'>Appointment Date</span>: {appoint.appointDate}</li>
                                <li className='basis-1/8'><span className='font-medium'>Appointment Status</span>: {appoint.approveStatus}</li>
                            </ul>
                            <button  onClick={()=>acceptAppoint(appoint.appointmentId, appoint.patientId)} className='bg-green-600 border border-gray-700 rounded-md mx-4 my-4 px-3 hover:bg-green-400 hover:text-white'>Accept</button>
                            <button onClick={()=>rejectAppoint(appoint.appointmentId, appoint.patientId)} className='bg-red-600 border border-gray-700 rounded-md mx-4 my-4 px-3 hover:bg-red-400 hover:text-white'>Reject</button>
                        </div>
                    ))
                :<div>
                    { apponHistoryList && apponHistoryList.map((historyAppon) =>(
                    <div className='border border-yellow-200 text-2xl'key={apponHistoryList.appointmentId} >
                            <ul className='flex flex-row gap-4 flex-wrap py-2 pl-2'>
                                <li className='basis-1/4 2xl:basis-1/6 capitalize'><span className='font-medium'>Patient Name</span>: {historyAppon.patientName}</li>
                                <li className='basis-1/1 mr-8'><span className='font-medium'>Patient Id</span>: {historyAppon.patientId.slice(0,5)}</li>
                                <li className='basis-1/8 mr-4'><span className='font-medium'>Appointment Date</span>: {historyAppon.appointDate.slice(0,10)}</li>
                                <li className='basis-1/8'><span className='font-medium'>Appointment Status</span>: {historyAppon.approveStatus}</li>
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
};
export default Appointments;