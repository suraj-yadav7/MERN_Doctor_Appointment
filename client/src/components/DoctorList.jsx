import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Toaster, toast } from "react-hot-toast";
import Pagination from "./Pagination";

const DoctorList = ()=>{
    const [drPendingList, setDrPendingList] = useState('')
    const [drApprovedList, setDrApprovedList] = useState('')
    const [doctorList, setdoctorList] = useState(true)

    let adminId=sessionStorage.getItem('userId')
    // fetching Doctor Pending List
    const getDoctorList = async()=>{
        setdoctorList(true)
        let response = await fetch('http://localhost:5000/api/doctor-pendinglist',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({adminid:adminId})
        })
        let result = await response.json()
        setDrPendingList(result.doctorlist)
    };

    // fetch Docotor Approval List
    const getDoctorApprovalList=async()=>{
        setdoctorList(false)
        let response = await fetch('http://localhost:5000/api/doctor-approvedlist',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({adminid:adminId})
        })
        let result = await response.json()
        setDrApprovedList(result.doctorlist)
    };

    // Request to admin for Doctor account approval/registration
    const approveDrProfile = async(doctorId)=>{
        let response = await fetch('http://localhost:5000/api/account-approval',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({doctorid:doctorId})
        })
        let result = await response.json()
        if(result.status){
            toast.success(result.message)
            getDoctorList()
        }
        console.log("admin response: ", result);
    };

    const rejectDrProfile = async (doctorId)=>{
        let response  = await fetch('http://localhost:5000/api/reject-doctor', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({doctorid:doctorId})
        })
        let result = await response.json()
        console.log("reject response: ", result)
        if(result.status){
            toast.custom(<div className='border-2 border-red-300 rounded-md text-2xl p-1 bg-white shadow-md shadow-gray-300 phone:text-base sm:text-lg'>{result.message}</div>)
            getDoctorList()
        }
    };

    // Pagination for pending appointment list
    const [currentPagePending, setCurrentPagePending] =useState(1)
    const itemsPerPagePending = 4
    const startIndexPending = (currentPagePending-1)*itemsPerPagePending
    const endIndexPending = startIndexPending+itemsPerPagePending
    const onPageChangePending = (page)=>{
        setCurrentPagePending(page)
    }
    const slicedDrPendingList = drPendingList.slice(startIndexPending, endIndexPending)

    // Pagination Appointmen History list
    const [currentPageApproved, setCurrentPageApproved] =useState(1)
    const itemsPerPageApproved = 4
    const startIndexApproved = (currentPageApproved-1)*itemsPerPageApproved
    const endIndexApproved= startIndexApproved+itemsPerPageApproved
    const onPageChangeApproved = (page)=>{
        setCurrentPageApproved(page)
    }
    const slicedDrApprovedList = drApprovedList.slice(startIndexApproved, endIndexApproved)

    useEffect(()=>{
        getDoctorList()
    },[]);
    return(
        <>
            <div>
                <Toaster toastOptions={{style:{fontSize:'1.5rem'}}} />
                {/* here text-xl size per phone, sm reduce size of div*/}
                <div className='listNavigate phone:text-xl sm:text-xl py-4 flex justify-start'>
                    <div>
                        <span onClick={getDoctorList} className={`mr-6 mx-2 p-1 border text-xl border-gray-400  rounded-md phone:text-base sm:text-lg ${doctorList? 'bg-slate-400 border-gray-400 p-px text-gray-100 text-xl phone:text-sm sm:text-base':''} hover:cursor-pointer`}>Pending Doctor Approval</span>
                    </div>
                    <div>
                        <span onClick={getDoctorApprovalList} className={`mr-6 mx-2 p-1 text-xl border border-gray-400 rounded-md phone:text-base sm:text-lg ${!doctorList? 'text-xl bg-slate-400 text-gray-100 phone:text-sm sm:text-base':''} hover:cursor-pointer`}>Approval History</span>
                    </div>
            </div>
                <div className="card-notify">
                        {doctorList? 
                            <div>
                                {drPendingList&& drPendingList.length<1?<div><h4>No items to approve</h4></div>: drPendingList&&
                                slicedDrPendingList.map((elem)=>{
                                return (
                                <div className='border border-yellow-200 text-2xl phone:text-lg sm:text-xl'key={elem.data.doctorid} >     
                                    <ul className="px-4">
                                        <li>DoctorName: {elem.data.doctorName}</li>
                                        <li>Doctor Specialization: {elem.data.doctorSpecialization}</li>
                                        <li>DoctorExp: {elem.data.doctorExp}</li>
                                        <li>DoctotId: {elem.data.doctorid}</li>
                                        <button className="border border-gray-300 bg-green-500 rounded-md p-1 my-2 px-2 mr-2 hover:bg-green-300 hover:text-gray-100 phone:p-0 phone:px-1" onClick={()=>approveDrProfile(elem.data.doctorid)} >Approve</button>
                                        <button className="border border-gray-300 bg-red-600 rounded-md hover:bg-red-300 hover:text-gray-100 p-1 my-2 px-2 mx-2 phone:p-0 phone:px-2" onClick={()=>rejectDrProfile(elem.data.doctorid)}>Reject</button>
                                    </ul>
                                    </div>
                                )
                                })
                                }
                                {
                                    drPendingList && drPendingList.length>0?<Pagination dataLen={drPendingList.length} onPageChange={onPageChangePending}  currentPage={currentPagePending} itemsPerPage={itemsPerPagePending}  />:''
                                }
                                </div>
                            :
                            <div>
                                {drApprovedList&&
                                drApprovedList.length<1?(<h3>No items in previous approved list</h3>): drApprovedList && slicedDrApprovedList.map((elem)=>{
                                    return(
                                        <div className='border border-yellow-200 text-2xl phone:text-lg sm:text-xl'key={elem.data.doctorid} >     
                                            <ul className="p-2">
                                                <li>DoctotId: {elem.data.doctorid}</li>
                                                <li>DoctorName: {elem.data.doctorName}</li>
                                                <li>Doctor Specialization: {elem.data.doctorSpecialization}</li>
                                                <li>DoctorExp: {elem.data.doctorExp}</li>
                                            </ul>
                                        </div>
                                        )
                                    })
                                }
                                {
                                    drApprovedList && drApprovedList.length>0?<Pagination dataLen={drApprovedList.length} onPageChange={onPageChangeApproved}  currentPage={currentPageApproved} itemsPerPage={itemsPerPageApproved}  />:''
                                }
                            </div>
                        }
                </div>
            </div>
        </>
) 
};

export default DoctorList;