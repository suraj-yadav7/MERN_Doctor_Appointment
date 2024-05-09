import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Layout from './Layout';

const Profile = () => {

    const userDetails = useSelector((state) => state.user.userData)

  return (
    <>
    <Layout>
        <div className='profile-container flex flex-col justify-center items-center h-1/2 '>
            <h3 className='small:text-2xl'>Details</h3>
            <div className=' flex px-6 flex-col flex-wrap justify-start items-center text-xl p-4 border w-2/4 small:w-3/4 small:text-base '>
                <div className='capitalize'>
                <ul >
                    <li className='border border-yellow-200 py-2 px-2 '><span className='font-semibold mr-4 '>User Id: </span>{userDetails.userid?.slice(0,4)} </li>
                    <li className='py-2 border border-yellow-200 px-2'><span className='font-semibold my-6 mr-6'>Name: </span> {userDetails.name}</li>
                    <li className='border border-yellow-200 py-2 px-2'><span className='font-semibold mr-4'>Gender: </span>{userDetails.gender} </li>
                    <li className='py-2 border border-yellow-200 px-2 normal-case'><span className='font-semibold mr-8'>Email: </span>{userDetails.email}</li>
                    {
                        userDetails.isDoctor? 
                        <div>
                        <li className='border border-yellow-200 py-2 px-2'><span className='font-semibold mr-4'>Specialist: </span>{userDetails.specialist}</li>
                        <li className='py-2 border border-yellow-200 py-2 px-2'><span className='font-semibold'>Qualification: </span>{userDetails.Qualification}</li>
                        <li className='border border-yellow-200 py-2 px-2'><span className='font-semibold mr-4'>Pending Appointments: </span>{userDetails.pendingAppoints}</li>
                        </div>
                        :''
                    }
                    <li className='pb-2 border border-yellow-200 py-2 px-2'><span className='font-semibold mr-4'>Total Appointment: </span>{userDetails.totalAppoints} </li>
                </ul>
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
};

export default Profile;