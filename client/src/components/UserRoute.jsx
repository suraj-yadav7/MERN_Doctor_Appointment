import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const UserRoute = ({children})=>{
    const data=useSelector((state)=> state.user.userData)
    let isDoctor = data.isDoctor
    if(isDoctor === undefined){
        return <Navigate to='/login'/>
    }
    else if(isDoctor){
        return children
    }
    else{
        return children

    }
}

export default UserRoute