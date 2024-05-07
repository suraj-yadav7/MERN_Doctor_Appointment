import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

    const userDetails = useSelector((state) => state.user.userData)

  return (
    <>
        <div className='profile-container flex flex-col justify-center items-center h-1/2'>
            <h3>User Details</h3>
            <div className='text-xl border border-gray-100 w-1/2'>
                <ul>
                    <li>User Id:{userDetails.userid?.slice(0,4)} </li>
                    <li>Name: {userDetails.name}</li>
                    <li>Gender: {userDetails.gender} </li>
                    <li>Email: {userDetails.email}</li>
                    {
                        userDetails.isUser==false? 
                        <div>
                        <li>Specialist: {userDetails.specialist}</li>
                        <li>Qualification: {userDetails.Qualification}</li>
                        <li>Pending Appointments: {userDetails.pendingAppoints}</li>
                        </div>
                        :''
                    }
                    <li></li>
                    <li>Total Appointment: {userDetails.totalAppoints} </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Profile;