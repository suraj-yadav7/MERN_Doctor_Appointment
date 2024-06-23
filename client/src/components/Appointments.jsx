import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Pagination from './Pagination';
const Appointments = () => {

    const [appointList, setAppointList] = useState('')
    const [apponHistoryList, setApponHistoryList] = useState('')
    const [pending, setPending] = useState(true)

<<<<<<< Updated upstream
    const getAppointmentList = async()=>{
        setPending(true)
        let response = await fetch('http://localhost:5000/api/appointment-list', {
=======
    const base_url = import.meta.env.VITE_BASE_URL

    const getAppointmentList = async()=>{
        setPending(true)
        let response = await fetch(`${base_url}/api/appointment-list`, {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        let response = await fetch('http://localhost:5000/api/appointment-history', {
=======
        let response = await fetch(`${base_url}/api/appointment-history`, {
>>>>>>> Stashed changes
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({doctorid:sessionStorage.getItem('doctorId')})
        })
        let result = await response.json()
        setApponHistoryList(result.data)
    };

    const acceptAppoint = async (appointmentId, patientId)=>{
<<<<<<< Updated upstream
        let response = await fetch('http://localhost:5000/api/accept-appointment',{
=======
        let response = await fetch(`${base_url}/api/accept-appointment`,{
>>>>>>> Stashed changes
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
    };

    const rejectAppoint = async (appointmentId, patientId)=>{
<<<<<<< Updated upstream
        let response = await fetch('http://localhost:5000/api/reject-appointment',{
=======
        let response = await fetch(`${base_url}/api/reject-appointment`,{
>>>>>>> Stashed changes
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({appointmentid:appointmentId, doctorid:sessionStorage.getItem('doctorId'),patientid:patientId})
        })
        let result = await response.json()
        console.log("response: ", result)
        if(result.status){
            toast.custom(<div className='border-2 border-red-300 rounded-md text-2xl p-1 bg-white shadow-md shadow-gray-300 phone:text-base sm:text-lg'>{result.message}</div>)
            setAppointList((prev) => prev.filter((elem)=> elem.appointmentId != result.appointmentid))
        }
    };
    // Pagination for pending appointment list
    const [currentPageList, setCurrentPageList] =useState(1)
    const itemsPerPageList = 4
    const startIndexList = (currentPageList-1)*itemsPerPageList
    const endIndexList = startIndexList+itemsPerPageList
    const onPageChangeList = (page)=>{
        setCurrentPageList(page)
    };
    const slicedappointList = appointList.slice(startIndexList, endIndexList)

    // Pagination Appointmen History list
    const [currentPageHistory, setCurrentPageHistory] =useState(1)
    const itemsPerPageHistory = 5
    const startIndexHistory = (currentPageHistory-1)*itemsPerPageHistory
    const endIndexHistory= startIndexHistory+itemsPerPageHistory
    const onPageChangeHistory = (page)=>{
        setCurrentPageHistory(page)
    }
    const slicedappointHistory = apponHistoryList.slice(startIndexHistory, endIndexHistory)


    useEffect(()=>{
        console.log("runnded history")
        getAppointmentList()
    },[]);

    console.log("approve status: ",apponHistoryList )
  return (
    <>
        <div className='appointment-container'>
            <Toaster toastOptions={{style:{fontSize:'1.3rem'}}} />
            <div className='listNavigate flex justify-start  py-4 phone:text-xl '>
                <div>
                <span onClick={getAppointmentList} className={`mr-6 mx-2 p-1 text-2xl border border-gray-400  rounded-md phone:text-base sm:text-xl ${pending? 'bg-slate-400 border-gray-400 p-px text-gray-100 text-xl phone:text-sm phone:mr-4 sm:text-lg':''} hover:cursor-pointer`}>Pending Appoinments</span>
                </div>
                <div>
                <span onClick={appointmentHistory} className={`mr-6 mx-2 p-1  text-2xl border border-gray-400  rounded-md phone:text-base  sm:text-xl ${!pending? 'bg-slate-400 border-gray-400 p-px text-gray-100 text-xl phone:text-sm sm:text-lg ':''} hover:cursor-pointer`}>Appoinments History</span>
                </div>
            </div>
            <div>
                { pending?
                <div>{
                    appointList && appointList.length<1?<div><h4>No items in pending appointments list</h4></div>: appointList && slicedappointList.map((appoint, index)=>(
                        <div className='border border-yellow-200 text-2xl phone:text-base sm:text-xl' key={index} >
                            <ul className='flex flex-row gap-5 flex-wrap pl-4 phone:gap-3'>
                                <li className='basis-1/4 2xl:basis-1/6 capitalize'><span className='font-medium'>Patient Name</span>: {appoint.patientName}</li>
                                <li className='basis-1/1 mr-8'><span className='font-medium '>Patient Id</span>: {appoint.patientId.slice(0,5)}</li>
                                <li className='basis-1/8 mr-8'><span className='font-medium'>Appointment Date</span>: {appoint.appointDate}</li>
                                <li className='basis-1/8'><span className='font-medium'>Appointment Status: </span><span className={` ${appoint.approveStatus==='Pending'?'text-yellow-500':appoint.approveStatus==='Accepted'?'text-green-500':appoint.approveStatus==='Rejected'?'text-red-500':''}`}>{appoint.approveStatus}</span> </li>
                            </ul>
                            <button  onClick={()=>acceptAppoint(appoint.appointmentId, appoint.patientId)} className='bg-green-600 border border-gray-700 rounded-md mx-4 my-4 px-3 hover:bg-green-400 hover:text-white phone:px-1 phone:my-2 sm:px-2'>Accept</button>
                            <button onClick={()=>rejectAppoint(appoint.appointmentId, appoint.patientId)} className='bg-red-600 border border-gray-700 rounded-md mx-4 my-4 px-3 hover:bg-red-400 hover:text-white phone:px-1.5 phone:my-2 sm:px-2.5'>Reject</button>
                        </div>
                    ))
                    }{
                        appointList && appointList.length>0?
                        <Pagination dataLen={appointList.length} onPageChange={onPageChangeList}  currentPage={currentPageList} itemsPerPage={itemsPerPageList}  />
                        :''
                    }
                </div>
                :<div>
                    { apponHistoryList && 
                    apponHistoryList.length<1?<div><h4>No items history list</h4></div>: apponHistoryList&&
                    slicedappointHistory.map((historyAppon) =>(
                    <div className='border border-yellow-200 text-2xl phone:text-base sm:text-xl' key={historyAppon.appointmentId} >
                            <ul className='flex flex-row gap-4 flex-wrap py-2 pl-2 phone:gap-3'>
                                <li className='basis-1/4 2xl:basis-1/6 capitalize'><span className='font-medium'>Patient Name</span>: {historyAppon.patientName}</li>
                                <li className='basis-1/1 mr-8'><span className='font-medium'>Patient Id</span>: {historyAppon.patientId.slice(0,5)}</li>
                                <li className='basis-1/8 mr-4'><span className='font-medium'>Appointment Date</span>: {historyAppon.appointDate.slice(0,10)}</li>
                                <li className='basis-1/8'><span className='font-medium'>Appointment Status: </span> <span className={` ${historyAppon.approveStatus==='Pending'?'text-yellow-500':historyAppon.approveStatus==='Accepted'?'text-green-500':historyAppon.approveStatus==='Rejected'?'text-red-500':''}`}>{historyAppon.approveStatus}</span></li>
                            </ul>
                        </div>
                        ))
                    }
                    {
                     apponHistoryList && apponHistoryList.length>0?<Pagination dataLen={apponHistoryList.length} onPageChange={onPageChangeHistory}  currentPage={currentPageHistory} itemsPerPage={itemsPerPageHistory}  />:''
                    }
                </div>
            }
            </div>
        </div>
    </>
  )
};
export default Appointments;