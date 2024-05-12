import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProctectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import DoctorRegister from './pages/DoctorRegister'
import DoctorLogin from './pages/DoctorLogin'
import DoctorList from './components/DoctorList'
import Profile from './components/Profile'
import UserRoute from './components/UserRoute'
import UserAppointment from './components/UserAppointment'
import AdminDoctorList from './components/AdminDoctorList'

function App() {

  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route exact path="/" element={
        <ProctectedRoute >
          <Home/>
        </ProctectedRoute>
        } /> 
        <Route exact path="/login" element={
          <PublicRoute>
            <Login/> 
          </PublicRoute>
        }/>
            
        <Route exact path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
          <Route exact path='/doctor-register' element={<PublicRoute><DoctorRegister/></PublicRoute>} />
        
          <Route exact path='/doctor-login' element={<PublicRoute><DoctorLogin/></PublicRoute>} />
        <Route exact path ='/profile' element={ <UserRoute><Profile /></UserRoute> }/>
        <Route exact path = '/appoint' element={<UserRoute><UserAppointment/></UserRoute>} />
        <Route exact path='/alldoctors' element={<UserRoute><AdminDoctorList/></UserRoute>} />
      </Routes>
    </Router>
    <Footer/>
    </>
  )
};

export default App;
