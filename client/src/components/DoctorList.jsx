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
    }

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
    }

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
        <Layout>
            <div>
                <h3>Notifications</h3>
                <div className="list">
                    <h3>Pending List</h3>
                    <h3 onClick={getDoctorApprovalList}>Approved List</h3>
                </div>
                <div className="card-notify">
                        {drPendingList && doctorList ?(
                            drPendingList.length<1?(<h3>NO items </h3>):
                            drPendingList.map((elem)=>{
                                return (
                                    <ul key={elem.data.doctorid}>
                                        <li>DoctorName: {elem.data.doctorName}</li>
                                        <li>Doctor Specialization: {elem.data.doctorSpecialization}</li>
                                        <li>DoctorExp: {elem.data.doctorExp}</li>
                                        <li>DoctotId: {elem.data.doctorid}</li>
                                        <button onClick={()=>approveDr(elem.data.doctorid)} style={{border:'2px solid green'}}>Approve</button>
                                        <button style={{border:'2px solid red', marginLeft:'1rem'}}>Reject</button>
                                    </ul>
                                )
                            })):
                            drApprovedList.length<1?(<h3>No items</h3>): drApprovedList.map((elem)=>{
                                return(
                                    <ul key={elem.data.doctorid}>
                                        <li>DoctotId: {elem.data.doctorid}</li>
                                        <li>DoctorName: {elem.data.doctorName}</li>
                                        <li>Doctor Specialization: {elem.data.doctorSpecialization}</li>
                                        <li>DoctorExp: {elem.data.doctorExp}</li>
                                    </ul>
                                )
                            })
                        }
                </div>
            </div>
        </Layout>

        </>
) 
}
export default DoctorList;