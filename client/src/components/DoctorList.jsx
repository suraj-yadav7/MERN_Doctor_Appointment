import React, { useEffect, useState } from "react";
import Layout from "./Layout";

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
    const approveDr = async(doctorId)=>{
        let response = await fetch('http://localhost:5000/api/account-approval',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({doctorid:doctorId})
        })
        let result = await response.json()
        console.log("app response: ", result)
    }

    useEffect(()=>{
        getDoctorList()
    },[])
    return(
        <>
            <div>
                <h3>Notifications</h3>
                <div className='listNavigate text-xl py-4'>
                <span onClick={getDoctorList} className={`mr-6 mx-2 p-1 border border-gray-400  rounded-md  ${doctorList? 'bg-slate-400 border-gray-400 p-px text-gray-100 text-xl':''} hover:cursor-pointer`}>Pending Doctor Approval</span>
                <span onClick={getDoctorApprovalList} className={`mr-6 mx-2 p-1 border border-gray-400 rounded-md ${!doctorList? 'text-xl bg-slate-400 text-gray-100':''} hover:cursor-pointer`}>Doctor Approval History</span>
            </div>
                <div className="card-notify">
                        {drPendingList && doctorList ?(
                            drPendingList.length<1?(<h3>NO items </h3>):
                            drPendingList.map((elem)=>{
                                return (
                                 <div className='border border-yellow-200 text-2xl'key={elem.data.doctorid} >     
                                    <ul className="px-4">
                                        <li>DoctorName: {elem.data.doctorName}</li>
                                        <li>Doctor Specialization: {elem.data.doctorSpecialization}</li>
                                        <li>DoctorExp: {elem.data.doctorExp}</li>
                                        <li>DoctotId: {elem.data.doctorid}</li>
                                        <button className="border border-gray-300 bg-green-500 rounded-md p-1 my-2 px-2 mr-2 hover:bg-green-300 hover:text-gray-100" onClick={()=>approveDr(elem.data.doctorid)} >Approve</button>
                                        <button className="border border-gray-300 bg-red-600 rounded-md hover:bg-red-300 hover:text-gray-100 p-1 my-2 px-2 mx-2" >Reject</button>
                                    </ul>
                                    </div>
                                )
                            })):
                            drApprovedList.length<1?(<h3>No items</h3>): drApprovedList.map((elem)=>{
                                return(
                                 <div className='border border-yellow-200 text-2xl'key={elem.data.doctorid} >     
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
                </div>
            </div>
        </>
) 
};

export default DoctorList;