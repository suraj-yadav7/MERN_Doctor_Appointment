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
        <Route exact path='/doctor-register' element={<DoctorRegister/>} />
        <Route exact path='/doctor-login' element={<DoctorLogin/>} />
      </Routes>
    </Router>
    <Footer/>
    </>
  )
}

export default App;
