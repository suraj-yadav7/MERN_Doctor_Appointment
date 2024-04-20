import React from "react";
import { Navigate } from "react-router-dom";

const ProctectedRoute = ({children})=>{
    if(sessionStorage.getItem('token')){
        return children
    }else{
        return <Navigate to='/login'/>
    }
}
export default ProctectedRoute;