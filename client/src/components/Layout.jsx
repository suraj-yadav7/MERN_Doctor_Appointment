import React, { useState } from 'react'
import '../styles/layout.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userSidebarData,adminSidebarData,doctorSiderbarData } from '../Data/sidebarData.js';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
    const user = useSelector((state)=> state.user.userData)
    let isAdmin = user.isAdmin
    let isDoctor = user.isDoctor
    let sidebarData;
    if(isAdmin){
        sidebarData = adminSidebarData
    }
    else if(isDoctor){
        sidebarData = doctorSiderbarData
    }
    else{
        sidebarData = userSidebarData
    }

    const location = useLocation()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        sessionStorage.clear()
        navigate('/login')
    }
  return (
    <>
        <div className="main">
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <h6>DR Appointment</h6>
                        <hr/></div>
                    <div className="menu">Menu
                    {
                        sidebarData.map((elem,index)=>{
                            const isActive = location.pathname === elem.path
                            return (
                                <div key={index} className={`menu-item ${isActive? 'active':''}`}>
                                    <i className={elem.icon} />
                                    <Link to={elem.path}>{elem.name}</Link>
                                </div>
                            )
                        })
                    }
                        <div className={`menu-item hover:text-red-500`} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket ' />
                                Logout
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header ">
                        <div className='dashboardInfo '>
                            {
                                isDoctor?<h3>Doctor Dashboard</h3>:isAdmin?<h3>Admin Dashboard</h3>:<h3>User Dashboard</h3>
                            }
                        </div>
                        <div className='user'>
                            <p className='capitalize '>{user.name &&(user.name)}</p>
                        </div>
                    </div>
                    <div className="body">
                        <div className='body-child'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
};
export default Layout;