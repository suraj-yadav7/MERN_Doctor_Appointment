import React, { useState } from 'react'
import '../styles/layout.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userSidebarData,adminSidebarData,doctorSiderbarData } from '../Data/sidebarData.js';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
    const user = useSelector((state)=> state.user.userData)
    // console.log("is admin: ", user)
    let sidebarData;
    if(user.isAdmin){
        sidebarData = adminSidebarData
    }
    else if(user.isDoctor){
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
                        <h6>DOC Appointment</h6>
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
                        <div className={`menu-item`} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket' />
                                Logout
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <div className='alert'>
                            <Link to='#'>
                            <i className='fa-solid fa-bell' />
                            </Link>
                        </div>

                        <div className='user'>
                            <p>{user.name &&(user.name).split(' ')[0].charAt(0).toUpperCase()+(user.name).split(' ')[0].slice(1)}</p>
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